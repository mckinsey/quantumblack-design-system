// url=<QBDS_CARD_LABEL_ENTRY>
// source=src/components/ui/card.tsx
// component=Card
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
});

const label =
  instance.getString('KPI Label') || instance.getString('label') || 'Label';
const value = instance.getString('value') || 'Entry';

const rowClass =
  size === 'sm'
    ? 'label-regular-primary flex w-full items-start justify-between'
    : 'label-large-primary flex w-full items-start justify-between';

const valueClass =
  size === 'sm'
    ? 'paragraph-regular-primary text-fg-primary text-right'
    : 'paragraph-large-primary text-fg-primary text-right';

export default {
  example: figma.code`
    <div className="${rowClass}">
      <span className="text-fg-secondary flex items-center gap-0.5">${label}</span>
      <span className="${valueClass}">${value}</span>
    </div>
  `,
  imports: [],
  id: 'card-label-entry',
  metadata: { nestable: true },
};
