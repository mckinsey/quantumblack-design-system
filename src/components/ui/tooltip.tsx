'use client';

import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import * as React from 'react';

import { cn } from '@/lib/utils';

const ARROW_H = 4;

type PhysicalSide = 'top' | 'right' | 'bottom' | 'left';

function toPhysicalSide(
  side: TooltipPrimitive.Arrow.State['side'],
): PhysicalSide {
  if (side === 'inline-start') return 'left';
  if (side === 'inline-end') return 'right';

  return side;
}

function arrowStyle(
  side: PhysicalSide,
  base: React.CSSProperties,
): React.CSSProperties {
  const style: React.CSSProperties = { ...base };

  if (side === 'top') {
    style.top = 'auto';
    style.bottom = 0;
    style.transform = 'translateY(100%)';
  }

  if (side === 'bottom') {
    style.bottom = 'auto';
    style.top = 0;
    style.transformOrigin = 'center 0';
    style.transform = 'rotate(180deg)';
  }

  if (side === 'left') {
    style.left = 'auto';
    style.right = 0;
    style.transformOrigin = '100% 0';
    style.transform = 'translateY(50%) rotate(-90deg) translateX(50%)';
  }

  if (side === 'right') {
    style.right = 'auto';
    style.left = 0;
    style.transformOrigin = '0 0';
    style.transform = 'translateY(50%) rotate(90deg) translateX(-50%)';
  }

  return style;
}

function TooltipArrow() {
  return (
    <TooltipPrimitive.Arrow
      data-slot="tooltip-arrow"
      className="z-50"
      render={(props, state) => {
        const side = toPhysicalSide(state.side);

        return (
          <span {...props} style={arrowStyle(side, props.style ?? {})}>
            <svg
              width={8}
              height={ARROW_H}
              viewBox="0 0 8 4"
              className="fill-fill-primary block"
              aria-hidden>
              <polygon points="0,0 8,0 4,4" />
            </svg>
          </span>
        );
      }}
    />
  );
}

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  );
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  side = 'top',
  sideOffset = ARROW_H,
  align = 'center',
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  >) {
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
            'bg-fill-primary text-fg-primary-inverse paragraph-small-primary shadow-elevation-1 z-50 w-fit max-w-[140px] min-w-9 origin-(--transform-origin) rounded-none p-1 text-balance',
            'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className,
          )}
          {...props}>
          {children}
          <TooltipArrow />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
