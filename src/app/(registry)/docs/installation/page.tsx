import { Link } from 'react-router';

import { CodeBlock } from '@/components/registry/code-block';
import { Button } from '@/components/ui/button';
import { getRegistryBaseUrl } from '@/lib/registry';

export default function InstallationPage() {
  const registryBaseUrl = getRegistryBaseUrl();
  return (
    <main className="bg-surface-bg-base min-h-screen w-full p-5 md:p-10">
      <div className="mx-auto w-full max-w-[800px]">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="headings-h1-regular text-fg-primary">
              Installation
            </h1>
            <p className="paragraph-large-primary text-fg-secondary">
              Install and use components from the QuantumBlack Design System in
              your project.
            </p>
          </div>

          {/* Prerequisites */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="headings-h3-semibold text-fg-primary mb-2">
                Prerequisites
              </h2>
              <p className="paragraph-regular-primary text-fg-secondary">
                Make sure you have the following set up before installing
                components
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="bg-fill-onsurface-subtle text-fg-primary paragraph-small-emphasised flex h-6 w-6 shrink-0 items-center justify-center">
                1
              </span>
              <div>
                <p className="paragraph-regular-primary text-fg-primary font-semibold">
                  A React project with Tailwind CSS
                </p>
                <p className="paragraph-regular-primary text-fg-secondary">
                  Next.js, Vite, or any React framework with Tailwind CSS
                  configured.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="bg-fill-onsurface-subtle text-fg-primary paragraph-small-emphasised flex h-6 w-6 shrink-0 items-center justify-center">
                2
              </span>
              <div>
                <p className="paragraph-regular-primary text-fg-primary font-semibold">
                  shadcn/ui initialized
                </p>
                <p className="paragraph-regular-primary text-fg-secondary">
                  Run{' '}
                  <code className="paragraph-code-text bg-fill-onsurface-subtle px-1.5 py-0.5">
                    npx shadcn@latest init
                  </code>{' '}
                  to set up your project.
                </p>
              </div>
            </div>
          </div>

          {/* Step 1: Configure components.json */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="headings-h3-semibold text-fg-primary mb-2">
                Step 1: Configure components.json
              </h2>
              <p className="paragraph-regular-primary text-fg-secondary">
                Add the QB Design System registry to your{' '}
                <code className="paragraph-code-text bg-fill-onsurface-subtle px-1.5 py-0.5">
                  components.json
                </code>
                :
              </p>
            </div>

            <CodeBlock
              code={`"registries": {
  "@qbds": {
    "url": "${registryBaseUrl}r/{name}.json"
  }
}`}
              language="json"
              filename="components.json"
            />

            <p className="paragraph-regular-primary text-fg-secondary italic">
              <strong>Note:</strong> Ensure the registry name is always{' '}
              <code className="paragraph-code-text bg-fill-onsurface-subtle px-1.5 py-0.5">
                @qbds
              </code>{' '}
              as internally the components are referred to using this prefix.
            </p>
          </div>

          {/* Step 2: Install a component */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="headings-h3-semibold text-fg-primary mb-2">
                Step 2: Install a component
              </h2>
              <p className="paragraph-regular-primary text-fg-secondary">
                Use the shadcn CLI to add components
              </p>
            </div>

            <CodeBlock
              code={`npx shadcn@latest add @qbds/button`}
              language="bash"
              filename="Terminal"
            />

            <p className="paragraph-regular-primary text-fg-secondary italic">
              <strong>Note:</strong> The theme from the design system will be
              present inside{' '}
              <code className="paragraph-code-text bg-fill-onsurface-subtle px-1.5 py-0.5">
                styles/globals.css
              </code>
              . Ensure you are importing this style in your main{' '}
              <code className="paragraph-code-text bg-fill-onsurface-subtle px-1.5 py-0.5">
                layout.tsx
              </code>{' '}
              file, so that the styling is added properly:
            </p>

            <CodeBlock
              code={`// Update the path to match your project structure
import '../styles/globals.css'`}
              language="typescript"
              filename="layout.tsx"
            />
          </div>

          {/* Step 3: Import and use */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="headings-h3-semibold text-fg-primary mb-2">
                Step 3: Import and use
              </h2>
              <p className="paragraph-regular-primary text-fg-secondary">
                Start using the component in your code
              </p>
            </div>

            <CodeBlock
              code={`import { Button } from '@/components/ui/button'

export function MyComponent() {
  return (
    <Button variant="default">
      Click me
    </Button>
  )
}`}
              language="tsx"
              filename="Example Usage"
            />
          </div>

          {/* Manual Installation */}
          <div>
            <h2 className="headings-h3-semibold text-fg-primary mb-2">
              Manual Installation
            </h2>
            <p className="paragraph-regular-primary text-fg-secondary">
              Alternatively, you can copy component code directly. Each
              component page includes the full source code. You can copy and
              paste the code directly into your project at{' '}
              <code className="paragraph-code-text bg-fill-onsurface-subtle px-1.5 py-0.5">
                components/ui/
              </code>
              . Make sure to also copy any required dependencies listed on the
              component page.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/components">Browse Components</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
