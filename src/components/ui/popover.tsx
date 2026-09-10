'use client';

import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import * as React from 'react';

import { cn } from '@/lib/utils';

const PopoverContext =
  React.createContext<React.RefObject<Element | null> | null>(null);

function Popover({ children, ...props }: PopoverPrimitive.Root.Props) {
  const anchorRef = React.useRef<Element | null>(null);

  return (
    <PopoverContext.Provider value={anchorRef}>
      <PopoverPrimitive.Root data-slot="popover" {...props}>
        {children}
      </PopoverPrimitive.Root>
    </PopoverContext.Provider>
  );
}

function PopoverTrigger({
  asChild = false,
  children,
  ...props
}: PopoverPrimitive.Trigger.Props & {
  asChild?: boolean;
}) {
  if (asChild) {
    if (!React.isValidElement(children)) {
      throw new Error(
        'PopoverTrigger with asChild expects a single element child',
      );
    }

    return (
      <PopoverPrimitive.Trigger
        data-slot="popover-trigger"
        render={children}
        {...props}
      />
    );
  }

  return (
    <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props}>
      {children}
    </PopoverPrimitive.Trigger>
  );
}

type PopoverContentProps = PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    'align' | 'side' | 'sideOffset' | 'alignOffset' | 'anchor'
  > & {
    onOpenAutoFocus?: (event: Event) => void;
  };

function PopoverContent({
  className,
  align = 'center',
  side,
  sideOffset = 4,
  alignOffset,
  anchor: anchorProp,
  onOpenAutoFocus,
  initialFocus,
  children,
  ...props
}: PopoverContentProps) {
  const anchorRef = React.useContext(PopoverContext);
  const anchor = anchorProp ?? anchorRef ?? undefined;
  const resolvedInitialFocus =
    initialFocus ?? (onOpenAutoFocus ? false : undefined);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50">
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          initialFocus={resolvedInitialFocus}
          className={cn(
            'bg-surface-primary text-fg-primary border-stroke-secondary shadow-elevation-1 z-50 w-72 origin-(--transform-origin) border p-4 outline-hidden',
            'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className,
          )}
          {...props}>
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({ ref, ...props }: React.ComponentProps<'div'>) {
  const anchorRef = React.useContext(PopoverContext);

  return (
    <div
      ref={node => {
        if (anchorRef) {
          anchorRef.current = node;
        }

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      data-slot="popover-anchor"
      {...props}
    />
  );
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
