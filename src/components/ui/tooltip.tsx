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

function wrapTriggerRender(
  render: TooltipPrimitive.Trigger.Props['render'],
  fallbackChildren: React.ReactNode,
): NonNullable<TooltipPrimitive.Trigger.Props['render']> {
  return (triggerProps, state) => {
    const props = withoutPopupOpen(triggerProps as TriggerDomProps);

    if (render) {
      if (typeof render === 'function') {
        return render(props, state);
      }

      return React.cloneElement(
        render,
        mergeProps<'button'>(props, render.props as TriggerDomProps),
      );
    }

    return (
      <button type="button" {...props}>
        {fallbackChildren}
      </button>
    );
  };
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
  ...props
}: TooltipTriggerProps) {
  const resolvedRender = React.useMemo(() => {
    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement;

      return (triggerProps: TriggerDomProps) =>
        React.cloneElement(
          child,
          mergeProps<'button'>(
            withoutPopupOpen(triggerProps),
            child.props as TriggerDomProps,
          ),
        );
    }

    return wrapTriggerRender(render, children);
  }, [asChild, children, render]);

  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      {...props}
      render={resolvedRender}>
      {!asChild && render ? children : null}
    </TooltipPrimitive.Trigger>
  );
}

const ARROW_H = 5;

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
              width={10}
              height={ARROW_H}
              viewBox="0 0 30 10"
              preserveAspectRatio="none"
              className="fill-fill-primary block">
              <polygon points="0,0 30,0 15,10" />
            </svg>
          </span>
        );
      }}
    />
  );
}

function TooltipContent({
  className,
  side = 'top',
  sideOffset = ARROW_H,
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
          <TooltipArrow />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
