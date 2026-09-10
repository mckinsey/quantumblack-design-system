'use client';

import { isValid } from 'date-fns';
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

type Parts = {
  day: number | null;
  month: number | null;
  year: number | null;
};

const emptyParts = (): Parts => ({ day: null, month: null, year: null });

const toParts = (date?: Date): Parts => {
  if (!date || !isValid(date)) return emptyParts();

  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
};

const fromParts = (parts: Parts): Date | undefined => {
  const { day, month, year } = parts;

  if (day === null || month === null || year === null) return undefined;

  const date = new Date(year, month - 1, day);

  if (
    !isValid(date) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined;
  }

  return date;
};

function useDatePicker() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [parts, setParts] = React.useState<Parts>(emptyParts);
  const [month, setMonth] = React.useState<Date | undefined>(undefined);

  const patch = (next: Partial<Parts>) => {
    setParts(prev => {
      const merged = { ...prev, ...next };
      const parsed = fromParts(merged);
      setDate(parsed);

      if (parsed) setMonth(parsed);

      return merged;
    });
  };

  const handleCalendarSelect = (selected?: Date) => {
    setDate(selected);
    setParts(toParts(selected));

    if (selected) setMonth(selected);

    setOpen(false);
  };

  return {
    open,
    setOpen,
    date,
    parts,
    patch,
    month,
    setMonth,
    handleCalendarSelect,
  };
}

function useDateRangePicker() {
  const [open, setOpen] = React.useState(false);
  const [range, setRange] = React.useState<DateRange | undefined>(undefined);
  const [start, setStart] = React.useState<Parts>(emptyParts);
  const [end, setEnd] = React.useState<Parts>(emptyParts);
  const [month, setMonth] = React.useState<Date | undefined>(undefined);

  const syncRange = (nextStart: Parts, nextEnd: Parts) => {
    const from = fromParts(nextStart);
    const to = fromParts(nextEnd);
    setRange(from || to ? { from, to } : undefined);

    if (from) setMonth(from);
    else if (to) setMonth(to);
  };

  const patchStart = (next: Partial<Parts>) => {
    setStart(prev => {
      const merged = { ...prev, ...next };
      syncRange(merged, end);
      return merged;
    });
  };

  const patchEnd = (next: Partial<Parts>) => {
    setEnd(prev => {
      const merged = { ...prev, ...next };
      syncRange(start, merged);
      return merged;
    });
  };

  const handleSelect: OnSelectHandler<DateRange | undefined> = selected => {
    if (range?.from && !range.to) {
      setRange(selected);
      setStart(toParts(selected?.from));
      setEnd(toParts(selected?.to));
    }
  };

  const handleDayClick: DayEventHandler<React.MouseEvent> = day => {
    if (range?.from && !range.to) return;

    setRange({ from: day });
    setStart(toParts(day));
    setEnd(emptyParts());
  };

  return {
    open,
    setOpen,
    start,
    end,
    patchStart,
    patchEnd,
    month,
    setMonth,
    range,
    handleSelect,
    handleDayClick,
  };
}

