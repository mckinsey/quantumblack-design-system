'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { cn } from '@/lib/utils';

type StepperSize = 'sm' | 'default';
type StepperOrientation = 'horizontal' | 'vertical';
type StepperIndicator = 'number' | 'custom';
type StepperStatus = 'incomplete' | 'active' | 'completed' | 'error';

const StepperContext = React.createContext<{
  size: StepperSize;
  indicator: StepperIndicator;
}>({ size: 'default', indicator: 'number' });

const StepperItemContext = React.createContext<{ status: StepperStatus }>({
  status: 'incomplete',
});

function useMarkerState(status?: StepperStatus, size?: StepperSize) {
  const root = React.useContext(StepperContext);
  const item = React.useContext(StepperItemContext);

  return {
    status: status ?? item.status,
    size: size ?? root.size,
  };
}

const stepperVariants = cva('group/stepper flex w-full', {
  variants: {
    orientation: {
      horizontal: 'flex-row gap-2',
      vertical: 'flex-col gap-2',
    },
    indicator: {
      number: '',
      custom: '',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    indicator: 'number',
  },
});

const stepperItemVariants = cva('group/stepper-item flex min-w-0', {
  variants: {},
  compoundVariants: [
    {
      className: [
        'group-data-[orientation=horizontal]/stepper:flex-1 group-data-[orientation=horizontal]/stepper:flex-col group-data-[orientation=horizontal]/stepper:gap-3',
        'group-data-[orientation=vertical]/stepper:flex-row group-data-[orientation=vertical]/stepper:gap-4',
      ],
    },
  ],
});

const stepperRailVariants = cva('flex shrink-0 items-center', {
  variants: {},
  compoundVariants: [
    {
      className: [
        'group-data-[orientation=horizontal]/stepper:flex-row group-data-[orientation=horizontal]/stepper:gap-2',
        'group-data-[orientation=vertical]/stepper:self-stretch group-data-[orientation=vertical]/stepper:flex-col group-data-[orientation=vertical]/stepper:gap-2',
        'group-data-[orientation=vertical]/stepper:group-data-[size=sm]/stepper:min-h-10',
        'group-data-[orientation=vertical]/stepper:group-data-[size=default]/stepper:min-h-12',
      ],
    },
  ],
});

const stepperIndicatorVariants = cva(
  'inline-flex shrink-0 items-center justify-center',
);

const stepperSeparatorVariants = cva(
  'relative shrink-0 overflow-hidden bg-stroke-tertiary',
  {
    variants: {},
    compoundVariants: [
      {
        className: [
          'group-data-[orientation=horizontal]/stepper:h-px group-data-[orientation=horizontal]/stepper:min-h-px group-data-[orientation=horizontal]/stepper:w-6 group-data-[orientation=horizontal]/stepper:min-w-6 group-data-[orientation=horizontal]/stepper:flex-1',
          'group-data-[orientation=vertical]/stepper:h-auto group-data-[orientation=vertical]/stepper:min-h-0 group-data-[orientation=vertical]/stepper:w-px group-data-[orientation=vertical]/stepper:min-w-px group-data-[orientation=vertical]/stepper:flex-1',
        ],
      },
    ],
  },
);

const stepperSeparatorFillVariants = cva(
  'absolute inset-0 bg-stroke-active transition-transform duration-300 ease-out',
  {
    variants: {},
    compoundVariants: [
      {
        className: [
          'group-data-[orientation=vertical]/stepper:origin-top group-data-[orientation=vertical]/stepper:scale-y-0 group-data-[orientation=vertical]/stepper:group-data-[status=completed]/stepper-item:scale-y-100',
          'group-data-[orientation=horizontal]/stepper:origin-left group-data-[orientation=horizontal]/stepper:scale-x-0 group-data-[orientation=horizontal]/stepper:group-data-[status=completed]/stepper-item:scale-x-100',
        ],
      },
    ],
  },
);

const stepperTextVariants = cva('', {
  variants: {
    variant: {
      label:
        'text-fg-secondary uppercase group-data-[size=sm]/stepper:label-small-primary group-data-[size=default]/stepper:headings-h4-semibold',
      title:
        'text-fg-primary group-data-[size=sm]/stepper:headings-h4-regular group-data-[size=default]/stepper:headings-h3-regular',
      description:
        'text-fg-secondary group-data-[size=sm]/stepper:paragraph-small-primary group-data-[size=default]/stepper:paragraph-regular-primary',
    },
  },
  defaultVariants: {
    variant: 'title',
  },
});

const markerNumberVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-full transition-[background-color,border-color,color] duration-200',
  {
    variants: {
      size: {
        default: 'size-8 label-regular-primary',
        sm: 'size-6 label-small-primary',
      },
      status: {
        incomplete:
          'border border-stroke-secondary bg-fill-muted text-fg-primary',
        active:
          'border border-stroke-active bg-fill-active text-fg-primary-inverse',
        completed: 'border-0 bg-fill-active',
        error: 'border-0 bg-status-error',
      },
    },
    defaultVariants: {
      size: 'default',
      status: 'incomplete',
    },
  },
);

const markerIconShellVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-full transition-[background-color,color] duration-200',
  {
    variants: {
      size: {
        default: 'size-8',
        sm: 'size-6',
      },
      status: {
        incomplete: '',
        active: 'bg-fill-active',
        completed: '',
        error: '',
      },
    },
    defaultVariants: {
      size: 'default',
      status: 'incomplete',
    },
  },
);

const markerShapeVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center transition-[background-color,border-color,color] duration-200',
  {
    variants: {
      size: {
        default: 'size-8',
        sm: 'size-6',
      },
      shape: {
        circle: '',
        square: '',
      },
    },
    defaultVariants: {
      size: 'default',
      shape: 'circle',
    },
  },
);

const markerShapeMarkVariants = cva(
  'relative transition-[background-color,border-color] duration-200',
  {
    variants: {
      size: {
        default: 'size-4',
        sm: 'size-3',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-sm',
      },
      status: {
        incomplete: 'border border-stroke-secondary bg-fill-muted',
        active: 'border border-stroke-active bg-fill-active-inverse',
        completed: 'border-0 bg-fill-active',
        error: 'border-0 bg-status-error',
      },
    },
    defaultVariants: {
      size: 'default',
      shape: 'circle',
      status: 'incomplete',
    },
  },
);

type MarkerProps = {
  status?: StepperStatus;
  size?: StepperSize;
  className?: string;
  children?: React.ReactNode;
};

function NumberStatusIcon({
  status,
  size,
}: {
  status: 'completed' | 'error';
  size: StepperSize;
}) {
  return (
    <IconShell
      size={size === 'sm' ? 'sm' : 'default'}
      type="neutral-inverse"
      variant="secondary">
      <Icon icon={status === 'completed' ? 'check_circle_outline' : 'cancel'} />
    </IconShell>
  );
}

/** Figma type=number — digit for incomplete/active; status icons for completed/error. */
function StepperMarkerNumber({
  status: statusProp,
  size: sizeProp,
  className,
  children,
}: MarkerProps) {
  const { status, size } = useMarkerState(statusProp, sizeProp);

  return (
    <span
      data-slot="stepper-marker-number"
      className={cn(markerNumberVariants({ size, status }), className)}>
      {status === 'completed' || status === 'error' ? (
        <NumberStatusIcon status={status} size={size} />
      ) : (
        children
      )}
    </span>
  );
}

/** Figma type=icon — pass Icon as children; status drives shell + IconShell tone. */
function StepperMarkerIcon({
  status: statusProp,
  size: sizeProp,
  className,
  children,
}: MarkerProps) {
  const { status, size } = useMarkerState(statusProp, sizeProp);
  const iconSize = size === 'sm' ? 'sm' : 'default';

  return (
    <span
      data-slot="stepper-marker-icon"
      className={cn(markerIconShellVariants({ size, status }), className)}>
      <IconShell
        size={iconSize}
        type={
          status === 'active'
            ? 'neutral-inverse'
            : status === 'error'
              ? 'custom'
              : 'neutral'
        }
        variant={status === 'incomplete' ? 'secondary' : 'primary'}
        className={status === 'error' ? 'text-status-error' : undefined}>
        {children}
      </IconShell>
    </span>
  );
}

function StepperMarkerShape({
  shape,
  status: statusProp,
  size: sizeProp,
  className,
}: MarkerProps & { shape: 'circle' | 'square' }) {
  const { status, size } = useMarkerState(statusProp, sizeProp);

  return (
    <span
      data-slot={`stepper-marker-${shape}`}
      className={cn(markerShapeVariants({ size, shape }), className)}>
      <span className={markerShapeMarkVariants({ size, shape, status })}>
        {status === 'active' ? (
          <span
            className={cn(
              'bg-fill-active absolute top-1/2 left-1/2 size-1 -translate-x-1/2 -translate-y-1/2',
              shape === 'circle' ? 'rounded-full' : 'rounded-sm',
            )}
          />
        ) : null}
      </span>
    </span>
  );
}

/** Figma type=circle. */
function StepperMarkerCircle(props: MarkerProps) {
  return <StepperMarkerShape shape="circle" {...props} />;
}

/** Figma type=square. */
function StepperMarkerSquare(props: MarkerProps) {
  return <StepperMarkerShape shape="square" {...props} />;
}

type StepperProps = useRender.ComponentProps<'div'> & {
  size?: StepperSize;
  /** `number` auto-wraps children in StepperMarkerNumber. `custom` is a passthrough slot. */
  indicator?: StepperIndicator;
} & VariantProps<typeof stepperVariants>;

function Stepper({
  size = 'default',
  orientation = 'vertical',
  indicator = 'number',
  className,
  render,
  ...props
}: StepperProps) {
  return (
    <StepperContext.Provider value={{ size, indicator }}>
      {useRender({
        defaultTagName: 'div',
        props: mergeProps<'div'>(
          {
            role: 'list',
            className: cn(
              stepperVariants({ orientation, indicator }),
              className,
            ),
          },
          props,
        ),
        render,
        state: {
          slot: 'stepper',
          size,
          orientation,
          indicator,
        },
      })}
    </StepperContext.Provider>
  );
}

