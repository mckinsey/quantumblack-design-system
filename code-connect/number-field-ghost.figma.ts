// url=<QBDS_NUMBER_FIELD_STEPPER_GHOST>
// source=src/components/ui/number-field.tsx
// component=NumberField
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
});

const state = instance.getEnum('state', {
  enabled: 'enabled',
  hover: 'hover',
  focus: 'focus',
  active: 'active',
  'open-typeahead': 'open-typeahead',
  disabled: 'disabled',
  filled: 'filled',
  error: 'error',
  success: 'success',
  warning: 'warning',
});

const showEntryInput = instance.getBoolean('showEntryInput');
const showHintText = instance.getBoolean('showHintText');
const showFeedback = instance.getBoolean('showFeedbackMessage');

const hintText = instance.getString('hintText');
const hintFocus = instance.getString('hintFocus');
const entryFilled = instance.getString('entryFilled');
const inputActive = instance.getString('inputActive');

const disabled = state === 'disabled';
const invalid = state === 'error';
const isLive = state === 'active' || state === 'open-typeahead';
const hasFilledValue =
  state === 'filled' ||
  state === 'error' ||
  state === 'warning' ||
  state === 'success' ||
  state === 'disabled';
const hasValue = isLive || hasFilledValue;

const statusClassName =
  state === 'error'
    ? 'border-b-stroke-status-error'
    : state === 'warning'
      ? 'border-b-stroke-status-warning'
      : state === 'success'
        ? 'border-b-stroke-status-success'
        : '';

const valueProp = isLive
  ? figma.code` defaultValue={${inputActive}}`
  : hasFilledValue
    ? figma.code` defaultValue={${entryFilled}}`
    : figma.code``;

const placeholderProp =
  state === 'focus'
    ? figma.code` placeholder="${hintFocus}"`
    : showHintText || !hasValue
      ? figma.code` placeholder="${hintText}"`
      : figma.code``;

const leading = instance.findInstance('Action-Trigger-Leading');
const trailing = instance.findInstance('Action-Trigger-Trailing');

let leadingCode: figma.ResultSection[] = [];
let trailingCode: figma.ResultSection[] = [];

if (leading && leading.type === 'INSTANCE') {
  leadingCode = leading.executeTemplate().example;
}

if (trailing && trailing.type === 'INSTANCE') {
  trailingCode = trailing.executeTemplate().example;
}

const decrementCode =
  leadingCode.length > 0
    ? figma.code`<NumberFieldDecrement>${leadingCode}</NumberFieldDecrement>`
    : figma.code`<NumberFieldDecrement />`;

const incrementCode =
  trailingCode.length > 0
    ? figma.code`<NumberFieldIncrement>${trailingCode}</NumberFieldIncrement>`
    : figma.code`<NumberFieldIncrement />`;

const inputCode = showEntryInput
  ? figma.code`<NumberFieldInput className="text-center"${invalid ? ' aria-invalid' : ''}${placeholderProp} />`
  : figma.code``;

const groupClassName = statusClassName ? ` className="${statusClassName}"` : '';

const fieldBody = figma.code`
  <NumberField min={0} max={999}${disabled ? ' disabled' : ''}${valueProp}>
    <NumberFieldGroup variant="inline" size="${size}"${groupClassName}>
      ${decrementCode}
      ${inputCode}
      ${incrementCode}
    </NumberFieldGroup>
  </NumberField>
`;

const footer =
  invalid && showFeedback
    ? figma.code`<FieldError>Feedback message</FieldError>`
    : showHintText && !invalid
      ? figma.code`<FieldDescription>Helper text</FieldDescription>`
      : figma.code``;

const hasFooter = (invalid && showFeedback) || (showHintText && !invalid);

const example = hasFooter
  ? figma.code`<FieldSet className="gap-2">${fieldBody}${footer}</FieldSet>`
  : fieldBody;

const fieldImports =
  invalid && showFeedback
    ? ['import { FieldError, FieldSet } from "@/components/ui/field"']
    : showHintText && !invalid
      ? ['import { FieldDescription, FieldSet } from "@/components/ui/field"']
      : [];

const useCustomIcons = leadingCode.length > 0 || trailingCode.length > 0;

export default {
  example,
  imports: [
    'import { NumberField, NumberFieldGroup, NumberFieldInput, NumberFieldDecrement, NumberFieldIncrement } from "@/components/ui/number-field"',
    ...(useCustomIcons
      ? [
          'import { IconShell } from "@/components/ui/icon-shell"',
          'import { Icon } from "@/components/ui/icon"',
        ]
      : []),
    ...fieldImports,
  ],
  id: 'number-field-stepper-ghost',
  metadata: { nestable: true },
};
