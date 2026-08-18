// url=<QBDS_INPUT_GROUP_GHOST>
// source=src/components/ui/input-group.tsx
// component=InputGroup
// Figma Field/TextVariant-Ghost → InputGroup variant="inline" with affixes. Use input-ghost for bare inline fields.
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
const showHelpText = instance.getBoolean('showHintText');
const showFeedback = instance.getBoolean('showFeedbackMessage');

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

const statusClassName =
  state === 'warning'
    ? 'border-b-stroke-status-warning'
    : state === 'success'
      ? 'border-b-stroke-status-success'
      : '';

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

const hasStart = showLeading || showPrefix;
const hasEnd = showSuffix || showTrailing;

const startAddon = hasStart
  ? figma.code`<InputGroupAddon align="inline-start">${leadingCode}${showPrefix ? figma.code`<InputGroupText>${prefix}</InputGroupText>` : figma.code``}</InputGroupAddon>`
  : figma.code``;

const endAddon = hasEnd
  ? figma.code`<InputGroupAddon align="inline-end">${showSuffix ? figma.code`<InputGroupText>${suffix}</InputGroupText>` : figma.code``}${trailingCode}</InputGroupAddon>`
  : figma.code``;

const inputProps = [
  'variant="inline"',
  disabled ? 'disabled' : '',
  invalid ? 'aria-invalid' : '',
  isLive ? `defaultValue="${liveEntry}"` : '',
  !isLive && hasFilledValue ? `defaultValue="${entryFilled}"` : '',
  showHelpText && !hasValue ? `placeholder="${hintText}"` : '',
]
  .filter(Boolean)
  .join(' ');

const groupProps = [
  'variant="inline"',
  `size="${size}"`,
  statusClassName ? `className="${statusClassName}"` : '',
]
  .filter(Boolean)
  .join(' ');

const groupBody = figma.code`<InputGroup ${groupProps}>${startAddon}<InputGroupInput ${inputProps} />${endAddon}</InputGroup>`;

const footer =
  invalid && showFeedback
    ? figma.code`<FieldError>Feedback message</FieldError>`
    : showHelpText && !invalid
      ? figma.code`<FieldDescription>Helper text</FieldDescription>`
      : figma.code``;

const hasFooter = (invalid && showFeedback) || (showHelpText && !invalid);

const example = hasFooter
  ? figma.code`<FieldSet className="gap-2">${groupBody}${footer}</FieldSet>`
  : groupBody;

const fieldImports =
  invalid && showFeedback
    ? ['import { FieldError, FieldSet } from "@/components/ui/field"']
    : showHelpText && !invalid
      ? ['import { FieldDescription, FieldSet } from "@/components/ui/field"']
      : [];

export default {
  example,
  imports: [
    'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"',
    ...fieldImports,
  ],
  id: 'input-group-ghost',
  metadata: { nestable: true },
};
