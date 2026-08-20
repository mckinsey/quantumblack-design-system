'use client';

import { type ReactNode, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export type DemoAxis<T extends string> = {
  key: string;
  label: string;
  options: readonly T[];
  defaultOption: T;
};

export type ExpandedState = Record<string, boolean>;

export function resolveAxisOptions<T extends string>(
  axis: DemoAxis<T>,
  showAll: boolean,
): T[] {
  return showAll ? [...axis.options] : [axis.defaultOption];
}

export function useDemoExpandState(axes: DemoAxis<string>[]) {
  const [expanded, setExpanded] = useState<ExpandedState>(() =>
    Object.fromEntries(axes.map(axis => [axis.key, false])),
  );

  const setAxisExpanded = (key: string, value: boolean) => {
    setExpanded(prev => ({ ...prev, [key]: value }));
  };

  return { expanded, setAxisExpanded };
}

type DemoExpandControlsProps = {
  axes: DemoAxis<string>[];
  expanded: ExpandedState;
  onExpandedChange: (key: string, value: boolean) => void;
  className?: string;
};

export function DemoExpandControls({
  axes,
  expanded,
  onExpandedChange,
  className,
}: Readonly<DemoExpandControlsProps>) {
  return (
    <div className={className ?? 'flex flex-wrap items-center gap-4'}>
      {axes.map(axis => {
        const id = `demo-expand-${axis.key}`;

        return (
          <div key={axis.key} className="flex items-center gap-2">
            <Checkbox
              id={id}
              checked={expanded[axis.key] ?? false}
              onCheckedChange={value =>
                onExpandedChange(axis.key, value === true)
              }
            />
            <Label
              htmlFor={id}
              className="paragraph-small-primary cursor-pointer">
              {axis.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}

export function DemoAxisRow({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="flex flex-wrap gap-6">{children}</div>;
}
