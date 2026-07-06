import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { type IconSize, IconSizeContext } from './icon';

const iconOpacity = {
  primary: 'opacity-88',
  secondary: 'opacity-60',
  disabled: 'opacity-30',
} as const;

const iconHoverToPrimary = [
  'hover:opacity-88',
  'active:opacity-88',
  'group-hover/btn:opacity-88',
  'group-active/btn:opacity-88',
] as const;

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
        primary: iconOpacity.primary,
        secondary: iconOpacity.secondary,
        disabled: `${iconOpacity.disabled} cursor-not-allowed`,
      },
      hoverable: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    compoundVariants: [
      {
        hoverable: true,
        variant: 'secondary',
        class: [...iconHoverToPrimary],
      },
    ],
    defaultVariants: {
      size: 'default',
      type: 'neutral',
      variant: 'secondary',
      hoverable: false,
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
  disabled: disabledProp,
  children,
  ...props
}: Omit<React.ComponentProps<'span'>, 'disabled'> &
  VariantProps<typeof iconVariants> & {
    asChild?: boolean;
    hoverable?: boolean;
    disabled?: boolean;
  }) {
  const resolvedSize: IconSize = size ?? 'default';
  const disabled = variant === 'disabled' || disabledProp;
  const resolvedVariant = disabled ? 'disabled' : variant;
  const useHoverable = hoverable && !disabled;
  const Comp = asChild ? Slot : 'span';

  return (
    <IconSizeContext.Provider value={resolvedSize}>
      <Comp
        data-slot="icon"
        className={cn(
          iconVariants({
            size,
            type,
            variant: resolvedVariant,
            hoverable: useHoverable,
          }),
          className,
        )}
        {...props}>
        {children}
      </Comp>
    </IconSizeContext.Provider>
  );
}

export { IconShell, iconHoverToPrimary, iconOpacity, iconVariants };
