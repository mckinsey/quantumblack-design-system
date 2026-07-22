'use client';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { TagToggle } from '@/components/ui/tag-toggle';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

function TagToggleLeadingIcon({ disabled }: { disabled?: boolean }) {
  return (
    <IconShell size="sm" type="neutral" variant="primary" disabled={disabled}>
      <Icon icon="style" />
    </IconShell>
  );
}

/** Default tag toggle */
export function TagToggleDemo() {
  return (
    <TagToggle>
      <TagToggleLeadingIcon />
      Label
    </TagToggle>
  );
}

/** Tag toggle variants - default and outline */
export function TagToggleVariants() {
  return (
    <div className="flex flex-wrap gap-3">
      <TagToggle variant="default">
        <TagToggleLeadingIcon />
        Default
      </TagToggle>

      <TagToggle variant="outline">
        <TagToggleLeadingIcon />
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
        <TagToggleLeadingIcon />
        Default
      </TagToggle>

      <TagToggle variant="outline" pill>
        <TagToggleLeadingIcon />
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
        <TagToggleLeadingIcon />
        Extra small
      </TagToggle>

      <TagToggle size="sm">
        <TagToggleLeadingIcon />
        Small
      </TagToggle>

      <TagToggle size="default">
        <TagToggleLeadingIcon />
        Default
      </TagToggle>

      <TagToggle size="lg">
        <TagToggleLeadingIcon />
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
        <TagToggleLeadingIcon disabled />
        Disabled
      </TagToggle>

      <TagToggle variant="outline" disabled>
        <TagToggleLeadingIcon disabled />
        Disabled
      </TagToggle>

      <TagToggle pill disabled>
        <TagToggleLeadingIcon disabled />
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
    description:
      'Disabled tag toggle states. Pass disabled to IconShell as well so the leading icon uses disabled opacity.',
  },
];

export const tagToggle = createLegacyDemo('tag-toggle', examples, {
  TagToggleDemo: <TagToggleDemo />,
  TagToggleVariants: <TagToggleVariants />,
  TagTogglePill: <TagTogglePill />,
  TagToggleSizes: <TagToggleSizes />,
  TagToggleDisabled: <TagToggleDisabled />,
});
