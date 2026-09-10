// url=<QBDS_DATE_RANGE_GHOST>
// source=src/components/ui/date-input.tsx
// component=DateInput
import figma from 'figma';

const instance = figma.selectedInstance;

const size = (instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
}) ?? 'default') as 'sm' | 'default' | 'lg';

const state = instance.getEnum('state', {
  enabled: 'enabled',
  hover: 'hover',
  focus: 'focus',
  active: 'active',
  'open-start': 'open-start',
  'open-range': 'open-range',
  filled: 'filled',
  error: 'error',
  warning: 'warning',
  success: 'success',
  disabled: 'disabled',
});

const showFeedback = instance.getBoolean('hasFeedbackMessage');

const disabled = state === 'disabled';
const invalid = state === 'error';
const open = state === 'open-start' || state === 'open-range';
const hasFilled =
  state === 'filled' ||
  state === 'error' ||
  state === 'warning' ||
  state === 'success' ||
  state === 'disabled' ||
  state === 'active' ||
  open;

const statusClass =
  state === 'warning'
    ? ' border-stroke-status-warning'
    : state === 'success'
      ? ' border-stroke-status-success'
      : '';

const day = hasFilled ? 1 : null;
const month = hasFilled ? 4 : null;
const year = hasFilled ? 2025 : null;
const endDay = hasFilled && state !== 'open-start' ? 16 : null;
const endMonth = hasFilled && state !== 'open-start' ? 4 : null;
const endYear = hasFilled && state !== 'open-start' ? 2025 : null;

const footer =
  invalid && showFeedback
    ? figma.code`<FieldError>Feedback message</FieldError>`
    : figma.code``;

const hasFooter = Boolean(invalid && showFeedback);

const body = figma.code`
  <DateInput
    mode="range"
    variant="inline"
    size="${size}"
    ${disabled ? 'disabled' : ''}
    ${invalid ? 'aria-invalid' : ''}
    ${open ? 'open' : ''}
    day={${day === null ? 'null' : day}}
    month={${month === null ? 'null' : month}}
    year={${year === null ? 'null' : year}}
    endDay={${endDay === null ? 'null' : endDay}}
    endMonth={${endMonth === null ? 'null' : endMonth}}
    endYear={${endYear === null ? 'null' : endYear}}
    className="w-fit${statusClass}"
  />
`;

const example = hasFooter
  ? figma.code`<FieldSet className="gap-2">${body}${footer}</FieldSet>`
  : body;

const imports = hasFooter
  ? [
      'import { DateInput } from "@/components/ui/date-input"',
      'import { FieldError, FieldSet } from "@/components/ui/field"',
    ]
  : ['import { DateInput } from "@/components/ui/date-input"'];

export default {
  example,
  imports,
  id: 'date-range-ghost',
  metadata: { nestable: true },
};
