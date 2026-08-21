import { Agent, CursorAgentError } from '@cursor/sdk';
import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { parseArgs } from 'node:util';

type Mode = 'unit' | 'e2e';

/** Deterministic, non-LLM assertions. Anything mechanically checkable belongs
 *  here rather than in `expectations[]`, which costs a judge call per item. */
type Check =
  | { type: 'fileExists'; path: string }
  | { type: 'fileAbsent'; path: string }
  | { type: 'grep'; path: string; pattern: string; match?: boolean }
  | { type: 'registryEntry'; name: string; requires?: string[] }
  | { type: 'stepsLog'; path?: string };

type CheckResult = { id: string; ok: boolean; detail: string };

type EvalCase = {
  id: string;
  mode: Mode;
  focus?: string;
  setup?: 'drop-registry' | 'drop-tests' | 'strip';
  component: string;
  codeConnect?: string[];
  files?: string[];
  prompt: string;
  expected_output: string;
  expectations: string[];
  checks?: Check[];
  gate?: boolean;
};

type SuiteFile = {
  skill_name: string;
  /** Rules common to every case (offline fixtures, no git restore, stay in cwd).
   *  Hoisted here so they are stated once instead of pasted into 25 prompts. */
  preamble?: string;
  /** Extra rules for e2e cases only: step order + the evals-out/steps.md log. */
  preamble_e2e?: string;
  evals: EvalCase[];
};

type Eval = EvalCase & {
  fixture?: string;
};

const ROOT = execFileSync('git', ['rev-parse', '--show-toplevel'], {
  encoding: 'utf8',
}).trim();
const EVALS = join(ROOT, '.agents/skills/create-component/evals');
const SUITE = join(EVALS, 'evals.json');
const RUNS = join('/tmp', 'qbds-evals-runs');
const RESULTS = join(ROOT, 'evals/results');
const DEMO_INDEX = 'src/app/demo/[name]/index.tsx';

/** Mirrors the canonical exit gate in create-component/SKILL.md. */
const GATE =
  'npm run lint && npm run typecheck && npm run test:unit && npm run registry:build && npm run figma:parse';

const STEP_NAMES = [
  'Spec',
  'Prior art',
  'API',
  'Build',
  'Demo',
  'Tests',
  'Code Connect',
  'Registry',
];

const { values } = parseArgs({
  options: {
    id: { type: 'string', multiple: true, default: [] },
    suite: { type: 'string', default: 'all' },
    component: { type: 'string', multiple: true, default: [] },
    focus: { type: 'string', multiple: true, default: [] },
    model: { type: 'string', default: 'composer-2.5' },
    keep: { type: 'boolean', default: false },
    'dry-run': { type: 'boolean', default: false },
  },
});

