// url=<QBDS_RADIO_GROUP_ITEM>
// source=src/components/ui/radio-group.tsx
// component=RadioGroupItem
import figma from 'figma';

const instance = figma.selectedInstance;

const size =
  instance.getEnum('size', {
    sm: 'sm',
    reg: 'default',
    lg: 'lg',
  }) ?? 'default';

const disabled = instance.getEnum('state', {
  enabled: false,
  focused: false,
  disabled: true,
});

const label = instance.getString('Label-Radio') || 'option';
const id = label
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const labelClass =
  size === 'lg'
    ? 'label-large-primary'
    : size === 'sm'
      ? 'label-small-primary'
      : 'label-regular-primary';

export default {
  example: figma.code`
    <Field orientation="horizontal">
      <RadioGroupItem value="${label}" id="${id}" size="${size}"${disabled ? ' disabled' : ''} />
      <FieldLabel htmlFor="${id}" className="${labelClass}"${disabled ? ' disabled' : ''}>
        ${label}
      </FieldLabel>
    </Field>
  `,
  imports: [
    'import { Field, FieldLabel } from "@/components/ui/field"',
    'import { RadioGroupItem } from "@/components/ui/radio-group"',
  ],
  id: 'radio-group-item',
  metadata: { nestable: true },
};
