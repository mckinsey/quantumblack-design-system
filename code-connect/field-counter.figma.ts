// url=<QBDS_FIELD_COUNTER>
// source=src/app/demo/[name]/ui/field.tsx
// component=Counter
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

const sizeClass =
  size === 'sm'
    ? 'paragraph-small-primary'
    : size === 'lg'
      ? 'paragraph-large-primary'
      : 'paragraph-regular-primary';

const countClass = disabled
  ? 'text-fg-disabled'
  : type === 'exceeded'
    ? 'text-error'
    : type === 'filled'
      ? 'text-fg-primary'
      : 'text-fg-secondary';

const muteClass = disabled ? 'text-fg-disabled' : 'text-fg-secondary';

export default {
  example: figma.code`
    <span className="flex items-center gap-0.5 ${sizeClass}" aria-live="polite">
      <span className="${countClass}">${count}</span>
      <span className="${muteClass}">/</span>
      <span className="${muteClass}">${max}</span>
    </span>
  `,
  imports: [],
  id: 'field-counter',
  metadata: { nestable: true },
};
