import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

/** Default button - the primary call to action style */
export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button>Click me</Button>

      <Button size="icon" variant="default">
        <IconShell type="neutral-inverse" variant="primary">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>

      <Button size="icon" variant="default" className="rounded-full">
        <IconShell type="neutral-inverse" variant="primary">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
    </div>
  );
}

/** All button variants displayed side by side */
export function ButtonVariants() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}

/** Button size variations */
export function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="lg">Large</Button>
      <Button size="default">Default</Button>
      <Button size="sm">Small</Button>
      <Button size="xs">Extra Small</Button>
      <Button size="xxs">XXS</Button>
    </div>
  );
}

/** Disabled button states */
export function ButtonDisabled() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="default" disabled>
        Default
      </Button>
      <Button variant="accent" disabled>
        Accent
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
    </div>
  );
}

/** Buttons with leading and trailing icons */
export function ButtonWithIcons() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button>
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
        Leading Icon
      </Button>
      <Button>
        Trailing Icon
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
    </div>
  );
}

/** Loading state buttons with spinner */
export function ButtonLoading() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled className="w-[100px]">
        <IconShell size="sm">
          <Icon icon="progress_activity" className="animate-spin" />
        </IconShell>
      </Button>
      <Button variant="outline" disabled className="w-[100px]">
        <IconShell size="sm">
          <Icon icon="progress_activity" className="animate-spin" />
        </IconShell>
      </Button>
      <Button variant="secondary" disabled>
        <IconShell size="sm">
          <Icon icon="progress_activity" className="animate-spin" />
        </IconShell>
        Loading...
      </Button>
    </div>
  );
}

/** Icon-only buttons in various sizes */
export function ButtonIconOnly() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="icon-lg">
        <IconShell size="default">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon">
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon-sm">
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon-xs">
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon-xxs">
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
    </div>
  );
}

/** Circular icon buttons */
export function ButtonIconRounded() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="icon-lg" className="rounded-full">
        <IconShell size="default">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon" className="rounded-full">
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon-sm" className="rounded-full">
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon-xs" className="rounded-full">
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon-xxs" className="rounded-full">
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
    </div>
  );
}

/** Buttons triggering a dropdown menu */
export function ButtonDropdown() {
  const options = ['Option 1', 'Option 2', 'Option 3'] as const;
  const [selected, setSelected] =
    React.useState<(typeof options)[number]>('Option 1');

  const menu = (
    <DropdownMenuContent align="start" className="w-[180px]">
      {options.map(option => (
        <DropdownMenuItem
          key={option}
          onSelect={() => setSelected(option)}
          className="justify-between">
          {option}
          {selected === option ? (
            <IconShell className="text-fg-primary" size="sm" variant="primary">
              <Icon icon="check" />
            </IconShell>
          ) : null}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );

  return (
    <div className="flex flex-wrap items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Button</Button>
        </DropdownMenuTrigger>
        {menu}
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <IconShell size="sm">
              <Icon icon="keyboard_arrow_down" />
            </IconShell>
          </Button>
        </DropdownMenuTrigger>
        {menu}
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <IconShell size="sm">
              <Icon icon="keyboard_arrow_down" />
            </IconShell>
          </Button>
        </DropdownMenuTrigger>
        {menu}
      </DropdownMenu>
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'ButtonDemo',
    title: 'Default',
    description: 'The default button style with primary styling.',
  },
  {
    name: 'ButtonVariants',
    title: 'Variants',
    description:
      'All available button variants: default, accent, secondary, outline, and ghost.',
  },
  {
    name: 'ButtonSizes',
    title: 'Sizes',
    description: 'Button size options from extra small to large.',
  },
  {
    name: 'ButtonDisabled',
    title: 'Disabled',
    description: 'Buttons in disabled state across all variants.',
  },
  {
    name: 'ButtonWithIcons',
    title: 'With Icons',
    description: 'Buttons with leading, trailing, or both icons.',
  },
  {
    name: 'ButtonLoading',
    title: 'Loading',
    description: 'Loading state with animated spinner.',
  },
  {
    name: 'ButtonIconOnly',
    title: 'Icon Only',
    description: 'Icon-only buttons in various sizes.',
  },
  {
    name: 'ButtonIconRounded',
    title: 'Rounded Icons',
    description: 'Circular icon buttons using rounded-full class.',
  },
  {
    name: 'ButtonDropdown',
    title: 'Dropdown',
    description:
      'Button triggering a dropdown menu; the trigger shows the selected option and defaults to one.',
  },
];

export const button = createLegacyDemo('button', examples, {
  ButtonDemo: <ButtonDemo />,
  ButtonVariants: <ButtonVariants />,
  ButtonSizes: <ButtonSizes />,
  ButtonDisabled: <ButtonDisabled />,
  ButtonWithIcons: <ButtonWithIcons />,
  ButtonLoading: <ButtonLoading />,
  ButtonIconOnly: <ButtonIconOnly />,
  ButtonIconRounded: <ButtonIconRounded />,
  ButtonDropdown: <ButtonDropdown />,
});
