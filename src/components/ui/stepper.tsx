'use client';

import { cva } from 'class-variance-authority';
import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { cn } from '@/lib/utils';

type StepperSize = 'sm' | 'default';
type StepperOrientation = 'horizontal' | 'vertical';
type StepperIndicatorType = 'number' | 'icon' | 'shape';
type StepperStatus = 'incomplete' | 'active' | 'completed' | 'error';
type StepperTailStatus = 'incomplete' | 'completed';

type StepperContextValue = {
  size: StepperSize;
  orientation: StepperOrientation;
  indicator: StepperIndicatorType;
};

const StepperContext = React.createContext<StepperContextValue>({
  size: 'default',
  orientation: 'vertical',
  indicator: 'number',
});

const StepperItemContext = React.createContext<{ status: StepperStatus }>({
  status: 'incomplete',
});

const stepperIndicatorVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center rounded-full',
    'group-data-[indicator=shape]/stepper:rounded-sm',
  ],
  {
    variants: {
      size: {
        sm: 'size-6 group-data-[indicator=shape]/stepper:size-4',
        default: 'size-8 group-data-[indicator=shape]/stepper:size-4',
      },
      status: {
        incomplete:
          'border border-stroke-secondary bg-fill-muted text-fg-primary group-data-[indicator=shape]/stepper:border-stroke-secondary group-data-[indicator=shape]/stepper:bg-fill-muted',
        active:
          'border border-stroke-active bg-fill-active text-fg-primary-inverse group-data-[indicator=shape]/stepper:border-stroke-active group-data-[indicator=shape]/stepper:bg-fill-active-inverse',
        completed: 'border-0 bg-transparent p-0',
        error: 'border-0 bg-transparent p-0',
      },
    },
    defaultVariants: {
      size: 'default',
      status: 'incomplete',
    },
  },
);

const stepperSeparatorVariants = cva('shrink-0', {
  variants: {
    status: {
      incomplete: 'bg-stroke-tertiary',
      completed: 'bg-stroke-active',
    },
    orientation: {
      horizontal:
        'h-px min-h-px w-6 min-w-6 group-data-[orientation=horizontal]/stepper:flex-1',
      vertical: 'w-px min-w-px h-6 min-h-6',
    },
  },
  defaultVariants: {
    status: 'incomplete',
    orientation: 'vertical',
  },
});

function useStepper() {
  return React.useContext(StepperContext);
}

function useStepperItem() {
  return React.useContext(StepperItemContext);
}

function Stepper({
  size = 'default',
  orientation = 'vertical',
  indicator = 'number',
  className,
  ...props
}: React.ComponentProps<'div'> & {
  size?: StepperSize;
  orientation?: StepperOrientation;
  indicator?: StepperIndicatorType;
}) {
  return (
    <StepperContext.Provider value={{ size, orientation, indicator }}>
      <div
        data-slot="stepper"
        data-size={size}
        data-orientation={orientation}
        data-indicator={indicator}
        className={cn(
          'group/stepper flex w-full',
          orientation === 'horizontal'
            ? 'flex-row gap-2'
            : 'flex-col gap-2 group-data-[indicator=shape]/stepper:gap-1',
          className,
        )}
        {...props}
      />
    </StepperContext.Provider>
  );
}

function StepperItem({
  status = 'incomplete',
  className,
  ...props
}: React.ComponentProps<'div'> & { status?: StepperStatus }) {
  const { orientation } = useStepper();

  return (
    <StepperItemContext.Provider value={{ status }}>
      <div
        data-slot="stepper-item"
        data-status={status}
        className={cn(
          'group/stepper-item flex min-w-0 flex-1',
          orientation === 'horizontal' ? 'flex-col gap-3' : 'flex-row gap-4',
          className,
        )}
        {...props}
      />
    </StepperItemContext.Provider>
  );
}

function StepperRail({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useStepper();

  return (
    <div
      data-slot="stepper-rail"
      className={cn(
        'flex shrink-0 items-center',
        orientation === 'horizontal' ? 'flex-row gap-2' : 'flex-col gap-2',
        className,
      )}
      {...props}
    />
  );
}

function StepperIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  const { size, indicator } = useStepper();
  const { status } = useStepperItem();
  const iconShellSize = size === 'sm' ? 'sm' : 'default';

  if (
    indicator === 'number' &&
    (status === 'completed' || status === 'error')
  ) {
    const icon = status === 'completed' ? 'check_circle' : 'cancel';
    const tone =
      status === 'completed' ? 'text-status-success' : 'text-status-error';

    return (
      <div
        data-slot="stepper-indicator"
        data-status={status}
        className={cn(
          'inline-flex shrink-0 items-center justify-center',
          className,
        )}
        {...props}>
        <IconShell size={iconShellSize} type="custom" className={tone}>
          <Icon icon={icon} />
        </IconShell>
      </div>
    );
  }

  if (indicator === 'icon') {
    return (
      <div
        data-slot="stepper-indicator"
        data-status={status}
        className={cn(
          'inline-flex shrink-0 items-center justify-center',
          className,
        )}
        {...props}>
        <IconShell
          size={iconShellSize}
          type="neutral"
          variant={status === 'active' ? 'primary' : 'secondary'}>
          {children}
        </IconShell>
      </div>
    );
  }

  return (
    <div
      data-slot="stepper-indicator"
      data-status={status}
      className={cn(
        stepperIndicatorVariants({ size, status }),
        'label-regular-primary group-data-[size=sm]/stepper:label-small-primary',
        className,
      )}
      {...props}>
      {indicator === 'number' ? children : null}
    </div>
  );
}

function StepperSeparator({
  status,
  className,
  ...props
}: React.ComponentProps<'div'> & { status?: StepperTailStatus }) {
  const { orientation } = useStepper();
  const { status: itemStatus } = useStepperItem();
  const resolved =
    status ?? (itemStatus === 'completed' ? 'completed' : 'incomplete');

  return (
    <div
      data-slot="stepper-separator"
      data-status={resolved}
      aria-hidden
      className={cn(
        stepperSeparatorVariants({ status: resolved, orientation }),
        className,
      )}
      {...props}
    />
  );
}

function StepperContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="stepper-content"
      className={cn('flex min-w-0 flex-1 flex-col gap-2', className)}
      {...props}
    />
  );
}

function StepperLabel({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="stepper-label"
      className={cn(
        'text-fg-secondary group-data-[size=sm]/stepper:label-small-primary group-data-[size=default]/stepper:headings-h4-semibold uppercase',
        className,
      )}
      {...props}
    />
  );
}

function StepperTitle({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="stepper-title"
      className={cn(
        'text-fg-primary group-data-[size=sm]/stepper:headings-h4-regular group-data-[size=default]/stepper:headings-h3-regular',
        className,
      )}
      {...props}
    />
  );
}

function StepperDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="stepper-description"
      className={cn(
        'text-fg-secondary group-data-[size=sm]/stepper:paragraph-small-primary group-data-[size=default]/stepper:paragraph-regular-primary',
        className,
      )}
      {...props}
    />
  );
}

export {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperLabel,
  StepperRail,
  StepperSeparator,
  StepperTitle,
};
export type {
  StepperIndicatorType,
  StepperOrientation,
  StepperSize,
  StepperStatus,
  StepperTailStatus,
};
