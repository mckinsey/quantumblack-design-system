'use client';

import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ToolbarSize = 'sm' | 'reg' | 'lg';
type ToolbarShape = 'square' | 'circle';

interface ToolbarContextValue {
  size: ToolbarSize;
  shape: ToolbarShape;
  boxed: boolean;
  orientation: 'horizontal' | 'vertical';
}

const ToolbarContext = React.createContext<ToolbarContextValue>({
  size: 'reg',
  shape: 'circle',
  boxed: false,
  orientation: 'horizontal',
});

type ToolbarGapClass = 'gap-1' | 'gap-2' | 'gap-3';

/** Inter-item gap from Figma spacing/4, /8, /12 per size × boxed × shape. */
function toolbarGapClass({
  boxed,
  shape,
  size,
}: Pick<ToolbarContextValue, 'boxed' | 'shape' | 'size'>): ToolbarGapClass {
  if (boxed || shape === 'square') return 'gap-2';
  if (size === 'reg') return 'gap-1';
  if (size === 'lg') return 'gap-3';
  return 'gap-2';
}

const toolbarSeparatorGapOffset: Record<ToolbarGapClass, string> = {
  'gap-1': '1',
  'gap-2': '2',
  'gap-3': '3',
};

/**
 * Collapse the flex gap before the separator so it sits flush after the
 * preceding control, matching Figma’s spacer-on-last-toggle pattern.
 */
function toolbarSeparatorOffsetClass(context: ToolbarContextValue) {
  const offset = toolbarSeparatorGapOffset[toolbarGapClass(context)];
  return context.orientation === 'horizontal'
    ? `-ms-${offset}`
    : `-mt-${offset}`;
}

const toolbarIconSizeMap: Record<ToolbarSize, 'icon-sm' | 'icon' | 'icon-lg'> =
  {
    sm: 'icon-sm',
    reg: 'icon',
    lg: 'icon-lg',
  };

/** IconShell size paired with each toolbar button size (matches icon toggle demos). */
const toolbarIconShellSizeMap: Record<ToolbarSize, 'sm' | 'default' | 'lg'> = {
  sm: 'sm',
  reg: 'sm',
  lg: 'default',
};

/** Divider length along the toolbar cross-axis (Figma .baseTab_spacer). */
const toolbarSeparatorLengthMap: Record<ToolbarSize, string> = {
  sm: 'h-5',
  reg: 'h-7',
  lg: 'h-8',
};

/** Horizontal divider width (Figma spacer w-[8px] / w-[12px]). */
const toolbarSeparatorWidthMap: Record<ToolbarSize, string> = {
  sm: 'w-2',
  reg: 'w-2',
  lg: 'w-3',
};

/** Vertical divider height (Figma spacer h-[8px]). */
const toolbarSeparatorHeightMap: Record<ToolbarSize, string> = {
  sm: 'h-2',
  reg: 'h-2',
  lg: 'h-3',
};

/** Vertical divider width (Figma spacer w-[28px] etc.). */
const toolbarSeparatorCrossSpanMap: Record<ToolbarSize, string> = {
  sm: 'w-6',
  reg: 'w-7',
  lg: 'w-8',
};

const toolbarVariants = cva('inline-flex w-fit items-center', {
  variants: {
    boxed: {
      true: 'bg-fill-secondary-inverse border border-stroke-tertiary shadow-elevation-1',
      false: '',
    },
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    shape: {
      circle: '',
      square: '',
    },
    size: {
      sm: '',
      reg: '',
      lg: '',
    },
  },
  compoundVariants: [
    { boxed: true, shape: 'circle', className: 'rounded-full' },
    { boxed: true, shape: 'square', className: 'rounded-md' },
    { boxed: true, size: ['sm', 'reg'], className: 'p-2' },
    { boxed: true, size: 'lg', className: 'p-3' },
  ],
  defaultVariants: {
    boxed: false,
    orientation: 'horizontal',
    shape: 'circle',
    size: 'reg',
  },
});

