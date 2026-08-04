// url=<QBDS_SELECT_GHOST>
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
const optionSelected = instance.getString('optionSelected') || 'Option 2';
const showLeading = instance.getBoolean('showLeadingIcon');
const showHint = instance.getBoolean('showHintText');
const showFeedback = instance.getBoolean('showFeedbackMessage');

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

const menuItems = instance
  .findConnectedInstances(node => node.name === 'MenuItem/Select', {
    traverseInstances: true,
  })
  .filter((node): node is figma.InstanceHandle => node.type === 'INSTANCE');

let itemLabels =
  menuItems.length > 0
    ? menuItems.map(item => item.getString('Label') || 'Option')
    : [optionSelected];

if (filled && !itemLabels.includes(optionSelected)) {
  itemLabels = [optionSelected, ...itemLabels];
}

const itemSections = itemLabels.map(
  label => figma.code`
      <SelectItem value="${label}">
        <SelectItemText>${label}</SelectItemText>
      </SelectItem>
    `,
);

const statusClass =
  status === 'warning'
    ? '!border-b-status-warning'
    : status === 'success'
      ? '!border-b-status-success'
      : '';

const triggerClassProp = statusClass ? ` className="${statusClass}"` : '';
const invalidProp = status === 'error' ? ' aria-invalid' : '';
const valueProp = filled ? ` defaultValue="${optionSelected}"` : '';
const placeholderProp = showHint ? ` placeholder="${placeholder}"` : '';

const iconSize = size === 'lg' ? 'default' : 'sm';
const feedbackGlyph =
  status === 'error'
    ? 'cancel'
    : status === 'warning'
      ? 'error'
      : status === 'success'
        ? 'check_circle'
        : '';

const feedbackIcon = feedbackGlyph
  ? figma.code`
        <IconShell size="${iconSize}" type="custom" variant="primary" className="shrink-0 text-status-${status}" data-slot="select-feedback-icon">
          <Icon icon="${feedbackGlyph}" size="${iconSize}" />
        </IconShell>
      `
  : [];

const errorClass =
  size === 'sm'
    ? 'paragraph-small-primary text-status-error'
    : size === 'lg'
      ? 'paragraph-large-primary text-status-error'
      : 'paragraph-regular-primary text-status-error';

const selectBody = figma.code`
  <Select size="${size}"${disabled ? ' disabled' : ''}${valueProp}>
    <SelectTrigger variant="inline"${triggerClassProp}${invalidProp}>
      ${leadingCode}
      <SelectValue${placeholderProp} />
      ${feedbackIcon}
    </SelectTrigger>
    <SelectContent>
      ${itemSections}
    </SelectContent>
  </Select>
`;

const showError = status === 'error' && showFeedback;
const selectImports = [
  'import { Select, SelectContent, SelectItem, SelectItemText, SelectTrigger, SelectValue } from "@/components/ui/select"',
];

if (feedbackGlyph) {
  selectImports.unshift(
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
  );
}

export default {
  example: showError
    ? figma.code`
        <FieldSet className="gap-2">
          ${selectBody}
          <FieldError className="${errorClass}">${statusMessage}</FieldError>
        </FieldSet>
      `
    : selectBody,
  imports: showError
    ? [
        'import { FieldError, FieldSet } from "@/components/ui/field"',
        ...selectImports,
      ]
    : selectImports,
  id: 'select-ghost',
  metadata: { nestable: true },
};
