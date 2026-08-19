'use client';

import { Input as InputPrimitive } from '@base-ui/react/input';
import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const searchCancelButtonIcon =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgNEw0IDEyTTQgNEwxMiAxMiIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=';

export const searchCancelButtonStyles = [
  '[&::-webkit-search-cancel-button]:appearance-none',
  '[&::-webkit-search-cancel-button]:size-4',
  '[&::-webkit-search-cancel-button]:cursor-pointer',
  '[&::-webkit-search-cancel-button]:rounded-full',
  '[&::-webkit-search-cancel-button]:bg-text-secondary',
  '[&::-webkit-search-cancel-button]:hover:bg-text-primary',
  '[&::-webkit-search-cancel-button]:transition-colors',
  `[&::-webkit-search-cancel-button]:[mask-image:url(${searchCancelButtonIcon})]`,
  '[&::-webkit-search-cancel-button]:[mask-size:contain]',
  '[&::-webkit-search-cancel-button]:[mask-repeat:no-repeat]',
  '[&::-webkit-search-cancel-button]:[mask-position:center]',
].join(' ');

export const inputVariantStyles = {
  default: {
    base: 'border border-transparent bg-fill-onsurface-ui-3 shadow-elevation-0',
    text: 'text-fg-primary placeholder:text-fg-tertiary',
    hover: 'hover:overlay-hover disabled:hover:overlay-disabled',
    focus:
      'focus-visible:overlay-active-inverse focus-visible:ring-stroke-status-focus',
    error:
      'aria-invalid:border-stroke-status-error aria-invalid:focus-visible:ring-stroke-status-error',
    disabled:
      'disabled:cursor-not-allowed disabled:overlay-disabled disabled:text-fg-disabled disabled:placeholder:text-fg-disabled',
  },
  inline: {
    base: 'bg-transparent border-0 border-b-[1px] shadow-none',
    border: 'border-b-stroke-tertiary',
    text: 'text-fg-primary placeholder:text-fg-tertiary',
    hover: 'hover:border-b-stroke-tertiary-hover',
    focus: 'focus-visible:border-b-stroke-status-focus focus-visible:ring-0',
    error:
      'aria-invalid:border-b-stroke-status-error aria-invalid:focus-visible:border-b-stroke-status-error',
    disabled:
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-fg-disabled disabled:placeholder:text-fg-disabled',
  },
} as const;

export const inputSizeStyles = {
  sm: 'h-7 paragraph-small-primary',
  default: 'h-9 paragraph-regular-primary',
  lg: 'h-12 paragraph-large-primary',
} as const;

export const inputSizeDefinitions = {
  sm: `${inputSizeStyles.sm} px-2 py-1`,
  default: `${inputSizeStyles.default} p-2`,
  lg: `${inputSizeStyles.lg} p-3`,
} as const;

export const inputFocusRingWidth = {
  sm: 'focus-visible:ring-[1px]',
  default: 'focus-visible:ring-[1px]',
  lg: 'focus-visible:ring-[2px]',
} as const;

export const inputInlineFocusBorderWidth = {
  sm: 'focus-visible:border-b-[1px]',
  default: 'focus-visible:border-b-[1px]',
  lg: 'focus-visible:border-b-[2px]',
} as const;

export const inputInlineLgFocusUnderline =
  'focus-visible:shadow-[0_1px_0_0_var(--color-stroke-status-focus)] aria-invalid:focus-visible:shadow-[0_1px_0_0_var(--color-stroke-status-error)]';

