import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

export default function IntroductionPage() {
  return (
    <main className="bg-surface-base min-h-screen w-full p-5 md:p-10">
      <div className="mx-auto w-full max-w-[800px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="headings-h1-regular text-fg-primary">
              Introductio
            </h1>
          </div>

          <div className="flex flex-col gap-4">
            <p className="paragraph-large-primary text-fg-secondary">
              QuantumBlack Design System is a set of components built with Radix
              UI that are designed to be accessible and can be styled with your
              design tokens.
            </p>

            <p className="paragraph-large-primary text-fg-secondary">
              With most traditional component libraries, you install a package
              from NPM, import the components, and use them in your app. This
              approach works well until you need to customize a component to
              match your design system or need one that is not included in the
              library. Often, you end up wrapping library components, writing
              workarounds to override styles, or mixing components from
              different libraries with incompatible APIs.
            </p>

            <p className="paragraph-large-primary text-fg-secondary">
              QuantumBlack Design System eliminates that need. It is built
              around the following principles:
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h2 className="headings-h3-semibold text-fg-primary mb-2">
                Open Code
              </h2>
              <p className="paragraph-regular-primary text-fg-secondary">
                QuantumBlack Design System gives you the component code. You can
                use components as is, or see exactly how each is built and
                modify any part to customize or extend it as needed.
              </p>
            </div>

            <div>
              <h2 className="headings-h3-semibold text-fg-primary mb-2">
                Composition
              </h2>
              <p className="paragraph-regular-primary text-fg-secondary">
                Every component shares a common, composable interface. If a
                component does not exist, we bring it in, make it composable,
                and adjust its style to match the rest of the design system. You
                can also{' '}
                <a
                  href="https://github.com/mckinsey/quantumblack-design-system/issues/new"
                  className="text-fg-accent underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer">
                  request a missing component on GitHub
                </a>
                . A shared, composable interface makes the system more
                predictable.
              </p>
            </div>

            <div>
              <h2 className="headings-h3-semibold text-fg-primary mb-2">
                Design Tokens
              </h2>
              <p className="paragraph-regular-primary text-fg-secondary">
                QuantumBlack Design System tokens ensure consistent theming
                across all components. These tokens provide a unified design
                language that helps your UI look consistent while remaining easy
                to customize.
              </p>
            </div>

            <div>
              <h2 className="headings-h3-semibold text-fg-primary mb-2">
                AI-Ready
              </h2>
              <p className="paragraph-regular-primary text-fg-secondary">
                QuantumBlack Design System simplifies how AI tools work with
                your code. The open code and consistent API enable AI models to
                read, understand, and generate new components that integrate
                with your existing design.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Button render={<Link to="/components" />} nativeButton={false}>
              Browse Components
            </Button>
            <Button
              variant="outline"
              render={<Link to="/installation" />}
              nativeButton={false}>
              Installation
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
