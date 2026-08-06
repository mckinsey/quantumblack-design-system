'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="default">Save</Button>
      <Button variant="secondary">Cancel</Button>
    </ButtonGroup>
  );
}

export function ButtonGroupConfigs() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup>
        <Button variant="default">Button</Button>
        <Button variant="secondary">Button</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="default">Button</Button>
        <Button variant="ghost">Button</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="accent">Button</Button>
        <Button variant="outline">Button</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="ghost">Button</Button>
        <Button variant="default">Button</Button>
      </ButtonGroup>
    </div>
  );
}

export function ButtonGroupSizes() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup>
        <Button size="sm" variant="default">
          Button
        </Button>
        <Button size="sm" variant="secondary">
          Button
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="default">Button</Button>
        <Button variant="secondary">Button</Button>
      </ButtonGroup>

      <ButtonGroup>
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

export function ButtonGroupSplit() {
  const variants = [
    'default',
    'accent',
    'secondary',
    'outline',
    'ghost',
  ] as const;

  type Variant = (typeof variants)[number];

  const options = ['Option 1', 'Option 2', 'Option 3'] as const;
  const [selected, setSelected] =
    React.useState<(typeof options)[number]>('Option 1');

  const menu = (
    <DropdownMenuContent align="end" className="w-[180px]">
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

  function shellType(variant: Variant) {
    return variant === 'default' || variant === 'accent'
      ? 'neutral-inverse'
      : 'neutral';
  }

  function ChevronTrigger({ variant }: { variant: Variant }) {
    const type = shellType(variant);
    const icon = (
      <IconShell
        size="sm"
        type={type}
        hoverable
        className="transition-transform duration-200 group-data-[state=open]/button:rotate-180">
        <Icon icon="keyboard_arrow_down" />
      </IconShell>
    );

    if (variant === 'ghost') {
      return (
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="More actions"
            variant="ghost"
            className="w-4 px-0">
            {icon}
          </Button>
        </DropdownMenuTrigger>
      );
    }

    return (
      <DropdownMenuTrigger asChild>
        <Button aria-label="More actions" size="icon" variant={variant}>
          {icon}
        </Button>
      </DropdownMenuTrigger>
    );
  }

  return (
    <div className="flex flex-col items-start gap-8">
      <div className="flex flex-wrap items-start gap-4">
        {variants.map(variant => (
          <ButtonGroup key={`text-${variant}`} spacing="attached">
            <Button variant={variant}>Button</Button>
            <DropdownMenu>
              <ChevronTrigger variant={variant} />
              {menu}
            </DropdownMenu>
          </ButtonGroup>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-4">
        {variants.map(variant => {
          const type = shellType(variant);

          return (
            <ButtonGroup key={`icon-${variant}`} spacing="attached">
              <Button aria-label="Action" size="icon" variant={variant}>
                <IconShell size="sm" type={type} hoverable>
                  <Icon icon="crop_free" />
                </IconShell>
              </Button>
              <DropdownMenu>
                <ChevronTrigger variant={variant} />
                {menu}
              </DropdownMenu>
            </ButtonGroup>
          );
        })}
      </div>
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'ButtonGroupDemo',
    title: 'Default',
    description:
      'Spaced CTA pair — primary Save with secondary Cancel (12px gap).',
  },
  {
    name: 'ButtonGroupConfigs',
    title: 'CTA pairings',
    description: 'Common primary + alternate pairs, including reversed order.',
  },
  {
    name: 'ButtonGroupSizes',
    title: 'Sizes',
    description: 'sm, default, and lg children. Gap stays 12px.',
  },
  {
    name: 'ButtonGroupSplit',
    title: 'Split',
    description:
      'Reg-size attached splits for every Button variant (text + icon). Chevron menu is demo-only.',
  },
];

export const buttonGroup = createLegacyDemo('button-group', examples, {
  ButtonGroupDemo: <ButtonGroupDemo />,
  ButtonGroupConfigs: <ButtonGroupConfigs />,
  ButtonGroupSizes: <ButtonGroupSizes />,
  ButtonGroupSplit: <ButtonGroupSplit />,
});
