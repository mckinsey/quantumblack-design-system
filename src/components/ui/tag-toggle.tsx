'use client';

import { Toggle } from '@base-ui/react/toggle';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import {
  tagBaseStyles,
  tagSizeVariants,
  wrapTagText,
} from '@/components/ui/tag';
import { cn } from '@/lib/utils';

type TagToggleVariant = 'default' | 'outline';

type TagToggleSize = 'xs' | 'sm' | 'default' | 'lg';

const hoverOverlay =
  'hover:[background-image:linear-gradient(var(--color-stateslayer-overlay-hover),var(--color-stateslayer-overlay-hover))]';

const pressedOverlay =
  'active:[background-image:linear-gradient(var(--color-stateslayer-overlay-pressed),var(--color-stateslayer-overlay-pressed))]';

const disabledOverlay =
  'disabled:[background-image:linear-gradient(var(--color-stateslayer-overlay-disabled),var(--color-stateslayer-overlay-disabled))]';

const nonPillPadding = {
  xs: '!pl-1 !pr-2',
  sm: '!pl-1 !pr-2',
  default: '!pl-1 !pr-2',
  lg: '!px-2',
} as const;

function tagToggleClasses({
  variant = 'default',
  size = 'default',
  pill,
  className,
}: {
  variant?: TagToggleVariant;
  size?: TagToggleSize;
  pill?: VariantProps<typeof tagSizeVariants>['pill'];
  className?: string;
} = {}) {
  return cn(
    tagSizeVariants({ size, pill }),

    'gap-1',
    pill !== true && nonPillPadding[size],

    ...tagBaseStyles('disabled'),
    'cursor-pointer group',
    'disabled:text-fg-disabled',

    variant === 'default' && [
      'bg-fill-muted text-fg-primary',
      hoverOverlay,
      pressedOverlay,
      disabledOverlay,
      'focus-visible:bg-fill-muted',
      'data-pressed:bg-fill-active data-pressed:text-fg-primary-inverse',
      'data-pressed:focus-visible:bg-fill-active',
    ],

    variant === 'outline' && [
      'border border-stroke-tertiary text-fg-primary',
      hoverOverlay,
      pressedOverlay,
      disabledOverlay,
      'data-pressed:border-stroke-active!',
    ],

    className,
  );
}

function TagToggle({
  className,
  variant = 'default',
  size = 'default',
  pill,
  children,
  ...props
}: Omit<Toggle.Props, 'className'> & {
  className?: string;
  variant?: TagToggleVariant;
  size?: TagToggleSize;
  pill?: VariantProps<typeof tagSizeVariants>['pill'];
}) {
  return (
    <Toggle
      data-slot="tag-toggle"
      className={tagToggleClasses({ variant, size, pill, className })}
      {...props}>
      {wrapTagText(children, 'disabled')}
    </Toggle>
  );
}

export {
  TagToggle,
  tagToggleClasses,
  type TagToggleVariant,
  type TagToggleSize,
};
