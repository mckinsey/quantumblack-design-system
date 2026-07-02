import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { type IconSize, IconSizeContext } from './icon';

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
        neutral: 'text-fg-primary',
        'neutral-inverse': 'text-fg-primary-inverse',
        accent: 'text-brand-accents-qb-accent',
        'accent-inverse': 'text-brand-accents-mckinsey-electric-blue',
        success: 'text-status-success',
        error: 'text-status-error',
        warning: 'text-status-warning',
        info: 'text-status-information',
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

export type IconShellType = NonNullable<
  VariantProps<typeof iconVariants>['type']
>;
