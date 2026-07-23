'use client';

import { type ReactNode, useId } from 'react';

import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { Input } from '@/components/ui/input';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

const FIELD_WIDTH = 'w-full min-w-[240px] max-w-[320px]';

const counterSizeClass = {
  sm: 'paragraph-small-primary',
  default: 'paragraph-regular-primary',
  lg: 'paragraph-large-primary',
} as const;

const counterTypeClass = {
  empty: 'text-fg-secondary',
  filled: 'text-fg-primary',
  exceeded: 'text-status-error',
} as const;

type Size = keyof typeof counterSizeClass;
type CounterType = keyof typeof counterTypeClass;

function Counter({
  count,
  max,
  size = 'default',
  type = 'empty',
  disabled = false,
}: {
  count: number;
  max: number;
  size?: Size;
  type?: CounterType;
  disabled?: boolean;
}) {
  const countClass = disabled ? 'text-fg-disabled' : counterTypeClass[type];
  const muteClass = disabled ? 'text-fg-disabled' : 'text-fg-secondary';

  return (
    <span
      className={`flex items-center gap-0.5 ${counterSizeClass[size]}`}
      aria-live="polite">
      <span className={countClass}>{count}</span>
      <span className={muteClass}>/</span>
      <span className={muteClass}>{max}</span>
    </span>
  );
}

function LabelRow({
  size = 'default',
  disabled = false,
  counter,
  htmlFor,
}: {
  size?: Size;
  disabled?: boolean;
  counter?: ReactNode;
  htmlFor?: string;
}) {
  return (
    <FieldLabel
      size={size}
      disabled={disabled}
      htmlFor={htmlFor}
      className="w-full justify-between">
      <span className="flex items-center gap-1">
        Field label
        <span className="text-status-error" aria-hidden>
          *
        </span>
        <IconShell size="sm" variant="secondary" disabled={disabled}>
          <Icon icon="info" />
        </IconShell>
      </span>
      {counter}
    </FieldLabel>
  );
}

const statusClass = {
  warning: 'text-status-warning',
  success: 'text-status-success',
} as const;

const inputStatusClass = {
  error: '!border-stroke-status-error',
  warning: '!border-stroke-status-warning',
  success: '!border-stroke-status-success',
} as const;

type Status = 'error' | keyof typeof statusClass;

function FieldBlock({
  size = 'default',
  disabled = false,
  count = 10,
  max = 150,
  type = 'filled',
  status,
}: {
  size?: Size;
  disabled?: boolean;
  count?: number;
  max?: number;
  type?: CounterType;
  status?: Status;
}) {
  const id = useId();

  return (
    <FieldSet className="gap-2">
      <LabelRow
        size={size}
        disabled={disabled}
        htmlFor={id}
        counter={
          <Counter
            count={count}
            max={max}
            size={size}
            type={type}
            disabled={disabled}
          />
        }
      />
      <Input
        id={id}
        size={size}
        disabled={disabled}
        placeholder="Hint text"
        aria-invalid={status === 'error' || undefined}
        className={status ? inputStatusClass[status] : undefined}
      />
      {status === 'error' ? (
        <FieldError size={size}>Feedback</FieldError>
      ) : status ? (
        <FieldDescription
          size={size}
          className={statusClass[status]}
          role="status">
          Feedback
        </FieldDescription>
      ) : (
        <FieldDescription size={size} disabled={disabled}>
          Helper text
        </FieldDescription>
      )}
    </FieldSet>
  );
}

export function FieldDemo() {
  return (
    <div className={FIELD_WIDTH}>
      <FieldBlock />
    </div>
  );
}

export function FieldSizes() {
  return (
    <div className={`${FIELD_WIDTH} flex flex-col gap-6`}>
      <FieldBlock size="sm" count={0} type="empty" />
      <FieldBlock size="default" />
      <FieldBlock size="lg" />
    </div>
  );
}

export function FieldStates() {
  return (
    <div className={`${FIELD_WIDTH} flex flex-col gap-6`}>
      <FieldBlock disabled count={0} type="empty" />
      <FieldBlock count={151} type="exceeded" status="error" />
      <FieldBlock status="warning" />
      <FieldBlock status="success" />
      <div className="flex flex-col gap-2">
        <Counter count={0} max={150} type="empty" />
        <Counter count={10} max={150} type="filled" />
        <Counter count={151} max={150} type="exceeded" />
      </div>
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'FieldDemo',
    title: 'Default',
    description: 'Label, input, counter, and helper text.',
  },
  {
    name: 'FieldSizes',
    title: 'Sizes',
    description: 'Small, default, and large compositions.',
  },
  {
    name: 'FieldStates',
    title: 'States',
    description:
      'Disabled, error / warning / success, and counter empty / filled / exceeded.',
  },
];

export const field = createLegacyDemo('field', examples, {
  FieldDemo: <FieldDemo />,
  FieldSizes: <FieldSizes />,
  FieldStates: <FieldStates />,
});
