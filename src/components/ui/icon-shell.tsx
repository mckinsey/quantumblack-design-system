import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { type IconSize, IconSizeContext } from './icon';

/** Content types: colour from parent context (currentColor). Matches Figma variable bindings. */
const ICON_SHELL_CONTENT_TYPES = [
  'neutral',
  'neutral-inverse',
  'accent',
  'accent-inverse',
] as const;

/** Status types: fixed semantic tokens on the shell. Opacity from variant. */
const ICON_SHELL_STATUS_TYPES = [
  'success',
  'error',
  'warning',
  'info',
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
        neutral: 'text-current',
        'neutral-inverse': 'text-current',
        accent: 'text-current',
        'accent-inverse': 'text-current',
        success: 'text-status-success',
        error: 'text-status-error',
        warning: 'text-status-warning',
        info: 'text-status-information',
      },
      // Figma State prop — opacity applies to status types only; content types
      // inherit emphasis from the parent text token (fg-primary vs fg-secondary).
      variant: {
        primary: '',
        secondary: '',
        disabled: '',
      },
    },
    compoundVariants: [
      {
        type: [...ICON_SHELL_CONTENT_TYPES],
        variant: 'disabled',
        className: 'opacity-30',
      },
      {
        type: [...ICON_SHELL_STATUS_TYPES],
        variant: 'primary',
        className: 'opacity-88',
      },
      {
        type: [...ICON_SHELL_STATUS_TYPES],
        variant: 'secondary',
        className: 'opacity-60',
      },
      {
        type: [...ICON_SHELL_STATUS_TYPES],
        variant: 'disabled',
        className: 'opacity-30',
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

export {
  IconShell,
  ICON_SHELL_CONTENT_TYPES,
  ICON_SHELL_STATUS_TYPES,
  iconVariants,
};

export type IconShellType = NonNullable<
  VariantProps<typeof iconVariants>['type']
>;
