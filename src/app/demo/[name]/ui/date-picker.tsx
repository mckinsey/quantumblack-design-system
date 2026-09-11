'use client';

import type { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import { format, isValid, parse } from 'date-fns';
import * as React from 'react';
import type {
  DateRange,
  DayEventHandler,
  OnSelectHandler,
} from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import { DateInput } from '@/components/ui/date-input';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

function createDatePopoverOpenChange(
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  anchorRef: React.RefObject<HTMLDivElement | null>,
) {
  return (next: boolean, details: PopoverPrimitive.Root.ChangeEventDetails) => {
    if (!next && details.reason === 'outside-press') {
      const path =
        typeof details.event.composedPath === 'function'
          ? details.event.composedPath()
          : [];

      if (
        (anchorRef.current && path.includes(anchorRef.current)) ||
        anchorRef.current?.contains(details.event.target as Node)
      ) {
        details.cancel();
        return;
      }
    }

    setOpen(next);
  };
}

function useDatePicker() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [value, setValue] = React.useState('');
  const [month, setMonth] = React.useState<Date | undefined>(undefined);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const handleOpenChange = createDatePopoverOpenChange(setOpen, anchorRef);

  React.useEffect(() => {
    setValue(date ? format(date, 'yyyy-MM-dd') : '');

    if (date) {
      setMonth(date);
    }
  }, [date]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValue(text);

    if (!text) {
      setDate(undefined);
      return;
    }

    const parsed = parse(text, 'yyyy-MM-dd', new Date());

    if (isValid(parsed)) {
      setDate(parsed);
      setMonth(parsed);
    } else {
      setDate(undefined);
    }
  };

  const handleCalendarSelect = (selected?: Date) => {
    setDate(selected);
    setOpen(false);
  };

  return {
    open,
    setOpen,
    handleOpenChange,
    date,
    value,
    month,
    setMonth,
    triggerRef,
    anchorRef,
    handleInputChange,
    handleCalendarSelect,
  };
}

function useDateRangePicker() {
  const [open, setOpen] = React.useState(false);
  const [range, setRange] = React.useState<DateRange | undefined>(undefined);
  const [startValue, setStartValue] = React.useState('');
  const [endValue, setEndValue] = React.useState('');
  const [month, setMonth] = React.useState<Date | undefined>(undefined);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const handleOpenChange = createDatePopoverOpenChange(setOpen, anchorRef);

  React.useEffect(() => {
    setStartValue(range?.from ? format(range.from, 'yyyy-MM-dd') : '');
    setEndValue(range?.to ? format(range.to, 'yyyy-MM-dd') : '');

    if (range?.from) {
      setMonth(range.from);
    } else if (range?.to) {
      setMonth(range.to);
    }
  }, [range]);

  const updateField = (
    prev: DateRange | undefined,
    field: 'from' | 'to',
    next: Date | undefined,
  ): DateRange | undefined => ({
    from: field === 'from' ? next : prev?.from,
    to: field === 'to' ? next : prev?.to,
  });

  const createHandler = (
    field: 'from' | 'to',
    setFieldValue: (value: string) => void,
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setFieldValue(text);

      if (!text) {
        setRange(prev => updateField(prev, field, undefined));
        return;
      }

      const parsed = parse(text, 'yyyy-MM-dd', new Date());

      if (isValid(parsed)) {
        setRange(prev => updateField(prev, field, parsed));
        setMonth(parsed);
      } else {
        setRange(prev => updateField(prev, field, undefined));
      }
    };
  };

  const handleStartChange = createHandler('from', setStartValue);
  const handleEndChange = createHandler('to', setEndValue);

  const handleSelect: OnSelectHandler<DateRange | undefined> = selected => {
    if (range?.from && !range.to) {
      setRange(selected);
      setOpen(false);
    }
  };

  const handleDayClick: DayEventHandler<React.MouseEvent> = day => {
    if (range?.from && !range.to) return;

    setRange({ from: day });
  };

  return {
    open,
    setOpen,
    handleOpenChange,
    startValue,
    endValue,
    month,
    setMonth,
    range,
    triggerRef,
    anchorRef,
    handleStartChange,
    handleEndChange,
    handleSelect,
    handleDayClick,
  };
}

