// url=<QBDS_SELECT_GROUP_VERTICAL>
// source=src/components/ui/field.tsx
// component=FieldSet
import figma from 'figma';

type GroupSize = 'sm' | 'default' | 'lg';

const instance = figma.selectedInstance;

const size = (instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
}) ?? 'default') as GroupSize;

const showLabel = instance.getBoolean('showLabel');
const showHelperText = instance.getBoolean('showHelperText');

const labelInst = showLabel
  ? instance.findInstance('Elements/Label', { traverseInstances: true })
  : null;
const label =
  labelInst && labelInst.type === 'INSTANCE'
    ? labelInst.getString('labelField') || 'Label'
    : 'Label';

const helpInst = showHelperText
  ? instance.findInstance('Elements/Help-Text', { traverseInstances: true })
  : null;
const helperText =
  helpInst && helpInst.type === 'INSTANCE'
    ? helpInst.getString('helperText') || 'Helper text'
    : 'Helper text';

const swapName =
  size === 'sm'
    ? 'FieldSwap-sm'
    : size === 'lg'
      ? 'FieldSwap-lg'
      : 'FieldSwap-reg';

let fieldCode: figma.ResultSection[] = [];
const fieldSwap = instance.getInstanceSwap(swapName);

if (fieldSwap?.type === 'INSTANCE') {
  fieldCode = fieldSwap.executeTemplate().example;
} else {
  const field = instance.findInstance('Field');

  if (field?.type === 'INSTANCE') {
    fieldCode = field.executeTemplate().example;
  }
}

const labelClass =
  size === 'sm'
    ? 'label-small-primary text-fg-secondary'
    : size === 'lg'
      ? 'label-large-primary text-fg-secondary'
      : 'label-regular-primary text-fg-secondary';

const descClass =
  size === 'sm'
    ? 'paragraph-small-primary text-fg-tertiary'
    : size === 'lg'
      ? 'paragraph-large-primary text-fg-tertiary'
      : 'paragraph-regular-primary text-fg-tertiary';

const fallbackSelect = figma.code`
  <Select size="${size}">
    <SelectTrigger id="select" className="w-[240px]">
      <SelectValue placeholder="Choose option" />
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
`;

const selectBody = fieldCode.length > 0 ? fieldCode : fallbackSelect;

export default {
  example: figma.code`
    <FieldSet className="gap-2">
      ${showLabel ? figma.code`<FieldLabel htmlFor="select" className="${labelClass}">${label}</FieldLabel>` : figma.code``}
      ${selectBody}
      ${showHelperText ? figma.code`<FieldDescription className="${descClass}">${helperText}</FieldDescription>` : figma.code``}
    </FieldSet>
  `,
  imports: [
    'import { FieldDescription, FieldLabel, FieldSet } from "@/components/ui/field"',
    'import { Select, SelectContent, SelectItem, SelectItemText, SelectTrigger, SelectValue } from "@/components/ui/select"',
  ],
  id: 'select-group-vertical',
  metadata: { nestable: false },
};
