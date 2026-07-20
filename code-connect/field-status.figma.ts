// url=<QBDS_FIELD_STATUS>
// source=src/components/ui/field.tsx
// component=FieldError
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
});

const status = instance.getEnum('status', {
  error: 'error',
  warning: 'warning',
  success: 'success',
});

const statusMessage = instance.getString('statusMessage') || 'Feedback';

const statusClass =
  status === 'warning'
    ? 'text-status-warning'
    : status === 'success'
      ? 'text-status-success'
      : undefined;

const example =
  status === 'error'
    ? figma.code`
    <FieldError size="${size}">
      ${statusMessage}
    </FieldError>
  `
    : figma.code`
    <FieldDescription size="${size}" className="${statusClass}" role="status">
      ${statusMessage}
    </FieldDescription>
  `;

export default {
  example,
  imports: [
    'import { FieldDescription, FieldError } from "@/components/ui/field"',
  ],
  id: 'field-status',
  metadata: { nestable: true },
};
