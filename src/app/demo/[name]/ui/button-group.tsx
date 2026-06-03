'use client';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

/** Default button group — a primary action paired with a secondary action */
export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="default">Save</Button>
      <Button variant="secondary">Cancel</Button>
    </ButtonGroup>
  );
}

/**
 * CTA pairings: a primary action (mono `default` or `accent`) paired with a
 * secondary-style action (`secondary`, `outline`, or `ghost`). Each pairing is
 * shown with the primary leading (left column) and trailing (right column).
 */
export function ButtonGroupConfigs() {
  return (
    <div className="grid grid-cols-2 gap-x-16 gap-y-4">
      {/* Primary leading */}
      <div className="flex flex-col gap-4">
        <ButtonGroup>
          <Button variant="default">Button</Button>
          <Button variant="secondary">Button</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="default">Button</Button>
          <Button variant="outline">Button</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="default">Button</Button>
          <Button variant="ghost">Button</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="accent">Button</Button>
          <Button variant="secondary">Button</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="accent">Button</Button>
          <Button variant="outline">Button</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="accent">Button</Button>
          <Button variant="ghost">Button</Button>
        </ButtonGroup>
      </div>

      {/* Primary trailing (reversed) */}
      <div className="flex flex-col gap-4">
        <ButtonGroup>
          <Button variant="secondary">Button</Button>
          <Button variant="default">Button</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Button</Button>
          <Button variant="default">Button</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="ghost">Button</Button>
          <Button variant="default">Button</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="secondary">Button</Button>
          <Button variant="accent">Button</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Button</Button>
          <Button variant="accent">Button</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="ghost">Button</Button>
          <Button variant="accent">Button</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

/** Gap sizes — sm (8px), default (12px), lg (16px) */
export function ButtonGroupSizes() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup size="sm">
        <Button size="sm" variant="default">
          Button
        </Button>
        <Button size="sm" variant="secondary">
          Button
        </Button>
      </ButtonGroup>

      <ButtonGroup size="default">
        <Button variant="default">Button</Button>
        <Button variant="secondary">Button</Button>
      </ButtonGroup>

      <ButtonGroup size="lg">
        <Button size="lg" variant="default">
          Button
        </Button>
        <Button size="lg" variant="secondary">
          Button
        </Button>
      </ButtonGroup>
    </div>
  );
}

/** Vertical orientation */
export function ButtonGroupVertical() {
  return (
    <ButtonGroup orientation="vertical">
      <Button variant="default">Button</Button>
      <Button variant="secondary">Button</Button>
      <Button variant="ghost">Button</Button>
    </ButtonGroup>
  );
}

/** Icon-only buttons, horizontal and vertical */
export function ButtonGroupIconOnly() {
  return (
    <div className="flex items-start gap-8">
      <ButtonGroup>
        <Button aria-label="Bold" size="icon" variant="outline">
          <IconShell size="sm">
            <Icon icon="format_bold" />
          </IconShell>
        </Button>
        <Button aria-label="Italic" size="icon" variant="outline">
          <IconShell size="sm">
            <Icon icon="format_italic" />
          </IconShell>
        </Button>
        <Button aria-label="Underline" size="icon" variant="outline">
          <IconShell size="sm">
            <Icon icon="format_underlined" />
          </IconShell>
        </Button>
      </ButtonGroup>

      <ButtonGroup orientation="vertical">
        <Button aria-label="Zoom in" size="icon" variant="outline">
          <IconShell size="sm">
            <Icon icon="add" />
          </IconShell>
        </Button>
        <Button aria-label="Zoom out" size="icon" variant="outline">
          <IconShell size="sm">
            <Icon icon="remove" />
          </IconShell>
        </Button>
      </ButtonGroup>
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'ButtonGroupDemo',
    title: 'Default',
    description: 'A primary action paired with a secondary action.',
  },
  {
    name: 'ButtonGroupConfigs',
    title: 'Configurations',
    description:
      'A primary action (mono or accent) paired with a secondary, outline, or ghost action, shown leading (left) and trailing (right).',
  },
  {
    name: 'ButtonGroupSizes',
    title: 'Sizes',
    description: 'Inter-button gap scales with size: sm, default, and lg.',
  },
  {
    name: 'ButtonGroupVertical',
    title: 'Vertical',
    description: 'Buttons stacked with vertical orientation.',
  },
  {
    name: 'ButtonGroupIconOnly',
    title: 'Icon Only',
    description: 'Icon-only buttons grouped horizontally and vertically.',
  },
];

export const buttonGroup = createLegacyDemo('button-group', examples, {
  ButtonGroupDemo: <ButtonGroupDemo />,
  ButtonGroupConfigs: <ButtonGroupConfigs />,
  ButtonGroupSizes: <ButtonGroupSizes />,
  ButtonGroupVertical: <ButtonGroupVertical />,
  ButtonGroupIconOnly: <ButtonGroupIconOnly />,
});
