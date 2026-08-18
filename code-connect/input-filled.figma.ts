// url=<QBDS_INPUT_FILLED>
// source=src/components/ui/input.tsx
// component=Input
// Figma Field/Text-Filled → bare Input when no slots; InputGroup when icons or clear button show.
// showTrailingButton on state=active is inferred when the variant omits the boolean; runtime focus visibility is app state (InputGroupDeleteOnFocus demo).
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

const showLeading = instance.getBoolean('showLeadingIcon');
const showTrailing = instance.getBoolean('showTrailingIcon');
const showTrailingButton = instance.getBoolean('showTrailingButton');
const showFeedbackIcon = instance.getBoolean('showFeedbackIcon');
const showFeedback = instance.getBoolean('showFeedbackMessage');
instance.getBoolean('showEntryText');
const showHintText = instance.getBoolean('showHintText');

const showClearByState = state === 'active' || state === 'open-typeahead';
const showStatusIconByState =
  (state === 'error' || state === 'warning' || state === 'success') &&
  showFeedbackIcon;
const useTrailingButton = showTrailingButton || showClearByState;
const useTrailingIcon = showTrailing || showStatusIconByState;

const placeholderText = instance.getString('placeholderText');
const placeholderActive = instance.getString('placeholderActive');
const inputActive = instance.getString('inputActive');
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
const hasSlots = showLeading || useTrailingIcon || useTrailingButton;

const statusClassName =
  state === 'warning'
    ? 'border-stroke-status-warning'
    : state === 'success'
      ? 'border-stroke-status-success'
      : '';

const valueProp = isLive
  ? figma.code` defaultValue="${inputActive}"`
  : hasFilledValue
    ? figma.code` defaultValue="${entryFilled}"`
    : figma.code``;

const placeholderProp =
  state === 'focus'
    ? figma.code` placeholder="${placeholderActive}"`
    : showHintText || !hasValue
      ? figma.code` placeholder="${placeholderText}"`
      : figma.code``;

const inputAttrs = [
  disabled ? 'disabled' : '',
  invalid ? 'aria-invalid' : '',
  isLive ? `defaultValue="${inputActive}"` : '',
  !isLive && hasFilledValue ? `defaultValue="${entryFilled}"` : '',
  state === 'focus'
    ? `placeholder="${placeholderActive}"`
    : showHintText || !hasValue
      ? `placeholder="${placeholderText}"`
      : '',
]
  .filter(Boolean)
  .join(' ');

const leading = showLeading ? instance.findInstance('Leading-Icon') : null;
let leadingCode: figma.ResultSection[] = [];

if (leading && leading.type === 'INSTANCE') {
  leadingCode = leading.executeTemplate().example;
}

const trailing = useTrailingIcon
  ? instance.findInstance('Trailing-Icon')
  : null;
let trailingCode: figma.ResultSection[] = [];

if (trailing && trailing.type === 'INSTANCE') {
  trailingCode = trailing.executeTemplate().example;
}

const trailingBtn = useTrailingButton
  ? instance.findInstance('Trailing-Button')
  : null;
let trailingBtnCode: figma.ResultSection[] = [];

if (trailingBtn && trailingBtn.type === 'INSTANCE') {
  trailingBtnCode = trailingBtn.executeTemplate().example;
}

const clearBtnFallback = figma.code`<IconShell size="sm" type="neutral" hoverable><Icon icon="backspace" /></IconShell>`;

const statusIconFallback =
  state === 'error'
    ? figma.code`<IconShell size="sm" type="custom" className="text-status-error"><Icon icon="cancel" /></IconShell>`
    : state === 'warning'
      ? figma.code`<IconShell size="sm" type="custom" className="text-status-warning"><Icon icon="info" /></IconShell>`
      : state === 'success'
        ? figma.code`<IconShell size="sm" type="custom" className="text-status-success"><Icon icon="check_circle" /></IconShell>`
        : figma.code``;

const trailingContent =
  trailingCode.length > 0
    ? trailingCode
    : showStatusIconByState
      ? statusIconFallback
      : figma.code``;

const hasTrailingContent = trailingCode.length > 0 || showStatusIconByState;

const startAddon = showLeading
  ? figma.code`<InputGroupAddon align="inline-start">${leadingCode}</InputGroupAddon>`
  : figma.code``;

const endAddon = useTrailingButton
  ? figma.code`<InputGroupAddon align="inline-end"><InputGroupButton type="button" size="icon-xs" variant="ghost" aria-label="Clear entered text">${trailingBtnCode.length > 0 ? trailingBtnCode : clearBtnFallback}</InputGroupButton></InputGroupAddon>`
  : useTrailingIcon && hasTrailingContent
    ? figma.code`<InputGroupAddon align="inline-end">${trailingContent}</InputGroupAddon>`
    : figma.code``;

const groupProps = [
  `size="${size}"`,
  statusClassName ? `className="${statusClassName}"` : '',
]
  .filter(Boolean)
  .join(' ');

const groupBody = figma.code`<InputGroup ${groupProps}>${startAddon}<InputGroupInput ${inputAttrs} />${endAddon}</InputGroup>`;

const footer =
  invalid && showFeedback
    ? figma.code`<FieldError>Feedback message</FieldError>`
    : showHintText && !invalid
      ? figma.code`<FieldDescription>Helper text</FieldDescription>`
      : figma.code``;

const hasFooter = (invalid && showFeedback) || (showHintText && !invalid);

const slottedExample = hasFooter
  ? figma.code`<FieldSet className="gap-2">${groupBody}${footer}</FieldSet>`
  : groupBody;

const bareStatusClass =
  state === 'warning'
    ? ' className="border-stroke-status-warning"'
    : state === 'success'
      ? ' className="border-stroke-status-success"'
      : '';

const bareExample = figma.code`<Input size="${size}"${disabled ? ' disabled' : ''}${invalid ? ' aria-invalid' : ''}${valueProp}${placeholderProp}${bareStatusClass} />`;

const example = hasSlots ? slottedExample : bareExample;

const fieldImports =
  hasSlots && invalid && showFeedback
    ? ['import { FieldError, FieldSet } from "@/components/ui/field"']
    : hasSlots && showHintText && !invalid
      ? ['import { FieldDescription, FieldSet } from "@/components/ui/field"']
      : [];

const groupImports = hasSlots
  ? [
      'import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"',
      ...(useTrailingButton && trailingBtnCode.length === 0
        ? [
            'import { Icon } from "@/components/ui/icon"',
            'import { IconShell } from "@/components/ui/icon-shell"',
          ]
        : []),
      ...(useTrailingIcon && trailingCode.length === 0 && showStatusIconByState
        ? [
            'import { Icon } from "@/components/ui/icon"',
            'import { IconShell } from "@/components/ui/icon-shell"',
          ]
        : []),
      ...fieldImports,
    ]
  : ['import { Input } from "@/components/ui/input"'];

export default {
  example,
  imports: groupImports,
  id: 'input-filled',
  metadata: { nestable: true },
};
