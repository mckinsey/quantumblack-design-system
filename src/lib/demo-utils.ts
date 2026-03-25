import type { ReactNode } from 'react';

/**
 * Metadata for a component demo example
 */
export interface DemoExample {
  /** Function name that matches the exported component */
  name: string;
  /** Display title for the example */
  title: string;
  /** Brief description of what the example demonstrates */
  description: string;
}

/**
 * Legacy format for backwards compatibility with existing demo system
 */
export interface LegacyDemoFormat {
  name: string;
  components: Record<string, ReactNode>;
}

/**
 * Creates the legacy demo format from examples array and component map.
 * This eliminates the need to manually duplicate the mapping in each demo file.
 *
 * @param name - The component name (e.g., 'button', 'avatar')
 * @param examples - Array of example metadata
 * @param componentMap - Object mapping function names to their rendered components
 * @returns Legacy format object for backwards compatibility
 *
 * @example
 * ```tsx
 * export const button = createLegacyDemo('button', examples, {
 *   ButtonDemo: <ButtonDemo />,
 *   ButtonVariants: <ButtonVariants />,
 * })
 * ```
 */
export function createLegacyDemo(
  name: string,
  examples: DemoExample[],
  componentMap: Record<string, ReactNode>,
): LegacyDemoFormat {
  const components: Record<string, ReactNode> = {};

  for (const example of examples) {
    const component = componentMap[example.name];
    if (component) {
      components[example.title] = component;
    }
  }

  return { name, components };
}
