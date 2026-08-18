// url=<QBDS_CARD_STAT_COUNT_GROUP>
// source=src/components/ui/card.tsx
// component=Card
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
});

const gap = size === 'sm' ? 'gap-4' : 'gap-5';

const items = figma.properties.children(['baseCard/StatCount']);

export default {
  example: figma.code`
    <div className="flex items-center ${gap}">
      ${figma.helpers.react.renderChildren(items)}
    </div>
  `,
  imports: [
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
  ],
  id: 'card-stat-count-group',
  metadata: { nestable: true },
};
