import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { CheckCtx, CheckResult, Eval, Plugin } from './types.js';

function fileCheck(ctx: CheckCtx): CheckResult {
  const { check, dir, id } = ctx;

  if (check.type !== 'fileExists' && check.type !== 'fileAbsent') {
    throw new Error(`expected fileExists or fileAbsent, got ${check.type}`);
  }

  const path = check.path;
  const there = existsSync(join(dir, path));
  const ok = check.type === 'fileExists' ? there : !there;

  return {
    id,
    ok,
    detail: `${path} ${there ? 'exists' : 'absent'}`,
  };
}

function grepCheck(ctx: CheckCtx): CheckResult {
  const { check, dir, id } = ctx;

  if (check.type !== 'grep') {
    throw new Error(`expected grep, got ${check.type}`);
  }

  const abs = join(dir, check.path);

  if (!existsSync(abs)) {
    return { id, ok: false, detail: `${check.path} missing` };
  }

  const want = check.match ?? true;
  const hit = new RegExp(check.pattern, 'm').test(readFileSync(abs, 'utf8'));

  return {
    id,
    ok: hit === want,
    detail: `${check.path} ${hit ? 'matches' : 'does not match'} /${check.pattern}/ (wanted ${want ? 'a match' : 'no match'})`,
  };
}

const builtins: Record<string, (ctx: CheckCtx) => CheckResult> = {
  fileExists: fileCheck,
  fileAbsent: fileCheck,
  grep: grepCheck,
};

export function runChecks(
  dir: string,
  evalCase: Eval,
  plugin: Plugin,
): CheckResult[] {
  return (evalCase.checks ?? []).map((check, i) => {
    const id = `c${i + 1}`;
    const ctx: CheckCtx = { dir, check, id, evalCase };

    try {
      const builtin = builtins[check.type];

      if (builtin) {
        return builtin(ctx);
      }

      const custom = plugin.checks?.[check.type];

      if (custom) {
        const result = custom(ctx);

        if (result) {
          return result;
        }
      }

      return {
        id,
        ok: false,
        detail: `unknown check type: ${check.type}`,
      };
    } catch (error) {
      return {
        id,
        ok: false,
        detail: `check threw: ${(error as Error).message}`,
      };
    }
  });
}
