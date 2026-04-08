import { Link } from 'react-router';

import { getUIPrimitives } from '@/lib/registry';

const components = getUIPrimitives();

export default function ComponentsPage() {
  return (
    <main className="bg-surface-bg-accent min-h-screen w-full p-5 md:p-10">
      <div className="mx-auto w-full max-w-[800px]">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="headings-h1-regular text-fg-primary">Components</h1>
            <p className="paragraph-large-primary text-fg-secondary">
              Here you can find all the components available in the library. We
              are working on adding more components.
            </p>
          </div>

          {/* Components Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {components.map(component => (
              <Link
                key={component.name}
                to={`/registry/${component.name}`}
                className="group">
                <div className="border-stroke-tertiary bg-surface-bg-primary hover:border-stroke-tertiary-hover flex h-full flex-col gap-1 border p-4 transition-colors">
                  <span className="paragraph-regular-primary text-fg-primary group-hover:text-fg-primary font-semibold transition-colors">
                    {component.title}
                  </span>
                  {component.description && (
                    <span className="paragraph-regular-primary text-fg-secondary line-clamp-2">
                      {component.description}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Footer note */}
          <div className="border-stroke-divider border-t pt-6">
            <p className="paragraph-regular-primary text-fg-secondary">
              Can&apos;t find what you need? Check back soon as we&apos;re
              continuously adding new components.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
