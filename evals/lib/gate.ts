import { execFileSync } from 'node:child_process';

import type { CheckResult } from './types.js';

export function runGate(dir: string, cmd: string): CheckResult {
  try {
    execFileSync('sh', ['-c', cmd], { cwd: dir, stdio: 'pipe' });

    return { id: 'gate', ok: true, detail: cmd };
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