export function DatePickerDemo() {
  return <DatePickerSingleField />;
}

function DatePickerSingleField({
  variant = 'default',
}: Readonly<{ variant?: 'default' | 'inline' }>) {
  const {
    open,
    setOpen,
    handleOpenChange,
    date,
    value,
    month,
    setMonth,
    triggerRef,
    anchorRef,
    handleInputChange,
    handleCalendarSelect,
  } = useDatePicker();

  const isInline = variant === 'inline';
  const id = isInline ? 'date-input-inline' : 'date-input';

  return (
    <Field className={cn(isInline ? 'w-[140px]' : 'w-[196px]', 'gap-2')}>
      <FieldLabel
        htmlFor={id}
        className={cn('label-regular-primary', isInline && 'mb-[-4px]')}>
        Select Date
      </FieldLabel>

      <Popover open={open} onOpenChange={handleOpenChange}>
        <DateInput
          ref={anchorRef}
          triggerRef={triggerRef}
          id={id}
          variant={variant}
          open={open}
          value={value}
          onChange={handleInputChange}
          onTriggerClick={() => setOpen(v => !v)}
        />
        <PopoverContent
          anchor={anchorRef}
          className="w-auto overflow-hidden border-none p-0"
          align="start"
          sideOffset={4}
          initialFocus={false}
          finalFocus={false}>
          <Calendar
            key={open ? 'open' : 'closed'}
            autoFocus={false}
            mode="single"
            selected={date}
            month={month}
            onMonthChange={setMonth}
            onSelect={handleCalendarSelect}
          />
        </PopoverContent>
      </Popover>

      <FieldDescription>Helper text</FieldDescription>
    </Field>
  );
}

export function DatePickerRange() {
  return (
    <div className="flex flex-col gap-6">
      <DatePickerRangeField />
      <DatePickerRangeField variant="inline" />
    </div>
  );
}

function DatePickerRangeField({
  variant = 'default',
}: Readonly<{ variant?: 'default' | 'inline' }>) {
  const {
    open,
    setOpen,
    handleOpenChange,
    startValue,
    endValue,
    month,
    setMonth,
    range,
    triggerRef,
    anchorRef,
    handleStartChange,
    handleEndChange,
    handleSelect,
    handleDayClick,
  } = useDateRangePicker();

  const isInline = variant === 'inline';
  const id = isInline ? 'date-range-inline-start' : 'date-range-start';

  return (
    <Field className={cn(isInline ? 'w-[220px]' : 'w-[240px]', 'gap-2')}>
      <FieldLabel
        htmlFor={id}
        className={cn('label-regular-primary', isInline && 'mb-[-4px]')}>
        Date Range
      </FieldLabel>

      <Popover open={open} onOpenChange={handleOpenChange}>
        <DateInput
          ref={anchorRef}
          triggerRef={triggerRef}
          id={id}
          mode="range"
          variant={variant}
          open={open}
          value={startValue}
          endValue={endValue}
          onChange={handleStartChange}
          onEndChange={handleEndChange}
          onTriggerClick={() => setOpen(v => !v)}
        />
        <PopoverContent
          anchor={anchorRef}
          className="w-auto overflow-hidden border-none p-0"
          align="start"
          sideOffset={4}
          initialFocus={false}
          finalFocus={false}>
          <Calendar
            key={open ? 'open' : 'closed'}
            autoFocus={false}
            mode="range"
            numberOfMonths={2}
            selected={range}
            month={month}
            onMonthChange={setMonth}
            onSelect={handleSelect}
            onDayClick={handleDayClick}
          />
        </PopoverContent>
      </Popover>

      <FieldDescription>Helper text</FieldDescription>
    </Field>
  );
}

