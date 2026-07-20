import type { ReactNode } from 'react';

import {
  FieldDescription,
  FieldError,
  FieldTitle,
} from '@/components/ui/field';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

const FIELD_WIDTH = 'w-full min-w-[240px] max-w-[320px]';

function RequiredMark() {
  return (
    <span className="text-status-error" aria-hidden>
      *
    </span>
  );
}

function LabelRow({
  size = 'default',
  disabled = false,
  counter,
}: {
  size?: 'sm' | 'default' | 'lg';
  disabled?: boolean;
  counter?: ReactNode;
}) {
  const labelClass =
    size === 'sm'
      ? 'label-small-primary'
      : size === 'lg'
        ? 'label-large-primary'
        : 'label-regular-primary';

  return (
    <FieldTitle
      className={`${labelClass} w-full justify-between ${disabled ? 'opacity-50' : ''}`}>
      <span className="flex items-center gap-1">
        Field label
        <RequiredMark />
        <IconShell size="sm" variant="secondary" disabled={disabled}>
          <Icon icon="info" />
        </IconShell>
      </span>
      {counter}
    </FieldTitle>
  );
}

function Counter({
  count,
  max,
  size = 'default',
  type = 'empty',
  disabled = false,
}: {
  count: number;
  max: number;
  size?: 'sm' | 'default' | 'lg';
  type?: 'empty' | 'filled' | 'exceeded';
  disabled?: boolean;
}) {
  const typeClass =
    size === 'sm' ? 'paragraph-small-primary' : 'paragraph-regular-primary';
  const countClass =
    type === 'exceeded'
      ? 'text-status-error'
      : type === 'filled'
        ? 'text-fg-secondary'
        : 'text-fg-tertiary';

  return (
    <span
      className={`flex items-center gap-1 ${typeClass} ${disabled ? 'opacity-50' : ''}`}
      aria-live="polite">
      <span className={countClass}>{count}</span>
      <span className="text-fg-tertiary">/</span>
      <span className="text-fg-tertiary">{max}</span>
    </span>
  );
}

export function FieldLabelDemo() {
  return (
    <div className={`${FIELD_WIDTH} flex flex-col gap-4`}>
      <LabelRow counter={<Counter count={0} max={150} type="empty" />} />
    </div>
  );
}

export function FieldLabelSizes() {
  return (
    <div className={`${FIELD_WIDTH} flex flex-col gap-4`}>
      <LabelRow
        size="sm"
        counter={<Counter count={0} max={150} size="sm" type="empty" />}
      />
      <LabelRow
        size="default"
        counter={<Counter count={0} max={150} type="empty" />}
      />
      <LabelRow
        size="lg"
        counter={<Counter count={0} max={150} size="lg" type="empty" />}
      />
    </div>
  );
}

export function FieldLabelDisabled() {
  return (
    <div className={`${FIELD_WIDTH} flex flex-col gap-4`}>
      <LabelRow
        disabled
        counter={<Counter count={0} max={150} type="empty" disabled />}
      />
    </div>
  );
}

export function FieldHelpTextDemo() {
  return (
    <div className={`${FIELD_WIDTH} flex flex-col gap-4`}>
      <FieldDescription className="paragraph-small-primary">
        Helper text
      </FieldDescription>
      <FieldDescription className="paragraph-regular-primary">
        Helper text
      </FieldDescription>
      <FieldDescription className="paragraph-regular-primary">
        Helper text
      </FieldDescription>
    </div>
  );
}

export function FieldHelpTextDisabled() {
  return (
    <div className={`${FIELD_WIDTH} flex flex-col gap-4`}>
      <FieldDescription className="paragraph-small-primary" disabled>
        Helper text
      </FieldDescription>
      <FieldDescription className="paragraph-regular-primary" disabled>
        Helper text
      </FieldDescription>
      <FieldDescription className="paragraph-regular-primary" disabled>
        Helper text
      </FieldDescription>
    </div>
  );
}

export function FieldErrorDemo() {
  return (
    <div className={`${FIELD_WIDTH} flex flex-col gap-4`}>
      <FieldError className="paragraph-small-primary">Feedback</FieldError>
      <FieldError className="paragraph-regular-primary">Feedback</FieldError>
      <FieldError className="paragraph-regular-primary">Feedback</FieldError>
    </div>
  );
}

export function FieldCounterDemo() {
  return (
    <div className={`${FIELD_WIDTH} flex flex-col gap-4`}>
      <Counter count={0} max={150} type="empty" />
      <Counter count={10} max={150} type="filled" />
      <Counter count={151} max={150} type="exceeded" />
    </div>
  );
}

export function FieldCompositionDemo() {
  return (
    <div className={`${FIELD_WIDTH} flex flex-col gap-2`}>
      <LabelRow counter={<Counter count={10} max={150} type="filled" />} />
      <FieldDescription className="paragraph-regular-primary">
        Helper text
      </FieldDescription>
    </div>
  );
}

export function FieldCompositionError() {
  return (
    <div className={`${FIELD_WIDTH} flex flex-col gap-2`}>
      <LabelRow counter={<Counter count={151} max={150} type="exceeded" />} />
      <FieldError className="paragraph-regular-primary">Feedback</FieldError>
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'FieldLabelDemo',
    title: 'Label',
    description: 'Field label with required mark, info icon, and counter slot.',
  },
  {
    name: 'FieldLabelSizes',
    title: 'Label sizes',
    description: 'Small, regular, and large field labels.',
  },
  {
    name: 'FieldLabelDisabled',
    title: 'Label disabled',
    description: 'Disabled field label composition.',
  },
  {
    name: 'FieldHelpTextDemo',
    title: 'Help text',
    description: 'Helper text sizes (sm, default, lg).',
  },
  {
    name: 'FieldHelpTextDisabled',
    title: 'Help text disabled',
    description: 'Disabled helper text.',
  },
  {
    name: 'FieldErrorDemo',
    title: 'Error',
    description: 'Error feedback sizes (sm, default, lg).',
  },
  {
    name: 'FieldCounterDemo',
    title: 'Character counter',
    description: 'Empty, filled, and exceeded counter composition.',
  },
  {
    name: 'FieldCompositionDemo',
    title: 'Composition',
    description: 'Label row with counter and helper text.',
  },
  {
    name: 'FieldCompositionError',
    title: 'Composition error',
    description: 'Label row with counter and error feedback (XOR helper).',
  },
];

export const field = createLegacyDemo('field', examples, {
  FieldLabelDemo: <FieldLabelDemo />,
  FieldLabelSizes: <FieldLabelSizes />,
  FieldLabelDisabled: <FieldLabelDisabled />,
  FieldHelpTextDemo: <FieldHelpTextDemo />,
  FieldHelpTextDisabled: <FieldHelpTextDisabled />,
  FieldErrorDemo: <FieldErrorDemo />,
  FieldCounterDemo: <FieldCounterDemo />,
  FieldCompositionDemo: <FieldCompositionDemo />,
  FieldCompositionError: <FieldCompositionError />,
});
