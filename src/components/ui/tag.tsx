import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

const hoverOverlay = {
  normal:
    'hover:[background-image:linear-gradient(var(--color-stateslayer-overlay-hover),var(--color-stateslayer-overlay-hover))]',
  inverse:
    'hover:[background-image:linear-gradient(var(--color-stateslayer-overlay-hover-inverse),var(--color-stateslayer-overlay-hover-inverse))]!',
} as const;

const pressedOverlay = {
  normal:
    'active:[background-image:linear-gradient(var(--color-stateslayer-overlay-pressed),var(--color-stateslayer-overlay-pressed))]',
  inverse:
    'active:[background-image:linear-gradient(var(--color-stateslayer-overlay-pressed-inverse),var(--color-stateslayer-overlay-pressed-inverse))]!',
} as const;

const disabledOverlay =
  'aria-disabled:[background-image:linear-gradient(var(--color-stateslayer-overlay-disabled),var(--color-stateslayer-overlay-disabled))]';
const disabledOverlayInverse =
  'aria-disabled:[background-image:linear-gradient(var(--color-stateslayer-overlay-disabled-inverse),var(--color-stateslayer-overlay-disabled-inverse))]';

const dismissIconColor = {
  primary: 'text-fill-active',
  secondary: 'text-fill-active-inverse',
  accent: 'text-mist-50',
  outline: 'text-fill-active',
  'accent-outline': 'text-fill-active',
} as const;

/** Base interaction classes shared with TagToggle (parameterised by disabled prefix) */
function tagBaseStyles(disabledPrefix: 'disabled' | 'aria-disabled') {
  return [
    'whitespace-nowrap outline-none transition-all',
    'focus-visible:ring-2 focus-visible:ring-stroke-status-focus',
    `${disabledPrefix}:cursor-not-allowed`,
    `${disabledPrefix}:hover:[background-image:none]`,
    `${disabledPrefix}:active:[background-image:none]`,
  ];
}

/**
 * Apply the hover underline to text-bearing children — raw text/number nodes
 * and plain `<span>` wrappers — while skipping design system primitives
 * (anything carrying a `data-slot`, like Icon or Avatar). The parent must
 * have the `group` class for `group-hover` to take effect.
 */
function wrapTagText(
  children: React.ReactNode,
  disabledPrefix: 'disabled' | 'aria-disabled',
): React.ReactNode {
  const underlineClass = cn(
    'group-hover:underline [text-underline-position:from-font]',
    disabledPrefix === 'aria-disabled'
      ? 'group-aria-disabled:no-underline'
      : 'group-disabled:no-underline',
  );

  return React.Children.map(children, child => {
    if (typeof child === 'string' || typeof child === 'number') {
      return <span className={underlineClass}>{child}</span>;
    }

    if (
      React.isValidElement<{ className?: string; 'data-slot'?: string }>(
        child,
      ) &&
      child.type === 'span' &&
      !child.props['data-slot']
    ) {
      return React.cloneElement(child, {
        className: cn(child.props.className, underlineClass),
      });
    }

    return child;
  });
}

/** Size & pill classes shared with TagToggle */
const tagSizeVariants = cva('inline-flex items-center w-fit px-1 gap-1', {
  variants: {
    size: {
      xs: 'h-5 label-small-primary',
      sm: 'h-6 label-regular-primary',
      default: 'h-7 label-regular-primary',
      lg: 'h-8 label-large-primary',
    },
    pill: {
      false: 'rounded-none !px-1',
      true: 'rounded-full px-2',
    },
  },
  compoundVariants: [{ pill: true, size: 'xs', class: 'px-1' }],
  defaultVariants: {
    size: 'default',
    pill: false,
  },
});

