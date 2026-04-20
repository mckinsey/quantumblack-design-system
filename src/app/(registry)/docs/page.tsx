import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

export default function IntroductionPage() {
  return (
    <main className="bg-surface-bg-base min-h-screen w-full p-5 md:p-10">
      <div className="mx-auto w-full max-w-[800px]">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="headings-h1-regular text-fg-primary">
              Introduction
            </h1>
          </div>

          {/* Main Content */}
          <div className="flex flex-col gap-4">
            <p className="paragraph-large-primary text-fg-secondary">
              QuantumBlack Design System is a set of beautifully-designed,
              accessible components based on ShadCN, built with Radix UI and
              styled with your design tokens. Open Source. Open Code.
            </p>

            <p className="paragraph-large-primary text-fg-secondary">
              You know how most traditional component libraries work: you
              install a package from NPM, import the components, and use them in
              your app. This approach works well until you need to customize a
              component to fit your design system or require one that isn&apos;t
              included in the library. Often, you end up wrapping library
              components, writing workarounds to override styles, or mixing
              components from different libraries with incompatible APIs.
            </p>

            <p className="paragraph-large-primary text-fg-secondary">
              This is what the QB Design System aims to solve. It is built
              around the following principles:
            </p>
          </div>

          {/* Principles */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="headings-h3-semibold text-fg-primary mb-2">
                Open Code
              </h2>
              <p className="paragraph-regular-primary text-fg-secondary">
                The QB Design System hands you the actual component code. You
                have full control to customize and extend the components to your
                needs. This means full transparency — you see exactly how each
                component is built. Easy customization — modify any part of a
                component to fit your design and functionality requirements.
              </p>
            </div>

            <div>
              <h2 className="headings-h3-semibold text-fg-primary mb-2">
                Composition
              </h2>
              <p className="paragraph-regular-primary text-fg-secondary">
                Every component shares a common, composable interface. If a
                component does not exist, we bring it in, make it composable,
                and adjust its style to match and work with the rest of the
                design system. A shared, composable interface means it&apos;s
                predictable for both your team and LLMs.
              </p>
            </div>

            <div>
              <h2 className="headings-h3-semibold text-fg-primary mb-2">
                Design Tokens
              </h2>
              <p className="paragraph-regular-primary text-fg-secondary">
                Built with QB design system tokens for consistent theming across
                all components. The tokens provide a unified design language
                that ensures your UI looks cohesive and professional out of the
                box, while remaining easily customizable.
              </p>
            </div>

            <div>
              <h2 className="headings-h3-semibold text-fg-primary mb-2">
                AI-Ready
              </h2>
              <p className="paragraph-regular-primary text-fg-secondary">
                The design of the QB Design System makes it easy for AI tools to
                work with your code. Its open code and consistent API allow AI
                models to read, understand, and even generate new components
                that integrate seamlessly with your existing design.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/components">Browse Components</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/installation">Installation</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
