// url=<QBDS_INPUT_GROUP_STEPPER_FILLED>
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
  filled: 'filled',
  disabled: 'disabled',
  error: 'error',
  success: 'success',
  warning: 'warning',
});

instance.getBoolean('showEntryInput');
instance.getBoolean('showFeedbackMessage');

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
  state === 'warning'
    ? 'border-stroke-status-warning'
    : state === 'success'
      ? 'border-stroke-status-success'
      : '';

const valueProp = isLive
  ? figma.code` defaultValue="${entryActive}"`
  : hasFilledValue
    ? figma.code` defaultValue="${entryFilled}"`
    : figma.code``;

const placeholderProp = !hasValue
  ? figma.code` placeholder="${hintText}"`
  : figma.code``;

const buttonSize = size === 'lg' ? 'icon-xs' : 'icon-xxs';

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

const groupClassName = statusClassName ? `gap-1 ${statusClassName}` : 'gap-1';

export default {
  example: figma.code`
    <InputGroup size="${size}" className="${groupClassName}">
      <InputGroupAddon align="inline-start">
        <InputGroupButton type="button" size="${buttonSize}" variant="ghost" aria-label="Decrease"${disabled ? ' disabled' : ''}>
          ${leadingCode}
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupInput type="number" size="${size}" className="text-center"${disabled ? ' disabled' : ''}${invalid ? ' aria-invalid' : ''}${valueProp}${placeholderProp} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton type="button" size="${buttonSize}" variant="ghost" aria-label="Increase"${disabled ? ' disabled' : ''}>
          ${trailingCode}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  `,
  imports: [
    'import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"',
  ],
  id: 'input-group-stepper-filled',
  metadata: { nestable: true },
};
