'use client';

import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import * as React from 'react';

import {
  Toggle,
  type ToggleSize,
  type ToggleVariant,
} from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

interface ToggleGroupContextValue {
  variant: ToggleVariant;
  size: ToggleSize;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: 'secondary',
  size: 'default',
});

function containedGap(size: ToggleSize) {
  if (size === 'sm' || size === 'xs' || size === 'xxs') {
    return 'gap-0.5';
  }

  return 'gap-1';
}

function ToggleGroup({
  className,
  variant = 'secondary',
  size = 'default',
  contained = true,
  orientation = 'horizontal',
  ...props
}: ToggleGroupPrimitive.Props & {
  variant?: ToggleVariant;
  size?: ToggleSize;
  contained?: boolean;
}) {
  return (
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <ToggleGroupPrimitive
        data-slot="toggle-group"
        data-variant={variant}
        data-size={size}
        data-contained={contained ? 'true' : 'false'}
        orientation={orientation}
        className={cn(
          'inline-flex w-fit items-center',
          orientation === 'vertical' ? 'flex-col' : 'flex-row',
          contained
            ? cn(
                'bg-fill-secondary-inverse border-stroke-divider shadow-elevation-0 border p-1',
                containedGap(size),
              )
            : 'gap-1',
          className,
        )}
        {...props}
      />
    </ToggleGroupContext.Provider>
  );
}

function ToggleGroupItem({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof Toggle>) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <Toggle
      data-slot="toggle-group-item"
      variant={variant ?? context.variant}
      size={size ?? context.size}
      className={className}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
