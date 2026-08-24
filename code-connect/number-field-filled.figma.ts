// url=<QBDS_NUMBER_FIELD_STEPPER_FILLED>
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
  filled: 'filled',
  disabled: 'disabled',
  error: 'error',
  success: 'success',
  warning: 'warning',
});

const showEntryInput = instance.getBoolean('showEntryInput');
const showFeedback = instance.getBoolean('showFeedbackMessage');
const showHelpText = instance.getBoolean('showHelpText');

const hintText = instance.getString('hintText');
const entryFilled = instance.getString('entryFilled');
const entryActive = instance.getString('entryActive');

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
    ? 'border-stroke-status-error'
    : state === 'warning'
      ? 'border-stroke-status-warning'
      : state === 'success'
        ? 'border-stroke-status-success'
        : '';

const valueProp = isLive
  ? figma.code` defaultValue={${entryActive}}`
  : hasFilledValue
    ? figma.code` defaultValue={${entryFilled}}`
    : figma.code``;

const placeholderProp =
  showHelpText || !hasValue
    ? figma.code` placeholder="${hintText}"`
    : figma.code``;

const shells = instance.findConnectedInstances(
  n => n.codeConnectId() === 'icon-shell',
);
const leadingShell = shells[0];
const trailingShell = shells[1] ?? shells[0];

let leadingCode: figma.ResultSection[] = [];
let trailingCode: figma.ResultSection[] = [];

if (leadingShell && leadingShell.type === 'INSTANCE') {
  leadingCode = leadingShell.executeTemplate().example;
}

if (trailingShell && trailingShell.type === 'INSTANCE') {
  trailingCode = trailingShell.executeTemplate().example;
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
    <NumberFieldGroup size="${size}"${groupClassName}>
      ${decrementCode}
      ${inputCode}
      ${incrementCode}
    </NumberFieldGroup>
  </NumberField>
`;

const footer =
  invalid && showFeedback
    ? figma.code`<FieldError>Feedback message</FieldError>`
    : showHelpText && !invalid
      ? figma.code`<FieldDescription>Helper text</FieldDescription>`
      : figma.code``;

const hasFooter = (invalid && showFeedback) || (showHelpText && !invalid);

const example = hasFooter
  ? figma.code`<FieldSet className="gap-2">${fieldBody}${footer}</FieldSet>`
  : fieldBody;

const fieldImports =
  invalid && showFeedback
    ? ['import { FieldError, FieldSet } from "@/components/ui/field"']
    : showHelpText && !invalid
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
  id: 'number-field-stepper-filled',
  metadata: { nestable: true },
};
