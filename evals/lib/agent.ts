import { Agent, CursorAgentError } from '@cursor/sdk';

export { CursorAgentError };

export async function withHeartbeat<T>(
  label: string,
  task: () => Promise<T>,
): Promise<T> {
  const start = Date.now();

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

export async function runAgent(
  prompt: string,
  cwd: string,
  model: string,
): Promise<{ ok: true } | { ok: false; detail: string }> {
  try {
    const run = await withHeartbeat('agent', () =>
      Agent.prompt(prompt, {
        apiKey: process.env.CURSOR_API_KEY!,
        model: { id: model },
        local: { cwd, settingSources: [] },
      }),
    );

    console.log(`  status: ${run.status}`);

    if (run.status !== 'finished') {
      console.error(`  agent failed: ${run.error?.message ?? run.status}`);
      console.log(run.error ?? { message: 'no error detail' });

      return {
        ok: false,
        detail: run.error?.message ?? run.status,
      };
    }

    return { ok: true };
  } catch (error) {
    if (!(error instanceof CursorAgentError)) {
      throw error;
    }

    console.error(`  startup failed: ${error.message}`);
    console.log(error.toJSON());

    return { ok: false, detail: error.message };
  }
}
