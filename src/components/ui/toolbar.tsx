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
  orientation: 'horizontal' | 'vertical';
}

const ToolbarContext = React.createContext<ToolbarContextValue>({
  size: 'reg',
  shape: 'circle',
  orientation: 'horizontal',
});

const toolbarIconSizeMap: Record<ToolbarSize, 'icon-sm' | 'icon' | 'icon-lg'> =
  {
    sm: 'icon-sm',
    reg: 'icon',
    lg: 'icon-lg',
  };

const toolbarSeparatorSizeMap: Record<ToolbarSize, string> = {
  sm: 'h-6',
  reg: 'h-7',
  lg: 'h-10',
};

const toolbarVariants = cva('inline-flex w-fit items-center', {
  variants: {
    boxed: {
      true: 'bg-fill-secondary-inverse border border-stroke-tertiary p-2 shadow-elevation-1',
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
    {
      orientation: 'horizontal',
      boxed: true,
      className: 'gap-2',
    },
    {
      orientation: 'vertical',
      boxed: true,
      className: 'gap-2',
    },
    {
      orientation: 'horizontal',
      boxed: false,
      shape: 'circle',
      className: 'gap-1',
    },
    {
      orientation: 'horizontal',
      boxed: false,
      shape: 'square',
      className: 'gap-2',
    },
    {
      orientation: 'vertical',
      boxed: false,
      shape: 'circle',
      className: 'gap-1',
    },
    {
      orientation: 'vertical',
      boxed: false,
      shape: 'square',
      className: 'gap-2',
    },
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
    shape === 'circle' && 'rounded-full',
    className,
  );
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
    <ToolbarContext.Provider value={{ size, shape, orientation }}>
      <ToolbarPrimitive.Root
        data-slot="toolbar"
        data-size={size}
        data-shape={shape}
        data-boxed={boxed ? 'true' : 'false'}
        orientation={orientation}
        className={cn(
          toolbarVariants({ boxed, orientation, shape, size }),
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
  const { size, orientation } = React.useContext(ToolbarContext);

  return (
    <ToolbarPrimitive.Separator
      data-slot="toolbar-separator"
      decorative
      orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'}
      className={cn(
        'bg-stroke-tertiary shrink-0',
        orientation === 'horizontal'
          ? cn('mx-1 w-px', toolbarSeparatorSizeMap[size])
          : cn('my-1 h-px w-7'),
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
  const { orientation } = React.useContext(ToolbarContext);

  return (
    <ToolbarPrimitive.ToggleGroup
      data-slot="toolbar-toggle-group"
      className={cn(
        'inline-flex items-center gap-1',
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
  type ToolbarSize,
  type ToolbarShape,
};
