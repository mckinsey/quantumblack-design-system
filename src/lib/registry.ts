import registry from '@/registry';

export interface ComponentFile {
  path: string;
  type: string;
  target?: string;
}

export interface Component {
  name: string;
  type: string;
  title: string;
  description?: string;
  files?: ComponentFile[];
}

/** Install path shown in docs — uses target when set, otherwise derives from registry path. */
export function getComponentFileTarget(file: ComponentFile): string | null {
  const target = file.target?.trim();
  if (target) return target;

  const path = file.path?.trim();
  if (!path) return null;

  return path.startsWith('src/') ? path.slice(4) : path;
}

/**
 * API Documentation Types
 */
export interface ComponentProp {
  type: string;
  defaultValue: string | null;
  description: string;
  required: boolean;
}

export interface ComponentAPI {
  displayName: string;
  description: string;
  props: Record<string, ComponentProp>;
}

/**
 * Example Metadata Types (for new demo format)
 */
export interface ExampleMeta {
  name: string;
  title: string;
  description?: string;
}

/** Registry item names to hide from the UI (still available for install/deps). */
const HIDDEN_IN_UI = new Set(['field', 'label', 'separator']);

export function getRegistryItems(): Component[] {
  // exclude style item and any hidden-by-name items from the ui
  const components = registry.items.filter(
    item => item.type !== 'registry:style' && !HIDDEN_IN_UI.has(item.name),
  );

  return components as Component[];
}

export function getRegistryItem(name: string): Component {
  const components = getRegistryItems();
  let component = components.find(
    (item: { name: string }) => item.name === name,
  );

  // Resolve hidden items from full registry so direct links still work
  if (component === null || component === undefined) {
    const hidden = registry.items.find(
      (item: { name: string }) => item.name === name,
    );
    if (hidden) component = hidden as Component;
  }

  if (component === null || component === undefined) {
    throw new Error(`Component "${name}" not found`);
  }

  return component;
}

export function getBlocks() {
  return getRegistryItems().filter(
    component => component.type === 'registry:block',
  );
}

export function getUIPrimitives() {
  return getRegistryItems()
    .filter(
      component =>
        component.type === 'registry:ui' ||
        component.type === 'registry:example',
    )
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getComponents() {
  return getRegistryItems().filter(
    component => component.type === 'registry:component',
  );
}

export function getExamples() {
  return getRegistryItems().filter(
    component => component.type === 'registry:example',
  );
}

// Group UI components by category for better organization
export function getUIPrimitivesByCategory() {
  const components = getUIPrimitives();
  const examples = getExamples();
  const allComponents = [...components, ...examples];

  const categoryKeywords: Record<string, string[]> = {
    Primitives: ['button', 'toggle'],
    Form: [
      'input',
      'textarea',
      'select',
      'checkbox',
      'radio',
      'form',
      'switch',
      'slider',
      'label',
    ],
    Layout: [
      'card',
      'separator',
      'accordion',
      'collapsible',
      'aspect',
      'scroll',
    ],
    Navigation: [
      'menu',
      'navigation',
      'tabs',
      'breadcrumb',
      'pagination',
      'toolbar',
    ],
    Feedback: ['alert', 'progress', 'skeleton', 'badge', 'tag'],
    Display: [
      'avatar',
      'table',
      'calendar',
      'chart',
      'carousel',
      'date-picker',
      'time-input',
      'time-picker',
    ],
    Overlay: [
      'dialog',
      'drawer',
      'popover',
      'tooltip',
      'sheet',
      'hover',
      'sonner',
      'toast',
    ],
  };

  const categorized: Record<string, Component[]> = {
    Primitives: [],
    Form: [],
    Layout: [],
    Navigation: [],
    Feedback: [],
    Display: [],
    Overlay: [],
    Other: [],
  };

  allComponents.forEach(component => {
    const name = component.name.toLowerCase();
    let categorizedFlag = false;

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => name.includes(keyword))) {
        categorized[category].push(component);
        categorizedFlag = true;

        break;
      }
    }

    if (!categorizedFlag) {
      categorized['Other'].push(component);
    }
  });

  // Remove empty categories and categories with only one item
  // Single items go to "Other" category
  const filteredCategories: Record<string, Component[]> = {};
  const otherItems: Component[] = [];

  Object.entries(categorized).forEach(([category, items]) => {
    if (items.length === 0) {
      // Skip empty categories
      return;
    } else if (items.length === 1 && category !== 'Other') {
      // Move single items to Other
      otherItems.push(...items);
    } else {
      filteredCategories[category] = items;
    }
  });

  // If we have other items, add them to the Other category
  if (otherItems.length > 0) {
    if (filteredCategories['Other']) {
      filteredCategories['Other'].push(...otherItems);
    } else if (otherItems.length > 1) {
      // Only create Other category if we have more than 1 item
      filteredCategories['Other'] = otherItems;
    }
  }

  return filteredCategories;
}

/**
 * Registry base URL. Defaults to the current origin if QBDS_REGISTRY_URL is not set.
 * Single source of truth for install commands across all pages.
 */
export function getRegistryBaseUrl(): string {
  return (import.meta.env.QBDS_REGISTRY_URL || window.location.origin) + '/';
}
