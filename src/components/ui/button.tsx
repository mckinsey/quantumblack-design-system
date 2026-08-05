import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const hoverGradient = {
  normal:
    'hover:[background-image:linear-gradient(var(--color-stateslayer-overlay-hover),var(--color-stateslayer-overlay-hover))] disabled:hover:[background-image:none]',
  inverse:
    'hover:[background-image:linear-gradient(var(--color-stateslayer-overlay-hover-inverse),var(--color-stateslayer-overlay-hover-inverse))] disabled:hover:[background-image:none]',
} as const;

const activeGradient = {
  normal:
    'active:[background-image:linear-gradient(var(--color-stateslayer-overlay-pressed),var(--color-stateslayer-overlay-pressed))] disabled:active:[background-image:none]',
  inverse:
    'active:[background-image:linear-gradient(var(--color-stateslayer-overlay-pressed-inverse),var(--color-stateslayer-overlay-pressed-inverse))] disabled:active:[background-image:none]',
} as const;

const disabledOverlayGradient =
  'disabled:[background-image:linear-gradient(var(--color-stateslayer-overlay-disabled),var(--color-stateslayer-overlay-disabled))]';

const commonDisabled = 'disabled:bg-fill-muted';

const buttonVariants = cva(
  [
    'relative cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap outline-none',
    'transition-all',
    'group/button',
    'focus-visible:ring-stroke-status-focus',
    'disabled:cursor-not-allowed disabled:text-fg-disabled',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-fill-primary text-fg-primary-inverse',
          hoverGradient.inverse,
          activeGradient.inverse,
          'focus-visible:bg-stateslayer-overlay-active',
          'focus-visible:ring-offset-1 focus-visible:ring-offset-stroke-active-inverse',
          commonDisabled,
          disabledOverlayGradient,
        ],
        accent: [
          'bg-brand-accents-qb-accent text-mist-50-opacity-88',
          hoverGradient.normal,
          activeGradient.normal,
          'focus-visible:ring-offset-1 focus-visible:ring-offset-stroke-active-inverse',
          commonDisabled,
          disabledOverlayGradient,
        ],
        secondary: [
          'bg-fill-muted text-fg-primary',
          hoverGradient.normal,
          activeGradient.normal,
          'focus-visible:ring-offset-1 focus-visible:ring-offset-stroke-active-inverse',
          commonDisabled,
          disabledOverlayGradient,
        ],
        outline: [
          'inset-ring inset-ring-stroke-secondary bg-fill-muted-inverse text-fg-primary',
          'focus-visible:inset-ring-stroke-active',
          hoverGradient.normal,
          activeGradient.normal,
          'focus-visible:bg-stateslayer-overlay-active-inverse',
          disabledOverlayGradient,
          'disabled:inset-ring-stroke-tertiary',
        ],
        ghost: [
          'bg-transparent text-fg-primary',
          'hover:bg-stateslayer-overlay-hover active:bg-stateslayer-overlay-pressed',
          'focus-visible:bg-stateslayer-overlay-active-inverse',
          'disabled:bg-transparent disabled:hover:bg-transparent disabled:active:bg-transparent',
        ],
      },
      size: {
        xxs: [
          'px-1 py-0.5 gap-0.5',
          'cta-button-03',
          'rounded-sm',
          'focus-visible:ring-1',
        ],
        xs: [
          'px-1 py-1 gap-0.5',
          'cta-button-03',
          'rounded-sm',
          'focus-visible:ring-1',
        ],
        sm: [
          'px-2 py-1 gap-1',
          'cta-button-02',
          'rounded-sm',
          'focus-visible:ring-1',
        ],
        default: [
          'p-2 gap-2',
          'cta-button-02',
          'rounded-reg',
          'focus-visible:ring-2',
        ],
        lg: [
          'px-3 py-3 gap-2',
          'cta-button-01',
          'rounded-reg',
          'focus-visible:ring-2',
        ],
        'icon-xxs': ['size-5 p-0', 'rounded-sm', 'focus-visible:ring-1'],
        'icon-xs': ['size-6 p-0', 'rounded-sm', 'focus-visible:ring-1'],
        'icon-sm': ['size-7 p-0', 'rounded-sm', 'focus-visible:ring-1'],
        icon: ['size-9 p-0', 'rounded-reg', 'focus-visible:ring-2'],
        'icon-lg': ['size-12 p-0', 'rounded-reg', 'focus-visible:ring-2'],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function wrapTextNodes(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, child => {
    if (typeof child === 'string' || typeof child === 'number') {
      return (
        <span
          className="[text-underline-position:from-font] group-hover/button:underline group-focus/button:underline group-active/button:underline group-disabled/button:no-underline group-aria-disabled/button:no-underline"
          key={String(child)}>
          {child}
        </span>
      );
    }

    return child;
  });
}

function Button({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}>
      {wrapTextNodes(children)}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
