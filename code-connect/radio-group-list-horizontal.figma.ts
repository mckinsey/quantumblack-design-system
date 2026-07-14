// url=<QBDS_RADIO_GROUP_LIST_HORIZONTAL>
// source=src/app/demo/[name]/ui/radio-group.tsx
// component=RadioGroupListHorizontal
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'sm',
  reg: 'reg',
  lg: 'lg',
});

const density = instance.getEnum('density', {
  default: 'default',
  comfortable: 'comfortable',
});

const showListLabel = instance.getBoolean('showListLabel');
const items = figma.properties.children(['RadioGroup/Item']);

const legendClass =
  size === 'lg' ? 'label-large-primary mb-1' : 'label-regular-primary mb-1';
const groupGap =
  density === 'comfortable' ? 'flex flex-row gap-4' : 'flex flex-row gap-3';

export default {
  example: figma.code`
    <FieldSet>
      ${showListLabel ? figma.code`<FieldLegend variant="label" className="${legendClass}">Options</FieldLegend>` : figma.code``}
      <RadioGroup orientation="horizontal" defaultValue="option-1" className="${groupGap}">
        ${figma.helpers.react.renderChildren(items)}
      </RadioGroup>
    </FieldSet>
  `,
  imports: [
    'import { FieldLegend, FieldSet } from "@/components/ui/field"',
    'import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"',
  ],
  id: 'radio-group-list-horizontal',
  metadata: { nestable: false },
};