function loadSuite(file: SuiteFile): Eval[] {
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

function worktree(id: string): string {
  mkdirSync(RUNS, { recursive: true });
  const dir = join(RUNS, id);

  removeWorktree(dir);

  execFileSync('git', ['worktree', 'add', '--detach', dir, 'HEAD'], {
    cwd: ROOT,
  });

  if (existsSync(join(ROOT, 'node_modules'))) {
    execFileSync('ln', [
      '-s',
      join(ROOT, 'node_modules'),
      join(dir, 'node_modules'),
    ]);
  }

  return dir;
}

function removeWorktree(dir: string): void {
  try {
    execFileSync('git', ['worktree', 'remove', '--force', dir], {
      cwd: ROOT,
      stdio: 'ignore',
    });
  } catch {
    rmSync(dir, { recursive: true, force: true });
    execFileSync('git', ['worktree', 'prune'], { cwd: ROOT, stdio: 'ignore' });
  }
}

function removeEntry(src: string, object: string, key: string): string {
  const objectAt = src.indexOf(`export const ${object}`);

  if (objectAt === -1) return src;

  const match = new RegExp(`\\n {2}(?:${key}|'${key}'):`).exec(
    src.slice(objectAt),
  );

  if (!match) return src;

  const start = objectAt + match.index;
  let i = start + match[0].length;
  let depth = 0;
  let quote = '';

  while (i < src.length) {
    const char = src[i];

    if (quote) {
      if (char === quote && src[i - 1] !== '\\') quote = '';
    } else if (char === "'" || char === '"' || char === '`') {
      quote = char;
    } else if ('{[('.includes(char)) {
      depth++;
    } else if (')]}'.includes(char)) {
      depth--;
    } else if (char === ',' && depth === 0) {
      return src.slice(0, start) + src.slice(i + 1);
    }

    i++;
  }

  return src;
}

function seedFixture(dir: string, fixture: string): void {
  const src = join(EVALS, fixture);

  if (!existsSync(src)) {
    throw new Error(`missing fixture: ${fixture}`);
  }

  cpSync(src, join(dir, 'evals-fixture'), { recursive: true });
}

function overlayDocs(dir: string): void {
  const docs = [
    'docs/components/props.md',
    'docs/components/composition.md',
    'docs/components/build.md',
    'docs/components/tests.md',
    'docs/components/registry.md',
    'docs/components/demos.md',
    '.agents/skills/create-component/SKILL.md',
    '.agents/skills/figma-parity/SKILL.md',
    '.agents/skills/code-connect/SKILL.md',
  ];

  for (const path of docs) {
    const src = join(ROOT, path);

    if (!existsSync(src)) {
      console.warn(
        `  ! overlay source missing, agent will not see it: ${path}`,
      );
      continue;
    }

    mkdirSync(dirname(join(dir, path)), { recursive: true });
    cpSync(src, join(dir, path));
  }
}

/** `registry:build` reads QBDS_REGISTRY_URL; worktrees have no .env. Seed the
 *  one value the gate needs so the eval gate can match the canonical gate. */
function seedEnv(dir: string): void {
  writeFileSync(
    join(dir, '.env'),
    'QBDS_REGISTRY_URL="http://localhost:4123"\n',
  );
}

/** Re-format files the harness rewrote. Without this, a mutated registry.json
 *  differs from Prettier's output on ~109 unrelated lines — which fails the
 *  gate for a reason the agent did not cause, and buries every --keep diff. */
function format(dir: string, ...files: string[]): void {
  const present = files.filter(f => existsSync(join(dir, f)));

  if (!present.length) return;

  try {
    execFileSync('npx', ['prettier', '--write', ...present], {
      cwd: dir,
      stdio: 'ignore',
    });
  } catch {
    console.warn('  ! prettier failed on harness-written files');
  }
}

function dropRegistry(dir: string, name: string): void {
  const registryPath = join(dir, 'registry.json');
  const registry = JSON.parse(readFileSync(registryPath, 'utf8'));

  registry.items = registry.items.filter(
    (item: { name: string }) => item.name !== name,
  );
  writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
  format(dir, 'registry.json');
}

function dropTests(dir: string, name: string): void {
  const abs = join(dir, `src/tests/${name}.test.tsx`);

  if (existsSync(abs)) rmSync(abs);
}

function commitBaseline(dir: string, message: string): void {
  const branch = `eval-baseline-${Date.now()}`;

  execFileSync('git', ['checkout', '--orphan', branch], {
    cwd: dir,
    stdio: 'ignore',
  });
  execFileSync('git', ['add', '-A'], { cwd: dir, stdio: 'ignore' });
  execFileSync(
    'git',
    [
      '-c',
      'user.email=eval@local',
      '-c',
      'user.name=eval',
      'commit',
      '-m',
      message,
    ],
    { cwd: dir, stdio: 'ignore' },
  );
}

/** Remove every artifact that encodes the answer for `name`: implementation,
 *  demo (+ its index wiring), tests, Code Connect templates, registry entry and
 *  the built `public/r/*.json` (which embeds the component source). */
function stripComponent(dir: string, evalCase: Eval): void {
  const name = evalCase.component;
  const files = [
    `src/components/ui/${name}.tsx`,
    `src/app/demo/[name]/ui/${name}.tsx`,
    `src/tests/${name}.test.tsx`,
    `public/r/${name}.json`,
    ...(evalCase.codeConnect ?? []).flatMap(n => [
      `code-connect/${n}.figma.ts`,
      `public/r/${n}.json`,
    ]),
  ];

  for (const file of [...new Set(files)]) {
    const abs = join(dir, file);

    if (existsSync(abs)) rmSync(abs);
  }

  dropRegistry(dir, name);

  const indexPath = join(dir, DEMO_INDEX);
  let index = readFileSync(indexPath, 'utf8');
  const from = `@/app/demo/[name]/ui/${name}`;
  const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  index = index.replace(
    new RegExp(`\\nimport \\{[^}]*\\} from '${escaped}';`),
    '',
  );

  for (const object of ['exampleComponentMaps', 'examplesMeta', 'demos']) {
    index = removeEntry(index, object, name);
  }

  writeFileSync(indexPath, index);
  format(dir, DEMO_INDEX);
}

function runChecks(dir: string, evalCase: Eval): CheckResult[] {
  return (evalCase.checks ?? []).map((check, i) => {
    const id = `c${i + 1}`;

    try {
      switch (check.type) {
        case 'fileExists':
        case 'fileAbsent': {
          const there = existsSync(join(dir, check.path));
          const ok = check.type === 'fileExists' ? there : !there;

          return {
            id,
            ok,
            detail: `${check.path} ${there ? 'exists' : 'absent'}`,
          };
        }

        case 'grep': {
          const abs = join(dir, check.path);

          if (!existsSync(abs)) {
            return { id, ok: false, detail: `${check.path} missing` };
          }

          const want = check.match ?? true;
          const hit = new RegExp(check.pattern, 'm').test(
            readFileSync(abs, 'utf8'),
          );

          return {
            id,
            ok: hit === want,
            detail: `${check.path} ${hit ? 'matches' : 'does not match'} /${check.pattern}/ (wanted ${want ? 'a match' : 'no match'})`,
          };
        }

        case 'registryEntry': {
          const reg = JSON.parse(
            readFileSync(join(dir, 'registry.json'), 'utf8'),
          );
          const item = (reg.items ?? []).find(
            (x: { name: string }) => x.name === check.name,
          );

          if (!item) {
            return {
              id,
              ok: false,
              detail: `no "${check.name}" registry item`,
            };
          }

          const deps: string[] = item.registryDependencies ?? [];
          const missing = (check.requires ?? []).filter(
            r => !deps.some(d => d === r || d.includes(`/r/${r}.json`)),
          );

          return {
            id,
            ok: !missing.length,
            detail: missing.length
              ? `${check.name} missing registryDependencies: ${missing.join(', ')}`
              : `${check.name} entry has ${(check.requires ?? []).join(', ') || 'an entry'}`,
          };
        }

        case 'stepsLog': {
          const abs = join(dir, check.path ?? 'evals-out/steps.md');

          if (!existsSync(abs)) {
            return { id, ok: false, detail: 'evals-out/steps.md missing' };
          }

          const got = readFileSync(abs, 'utf8')
            .split('\n')
            .map(l => l.trim())
            .filter(Boolean);
          const want = STEP_NAMES.map((n, idx) => `${idx + 1} ${n}`);
          const ok =
            got.length === want.length &&
            got.every((l, idx) => l === want[idx]);

          return {
            id,
            ok,
            detail: ok
              ? 'steps.md: 8 lines, once each, in order'
              : `steps.md expected [${want.join(' | ')}], got [${got.join(' | ') || 'empty'}]`,
          };
        }
      }
    } catch (error) {
      return {
        id,
        ok: false,
        detail: `check threw: ${(error as Error).message}`,
      };
    }
  });
}

/** Actually build and test what the agent produced. Without this the harness
 *  can pass a component that does not compile and tests that never ran. */
function runGate(dir: string): CheckResult {
  try {
    execFileSync('sh', ['-c', GATE], { cwd: dir, stdio: 'pipe' });

    return { id: 'gate', ok: true, detail: GATE };
  } catch (error) {
    const e = error as { stdout?: Buffer; stderr?: Buffer };
    const tail = `${e.stdout ?? ''}${e.stderr ?? ''}`
      .trim()
      .split('\n')
      .slice(-12)
      .join('\n      ');

    return { id: 'gate', ok: false, detail: `gate failed\n      ${tail}` };
  }
}

async function withHeartbeat<T>(
  label: string,
  task: () => Promise<T>,
): Promise<T> {
  const start = Date.now();
  console.log(`  ${label}…`);

  const tick = setInterval(() => {
    const sec = Math.round((Date.now() - start) / 1000);
    console.log(`  ${label} still running… ${sec}s`);
  }, 30_000);

  try {
    return await task();
  } finally {
    clearInterval(tick);
  }
}

async function grade(
  dir: string,
  evalCase: Eval,
  model: string,
): Promise<{ id: string; ok: boolean; detail: string }[]> {
  const list = evalCase.expectations.map((e, i) => `${i + 1}. ${e}`).join('\n');
  const scope =
    evalCase.mode === 'unit'
      ? 'Grade the agent output for this unit eval. Prefer files under evals-out/ and any paths named in Expected. Use docs only to judge correctness of the API choices, not as a substitute for missing output.'
      : 'Grade the implementation in this worktree. Check each expectation against the files that exist now — not against docs. For flow-order expectations, read evals-out/steps.md and verify step names appear once each in order 1–8.';

  const result = await withHeartbeat('grading', () =>
    Agent.prompt(
      `${scope}

Expected: ${evalCase.expected_output}

${list}

Reply JSON only, no fences:
[{"id":"1","ok":true,"detail":"one sentence citing the file"}]`,
      {
        apiKey: process.env.CURSOR_API_KEY!,
        model: { id: model },
        local: { cwd: dir, settingSources: [] },
      },
    ),
  );

  if (result.status !== 'finished') {
    console.error(`  grade status: ${result.status}`);
    console.log(result.error ?? { message: 'no error detail' });
    return evalCase.expectations.map((_, i) => ({
      id: String(i + 1),
      ok: false,
      detail: result.error?.message ?? `grade ${result.status}`,
    }));
  }

  const text = result.result ?? '';
  const json = text.slice(text.indexOf('['), text.lastIndexOf(']') + 1);

  try {
    return JSON.parse(json);
  } catch {
    return evalCase.expectations.map((_, i) => ({
      id: String(i + 1),
      ok: false,
      detail: 'unparseable judge output',
    }));
  }
}

function filterEvals(evals: Eval[]): Eval[] {
  const ids = new Set(values.id);
  const components = new Set(values.component);
  const focuses = new Set(values.focus);
  const suiteFilter = values.suite ?? 'all';

  return evals.filter(e => {
    if (ids.size && !ids.has(e.id)) return false;
    if (components.size && !components.has(e.component)) return false;
    if (focuses.size && !focuses.has(e.focus ?? '')) return false;
    if (suiteFilter === 'all') return true;
    return e.mode === suiteFilter;
  });
}

async function main() {
  const file: SuiteFile = JSON.parse(readFileSync(SUITE, 'utf8'));
  const evals = filterEvals(loadSuite(file));

  if (!evals.length) {
    console.error('no evals matched --suite / --id / --component / --focus');
    process.exit(1);
  }

  let failed = false;
  const started = new Date().toISOString().replace(/[:.]/g, '-');
  const log: {
    id: string;
    mode: Mode;
    component: string;
    ok: boolean;
    checks: CheckResult[];
  }[] = [];

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
    const label = evalCase.focus ?? evalCase.component;
    const runId = `${file.skill_name}-${evalCase.id}`;
    const dir = worktree(runId);
    overlayDocs(dir);
    seedEnv(dir);

    if (evalCase.mode === 'e2e') {
      console.log(`▶ ${runId} (strip ${evalCase.component})`);
      stripComponent(dir, evalCase);
      if (evalCase.fixture) seedFixture(dir, evalCase.fixture);
      commitBaseline(dir, `eval strip ${evalCase.component}`);
    } else {
      console.log(`▶ ${runId} (unit ${label})`);
      if (evalCase.fixture) seedFixture(dir, evalCase.fixture);
      // Strip whatever encodes the answer: for an API-design case that is the
      // shipped component itself, otherwise just the artifact being written.
      if (evalCase.setup === 'strip') stripComponent(dir, evalCase);
      if (evalCase.setup === 'drop-registry') {
        dropRegistry(dir, evalCase.component);
      }
      if (evalCase.setup === 'drop-tests') {
        dropTests(dir, evalCase.component);
      }
      commitBaseline(dir, `eval setup ${evalCase.id}`);
    }

    if (values['dry-run']) {
      // Plumbing check: worktree is set up exactly as a real run, but no agent
      // and no judge. Checks are expected to fail — that is what proves the
      // strip removed the answer and the checks notice.
      for (const check of runChecks(dir, evalCase)) {
        console.log(`  ${check.ok ? '✓' : '·'} ${check.id}: ${check.detail}`);
      }
      if (evalCase.gate) {
        const g = runGate(dir);

        console.log(`  ${g.ok ? '✓' : '·'} gate: ${g.detail.split('\n')[0]}`);
      }
      if (values.keep) {
        console.log(`  kept → ${dir}`);
      } else {
        removeWorktree(dir);
      }

      continue;
    }

    try {
      const run = await withHeartbeat('agent', () =>
        Agent.prompt(evalCase.prompt, {
          apiKey: process.env.CURSOR_API_KEY!,
          model: { id: values.model! },
          local: { cwd: dir, settingSources: [] },
        }),
      );

      console.log(`  status: ${run.status}`);

      if (run.status !== 'finished') {
        console.error(`  agent failed: ${run.error?.message ?? run.status}`);
        console.log(run.error ?? { message: 'no error detail' });
        record(evalCase, [
          { id: 'agent', ok: false, detail: run.error?.message ?? run.status },
        ]);
        if (!values.keep) removeWorktree(dir);
        continue;
      }
    } catch (error) {
      if (!(error instanceof CursorAgentError)) {
        console.error('  agent threw:', error);
        throw error;
      }

      console.error(`  startup failed: ${error.message}`);
      console.log(error.toJSON());
      record(evalCase, [{ id: 'agent', ok: false, detail: error.message }]);
      if (!values.keep) removeWorktree(dir);
      continue;
    }

    // Tier 1: deterministic. Runs first so a mechanical miss is reported even
    // if the judge call later fails.
    const checks: CheckResult[] = runChecks(dir, evalCase);

    if (evalCase.gate) checks.push(runGate(dir));

    // Tier 2: LLM judge, for the expectations that are genuinely subjective.
    try {
      checks.push(...(await grade(dir, evalCase, values.model!)));
    } catch (error) {
      if (!(error instanceof CursorAgentError)) {
        console.error('  grade threw:', error);
        throw error;
      }

      console.error(`  grade failed: ${error.message}`);
      console.log(error.toJSON());
      checks.push({ id: 'judge', ok: false, detail: error.message });
    }

    for (const check of checks) {
      console.log(`  ${check.ok ? '✓' : '✗'} ${check.id}: ${check.detail}`);
    }

    record(evalCase, checks);

    if (!values.keep) removeWorktree(dir);
  }

  if (values['dry-run']) {
    console.log('\ndry run — no agent, no judge, nothing graded');
    process.exit(0);
  }

  mkdirSync(RESULTS, { recursive: true });

  const out = join(RESULTS, `${started}.json`);

  writeFileSync(
    out,
    `${JSON.stringify({ started, model: values.model, cases: log }, null, 2)}\n`,
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

  process.exit(failed ? 2 : 0);
}

main();
