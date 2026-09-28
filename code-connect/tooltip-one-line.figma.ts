// url=<QBDS_TOOLTIP>
// source=src/components/ui/tooltip.tsx
// component=Tooltip
import figma from 'figma';

const instance = figma.selectedInstance;

const arrowPosition =
  instance.getEnum('arrowPosition', {
    'top-left': 'top-left',
    'top-center': 'top-center',
    'top-right': 'top-right',
    'left-center': 'left-center',
    'no-pointer': 'no-pointer',
    'right-center': 'right-center',
    'bottom-left': 'bottom-left',
    'bottom-center': 'bottom-center',
    'bottom-right': 'bottom-right',
  }) ?? 'top-left';

const placement = {
  'top-left': { side: 'bottom', align: 'start' },
  'top-center': { side: 'bottom', align: 'center' },
  'top-right': { side: 'bottom', align: 'end' },
  'left-center': { side: 'right', align: 'center' },
  'no-pointer': { side: 'top', align: 'center' },
  'right-center': { side: 'left', align: 'center' },
  'bottom-left': { side: 'top', align: 'start' },
  'bottom-center': { side: 'top', align: 'center' },
  'bottom-right': { side: 'top', align: 'end' },
} as const;

const label = JSON.stringify(instance.getString('label') || 'Tooltip label');
const { side, align } =
  placement[arrowPosition as keyof typeof placement] ?? placement['top-left'];

const sideProp = side !== 'top' ? ` side="${side}"` : '';
const alignProp = align !== 'center' ? ` align="${align}"` : '';

export default {
  example: figma.code`
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<button type="button" />}>Hover me</TooltipTrigger>
        <TooltipContent${sideProp}${alignProp}>
          {${label}}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  `,
  imports: [
    'import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"',
  ],
  id: 'tooltip-one-line',
  metadata: { nestable: true },
};
