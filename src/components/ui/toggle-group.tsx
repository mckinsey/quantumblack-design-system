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

function ToggleGroup({
  className,
  variant = 'secondary',
  size = 'default',
  orientation = 'horizontal',
  ...props
}: ToggleGroupPrimitive.Props & {
  variant?: ToggleVariant;
  size?: ToggleSize;
}) {
  return (
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <ToggleGroupPrimitive
        data-slot="toggle-group"
        data-variant={variant}
        data-size={size}
        orientation={orientation}
        className={cn(
          'inline-flex w-fit items-center gap-1',
          orientation === 'vertical' ? 'flex-col' : 'flex-row',
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
