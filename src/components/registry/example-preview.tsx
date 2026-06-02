'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface ExamplePreviewProps {
  /** Title of the example */
  title?: string;
  /** Description of the example */
  description?: string;
  /** The React component to render as a preview */
  children: React.ReactNode;
  /** The source code to display */
  code: string;
  /** Additional className for the container */
  className?: string;
  /** Whether this is a featured/hero example (affects styling) */
  featured?: boolean;
}

export function ExamplePreview({
  title,
  description,
  children,
  code,
  className,
  featured = false,
}: ExamplePreviewProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useEffect(() => {
    async function highlightCode() {
      try {
        const { codeToHtml } = await import('shiki');
        const html = await codeToHtml(code, {
          lang: 'tsx',
          theme: 'one-dark-pro',
          colorReplacements: {
            '#282c34': 'transparent',
          },
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error('Failed to highlight code:', error);
        setHighlightedCode(`<pre><code>${code}</code></pre>`);
      }
    }

    highlightCode();
  }, [code]);

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
        'border-stroke-tertiary bg-surface-primary overflow-hidden border',
        className,
      )}>
      {/* Header with title and description */}
      {(title || description) && (
        <div className="bg-fill-muted px-4 py-3">
          {title && (
            <h3 className="headings-h4-semibold text-fg-primary">{title}</h3>
          )}
          {description && (
            <p className="paragraph-small-primary text-fg-secondary mt-0.5">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Preview */}
      <div
        className={cn(
          'bg-surface-primary flex w-full items-center justify-center p-6',
          featured ? 'min-h-[200px]' : 'min-h-[120px]',
        )}>
        {children}
      </div>

      {/* Code section */}
      <div>
        {/* Code header — full-width toggle button */}
        <button
          onClick={() => setIsExpanded(v => !v)}
          className="bg-fill-muted flex w-full cursor-pointer items-center justify-between px-3 py-2">
          <span className="paragraph-small-emphasised text-fg-secondary">
            Code
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={e => {
                e.stopPropagation();
                copyToClipboard();
              }}
              className="h-7 px-2 text-xs">
              {copied ? (
                <>
                  <Icon
                    icon="check"
                    className="text-status-success mr-1 size-4"
                  />
                  Copied
                </>
              ) : (
                <>
                  <Icon icon="content_copy" className="mr-1 size-4" />
                  Copy
                </>
              )}
            </Button>
            <Icon
              icon="keyboard_arrow_down"
              className="text-fg-secondary"
              style={{
                fontSize: 14,
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: prefersReducedMotion
                  ? undefined
                  : `transform ${isExpanded ? '220ms' : '160ms'} cubic-bezier(0.23, 1, 0.32, 1)`,
              }}
            />
          </div>
        </button>

        {/* Animated code content */}
        <div
          className="grid overflow-hidden"
          style={{
            gridTemplateRows: isExpanded ? '1fr' : '0fr',
            transition: prefersReducedMotion
              ? undefined
              : `grid-template-rows ${isExpanded ? '220ms' : '160ms'} cubic-bezier(0.23, 1, 0.32, 1)`,
          }}>
          <div className="min-h-0">
            <div className="bg-surface-secondary max-h-[400px] w-full overflow-auto">
              {highlightedCode ? (
                <div
                  className="paragraph-code-text [&>pre]:bg-surface-secondary [&_.shiki]:!bg-surface-secondary [&_code]:font-mono [&_code]:text-sm [&_code]:whitespace-pre [&>pre]:m-0 [&>pre]:p-4"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
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
        </div>
      </div>
    </div>
  );
}

/**
 * A simpler version for the examples grid - shows title, preview, and code
 */
interface ExampleCardProps {
  /** Unique identifier for the example */
  name: string;
  /** Title displayed in the card header */
  title: string;
  /** Optional description */
  description?: string;
  /** The React component to render */
  children: React.ReactNode;
  /** The source code string */
  code: string;
}

export function ExampleCard({
  title,
  description,
  children,
  code,
}: ExampleCardProps) {
  return (
    <ExamplePreview title={title} description={description} code={code}>
      {children}
    </ExamplePreview>
  );
}
