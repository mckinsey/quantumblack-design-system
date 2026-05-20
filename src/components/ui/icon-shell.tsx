import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { type IconSize, IconSizeContext } from './icon';

const iconVariants = cva(
  [
    'inline-flex items-center justify-center',
    '[&_svg]:fill-current [&_svg]:stroke-current',
    '[&_[data-slot=icon-glyph]]:text-current',
  ],
  {
    variants: {
      size: {
        sm: 'text-[16px] size-4',
        default: 'text-[24px] size-6',
        lg: 'text-[32px] size-8',
      },
      type: {
        neutral: '',
        'neutral-inverse': 'text-fg-primary-inverse',
        accent: 'text-brand-accents-qb-accent',
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
      variant: 'primary',
    },
  },
);

function IconShell({
  className,
  size,
  type,
  variant,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof iconVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'span';
  const resolvedSize: IconSize = size ?? 'default';

  return (
    <IconSizeContext.Provider value={resolvedSize}>
      <Comp
        data-slot="icon"
        className={cn(iconVariants({ size, type, variant }), className)}
        {...props}>
        {children}
      </Comp>
    </IconSizeContext.Provider>
  );
}

export { IconShell, iconVariants };
