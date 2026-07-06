// url=<QBDS_TOOLTIP_MULTI>
// source=src/components/ui/tooltip.tsx
// component=Tooltip
import figma from 'figma';

const instance = figma.selectedInstance;

const arrowPosition = instance.getEnum('arrow-position', {
  'top-left': 'top-left',
  'top-center': 'top-center',
  'top-right': 'top-right',
  'left-top': 'left-top',
  'left-center': 'left-center',
  'left-bottom': 'left-bottom',
  'right-top': 'right-top',
  'right-center': 'right-center',
  'right-bottom': 'right-bottom',
  'bottom-left': 'bottom-left',
  'bottom-center': 'bottom-center',
  'bottom-right': 'bottom-right',
});

const placement = {
  'top-left': { side: 'bottom', align: 'start' },
  'top-center': { side: 'bottom', align: 'center' },
  'top-right': { side: 'bottom', align: 'end' },
  'left-top': { side: 'right', align: 'start' },
  'left-center': { side: 'right', align: 'center' },
  'left-bottom': { side: 'right', align: 'end' },
  'right-top': { side: 'left', align: 'start' },
  'right-center': { side: 'left', align: 'center' },
  'right-bottom': { side: 'left', align: 'end' },
  'bottom-left': { side: 'top', align: 'start' },
  'bottom-center': { side: 'top', align: 'center' },
  'bottom-right': { side: 'top', align: 'end' },
} as const;

const label = instance.getString('label');
const { side, align } =
  placement[arrowPosition as keyof typeof placement] ?? placement['top-left'];

export default {
  example: figma.code`
    /*
     * Figma shows only the tooltip bubble — in code you must pair it with a trigger element.
     * Wrap any focusable control (button, icon button, link) in TooltipTrigger asChild;
     * the label below maps to TooltipContent. Long copy auto-expands up to 220px wide.
     * arrow-position → side + align on TooltipContent (arrow is always shown in code).
     */
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button">Hover me</button>
      </TooltipTrigger>
      <TooltipContent side="${side}" align="${align}">
        ${label}
      </TooltipContent>
    </Tooltip>
  `,
  imports: [
    'import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"',
  ],
  id: 'tooltip-multiple-lines',
  metadata: { nestable: true },
};
