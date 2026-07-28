// url=<QBDS_FIELD_HELP_TEXT>
// source=src/components/ui/field.tsx
// component=FieldDescription
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
});

const disabled = instance.getEnum('state', {
  enabled: false,
  disabled: true,
});

const helperText = instance.getString('helperText') || 'Helper text';

export default {
  example: figma.code`
    <FieldDescription size="${size}"${disabled ? ' disabled' : ''}>
      ${helperText}
    </FieldDescription>
  `,
  imports: ['import { FieldDescription } from "@/components/ui/field"'],
  id: 'field-help-text',
  metadata: { nestable: true },
};
