'use client';

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

function useDatePicker() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [value, setValue] = React.useState('');
  const [month, setMonth] = React.useState<Date | undefined>(undefined);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const anchorRef = React.useRef<HTMLDivElement>(null);

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
  const {
    open,
    setOpen,
    date,
    value,
    month,
    setMonth,
    triggerRef,
    anchorRef,
    handleInputChange,
    handleCalendarSelect,
  } = useDatePicker();

  return (
    <Field className="w-fit gap-2">
      <FieldLabel htmlFor="date-input" className="label-regular-primary">
        Select Date
      </FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <DateInput
          ref={anchorRef}
          triggerRef={triggerRef}
          id="date-input"
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
          finalFocus={triggerRef}>
          <Calendar
            key={open ? 'open' : 'closed'}
            autoFocus={open}
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
  const {
    open,
    setOpen,
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

  return (
    <Field className="w-fit gap-2">
      <FieldLabel htmlFor="date-range-start" className="label-regular-primary">
        Date Range
      </FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <DateInput
          ref={anchorRef}
          triggerRef={triggerRef}
          id="date-range-start"
          mode="range"
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
          finalFocus={triggerRef}>
          <Calendar
            key={open ? 'open' : 'closed'}
            autoFocus={open}
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

export function DatePickerDisabled() {
  return (
    <Field className="w-fit gap-2">
      <FieldLabel
        htmlFor="date-input-disabled"
        className="label-regular-primary">
        Select Date
      </FieldLabel>

      <DateInput id="date-input-disabled" disabled value="" />

      <FieldDescription>Helper text</FieldDescription>
    </Field>
  );
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
    <Field className="w-fit gap-2">
      <FieldLabel htmlFor={id} className={labelClass}>
        {label}
      </FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
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
          finalFocus={triggerRef}>
          <Calendar
            key={open ? 'open' : 'closed'}
            autoFocus={open}
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
  );
}

export function DatePickerInlineSizes() {
  return (
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
  );
}

function DatePickerValidationItem({
  id,
  label,
  message,
  messageClass,
  borderClass,
  isError,
}: Readonly<{
  id: string;
  label: string;
  message: string;
  messageClass: string;
  borderClass: string;
  isError: boolean;
}>) {
  const {
    open,
    setOpen,
    date,
    value,
    month,
    setMonth,
    triggerRef,
    anchorRef,
    handleInputChange,
    handleCalendarSelect,
  } = useDatePicker();

  return (
    <Field className="w-fit gap-2">
      <FieldLabel htmlFor={`date-${id}`} className="label-regular-primary">
        {label}
      </FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <DateInput
          ref={anchorRef}
          triggerRef={triggerRef}
          id={`date-${id}`}
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
          finalFocus={triggerRef}>
          <Calendar
            key={open ? 'open' : 'closed'}
            autoFocus={open}
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

export function DatePickerValidation() {
  return (
    <div className="flex flex-col gap-6">
      <DatePickerValidationItem
        id="error"
        label="Error"
        message="Feedback message here"
        messageClass="text-status-error"
        borderClass=""
        isError
      />
      <DatePickerValidationItem
        id="warning"
        label="Warning"
        message="Feedback message here"
        messageClass="text-status-warning"
        borderClass="border-stroke-status-warning"
        isError={false}
      />
      <DatePickerValidationItem
        id="success"
        label="Success"
        message="Feedback message here"
        messageClass="text-status-success"
        borderClass="border-stroke-status-success"
        isError={false}
      />
    </div>
  );
}

export function DatePickerRangeInline() {
  const {
    open,
    setOpen,
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

  return (
    <Field className="w-fit gap-2">
      <FieldLabel
        htmlFor="date-range-inline-start"
        className="label-regular-primary mb-[-4px]">
        Date Range
      </FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <DateInput
          ref={anchorRef}
          triggerRef={triggerRef}
          id="date-range-inline-start"
          mode="range"
          variant="inline"
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
          finalFocus={triggerRef}>
          <Calendar
            key={open ? 'open' : 'closed'}
            autoFocus={open}
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

export const examples = [
  {
    name: 'DatePickerDemo',
    title: 'Single Date',
    description: 'DateInput with Popover and Calendar.',
  },
  {
    name: 'DatePickerRange',
    title: 'Date Range',
    description: 'Range DateInput with Calendar popup.',
  },
  {
    name: 'DatePickerSizes',
    title: 'Sizes',
    description: 'Date picker in small, default, and large sizes.',
  },
  {
    name: 'DatePickerInlineSizes',
    title: 'Inline Sizes',
    description: 'Inline date picker in small, default, and large sizes.',
  },
  {
    name: 'DatePickerRangeInline',
    title: 'Range Inline',
    description: 'Date range picker with inline variant.',
  },
  {
    name: 'DatePickerValidation',
    title: 'Validation',
    description: 'Date picker with error, warning, and success states.',
  },
  {
    name: 'DatePickerDisabled',
    title: 'Disabled',
    description: 'Date picker in a disabled state.',
  },
];

export const datePicker = {
  name: 'date-picker',
  components: {
    'Single Date': <DatePickerDemo />,
    'Date Range': <DatePickerRange />,
    Sizes: <DatePickerSizes />,
    'Inline Sizes': <DatePickerInlineSizes />,
    'Range Inline': <DatePickerRangeInline />,
    Validation: <DatePickerValidation />,
    Disabled: <DatePickerDisabled />,
  },
};
