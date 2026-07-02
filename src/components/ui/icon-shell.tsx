import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { type IconSize, IconSizeContext } from './icon';

/** Secondary → primary on hover/highlight (variant switch via group state). */
const iconShellHoverPrimary = [
  'group-hover/btn:text-fg-primary',
  'group-hover:text-fg-primary',
  'group-data-[highlighted]:text-fg-primary',
  'group-data-[state=open]:text-fg-primary',
  'group-data-open/accordion-item:text-fg-primary',
] as const;

const iconShellHoverPrimaryInverse = [
  'group-hover/btn:text-fg-primary-inverse',
  'group-hover:text-fg-primary-inverse',
  'group-data-[highlighted]:text-fg-primary-inverse',
  'group-data-[state=open]:text-fg-primary-inverse',
  'group-data-open/accordion-item:text-fg-primary-inverse',
] as const;

const iconShellHoverAccentPrimary = [
  'group-hover/btn:opacity-88',
  'group-hover:opacity-88',
  'group-data-[highlighted]:opacity-88',
  'group-data-[state=open]:opacity-88',
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
        neutral: '',
        'neutral-inverse': '',
        accent: '',
        'accent-inverse': '',
      },
      variant: {
        primary: '',
        secondary: '',
        disabled: '',
      },
    },
    compoundVariants: [
      { type: 'neutral', variant: 'primary', className: 'text-fg-primary' },
      {
        type: 'neutral',
        variant: 'secondary',
        className: ['text-fg-secondary', ...iconShellHoverPrimary],
      },
      { type: 'neutral', variant: 'disabled', className: 'text-fg-disabled' },
      {
        type: 'neutral-inverse',
        variant: 'primary',
        className: 'text-fg-primary-inverse',
      },
      {
        type: 'neutral-inverse',
        variant: 'secondary',
        className: [
          'text-fg-secondary-inverse',
          ...iconShellHoverPrimaryInverse,
        ],
      },
      {
        type: 'neutral-inverse',
        variant: 'disabled',
        className: 'text-fg-disabled-inverse',
      },
      {
        type: 'accent',
        variant: 'primary',
        className: 'text-brand-accents-qb-accent opacity-88',
      },
      {
        type: 'accent',
        variant: 'secondary',
        className: [
          'text-brand-accents-qb-accent opacity-60',
          ...iconShellHoverAccentPrimary,
        ],
      },
      {
        type: 'accent',
        variant: 'disabled',
        className: 'text-brand-accents-qb-accent opacity-30',
      },
      {
        type: 'accent-inverse',
        variant: 'primary',
        className: 'text-fg-primary-inverse',
      },
      {
        type: 'accent-inverse',
        variant: 'secondary',
        className: [
          'text-fg-secondary-inverse',
          ...iconShellHoverPrimaryInverse,
        ],
      },
      {
        type: 'accent-inverse',
        variant: 'disabled',
        className: 'text-fg-disabled-inverse',
      },
    ],
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
