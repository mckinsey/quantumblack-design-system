'use client';

import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { cn } from '@/lib/utils';

const dateInputVariants = cva('shrink-0 gap-1', {
  variants: {
    mode: {
      single: '',
      range: '',
    },
    variant: {
      default: '',
      inline: '',
    },
    size: {
      sm: '',
      default: '',
      lg: '',
    },
  },
  compoundVariants: [
    { mode: 'single', variant: 'inline', class: 'w-[140px] min-w-[140px]' },
    { mode: 'single', variant: 'default', class: 'w-[196px] min-w-[196px]' },
    {
      mode: 'range',
      variant: 'inline',
      size: ['sm', 'default'],
      class: 'w-[220px] min-w-[220px]',
    },
    {
      mode: 'range',
      variant: 'default',
      size: ['sm', 'default'],
      class: 'w-[240px] min-w-[240px]',
    },
    { mode: 'range', size: 'lg', class: 'w-[280px] min-w-[280px]' },
  ],
  defaultVariants: {
    mode: 'single',
    variant: 'default',
    size: 'default',
  },
});

type DateInputSize = NonNullable<
  VariantProps<typeof dateInputVariants>['size']
>;
type DateInputVariant = NonNullable<
  VariantProps<typeof dateInputVariants>['variant']
>;
type DateInputMode = NonNullable<
  VariantProps<typeof dateInputVariants>['mode']
>;

const dateSegmentFocusClassName = cn(
  '[&::-webkit-datetime-edit-day-field:focus]:bg-fill-active',
  '[&::-webkit-datetime-edit-day-field:focus]:text-fg-primary-inverse',
  '[&::-webkit-datetime-edit-day-field:focus]:rounded-none',
  '[&::-webkit-datetime-edit-day-field:focus]:outline-none',
  '[&::-webkit-datetime-edit-month-field:focus]:bg-fill-active',
  '[&::-webkit-datetime-edit-month-field:focus]:text-fg-primary-inverse',
  '[&::-webkit-datetime-edit-month-field:focus]:rounded-none',
  '[&::-webkit-datetime-edit-month-field:focus]:outline-none',
  '[&::-webkit-datetime-edit-year-field:focus]:bg-fill-active',
  '[&::-webkit-datetime-edit-year-field:focus]:text-fg-primary-inverse',
  '[&::-webkit-datetime-edit-year-field:focus]:rounded-none',
  '[&::-webkit-datetime-edit-year-field:focus]:outline-none',
);

const dateNativeInputClassName = cn(
  'w-auto min-w-0 cursor-pointer',
  '[&::-webkit-calendar-picker-indicator]:hidden',
  '[&::-webkit-calendar-picker-indicator]:appearance-none',
  'data-[empty=true]:text-fg-tertiary',
  'data-[empty=true]:focus:text-fg-primary',
  'data-[empty=false]:text-fg-primary',
  'disabled:cursor-not-allowed disabled:text-fg-disabled',
  'disabled:data-[empty=true]:text-fg-disabled',
  'disabled:data-[empty=false]:text-fg-disabled',
  dateSegmentFocusClassName,
);

function chooseDateLabel(
  mode: DateInputMode,
  value: string | undefined,
  endValue: string | undefined,
) {
  if (mode === 'range') {
    if (value && endValue) return `Change date, ${value} to ${endValue}`;
    if (value) return `Change date, ${value}`;
    return 'Choose date';
  }

  return value ? `Change date, ${value}` : 'Choose date';
}

type NativeDateInputProps = Omit<
  React.ComponentProps<'input'>,
  | keyof React.ComponentProps<'div'>
  | 'type'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'size'
  | 'checked'
  | 'defaultChecked'
>;

type DateInputProps = Omit<
  React.ComponentProps<'div'>,
  'onChange' | keyof NativeDateInputProps
> &
  NativeDateInputProps & {
    variant?: DateInputVariant;
    size?: DateInputSize;
    mode?: DateInputMode;
    open?: boolean;
    value?: string;
    endValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEndChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTriggerClick?: () => void;
    triggerRef?: React.Ref<HTMLButtonElement>;
  };

const DateInput = React.forwardRef<HTMLDivElement, DateInputProps>(
  (
    {
      variant = 'default',
      size = 'default',
      mode = 'single',
      open,
      disabled,
      value,
      endValue,
      onChange,
      onEndChange,
      onTriggerClick,
      triggerRef,
      id,
      name,
      min,
      max,
      required,
      autoFocus,
      readOnly,
      onBlur,
      onFocus,
      className,
      'aria-invalid': ariaInvalid,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const iconSize = size === 'lg' ? 'default' : 'sm';
    const btnSize = size === 'lg' ? 'icon-sm' : 'icon-xxs';

    const handleFieldClick = () => {
      if (disabled || readOnly || open) return;

      onTriggerClick?.();
    };

    return (
      <InputGroup
        ref={ref}
        variant={variant}
        size={size}
        data-slot="date-input"
        data-open={open || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          dateInputVariants({ mode, variant, size }),
          className,
        )}
        {...props}>
        <InputGroupInput
          id={id}
          name={name}
          type="date"
          variant={variant}
          size={size}
          value={value}
          onChange={onChange}
          disabled={disabled}
          min={min}
          max={max}
          required={required}
          autoFocus={autoFocus}
          readOnly={readOnly}
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={handleFieldClick}
          data-empty={value ? 'false' : 'true'}
          aria-invalid={ariaInvalid}
          aria-label={ariaLabel}
          className={dateNativeInputClassName}
        />

        {mode === 'range' ? (
          <>
            <InputGroupAddon className="order-none">
              <InputGroupText>
                <Icon
                  icon="arrow_forward"
                  size="sm"
                  className="text-[length:inherit]"
                />
              </InputGroupText>
            </InputGroupAddon>

            <InputGroupInput
              id={id ? `${id}-end` : undefined}
              name={name ? `${name}-end` : undefined}
              type="date"
              variant={variant}
              size={size}
              value={endValue}
              onChange={onEndChange}
              disabled={disabled}
              min={min}
              max={max}
              required={required}
              readOnly={readOnly}
              onBlur={onBlur}
              onFocus={onFocus}
              onClick={handleFieldClick}
              data-empty={endValue ? 'false' : 'true'}
              aria-invalid={ariaInvalid}
              aria-label="End date"
              className={dateNativeInputClassName}
            />
          </>
        ) : null}

        <InputGroupAddon
          align="inline-end"
          className="group-data-[disabled=true]/input-group:opacity-100">
          <InputGroupButton
            ref={triggerRef}
            type="button"
            size={btnSize}
            variant="ghost"
            disabled={disabled}
            aria-label={chooseDateLabel(mode, value, endValue)}
            aria-haspopup="dialog"
            aria-expanded={open ?? false}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onTriggerClick?.();
            }}>
            <IconShell
              size={iconSize}
              type="neutral"
              disabled={disabled}
              hoverable={!disabled}>
              <Icon icon="calendar_today" />
            </IconShell>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
  },
);

DateInput.displayName = 'DateInput';

export { DateInput, dateNativeInputClassName };

export type { DateInputSize, DateInputVariant, DateInputMode, DateInputProps };
