'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  className,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    async function highlightCode() {
      try {
        const { codeToHtml } = await import('shiki');
        const highlighted = await codeToHtml(code, {
          lang: language,
          theme: 'one-dark-pro',
          colorReplacements: {
            '#282c34': 'transparent', // Make background transparent to use our theme
          },
        });
        setHtml(highlighted);
      } catch (error) {
        console.error('Failed to highlight code:', error);
        // Fallback to plain text
        setHtml(`<pre><code>${code}</code></pre>`);
      }
    }

    highlightCode();
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div
      className={cn(
        'border-stroke-tertiary bg-surface-secondary relative flex flex-col border transition-colors',
        className,
      )}>
      {/* Sticky Header with filename and copy button */}
      <div className="border-stroke-tertiary bg-fill-onsurface-ui-3 sticky top-0 z-10 flex items-center justify-between border-b px-4 py-2">
        {filename && (
          <span className="paragraph-code-text text-fg-secondary">
            {filename}
          </span>
        )}
        <Button
          size="sm"
          variant="ghost"
          onClick={copyToClipboard}
          className="ml-auto h-8 px-2 transition-colors">
          {copied ? (
            <>
              <Check className="text-status-success mr-1 size-4" />
              <span className="paragraph-small-primary text-fg-primary">
                Copied
              </span>
            </>
          ) : (
            <>
              <Copy className="mr-1 size-4" />
              <span className="paragraph-small-primary text-fg-primary">
                Copy
              </span>
            </>
          )}
        </Button>
      </div>

      {/* Scrollable Code content */}
      <div className="bg-surface-secondary flex-1 overflow-auto">
        {html ? (
          <div
            className={cn(
              'paragraph-code-text [&>pre]:bg-surface-secondary [&>pre]:m-0 [&>pre]:p-4',
              '[&_code]:font-mono [&_code]:text-sm [&_code]:whitespace-pre',
              showLineNumbers && '[&>pre]:pl-12',
            )}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="bg-surface-secondary m-0 p-4">
            <code className="text-fg-primary font-mono text-sm whitespace-pre">
              {code}
            </code>
          </pre>
        )}
      </div>
    </div>
  );
}
