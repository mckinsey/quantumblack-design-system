'use client';

import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Progress({
  className,
  value,
  ...props
}: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(
        'bg-primary/20 relative h-1 w-full overflow-hidden rounded-full',
        className,
      )}
      {...props}>
      <ProgressPrimitive.Track className="h-full w-full">
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="bg-primary h-full transition-all"
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
