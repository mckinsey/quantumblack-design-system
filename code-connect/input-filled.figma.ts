// url=<QBDS_INPUT_FILLED>
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
instance.getBoolean('showEntryText');
const showHintText = instance.getBoolean('showHintText');

const placeholderText = instance.getString('placeholderText') || 'Placeholder';
instance.getString('placeholderActive');
instance.getString('inputActive');
const entryFilled = instance.getString('entryFilled') || 'User input text';

const disabled = state === 'disabled';
const invalid = state === 'error';
const hasValue =
  state === 'filled' ||
  state === 'error' ||
  state === 'warning' ||
  state === 'success' ||
  state === 'active' ||
  state === 'open-typeahead' ||
  state === 'disabled';

const statusClass =
  state === 'warning'
    ? ' className="!border-stroke-status-warning"'
    : state === 'success'
      ? ' className="!border-stroke-status-success"'
      : '';

const props = [
  `size="${size}"`,
  disabled ? 'disabled' : '',
  invalid ? 'aria-invalid' : '',
  hasValue ? `defaultValue="${entryFilled}"` : '',
  showHintText || !hasValue ? `placeholder="${placeholderText}"` : '',
]
  .filter(Boolean)
  .join(' ');

export default {
  example: figma.code`<Input ${props}${statusClass} />`,
  imports: ['import { Input } from "@/components/ui/input"'],
  id: 'input-filled',
  metadata: { nestable: true },
};
