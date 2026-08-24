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

import type { CheckCtx, CheckResult, Eval, Plugin } from './lib/types.js';

export const GATE =
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

const DEMO_INDEX = 'src/app/demo/[name]/index.tsx';

const OVERLAY = [
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

function overlayDocs(dir: string, root: string): void {
  for (const path of OVERLAY) {
    const src = join(root, path);

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

function seedEnv(dir: string): void {
  writeFileSync(
    join(dir, '.env'),
    'QBDS_REGISTRY_URL="http://localhost:4123"\n',
  );
}

function seedFixture(dir: string, fixture: string, evalsRoot: string): void {
  const src = join(evalsRoot, fixture);

  if (!existsSync(src)) {
    throw new Error(`missing fixture: ${fixture}`);
  }

  cpSync(src, join(dir, 'evals-fixture'), { recursive: true });
}

function registryEntryCheck(ctx: CheckCtx): CheckResult {
  const { check, dir, id } = ctx;

  if (check.type !== 'registryEntry') {
    throw new Error(`expected registryEntry, got ${check.type}`);
  }

  const { name, requires = [] } = check;
  const reg = JSON.parse(readFileSync(join(dir, 'registry.json'), 'utf8'));
  const item = (reg.items ?? []).find((x: { name: string }) => x.name === name);

  if (!item) {
    return { id, ok: false, detail: `no "${name}" registry item` };
  }

  const deps: string[] = item.registryDependencies ?? [];
  const missing = requires.filter(
    r => !deps.some(d => d === r || d.includes(`/r/${r}.json`)),
  );

  return {
    id,
    ok: !missing.length,
    detail: missing.length
      ? `${name} missing registryDependencies: ${missing.join(', ')}`
      : `${name} entry has ${requires.join(', ') || 'an entry'}`,
  };
}

function stepsLogCheck(ctx: CheckCtx): CheckResult {
  const { check, dir, id } = ctx;

  if (check.type !== 'stepsLog') {
    throw new Error(`expected stepsLog, got ${check.type}`);
  }

  const rel = check.path ?? 'evals-out/steps.md';
  const abs = join(dir, rel);

  if (!existsSync(abs)) {
    return { id, ok: false, detail: 'evals-out/steps.md missing' };
  }

  const got = readFileSync(abs, 'utf8')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);
  const want = STEP_NAMES.map((n, idx) => `${idx + 1} ${n}`);
  const ok =
    got.length === want.length && got.every((l, idx) => l === want[idx]);

  return {
    id,
    ok,
    detail: ok
      ? 'steps.md: 8 lines, once each, in order'
      : `steps.md expected [${want.join(' | ')}], got [${got.join(' | ') || 'empty'}]`,
  };
}

export const qbdsPlugin: Plugin = {
  gate: GATE,

  overlay: overlayDocs,

  seed(dir, evalCase, evalsRoot) {
    seedEnv(dir);

    if (evalCase.fixture) {
      seedFixture(dir, evalCase.fixture, evalsRoot);
    }
  },

  applySetup(dir, evalCase) {
    if (evalCase.mode === 'e2e') {
      stripComponent(dir, evalCase);
      return;
    }

    if (evalCase.setup === 'strip') stripComponent(dir, evalCase);
    if (evalCase.setup === 'drop-registry')
      dropRegistry(dir, evalCase.component);
    if (evalCase.setup === 'drop-tests') dropTests(dir, evalCase.component);
  },

  checks: {
    registryEntry: registryEntryCheck,
    stepsLog: stepsLogCheck,
  },
};
