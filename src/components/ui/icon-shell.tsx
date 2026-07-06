import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

import { IconSizeContext } from './icon';

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
        disabled: 'opacity-30 cursor-not-allowed',
      },
      hoverable: {
        true: [
          'cursor-pointer',
          'hover:opacity-88',
          'active:opacity-88',
          'group-hover/btn:opacity-88',
          'group-active/btn:opacity-88',
        ],
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      type: 'neutral',
      variant: 'secondary',
      hoverable: false,
    },
  },
);

type IconShellVariant = NonNullable<
  VariantProps<typeof iconVariants>['variant']
>;

type IconShellProps = Omit<React.ComponentProps<'span'>, 'disabled'> &
  VariantProps<typeof iconVariants> & {
    asChild?: boolean;
    hoverable?: boolean;
    disabled?: boolean;
  };

function resolveVariant(
  variant: IconShellVariant | null | undefined,
  hoverable: boolean,
  isDisabled: boolean,
): IconShellVariant {
  if (isDisabled) {
    return 'disabled';
  }

  if (hoverable) {
    return 'secondary';
  }

  return variant ?? 'secondary';
}

function IconShell({
  className,
  size,
  type,
  variant,
  hoverable = false,
  asChild = false,
  disabled = false,
  children,
  ...props
}: IconShellProps) {
  const isDisabled = variant === 'disabled' || disabled;
  const isHoverable = hoverable && !isDisabled;
  const resolvedVariant = resolveVariant(variant, isHoverable, isDisabled);
  const Comp = asChild ? Slot : 'span';

  return (
    <IconSizeContext.Provider value={size ?? 'default'}>
      <Comp
        data-slot="icon"
        className={cn(
          iconVariants({
            size,
            type,
            variant: resolvedVariant,
            hoverable: isHoverable,
          }),
          className,
        )}
        {...props}>
        {children}
      </Comp>
    </IconSizeContext.Provider>
  );
}

export { IconShell, iconVariants };
