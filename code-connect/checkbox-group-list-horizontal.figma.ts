// url=<QBDS_CHECKBOX_GROUP_LIST_HORIZONTAL>
// source=src/components/ui/checkbox.tsx
// component=CheckboxGroup
import figma from 'figma';

type ListSize = 'sm' | 'reg' | 'lg';
type ListDensity = 'default' | 'comfortable';

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

const items = figma.properties.children(['CheckboxGroup/Item']);

const listLabelNode = instance.findInstance('Elements/Label', {
  traverseInstances: true,
});
const listLabel =
  listLabelNode && listLabelNode.type === 'INSTANCE'
    ? listLabelNode.getString('labelField')
    : 'List label';

const legendClass =
  size === 'lg'
    ? 'label-large-primary'
    : size === 'sm'
      ? 'label-small-primary'
      : 'label-regular-primary';

export default {
  example: figma.code`
    <FieldSet className="gap-0">
      <FieldLegend variant="label" className="${legendClass} mb-3">
        ${listLabel}
      </FieldLegend>
      <CheckboxGroup
        orientation="horizontal"
        defaultValue={["option-1"]}
        density="${density}">
        ${figma.helpers.react.renderChildren(items)}
      </CheckboxGroup>
    </FieldSet>
  `,
  imports: [
    'import { Field, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"',
    'import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox"',
  ],
  id: 'checkbox-group-list-horizontal',
  metadata: { nestable: false },
};
