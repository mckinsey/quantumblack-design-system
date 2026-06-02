'use client';

import { Icon } from '@/components/ui/icon';
import { TagToggle } from '@/components/ui/tag-toggle';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

/** Default tag toggle */
export function TagToggleDemo() {
  return (
    <TagToggle>
      <Icon icon="style" className="size-4" />
      Label
    </TagToggle>
  );
}

/** Tag toggle variants - default and outline */
export function TagToggleVariants() {
  return (
    <div className="flex flex-wrap gap-3">
      <TagToggle variant="default">
        <Icon icon="style" className="size-4" />
        Default
      </TagToggle>

      <TagToggle variant="outline">
        <Icon icon="style" className="size-4" />
        Outline
      </TagToggle>
    </div>
  );
}

/** Pill-shaped tag toggles */
export function TagTogglePill() {
  return (
    <div className="flex flex-wrap gap-3">
      <TagToggle pill>
        <Icon icon="style" className="size-4" />
        Default
      </TagToggle>

      <TagToggle variant="outline" pill>
        <Icon icon="style" className="size-4" />
        Outline
      </TagToggle>
    </div>
  );
}

/** Tag toggle sizes */
export function TagToggleSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <TagToggle size="xs">
        <Icon icon="style" className="size-4" />
        Extra small
      </TagToggle>

      <TagToggle size="sm">
        <Icon icon="style" className="size-4" />
        Small
      </TagToggle>

      <TagToggle size="default">
        <Icon icon="style" className="size-4" />
        Default
      </TagToggle>

      <TagToggle size="lg">
        <Icon icon="style" className="size-4" />
        Large
      </TagToggle>
    </div>
  );
}

/** Disabled tag toggles */
export function TagToggleDisabled() {
  return (
    <div className="flex flex-wrap gap-3">
      <TagToggle disabled>
        <Icon icon="style" className="size-4" />
        Disabled
      </TagToggle>

      <TagToggle variant="outline" disabled>
        <Icon icon="style" className="size-4" />
        Disabled
      </TagToggle>

      <TagToggle pill disabled>
        <Icon icon="style" className="size-4" />
        Disabled Pill
      </TagToggle>
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'TagToggleDemo',
    title: 'Default',
    description: 'Basic tag toggle with icon.',
  },
  {
    name: 'TagToggleVariants',
    title: 'Variants',
    description: 'Default and outline tag toggle variants.',
  },
  {
    name: 'TagTogglePill',
    title: 'Pill Shape',
    description: 'Tag toggles with rounded pill shape.',
  },
  {
    name: 'TagToggleSizes',
    title: 'Sizes',
    description: 'Tag toggle size options.',
  },
  {
    name: 'TagToggleDisabled',
    title: 'Disabled',
    description: 'Disabled tag toggle states.',
  },
];

export const tagToggle = createLegacyDemo('tag-toggle', examples, {
  TagToggleDemo: <TagToggleDemo />,
  TagToggleVariants: <TagToggleVariants />,
  TagTogglePill: <TagTogglePill />,
  TagToggleSizes: <TagToggleSizes />,
  TagToggleDisabled: <TagToggleDisabled />,
});
