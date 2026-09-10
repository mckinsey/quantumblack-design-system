'use client';

import { useState } from 'react';

import { DateInput } from '@/components/ui/date-input';
import { FieldDescription, FieldSet, FieldTitle } from '@/components/ui/field';
import { cn } from '@/lib/utils';

const fieldConfig = {
  sm: {
    label: 'label-small-primary text-fg-secondary',
    description: 'paragraph-small-primary text-fg-tertiary',
    gap: 'gap-2',
  },
  default: {
    label: 'label-regular-primary text-fg-secondary',
    description: 'paragraph-regular-primary text-fg-tertiary',
    gap: 'gap-2',
  },
  lg: {
    label: 'label-large-primary text-fg-secondary',
    description: 'paragraph-regular-primary text-fg-tertiary',
    gap: 'gap-2',
  },
} as const;

const getLabelClassName = (
  size: keyof typeof fieldConfig,
  variant: 'default' | 'inline' = 'default',
) => {
  return cn(
    fieldConfig[size].label,
    variant === 'inline' &&
      (size === 'default' || size === 'lg') &&
      'mb-[-4px]',
  );
};

type Parts = {
  day: number | null;
  month: number | null;
  year: number | null;
};

export function DateInputDemo() {
  const [s, setS] = useState<Parts>({ day: 16, month: 4, year: 2025 });
  const [d, setD] = useState<Parts>({ day: 16, month: 4, year: 2025 });
  const [l, setL] = useState<Parts>({ day: 16, month: 4, year: 2025 });

  const sizes = [
    { label: 'Small', size: 'sm' as const, value: s, set: setS },
    { label: 'Default', size: 'default' as const, value: d, set: setD },
    { label: 'Large', size: 'lg' as const, value: l, set: setL },
  ];

  return (
    <div className="flex flex-wrap items-end gap-8">
      {sizes.map(({ label, size, value, set }) => {
        const cfg = fieldConfig[size];

        return (
          <FieldSet key={size} className={cfg.gap}>
            <FieldTitle className={getLabelClassName(size)}>{label}</FieldTitle>

            <DateInput
              size={size}
              day={value.day}
              month={value.month}
              year={value.year}
              onDayChange={day => set(p => ({ ...p, day }))}
              onMonthChange={month => set(p => ({ ...p, month }))}
              onYearChange={year => set(p => ({ ...p, year }))}
              className="w-fit"
            />

            <FieldDescription className={cfg.description}>
              Helper text
            </FieldDescription>
          </FieldSet>
        );
      })}
    </div>
  );
}

export function DateInputInline() {
  const [s, setS] = useState<Parts>({ day: 16, month: 4, year: 2025 });
  const [d, setD] = useState<Parts>({ day: 16, month: 4, year: 2025 });
  const [l, setL] = useState<Parts>({ day: 16, month: 4, year: 2025 });

  const sizes = [
    { label: 'Small', size: 'sm' as const, value: s, set: setS },
    { label: 'Default', size: 'default' as const, value: d, set: setD },
    { label: 'Large', size: 'lg' as const, value: l, set: setL },
  ];

  return (
    <div className="flex flex-wrap items-end gap-8">
      {sizes.map(({ label, size, value, set }) => {
        const cfg = fieldConfig[size];

        return (
          <FieldSet key={size} className={cfg.gap}>
            <FieldTitle className={getLabelClassName(size, 'inline')}>
              {label}
            </FieldTitle>

            <DateInput
              variant="inline"
              size={size}
              day={value.day}
              month={value.month}
              year={value.year}
              onDayChange={day => set(p => ({ ...p, day }))}
              onMonthChange={month => set(p => ({ ...p, month }))}
              onYearChange={year => set(p => ({ ...p, year }))}
              className="w-fit"
            />

            <FieldDescription className={cfg.description}>
              Helper text
            </FieldDescription>
          </FieldSet>
        );
      })}
    </div>
  );
}

export function DateInputRange() {
  const [start, setStart] = useState<Parts>({
    day: 1,
    month: 4,
    year: 2025,
  });
  const [end, setEnd] = useState<Parts>({ day: 16, month: 4, year: 2025 });
  const { label, description, gap } = fieldConfig.default;

  return (
    <FieldSet className={gap}>
      <FieldTitle className={label}>Date range</FieldTitle>

      <DateInput
        mode="range"
        day={start.day}
        month={start.month}
        year={start.year}
        onDayChange={day => setStart(p => ({ ...p, day }))}
        onMonthChange={month => setStart(p => ({ ...p, month }))}
        onYearChange={year => setStart(p => ({ ...p, year }))}
        endDay={end.day}
        endMonth={end.month}
        endYear={end.year}
        onEndDayChange={day => setEnd(p => ({ ...p, day }))}
        onEndMonthChange={month => setEnd(p => ({ ...p, month }))}
        onEndYearChange={year => setEnd(p => ({ ...p, year }))}
        className="w-fit"
      />

      <FieldDescription className={description}>Helper text</FieldDescription>
    </FieldSet>
  );
}

export function DateInputDisabled() {
  const { label, description, gap } = fieldConfig.default;

  return (
    <FieldSet className={gap}>
      <FieldTitle className={label}>Disabled</FieldTitle>

      <DateInput disabled day={16} month={4} year={2025} className="w-fit" />

      <FieldDescription className={description}>Helper text</FieldDescription>
    </FieldSet>
  );
}

export function DateInputValidation() {
  const { label, description, gap } = fieldConfig.default;

  return (
    <div className="space-y-6">
      <FieldSet className={gap}>
        <FieldTitle className={label}>Error</FieldTitle>

        <DateInput
          day={16}
          month={4}
          year={2025}
          aria-invalid
          className="w-fit"
        />

        <FieldDescription className={description}>
          This field is required
        </FieldDescription>
      </FieldSet>

      <FieldSet className={gap}>
        <FieldTitle className={label}>Warning</FieldTitle>

        <DateInput
          day={16}
          month={4}
          year={2025}
          className="border-stroke-status-warning w-fit"
        />

        <FieldDescription className={description}>
          Date is outside the preferred range
        </FieldDescription>
      </FieldSet>

      <FieldSet className={gap}>
        <FieldTitle className={label}>Success</FieldTitle>

        <DateInput
          day={16}
          month={4}
          year={2025}
          className="border-stroke-status-success w-fit"
        />

        <FieldDescription className={description}>
          Date confirmed
        </FieldDescription>
      </FieldSet>
    </div>
  );
}

export const examples = [
  {
    name: 'DateInputDemo',
    title: 'Default',
    description: 'All sizes — small, default, and large.',
  },
  {
    name: 'DateInputInline',
    title: 'Inline Variant',
    description: 'All sizes — inline styling.',
  },
  {
    name: 'DateInputRange',
    title: 'Range',
    description: 'Start and end date segments in one field.',
  },
  {
    name: 'DateInputDisabled',
    title: 'Disabled',
    description: 'Disabled date input.',
  },
  {
    name: 'DateInputValidation',
    title: 'Validation',
    description: 'Error via aria-invalid; warning/success via className.',
  },
];

export const dateInput = {
  name: 'date-input',
  components: {
    Default: <DateInputDemo />,
    'Inline Variant': <DateInputInline />,
    Range: <DateInputRange />,
    Disabled: <DateInputDisabled />,
    Validation: <DateInputValidation />,
  },
};