export function DatePickerDemo() {
  const {
    open,
    setOpen,
    date,
    parts,
    patch,
    month,
    setMonth,
    handleCalendarSelect,
  } = useDatePicker();
  const anchorRef = React.useRef<HTMLDivElement>(null);

  return (
    <Field className="w-fit gap-2">
      <FieldLabel className="label-regular-primary">Select Date</FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <DateInput
          ref={anchorRef}
          open={open}
          day={parts.day}
          month={parts.month}
          year={parts.year}
          onDayChange={day => patch({ day })}
          onMonthChange={m => patch({ month: m })}
          onYearChange={year => patch({ year })}
          onTriggerClick={() => setOpen(v => !v)}
          className="w-fit"
        />
        <PopoverContent
          anchor={anchorRef}
          className="w-auto overflow-hidden border-none p-0"
          align="start"
          sideOffset={4}
          initialFocus={false}>
          <Calendar
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
    start,
    end,
    patchStart,
    patchEnd,
    month,
    setMonth,
    range,
    handleSelect,
    handleDayClick,
  } = useDateRangePicker();
  const anchorRef = React.useRef<HTMLDivElement>(null);

  return (
    <Field className="w-fit gap-2">
      <FieldLabel className="label-regular-primary">Date Range</FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <DateInput
          ref={anchorRef}
          mode="range"
          open={open}
          day={start.day}
          month={start.month}
          year={start.year}
          onDayChange={day => patchStart({ day })}
          onMonthChange={m => patchStart({ month: m })}
          onYearChange={year => patchStart({ year })}
          endDay={end.day}
          endMonth={end.month}
          endYear={end.year}
          onEndDayChange={day => patchEnd({ day })}
          onEndMonthChange={m => patchEnd({ month: m })}
          onEndYearChange={year => patchEnd({ year })}
          onTriggerClick={() => setOpen(v => !v)}
          className="w-fit"
        />
        <PopoverContent
          anchor={anchorRef}
          className="w-auto overflow-hidden border-none p-0"
          align="start"
          sideOffset={4}
          initialFocus={false}>
          <Calendar
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
      <FieldLabel className="label-regular-primary">Select Date</FieldLabel>

      <DateInput
        disabled
        day={null}
        month={null}
        year={null}
        className="w-fit"
      />

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
    parts,
    patch,
    month,
    setMonth,
    handleCalendarSelect,
  } = useDatePicker();
  const anchorRef = React.useRef<HTMLDivElement>(null);

  return (
    <Field className="w-fit gap-2">
      <FieldLabel className={labelClass}>{label}</FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <DateInput
          ref={anchorRef}
          size={size}
          variant={variant}
          open={open}
          day={parts.day}
          month={parts.month}
          year={parts.year}
          onDayChange={day => patch({ day })}
          onMonthChange={m => patch({ month: m })}
          onYearChange={year => patch({ year })}
          onTriggerClick={() => setOpen(v => !v)}
          className="w-fit"
        />
        <PopoverContent
          anchor={anchorRef}
          className="w-auto overflow-hidden border-none p-0"
          align="start"
          sideOffset={4}
          initialFocus={false}>
          <Calendar
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
  label,
  message,
  messageClass,
  borderClass,
  isError,
}: Readonly<{
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
    parts,
    patch,
    month,
    setMonth,
    handleCalendarSelect,
  } = useDatePicker();
  const anchorRef = React.useRef<HTMLDivElement>(null);

  return (
    <Field className="w-fit gap-2">
      <FieldLabel className="label-regular-primary">{label}</FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <DateInput
          ref={anchorRef}
          open={open}
          day={parts.day}
          month={parts.month}
          year={parts.year}
          onDayChange={day => patch({ day })}
          onMonthChange={m => patch({ month: m })}
          onYearChange={year => patch({ year })}
          onTriggerClick={() => setOpen(v => !v)}
          aria-invalid={isError || undefined}
          className={cn('w-fit', borderClass)}
        />
        <PopoverContent
          anchor={anchorRef}
          className="w-auto overflow-hidden border-none p-0"
          align="start"
          sideOffset={4}
          initialFocus={false}>
          <Calendar
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
        label="Error"
        message="Feedback message here"
        messageClass="text-status-error"
        borderClass=""
        isError
      />
      <DatePickerValidationItem
        label="Warning"
        message="Feedback message here"
        messageClass="text-status-warning"
        borderClass="border-stroke-status-warning"
        isError={false}
      />
      <DatePickerValidationItem
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
    start,
    end,
    patchStart,
    patchEnd,
    month,
    setMonth,
    range,
    handleSelect,
    handleDayClick,
  } = useDateRangePicker();
  const anchorRef = React.useRef<HTMLDivElement>(null);

  return (
    <Field className="w-fit gap-2">
      <FieldLabel className="label-regular-primary mb-[-4px]">
        Date Range
      </FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <DateInput
          ref={anchorRef}
          mode="range"
          variant="inline"
          open={open}
          day={start.day}
          month={start.month}
          year={start.year}
          onDayChange={day => patchStart({ day })}
          onMonthChange={m => patchStart({ month: m })}
          onYearChange={year => patchStart({ year })}
          endDay={end.day}
          endMonth={end.month}
          endYear={end.year}
          onEndDayChange={day => patchEnd({ day })}
          onEndMonthChange={m => patchEnd({ month: m })}
          onEndYearChange={year => patchEnd({ year })}
          onTriggerClick={() => setOpen(v => !v)}
          className="w-fit"
        />
        <PopoverContent
          anchor={anchorRef}
          className="w-auto overflow-hidden border-none p-0"
          align="start"
          sideOffset={4}
          initialFocus={false}>
          <Calendar
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
