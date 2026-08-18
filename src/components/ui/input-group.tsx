'use client';

import { Input as InputPrimitive } from '@base-ui/react/input';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  inputGroupDefaultDisabledStyles,
  inputGroupDefaultErrorStyles,
  inputGroupDefaultFocusStyles,
  inputGroupFocusRingWidth,
  inputGroupInlineErrorStyles,
  inputGroupInlineFocusBorderWidth,
  inputGroupInlineFocusStyles,
  inputGroupInlineLgFocusUnderline,
  inputSizeDefinitions,
  inputSizeStyles,
  inputVariantStyles,
  searchCancelButtonStyles,
} from '@/components/ui/input';
import { cn } from '@/lib/utils';

const inputGroupControlDisabledTextStyles = {
  default:
    'disabled:cursor-not-allowed disabled:text-fg-disabled disabled:placeholder:text-fg-disabled',
  inline:
    'disabled:cursor-not-allowed disabled:text-fg-disabled disabled:placeholder:text-fg-disabled',
} as const;

type InputGroupSize = 'sm' | 'default' | 'lg';

const InputGroupSizeContext = React.createContext<InputGroupSize>('default');

const inputGroupVariants = cva(
  'group/input-group relative flex w-full items-center rounded-none border-0 transition-[background-color,background-image,box-shadow,border-color] outline-none min-w-0 has-[>textarea]:h-auto',
  {
    variants: {
      variant: {
        default: [
          'gap-1',
          inputVariantStyles.default.base,
          inputVariantStyles.default.hover,
          ...inputGroupDefaultFocusStyles,
          ...inputGroupDefaultErrorStyles,
          ...inputGroupDefaultDisabledStyles,
        ],
        inline: [
          'gap-2 px-0!',
          inputVariantStyles.inline.base,
          inputVariantStyles.inline.border,
          inputVariantStyles.inline.hover,
          ...inputGroupInlineFocusStyles,
          ...inputGroupInlineErrorStyles,
        ],
      },
      size: {
        sm: `${inputSizeDefinitions.sm} gap-1 pl-2 pr-2`,
        default: `${inputSizeDefinitions.default} gap-2 pl-2 pr-2`,
        lg: `${inputSizeDefinitions.lg} gap-2 pl-3 pr-3`,
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        size: 'sm',
        className: inputGroupFocusRingWidth.sm,
      },
      {
        variant: 'default',
        size: 'default',
        className: inputGroupFocusRingWidth.default,
      },
      {
        variant: 'default',
        size: 'lg',
        className: inputGroupFocusRingWidth.lg,
      },
      {
        variant: 'inline',
        size: 'sm',
        className: inputGroupInlineFocusBorderWidth.sm,
      },
      {
        variant: 'inline',
        size: 'default',
        className: inputGroupInlineFocusBorderWidth.default,
      },
      {
        variant: 'inline',
        size: 'lg',
        className: inputGroupInlineLgFocusUnderline,
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface InputGroupProps
  extends
    React.ComponentProps<'div'>,
    VariantProps<typeof inputGroupVariants> {}

function InputGroup({ className, variant, size, ...props }: InputGroupProps) {
  const resolvedSize = size ?? 'default';

  return (
    <InputGroupSizeContext.Provider value={resolvedSize}>
      <div
        data-slot="input-group"
        data-variant={variant}
        data-size={resolvedSize}
        className={cn(
          inputGroupVariants({ variant, size: resolvedSize }),
          'has-[>[data-align=inline-start]]:[&>input]:pl-2',
          'has-[>[data-align=inline-end]]:[&>input]:pr-2',
          'has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3',
          'has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3',
          className,
        )}
        {...props}
      />
    </InputGroupSizeContext.Provider>
  );
}

const inputGroupAddonVariants = cva(
  "text-fg-secondary paragraph-regular-primary flex h-auto cursor-text items-center justify-center gap-2 py-1 select-none [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        'inline-start': 'order-first',
        'inline-end': 'order-last',
        'block-start':
          'order-first w-full justify-start px-2 pt-2 [.border-b]:pb-2 group-has-[>input]/input-group:pt-1.5',
        'block-end':
          'order-last w-full justify-start px-2 pb-2 [.border-t]:pt-2 group-has-[>input]/input-group:pb-1.5',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  },
);

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={e => {
        if ((e.target as HTMLElement).closest('button')) {
          return;
        }

        const input = e.currentTarget.parentElement?.querySelector('input');

        if (input instanceof HTMLInputElement && input.disabled) {
          return;
        }

        input?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva(
  'paragraph-regular-primary shadow-none flex gap-2 items-center',
  {
    variants: {
      size: {
        xs: "h-6 gap-1 px-2 rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
        sm: 'h-8 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5',
        'icon-xxs':
          'size-4 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
        'icon-xs':
          'size-5 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
        'icon-sm':
          'size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
      },
    },
    defaultVariants: {
      size: 'xs',
    },
  },
);

function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size'> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

export interface InputGroupTextProps extends React.ComponentProps<'span'> {
  size?: InputGroupSize;
}

function InputGroupText({
  className,
  size,
  ...props
}: Readonly<InputGroupTextProps>) {
  const groupSize = React.useContext(InputGroupSizeContext);
  const resolvedSize = size ?? groupSize;

  return (
    <span
      className={cn(
        "text-fg-tertiary flex items-center gap-2 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        'group-has-[[data-slot=input-group-control]:disabled]/input-group:text-fg-disabled',
        inputSizeStyles[resolvedSize],
        className,
      )}
      {...props}
    />
  );
}

export interface InputGroupInputProps extends Omit<
  React.ComponentProps<typeof InputPrimitive>,
  'size'
> {
  variant?: 'default' | 'inline';
  size?: 'sm' | 'default' | 'lg';
}

function InputGroupInput({
  className,
  variant,
  size,
  type,
  ...props
}: Readonly<InputGroupInputProps>) {
  const groupSize = React.useContext(InputGroupSizeContext);
  const resolvedSize = size ?? groupSize;
  const isInline = variant === 'inline';
  const textStyles = isInline
    ? inputVariantStyles.inline.text
    : inputVariantStyles.default.text;
  const disabledTextStyles = isInline
    ? inputGroupControlDisabledTextStyles.inline
    : inputGroupControlDisabledTextStyles.default;

  return (
    <InputPrimitive
      type={type}
      data-slot="input-group-control"
      className={cn(
        'h-full w-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-0! py-0! font-normal shadow-none ring-0 transition-[color] outline-none',
        searchCancelButtonStyles,
        'selection:bg-fill-active selection:text-fg-primary-inverse',
        'file:text-fg-primary file:inline-flex file:border-0 file:bg-transparent file:font-medium',
        inputSizeStyles[resolvedSize],
        textStyles,
        disabledTextStyles,
        className,
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="input-group-control"
      className={cn(
        'h-full min-h-0 flex-1 resize-none rounded-none border-0 bg-transparent px-2 py-2 font-normal shadow-none ring-0 outline-none',
        'paragraph-regular-primary text-fg-primary placeholder:text-fg-tertiary',
        'selection:bg-fill-active selection:text-fg-primary-inverse',
        'disabled:text-fg-disabled disabled:placeholder:text-fg-disabled disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
  inputGroupVariants,
};
