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

const showHintText = instance.getBoolean('showHintText');
instance.getBoolean('showFeedbackMessage');

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

const statusClass =
  state === 'warning'
    ? ' border-b-stroke-status-warning'
    : state === 'success'
      ? ' border-b-stroke-status-success'
      : '';

const valueProp = isLive
  ? figma.code` defaultValue={${inputActive.replace('|', '')}}`
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

const decrementIcon =
  leadingCode.length > 0
    ? leadingCode
    : figma.code`<IconShell size="sm" type="neutral" variant="secondary"><Icon icon="remove" /></IconShell>`;

const incrementIcon =
  trailingCode.length > 0
    ? trailingCode
    : figma.code`<IconShell size="sm" type="neutral" variant="secondary"><Icon icon="add" /></IconShell>`;

export default {
  example: figma.code`
    <NumberField min={0} max={999}${disabled ? ' disabled' : ''}${valueProp}>
      <NumberFieldGroup variant="inline" size="${size}" className="${statusClass}">
        <NumberFieldDecrement>${decrementIcon}</NumberFieldDecrement>
        <NumberFieldInput className="text-center"${invalid ? ' aria-invalid' : ''}${placeholderProp} />
        <NumberFieldIncrement>${incrementIcon}</NumberFieldIncrement>
      </NumberFieldGroup>
    </NumberField>
  `,
  imports: [
    'import { NumberField, NumberFieldGroup, NumberFieldInput, NumberFieldDecrement, NumberFieldIncrement } from "@/components/ui/number-field"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { Icon } from "@/components/ui/icon"',
  ],
  id: 'number-field-stepper-ghost',
  metadata: { nestable: true },
};
