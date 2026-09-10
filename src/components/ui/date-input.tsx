'use client';

import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { inputVariantStyles } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type DateInputSize = 'sm' | 'default' | 'lg';
type DateInputVariant = 'default' | 'inline';
type DateInputMode = 'single' | 'range';

const defaultFocusStyles = [
  'has-[:focus-visible]:bg-stateslayer-overlay-active-inverse',
  'has-[:focus-visible]:ring-stroke-status-focus',
  'has-[:focus-visible]:shadow-elevation-0',
  'data-[open=true]:bg-stateslayer-overlay-active-inverse',
  'data-[open=true]:ring-stroke-status-focus',
  'data-[open=true]:shadow-elevation-0',
] as const;

const inlineFocusStyles = [
  'has-[:focus-visible]:border-b-stroke-status-focus',
  'has-[:focus-visible]:ring-0',
  'has-[:focus-visible]:shadow-elevation-0',
  'data-[open=true]:border-b-stroke-status-focus',
  'data-[open=true]:ring-0',
  'data-[open=true]:shadow-elevation-0',
] as const;

const defaultErrorStyles = [
  'aria-invalid:border aria-invalid:border-stroke-status-error',
  'aria-invalid:has-[:focus-visible]:ring-stroke-status-error',
  'aria-invalid:data-[open=true]:ring-stroke-status-error',
] as const;

const inlineErrorStyles = [
  'aria-invalid:border-b-stroke-status-error',
  'aria-invalid:has-[:focus-visible]:border-b-stroke-status-error',
  'aria-invalid:data-[open=true]:border-b-stroke-status-error',
] as const;

const focusRingWidth = {
  sm: 'has-[:focus-visible]:ring-[1px] data-[open=true]:ring-[1px]',
  default: 'has-[:focus-visible]:ring-[1px] data-[open=true]:ring-[1px]',
  lg: 'has-[:focus-visible]:ring-[2px] data-[open=true]:ring-[2px]',
} as const;

const inlineFocusBorderWidth = {
  sm: 'has-[:focus-visible]:border-b-[1px] data-[open=true]:border-b-[1px]',
  default:
    'has-[:focus-visible]:border-b-[1px] data-[open=true]:border-b-[1px]',
  lg: 'has-[:focus-visible]:border-b-[2px] data-[open=true]:border-b-[2px]',
} as const;