function DatePickerDisabledField({
  variant = 'default',
}: Readonly<{ variant?: 'default' | 'inline' }>) {
  const isInline = variant === 'inline';
  const id = isInline ? 'date-input-disabled-inline' : 'date-input-disabled';

  return (
    <Field className={cn(isInline ? 'w-[140px]' : 'w-[196px]', 'gap-2')}>
      <FieldLabel
        htmlFor={id}
        className={cn('label-regular-primary', isInline && 'mb-[-4px]')}>
        Select Date
      </FieldLabel>

      <DateInput id={id} variant={variant} disabled value="2025-04-16" />

      <FieldDescription>Helper text</FieldDescription>
    </Field>
  );
}

export function DatePickerDisabled() {
  return <DatePickerDisabledField />;
}

function DatePickerSized({
  size,
  variant = 'default',
  label,
  labelClass,
  descriptionClass,
}: Readonly<{
  size: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'inline';
  label: string;
  labelClass: string;
  descriptionClass?: string;
}>) {
  const {
    open,
    setOpen,
    handleOpenChange,
    date,
    value,
    month,
    setMonth,
    triggerRef,
    anchorRef,
    handleInputChange,
    handleCalendarSelect,
  } = useDatePicker();
  const id = `date-size-${variant}-${size}`;

  return (
    <Field
      className={cn(variant === 'inline' ? 'w-[140px]' : 'w-[196px]', 'gap-2')}>
      <FieldLabel htmlFor={id} className={labelClass}>
        {label}
      </FieldLabel>

      <Popover open={open} onOpenChange={handleOpenChange}>
        <DateInput
          ref={anchorRef}
          triggerRef={triggerRef}
          id={id}
          size={size}
          variant={variant}
          open={open}
          value={value}
          onChange={handleInputChange}
          onTriggerClick={() => setOpen(v => !v)}
        />
        <PopoverContent
          anchor={anchorRef}
          className="w-auto overflow-hidden border-none p-0"
          align="start"
          sideOffset={4}
          initialFocus={false}
          finalFocus={false}>
          <Calendar
            key={open ? 'open' : 'closed'}
            autoFocus={false}
            mode="single"
            size={size === 'lg' ? 'lg' : 'default'}
            selected={date}
            month={month}
            onMonthChange={setMonth}
            onSelect={handleCalendarSelect}
          />
        </PopoverContent>
      </Popover>

      <FieldDescription className={descriptionClass}>
        Helper text
      </FieldDescription>
    </Field>
  );
}

export function DatePickerSizes() {
  return (
    <div className="flex flex-wrap items-start gap-10">
      <div className="flex flex-col gap-6">
        <DatePickerSized
          size="sm"
          label="Small"
          labelClass="label-small-primary"
          descriptionClass="paragraph-small-primary"
        />
        <DatePickerSized
          size="default"
          label="Default"
          labelClass="label-regular-primary"
        />
        <DatePickerSized
          size="lg"
          label="Large"
          labelClass="label-large-primary"
        />
      </div>

      <div className="flex flex-col gap-6">
        <DatePickerSized
          variant="inline"
          size="sm"
          label="Small"
          labelClass="label-small-primary"
          descriptionClass="paragraph-small-primary"
        />
        <DatePickerSized
          variant="inline"
          size="default"
          label="Default"
          labelClass="label-regular-primary mb-[-4px]"
        />
        <DatePickerSized
          variant="inline"
          size="lg"
          label="Large"
          labelClass="label-large-primary mb-[-4px]"
        />
      </div>
    </div>
  );
}

