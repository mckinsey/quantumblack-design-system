import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

import { run } from './lib/runner.js';
import { qbdsPlugin } from './qbds.js';

const ROOT = execFileSync('git', ['rev-parse', '--show-toplevel'], {
  encoding: 'utf8',
}).trim();

const EVALS = join(ROOT, '.agents/skills/create-component/evals');

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

run({
  root: ROOT,
  suitePath: join(EVALS, 'evals.json'),
  evalsRoot: EVALS,
  runsDir: join('/tmp', 'qbds-evals-runs'),
  resultsDir: join(ROOT, 'evals/results'),
  plugin: qbdsPlugin,
  opts: {
    id: values.id ?? [],
    suite: values.suite ?? 'all',
    component: values.component ?? [],
    focus: values.focus ?? [],
    model: values.model ?? 'composer-2.5',
    keep: values.keep ?? false,
    dryRun: values['dry-run'] ?? false,
  },
}).then(code => process.exit(code));
