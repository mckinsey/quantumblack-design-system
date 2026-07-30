// url=<QBDS_RADIO_GROUP_LIST_HORIZONTAL>
// source=src/components/ui/radio-group.tsx
// component=RadioGroup
import figma from 'figma';

type ListSize = 'sm' | 'default' | 'lg';

function radioGroupLegendClass(size: ListSize) {
  return size === 'lg' ? 'label-large-primary' : 'label-regular-primary';
}

const instance = figma.selectedInstance;

const size = (instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
}) ?? 'default') as ListSize;

const density =
  instance.getEnum('density', {
    default: 'default',
    comfortable: 'comfortable',
  }) ?? 'default';

const showListLabel = instance.getBoolean('showListLabel');

const slot = instance.getSlot('itemsSlot');
const connected = slot?.connectedInstances ?? [];
const items =
  connected.length > 0
    ? connected.map(n => n.executeTemplate().example).flat()
    : figma.properties.children(['RadioGroup/Item']);

const firstItem = connected[0];
const defaultValue =
  firstItem && firstItem.type === 'INSTANCE'
    ? firstItem.getString('Label-Radio') || 'option'
    : 'option';

const listLabelNode = showListLabel
  ? instance.findInstance('Elements/Label', { traverseInstances: true })
  : null;
const listLabel =
  listLabelNode && listLabelNode.type === 'INSTANCE'
    ? listLabelNode.getString('labelField')
    : '';

const legendClass = radioGroupLegendClass(size);

export default {
  example: figma.code`
    <FieldSet>
      ${showListLabel ? figma.code`<FieldLegend variant="label" className="${legendClass} mb-3">${listLabel}</FieldLegend>` : figma.code``}
      <RadioGroup orientation="horizontal" defaultValue="${defaultValue}" density="${density}" size="${size}">
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