function DatePickerValidationItem({
  id,
  label,
  message,
  messageClass,
  borderClass,
  isError,
  variant = 'default',
}: Readonly<{
  id: string;
  label: string;
  message: string;
  messageClass: string;
  borderClass: string;
  isError: boolean;
  variant?: 'default' | 'inline';
}>) {
  const {
    open,
    setOpen,
    handleOpenChange,
    date,
    value,
    month,
    setMonth,
    triggerRef,
    anchorRef,
    handleInputChange,
    handleCalendarSelect,
  } = useDatePicker();

  const isInline = variant === 'inline';

  return (
    <Field className={cn(isInline ? 'w-[140px]' : 'w-[196px]', 'gap-2')}>
      <FieldLabel
        htmlFor={`date-${id}`}
        className={cn('label-regular-primary')}>
        {label}
      </FieldLabel>

      <Popover open={open} onOpenChange={handleOpenChange}>
        <DateInput
          ref={anchorRef}
          triggerRef={triggerRef}
          id={`date-${id}`}
          variant={variant}
          open={open}
          value={value}
          onChange={handleInputChange}
          onTriggerClick={() => setOpen(v => !v)}
          aria-invalid={isError || undefined}
          className={cn(borderClass || undefined)}
        />
        <PopoverContent
          anchor={anchorRef}
          className="w-auto overflow-hidden border-none p-0"
          align="start"
          sideOffset={4}
          initialFocus={false}
          finalFocus={false}>
          <Calendar
            key={open ? 'open' : 'closed'}
            autoFocus={false}
            mode="single"
            selected={date}
            month={month}
            onMonthChange={setMonth}
            onSelect={handleCalendarSelect}
          />
        </PopoverContent>
      </Popover>

      <FieldDescription className={messageClass}>{message}</FieldDescription>
    </Field>
  );
}

const validationStates = [
  {
    key: 'error',
    label: 'Error',
    message: 'Feedback',
    messageClass: 'text-status-error',
    borderClass: '',
    isError: true,
  },
  {
    key: 'warning',
    label: 'Warning',
    message: 'Feedback',
    messageClass: 'text-status-warning',
    borderClass: 'border-stroke-status-warning',
    isError: false,
  },
  {
    key: 'success',
    label: 'Success',
    message: 'Feedback',
    messageClass: 'text-status-success',
    borderClass: 'border-stroke-status-success',
    isError: false,
  },
] as const;

export function DatePickerValidation() {
  return (
    <div className="flex flex-wrap items-start gap-10">
      <div className="flex flex-col gap-6">
        {validationStates.map(state => (
          <DatePickerValidationItem
            key={state.key}
            id={state.key}
            label={state.label}
            message={state.message}
            messageClass={state.messageClass}
            borderClass={state.borderClass}
            isError={state.isError}
          />
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {validationStates.map(state => (
          <DatePickerValidationItem
            key={`inline-${state.key}`}
            id={`inline-${state.key}`}
            variant="inline"
            label={state.label}
            message={state.message}
            messageClass={state.messageClass}
            borderClass={state.borderClass}
            isError={state.isError}
          />
        ))}
      </div>
    </div>
  );
}

export const examples = [
  {
    name: 'DatePickerDemo',
    title: 'Single Date',
    description: 'Default single date with Popover and Calendar.',
  },
  {
    name: 'DatePickerRange',
    title: 'Date Range',
    description: 'Default and inline range pickers stacked.',
  },
  {
    name: 'DatePickerSizes',
    title: 'Sizes',
    description: 'Default and inline sizes side by side.',
  },
  {
    name: 'DatePickerValidation',
    title: 'Validation',
    description: 'Default and inline error, warning, and success states.',
  },
  {
    name: 'DatePickerDisabled',
    title: 'Disabled',
    description: 'Disabled date picker.',
  },
];

export const datePicker = {
  name: 'date-picker',
  components: {
    'Single Date': <DatePickerDemo />,
    'Date Range': <DatePickerRange />,
    Sizes: <DatePickerSizes />,
    Validation: <DatePickerValidation />,
    Disabled: <DatePickerDisabled />,
  },
};
