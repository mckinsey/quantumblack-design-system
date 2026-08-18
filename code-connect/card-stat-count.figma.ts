// url=<QBDS_CARD_STAT_COUNT>
// source=src/components/ui/card.tsx
// component=Card
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
});

const value = instance.getString('value') || '21';

const iconShell = instance.findInstance('IconShell');
let iconCode: figma.ResultSection[] = [];

if (iconShell?.type === 'INSTANCE') {
  iconCode = iconShell.executeTemplate().example;
}

const statClass =
  size === 'sm'
    ? 'label-regular-primary text-fg-secondary flex items-center gap-1'
    : 'label-large-primary text-fg-secondary flex items-center gap-1';

export default {
  example: figma.code`
    <div className="${statClass}">
      ${iconCode}
      ${value}
    </div>
  `,
  imports: [
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
  ],
  id: 'card-stat-count',
  metadata: { nestable: true },
};
