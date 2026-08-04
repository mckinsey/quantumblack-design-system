'use client';

import type { ComponentAPI, ComponentProp } from '@/lib/registry';
import { cn } from '@/lib/utils';

import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/table';
import { tagToggleClasses } from '../ui/tag-toggle';

const tagClasses = tagToggleClasses({
  size: 'sm',
  className: 'pointer-events-none !px-2',
});

/**
 * Renders a prop type with nice formatting for union types
 */
function PropType({ type }: { type: string }) {
  if (type.includes(' | ')) {
    const options = type.split(' | ');
    return (
      <div className="flex flex-wrap gap-1">
        {options.map(option => (
          <span key={option} className={tagClasses}>
            {option.replace(/"/g, '')}
          </span>
        ))}
      </div>
    );
  }

  return <span className={tagClasses}>{type}</span>;
}

/**
 * Renders prop rows for a single component within a shared table
 */
function PropRows({ props }: { props: Record<string, ComponentProp> }) {
  return Object.entries(props).map(([propName, prop]) => (
    <TableRow key={propName}>
      <TableCell className="pr-6 pl-0">
        <span className={tagClasses}>
          {propName}
          {prop.required && <span className="text-status-error ml-0.5">*</span>}
        </span>
      </TableCell>
      <TableCell className="pr-6 pl-0 whitespace-normal">
        <PropType type={prop.type} />
      </TableCell>
      <TableCell className="pr-6 pl-0">
        {prop.defaultValue ? (
          <span className={tagClasses}>{prop.defaultValue}</span>
        ) : (
          <span className="text-fg-tertiary">—</span>
        )}
      </TableCell>
      <TableCell className="pr-0 pl-0 whitespace-normal">
        {prop.description || <span className="text-fg-tertiary">—</span>}
      </TableCell>
    </TableRow>
  ));
}

interface APIReferenceProps {
  /** Array of component API documentation */
  apis: ComponentAPI[];
  /** Additional className */
  className?: string;
}

/**
 * Renders API reference documentation for one or more components.
 * Uses a single <table> so columns align across all component sections.
 */
export function APIReference({ apis, className }: APIReferenceProps) {
  if (!apis || apis.length === 0) {
    return (
      <div className={cn('text-fg-secondary p-8 text-center', className)}>
        No API documentation available for this component.
      </div>
    );
  }

  const apisWithProps = apis.filter(api => Object.keys(api.props).length > 0);
  const apisWithoutProps = apis.filter(
    api => Object.keys(api.props).length === 0,
  );

  if (apisWithProps.length === 0) {
    return (
      <div className={cn('text-fg-secondary p-8 text-center', className)}>
        No API documentation available for this component.
      </div>
    );
  }

  return (
    <div className={cn('space-y-8', className)}>
      <Table>
        {apisWithProps.map((api, index) => (
          <TableBody key={api.displayName}>
            {/* Component name + description */}
            <TableRow>
              <TableCell
                colSpan={4}
                className={cn('border-b-0 pr-0 pl-0', index > 0 && 'pt-8')}>
                <h4 className="headings-h4-semibold text-fg-primary">
                  {api.displayName}
                </h4>
                {api.description && (
                  <p className="paragraph-small-primary text-fg-secondary mt-1">
                    {api.description}
                  </p>
                )}
              </TableCell>
            </TableRow>

            {/* Column headers */}
            <TableRow>
              <TableHead className="pr-6 pl-0">Prop</TableHead>
              <TableHead className="pr-6 pl-0">Type</TableHead>
              <TableHead className="pr-6 pl-0">Default</TableHead>
              <TableHead className="pr-0 pl-0 whitespace-normal">
                Description
              </TableHead>
            </TableRow>

            <PropRows props={api.props} />
          </TableBody>
        ))}
      </Table>

      {apisWithoutProps.length > 0 && (
        <div className="space-y-2">
          <h4 className="headings-h4-semibold text-fg-primary">
            Other Components
          </h4>
          <p className="paragraph-small-primary text-fg-secondary">
            These components accept standard HTML attributes and children:
          </p>
          <div className="flex flex-wrap gap-2">
            {apisWithoutProps.map(api => (
              <span key={api.displayName} className={tagClasses}>
                {api.displayName}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Async function to fetch API documentation for a component
 */
export async function getComponentAPI(
  componentName: string,
): Promise<ComponentAPI[] | null> {
  try {
    // In production, this would be a fetch to the public/api directory
    // For now, we'll return null and let the component handle the fallback
    const response = await fetch(
      `${import.meta.env.BASE_URL}api/${componentName}.json`,
    );
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch API for ${componentName}:`, error);
    return null;
  }
}
