'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/lib/utils';

type TooltipProviderProps = TooltipPrimitive.Provider.Props & {
  delayDuration?: number;
};

function TooltipProvider({
  delay,
  delayDuration,
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay ?? delayDuration ?? 0}
      {...props}
    />
  );
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

type TooltipTriggerProps = TooltipPrimitive.Trigger.Props & {
  asChild?: boolean;
};

function TooltipTrigger({
  asChild = false,
  children,
  render,
  nativeButton,
  ...props
}: TooltipTriggerProps) {
  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement;
    const usesNativeButton =
      nativeButton ??
      (typeof child.type === 'string' && child.type === 'button');

    return (
      <TooltipPrimitive.Trigger
        data-slot="tooltip-trigger"
        nativeButton={usesNativeButton}
        render={triggerProps => {
          const { nativeButton: _nativeButton, ...triggerDomProps } =
            triggerProps as typeof triggerProps & { nativeButton?: boolean };

          return (
            <Slot {...mergeProps<'button'>(triggerDomProps, props)}>
              {child}
            </Slot>
          );
        }}
      />
    );
  }

  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      nativeButton={nativeButton}
      render={render}
      {...props}>
      {children}
    </TooltipPrimitive.Trigger>
  );
}

function TooltipContent({
  className,
  side = 'top',
  sideOffset = 0,
  align = 'center',
  alignOffset = 0,
  children,
  hidden,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  > & {
    hidden?: boolean;
  }) {
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getTextContent).join('');

    if (React.isValidElement(node)) {
      const nodeProps = node.props as { children?: React.ReactNode };

      if (nodeProps.children) {
        return getTextContent(nodeProps.children);
      }
    }

    return '';
  };

  const textContent = getTextContent(children);
  const estimatedCharsPerLine = 35;
  const isMultiLine = textContent.length > estimatedCharsPerLine;

  if (hidden) {
    return null;
  }

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50">
        <TooltipPrimitive.Popup
          role="tooltip"
          data-slot="tooltip-content"
          className={cn(
            'bg-fill-primary text-fg-primary-inverse paragraph-small-primary shadow-elevation-1 z-50 w-fit min-w-[36px] origin-(--transform-origin) text-balance',
            'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            isMultiLine ? 'max-w-[220px] p-2' : 'max-w-[140px] p-1',
            className,
          )}
          {...props}>
          {children}
          <TooltipPrimitive.Arrow className="bg-fill-primary fill-fill-primary z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
