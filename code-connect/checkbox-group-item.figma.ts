// url=<QBDS_CHECKBOX_GROUP_ITEM>
// source=src/components/ui/checkbox.tsx
// component=Checkbox
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'sm',
  reg: 'reg',
  lg: 'lg',
});

const type = instance.getEnum('type', {
  unchecked: 'unchecked',
  checked: 'checked',
  indeterminate: 'indeterminate',
});

const disabled = instance.getEnum('state', {
  enabled: false,
  focused: false,
  disabled: true,
});

const showItemCount = instance.getBoolean('showItemCount');
const label = instance.getString('ListItem-Label');
const itemCount = instance.getString('itemCount');

const checkboxSize = size === 'lg' ? 'lg' : 'default';
const labelTone = disabled ? 'text-fg-disabled' : 'text-fg-secondary';
const labelClass =
  size === 'lg'
    ? `${labelTone} paragraph-large-primary`
    : size === 'sm'
      ? `${labelTone} paragraph-small-primary`
      : `${labelTone} paragraph-regular-primary`;

const checkedProp =
  type === 'checked'
    ? ' defaultChecked'
    : type === 'indeterminate'
      ? ' defaultChecked="indeterminate"'
      : '';

const disabledProp = disabled ? ' disabled' : '';

const countNode = showItemCount
  ? figma.code`<span className="${labelClass}" aria-hidden>${itemCount}</span>`
  : figma.code``;

export default {
  example: figma.code`
    <Field orientation="horizontal" className="gap-2">
      <FieldLabel
        className="${labelClass} flex min-w-0 flex-1 cursor-pointer items-center gap-2">
        <Checkbox size="${checkboxSize}" value="checkbox-item"${checkedProp}${disabledProp} />
        <span className="min-w-0 flex-1">${label}</span>
      </FieldLabel>
      ${countNode}
    </Field>
  `,
  imports: [
    'import { Field, FieldLabel } from "@/components/ui/field"',
    'import { Checkbox } from "@/components/ui/checkbox"',
  ],
  id: 'checkbox-group-item',
  metadata: { nestable: true },
};
