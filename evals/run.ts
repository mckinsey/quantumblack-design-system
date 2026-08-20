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
import { join } from 'node:path';
import { parseArgs } from 'node:util';

type Mode = 'unit' | 'e2e';

type EvalCase = {
  id: string;
  mode: Mode;
  focus?: string;
  setup?: 'drop-registry' | 'drop-tests';
  component: string;
  codeConnect?: string[];
  files?: string[];
  prompt: string;
  expected_output: string;
  expectations: string[];
};

type SuiteFile = {
  skill_name: string;
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
const DEMO_INDEX = 'src/app/demo/[name]/index.tsx';

const { values } = parseArgs({
  options: {
    id: { type: 'string', multiple: true, default: [] },
    suite: { type: 'string', default: 'all' },
    component: { type: 'string', multiple: true, default: [] },
    focus: { type: 'string', multiple: true, default: [] },
    model: { type: 'string', default: 'composer-2.5' },
    keep: { type: 'boolean', default: false },
  },
});

function loadSuite(file: SuiteFile): Eval[] {
  return file.evals.map(e => {
    if (!e.expectations?.length) {
      throw new Error(`eval ${e.id}: expectations required`);
    }

    const fixture =
      e.setup === 'drop-registry' || e.setup === 'drop-tests'
        ? undefined
        : (e.files?.[0] ?? `fixtures/${e.component}`);

    return { ...e, fixture };
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
    'docs/components/tests.md',
    'docs/components/registry.md',
    'docs/components/demos.md',
    '.agents/skills/create-component/SKILL.md',
    '.agents/skills/figma-parity/SKILL.md',
    '.agents/skills/code-connect/SKILL.md',
  ];

  for (const path of docs) {
    const src = join(ROOT, path);

    if (existsSync(src)) cpSync(src, join(dir, path));
  }
}

function dropRegistry(dir: string, name: string): void {
  const registryPath = join(dir, 'registry.json');
  const registry = JSON.parse(readFileSync(registryPath, 'utf8'));

  registry.items = registry.items.filter(
    (item: { name: string }) => item.name !== name,
  );
  writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
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

function setupE2e(dir: string, evalCase: Eval): void {
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
        local: { cwd: dir },
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

  for (const evalCase of evals) {
    const label = evalCase.focus ?? evalCase.component;
    const runId = `${file.skill_name}-${evalCase.id}`;
    const dir = worktree(runId);
    overlayDocs(dir);

    if (evalCase.mode === 'e2e') {
      console.log(`▶ ${runId} (strip ${evalCase.component})`);
      setupE2e(dir, evalCase);
      if (evalCase.fixture) seedFixture(dir, evalCase.fixture);
      commitBaseline(dir, `eval strip ${evalCase.component}`);
    } else {
      console.log(`▶ ${runId} (unit ${label})`);
      if (evalCase.fixture) seedFixture(dir, evalCase.fixture);
      if (evalCase.setup === 'drop-registry') {
        dropRegistry(dir, evalCase.component);
      }
      if (evalCase.setup === 'drop-tests') {
        dropTests(dir, evalCase.component);
      }
      commitBaseline(dir, `eval setup ${evalCase.id}`);
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
        failed = true;
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
      failed = true;
      if (!values.keep) removeWorktree(dir);
      continue;
    }

    let checks;

    try {
      checks = await grade(dir, evalCase, values.model!);
    } catch (error) {
      if (!(error instanceof CursorAgentError)) {
        console.error('  grade threw:', error);
        throw error;
      }

      console.error(`  grade failed: ${error.message}`);
      console.log(error.toJSON());
      failed = true;
      if (!values.keep) removeWorktree(dir);
      continue;
    }

    for (const check of checks) {
      console.log(`  ${check.ok ? '✓' : '✗'} ${check.id}: ${check.detail}`);
      if (!check.ok) failed = true;
    }

    if (!values.keep) removeWorktree(dir);
  }

  process.exit(failed ? 2 : 0);
}

main();