const dateInputRootVariants = cva(
  'inline-flex items-center border-0 cursor-text rounded-none outline-none text-fg-primary gap-1',
  {
    variants: {
      variant: {
        default: [
          inputVariantStyles.default.base,
          inputVariantStyles.default.hover,
          ...defaultFocusStyles,
          ...defaultErrorStyles,
          'data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed',
          'data-[disabled=true]:bg-stateslayer-overlay-disabled data-[disabled=true]:text-fg-disabled',
          'border-0',
        ],
        inline: [
          inputVariantStyles.inline.base,
          inputVariantStyles.inline.border,
          inputVariantStyles.inline.hover,
          ...inlineFocusStyles,
          ...inlineErrorStyles,
          'data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed',
          'data-[disabled=true]:text-fg-disabled',
          'justify-between pl-0! pr-0!',
        ],
      },
      size: {
        sm: 'h-7 pl-2 pr-1 py-1 paragraph-small-primary',
        default: 'h-9 pl-2 pr-1 py-2 paragraph-regular-primary',
        lg: 'h-12 pl-3 pr-2 py-3 paragraph-large-primary',
      },
    },
    compoundVariants: [
      { variant: 'default', size: 'sm', className: focusRingWidth.sm },
      {
        variant: 'default',
        size: 'default',
        className: focusRingWidth.default,
      },
      { variant: 'default', size: 'lg', className: focusRingWidth.lg },
      {
        variant: 'inline',
        size: 'sm',
        className: inlineFocusBorderWidth.sm,
      },
      {
        variant: 'inline',
        size: 'default',
        className: inlineFocusBorderWidth.default,
      },
      {
        variant: 'inline',
        size: 'lg',
        className: `${inlineFocusBorderWidth.lg} shadow-[0_1px_0_0_transparent] aria-invalid:has-[:focus-visible]:shadow-[0_1px_0_0_var(--color-stroke-status-error)] data-[open=true]:shadow-[0_1px_0_0_var(--color-stroke-status-focus)]`,
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface DateInputRootProps
  extends
    React.ComponentProps<'div'>,
    VariantProps<typeof dateInputRootVariants> {
  disabled?: boolean;
  open?: boolean;
}

const DateInputRoot = React.forwardRef<HTMLDivElement, DateInputRootProps>(
  (
    {
      className,
      variant,
      size,
      disabled,
      open,
      onClick,
      onPointerDown,
      children,
      ...props
    },
    ref,
  ) => {
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      const clickedInput = target.closest<HTMLInputElement>('input');

      if (clickedInput) {
        if (e.currentTarget.dataset.open === 'true') {
          e.nativeEvent.stopImmediatePropagation();
        } else {
          onPointerDown?.(e);
        }

        clickedInput.focus();
        return;
      }

      onPointerDown?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);

      if (e.defaultPrevented) return;

      const target = e.target as HTMLElement;

      if (target.closest('input') || target.closest('button')) {
        return;
      }

      const root = e.currentTarget;
      const empty = root.querySelector<HTMLInputElement>(
        '[data-slot="date-segment"][data-empty]',
      );
      const first = root.querySelector<HTMLInputElement>(
        '[data-slot="date-segment"]',
      );

      (empty ?? first)?.focus();
    };

    return (
      <div
        {...props}
        ref={ref}
        role="group"
        data-slot="date-input-root"
        data-disabled={disabled || undefined}
        data-open={open || undefined}
        className={cn(dateInputRootVariants({ variant, size }), className)}
        onPointerDown={handlePointerDown}
        onClick={handleClick}>
        {children}
      </div>
    );
  },
);

DateInputRoot.displayName = 'DateInputRoot';

export interface DateSegmentInputProps extends Omit<
  React.ComponentProps<'input'>,
  'value' | 'onChange' | 'min' | 'max' | 'type' | 'size'
> {
  value?: number | null;
  onChange?: (value: number | null) => void;
  onComplete?: () => void;
  onNavigateLeft?: () => void;
  onNavigateRight?: () => void;
  min?: number;
  max?: number;
  pad?: number;
}

const DateSegmentInput = React.forwardRef<
  HTMLInputElement,
  DateSegmentInputProps
>(
  (
    {
      value,
      onChange,
      onComplete,
      onNavigateLeft,
      onNavigateRight,
      min = 0,
      max = 99,
      pad = 2,
      placeholder,
      disabled,
      className,
      onFocus,
      onBlur,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const bufferRef = React.useRef('');

    const displayValue =
      value === null || value === undefined
        ? ''
        : String(value).padStart(pad, '0');

    const clamp = (v: number) => Math.min(max, Math.max(min, v));

    const handleDigitEntry = (key: string) => {
      bufferRef.current += key;

      if (bufferRef.current.length < pad) {
        const partial = Number.parseInt(bufferRef.current, 10);
        onChange?.(clamp(partial));

        const nextMin = partial * Math.pow(10, pad - bufferRef.current.length);

        if (nextMin > max) {
          bufferRef.current = '';
          onComplete?.();
        }

        return;
      }

      const val = Number.parseInt(bufferRef.current, 10);
      onChange?.(clamp(val));
      bufferRef.current = '';
      onComplete?.();
    };

    const incrementValue = () => {
      if (value === null || value === undefined) return onChange?.(min);

      onChange?.(value + 1 > max ? min : value + 1);
    };

    const decrementValue = () => {
      if (value === null || value === undefined) return onChange?.(max);

      onChange?.(value - 1 < min ? max : value - 1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);

      if (e.defaultPrevented) return;

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleDigitEntry(e.key);
        return;
      }

      const input = e.currentTarget;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          incrementValue();
          break;

        case 'ArrowDown':
          e.preventDefault();
          decrementValue();
          break;

        case 'ArrowLeft':
          if (input.selectionStart === 0) {
            e.preventDefault();
            onNavigateLeft?.();
          }
          break;

        case 'ArrowRight': {
          const len = input.value.length;

          if (input.selectionEnd === len || len === 0) {
            e.preventDefault();
            onNavigateRight?.();
          }
          break;
        }

        case 'Backspace':
        case 'Delete':
          e.preventDefault();
          onChange?.(null);
          bufferRef.current = '';
          break;
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      bufferRef.current = '';
      requestAnimationFrame(() => e.target.select());
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      bufferRef.current = '';
      onBlur?.(e);
    };

    return (
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        maxLength={pad}
        data-slot="date-segment"
        data-empty={value === null || value === undefined ? '' : undefined}
        value={displayValue}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        className={cn(
          'bg-transparent text-center text-inherit outline-none',
          pad === 4 ? 'w-[4ch]' : 'w-[2ch]',
          'placeholder:text-fg-tertiary focus:placeholder:text-fg-primary',
          'disabled:text-fg-disabled disabled:placeholder:text-fg-disabled',
          'selection:bg-fill-active selection:text-fg-primary-inverse',
          className,
        )}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPaste={e => e.preventDefault()}
        onChange={() => {}}
        {...props}
      />
    );
  },
);

DateSegmentInput.displayName = 'DateSegmentInput';

export type DateSeparatorProps = React.ComponentProps<'span'>;

function DateSeparator({
  className,
  children = '/',
  ...props
}: Readonly<DateSeparatorProps>) {
  return (
    <span
      data-slot="date-separator"
      className={cn('inline-block text-inherit select-none', className)}
      aria-hidden="true"
      {...props}>
      {children}
    </span>
  );
}

DateSeparator.displayName = 'DateSeparator';

function DateRangeSeparator({
  className,
  size = 'default',
  ...props
}: Readonly<React.ComponentProps<'span'> & { size?: DateInputSize }>) {
  const iconSize = size === 'lg' ? 'default' : 'sm';

  return (
    <span
      data-slot="date-range-separator"
      className={cn(
        'text-fg-tertiary inline-flex shrink-0 items-center justify-center',
        className,
      )}
      aria-hidden="true"
      {...props}>
      <IconShell size={iconSize} type="neutral">
        <Icon icon="arrow_forward" />
      </IconShell>
    </span>
  );
}

DateRangeSeparator.displayName = 'DateRangeSeparator';

const triggerSizeMap = {
  sm: 'size-5',
  default: 'size-5',
  lg: 'size-7',
} as const;

const triggerIconSizeMap = {
  sm: 'sm',
  default: 'sm',
  lg: 'default',
} as const;

export interface DateInputTriggerProps extends Omit<
  React.ComponentProps<'button'>,
  'size'
> {
  size?: DateInputSize;
}

function DateInputTrigger({
  size = 'default',
  disabled,
  className,
  children,
  'aria-label': ariaLabel,
  ...props
}: Readonly<DateInputTriggerProps>) {
  return (
    <button
      type="button"
      data-slot="date-input-trigger"
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel ?? (children ? undefined : 'Choose date')}
      className={cn(
        'inline-flex shrink-0 items-center justify-center',
        'cursor-pointer rounded-none border-0 bg-transparent p-0 outline-none',
        'text-fill-content-active',
        'disabled:text-fg-disabled disabled:cursor-not-allowed',
        triggerSizeMap[size],
        className,
      )}
      {...props}>
      {children ?? (
        <IconShell
          size={triggerIconSizeMap[size]}
          type="neutral"
          disabled={disabled}
          hoverable>
          <Icon icon="calendar_today" />
        </IconShell>
      )}
    </button>
  );
}

DateInputTrigger.displayName = 'DateInputTrigger';

type DateParts = {
  day?: number | null;
  month?: number | null;
  year?: number | null;
  onDayChange?: (value: number | null) => void;
  onMonthChange?: (value: number | null) => void;
  onYearChange?: (value: number | null) => void;
};

type DateInputProps = Omit<React.ComponentProps<'div'>, 'onChange'> & {
  variant?: DateInputVariant;
  size?: DateInputSize;
  mode?: DateInputMode;
  open?: boolean;
  disabled?: boolean;
  onTriggerClick?: () => void;
  placeholderDay?: string;
  placeholderMonth?: string;
  placeholderYear?: string;
  day?: number | null;
  month?: number | null;
  year?: number | null;
  onDayChange?: (value: number | null) => void;
  onMonthChange?: (value: number | null) => void;
  onYearChange?: (value: number | null) => void;
  endDay?: number | null;
  endMonth?: number | null;
  endYear?: number | null;
  onEndDayChange?: (value: number | null) => void;
  onEndMonthChange?: (value: number | null) => void;
  onEndYearChange?: (value: number | null) => void;
  name?: string;
  required?: boolean;
  id?: string;
  autoFocus?: boolean;
};

function DatePartsGroup({
  size,
  disabled,
  name,
  required,
  id,
  placeholderDay = 'dd',
  placeholderMonth = 'mm',
  placeholderYear = 'yyyy',
  day,
  month,
  year,
  onDayChange,
  onMonthChange,
  onYearChange,
  autoFocus,
}: DateParts & {
  size: DateInputSize;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  id?: string;
  placeholderDay?: string;
  placeholderMonth?: string;
  placeholderYear?: string;
  autoFocus?: boolean;
}) {
  const dayRef = React.useRef<HTMLInputElement>(null);
  const monthRef = React.useRef<HTMLInputElement>(null);
  const yearRef = React.useRef<HTMLInputElement>(null);
  const sep = size === 'lg' ? 'w-1.5' : 'w-1';

  return (
    <div className="inline-flex items-center">
      <DateSegmentInput
        ref={dayRef}
        value={day}
        onChange={onDayChange}
        min={1}
        max={31}
        pad={2}
        placeholder={placeholderDay}
        disabled={disabled}
        onComplete={() => monthRef.current?.focus()}
        onNavigateRight={() => monthRef.current?.focus()}
        id={id}
        name={name ? `${name}-day` : undefined}
        required={required}
        autoFocus={autoFocus}
      />
      <DateSeparator className={sep} />
      <DateSegmentInput
        ref={monthRef}
        value={month}
        onChange={onMonthChange}
        min={1}
        max={12}
        pad={2}
        placeholder={placeholderMonth}
        disabled={disabled}
        onComplete={() => yearRef.current?.focus()}
        onNavigateLeft={() => dayRef.current?.focus()}
        onNavigateRight={() => yearRef.current?.focus()}
        name={name ? `${name}-month` : undefined}
        required={required}
      />
      <DateSeparator className={sep} />
      <DateSegmentInput
        ref={yearRef}
        value={year}
        onChange={onYearChange}
        min={1900}
        max={2100}
        pad={4}
        placeholder={placeholderYear}
        disabled={disabled}
        onNavigateLeft={() => monthRef.current?.focus()}
        name={name ? `${name}-year` : undefined}
        required={required}
      />
    </div>
  );
}

const DateInput = React.forwardRef<HTMLDivElement, DateInputProps>(
  (
    {
      variant,
      size = 'default',
      mode = 'single',
      open,
      disabled,
      onTriggerClick,
      placeholderDay,
      placeholderMonth,
      placeholderYear,
      day,
      month,
      year,
      onDayChange,
      onMonthChange,
      onYearChange,
      endDay,
      endMonth,
      endYear,
      onEndDayChange,
      onEndMonthChange,
      onEndYearChange,
      name,
      required,
      id,
      autoFocus,
      ...divProps
    },
    ref,
  ) => {
    return (
      <DateInputRoot
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled}
        open={open}
        {...divProps}>
        <DatePartsGroup
          size={size}
          disabled={disabled}
          name={name}
          required={required}
          id={id}
          autoFocus={autoFocus}
          placeholderDay={placeholderDay}
          placeholderMonth={placeholderMonth}
          placeholderYear={placeholderYear}
          day={day}
          month={month}
          year={year}
          onDayChange={onDayChange}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
        />

        {mode === 'range' ? (
          <>
            <DateRangeSeparator size={size} />
            <DatePartsGroup
              size={size}
              disabled={disabled}
              name={name ? `${name}-end` : undefined}
              required={required}
              placeholderDay={placeholderDay}
              placeholderMonth={placeholderMonth}
              placeholderYear={placeholderYear}
              day={endDay}
              month={endMonth}
              year={endYear}
              onDayChange={onEndDayChange}
              onMonthChange={onEndMonthChange}
              onYearChange={onEndYearChange}
            />
          </>
        ) : null}

        <DateInputTrigger
          size={size}
          disabled={disabled}
          onClick={onTriggerClick}
        />
      </DateInputRoot>
    );
  },
);

DateInput.displayName = 'DateInput';

export {
  DateInputRoot,
  DateSegmentInput,
  DateSeparator,
  DateRangeSeparator,
  DateInputTrigger,
  DateInput,
  dateInputRootVariants,
};

export type { DateInputSize, DateInputVariant, DateInputMode, DateInputProps };