/** Full Tag variant styling (not shared — Tag is a <div>, Toggle is a <button>) */
const tagVariants = cva(tagBaseStyles('aria-disabled'), {
  variants: {
    variant: {
      primary: [
        'bg-fill-muted text-fg-primary',
        hoverOverlay.normal,
        pressedOverlay.normal,
        'aria-disabled:bg-fill-muted aria-disabled:text-fg-disabled',
        disabledOverlay,
      ],
      secondary: [
        'bg-fill-active text-fg-primary-inverse',
        hoverOverlay.inverse,
        pressedOverlay.inverse,
        'aria-disabled:text-fg-disabled-inverse',
        disabledOverlayInverse,
      ],
      accent: [
        'bg-brand-accents-qb-accent text-mist-50',
        hoverOverlay.inverse,
        pressedOverlay.inverse,
        'aria-disabled:text-fg-disabled',
        'aria-disabled:hover:[background-image:none]!',
        'aria-disabled:active:[background-image:none]!',
        disabledOverlay,
      ],
      outline: [
        'border border-stroke-secondary bg-fill-muted text-fg-primary',
        hoverOverlay.normal,
        pressedOverlay.normal,
        'aria-disabled:bg-fill-muted aria-disabled:text-fg-disabled',
        'aria-disabled:border-stroke-tertiary',
        disabledOverlay,
      ],

      'accent-outline': [
        'border border-brand-accents-qb-accent bg-fill-muted text-fg-primary',
        hoverOverlay.normal,
        pressedOverlay.inverse,
        'aria-disabled:bg-fill-muted aria-disabled:text-fg-disabled',
        'aria-disabled:active:[background-image:none]!',
        disabledOverlay,
      ],
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

/**
 * Tag props. Variant mapping to design spec:
 * - primary → Type=primary (muted fill) — default
 * - secondary → Type=high-emphasis (filled)
 * - accent → Type=accent
 * - outline → Type=primary, Outline=true
 * - accent-outline → Type=accent, Outline=true
 */
export interface TagProps
  extends
    React.ComponentProps<'div'>,
    VariantProps<typeof tagSizeVariants>,
    VariantProps<typeof tagVariants> {
  disabled?: boolean;
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

type IconTone = 'neutral' | 'neutral-inverse';

const tagIconTone: Record<NonNullable<TagProps['variant']>, IconTone> = {
  primary: 'neutral',
  secondary: 'neutral-inverse',
  accent: 'neutral',
  outline: 'neutral',
  'accent-outline': 'neutral',
};

function Tag({
  className,
  size = 'default',
  pill,
  variant = 'primary',
  onRemove,
  disabled,
  children,
  onClick,
  onKeyDown,
  ...props
}: TagProps) {
  const isInteractive = !!onClick;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);

    if (disabled) return;

    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
    }

    if (onRemove && (e.key === 'Delete' || e.key === 'Backspace')) {
      e.preventDefault();
      onRemove(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return (
    <div
      data-slot="tag"
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive && !disabled ? 0 : undefined}
      aria-disabled={disabled || undefined}
      aria-keyshortcuts={onRemove ? 'Delete' : undefined}
      onClick={!disabled && onClick ? onClick : undefined}
      onKeyDown={isInteractive || onRemove ? handleKeyDown : onKeyDown}
      className={cn(
        tagSizeVariants({ size, pill }),
        tagVariants({ variant }),
        'group',
        className,
      )}
      {...props}>
      {wrapTagText(children, 'aria-disabled')}

      {onRemove && (
        <button
          type="button"
          disabled={disabled}
          onClick={e => {
            e.stopPropagation();
            onRemove(e);
          }}
          className={cn(
            'inline-flex shrink-0 cursor-pointer items-center justify-center transition-opacity outline-none',
            'opacity-60 group-hover:opacity-[0.88] disabled:opacity-30',
            'disabled:cursor-not-allowed',
            dismissIconColor[variant ?? 'primary'],
          )}
          aria-label="Remove tag">
          <Icon
            icon="close"
            size="sm"
            className={cn(size !== 'xs' && 'ml-1')}
          />
        </button>
      )}
    </div>
  );
}

export {
  Tag,
  tagBaseStyles,
  tagIconTone,
  tagSizeVariants,
  tagVariants,
  wrapTagText,
};
