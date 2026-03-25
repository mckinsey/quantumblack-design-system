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
  // Convert title to valid component name (remove spaces, keep PascalCase)
  const componentImportName = componentTitle.replace(/\s+/g, '');

  const importStatement = `import { ${componentImportName} } from "@/components/ui/${componentName}"`;

  const defaultUsageCode = usageCode || `<${componentImportName} />`;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="paragraph-medium-emphasised-600 text-fg-primary">
          Import
        </h4>
        <CodeBlock
          code={importStatement}
          language="typescript"
          filename="Import statement"
        />
      </div>

      <div className="space-y-2">
        <h4 className="paragraph-medium-emphasised-600 text-fg-primary">
          Basic Usage
        </h4>
        <CodeBlock
          code={defaultUsageCode}
          language="tsx"
          filename="Usage example"
        />
      </div>
    </div>
  );
}
