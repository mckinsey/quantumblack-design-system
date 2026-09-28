'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import * as React from 'react';

import { cn } from '@/lib/utils';

type TriggerDomProps = React.ComponentProps<'button'> & {
  'data-popup-open'?: string;
};

function withoutPopupOpen(props: TriggerDomProps) {
  const { 'data-popup-open': _open, ...rest } = props;

  return rest;
}

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
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({
  render,
  children,
  ...props
}: TooltipPrimitive.Trigger.Props) {
  const resolvedRender = React.useMemo(() => {
    return (
      triggerProps: TriggerDomProps,
      state: TooltipPrimitive.Trigger.State,
    ) => {
      const clean = withoutPopupOpen(triggerProps);

      if (render) {
        if (typeof render === 'function') {
          return render(clean, state);
        }

        return React.cloneElement(
          render,
          mergeProps<'button'>(clean, render.props as TriggerDomProps),
        );
      }

      return (
        <button type="button" {...clean}>
          {children}
        </button>
      );
    };
  }, [render, children]);

  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      {...props}
      render={resolvedRender}>
      {render ? children : null}
    </TooltipPrimitive.Trigger>
  );
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
            'bg-fill-primary text-fg-primary-inverse paragraph-small-primary shadow-elevation-1 z-50 w-fit min-w-9 origin-(--transform-origin) rounded-none text-balance',
            isMultiLine ? 'max-w-[220px] p-2' : 'max-w-[140px] p-1',
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
