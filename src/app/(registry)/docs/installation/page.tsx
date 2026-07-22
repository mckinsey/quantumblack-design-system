import { Link } from 'react-router';

import { CodeBlock } from '@/components/registry/code-block';
import { Button } from '@/components/ui/button';
import { getRegistryBaseUrl } from '@/lib/registry';

export default function InstallationPage() {
  const registryBaseUrl = getRegistryBaseUrl();
  return (
    <main className="bg-surface-base min-h-screen w-full p-5 md:p-10">
      <div className="mx-auto w-full max-w-[800px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="headings-h1-regular text-fg-primary">
              Installation
            </h1>
            <p className="paragraph-large-primary text-fg-secondary">
              Install and use components from the QuantumBlack Design System in
              your project.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h2 className="headings-h3-semibold text-fg-primary mb-2">
                How this differs from traditional component libraries
              </h2>
              <p className="paragraph-regular-primary text-fg-secondary mb-4">
                Most component libraries are distributed as NPM packages. You
                add a dependency, import components, and use them. Customization
                usually means overriding styles or wrapping components, and you
                are limited to what the package exports.
              </p>
              <p className="paragraph-regular-primary text-fg-secondary mb-4">
                QuantumBlack Design System uses the{' '}
                <a
                  href="https://ui.shadcn.com/"
                  className="text-fg-accent underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer">
                  shadcn
                </a>{' '}
                model instead. The shadcn CLI copies component source files into
                your project — typically under{' '}
                <code className="paragraph-code-text bg-fill-subtle px-1.5 py-0.5">
                  components/ui/
                </code>
                . You own the code and can change it without working around a
                packaged dependency.
              </p>
              <p className="paragraph-regular-primary text-fg-secondary">
                To install a component, you run a shadcn command against this
                registry. The CLI writes the files into your codebase alongside
                your own components. You only need to add what you want to use.
              </p>
            </div>
          </div>

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
              <span className="bg-fill-subtle text-fg-primary paragraph-small-emphasised flex h-6 w-6 shrink-0 items-center justify-center">
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
              <span className="bg-fill-subtle text-fg-primary paragraph-small-emphasised flex h-6 w-6 shrink-0 items-center justify-center">
                2
              </span>
              <div>
                <p className="paragraph-regular-primary text-fg-primary font-semibold">
                  shadcn/ui initialized
                </p>
                <p className="paragraph-regular-primary text-fg-secondary">
                  Run{' '}
                  <code className="paragraph-code-text bg-fill-subtle px-1.5 py-0.5">
                    npx shadcn@latest init
                  </code>{' '}
                  to set up your project.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h2 className="headings-h3-semibold text-fg-primary mb-2">
                Step 1: Configure components.json
              </h2>
              <p className="paragraph-regular-primary text-fg-secondary">
                Add the QuantumBlack Design System registry to your{' '}
                <code className="paragraph-code-text bg-fill-subtle px-1.5 py-0.5">
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
              <code className="paragraph-code-text bg-fill-subtle px-1.5 py-0.5">
                @qbds
              </code>{' '}
              as internally the components are referred to using this prefix.
            </p>
          </div>

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
              <code className="paragraph-code-text bg-fill-subtle px-1.5 py-0.5">
                styles/globals.css
              </code>
              . Ensure you are importing this style in your main{' '}
              <code className="paragraph-code-text bg-fill-subtle px-1.5 py-0.5">
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

          <div>
            <h2 className="headings-h3-semibold text-fg-primary mb-2">
              Manual Installation
            </h2>
            <p className="paragraph-regular-primary text-fg-secondary">
              Alternatively, you can copy component code directly. Each
              component page includes the full source code. You can copy and
              paste the code directly into your project at{' '}
              <code className="paragraph-code-text bg-fill-subtle px-1.5 py-0.5">
                components/ui/
              </code>
              . Make sure to also copy any required dependencies listed on the
              component page.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Button render={<Link to="/components" />} nativeButton={false}>
              Browse Components
            </Button>
          </div>

          <p className="paragraph-small-primary text-fg-tertiary border-stroke-tertiary mt-8 border-t pt-6">
            Open sourced under the{' '}
            <a
              href="https://github.com/mckinsey/quantumblack-design-system/blob/main/LICENSE.txt"
              className="text-fg-accent underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer">
              Apache License 2.0
            </a>
            . Copyright McKinsey &amp; Company. Source on{' '}
            <a
              href="https://github.com/mckinsey/quantumblack-design-system"
              className="text-fg-accent underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer">
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
