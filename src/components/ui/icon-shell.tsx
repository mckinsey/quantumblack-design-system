import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const iconVariants = cva(
  // Base styles
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
      // Mirrors the Figma IconShell `Type` axis. `neutral` is intentionally
      // empty so the icon inherits `currentColor` from its parent (e.g.
      // inside a Button), matching the prior behaviour before this axis
      // existed. `accent-inverse` is omitted until QBDS defines a
      // `--brand-accents-qb-accent-inverse` token.
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

  return (
    <Comp
      data-slot="icon"
      className={cn(iconVariants({ size, type, variant }), className)}
      {...props}>
      {children}
    </Comp>
  );
}

export { IconShell, iconVariants };
