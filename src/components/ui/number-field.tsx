'use client';

import { NumberField as NumberFieldPrimitive } from '@base-ui/react/number-field';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
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
} from '@/components/ui/input';
import { cn } from '@/lib/utils';

type NumberFieldSize = 'sm' | 'default' | 'lg';
type NumberFieldVariant = 'default' | 'inline';

const controlSlot = 'input-group-control';

const NumberFieldSizeContext = React.createContext<NumberFieldSize>('default');
const NumberFieldVariantContext =
  React.createContext<NumberFieldVariant>('default');
const NumberFieldDisabledContext = React.createContext<boolean>(false);

const numberFieldControlDisabledTextStyles = {
  default:
    'disabled:cursor-not-allowed disabled:text-fg-disabled disabled:placeholder:text-fg-disabled',
  inline:
    'disabled:cursor-not-allowed disabled:text-fg-disabled disabled:placeholder:text-fg-disabled',
} as const;

const stepperButtonClass = {
  sm: 'size-4 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
  default: 'size-4 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
  lg: 'size-5 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
} as const;

const stepperButtonStyles = [
  'paragraph-regular-primary shadow-none',
  'focus-visible:ring-0 focus-visible:ring-offset-0',
  'group-has-[[data-slot=input-group-control]:disabled]/number-field:pointer-events-none',
  'group-has-[[data-slot=input-group-control]:disabled]/number-field:hover:bg-transparent',
  'group-has-[[data-slot=input-group-control]:disabled]/number-field:hover:text-fg-secondary',
  'group-has-[[data-slot=input-group-control]:disabled]/number-field:active:bg-transparent',
  'disabled:hover:bg-transparent disabled:pointer-events-none',
] as const;

const numberFieldGroupVariants = cva(
  'group/number-field relative flex min-w-0 items-center rounded-none border-0 transition-[background-color,background-image,box-shadow,border-color] outline-none',
  {
    variants: {
      variant: {
        default: [
          'w-[120px]',
          'gap-1',
          inputVariantStyles.default.base,
          inputVariantStyles.default.hover,
          ...inputGroupDefaultFocusStyles,
          ...inputGroupDefaultErrorStyles,
          'data-[invalid]:border-stroke-status-error',
          ...inputGroupDefaultDisabledStyles,
        ],
        inline: [
          'w-[96px]',
          'gap-1 px-0!',
          inputVariantStyles.inline.base,
          inputVariantStyles.inline.border,
          inputVariantStyles.inline.hover,
          'has-[[data-slot=input-group-control]:disabled]:cursor-not-allowed',
          'has-[[data-slot=input-group-control]:disabled]:hover:border-b-stroke-tertiary',
          ...inputGroupInlineFocusStyles,
          ...inputGroupInlineErrorStyles,
          'data-[invalid]:border-b-stroke-status-error',
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

function focusNumberFieldControl(group: HTMLElement | null) {
  group?.querySelector<HTMLElement>(`[data-slot="${controlSlot}"]`)?.focus();
}

function NumberField({
  className,
  disabled,
  ...props
}: NumberFieldPrimitive.Root.Props) {
  return (
    <NumberFieldDisabledContext.Provider value={disabled ?? false}>
      <NumberFieldPrimitive.Root
        data-slot="number-field"
        className={cn('w-fit', className)}
        disabled={disabled}
        {...props}
      />
    </NumberFieldDisabledContext.Provider>
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

function NumberFieldStepperIcon({ disabled }: { disabled?: boolean }) {
  return (
    <IconShell size="sm" type="neutral" variant="secondary" disabled={disabled}>
      <Icon icon="remove" />
    </IconShell>
  );
}

function NumberFieldStepperIconIncrement({ disabled }: { disabled?: boolean }) {
  return (
    <IconShell size="sm" type="neutral" variant="secondary" disabled={disabled}>
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
  onClick,
  ...props
}: Readonly<NumberFieldDecrementProps>) {
  const groupSize = React.useContext(NumberFieldSizeContext);
  const disabled = React.useContext(NumberFieldDisabledContext);
  const resolvedSize = size ?? groupSize;

  return (
    <NumberFieldPrimitive.Decrement
      data-slot="number-field-decrement"
      onClick={event => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          focusNumberFieldControl(
            event.currentTarget.closest('[data-slot="number-field-group"]'),
          );
        }
      }}
      render={
        <Button
          variant="ghost"
          size="icon-xxs"
          tabIndex={-1}
          aria-label="Decrease"
          className={cn(
            stepperButtonStyles,
            stepperButtonClass[resolvedSize],
            className,
          )}
        />
      }
      {...props}>
      {children ?? <NumberFieldStepperIcon disabled={disabled} />}
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
  onClick,
  ...props
}: Readonly<NumberFieldIncrementProps>) {
  const groupSize = React.useContext(NumberFieldSizeContext);
  const disabled = React.useContext(NumberFieldDisabledContext);
  const resolvedSize = size ?? groupSize;

  return (
    <NumberFieldPrimitive.Increment
      data-slot="number-field-increment"
      onClick={event => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          focusNumberFieldControl(
            event.currentTarget.closest('[data-slot="number-field-group"]'),
          );
        }
      }}
      render={
        <Button
          variant="ghost"
          size="icon-xxs"
          tabIndex={-1}
          aria-label="Increase"
          className={cn(
            stepperButtonStyles,
            stepperButtonClass[resolvedSize],
            className,
          )}
        />
      }
      {...props}>
      {children ?? <NumberFieldStepperIconIncrement disabled={disabled} />}
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
