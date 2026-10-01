import { useEffect, useRef, useState } from 'react';

import { parsePlaygroundSpec } from '@/app/playground/ai/parse-playground-spec';
import { type PlaygroundSpec } from '@/app/playground/ai/playground-ai-types';
import { useChromeLanguageModel } from '@/app/playground/ai/use-chrome-language-model';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
};

type PlaygroundAiChatProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSpec: (spec: PlaygroundSpec) => void;
};

function messageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function PlaygroundAiChat({
  open,
  onOpenChange,
  onSpec,
}: PlaygroundAiChatProps) {
  const { status, statusDetail, complete } = useChromeLanguageModel();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: messageId(),
      role: 'system',
      text: 'Describe a UI to build with QBDS components — for example, “Create a sign up form”.',
    },
  ]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  async function send() {
    const text = draft.trim();
    if (!text || busy) {
      return;
    }

    setDraft('');
    setMessages(prev => [
      ...prev,
      { id: messageId(), role: 'user', text },
    ]);
    setBusy(true);

    try {
      const raw = await complete(text);
      const spec = parsePlaygroundSpec(raw);
      onSpec(spec);
      setMessages(prev => [
        ...prev,
        {
          id: messageId(),
          role: 'assistant',
          text: spec.summary ?? 'Generated a new layout in the playground.',
        },
      ]);
    } catch (error) {
      const detail =
        error instanceof Error ? error.message : 'Something went wrong.';
      setMessages(prev => [
        ...prev,
        { id: messageId(), role: 'assistant', text: detail },
      ]);
    } finally {
      setBusy(false);
    }
  }

  const canSend =
    !busy && draft.trim().length > 0 && status !== 'unsupported' && status !== 'checking';

  if (!open) {
    return null;
  }

  return (
    <div
      className="border-stroke-divider bg-surface-primary fixed right-6 bottom-6 z-50 flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-xl border shadow-elevation-2"
      data-slot="playground-ai-chat"
      role="dialog"
      aria-label="QBDS AI chat">
      <header className="border-stroke-divider flex shrink-0 items-center gap-2 border-b px-3 py-2">
        <IconShell size="sm" variant="secondary">
          <Icon icon="auto_awesome" />
        </IconShell>
        <div className="min-w-0 flex-1">
          <p className="paragraph-small text-fg-primary font-medium">QBDS AI</p>
          <p className="paragraph-small text-fg-tertiary truncate">
            {status === 'ready'
              ? 'Chrome on-device model'
              : status === 'checking'
                ? 'Checking availability…'
                : statusDetail ?? 'Unavailable'}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Close AI chat"
          onClick={() => onOpenChange(false)}>
          <IconShell hoverable>
            <Icon icon="close" />
          </IconShell>
        </Button>
      </header>

      <ScrollArea className="min-h-0 flex-1 px-3 py-3">
        <ul className="flex flex-col gap-3">
          {messages.map(message => (
            <li
              key={message.id}
              className={cn(
                'paragraph-small rounded-lg px-3 py-2',
                message.role === 'user' &&
                  'bg-fill-onsurface-ui-2 text-fg-primary ml-6',
                message.role === 'assistant' &&
                  'bg-surface-secondary text-fg-secondary mr-4',
                message.role === 'system' &&
                  'text-fg-tertiary border border-dashed px-3 py-2',
              )}>
              {message.text}
            </li>
          ))}
        </ul>
        <div ref={bottomRef} />
      </ScrollArea>

      <footer className="border-stroke-divider flex shrink-0 flex-col gap-2 border-t p-3">
        <Textarea
          rows={2}
          placeholder="Create a sign up form with email and password…"
          value={draft}
          disabled={busy || status === 'unsupported'}
          onChange={event => setDraft(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              void send();
            }
          }}
        />
        <Button
          variant="default"
          size="sm"
          className="w-full"
          disabled={!canSend}
          onClick={() => void send()}>
          {busy ? 'Generating…' : 'Generate UI'}
        </Button>
      </footer>
    </div>
  );
}
