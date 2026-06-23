'use client';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { TagToggle } from '@/components/ui/tag-toggle';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

/** Default tag toggle */
export function TagToggleDemo() {
  return (
    <TagToggle>
      <IconShell size="sm">
        <Icon icon="style" />
      </IconShell>
      Label
    </TagToggle>
  );
}

/** Tag toggle variants - default and outline */
export function TagToggleVariants() {
  return (
    <div className="flex flex-wrap gap-3">
      <TagToggle variant="default">
        <IconShell size="sm">
          <Icon icon="style" />
        </IconShell>
        Default
      </TagToggle>

      <TagToggle variant="outline">
        <IconShell size="sm">
          <Icon icon="style" />
        </IconShell>
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
        <IconShell size="sm">
          <Icon icon="style" />
        </IconShell>
        Default
      </TagToggle>

      <TagToggle variant="outline" pill>
        <IconShell size="sm">
          <Icon icon="style" />
        </IconShell>
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
        <IconShell size="sm">
          <Icon icon="style" />
        </IconShell>
        Extra small
      </TagToggle>

      <TagToggle size="sm">
        <IconShell size="sm">
          <Icon icon="style" />
        </IconShell>
        Small
      </TagToggle>

      <TagToggle size="default">
        <IconShell size="sm">
          <Icon icon="style" />
        </IconShell>
        Default
      </TagToggle>

      <TagToggle size="lg">
        <IconShell size="sm">
          <Icon icon="style" />
        </IconShell>
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
        <IconShell size="sm">
          <Icon icon="style" />
        </IconShell>
        Disabled
      </TagToggle>

      <TagToggle variant="outline" disabled>
        <IconShell size="sm">
          <Icon icon="style" />
        </IconShell>
        Disabled
      </TagToggle>

      <TagToggle pill disabled>
        <IconShell size="sm">
          <Icon icon="style" />
        </IconShell>
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
