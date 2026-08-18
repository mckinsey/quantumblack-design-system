// url=<QBDS_INPUT_GROUP_STEPPER_GHOST>
// source=src/components/ui/input-group.tsx
// component=InputGroup
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
    ? ' !border-b !border-b-status-warning'
    : state === 'success'
      ? ' !border-b !border-b-status-success'
      : '';

const valueProp = isLive
  ? figma.code` defaultValue="${inputActive}"`
  : hasFilledValue
    ? figma.code` defaultValue="${entryFilled}"`
    : figma.code``;

const placeholderProp =
  state === 'focus'
    ? figma.code` placeholder="${hintFocus}"`
    : showHintText || !hasValue
      ? figma.code` placeholder="${hintText}"`
      : figma.code``;

const buttonSize = size === 'lg' ? 'icon-xs' : 'icon-xxs';

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

export default {
  example: figma.code`
    <InputGroup variant="inline" size="${size}" className="gap-1${statusClass}">
      <InputGroupAddon align="inline-start">
        <InputGroupButton size="${buttonSize}" variant="ghost" aria-label="Decrease"${disabled ? ' disabled' : ''}>
          ${leadingCode}
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupInput type="number" variant="inline" size="${size}" className="text-center"${disabled ? ' disabled' : ''}${invalid ? ' aria-invalid' : ''}${valueProp}${placeholderProp} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="${buttonSize}" variant="ghost" aria-label="Increase"${disabled ? ' disabled' : ''}>
          ${trailingCode}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  `,
  imports: [
    'import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"',
  ],
  id: 'input-group-stepper-ghost',
  metadata: { nestable: true },
};
