// url=<QBDS_SELECT>
// source=src/components/ui/select.tsx
// component=Select
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
});

const disabled = instance.getEnum('state', {
  enabled: false,
  filled: false,
  hover: false,
  focus: false,
  open: false,
  'filled-hover': false,
  'filled-open': false,
  success: false,
  warning: false,
  error: false,
  disabled: true,
});

const status = instance.getEnum('state', {
  enabled: '',
  filled: '',
  hover: '',
  focus: '',
  open: '',
  'filled-hover': '',
  'filled-open': '',
  success: 'success',
  warning: 'warning',
  error: 'error',
  disabled: '',
});

const filled = instance.getEnum('state', {
  enabled: false,
  filled: true,
  hover: false,
  focus: false,
  open: false,
  'filled-hover': true,
  'filled-open': true,
  success: true,
  warning: true,
  error: true,
  disabled: true,
});

const placeholder = instance.getString('placeholderText');
const optionSelected = instance.getString('optionSelected');
const showLeading = instance.getBoolean('showLeadingIcon');
const showFeedback = instance.getBoolean('showFeedbackMessage');
const showFeedbackIcon = instance.getBoolean('showFeedbackIcon');

const leading = showLeading ? instance.findInstance('Leading-Icon') : null;
let leadingCode: figma.ResultSection[] = [];

if (leading && leading.type === 'INSTANCE') {
  leadingCode = leading.executeTemplate().example;
}

const statusInst = instance.findInstance('Elements/Status-Messages', {
  traverseInstances: true,
});
const statusMessage =
  statusInst && statusInst.type === 'INSTANCE'
    ? statusInst.getString('statusMessage')
    : 'Feedback message';

const menuInst = instance.findInstance('Menu/Select', {
  traverseInstances: true,
});
const menuSlot =
  menuInst && menuInst.type === 'INSTANCE'
    ? menuInst.getSlot('itemsSlot')
    : null;
const connectedItems = menuSlot?.connectedInstances ?? [];

const itemLabels = connectedItems
  .filter((node): node is figma.InstanceHandle => node.type === 'INSTANCE')
  .map(node => node.getString('Label') || node.getString('ItemLabel'))
  .filter((label): label is string => Boolean(label));

const labels =
  itemLabels.length > 0 ? itemLabels : ['Option 1', 'Option 2', 'Option 3'];

const statusClass =
  status === 'warning'
    ? '!border-status-warning focus-visible:ring-stroke-status-warning data-[popup-open]:ring-stroke-status-warning'
    : status === 'success'
      ? '!border-status-success focus-visible:ring-stroke-status-success data-[popup-open]:ring-stroke-status-success'
      : '';

const invalidProp = status === 'error' ? ' aria-invalid' : '';
const valueProp =
  filled && optionSelected ? ` defaultValue="${optionSelected}"` : '';
const triggerClassProp = statusClass ? ` className="${statusClass}"` : '';

const iconSize = size === 'lg' ? 'default' : 'sm';
const feedbackGlyph =
  status === 'error'
    ? 'cancel'
    : status === 'warning'
      ? 'error'
      : status === 'success'
        ? 'check_circle'
        : '';

const feedbackIcon =
  showFeedbackIcon && feedbackGlyph
    ? figma.code`
        <IconShell size="${iconSize}" type="custom" variant="primary" className="shrink-0 text-status-${status}" data-slot="select-feedback-icon">
          <Icon icon="${feedbackGlyph}" size="${iconSize}" />
        </IconShell>
      `
    : [];

const paragraphClass =
  size === 'sm'
    ? 'paragraph-small-primary'
    : size === 'lg'
      ? 'paragraph-large-primary'
      : 'paragraph-regular-primary';

const errorClass = `${paragraphClass} text-status-error`;
const warningClass = `${paragraphClass} text-status-warning`;
const successClass = `${paragraphClass} text-status-success`;

const selectItems = labels.map(
  label =>
    figma.code`
    <SelectItem value="${label}">
      <SelectItemText>${label}</SelectItemText>
      <SelectItemIndicator>
        <IconShell size="${iconSize}" variant="primary">
          <Icon icon="done" size="${iconSize}" />
        </IconShell>
      </SelectItemIndicator>
    </SelectItem>
  `,
);

const selectBody = figma.code`
  <Select size="${size}"${disabled ? ' disabled' : ''}${valueProp}>
    <SelectTrigger${triggerClassProp}${invalidProp}>
      ${leadingCode}
      <SelectValue placeholder="${placeholder}" />
      ${feedbackIcon}
    </SelectTrigger>
    <SelectContent>
      ${selectItems}
    </SelectContent>
  </Select>
`;

const showError = status === 'error' && showFeedback;
const showWarning = status === 'warning' && showFeedback;
const showSuccess = status === 'success' && showFeedback;

const selectImports = [
  'import { Select, SelectContent, SelectItem, SelectItemIndicator, SelectItemText, SelectTrigger, SelectValue } from "@/components/ui/select"',
  'import { Icon } from "@/components/ui/icon"',
  'import { IconShell } from "@/components/ui/icon-shell"',
];

const example = showError
  ? figma.code`
      <FieldSet className="gap-2">
        ${selectBody}
        <FieldError className="${errorClass}">${statusMessage}</FieldError>
      </FieldSet>
    `
  : showWarning
    ? figma.code`
        <FieldSet className="gap-2">
          ${selectBody}
          <FieldDescription className="${warningClass}">${statusMessage}</FieldDescription>
        </FieldSet>
      `
    : showSuccess
      ? figma.code`
          <FieldSet className="gap-2">
            ${selectBody}
            <FieldDescription className="${successClass}">${statusMessage}</FieldDescription>
          </FieldSet>
        `
      : selectBody;

const imports = showError
  ? [
      'import { FieldError, FieldSet } from "@/components/ui/field"',
      ...selectImports,
    ]
  : showWarning || showSuccess
    ? [
        'import { FieldDescription, FieldSet } from "@/components/ui/field"',
        ...selectImports,
      ]
    : selectImports;

export default {
  example,
  imports,
  id: 'select',
  metadata: { nestable: true },
};
