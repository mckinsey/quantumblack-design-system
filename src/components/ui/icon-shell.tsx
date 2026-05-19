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
  const resolvedSize = size ?? 'default';

  // Pass resolvedSize down so the child icon can render its optical-size-
  // matched glyph (20dp@400 / 24dp@300 / 40dp@300 per ICON-RULES.md §2).
  // Only clones a single React element child; anything else passes through.
  const child =
    React.isValidElement(children) &&
    (children.props as { size?: unknown }).size === undefined
      ? React.cloneElement(children, { size: resolvedSize } as Partial<unknown>)
      : children;

  return (
    <Comp
      data-slot="icon"
      className={cn(iconVariants({ size, type, variant }), className)}
      {...props}>
      {child}
    </Comp>
  );
}

export { IconShell, iconVariants };
