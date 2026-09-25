import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" className="w-fit" />}>
        Hover me
      </TooltipTrigger>
      <TooltipContent>This is a tooltip</TooltipContent>
    </Tooltip>
  );
}

export function TooltipPositions() {
  return (
    <div className="flex flex-wrap gap-4">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm" />}>
          Top
        </TooltipTrigger>
        <TooltipContent side="top">Tooltip on top</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm" />}>
          Right
        </TooltipTrigger>
        <TooltipContent side="right">Tooltip on right</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm" />}>
          Bottom
        </TooltipTrigger>
        <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm" />}>
          Left
        </TooltipTrigger>
        <TooltipContent side="left">Tooltip on left</TooltipContent>
      </Tooltip>
    </div>
  );
}

export function TooltipAlignment() {
  return (
    <div className="flex flex-wrap gap-4">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm" />}>
          Start
        </TooltipTrigger>
        <TooltipContent side="top" align="start">
          Aligned to start
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm" />}>
          Center
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          Aligned to center
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm" />}>
          End
        </TooltipTrigger>
        <TooltipContent side="top" align="end">
          Aligned to end
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export function TooltipLongContent() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" className="w-fit" />}>
        Info
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque libero
        odio, accumsan et elementum nec, pulvinar nec velit.
      </TooltipContent>
    </Tooltip>
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
    description: 'Tooltips positioned on all sides.',
  },
  {
    name: 'TooltipAlignment',
    title: 'Alignment',
    description: 'Tooltips with different alignments.',
  },
  {
    name: 'TooltipLongContent',
    title: 'Long Content',
    description: 'Tooltip with longer text content.',
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
