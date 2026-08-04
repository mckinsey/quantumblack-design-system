// url=<QBDS_SELECT_GROUP_HORIZONTAL>
// source=src/components/ui/field.tsx
// component=Field
import figma from 'figma';

type GroupSize = 'sm' | 'default' | 'lg';

function labelClass(size: GroupSize) {
  if (size === 'sm') {
    return 'label-small-primary text-fg-secondary shrink-0';
  }

  if (size === 'lg') {
    return 'label-large-primary text-fg-secondary shrink-0';
  }

  return 'label-regular-primary text-fg-secondary shrink-0';
}

const instance = figma.selectedInstance;

const size = (instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
}) ?? 'default') as GroupSize;

const showLabel = instance.getBoolean('showLabel');

const swapName =
  size === 'sm'
    ? 'FieldSwap-sm'
    : size === 'lg'
      ? 'FieldSwap-lg'
      : 'FieldSwap-reg';

const fieldSwap = instance.getInstanceSwap(swapName);
let fieldCode: figma.ResultSection[] = [];

if (fieldSwap && fieldSwap.type === 'INSTANCE') {
  fieldCode = fieldSwap.executeTemplate().example;
}

const labelNode = showLabel
  ? instance.findInstance('Elements/Label', { traverseInstances: true })
  : null;

const labelText =
  labelNode && labelNode.type === 'INSTANCE'
    ? labelNode.getString('labelField')
    : '';

const titleClass = labelClass(size);

export default {
  example: figma.code`
    <Field orientation="horizontal" className="w-fit items-center gap-3">
      ${
        showLabel
          ? figma.code`<FieldLabel htmlFor="select" className="${titleClass}">${labelText}</FieldLabel>`
          : figma.code``
      }
      ${fieldCode}
    </Field>
  `,
  imports: [
    'import { Field, FieldLabel } from "@/components/ui/field"',
    'import { Select, SelectContent, SelectItem, SelectItemText, SelectTrigger, SelectValue } from "@/components/ui/select"',
  ],
  id: 'select-group-horizontal',
  metadata: { nestable: false },
};