export function createGroupControlStyles(slot: string) {
  return {
    focusRingWidth: {
      sm: `has-[[data-slot=${slot}]:focus-visible]:ring-[1px]`,
      default: `has-[[data-slot=${slot}]:focus-visible]:ring-[1px]`,
      lg: `has-[[data-slot=${slot}]:focus-visible]:ring-[2px]`,
    },
    inlineFocusBorderWidth: {
      sm: `has-[[data-slot=${slot}]:focus-visible]:border-b-[1px]`,
      default: `has-[[data-slot=${slot}]:focus-visible]:border-b-[1px]`,
      lg: `has-[[data-slot=${slot}]:focus-visible]:border-b-[2px]`,
    },
    defaultFocusStyles: [
      `has-[[data-slot=${slot}]:focus-visible]:overlay-active-inverse`,
      `has-[[data-slot=${slot}]:focus-visible]:ring-stroke-status-focus`,
      `has-[[data-slot=${slot}]:focus-visible]:shadow-elevation-0`,
    ] as const,
    inlineFocusStyles: [
      `has-[[data-slot=${slot}]:focus-visible]:border-b-stroke-status-focus`,
      `has-[[data-slot=${slot}]:focus-visible]:ring-0`,
    ] as const,
    defaultErrorStyles: [
      `has-[[data-slot=${slot}][aria-invalid]]:border-stroke-status-error`,
      `has-[[data-slot=${slot}][aria-invalid]:focus-visible]:ring-stroke-status-error`,
    ] as const,
    inlineErrorStyles: [
      `has-[[data-slot=${slot}][aria-invalid]]:border-b-stroke-status-error`,
    ] as const,
    inlineLgFocusUnderline: `has-[[data-slot=${slot}]:focus-visible]:shadow-[0_1px_0_0_var(--color-stroke-status-focus)] has-[[data-slot=${slot}][aria-invalid]:focus-visible]:shadow-[0_1px_0_0_var(--color-stroke-status-error)]`,
    defaultDisabledStyles: [
      `has-[[data-slot=${slot}]:disabled]:cursor-not-allowed`,
      `has-[[data-slot=${slot}]:disabled]:overlay-disabled`,
    ] as const,
  };
}

const inputGroupControlStyles = createGroupControlStyles('input-group-control');

export const inputGroupFocusRingWidth = inputGroupControlStyles.focusRingWidth;

export const inputGroupInlineFocusBorderWidth =
  inputGroupControlStyles.inlineFocusBorderWidth;

export const inputGroupDefaultFocusStyles =
  inputGroupControlStyles.defaultFocusStyles;

export const inputGroupInlineFocusStyles =
  inputGroupControlStyles.inlineFocusStyles;

export const inputGroupDefaultErrorStyles =
  inputGroupControlStyles.defaultErrorStyles;

export const inputGroupInlineErrorStyles =
  inputGroupControlStyles.inlineErrorStyles;

export const inputGroupInlineLgFocusUnderline =
  inputGroupControlStyles.inlineLgFocusUnderline;

export const inputGroupDefaultDisabledStyles =
  inputGroupControlStyles.defaultDisabledStyles;

const inputVariants = cva(
  `flex w-full min-w-0 rounded-none outline-none transition-[border-color,box-shadow,background-color,background-image] font-normal ${searchCancelButtonStyles}`,
  {
    variants: {
      size: {
        sm: inputSizeDefinitions.sm,
        default: inputSizeDefinitions.default,
        lg: inputSizeDefinitions.lg,
      },
      variant: {
        default: [
          inputVariantStyles.default.base,
          inputVariantStyles.default.text,
          'selection:bg-fill-active selection:text-fg-primary-inverse',
          'file:inline-flex file:border-0 file:bg-transparent file:font-medium file:text-fg-primary',
          inputVariantStyles.default.focus,
          inputVariantStyles.default.hover,
          inputVariantStyles.default.error,
          inputVariantStyles.default.disabled,
        ],
        inline: [
          inputVariantStyles.inline.base,
          'px-0',
          inputVariantStyles.inline.border,
          inputVariantStyles.inline.text,
          'selection:bg-fill-active selection:text-fg-primary-inverse',
          inputVariantStyles.inline.hover,
          inputVariantStyles.inline.focus,
          inputVariantStyles.inline.error,
          inputVariantStyles.inline.disabled,
        ],
      },
    },
    compoundVariants: [
      { variant: 'default', size: 'sm', className: inputFocusRingWidth.sm },
      {
        variant: 'default',
        size: 'default',
        className: inputFocusRingWidth.default,
      },
      { variant: 'default', size: 'lg', className: inputFocusRingWidth.lg },
      {
        variant: 'inline',
        size: 'lg',
        className: inputInlineLgFocusUnderline,
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface InputProps
  extends
    Omit<React.ComponentProps<typeof InputPrimitive>, 'size'>,
    VariantProps<typeof inputVariants> {
  variant?: 'default' | 'inline';
  size?: 'sm' | 'default' | 'lg';
}

function Input({ className, type, variant, size, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
