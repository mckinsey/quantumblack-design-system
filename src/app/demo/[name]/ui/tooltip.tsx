import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const sides = ['top', 'right', 'bottom', 'left'] as const;
const aligns = ['start', 'center', 'end'] as const;

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" className="w-fit" />}>
          Hover me
        </TooltipTrigger>
        <TooltipContent>Tooltip label</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function TooltipPositions() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-4">
        {sides.map(side => (
          <Tooltip key={side}>
            <TooltipTrigger render={<Button variant="outline" size="sm" />}>
              {side}
            </TooltipTrigger>
            <TooltipContent side={side}>Tooltip label</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

export function TooltipAlignment() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-4">
        {aligns.map(align => (
          <Tooltip key={align}>
            <TooltipTrigger render={<Button variant="outline" size="sm" />}>
              {align}
            </TooltipTrigger>
            <TooltipContent side="top" align={align}>
              Tooltip label
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

export function TooltipLongContent() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" className="w-fit" />}>
          Info
        </TooltipTrigger>
        <TooltipContent className="max-w-[220px] p-2">
          Lorem ipsum dolor sit amet, consec adipiscing elit. Quisque libero
          odio, accumsan et elementum nec, pulvinar nec velit. Nam tristi que
          pulvinar ante, ut mollis risus
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export const examples = [
  {
    name: 'TooltipDemo',
    title: 'Default',
    description: 'Basic tooltip on hover.',
  },
  {
    name: 'TooltipPositions',
    title: 'Positions',
    description: 'Tooltip on top, right, bottom, left.',
  },
  {
    name: 'TooltipAlignment',
    title: 'Alignment',
    description: 'Tooltip align start, center, end.',
  },
  {
    name: 'TooltipLongContent',
    title: 'Long Content',
    description: 'Multi-line tooltip padding and width.',
  },
];

export const tooltip = {
  name: 'tooltip',
  components: {
    Default: <TooltipDemo />,
    Positions: <TooltipPositions />,
    Alignment: <TooltipAlignment />,
    'Long Content': <TooltipLongContent />,
  },
};
