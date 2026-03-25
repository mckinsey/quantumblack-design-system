import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// ============================================================================
// Example Components (New Format)
// ============================================================================

/**
 * Default tooltip
 */
export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>This is a tooltip</TooltipContent>
    </Tooltip>
  );
}

/**
 * Tooltip positions
 */
export function TooltipPositions() {
  return (
    <div className="flex flex-wrap gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Top
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">Tooltip on top</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Right
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Tooltip on right</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Bottom
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Left
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">Tooltip on left</TooltipContent>
      </Tooltip>
    </div>
  );
}

/**
 * Tooltip alignment options
 */
export function TooltipAlignment() {
  return (
    <div className="flex flex-wrap gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Start
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" align="start">
          Aligned to start
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Center
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          Aligned to center
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            End
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" align="end">
          Aligned to end
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

/**
 * Tooltip with longer content
 */
export function TooltipLongContent() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Info</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque libero
        odio, accumsan et elementum nec, pulvinar nec velit.
      </TooltipContent>
    </Tooltip>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

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

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const tooltip = {
  name: 'tooltip',
  components: {
    Default: <TooltipDemo />,
    Positions: <TooltipPositions />,
    Alignment: <TooltipAlignment />,
    'Long Content': <TooltipLongContent />,
  },
};
