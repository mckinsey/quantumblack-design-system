import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { CursorAgentError, runAgent } from './agent.js';
import { runChecks } from './checks.js';
import { runGate } from './gate.js';
import { grade } from './judge.js';
import { resetSteps, step, stepDetail } from './log.js';
import type {
  CaseLog,
  CheckResult,
  Eval,
  RunConfig,
  SuiteFile,
} from './types.js';
import { commitBaseline, removeWorktree, worktree } from './worktree.js';

export function loadSuite(file: SuiteFile): Eval[] {
  return file.evals.map(e => {
    if (!e.expectations?.length && !e.checks?.length) {
      throw new Error(`eval ${e.id}: expectations or checks required`);
    }

    const fixture =
      e.setup === 'drop-registry' || e.setup === 'drop-tests'
        ? undefined
        : (e.files?.[0] ?? `fixtures/${e.component}`);

    const prompt = [
      file.preamble,
      e.mode === 'e2e' ? file.preamble_e2e : undefined,
      e.prompt,
    ]
      .filter(Boolean)
      .join('\n\n');

    return { ...e, fixture, prompt };
  });
}

export function filterEvals(evals: Eval[], config: RunConfig): Eval[] {
  const { opts } = config;
  const ids = new Set(opts.id);
  const components = new Set(opts.component);
  const focuses = new Set(opts.focus);

  return evals.filter(e => {
    if (ids.size && !ids.has(e.id)) return false;
    if (components.size && !components.has(e.component)) return false;
    if (focuses.size && !focuses.has(e.focus ?? '')) return false;
    if (opts.suite === 'all') return true;
    return e.mode === opts.suite;
  });
}

export async function run(config: RunConfig): Promise<number> {
  const { root, suitePath, evalsRoot, runsDir, resultsDir, plugin, opts } =
    config;
  const file: SuiteFile = JSON.parse(readFileSync(suitePath, 'utf8'));
  const evals = filterEvals(loadSuite(file), config);

  if (!evals.length) {
    console.error('no evals matched --suite / --id / --component / --focus');
    return 1;
  }

  console.log(
    `Running ${evals.length} case${evals.length === 1 ? '' : 's'} · model ${opts.model}${opts.dryRun ? ' · dry-run' : ''}`,
  );

  let failed = false;
  const started = new Date().toISOString().replace(/[:.]/g, '-');
  const log: CaseLog[] = [];

  const record = (evalCase: Eval, checks: CheckResult[]) => {
    const ok = checks.every(c => c.ok);

    log.push({
      id: evalCase.id,
      mode: evalCase.mode,
      component: evalCase.component,
      ok,
      checks,
    });

    if (!ok) failed = true;
  };

  for (const evalCase of evals) {
    const runId = `${file.skill_name}-${evalCase.id}`;

    resetSteps();

    console.log(
      `\n▶ ${runId} (${evalCase.mode}${evalCase.focus ? ` · ${evalCase.focus}` : ''} · ${evalCase.component})`,
    );

    step('worktree');
    const dir = worktree(root, runsDir, runId);
    stepDetail(dir);

    step('overlay');
    plugin.overlay?.(dir, root);

    step('seed');
    if (evalCase.fixture) {
      stepDetail(`fixture → evals-fixture/ (${evalCase.fixture})`);
    } else {
      stepDetail('env only');
    }
    plugin.seed?.(dir, evalCase, evalsRoot);

    if (evalCase.mode === 'e2e') {
      step(`setup · strip ${evalCase.component}`);
    } else if (evalCase.setup) {
      step(`setup · ${evalCase.setup} ${evalCase.component}`);
    } else {
      step('setup · none');
    }
    plugin.applySetup?.(dir, evalCase);

    step('baseline commit');
    commitBaseline(
      dir,
      evalCase.mode === 'e2e'
        ? `eval strip ${evalCase.component}`
        : `eval setup ${evalCase.id}`,
    );

    if (opts.dryRun) {
      step(`checks · ${evalCase.checks?.length ?? 0} deterministic`);

      for (const check of runChecks(dir, evalCase, plugin)) {
        console.log(`  ${check.ok ? '✓' : '·'} ${check.id}: ${check.detail}`);
      }

      if (evalCase.gate && plugin.gate) {
        step('gate');
        stepDetail(plugin.gate);
        const g = runGate(dir, plugin.gate);

        console.log(`  ${g.ok ? '✓' : '·'} gate: ${g.detail.split('\n')[0]}`);
      }

      if (opts.keep) {
        step('keep worktree');
        stepDetail(dir);
      } else {
        step('cleanup worktree');
        removeWorktree(root, dir);
      }

      continue;
    }

    step(`agent · ${opts.model}`);
    stepDetail(evalCase.prompt.split('\n').find(Boolean) ?? evalCase.prompt);

    const agent = await runAgent(evalCase.prompt, dir, opts.model);

    if (!agent.ok) {
      record(evalCase, [{ id: 'agent', ok: false, detail: agent.detail }]);

      if (!opts.keep) {
        step('cleanup worktree');
        removeWorktree(root, dir);
      }

      continue;
    }

    step(`checks · ${evalCase.checks?.length ?? 0} deterministic`);
    const checks: CheckResult[] = runChecks(dir, evalCase, plugin);

    if (evalCase.gate && plugin.gate) {
      step('gate');
      stepDetail(plugin.gate);
      checks.push(runGate(dir, plugin.gate));
    }

    if (evalCase.expectations.length) {
      step(`judge · ${evalCase.expectations.length} expectations`);
    }

    try {
      checks.push(...(await grade(dir, evalCase, opts.model)));
    } catch (error) {
      if (!(error instanceof CursorAgentError)) {
        console.error('  grade threw:', error);
        throw error;
      }

      console.error(`  grade failed: ${(error as CursorAgentError).message}`);
      console.log((error as CursorAgentError).toJSON());
      checks.push({
        id: 'judge',
        ok: false,
        detail: (error as CursorAgentError).message,
      });
    }

    for (const check of checks) {
      console.log(`  ${check.ok ? '✓' : '✗'} ${check.id}: ${check.detail}`);
    }

    record(evalCase, checks);

    if (opts.keep) {
      step('keep worktree');
      stepDetail(dir);
    } else {
      step('cleanup worktree');
      removeWorktree(root, dir);
    }
  }

  if (opts.dryRun) {
    console.log('\ndry run — no agent, no judge, nothing graded');
    return 0;
  }

  mkdirSync(resultsDir, { recursive: true });

  const out = join(resultsDir, `${started}.json`);

  writeFileSync(
    out,
    `${JSON.stringify({ started, model: opts.model, cases: log }, null, 2)}\n`,
  );

  console.log('\nSummary');

  for (const c of log) {
    const bad = c.checks.filter(x => !x.ok).length;

    console.log(
      `  ${c.ok ? '✓' : '✗'} ${c.id}${bad ? ` (${bad}/${c.checks.length} failed)` : ''}`,
    );
  }

  console.log(
    `\n${log.filter(c => c.ok).length}/${log.length} passed → ${out}`,
  );

  return failed ? 2 : 0;
}
