'use client';

import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

type StepperSize = 'sm' | 'default';
type StepperOrientation = 'horizontal' | 'vertical';
type StepperStatus = 'incomplete' | 'active' | 'completed' | 'error';

const stepperRootClass = cn(
  'group/stepper flex w-full',
  'group-data-[orientation=horizontal]/stepper:flex-row group-data-[orientation=horizontal]/stepper:gap-2',
  'group-data-[orientation=vertical]/stepper:flex-col group-data-[orientation=vertical]/stepper:gap-2',
  'group-data-[indicator=shape]/stepper:group-data-[orientation=vertical]/stepper:gap-1',
);

const stepperItemClass = cn(
  'group/stepper-item flex min-w-0 flex-1',
  'group-data-[orientation=horizontal]/stepper:flex-col group-data-[orientation=horizontal]/stepper:gap-3',
  'group-data-[orientation=vertical]/stepper:flex-row group-data-[orientation=vertical]/stepper:gap-4',
);

const stepperRailClass = cn(
  'flex shrink-0 items-center',
  'group-data-[orientation=horizontal]/stepper:flex-row group-data-[orientation=horizontal]/stepper:gap-2',
  'group-data-[orientation=vertical]/stepper:flex-col group-data-[orientation=vertical]/stepper:gap-2',
);

const stepperIndicatorVariants = cva(
  'inline-flex shrink-0 items-center justify-center',
  {
    variants: {},
    compoundVariants: [
      {
        className: [
          'rounded-full border label-regular-primary',
          'group-data-[indicator=number]/stepper:size-8 group-data-[indicator=number]/stepper:group-data-[size=sm]/stepper:size-6',
          'group-data-[indicator=number]/stepper:group-data-[size=sm]/stepper:label-small-primary',
          'group-data-[indicator=shape]/stepper:size-4 group-data-[indicator=shape]/stepper:rounded-sm',
          'group-data-[indicator=icon]/stepper:border-0 group-data-[indicator=icon]/stepper:bg-transparent group-data-[indicator=icon]/stepper:p-0',
          'group-data-[indicator=number]/stepper:group-data-[status=incomplete]/stepper-item:border-stroke-secondary group-data-[indicator=number]/stepper:group-data-[status=incomplete]/stepper-item:bg-fill-muted group-data-[indicator=number]/stepper:group-data-[status=incomplete]/stepper-item:text-fg-primary',
          'group-data-[indicator=number]/stepper:group-data-[status=active]/stepper-item:border-stroke-active group-data-[indicator=number]/stepper:group-data-[status=active]/stepper-item:bg-fill-active group-data-[indicator=number]/stepper:group-data-[status=active]/stepper-item:text-fg-primary-inverse',
          'group-data-[indicator=number]/stepper:group-data-[status=completed]/stepper-item:border-0 group-data-[indicator=number]/stepper:group-data-[status=completed]/stepper-item:bg-transparent group-data-[indicator=number]/stepper:group-data-[status=completed]/stepper-item:p-0',
          'group-data-[indicator=number]/stepper:group-data-[status=error]/stepper-item:border-0 group-data-[indicator=number]/stepper:group-data-[status=error]/stepper-item:bg-transparent group-data-[indicator=number]/stepper:group-data-[status=error]/stepper-item:p-0',
          'group-data-[indicator=shape]/stepper:group-data-[status=incomplete]/stepper-item:border-stroke-secondary group-data-[indicator=shape]/stepper:group-data-[status=incomplete]/stepper-item:bg-fill-muted',
          'group-data-[indicator=shape]/stepper:group-data-[status=active]/stepper-item:border-stroke-active group-data-[indicator=shape]/stepper:group-data-[status=active]/stepper-item:bg-fill-active-inverse',
          'group-data-[indicator=shape]/stepper:group-data-[status=completed]/stepper-item:border-stroke-active group-data-[indicator=shape]/stepper:group-data-[status=completed]/stepper-item:bg-fill-active',
          'group-data-[indicator=shape]/stepper:group-data-[status=error]/stepper-item:border-stroke-status-error group-data-[indicator=shape]/stepper:group-data-[status=error]/stepper-item:bg-status-error',
        ],
      },
    ],
  },
);

const stepperSeparatorVariants = cva([
  'shrink-0 bg-stroke-tertiary',
  'group-data-[status=completed]/stepper-item:bg-stroke-active',
  'group-data-[orientation=horizontal]/stepper:h-px group-data-[orientation=horizontal]/stepper:min-h-px group-data-[orientation=horizontal]/stepper:w-6 group-data-[orientation=horizontal]/stepper:min-w-6 group-data-[orientation=horizontal]/stepper:flex-1',
  'group-data-[orientation=vertical]/stepper:w-px group-data-[orientation=vertical]/stepper:min-w-px group-data-[orientation=vertical]/stepper:h-6 group-data-[orientation=vertical]/stepper:min-h-6',
]);

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

function Stepper({
  size = 'default',
  orientation = 'vertical',
  className,
  ...props
}: React.ComponentProps<'div'> & {
  size?: StepperSize;
  orientation?: StepperOrientation;
}) {
  return (
    <div
      role="list"
      data-slot="stepper"
      data-size={size}
      data-orientation={orientation}
      className={cn(stepperRootClass, className)}
      {...props}
    />
  );
}

function StepperItem({
  status = 'incomplete',
  className,
  ...props
}: React.ComponentProps<'div'> & { status?: StepperStatus }) {
  return (
    <div
      role="listitem"
      data-slot="stepper-item"
      data-status={status}
      className={cn(stepperItemClass, className)}
      {...props}
    />
  );
}

function StepperRail({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="stepper-rail"
      className={cn(stepperRailClass, className)}
      {...props}
    />
  );
}

function StepperIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="stepper-indicator"
      className={cn(stepperIndicatorVariants(), className)}
      {...props}>
      {children}
    </div>
  );
}

function StepperSeparator({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="stepper-separator"
      aria-hidden
      className={cn(stepperSeparatorVariants(), className)}
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

function StepperText({
  variant = 'title',
  className,
  ...props
}: React.ComponentProps<'p'> & VariantProps<typeof stepperTextVariants>) {
  return (
    <p
      data-slot={`stepper-${variant ?? 'title'}`}
      className={cn(stepperTextVariants({ variant }), className)}
      {...props}
    />
  );
}

export {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperRail,
  StepperSeparator,
  StepperText,
  stepperIndicatorVariants,
  stepperSeparatorVariants,
  stepperTextVariants,
};
export type { StepperOrientation, StepperSize, StepperStatus };
