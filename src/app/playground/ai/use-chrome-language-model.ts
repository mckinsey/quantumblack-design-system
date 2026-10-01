import { useCallback, useEffect, useRef, useState } from 'react';

import { playgroundAiSystemPrompt } from './playground-ai-system-prompt';

export type ChromeAiStatus =
  | 'checking'
  | 'ready'
  | 'download'
  | 'unsupported'
  | 'error';

export function useChromeLanguageModel() {
  const [status, setStatus] = useState<ChromeAiStatus>('checking');
  const [statusDetail, setStatusDetail] = useState<string | null>(null);
  const sessionRef = useRef<LanguageModelSession | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function probe() {
      const lm = window.ai?.languageModel;
      if (!lm) {
        if (!cancelled) {
          setStatus('unsupported');
          setStatusDetail(
            'Chrome built-in AI is not available in this browser. Use Chrome desktop with Gemini Nano enabled.',
          );
        }
        return;
      }

      try {
        const caps = await lm.capabilities();
        if (cancelled) {
          return;
        }

        if (caps.available === 'readily') {
          setStatus('ready');
          setStatusDetail(null);
          return;
        }

        if (caps.available === 'after-download') {
          setStatus('download');
          setStatusDetail(
            'Model needs to download. Send a message to start download, or enable AI in Chrome settings.',
          );
          return;
        }

        setStatus('unsupported');
        setStatusDetail(
          'Language model is not available on this device. Check chrome://flags and on-device AI settings.',
        );
      } catch (error) {
        if (!cancelled) {
          setStatus('error');
          setStatusDetail(
            error instanceof Error ? error.message : 'Could not read AI capabilities.',
          );
        }
      }
    }

    probe();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      sessionRef.current?.destroy();
      sessionRef.current = null;
    };
  }, []);

  const ensureSession = useCallback(async () => {
    if (sessionRef.current) {
      return sessionRef.current;
    }

    const lm = window.ai?.languageModel;
    if (!lm) {
      throw new Error('Chrome AI is not available.');
    }

    const session = await lm.create({
      systemPrompt: playgroundAiSystemPrompt,
      temperature: 0.4,
    });
    sessionRef.current = session;
    setStatus('ready');
    setStatusDetail(null);
    return session;
  }, []);

  const complete = useCallback(
    async (userMessage: string) => {
      const session = await ensureSession();
      return session.prompt(userMessage);
    },
    [ensureSession],
  );

  return { status, statusDetail, complete };
}
