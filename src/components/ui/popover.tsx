'use client';

import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

export type PopoverSize = 'sm' | 'md' | 'default' | 'lg' | 'xl';

type PopoverAnchorContextValue = {
  anchorRef: React.RefObject<HTMLElement | null> | null;
  setAnchorRef: (ref: React.RefObject<HTMLElement | null> | null) => void;
};

const PopoverAnchorContext = React.createContext<PopoverAnchorContextValue>({
  anchorRef: null,
  setAnchorRef: () => {},
});

const popoverContentVariants = cva(
  [
    'group/popover bg-fill-onsurface-ui-1 text-fg-primary shadow-elevation-2',
    'z-50 flex max-w-[calc(100vw-2rem)] origin-(--transform-origin) flex-col gap-0 outline-hidden duration-100',
    'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95',
    'data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    'data-[size=sm]:pb-4',
    'data-[size=md]:pb-5',
    'data-[size=default]:pb-5',
    'data-[size=lg]:pb-5',
    'data-[size=xl]:pb-5',
  ],
  {
    variants: {
      size: {
        sm: 'w-[min(256px,calc(100%-2rem))]',
        default: 'w-[min(280px,calc(100%-2rem))]',
        md: 'w-[min(320px,calc(100%-2rem))]',
        lg: 'w-[min(360px,calc(100%-2rem))]',
        xl: 'w-[min(592px,calc(100%-2rem))]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const popoverInsetX =
  'group-data-[size=sm]/popover:px-4 group-data-[size=md]/popover:px-4 group-data-[size=default]/popover:px-4 group-data-[size=lg]/popover:px-5 group-data-[size=xl]/popover:px-5';

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
  size = 'default',
  anchor: anchorProp,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'anchor' | 'side' | 'sideOffset'
  > & {
    size?: PopoverSize;
  }) {
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
          data-size={size}
          className={cn(popoverContentVariants({ size }), className)}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverMedia({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="popover-media"
      className={cn(
        'bg-fill-onsurface-ui-2 relative w-full shrink-0 overflow-clip',
        '[&>img]:absolute [&>img]:inset-0 [&>img]:size-full [&>img]:object-cover',
        className,
      )}
      {...props}
    />
  );
}

function PopoverHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="popover-header"
      className={cn(
        'flex w-full flex-col',
        popoverInsetX,
        'group-data-[size=sm]/popover:gap-1 group-data-[size=sm]/popover:pt-4',
        'group-data-[size=md]/popover:gap-2 group-data-[size=md]/popover:pt-5',
        'group-data-[size=default]/popover:gap-2 group-data-[size=default]/popover:pt-5',
        'group-data-[size=lg]/popover:gap-2 group-data-[size=lg]/popover:pt-5',
        'group-data-[size=xl]/popover:gap-2 group-data-[size=xl]/popover:pt-5',
        className,
      )}
      {...props}
    />
  );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn(
        'text-fg-primary',
        'group-data-[size=sm]/popover:paragraph-small-emphasised',
        'group-data-[size=md]/popover:paragraph-regular-emphasised-600',
        'group-data-[size=default]/popover:paragraph-regular-emphasised-600',
        'group-data-[size=lg]/popover:paragraph-regular-emphasised-600',
        'group-data-[size=xl]/popover:paragraph-regular-emphasised-600',
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
      className={cn(
        'text-fg-secondary',
        'group-data-[size=sm]/popover:label-regular-primary',
        'group-data-[size=md]/popover:paragraph-regular-primary',
        'group-data-[size=default]/popover:paragraph-regular-primary',
        'group-data-[size=lg]/popover:paragraph-regular-primary',
        'group-data-[size=xl]/popover:paragraph-regular-primary',
        className,
      )}
      {...props}
    />
  );
}

function PopoverBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="popover-body"
      className={cn(
        'flex w-full flex-col gap-4',
        popoverInsetX,
        'group-data-[size=sm]/popover:pt-4',
        'group-data-[size=md]/popover:pt-5',
        'group-data-[size=default]/popover:pt-5',
        'group-data-[size=lg]/popover:pt-5',
        'group-data-[size=xl]/popover:pt-5',
        className,
      )}
      {...props}
    />
  );
}

function PopoverFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="popover-footer"
      className={cn(
        'flex w-full items-center gap-2',
        popoverInsetX,
        'group-data-[size=sm]/popover:pt-4',
        'group-data-[size=md]/popover:pt-6',
        'group-data-[size=default]/popover:pt-5',
        'group-data-[size=lg]/popover:pt-6',
        'group-data-[size=xl]/popover:pt-6',
        className,
      )}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverMedia,
  PopoverTitle,
  PopoverTrigger,
};
