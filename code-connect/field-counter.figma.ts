// url=<QBDS_FIELD_COUNTER>
// source=src/components/ui/field.tsx
// component=
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
});

const type = instance.getEnum('type', {
  empty: 'empty',
  filled: 'filled',
  exceeded: 'exceeded',
});

const disabled = instance.getEnum('state', {
  enabled: false,
  disabled: true,
});

const count =
  type === 'exceeded'
    ? instance.getString('exceededCount') || '151'
    : type === 'filled'
      ? instance.getString('count') || '10'
      : instance.getString('min') || '0';
const max = instance.getString('max') || '150';

const typeClass =
  size === 'sm' ? 'paragraph-small-primary' : 'paragraph-regular-primary';
const countClass =
  type === 'exceeded'
    ? 'text-status-error'
    : type === 'filled'
      ? 'text-fg-secondary'
      : 'text-fg-tertiary';
const disabledClass = disabled ? ' opacity-50' : '';

export default {
  example: figma.code`
    <span className="flex items-center gap-1 ${typeClass}${disabledClass}" aria-live="polite">
      <span className="${countClass}">${count}</span>
      <span className="text-fg-tertiary">/</span>
      <span className="text-fg-tertiary">${max}</span>
    </span>
  `,
  imports: [],
  id: 'field-counter',
  metadata: { nestable: true },
};
