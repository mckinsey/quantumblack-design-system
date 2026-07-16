// url=<QBDS_RADIO_GROUP_LIST_VERTICAL>
// source=src/app/demo/[name]/ui/radio-group.tsx
// component=RadioGroupListVertical
import figma from 'figma';

type ListSize = 'sm' | 'reg' | 'lg';
type ListDensity = 'default' | 'comfortable';

const verticalLegendMb: Record<ListSize, Record<ListDensity, string>> = {
  sm: { default: 'mb-3', comfortable: 'mb-4' },
  reg: { default: 'mb-3', comfortable: 'mb-4' },
  lg: { default: 'mb-4', comfortable: 'mb-5' },
};

function listLegendMb(
  size: ListSize,
  density: ListDensity,
  orientation: 'vertical' | 'horizontal',
) {
  if (orientation === 'horizontal') {
    return 'mb-3';
  }

  return verticalLegendMb[size][density];
}

function radioGroupLegendClass(size: ListSize) {
  return size === 'lg' ? 'label-large-primary' : 'label-regular-primary';
}

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
const legendMb = listLegendMb(size, density, 'vertical');

export default {
  example: figma.code`
    <FieldSet>
      ${showListLabel ? figma.code`<FieldLegend variant="label" className="${legendClass} ${legendMb}">${listLabel}</FieldLegend>` : figma.code``}
      <RadioGroup defaultValue="option-1" density="${density}">
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
