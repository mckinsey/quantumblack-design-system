// url=<QBDS_CHECKBOX>
// source=src/components/ui/checkbox.tsx
// component=Checkbox
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  reg: 'default',
  lg: 'lg',
});

const type = instance.getEnum('type', {
  unchecked: 'unchecked',
  checked: 'checked',
  indeterminate: 'indeterminate',
});

const disabled = instance.getEnum('state', {
  disabled: true,
  enabled: false,
  focused: false,
});

const checkedProp =
  type === 'checked'
    ? ' defaultChecked'
    : type === 'indeterminate'
      ? ' defaultChecked="indeterminate"'
      : '';

const disabledProp = disabled ? ' disabled' : '';

export default {
  example: figma.code`<Checkbox size="${size}"${checkedProp}${disabledProp} />`,
  imports: ['import { Checkbox } from "@/components/ui/checkbox"'],
  id: 'checkbox',
  metadata: { nestable: true },
};
