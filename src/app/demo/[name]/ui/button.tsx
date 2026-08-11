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

      <Button size="icon" variant="default" aria-label="Expand">
        <IconShell type="neutral-inverse" hoverable>
          <Icon icon="crop_free" />
        </IconShell>
      </Button>

      <Button
        size="icon"
        variant="default"
        className="rounded-full"
        aria-label="Expand">
        <IconShell type="neutral-inverse" hoverable>
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
    </div>
  );
}

/** All button variants displayed side by side */
export function ButtonVariants() {
  const variants = [
    'default',
    'accent',
    'secondary',
    'outline',
    'ghost',
  ] as const;

  const labels = {
    default: 'Default',
    accent: 'Accent',
    secondary: 'Secondary',
    outline: 'Outline',
    ghost: 'Ghost',
  } as const;

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-wrap gap-4">
        {variants.map(variant => (
          <Button key={variant} variant={variant}>
            {labels[variant]}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {variants.map(variant => {
          const type =
            variant === 'default' || variant === 'accent'
              ? 'neutral-inverse'
              : 'neutral';

          return (
            <Button
              key={`icon-${variant}`}
              aria-label={labels[variant]}
              size="icon"
              variant={variant}>
              <IconShell size="sm" type={type} hoverable>
                <Icon icon="crop_free" />
              </IconShell>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

/** Button size variations */
export function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xxs">XXS</Button>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
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
        <IconShell size="sm" type="neutral-inverse" variant="primary">
          <Icon icon="crop_free" />
        </IconShell>
        Leading Icon
      </Button>
      <Button>
        Trailing Icon
        <IconShell size="sm" type="neutral-inverse" variant="primary">
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
      <Button className="w-[100px]" aria-label="Loading">
        <IconShell type="neutral-inverse" variant="primary" size="sm">
          <Icon icon="progress_activity" className="animate-spin" />
        </IconShell>
      </Button>
      <Button variant="outline" className="w-[100px]" aria-label="Loading">
        <IconShell size="sm" hoverable>
          <Icon icon="progress_activity" className="animate-spin" />
        </IconShell>
      </Button>
      <Button variant="secondary">
        <IconShell size="sm" hoverable>
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
      <Button size="icon-xxs" aria-label="Expand">
        <IconShell size="sm" type="neutral-inverse" hoverable>
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon-xs" aria-label="Expand">
        <IconShell size="sm" type="neutral-inverse" hoverable>
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon-sm" aria-label="Expand">
        <IconShell size="sm" type="neutral-inverse" hoverable>
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon" aria-label="Expand">
        <IconShell size="sm" type="neutral-inverse" hoverable>
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon-lg" aria-label="Expand">
        <IconShell size="default" type="neutral-inverse" hoverable>
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
      <Button size="icon-xxs" className="rounded-full" aria-label="Expand">
        <IconShell size="sm" type="neutral-inverse" hoverable>
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon-xs" className="rounded-full" aria-label="Expand">
        <IconShell size="sm" type="neutral-inverse" hoverable>
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon-sm" className="rounded-full" aria-label="Expand">
        <IconShell size="sm" type="neutral-inverse" hoverable>
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon" className="rounded-full" aria-label="Expand">
        <IconShell size="sm" type="neutral-inverse" hoverable>
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon-lg" className="rounded-full" aria-label="Expand">
        <IconShell size="default" type="neutral-inverse" hoverable>
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
            <IconShell className="text-fill-active" size="sm" variant="primary">
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
          <Button variant="outline" size="icon" aria-label="Open menu">
            <IconShell size="sm" hoverable>
              <Icon icon="keyboard_arrow_down" />
            </IconShell>
          </Button>
        </DropdownMenuTrigger>
        {menu}
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="Open menu">
            <IconShell size="sm" hoverable>
              <Icon icon="keyboard_arrow_down" />
            </IconShell>
          </Button>
        </DropdownMenuTrigger>
        {menu}
      </DropdownMenu>
    </div>
  );
}

/** Buttons under radius-mode - corners resolve to rounded radius tokens */
export function ButtonRadiusMode() {
  return (
    <div className="radius-mode flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <Button size="xxs">XXS</Button>
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button variant="accent">Accent</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>

        <Button size="icon" aria-label="Expand">
          <IconShell size="sm" type="neutral-inverse" hoverable>
            <Icon icon="crop_free" />
          </IconShell>
        </Button>
      </div>
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
      'All available button variants: default, accent, secondary, outline, and ghost — text and icon.',
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
      'Button triggering a dropdown menu; the selected option is marked in the menu.',
  },
  {
    name: 'ButtonRadiusMode',
    title: 'Radius Mode',
    description:
      'Under radius-mode, corners resolve to rounded radius tokens: radius-sm (xxs/xs/sm) and radius-reg (default/lg).',
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
  ButtonRadiusMode: <ButtonRadiusMode />,
});
