'use client';

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';

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
    'data-pressed:bg-fill-active data-pressed:text-fg-primary-inverse data-pressed:[&>span]:no-underline',

    variant === 'outline' &&
      'data-pressed:inset-ring-2 data-pressed:inset-ring-stroke-active-inverse',

    className,
  );
}

function Toggle({
  className,
  variant = 'secondary',
  size = 'default',
  ...props
}: TogglePrimitive.Props & {
  variant?: ToggleVariant;
  size?: ToggleSize;
}) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Toggle, toggleVariants, type ToggleVariant, type ToggleSize };