function toolbarItemClasses({
  size,
  shape,
  className,
}: ToolbarContextValue & { className?: string }) {
  return cn(
    buttonVariants({
      variant: 'ghost',
      size: toolbarIconSizeMap[size],
    }),
    shape === 'circle' ? 'rounded-full' : 'rounded-md',
    className,
  );
}

function useToolbar() {
  return React.useContext(ToolbarContext);
}

interface ToolbarProps extends React.ComponentProps<
  typeof ToolbarPrimitive.Root
> {
  size?: ToolbarSize;
  shape?: ToolbarShape;
  boxed?: boolean;
}

function Toolbar({
  className,
  size = 'reg',
  shape = 'circle',
  boxed = false,
  orientation = 'horizontal',
  ...props
}: ToolbarProps) {
  return (
    <ToolbarContext.Provider value={{ size, shape, boxed, orientation }}>
      <ToolbarPrimitive.Root
        data-slot="toolbar"
        data-size={size}
        data-shape={shape}
        data-boxed={boxed ? 'true' : 'false'}
        orientation={orientation}
        className={cn(
          toolbarVariants({ boxed, orientation, shape, size }),
          toolbarGapClass({ boxed, shape, size }),
          className,
        )}
        {...props}
      />
    </ToolbarContext.Provider>
  );
}

function ToolbarButton({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.Button>) {
  const context = React.useContext(ToolbarContext);

  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-button"
      className={toolbarItemClasses({ ...context, className })}
      {...props}
    />
  );
}

function ToolbarLink({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.Link>) {
  const context = React.useContext(ToolbarContext);

  return (
    <ToolbarPrimitive.Link
      data-slot="toolbar-link"
      className={toolbarItemClasses({ ...context, className })}
      {...props}
    />
  );
}

function ToolbarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.Separator>) {
  const context = React.useContext(ToolbarContext);

  return (
    <ToolbarPrimitive.Separator
      data-slot="toolbar-separator"
      decorative
      orientation={
        context.orientation === 'horizontal' ? 'vertical' : 'horizontal'
      }
      className={cn(
        'border-stroke-tertiary shrink-0',
        toolbarSeparatorOffsetClass(context),
        context.orientation === 'horizontal'
          ? cn(
              'self-center border-r',
              toolbarSeparatorWidthMap[context.size],
              toolbarSeparatorLengthMap[context.size],
            )
          : cn(
              'border-b',
              toolbarSeparatorHeightMap[context.size],
              toolbarSeparatorCrossSpanMap[context.size],
            ),
        className,
      )}
      {...props}
    />
  );
}

function ToolbarToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.ToggleGroup>) {
  const { boxed, shape, size, orientation } = React.useContext(ToolbarContext);

  return (
    <ToolbarPrimitive.ToggleGroup
      data-slot="toolbar-toggle-group"
      className={cn(
        'inline-flex items-center',
        toolbarGapClass({ boxed, shape, size }),
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        className,
      )}
      {...props}
    />
  );
}

function ToolbarToggleItem({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.ToggleItem>) {
  const context = React.useContext(ToolbarContext);

  return (
    <ToolbarPrimitive.ToggleItem
      data-slot="toolbar-toggle-item"
      className={cn(
        toolbarItemClasses(context),
        'data-[state=on]:bg-fill-active data-[state=on]:text-fg-primary-inverse',
        'disabled:data-[state=on]:text-fg-disabled disabled:data-[state=on]:bg-transparent',
        'disabled:data-[state=on]:hover:bg-transparent disabled:data-[state=on]:active:bg-transparent',
        className,
      )}
      {...props}
    />
  );
}

export {
  Toolbar,
  ToolbarButton,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
  toolbarIconShellSizeMap,
  useToolbar,
  type ToolbarSize,
  type ToolbarShape,
};
