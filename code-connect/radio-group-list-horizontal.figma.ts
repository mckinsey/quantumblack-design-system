// url=<QBDS_RADIO_GROUP_LIST_HORIZONTAL>
// source=src/app/demo/[name]/ui/radio-group.tsx
// component=RadioGroupListHorizontal
import figma from 'figma';

import {
  type ListDensity,
  type ListSize,
  listFieldSetGap,
  radioGroupLegendClass,
} from '@/lib/radio-group-list';

const instance = figma.selectedInstance;

const size = (instance.getEnum('size', {
  sm: 'sm',
  reg: 'reg',
  lg: 'lg',
}) ?? 'reg') as ListSize;

const density = (instance.getEnum('density', {
  default: 'default',
  comfortable: 'comfortable',
}) ?? 'default') as ListDensity;

const showListLabel = instance.getBoolean('showListLabel');
const items = figma.properties.children(['RadioGroup/Item']);

const listLabelNode = showListLabel
  ? instance.findInstance('Elements/Label', { traverseInstances: true })
  : null;
const listLabel =
  listLabelNode && listLabelNode.type === 'INSTANCE'
    ? listLabelNode.getString('labelField')
    : '';

const legendClass = radioGroupLegendClass(size);
const fieldSetGap = listFieldSetGap(size, density, 'horizontal');

export default {
  example: figma.code`
    <FieldSet className="${fieldSetGap}">
      ${showListLabel ? figma.code`<FieldLegend variant="label" className="${legendClass}">${listLabel}</FieldLegend>` : figma.code``}
      <RadioGroup orientation="horizontal" defaultValue="option-1" density="${density}">
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
