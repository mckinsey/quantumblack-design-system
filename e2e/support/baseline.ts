import * as fs from 'node:fs';
import * as path from 'node:path';

import { baselineKey } from './routes';

const BASELINE_PATH = path.join(process.cwd(), 'e2e/a11y-baseline.json');

type Baseline = Record<string, number>;

function readBaseline(): Baseline {
  if (!fs.existsSync(BASELINE_PATH)) {
    return {};
  }

  return JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8')) as Baseline;
}

function writeBaseline(baseline: Baseline) {
  const sorted = Object.fromEntries(
    Object.entries(baseline).sort(([a], [b]) => a.localeCompare(b)),
  );

  fs.writeFileSync(
    BASELINE_PATH,
    `${JSON.stringify(sorted, null, 2)}\n`,
    'utf8',
  );
}

export function getBaselineMax(label: string, theme: string) {
  const baseline = readBaseline();
  return baseline[baselineKey(label, theme)] ?? 0;
}

export function updateBaseline(label: string, theme: string, count: number) {
  const baseline = readBaseline();
  baseline[baselineKey(label, theme)] = count;
  writeBaseline(baseline);
}

export function shouldUpdateBaseline() {
  return process.env.UPDATE_A11Y_BASELINE === '1';
}
