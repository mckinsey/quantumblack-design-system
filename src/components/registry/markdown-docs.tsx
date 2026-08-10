'use client';

import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';

import { CodeBlock } from '@/components/registry/code-block';
import { Section } from '@/components/registry/section';
import { Icon } from '@/components/ui/icon';

type MarkdownDocsProps = {
  content: string;
};

type DocsSection = {
  title: string;
  body: string;
};

function splitSections(markdown: string): DocsSection[] {
  const chunks = markdown.split(/^## /m).filter(chunk => chunk.trim());

  return chunks.map(chunk => {
    const newline = chunk.indexOf('\n');
    if (newline === -1) {
      return { title: chunk.trim(), body: '' };
    }

    return {
      title: chunk.slice(0, newline).trim(),
      body: chunk.slice(newline + 1).trim(),
    };
  });
}

function langFromClassName(className?: string): string {
  const match = /language-(\w+)/.exec(className ?? '');
  return match?.[1] ?? 'text';
}

const components: Components = {
  p: ({ children }) => (
    <p className="paragraph-regular-primary text-fg-secondary mb-4 last:mb-0">
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-fg-primary inline-flex items-center gap-1 underline underline-offset-4">
      {children}
      <Icon icon="open_in_new" size="sm" className="size-4" />
    </a>
  ),
  code: ({ className, children }) => {
    const text = String(children).replace(/\n$/, '');
    const isBlock = Boolean(className) || text.includes('\n');

    if (!isBlock) {
      return (
        <code className="paragraph-code-text bg-fill-subtle px-1.5 py-0.5">
          {text}
        </code>
      );
    }

    const lang = langFromClassName(className);

    return (
      <CodeBlock
        code={text}
        language={lang}
        filename={lang}
        showLineNumbers={lang === 'tsx'}
        className="mb-4 last:mb-0"
      />
    );
  },
  pre: ({ children }) => <>{children}</>,
  ul: ({ children }) => (
    <ul className="paragraph-regular-primary text-fg-secondary mb-4 list-disc space-y-1 pl-5 last:mb-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="paragraph-regular-primary text-fg-secondary mb-4 list-decimal space-y-1 pl-5 last:mb-0">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => (
    <strong className="paragraph-regular-emphasised-600 text-fg-primary">
      {children}
    </strong>
  ),
};

/**
 * Renders component docs from markdown.
 * Each `## Heading` becomes a registry Section.
 */
export function MarkdownDocs({ content }: MarkdownDocsProps) {
  const sections = splitSections(content);

  return (
    <>
      {sections.map(section => (
        <Section key={section.title} title={section.title}>
          {section.body ? (
            <ReactMarkdown components={components}>
              {section.body}
            </ReactMarkdown>
          ) : null}
        </Section>
      ))}
    </>
  );
}
