// url=<QBDS_SELECT_MULTI>
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
  hover: false,
  focus: false,
  'open-counter': false,
  'filled-counter': false,
  'open-tags-with-counter': false,
  'filled-tags-with-counter': false,
  'open-tags-wrap': false,
  'filled-tags-wrap': false,
  success: false,
  warning: false,
  error: false,
  disabled: true,
});

const validationState = instance.getEnum('state', {
  enabled: '',
  hover: '',
  focus: '',
  'open-counter': '',
  'filled-counter': '',
  'open-tags-with-counter': '',
  'filled-tags-with-counter': '',
  'open-tags-wrap': '',
  'filled-tags-wrap': '',
  success: 'success',
  warning: 'warning',
  error: 'error',
  disabled: '',
});

const showCounter = instance.getEnum('state', {
  enabled: false,
  hover: false,
  focus: false,
  'open-counter': true,
  'filled-counter': true,
  'open-tags-with-counter': true,
  'filled-tags-with-counter': true,
  'open-tags-wrap': false,
  'filled-tags-wrap': false,
  success: false,
  warning: false,
  error: false,
  disabled: false,
});

const showTags = instance.getEnum('state', {
  enabled: false,
  hover: false,
  focus: false,
  'open-counter': false,
  'filled-counter': false,
  'open-tags-with-counter': true,
  'filled-tags-with-counter': true,
  'open-tags-wrap': true,
  'filled-tags-wrap': true,
  success: false,
  warning: false,
  error: false,
  disabled: false,
});

const tagsWrap = instance.getEnum('state', {
  enabled: false,
  hover: false,
  focus: false,
  'open-counter': false,
  'filled-counter': false,
  'open-tags-with-counter': false,
  'filled-tags-with-counter': false,
  'open-tags-wrap': true,
  'filled-tags-wrap': true,
  success: false,
  warning: false,
  error: false,
  disabled: false,
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

function connectedExamples(
  nodes: figma.InstanceHandle[],
): figma.ResultSection[] {
  return nodes
    .filter((node): node is figma.InstanceHandle => node.type === 'INSTANCE')
    .map(child => child.executeTemplate().example)
    .flat();
}

const tagsSlot = showTags ? instance.getSlot('tagsSlot') : null;
const slotConnected = tagsSlot?.connectedInstances ?? [];
let valueCode: figma.ResultSection[] = [];

if (slotConnected.length > 0) {
  valueCode = connectedExamples(
    slotConnected.filter(
      (node): node is figma.InstanceHandle => node.type === 'INSTANCE',
    ),
  );
}

if (valueCode.length === 0 && (showTags || showCounter)) {
  valueCode = connectedExamples(
    instance
      .findConnectedInstances(
        node =>
          node.name === 'Tag-Dismissable' || node.name === 'Badge/Numeric',
        { traverseInstances: true },
      )
      .filter((node): node is figma.InstanceHandle => node.type === 'INSTANCE'),
  );
}

const showSummary = showCounter && !showTags && Boolean(optionSelected);
const summaryCode = showSummary
  ? figma.code`
      <span>${optionSelected}</span>
    `
  : [];

const iconSize = size === 'lg' ? 'default' : 'sm';
const feedbackGlyph =
  validationState === 'error'
    ? 'cancel'
    : validationState === 'warning'
      ? 'error'
      : validationState === 'success'
        ? 'check_circle'
        : '';

const feedbackIcon =
  showFeedbackIcon && feedbackGlyph
    ? figma.code`
        <IconShell size="${iconSize}" type="custom" variant="primary" className="shrink-0 text-status-${validationState}" data-slot="select-feedback-icon">
          <Icon icon="${feedbackGlyph}" size="${iconSize}" />
        </IconShell>
      `
    : [];

const statusClass =
  validationState === 'warning'
    ? '!border-status-warning'
    : validationState === 'success'
      ? '!border-status-success'
      : '';

const wrapClass = tagsWrap
  ? 'h-auto min-h-9 whitespace-normal *:data-[slot=select-value]:line-clamp-none *:data-[slot=select-value]:overflow-visible *:data-[slot=select-value]:whitespace-normal'
  : '';

const triggerClass = [wrapClass, statusClass].filter(Boolean).join(' ');
const triggerClassProp = triggerClass ? ` className="${triggerClass}"` : '';
const invalidProp = validationState === 'error' ? ' aria-invalid' : '';

const errorClass =
  size === 'sm'
    ? 'paragraph-small-primary text-status-error'
    : size === 'lg'
      ? 'paragraph-large-primary text-status-error'
      : 'paragraph-regular-primary text-status-error';

const value =
  valueCode.length > 0 || showSummary
    ? figma.code`
        <SelectValue placeholder="${placeholder}">
          ${valueCode}
          ${summaryCode}
        </SelectValue>
      `
    : figma.code`
        <SelectValue placeholder="${placeholder}" />
      `;

const menu = instance.findInstance('Menu/Select', { traverseInstances: true });
const menuSlot =
  menu && menu.type === 'INSTANCE' ? menu.getSlot('itemsSlot') : null;
const menuConnected = menuSlot?.connectedInstances ?? [];

const selectItems =
  menuConnected.length > 0
    ? menuConnected
        .filter(
          (node): node is figma.InstanceHandle => node.type === 'INSTANCE',
        )
        .map((node, i) => {
          const label = node.getString('Label') || `Option ${i + 1}`;
          const valueKey = `option-${i + 1}`;

          return figma.code`
            <SelectItem value="${valueKey}">
              <SelectItemText>${label}</SelectItemText>
            </SelectItem>
          `;
        })
        .flat()
    : [];

const selectContent =
  selectItems.length > 0
    ? figma.code`
        <SelectContent>
          ${selectItems}
        </SelectContent>
      `
    : figma.code`
        <SelectContent />
      `;

const selectBody = figma.code`
  <Select multiple size="${size}"${disabled ? ' disabled' : ''}>
    <SelectTrigger${triggerClassProp}${invalidProp}>
      ${leadingCode}
      ${value}
      ${feedbackIcon}
    </SelectTrigger>
    ${selectContent}
  </Select>
`;

const showError = validationState === 'error' && showFeedback;

const selectImports = [
  'import { Select, SelectContent, SelectItem, SelectItemText, SelectTrigger, SelectValue } from "@/components/ui/select"',
];

if (showFeedbackIcon && feedbackGlyph) {
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
  id: 'select-multi',
  metadata: { nestable: true },
};
