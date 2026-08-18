'use client';

import { NumberField as NumberFieldPrimitive } from '@base-ui/react/number-field';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  inputSizeDefinitions,
  inputSizeStyles,
  inputVariantStyles,
} from '@/components/ui/input';
import { cn } from '@/lib/utils';

type NumberFieldSize = 'sm' | 'default' | 'lg';
type NumberFieldVariant = 'default' | 'inline';

const NumberFieldSizeContext = React.createContext<NumberFieldSize>('default');
const NumberFieldVariantContext =
  React.createContext<NumberFieldVariant>('default');

const controlSlot = 'number-field-control';

const numberFieldDefaultFocusStyles = [
  `has-[[data-slot=${controlSlot}]:focus-visible]:overlay-active-inverse`,
  `has-[[data-slot=${controlSlot}]:focus-visible]:ring-stroke-status-focus`,
  `has-[[data-slot=${controlSlot}]:focus-visible]:shadow-elevation-0`,
] as const;

const numberFieldInlineFocusStyles = [
  `has-[[data-slot=${controlSlot}]:focus-visible]:border-b-stroke-status-focus`,
  `has-[[data-slot=${controlSlot}]:focus-visible]:ring-0`,
] as const;

const numberFieldDefaultErrorStyles = [
  `has-[[data-slot=${controlSlot}][aria-invalid=true]]:border-stroke-status-error`,
  `has-[[data-slot=${controlSlot}][aria-invalid=true]:focus-visible]:ring-stroke-status-error`,
] as const;

const numberFieldInlineErrorStyles = [
  `has-[[data-slot=${controlSlot}][aria-invalid=true]]:border-b-stroke-status-error`,
  `has-[[data-slot=${controlSlot}][aria-invalid=true]:focus-visible]:border-b-stroke-status-error`,
] as const;

const numberFieldDefaultDisabledStyles = [
  `has-[[data-slot=${controlSlot}]:disabled]:cursor-not-allowed`,
  `has-[[data-slot=${controlSlot}]:disabled]:overlay-disabled`,
] as const;

const numberFieldFocusRingWidth = {
  sm: `has-[[data-slot=${controlSlot}]:focus-visible]:ring-[1px]`,
  default: `has-[[data-slot=${controlSlot}]:focus-visible]:ring-[1px]`,
  lg: `has-[[data-slot=${controlSlot}]:focus-visible]:ring-[2px]`,
} as const;

const numberFieldInlineFocusBorderWidth = {
  sm: `has-[[data-slot=${controlSlot}]:focus-visible]:border-b-[1px]`,
  default: `has-[[data-slot=${controlSlot}]:focus-visible]:border-b-[1px]`,
  lg: `has-[[data-slot=${controlSlot}]:focus-visible]:border-b-[2px]`,
} as const;

const numberFieldInlineLgFocusUnderline = `has-[[data-slot=${controlSlot}]:focus-visible]:shadow-[0_1px_0_0_var(--color-stroke-status-focus)] has-[[data-slot=${controlSlot}][aria-invalid=true]:focus-visible]:shadow-[0_1px_0_0_var(--color-stroke-status-error)]`;

const numberFieldControlDisabledTextStyles = {
  default:
    'disabled:cursor-not-allowed disabled:text-fg-disabled disabled:placeholder:text-fg-disabled',
  inline: 'disabled:text-fg-disabled disabled:placeholder:text-fg-disabled',
} as const;

const stepperButtonClass = {
  sm: 'size-4 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
  default: 'size-4 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
  lg: 'size-5 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
} as const;

