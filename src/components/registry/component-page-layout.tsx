'use client';

import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import type { Component, ComponentAPI, ExampleMeta } from '@/lib/registry';

import { APIReference } from './api-reference';
import { ComponentExamples } from './component-examples';
import { ExamplePreview } from './example-preview';
import { InstallationGuide } from './installation-guide';
import { MarkdownDocs } from './markdown-docs';
import { ComponentHeader, Section } from './section';
import { UsageSection } from './usage-section';

interface ComponentPageLayoutProps {
  /** Component metadata */
  component: Component;
  /** Primary/hero example component */
  primaryExample?: React.ReactNode;
  /** Primary example source code */
  primaryExampleCode?: string;
  /** Example metadata array */
  examples?: ExampleMeta[];
  /** Map of example components by name */
  exampleComponents?: Record<string, React.ReactNode>;
  /** Map of example source code by name */
  exampleCodeMap?: Record<string, string>;
  /** API documentation data */
  apiData?: ComponentAPI[];
  /** Optional markdown docs (`src/lib/docs/<name>.md`) */
  docs?: string;
  /** Whether to use the legacy preview (backwards compatibility) */
  useLegacyPreview?: boolean;
  /** Legacy preview content */
  legacyPreviewContent?: React.ReactNode;
  /** Legacy demo code */
  legacyDemoCode?: string;
}

/**
 * Component documentation page layout.
 *
 * Sections:
 * 1. Hero
 * 2. Installation
 * 3. Docs (markdown) or default Usage
 * 4. Examples
 * 5. API Reference
 */
export function ComponentPageLayout({
  component,
  primaryExample,
  primaryExampleCode,
  examples,
  exampleComponents,
  exampleCodeMap,
  apiData,
  docs,
  useLegacyPreview = false,
  legacyPreviewContent,
  legacyDemoCode,
}: ComponentPageLayoutProps) {
  const hasNewExamples = examples && examples.length > 0 && exampleComponents;

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <ComponentHeader
          title={component.title}
          description={component.description}
        />

        {useLegacyPreview && legacyPreviewContent ? (
          <div
            data-demo-preview
            className="border-stroke-tertiary bg-surface-primary border p-6">
            {legacyPreviewContent}
          </div>
        ) : primaryExample && primaryExampleCode ? (
          <ExamplePreview code={primaryExampleCode} featured>
            {primaryExample}
          </ExamplePreview>
        ) : null}
      </div>

      <Section title="Installation">
        <InstallationGuide component={component} />
      </Section>

      {docs ? (
        <MarkdownDocs content={docs} />
      ) : (
        <Section title="Usage">
          <UsageSection
            componentName={component.name}
            componentTitle={component.title}
          />
        </Section>
      )}

      {hasNewExamples && exampleCodeMap ? (
        <Section
          title="Examples"
          description="Click on any example to see the code.">
          <ComponentExamples
            examples={examples}
            components={exampleComponents}
            codeMap={exampleCodeMap}
          />
        </Section>
      ) : useLegacyPreview && legacyPreviewContent ? (
        <Section title="Preview">
          <div
            data-demo-preview
            className="border-stroke-tertiary bg-surface-primary overflow-auto border p-6">
            {legacyPreviewContent}
          </div>
          {legacyDemoCode && (
            <div className="mt-4">
              <ExamplePreview title="Full Demo Code" code={legacyDemoCode}>
                <div className="text-fg-secondary text-sm">
                  View the code above
                </div>
              </ExamplePreview>
            </div>
          )}
        </Section>
      ) : null}

      <Section
        title="API Reference"
        description="Component props and their types.">
        <Suspense
          fallback={
            <div className="space-y-4">
              <Skeleton className="bg-fill-onsurface-ui-3 h-8 w-48" />
              <Skeleton className="bg-fill-onsurface-ui-3 h-[200px] w-full" />
            </div>
          }>
          {apiData && apiData.length > 0 ? (
            <APIReference apis={apiData} />
          ) : (
            <div className="text-fg-secondary p-6 text-center">
              <p className="paragraph-regular-primary">
                API documentation is being generated.
              </p>
              <p className="paragraph-small-primary mt-1">
                Run{' '}
                <code className="paragraph-code-text bg-fill-subtle px-1.5 py-0.5">
                  npm run generate:api-docs
                </code>{' '}
                to generate API documentation.
              </p>
            </div>
          )}
        </Suspense>
      </Section>
    </div>
  );
}
