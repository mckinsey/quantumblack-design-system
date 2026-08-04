// url=<QBDS_RADIO_GROUP_LIST_VERTICAL>
// source=src/components/ui/radio-group.tsx
// component=RadioGroup
import figma from 'figma';

type ListSize = 'sm' | 'default' | 'lg';
type ListDensity = 'default' | 'comfortable';

const verticalLegendMb: Record<ListSize, Record<ListDensity, string>> = {
  sm: { default: 'mb-3', comfortable: 'mb-4' },
  default: { default: 'mb-3', comfortable: 'mb-4' },
  lg: { default: 'mb-4', comfortable: 'mb-5' },
};

function listLegendMb(size: ListSize, density: ListDensity) {
  return verticalLegendMb[size][density];
}

function radioGroupLegendClass(size: ListSize) {
  return size === 'lg' ? 'label-large-primary' : 'label-regular-primary';
}

const instance = figma.selectedInstance;

const size = (instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
}) ?? 'default') as ListSize;

const density = (instance.getEnum('density', {
  default: 'default',
  comfortable: 'comfortable',
}) ?? 'default') as ListDensity;

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
const legendMb = listLegendMb(size, density);

export default {
  example: figma.code`
    <FieldSet>
      ${showListLabel ? figma.code`<FieldLegend variant="label" className="${legendClass} ${legendMb}">${listLabel}</FieldLegend>` : figma.code``}
      <RadioGroup defaultValue="${defaultValue}" density="${density}" size="${size}">
        ${figma.helpers.react.renderChildren(items)}
      </RadioGroup>
    </FieldSet>
  `,
  imports: [
    'import { FieldLegend, FieldSet } from "@/components/ui/field"',
    'import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"',
  ],
  id: 'radio-group-list-vertical',
  metadata: { nestable: false },
};
