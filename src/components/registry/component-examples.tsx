'use client';

import type { ExampleMeta } from '@/lib/registry';

import { ExamplePreview } from './example-preview';

interface ComponentExamplesProps {
  /** Array of example metadata */
  examples: ExampleMeta[];
  /** Map of example components by name */
  components: Record<string, React.ReactNode>;
  /** Map of example source code by name */
  codeMap: Record<string, string>;
}

/**
 * Renders a grid/list of component examples with preview/code toggles
 */
export function ComponentExamples({
  examples,
  components,
  codeMap,
}: ComponentExamplesProps) {
  if (!examples || examples.length === 0) {
    return (
      <div className="text-fg-secondary p-8 text-center">
        No examples available for this component.
      </div>
    );
  }

  return (
    <div className="space-y-9">
      {examples.map(example => {
        const component = components[example.name];
        const code = codeMap[example.name] || '// Source code not available';

        if (!component) {
          console.warn(`Example component "${example.name}" not found`);
          return null;
        }

        return (
          <ExamplePreview
            key={example.name}
            title={example.title}
            description={example.description}
            code={code}>
            {component}
          </ExamplePreview>
        );
      })}
    </div>
  );
}