function StepperItem({
  status = 'incomplete',
  className,
  render,
  ...props
}: useRender.ComponentProps<'div'> & { status?: StepperStatus }) {
  return (
    <StepperItemContext.Provider value={{ status }}>
      {useRender({
        defaultTagName: 'div',
        props: mergeProps<'div'>(
          {
            role: 'listitem',
            'aria-current': status === 'active' ? 'step' : undefined,
            className: cn(stepperItemVariants(), className),
          },
          props,
        ),
        render,
        state: { slot: 'stepper-item', status },
      })}
    </StepperItemContext.Provider>
  );
}

function StepperRail({
  className,
  render,
  ...props
}: useRender.ComponentProps<'div'>) {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      { className: cn(stepperRailVariants(), className) },
      props,
    ),
    render,
    state: { slot: 'stepper-rail' },
  });
}

function StepperIndicator({
  className,
  render,
  children,
  ...props
}: useRender.ComponentProps<'div'>) {
  const { indicator } = React.useContext(StepperContext);

  const content =
    indicator === 'number' ? (
      <StepperMarkerNumber>{children}</StepperMarkerNumber>
    ) : (
      children
    );

  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn(stepperIndicatorVariants(), className),
        children: content,
      },
      props,
    ),
    render,
    state: { slot: 'stepper-indicator' },
  });
}

function StepperSeparator({
  className,
  render,
  ...props
}: useRender.ComponentProps<'div'>) {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        'aria-hidden': true,
        className: cn(stepperSeparatorVariants(), className),
        children: <span className={stepperSeparatorFillVariants()} />,
      } as React.ComponentProps<'div'>,
      props,
    ),
    render,
    state: { slot: 'stepper-separator' },
  });
}

function StepperContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<'div'>) {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn(
          'flex min-w-0 flex-1 flex-col gap-2 group-data-[orientation=vertical]/stepper:pb-6',
          // Vertical: first text line (label, else title) matches marker height (sm=24 / default=32)
          // and centers in that box so the indicator optically aligns — avoids Figma magic padding.
          'group-data-[orientation=vertical]/stepper:[&>[data-slot=stepper-label]]:flex group-data-[orientation=vertical]/stepper:[&>[data-slot=stepper-label]]:items-center group-data-[orientation=vertical]/stepper:group-data-[size=sm]/stepper:[&>[data-slot=stepper-label]]:min-h-6 group-data-[orientation=vertical]/stepper:group-data-[size=default]/stepper:[&>[data-slot=stepper-label]]:min-h-8',
          'group-data-[orientation=vertical]/stepper:[&:not(:has([data-slot=stepper-label]))>[data-slot=stepper-title]]:flex group-data-[orientation=vertical]/stepper:[&:not(:has([data-slot=stepper-label]))>[data-slot=stepper-title]]:items-center group-data-[orientation=vertical]/stepper:group-data-[size=sm]/stepper:[&:not(:has([data-slot=stepper-label]))>[data-slot=stepper-title]]:min-h-6 group-data-[orientation=vertical]/stepper:group-data-[size=default]/stepper:[&:not(:has([data-slot=stepper-label]))>[data-slot=stepper-title]]:min-h-8',
          className,
        ),
      },
      props,
    ),
    render,
    state: { slot: 'stepper-content' },
  });
}

function StepperLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<'p'>) {
  return useRender({
    defaultTagName: 'p',
    props: mergeProps<'p'>(
      { className: cn(stepperTextVariants({ variant: 'label' }), className) },
      props,
    ),
    render,
    state: { slot: 'stepper-label' },
  });
}

function StepperTitle({
  className,
  render,
  ...props
}: useRender.ComponentProps<'p'>) {
  return useRender({
    defaultTagName: 'p',
    props: mergeProps<'p'>(
      { className: cn(stepperTextVariants({ variant: 'title' }), className) },
      props,
    ),
    render,
    state: { slot: 'stepper-title' },
  });
}

function StepperDescription({
  className,
  render,
  ...props
}: useRender.ComponentProps<'p'>) {
  return useRender({
    defaultTagName: 'p',
    props: mergeProps<'p'>(
      {
        className: cn(
          stepperTextVariants({ variant: 'description' }),
          className,
        ),
      },
      props,
    ),
    render,
    state: { slot: 'stepper-description' },
  });
}

export {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperLabel,
  StepperMarkerCircle,
  StepperMarkerIcon,
  StepperMarkerNumber,
  StepperMarkerSquare,
  StepperRail,
  StepperSeparator,
  StepperTitle,
  stepperIndicatorVariants,
  stepperSeparatorVariants,
  stepperTextVariants,
  stepperVariants,
};
export type {
  StepperIndicator as StepperIndicatorType,
  StepperOrientation,
  StepperProps,
  StepperSize,
  StepperStatus,
};
