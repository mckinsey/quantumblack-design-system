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

const placeholder = instance.getString('placeholderText');
const showLeading = instance.getBoolean('showLeadingIcon');

const leading = showLeading ? instance.findInstance('Leading-Icon') : null;
let leadingCode: figma.ResultSection[] = [];

if (leading && leading.type === 'INSTANCE') {
  leadingCode = leading.executeTemplate().example;
}

const tagCode = showTags
  ? instance
      .findConnectedInstances(
        node =>
          node.name === 'Tag-Dismissable' || node.name === 'Badge/Numeric',
        { traverseInstances: true },
      )
      .filter((node): node is figma.InstanceHandle => node.type === 'INSTANCE')
      .map(child => child.executeTemplate().example)
      .flat()
  : [];

const badge =
  showCounter && tagCode.length === 0
    ? instance.findInstance('Badge/Numeric', { traverseInstances: true })
    : null;
let badgeCode: figma.ResultSection[] = [];

if (badge && badge.type === 'INSTANCE') {
  badgeCode = badge.executeTemplate().example;
}

const statusClass =
  validationState === 'warning'
    ? ' !border-status-warning'
    : validationState === 'success'
      ? ' !border-status-success'
      : '';

const invalidProp = validationState === 'error' ? ' aria-invalid' : '';

const valueChildren =
  tagCode.length > 0 ? tagCode : badgeCode.length > 0 ? badgeCode : null;

const value = valueChildren
  ? figma.code`
        <SelectValue placeholder="${placeholder}">
          ${valueChildren}
        </SelectValue>
      `
  : showCounter
    ? figma.code`
        <SelectValue placeholder="${placeholder}">
          <NumericBadge size="sm" variant="primary">2</NumericBadge>
          <span>items selected</span>
        </SelectValue>
      `
    : figma.code`
        <SelectValue placeholder="${placeholder}" />
      `;

export default {
  example: figma.code`
    <Select multiple size="${size}"${disabled ? ' disabled' : ''}>
      <SelectTrigger className="w-[280px]${statusClass}"${invalidProp}>
        ${leadingCode}
        ${value}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option-1">
          <SelectItemText>Option 1</SelectItemText>
        </SelectItem>
        <SelectItem value="option-2">
          <SelectItemText>Option 2</SelectItemText>
        </SelectItem>
        <SelectItem value="option-3">
          <SelectItemText>Option 3</SelectItemText>
        </SelectItem>
      </SelectContent>
    </Select>
  `,
  imports: [
    'import { NumericBadge } from "@/components/ui/badge"',
    'import { Select, SelectContent, SelectItem, SelectItemText, SelectTrigger, SelectValue } from "@/components/ui/select"',
  ],
  id: 'select-multi',
  metadata: { nestable: true },
};
