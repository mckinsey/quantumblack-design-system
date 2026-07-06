import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { type IconSize, IconSizeContext } from './icon';

const hoverableClasses =
  'opacity-60 hover:opacity-88 active:opacity-88 group-hover/btn:opacity-88 group-active/btn:opacity-88';

const iconVariants = cva(
  [
    'inline-flex items-center justify-center',
    '[&_svg]:fill-current [&_svg]:stroke-current',
  ],
  {
    variants: {
      size: {
        sm: 'text-[16px] size-4',
        default: 'text-[24px] size-6',
        lg: 'text-[32px] size-8',
      },
      type: {
        neutral: 'text-fill-active',
        'neutral-inverse': 'text-fill-active-inverse',
        custom: '',
      },
      variant: {
        primary: 'opacity-88',
        secondary: 'opacity-60',
        disabled: 'opacity-30',
      },
    },
    defaultVariants: {
      size: 'default',
      type: 'neutral',
      variant: 'secondary',
    },
  },
);

function IconShell({
  className,
  size,
  type,
  variant,
  hoverable = false,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof iconVariants> & {
    asChild?: boolean;
    hoverable?: boolean;
  }) {
  const Comp = asChild ? Slot : 'span';
  const resolvedSize: IconSize = size ?? 'default';
  const disabled = variant === 'disabled' || props.disabled;
  const useHoverable = hoverable && !disabled;
  const resolvedVariant = disabled
    ? 'disabled'
    : useHoverable
      ? undefined
      : variant;

  return (
    <IconSizeContext.Provider value={resolvedSize}>
      <Comp
        data-slot="icon"
        className={cn(
          iconVariants({ size, type, variant: resolvedVariant }),
          useHoverable && hoverableClasses,
          className,
        )}
        {...props}>
        {children}
      </Comp>
    </IconSizeContext.Provider>
  );
}

export { IconShell, iconVariants };