const numberFieldGroupVariants = cva(
  'group/number-field relative flex w-full min-w-0 items-center rounded-none border-0 transition-[background-color,background-image,box-shadow,border-color] outline-none',
  {
    variants: {
      variant: {
        default: [
          'gap-1',
          inputVariantStyles.default.base,
          inputVariantStyles.default.hover,
          ...numberFieldDefaultFocusStyles,
          ...numberFieldDefaultErrorStyles,
          ...numberFieldDefaultDisabledStyles,
        ],
        inline: [
          'gap-1 px-0!',
          inputVariantStyles.inline.base,
          inputVariantStyles.inline.border,
          inputVariantStyles.inline.hover,
          ...numberFieldInlineFocusStyles,
          ...numberFieldInlineErrorStyles,
        ],
      },
      size: {
        sm: `${inputSizeDefinitions.sm} pl-2 pr-2`,
        default: `${inputSizeDefinitions.default} pl-2 pr-2`,
        lg: `${inputSizeDefinitions.lg} pl-3 pr-3`,
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        size: 'sm',
        className: numberFieldFocusRingWidth.sm,
      },
      {
        variant: 'default',
        size: 'default',
        className: numberFieldFocusRingWidth.default,
      },
      {
        variant: 'default',
        size: 'lg',
        className: numberFieldFocusRingWidth.lg,
      },
      {
        variant: 'inline',
        size: 'sm',
        className: numberFieldInlineFocusBorderWidth.sm,
      },
      {
        variant: 'inline',
        size: 'default',
        className: numberFieldInlineFocusBorderWidth.default,
      },
      {
        variant: 'inline',
        size: 'lg',
        className: numberFieldInlineLgFocusUnderline,
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function NumberField({ className, ...props }: NumberFieldPrimitive.Root.Props) {
  return (
    <NumberFieldPrimitive.Root
      data-slot="number-field"
      className={cn('w-full', className)}
      {...props}
    />
  );
}

export interface NumberFieldGroupProps
  extends
    React.ComponentProps<typeof NumberFieldPrimitive.Group>,
    VariantProps<typeof numberFieldGroupVariants> {}

function NumberFieldGroup({
  className,
  variant,
  size,
  ...props
}: NumberFieldGroupProps) {
  const resolvedSize = size ?? 'default';
  const resolvedVariant = variant ?? 'default';

  return (
    <NumberFieldSizeContext.Provider value={resolvedSize}>
      <NumberFieldVariantContext.Provider value={resolvedVariant}>
        <NumberFieldPrimitive.Group
          data-slot="number-field-group"
          data-variant={resolvedVariant}
          data-size={resolvedSize}
          className={cn(numberFieldGroupVariants({ variant, size }), className)}
          {...props}
        />
      </NumberFieldVariantContext.Provider>
    </NumberFieldSizeContext.Provider>
  );
}

export interface NumberFieldInputProps extends Omit<
  NumberFieldPrimitive.Input.Props,
  'size'
> {
  size?: NumberFieldSize;
}

function NumberFieldInput({
  className,
  size,
  ...props
}: Readonly<NumberFieldInputProps>) {
  const groupSize = React.useContext(NumberFieldSizeContext);
  const variant = React.useContext(NumberFieldVariantContext);
  const resolvedSize = size ?? groupSize;
  const isInline = variant === 'inline';
  const textStyles = isInline
    ? inputVariantStyles.inline.text
    : inputVariantStyles.default.text;
  const disabledTextStyles = isInline
    ? numberFieldControlDisabledTextStyles.inline
    : numberFieldControlDisabledTextStyles.default;

  return (
    <NumberFieldPrimitive.Input
      data-slot={controlSlot}
      className={cn(
        'h-full w-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-0! py-0! text-center font-normal shadow-none ring-0 transition-[color] outline-none',
        'selection:bg-fill-active selection:text-fg-primary-inverse',
        inputSizeStyles[resolvedSize],
        textStyles,
        disabledTextStyles,
        className,
      )}
      {...props}
    />
  );
}

function NumberFieldStepperIcon() {
  return (
    <IconShell size="sm" type="neutral" variant="secondary">
      <Icon icon="remove" />
    </IconShell>
  );
}

function NumberFieldStepperIconIncrement() {
  return (
    <IconShell size="sm" type="neutral" variant="secondary">
      <Icon icon="add" />
    </IconShell>
  );
}

export interface NumberFieldDecrementProps
  extends NumberFieldPrimitive.Decrement.Props {
  size?: NumberFieldSize;
}

function NumberFieldDecrement({
  className,
  size,
  children,
  ...props
}: Readonly<NumberFieldDecrementProps>) {
  const groupSize = React.useContext(NumberFieldSizeContext);
  const resolvedSize = size ?? groupSize;

  return (
    <NumberFieldPrimitive.Decrement
      data-slot="number-field-decrement"
      render={
        <Button
          variant="ghost"
          size="icon-xxs"
          aria-label="Decrease"
          className={cn(
            'paragraph-regular-primary shadow-none',
            stepperButtonClass[resolvedSize],
            className,
          )}
        />
      }
      {...props}>
      {children ?? <NumberFieldStepperIcon />}
    </NumberFieldPrimitive.Decrement>
  );
}

export interface NumberFieldIncrementProps
  extends NumberFieldPrimitive.Increment.Props {
  size?: NumberFieldSize;
}

function NumberFieldIncrement({
  className,
  size,
  children,
  ...props
}: Readonly<NumberFieldIncrementProps>) {
  const groupSize = React.useContext(NumberFieldSizeContext);
  const resolvedSize = size ?? groupSize;

  return (
    <NumberFieldPrimitive.Increment
      data-slot="number-field-increment"
      render={
        <Button
          variant="ghost"
          size="icon-xxs"
          aria-label="Increase"
          className={cn(
            'paragraph-regular-primary shadow-none',
            stepperButtonClass[resolvedSize],
            className,
          )}
        />
      }
      {...props}>
      {children ?? <NumberFieldStepperIconIncrement />}
    </NumberFieldPrimitive.Increment>
  );
}

export {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
  numberFieldGroupVariants,
};
