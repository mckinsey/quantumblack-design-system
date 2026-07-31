// url=<QBDS_SELECT_MULTI_GHOST>
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

const showWrap = instance.getEnum('state', {
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
const showFeedback = instance.getBoolean('showFeedbackMessage');
const showHint = instance.getBoolean('showHintText');

const statusInst = instance.findInstance('Elements/Status-Messages', {
  traverseInstances: true,
});
const statusMessage =
  statusInst && statusInst.type === 'INSTANCE'
    ? statusInst.getString('statusMessage')
    : 'Feedback message';

function textProp(node: figma.InstanceHandle, ...names: string[]) {
  for (const name of names) {
    const value = node.getString(name);

    if (typeof value === 'string' && value) {
      return value;
    }
  }

  return '';
}

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

const menu = instance.findInstance('Menu/Select', { traverseInstances: true });
const menuSlot =
  menu && menu.type === 'INSTANCE' ? menu.getSlot('itemsSlot') : null;
const menuConnected = menuSlot?.connectedInstances ?? [];

const menuItemInsts =
  menuConnected.length > 0
    ? menuConnected.filter(
        (node): node is figma.InstanceHandle => node.type === 'INSTANCE',
      )
    : instance
        .findLayers(
          node => node.type === 'INSTANCE' && node.name === 'MenuItem/Select',
          { traverseInstances: true },
        )
        .filter(
          (node): node is figma.InstanceHandle => node.type === 'INSTANCE',
        );

const optionSnippets = menuItemInsts.flatMap((item, i) => {
  const label = textProp(item, 'Label', 'ItemLabel') || `Option ${i + 1}`;
  const valueKey = `option-${i + 1}`;

  return [
    figma.code`
      <SelectItem value="${valueKey}">
        <SelectItemText>${label}</SelectItemText>
      </SelectItem>
    `,
  ];
});

const statusClass =
  validationState === 'warning'
    ? '!border-b-status-warning'
    : validationState === 'success'
      ? '!border-b-status-success'
      : '';

const wrapClass = showWrap
  ? 'h-auto min-h-9 whitespace-normal *:data-[slot=select-value]:line-clamp-none *:data-[slot=select-value]:overflow-visible *:data-[slot=select-value]:whitespace-normal'
  : '';

const triggerClass = [wrapClass, statusClass].filter(Boolean).join(' ');
const invalidProp = validationState === 'error' ? ' aria-invalid' : '';
const placeholderProp = showHint ? ` placeholder="${placeholder}"` : '';

const iconSize = size === 'lg' ? 'default' : 'sm';
const feedbackGlyph =
  validationState === 'error'
    ? 'cancel'
    : validationState === 'warning'
      ? 'error'
      : validationState === 'success'
        ? 'check_circle'
        : '';

const feedbackIcon = feedbackGlyph
  ? figma.code`
      <IconShell size="${iconSize}" type="custom" variant="primary" className="shrink-0 text-status-${validationState}" data-slot="select-feedback-icon">
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

const showSummary = showCounter && !showTags && Boolean(optionSelected);
const summaryCode = showSummary
  ? figma.code`
      <span>${optionSelected}</span>
    `
  : [];

const value =
  valueCode.length > 0 || showSummary
    ? figma.code`
        <SelectValue${placeholderProp}>
          ${valueCode}
          ${summaryCode}
        </SelectValue>
      `
    : figma.code`
        <SelectValue${placeholderProp} />
      `;

const selectContent =
  optionSnippets.length > 0
    ? figma.code`
        <SelectContent>
          ${optionSnippets}
        </SelectContent>
      `
    : figma.code`
        <SelectContent />
      `;

const selectBody = figma.code`
  <Select multiple size="${size}"${disabled ? ' disabled' : ''}>
    <SelectTrigger variant="inline"${triggerClass ? ` className="${triggerClass}"` : ''}${invalidProp}>
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
  id: 'select-multi-ghost',
  metadata: { nestable: true },
};
