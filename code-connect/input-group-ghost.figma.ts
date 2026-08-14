// url=<QBDS_INPUT_GROUP_GHOST>
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

const showLeading = instance.getBoolean('showLeadingIcon');
const showTrailing = instance.getBoolean('showTrailingIcon');
const showPrefix = instance.getBoolean('showPrefix');
const showSuffix = instance.getBoolean('showSuffix');
const showHintText = instance.getBoolean('showHintText');
instance.getBoolean('showFeedbackMessage');

const prefix = instance.getString('prefixEntry');
const suffix = instance.getString('suffixEntry');
const hintText = instance.getString('hintText');
const entryFilled = instance.getString('entryFilled');
const liveEntry = instance.getString('liveEntry');

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
    ? ' className="!border-b-status-warning !border-b"'
    : state === 'success'
      ? ' className="!border-b-status-success !border-b"'
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

const leading = showLeading ? instance.findInstance('Leading-Icon') : null;
let leadingCode: figma.ResultSection[] = [];

if (leading && leading.type === 'INSTANCE') {
  leadingCode = leading.executeTemplate().example;
}

const trailing = showTrailing ? instance.findInstance('Trailing-Icon') : null;
let trailingCode: figma.ResultSection[] = [];

if (trailing && trailing.type === 'INSTANCE') {
  trailingCode = trailing.executeTemplate().example;
}

const leadingAddon = showLeading
  ? figma.code`
    <InputGroupAddon align="inline-start">
      ${leadingCode}
    </InputGroupAddon>
  `
  : figma.code``;

const prefixAddon = showPrefix
  ? figma.code`
    <InputGroupAddon align="inline-start">
      <InputGroupText>${prefix}</InputGroupText>
    </InputGroupAddon>
  `
  : figma.code``;

const suffixAddon = showSuffix
  ? figma.code`
    <InputGroupAddon align="inline-end">
      <InputGroupText>${suffix}</InputGroupText>
    </InputGroupAddon>
  `
  : figma.code``;

const trailingAddon = showTrailing
  ? figma.code`
    <InputGroupAddon align="inline-end">
      ${trailingCode}
    </InputGroupAddon>
  `
  : figma.code``;

export default {
  example: figma.code`
    <InputGroup variant="inline" size="${size}"${statusClass}>
      ${leadingAddon}
      ${prefixAddon}
      <InputGroupInput variant="inline" size="${size}"${disabled ? ' disabled' : ''}${invalid ? ' aria-invalid' : ''}${valueProp}${placeholderProp} />
      ${suffixAddon}
      ${trailingAddon}
    </InputGroup>
  `,
  imports: [
    'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"',
  ],
  id: 'input-group-ghost',
  metadata: { nestable: true },
};
