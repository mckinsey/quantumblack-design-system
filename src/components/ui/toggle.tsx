'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as React from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ToggleVariant = 'secondary' | 'outline' | 'ghost';
type ToggleSize =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'default'
  | 'lg'
  | 'icon-xxs'
  | 'icon-xs'
  | 'icon-sm'
  | 'icon'
  | 'icon-lg';

function toggleVariants({
  variant = 'secondary',
  size = 'default',
  className,
}: {
  variant?: ToggleVariant;
  size?: ToggleSize;
  className?: string;
} = {}) {
  return cn(
    buttonVariants({ variant, size }),
    'data-[state=on]:bg-fill-active data-[state=on]:text-fg-primary-inverse',

    variant === 'outline' &&
      'data-[state=on]:border-stroke-active-inverse data-[state=on]:border-2',

    className,
  );
}

function Toggle({
  className,
  variant = 'secondary',
  size = 'default',
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & {
  variant?: ToggleVariant;
  size?: ToggleSize;
}) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={toggleVariants({ variant, size, className })}
      {...props}
    />
  );
}

export { Toggle, toggleVariants, type ToggleVariant, type ToggleSize };
