'use client';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

type SegmentedControlsType = 'secondary-filled' | 'ghost';

type SegmentedControlsSize = 'reg' | 'sm' | 'xsm' | 'xxs';

/**
 * State overlay gradients for the secondary-filled variant.
 * Tailwind needs the full class name at build time, so these are defined as
 * complete strings rather than built via interpolation (matches button/tag-toggle).
 */
const hoverOverlay =
  'hover:[background-image:linear-gradient(var(--color-stateslayer-overlay-hover),var(--color-stateslayer-overlay-hover))]';

const pressedOverlay =
  'active:[background-image:linear-gradient(var(--color-stateslayer-overlay-pressed),var(--color-stateslayer-overlay-pressed))]';

const disabledOverlay =
  'disabled:[background-image:linear-gradient(var(--color-stateslayer-overlay-disabled),var(--color-stateslayer-overlay-disabled))]';

// Track (Root) container styling — size only controls the inter-item gap.
const segmentedControlsVariants = cva(
  [
    'inline-flex items-center w-fit p-1',
    'bg-fill-secondary-inverse border border-stroke-divider shadow-elevation-0',
  ],
  {
    variants: {
      size: {
        reg: 'gap-1',
        sm: 'gap-0.5',
        xsm: 'gap-0.5',
        xxs: 'gap-0.5',
      },
    },
    defaultVariants: {
      size: 'reg',
    },
  },
);

// Individual segment styling. The selected (data-state=on) treatment lives in the
// base layer so it overrides both type backgrounds via attribute specificity.
const segmentedControlsItemVariants = cva(
  [
    'relative inline-flex items-center justify-center min-w-8 whitespace-nowrap',
    'cursor-pointer outline-none transition-all',
    'focus-visible:ring-1 focus-visible:ring-stroke-status-focus',
    'disabled:cursor-not-allowed disabled:text-fg-disabled',
    'data-[state=on]:bg-fill-active data-[state=on]:text-fg-primary-inverse',
  ],
  {
    variants: {
      type: {
        'secondary-filled': [
          'bg-fill-muted text-fg-primary',
          hoverOverlay,
          pressedOverlay,
          disabledOverlay,
        ],
        ghost: [
          'bg-transparent text-fg-primary',
          'hover:bg-stateslayer-overlay-hover active:bg-stateslayer-overlay-pressed',
          'disabled:bg-transparent disabled:hover:bg-transparent disabled:active:bg-transparent',
        ],
      },
      size: {
        reg: 'min-h-9 p-2 gap-2 cta-button-02',
        sm: 'min-h-7 px-2 py-1 gap-1 cta-button-02',
        xsm: 'h-6 px-1 py-0.5 gap-0.5 cta-button-03',
        xxs: 'h-5 px-1 py-0.5 gap-0.5 cta-button-03',
      },
    },
    defaultVariants: {
      type: 'secondary-filled',
      size: 'reg',
    },
  },
);

interface SegmentedControlsContextValue {
  type: SegmentedControlsType;
  size: SegmentedControlsSize;
}

const SegmentedControlsContext =
  React.createContext<SegmentedControlsContextValue>({
    type: 'secondary-filled',
    size: 'reg',
  });

// Single-select only: Radix's own `type`/`value`/`onValueChange` are pinned to the
// single-selection shape and our visual `type` prop is layered on top.
interface SegmentedControlsProps extends Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive.Root>,
  'type' | 'value' | 'defaultValue' | 'onValueChange'
> {
  type?: SegmentedControlsType;
  size?: SegmentedControlsSize;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

function SegmentedControls({
  className,
  type = 'secondary-filled',
  size = 'reg',
  children,
  ...props
}: SegmentedControlsProps) {
  return (
    <SegmentedControlsContext.Provider value={{ type, size }}>
      <ToggleGroupPrimitive.Root
        className={cn(segmentedControlsVariants({ size }), className)}
        data-slot="segmented-controls"
        {...props}
        type="single">
        {children}
      </ToggleGroupPrimitive.Root>
    </SegmentedControlsContext.Provider>
  );
}

function SegmentedControlsItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  const { type, size } = React.useContext(SegmentedControlsContext);

  return (
    <ToggleGroupPrimitive.Item
      className={cn(segmentedControlsItemVariants({ type, size }), className)}
      data-slot="segmented-controls-item"
      {...props}>
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export {
  SegmentedControls,
  SegmentedControlsItem,
  segmentedControlsItemVariants,
  type SegmentedControlsType,
  type SegmentedControlsSize,
};
