import { cn } from '@/lib/utils';

interface SectionProps {
  /** Section title */
  title: string;
  /** Optional section description */
  description?: string;
  /** Section content */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
  /** HTML id for anchor links */
  id?: string;
}

/**
 * Consistent section wrapper for component documentation pages
 */
export function Section({
  title,
  description,
  children,
  className,
  id,
}: SectionProps) {
  return (
    <section
      id={id || title.toLowerCase().replace(/\s+/g, '-')}
      className={cn('scroll-mt-24', className)}>
      <div className="mb-3">
        <h2 className="headings-h3-semibold text-fg-primary">{title}</h2>
        {description && (
          <p className="paragraph-small-primary text-fg-secondary mt-1">
            {description}
          </p>
        )}
      </div>
      <div>{children}</div>
    </section>
  );
}

/**
 * Component header for the hero section
 */
interface ComponentHeaderProps {
  /** Component title */
  title: string;
  /** Component description */
  description?: string;
}

export function ComponentHeader({ title, description }: ComponentHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="headings-h2-semibold text-fg-primary">{title}</h1>
      {description && (
        <p className="paragraph-regular-primary text-fg-secondary">
          {description}
        </p>
      )}
    </div>
  );
}
