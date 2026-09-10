'use client';

import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import * as React from 'react';

import { cn } from '@/lib/utils';

type PopoverAnchorContextValue = {
  anchorRef: React.RefObject<HTMLElement | null> | null;
  setAnchorRef: (ref: React.RefObject<HTMLElement | null> | null) => void;
};

const PopoverAnchorContext = React.createContext<PopoverAnchorContextValue>({
  anchorRef: null,
  setAnchorRef: () => {},
});

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  const [anchorRef, setAnchorRef] =
    React.useState<React.RefObject<HTMLElement | null> | null>(null);
  const ctx = React.useMemo(() => ({ anchorRef, setAnchorRef }), [anchorRef]);

  return (
    <PopoverAnchorContext.Provider value={ctx}>
      <PopoverPrimitive.Root data-slot="popover" {...props} />
    </PopoverAnchorContext.Provider>
  );
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverAnchor({ className, ...props }: React.ComponentProps<'div'>) {
  const { setAnchorRef } = React.useContext(PopoverAnchorContext);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    setAnchorRef(ref);

    return () => setAnchorRef(null);
  }, [setAnchorRef]);

  return (
    <div
      ref={ref}
      data-slot="popover-anchor"
      className={cn(className)}
      {...props}
    />
  );
}

function PopoverContent({
  className,
  align = 'center',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 4,
  anchor: anchorProp,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'anchor' | 'side' | 'sideOffset'
  >) {
  const { anchorRef: contextAnchorRef } =
    React.useContext(PopoverAnchorContext);
  const anchor = anchorProp ?? contextAnchorRef ?? undefined;

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50">
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            'bg-surface-primary text-fg-primary border-stroke-secondary shadow-elevation-1 z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 border p-4 outline-hidden duration-100',
            'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="popover-header"
      className={cn('flex flex-col gap-0.5', className)}
      {...props}
    />
  );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn(
        'text-fg-primary paragraph-regular-emphasised-600',
        className,
      )}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn('text-fg-secondary paragraph-regular-primary', className)}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
};
