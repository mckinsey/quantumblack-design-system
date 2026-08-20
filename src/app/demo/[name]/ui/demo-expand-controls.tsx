'use client';

import { type CSSProperties, type ReactNode, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export type DemoAxis<T extends string> = {
  key: string;
  label: string;
  options: readonly T[];
  defaultOption: T;
};

export type ExpandedState = Record<string, boolean>;

export const demoExpandControlsClass =
  'absolute top-0 right-0 z-10 flex shrink-0 items-center gap-2';

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

export function useDemoExpandMotion(showAll: boolean) {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const ease = 'cubic-bezier(0.23, 1, 0.32, 1)';
  const duration = showAll ? '220ms' : '160ms';

  const expandTransition = prefersReducedMotion
    ? undefined
    : `grid-template-columns ${duration} ${ease}`;

  const fadeTransition = prefersReducedMotion
    ? undefined
    : `opacity ${duration} ${ease}, transform ${duration} ${ease}`;

  const expandStyle: CSSProperties = {
    gridTemplateColumns: showAll ? '1fr' : '0fr',
    transition: expandTransition,
  };

  const fadeClass = cn(
    showAll ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0',
  );

  const fadeStyle: CSSProperties = { transition: fadeTransition };

  return { expandStyle, fadeClass, fadeStyle, showAll };
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
    <div className={className ?? demoExpandControlsClass}>
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
  return <div className="flex flex-wrap items-start gap-6">{children}</div>;
}

type DemoExpandSlotProps = {
  open: boolean;
  children: ReactNode;
};

export function DemoExpandSlot({
  open,
  children,
}: Readonly<DemoExpandSlotProps>) {
  const { expandStyle, fadeClass, fadeStyle } = useDemoExpandMotion(open);

  return (
    <div
      className="grid min-w-0 overflow-hidden"
      style={expandStyle}
      aria-hidden={!open}>
      <div className={cn('min-w-0', !open && 'pointer-events-none')}>
        <div className={fadeClass} style={fadeStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}
