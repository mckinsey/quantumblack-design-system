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

function SizeStack({
  variant = 'default',
}: Readonly<{ variant?: 'default' | 'inline' }>) {
  const [s, setS] = useState('2025-04-16');
  const [d, setD] = useState('2025-04-16');
  const [l, setL] = useState('2025-04-16');

  const sizes = [
    { label: 'Small', size: 'sm' as const, value: s, set: setS },
    { label: 'Default', size: 'default' as const, value: d, set: setD },
    { label: 'Large', size: 'lg' as const, value: l, set: setL },
  ];

  return (
    <div className="flex flex-col gap-6">
      {sizes.map(({ label, size, value, set }) => {
        const cfg = fieldConfig[size];

        return (
          <FieldSet key={size} className={cfg.gap}>
            <FieldTitle className={getLabelClassName(size, variant)}>
              {label}
            </FieldTitle>

            <DateInput
              variant={variant}
              size={size}
              value={value}
              onChange={e => set(e.target.value)}
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

export function DateInputDemo() {
  return <SizeStack />;
}

export function DateInputInline() {
  return <SizeStack variant="inline" />;
}

export function DateInputRange() {
  const [start, setStart] = useState('2025-04-01');
  const [end, setEnd] = useState('2025-04-16');
  const { label, description, gap } = fieldConfig.default;

  return (
    <FieldSet className={gap}>
      <FieldTitle className={label}>Date range</FieldTitle>

      <DateInput
        mode="range"
        value={start}
        endValue={end}
        onChange={e => setStart(e.target.value)}
        onEndChange={e => setEnd(e.target.value)}
        aria-label="Start date"
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

      <DateInput disabled value="2025-04-16" />

      <FieldDescription className={description}>Helper text</FieldDescription>
    </FieldSet>
  );
}

export function DateInputValidation() {
  const { label, description, gap } = fieldConfig.default;

  return (
    <div className="flex flex-col gap-6">
      <FieldSet className={gap}>
        <FieldTitle className={label}>Error</FieldTitle>

        <DateInput value="2025-04-16" aria-invalid />

        <FieldDescription className={description}>
          This field is required
        </FieldDescription>
      </FieldSet>

      <FieldSet className={gap}>
        <FieldTitle className={label}>Warning</FieldTitle>

        <DateInput
          value="2025-04-16"
          className="border-stroke-status-warning"
        />

        <FieldDescription className={description}>
          Date is outside the preferred range
        </FieldDescription>
      </FieldSet>

      <FieldSet className={gap}>
        <FieldTitle className={label}>Success</FieldTitle>

        <DateInput
          value="2025-04-16"
          className="border-stroke-status-success"
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
    description: 'All sizes stacked — small, default, and large.',
  },
  {
    name: 'DateInputInline',
    title: 'Inline Variant',
    description: 'All sizes stacked — inline styling.',
  },
  {
    name: 'DateInputRange',
    title: 'Range',
    description: 'Start and end native date inputs in one field.',
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
