// url=<QBDS_TEXTAREA>
// source=src/components/ui/textarea.tsx
// component=Textarea
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
  filled: 'filled',
  error: 'error',
  disabled: 'disabled',
});

const showLabel = instance.getBoolean('showLabel');
const showHelpText = instance.getBoolean('showHelpText');
const showHintText = instance.getBoolean('showHintText');
const showFeedback = instance.getBoolean('showFeedbackMessage');
const entryFilled = instance.getString('entryFilled');

const labelInst = instance.findInstance('Elements/Label', {
  traverseInstances: true,
});
const showCounter =
  labelInst && labelInst.type === 'INSTANCE'
    ? labelInst.getBoolean('showCounter')
    : false;
const labelField =
  labelInst && labelInst.type === 'INSTANCE'
    ? labelInst.getString('labelField')
    : 'Label';

const helpInst = instance.findInstance('Elements/Help-Text', {
  traverseInstances: true,
});
const helperText =
  helpInst && helpInst.type === 'INSTANCE'
    ? helpInst.getString('helperText')
    : 'Helper text';

const statusInst = instance.findInstance('Elements/Status-Messages', {
  traverseInstances: true,
});
const statusMessage =
  statusInst && statusInst.type === 'INSTANCE'
    ? statusInst.getString('statusMessage')
    : 'Feedback';

const counterInst = instance.findInstance('Elements/Characters-Counter', {
  traverseInstances: true,
});
const rawMax =
  counterInst && counterInst.type === 'INSTANCE'
    ? counterInst.getString('Max') || counterInst.getString('Max+1')
    : '';

const disabled = state === 'disabled';
const invalid = state === 'error';
const hasContent = state !== 'enabled';

const labelClass =
  size === 'sm'
    ? 'label-small-primary text-fg-secondary'
    : size === 'lg'
      ? 'label-large-primary text-fg-secondary'
      : 'label-regular-primary text-fg-secondary';

const descClass =
  size === 'sm'
    ? 'paragraph-small-primary text-fg-tertiary'
    : 'paragraph-regular-primary text-fg-tertiary';

const textareaProps = [
  `size="${size}"`,
  disabled ? 'disabled' : '',
  invalid ? 'aria-invalid' : '',
  hasContent ? `defaultValue="${entryFilled}"` : '',
  showHintText && !hasContent ? 'placeholder="Hint text"' : '',
]
  .filter(Boolean)
  .join(' ');

const labelRow = showLabel
  ? showCounter
    ? figma.code`
        <div className="flex items-center justify-between">
          <FieldTitle className="${labelClass}">${labelField}</FieldTitle>
          <TextareaCounter />
        </div>
      `
    : figma.code`<FieldTitle className="${labelClass}">${labelField}</FieldTitle>`
  : showCounter
    ? figma.code`<div className="flex justify-end"><TextareaCounter /></div>`
    : figma.code``;

const fieldBody = figma.code`
  <FieldSet className="gap-2">
    ${labelRow}
    <Textarea ${textareaProps} />
    ${showHelpText ? figma.code`<FieldDescription className="${descClass}">${helperText}</FieldDescription>` : figma.code``}
    ${showFeedback && invalid ? figma.code`<FieldError>${statusMessage}</FieldError>` : figma.code``}
  </FieldSet>
`;

export default {
  example: showCounter
    ? figma.code`
        <TextareaRoot maxCharacters={${Number(rawMax) || 150}} size="${size}">
          ${fieldBody}
        </TextareaRoot>
      `
    : fieldBody,
  imports: [
    'import { FieldDescription, FieldError, FieldSet, FieldTitle } from "@/components/ui/field"',
    'import { Textarea, TextareaCounter, TextareaRoot } from "@/components/ui/textarea"',
  ],
  id: 'textarea',
  metadata: { nestable: true },
};
