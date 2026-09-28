// url=<QBDS_TOOLTIP_MULTI>
// source=src/components/ui/tooltip.tsx
// component=Tooltip
import figma from 'figma';

const instance = figma.selectedInstance;

const arrowPosition =
  instance.getEnum('arrowPosition', {
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
  }) ?? 'top-left';

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

const label = JSON.stringify(
  instance.getString('label') ||
    'Lorem ipsum dolor sit amet, consec adipiscing elit. Quisque libero odio, accumsan et elementum nec, pulvinar nec velit. Nam tristi que pulvinar ante, ut mollis risus',
);
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
  id: 'tooltip-multiple-lines',
  metadata: { nestable: true },
};
