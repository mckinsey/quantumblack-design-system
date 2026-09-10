// url=<QBDS_DATE_SINGLE_GHOST>
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
  open: 'open',
  filled: 'filled',
  error: 'error',
  warning: 'warning',
  success: 'success',
  disabled: 'disabled',
});

const showFeedback = instance.getBoolean('hasFeedbackMessages');
const showHintText = instance.getBoolean('hasHintText');

const disabled = state === 'disabled';
const invalid = state === 'error';
const open = state === 'open';
const hasFilled =
  state === 'filled' ||
  state === 'error' ||
  state === 'warning' ||
  state === 'success' ||
  state === 'disabled' ||
  state === 'active' ||
  state === 'open';

const statusClass =
  state === 'warning'
    ? ' border-stroke-status-warning'
    : state === 'success'
      ? ' border-stroke-status-success'
      : '';

const day = hasFilled ? 16 : null;
const month = hasFilled ? 4 : null;
const year = hasFilled ? 2025 : null;

const footer =
  invalid && showFeedback
    ? figma.code`<FieldError>Feedback message</FieldError>`
    : showHintText && !invalid
      ? figma.code`<FieldDescription>Helper text</FieldDescription>`
      : figma.code``;

const hasFooter = (invalid && showFeedback) || (showHintText && !invalid);

const body = figma.code`
  <DateInput
    variant="inline"
    size="${size}"
    ${disabled ? 'disabled' : ''}
    ${invalid ? 'aria-invalid' : ''}
    ${open ? 'open' : ''}
    day={${day === null ? 'null' : day}}
    month={${month === null ? 'null' : month}}
    year={${year === null ? 'null' : year}}
    className="w-fit${statusClass}"
  />
`;

const example = hasFooter
  ? figma.code`<FieldSet className="gap-2">${body}${footer}</FieldSet>`
  : body;

const imports = hasFooter
  ? invalid && showFeedback
    ? [
        'import { DateInput } from "@/components/ui/date-input"',
        'import { FieldError, FieldSet } from "@/components/ui/field"',
      ]
    : [
        'import { DateInput } from "@/components/ui/date-input"',
        'import { FieldDescription, FieldSet } from "@/components/ui/field"',
      ]
  : ['import { DateInput } from "@/components/ui/date-input"'];

export default {
  example,
  imports,
  id: 'date-single-ghost',
  metadata: { nestable: true },
};
