// url=<QBDS_INPUT_GHOST>
// source=src/components/ui/input.tsx
// component=Input
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
  error: 'error',
  warning: 'warning',
  success: 'success',
  disabled: 'disabled',
});

instance.getBoolean('showLeadingIcon');
instance.getBoolean('showTrailingIcon');
instance.getBoolean('showTrailingButton');
instance.getBoolean('showFeedbackIcon');
instance.getBoolean('showFeedbackMessage');
const showHintText = instance.getBoolean('showHintText');

const hintText = instance.getString('hintText');
const liveEntry = instance.getString('liveEntry');
const entryFilled = instance.getString('entryFilled');

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
    ? ' className="border-b-stroke-status-warning"'
    : state === 'success'
      ? ' className="border-b-stroke-status-success"'
      : '';

const valueProp = isLive
  ? figma.code` defaultValue="${liveEntry}"`
  : hasFilledValue
    ? figma.code` defaultValue="${entryFilled}"`
    : figma.code``;

const placeholderProp =
  showHintText || !hasValue
    ? figma.code` placeholder="${hintText}"`
    : figma.code``;

export default {
  example: figma.code`<Input variant="inline" size="${size}"${disabled ? ' disabled' : ''}${invalid ? ' aria-invalid' : ''}${valueProp}${placeholderProp}${statusClass} />`,
  imports: ['import { Input } from "@/components/ui/input"'],
  id: 'input-ghost',
  metadata: { nestable: true },
};
