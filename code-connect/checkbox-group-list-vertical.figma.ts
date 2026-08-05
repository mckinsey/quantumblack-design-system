// url=<QBDS_CHECKBOX_GROUP_LIST_VERTICAL>
// source=src/components/ui/checkbox.tsx
// component=CheckboxGroup
import figma from 'figma';

type ListSize = 'sm' | 'default' | 'lg';
type ListDensity = 'default' | 'comfortable';

const verticalLegendMb: Record<ListSize, Record<ListDensity, string>> = {
  sm: { default: 'mb-3', comfortable: 'mb-4' },
  default: { default: 'mb-3', comfortable: 'mb-4' },
  lg: { default: 'mb-4', comfortable: 'mb-5' },
};

const itemStackGap: Record<ListSize, Record<ListDensity, string>> = {
  sm: { default: 'gap-2', comfortable: 'gap-3' },
  default: { default: 'gap-3', comfortable: 'gap-4' },
  lg: { default: 'gap-3', comfortable: 'gap-4' },
};

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

const showHeader = instance.getBoolean('showHeaderParentCheckbox');

const slot = instance.getSlot('itemsSlot');
const connected = slot?.connectedInstances ?? [];
const items =
  connected.length > 0
    ? connected.flatMap(n => n.executeTemplate().example)
    : figma.properties.children(['CheckboxGroup/Item']);

const allValues = connected.map((n, i) => {
  if (n.type !== 'INSTANCE') {
    return `option-${i + 1}`;
  }

  return n.getString('ListItem-Label') || `option-${i + 1}`;
});

const defaultValue = connected
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

    return type === 'checked' || type === 'indeterminate' ? allValues[i] : null;
  })
  .filter((v): v is string => Boolean(v));

const allValuesLit =
  allValues.length > 0 ? `[${allValues.map(v => `"${v}"`).join(', ')}]` : '';
const defaultValueLit =
  defaultValue.length > 0
    ? `[${defaultValue.map(v => `"${v}"`).join(', ')}]`
    : '';

const listLabelNode = instance.findInstance('Elements/Label', {
  traverseInstances: true,
});
const listLabel =
  listLabelNode && listLabelNode.type === 'INSTANCE'
    ? listLabelNode.getString('labelField')
    : '';

const legendClass =
  size === 'lg'
    ? 'label-large-primary'
    : size === 'sm'
      ? 'label-small-primary'
      : 'label-regular-primary';
const legendMb = verticalLegendMb[size][density];
const checkboxSize = size === 'lg' ? 'lg' : 'default';
const labelClass =
  size === 'lg'
    ? 'text-fg-secondary paragraph-large-primary'
    : size === 'sm'
      ? 'text-fg-secondary paragraph-small-primary'
      : 'text-fg-secondary paragraph-regular-primary';
const densityGap = itemStackGap[size][density];

const parentItem = showHeader
  ? instance.findInstance('CheckboxGroup/Item', { path: ['Parent_Checkbox'] })
  : null;

const parentLabel =
  parentItem && parentItem.type === 'INSTANCE'
    ? parentItem.getString('ListItem-Label')
    : '';

const parentShowCount =
  parentItem && parentItem.type === 'INSTANCE'
    ? parentItem.getBoolean('showItemCount')
    : false;

const parentItemCount =
  parentItem && parentItem.type === 'INSTANCE'
    ? parentItem.getString('itemCount')
    : '';

const parentCountNode = parentShowCount
  ? figma.code`<span className="${labelClass} shrink-0" aria-hidden>${parentItemCount}</span>`
  : figma.code``;

const headerNode = showHeader
  ? figma.code`
    <div className="flex w-full flex-col ${densityGap}">
      <Field orientation="horizontal" className="w-full items-center gap-2">
        <FieldLabel
          className="${labelClass} flex min-w-0 flex-1 cursor-pointer items-center gap-2">
          <Checkbox size="${checkboxSize}" parent />
          <span className="min-w-0 flex-1">${parentLabel}</span>
        </FieldLabel>
        ${parentCountNode}
      </Field>
      <div
        className="border-stroke-divider flex h-2 w-full flex-col"
        role="separator"
        aria-orientation="horizontal">
        <div className="border-stroke-divider h-1 w-full border-b" />
        <div className="h-1 w-full" />
      </div>
    </div>
  `
  : figma.code``;

export default {
  example: figma.code`
    <FieldSet className="gap-0">
      <FieldLegend variant="label" className="${legendClass} ${legendMb}">
        ${listLabel}
      </FieldLegend>
      <CheckboxGroup
        ${allValuesLit ? figma.code`allValues={${allValuesLit}}` : figma.code``}
        ${defaultValueLit ? figma.code`defaultValue={${defaultValueLit}}` : figma.code``}
        density="${density}"
        size="${size}">
        ${headerNode}
        <div className="flex w-full flex-col ${densityGap}">
          ${figma.helpers.react.renderChildren(items)}
        </div>
      </CheckboxGroup>
    </FieldSet>
  `,
  imports: [
    'import { Field, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"',
    'import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox"',
  ],
  id: 'checkbox-group-list-vertical',
  metadata: { nestable: false },
};
