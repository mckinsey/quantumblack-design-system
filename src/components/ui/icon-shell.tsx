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
          'group-hover/button:opacity-88',
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

type IconShellSize = NonNullable<VariantProps<typeof iconVariants>['size']>;
type IconShellType = NonNullable<VariantProps<typeof iconVariants>['type']>;
type IconShellOpacity = 'primary' | 'secondary';
type ResolvedVariant = IconShellOpacity | 'disabled';

type IconShellBaseProps = Omit<React.ComponentProps<'span'>, 'disabled'> & {
  asChild?: boolean;
  /** sm (16px), default (24px), lg (32px). Provides size context to Icon. */
  size?: IconShellSize;
  /** Colour tone. Use type="custom" + className for brand/status colours. */
  type?: IconShellType;
  /** Disabled opacity (30%). Works in static and hoverable modes. */
  disabled?: boolean;
};

type IconShellStaticProps = IconShellBaseProps & {
  hoverable?: false;
  /** Static opacity: primary (88%) or secondary (60%). Not used with hoverable. */
  variant?: IconShellOpacity;
};

type IconShellHoverableProps = IconShellBaseProps & {
  /** Icon-only button: secondary rest, primary on hover/active. Do not pass variant. */
  hoverable: true;
  variant?: never;
};

type IconShellProps = IconShellStaticProps | IconShellHoverableProps;

function resolveVariant(
  variant: IconShellOpacity | undefined,
  hoverable: boolean,
  isDisabled: boolean,
): ResolvedVariant {
  if (isDisabled) {
    return 'disabled';
  }

  if (hoverable) {
    return 'secondary';
  }

  return variant ?? 'secondary';
}

/**
 * QBDS wrapper for Icon — size, tone, and opacity.
 *
 * Static icons: variant (primary/secondary).
 * Icon-only buttons: hoverable (variant not accepted).
 * disabled overrides opacity in either mode.
 *
 * @example
 * ```tsx
 * <IconShell><Icon icon="search" /></IconShell>
 * <IconShell variant="primary"><Icon icon="info" /></IconShell>
 * <IconShell hoverable><Icon icon="edit" /></IconShell>
 * ```
 */
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
  const isHoverable = hoverable && !disabled;
  const resolvedVariant = resolveVariant(variant, isHoverable, disabled);
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
export type { IconShellProps, IconShellOpacity };
