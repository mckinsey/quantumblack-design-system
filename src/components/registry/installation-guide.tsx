import { FileCode, Package, Terminal } from 'lucide-react';

import {
  type Component,
  getComponentFileTarget,
  getRegistryBaseUrl,
} from '@/lib/registry';

import { CodeBlock } from './code-block';

interface InstallationGuideProps {
  readonly component: Component;
}

export function InstallationGuide({ component }: InstallationGuideProps) {
  const includedFiles =
    component.files
      ?.map(file => getComponentFileTarget(file))
      .filter((target): target is string => Boolean(target)) ?? [];

  const registryBaseUrl = getRegistryBaseUrl();
  const installCommand = `npx shadcn@latest add ${registryBaseUrl}r/${component.name}.json`;
  // Convert title to valid component name (remove spaces, keep PascalCase)
  const componentImportName = component.title.replace(/\s+/g, '');
  const importStatement = `import { ${componentImportName} } from '@/components/ui/${component.name}'`;

  return (
    <div className="space-y-5">
      {/* CLI Installation */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Terminal className="text-fg-primary size-4" />
          <h3 className="headings-h4-semibold text-fg-primary">
            CLI Installation
          </h3>
        </div>
        <p className="paragraph-small-primary text-fg-secondary">
          Run the following command to add this component to your project:
        </p>
        <CodeBlock
          filename="CLI Installation"
          code={installCommand}
          language="bash"
        />
      </div>

      {/* Manual Installation */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FileCode className="text-fg-primary size-4" />
          <h3 className="headings-h4-semibold text-fg-primary">
            Manual Installation
          </h3>
        </div>
        <p className="paragraph-small-primary text-fg-secondary">
          Alternatively, copy and paste the component source files into your
          project.
        </p>

        <div className="space-y-2">
          <h4 className="paragraph-regular-emphasised-600 text-fg-primary">
            1. Copy the component files
          </h4>
          <p className="paragraph-small-primary text-fg-secondary">
            Copy the component source from the Code tab above and place it in
            your project.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="paragraph-regular-emphasised-600 text-fg-primary">
            2. Update your imports
          </h4>
          <CodeBlock
            code={importStatement}
            filename="Example Import"
            language="typescript"
          />
        </div>
      </div>

      {/* Files Included */}
      {includedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Package className="text-fg-primary size-4" />
            <h3 className="headings-h4-semibold text-fg-primary">
              Files Included
            </h3>
          </div>
          <div className="border-stroke-tertiary bg-surface-primary border p-4">
            <ul className="space-y-2">
              {includedFiles.map(target => (
                <li key={target} className="flex items-center gap-2">
                  <span className="bg-text-secondary size-1.5 shrink-0 rounded-full" />
                  <code className="paragraph-code-text text-fg-primary">
                    {target}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
