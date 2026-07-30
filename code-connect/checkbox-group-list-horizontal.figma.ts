// url=<QBDS_CHECKBOX_GROUP_LIST_HORIZONTAL>
// source=src/components/ui/checkbox.tsx
// component=CheckboxGroup
import figma from 'figma';

type ListSize = 'sm' | 'default' | 'lg';

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

const slot = instance.getSlot('itemsSlot');
const connected = slot?.connectedInstances ?? [];
const items =
  connected.length > 0
    ? connected.flatMap(n => n.executeTemplate().example)
    : figma.properties.children(['CheckboxGroup/Item']);

const values = connected.map((n, i) => {
  if (n.type !== 'INSTANCE') {
    return `option-${i + 1}`;
  }

  return n.getString('ListItem-Label') || `option-${i + 1}`;
});

const selected = connected
  .map((n, i) => {
    if (n.type !== 'INSTANCE') {
      return null;
    }

    const type =
      n.getEnum('type', {
        unchecked: 'unchecked',
        checked: 'checked',
        indeterminate: 'indeterminate',
      }) ?? 'unchecked';

    return type === 'checked' || type === 'indeterminate' ? values[i] : null;
  })
  .filter((v): v is string => Boolean(v));

const defaultValue =
  selected.length > 0
    ? selected
    : values.length > 0
      ? [values[0]]
      : ['option-1'];

const defaultValueLit = `[${defaultValue.map(v => `"${v}"`).join(', ')}]`;

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
        defaultValue={${defaultValueLit}}
        density="${density}"
        size="${size}">
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
