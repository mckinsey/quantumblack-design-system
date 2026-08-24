import { Agent } from '@cursor/sdk';

import { withHeartbeat } from './agent.js';
import type { CheckResult, Eval } from './types.js';

export async function grade(
  dir: string,
  evalCase: Eval,
  model: string,
): Promise<CheckResult[]> {
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
