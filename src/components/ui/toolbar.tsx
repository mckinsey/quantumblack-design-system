'use client';

import { Toolbar as ToolbarPrimitive } from '@base-ui/react/toolbar';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ToolbarSize = 'sm' | 'default' | 'lg';
type ToolbarShape = 'square' | 'circle';

interface ToolbarContextValue {
  size: ToolbarSize;
  shape: ToolbarShape;
  boxed: boolean;
  orientation: 'horizontal' | 'vertical';
}

const ToolbarContext = React.createContext<ToolbarContextValue>({
  size: 'default',
  shape: 'circle',
  boxed: false,
  orientation: 'horizontal',
});

type ToolbarGapClass = 'gap-1' | 'gap-2' | 'gap-3';

function toolbarGapClass({
  boxed,
  shape,
  size,
}: Pick<ToolbarContextValue, 'boxed' | 'shape' | 'size'>): ToolbarGapClass {
  if (size === 'lg') return 'gap-3';
  if (size === 'default' && shape === 'circle' && !boxed) return 'gap-1';
  return 'gap-2';
}

const toolbarSeparatorGapOffset: Record<
  ToolbarGapClass,
  { horizontal: string; vertical: string }
> = {
  'gap-1': { horizontal: '-ms-1', vertical: '-mt-1' },
  'gap-2': { horizontal: '-ms-2', vertical: '-mt-2' },
  'gap-3': { horizontal: '-ms-3', vertical: '-mt-3' },
};

function toolbarSeparatorOffsetClass(context: ToolbarContextValue) {
  const offset = toolbarSeparatorGapOffset[toolbarGapClass(context)];
  return context.orientation === 'horizontal'
    ? offset.horizontal
    : offset.vertical;
}

const toolbarIconSizeMap: Record<ToolbarSize, 'icon-sm' | 'icon' | 'icon-lg'> =
  {
    sm: 'icon-sm',
    default: 'icon',
    lg: 'icon-lg',
  };

const toolbarIconShellSizeMap: Record<ToolbarSize, 'sm' | 'default' | 'lg'> = {
  sm: 'sm',
  default: 'sm',
  lg: 'default',
};

const toolbarSeparatorLengthMap: Record<ToolbarSize, string> = {
  sm: 'h-5',
  default: 'h-7',
  lg: 'h-8',
};

const toolbarSeparatorWidthMap: Record<ToolbarSize, string> = {
  sm: 'w-2',
  default: 'w-2',
  lg: 'w-3',
};

const toolbarSeparatorHeightMap: Record<ToolbarSize, string> = {
  sm: 'h-2',
  default: 'h-2',
  lg: 'h-3',
};

const toolbarSeparatorCrossSpanMap: Record<ToolbarSize, string> = {
  sm: 'w-6',
  default: 'w-7',
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
      default: '',
      lg: '',
    },
  },
  compoundVariants: [
    { boxed: true, shape: 'circle', className: 'rounded-full' },
    { boxed: true, shape: 'square', className: 'rounded-md' },
    { boxed: true, size: ['sm', 'default'], className: 'p-2' },
    { boxed: true, size: 'lg', className: 'p-3' },
  ],
  defaultVariants: {
    boxed: false,
    orientation: 'horizontal',
    shape: 'circle',
    size: 'default',
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
    'data-pressed:bg-fill-active data-pressed:text-fg-primary-inverse',
    'disabled:data-pressed:text-fg-disabled disabled:data-pressed:bg-transparent',
    'disabled:data-pressed:hover:bg-transparent disabled:data-pressed:active:bg-transparent',
    className,
  );
}

function useToolbar() {
  return React.useContext(ToolbarContext);
}

interface ToolbarProps extends ToolbarPrimitive.Root.Props {
  size?: ToolbarSize;
  shape?: ToolbarShape;
  boxed?: boolean;
}

function Toolbar({
  className,
  size = 'default',
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
        data-boxed={boxed}
        data-orientation={orientation}
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

function ToolbarButton({ className, ...props }: ToolbarPrimitive.Button.Props) {
  const context = useToolbar();

  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-button"
      className={state =>
        toolbarItemClasses({
          ...context,
          className:
            typeof className === 'function' ? className(state) : className,
        })
      }
      {...props}
    />
  );
}

function ToolbarSeparator({
  className,
  ...props
}: ToolbarPrimitive.Separator.Props) {
  const context = useToolbar();

  return (
    <ToolbarPrimitive.Separator
      data-slot="toolbar-separator"
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

function ToolbarGroup({ className, ...props }: ToolbarPrimitive.Group.Props) {
  const { boxed, shape, size, orientation } = useToolbar();

  return (
    <ToolbarPrimitive.Group
      data-slot="toolbar-group"
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

function ToolbarLink({ className, ...props }: ToolbarPrimitive.Link.Props) {
  return (
    <ToolbarPrimitive.Link
      data-slot="toolbar-link"
      className={cn(
        'paragraph-regular-secondary text-fg-secondary hover:text-fg-primary px-2 whitespace-nowrap outline-none',
        'focus-visible:ring-stroke-status-focus focus-visible:ring-1',
        className,
      )}
      {...props}
    />
  );
}

export {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarLink,
  ToolbarSeparator,
  toolbarIconShellSizeMap,
  useToolbar,
  type ToolbarSize,
  type ToolbarShape,
};
