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

instance.getBoolean('showEntryInput');
instance.getBoolean('showFeedbackMessage');
instance.getBoolean('showHelpText');

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

const statusClass =
  state === 'warning'
    ? ' border-stroke-status-warning'
    : state === 'success'
      ? ' border-stroke-status-success'
      : '';

const valueProp = isLive
  ? figma.code` defaultValue={${entryActive.replace('|', '')}}`
  : hasFilledValue
    ? figma.code` defaultValue={${entryFilled}}`
    : figma.code``;

const placeholderProp = !hasValue
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
      <NumberFieldGroup size="${size}" className="${statusClass}">
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
  id: 'number-field-stepper-filled',
  metadata: { nestable: true },
};
