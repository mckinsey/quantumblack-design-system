'use client';

import { CodeBlock } from './code-block';

interface UsageSectionProps {
  /** Component name for imports */
  componentName: string;
  /** Component title/display name */
  componentTitle: string;
  /** Optional custom usage example code */
  usageCode?: string;
}

/**
 * Renders the usage section with import statements and basic usage example
 */
export function UsageSection({
  componentName,
  componentTitle,
  usageCode,
}: UsageSectionProps) {
  const componentImportName = componentTitle.replace(/\s+/g, '');

  const importStatement = `import { ${componentImportName} } from "@/components/ui/${componentName}"`;

  if (usageCode) {
    return (
      <CodeBlock
        code={usageCode}
        language="tsx"
        filename="Usage example"
        showLineNumbers
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="paragraph-regular-emphasised-600 text-fg-primary">
          Import
        </h4>
        <CodeBlock
          code={importStatement}
          language="typescript"
          filename="Import statement"
        />
      </div>

      <div className="space-y-2">
        <h4 className="paragraph-regular-emphasised-600 text-fg-primary">
          Basic Usage
        </h4>
        <CodeBlock
          code={`<${componentImportName} />`}
          language="tsx"
          filename="Usage example"
        />
      </div>
    </div>
  );
}
