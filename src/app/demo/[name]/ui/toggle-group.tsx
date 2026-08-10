'use client';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

export function ToggleGroupDemo() {
  return (
    <ToggleGroup aria-label="Text alignment" defaultValue={['center']}>
      <ToggleGroupItem aria-label="Align left" value="left" size="icon">
        <IconShell size="sm">
          <Icon icon="format_align_left" />
        </IconShell>
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align center" value="center" size="icon">
        <IconShell size="sm">
          <Icon icon="format_align_center" />
        </IconShell>
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align right" value="right" size="icon">
        <IconShell size="sm">
          <Icon icon="format_align_right" />
        </IconShell>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ToggleGroupMultiple() {
  return (
    <ToggleGroup aria-label="Text formatting" defaultValue={['bold']} multiple>
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ToggleGroupVariants() {
  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup
        aria-label="Secondary"
        defaultValue={['a']}
        variant="secondary">
        <ToggleGroupItem value="a">Secondary</ToggleGroupItem>
        <ToggleGroupItem value="b">Option</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup aria-label="Outline" defaultValue={['a']} variant="outline">
        <ToggleGroupItem value="a">Outline</ToggleGroupItem>
        <ToggleGroupItem value="b">Option</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup aria-label="Ghost" defaultValue={['a']} variant="ghost">
        <ToggleGroupItem value="a">Ghost</ToggleGroupItem>
        <ToggleGroupItem value="b">Option</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'ToggleGroupDemo',
    title: 'Default',
    description: 'Single-select toggle group with icon items.',
  },
  {
    name: 'ToggleGroupMultiple',
    title: 'Multiple',
    description: 'Multi-select toggle group with text items.',
  },
  {
    name: 'ToggleGroupVariants',
    title: 'Variants',
    description: 'Secondary, outline, and ghost group variants.',
  },
];

export const toggleGroup = createLegacyDemo('toggle-group', examples, {
  ToggleGroupDemo: <ToggleGroupDemo />,
  ToggleGroupMultiple: <ToggleGroupMultiple />,
  ToggleGroupVariants: <ToggleGroupVariants />,
});
