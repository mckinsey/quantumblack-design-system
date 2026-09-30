'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

type StepperSize = 'sm' | 'default';
type StepperOrientation = 'horizontal' | 'vertical';
type StepperIndicator = 'number' | 'icon' | 'shape';
type StepperStatus = 'incomplete' | 'active' | 'completed' | 'error';

// The root owns its own layout through props, so it uses plain variants. Every
// descendant reads `data-orientation` / `data-size` / `data-indicator` off the
// root and `data-status` off the item through `group-*` selectors — no context,
// and consumer-composed markup keeps working at any nesting depth.
const stepperVariants = cva('group/stepper flex w-full', {
  variants: {
    orientation: {
      horizontal: 'flex-row gap-2',
      vertical: 'flex-col gap-2',
    },
    indicator: {
      number: '',
      icon: '',
      shape: '',
    },
  },
  compoundVariants: [
    { orientation: 'vertical', indicator: 'shape', className: 'gap-1' },
  ],
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
        'group-data-[orientation=vertical]/stepper:flex-col group-data-[orientation=vertical]/stepper:gap-2',
      ],
    },
  ],
});

const stepperIndicatorVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-full border label-regular-primary',
  {
    variants: {},
    compoundVariants: [
      {
        className: [
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

const stepperSeparatorVariants = cva(
  'shrink-0 bg-stroke-tertiary group-data-[status=completed]/stepper-item:bg-stroke-active',
  {
    variants: {},
    compoundVariants: [
      {
        className: [
          'group-data-[orientation=horizontal]/stepper:h-px group-data-[orientation=horizontal]/stepper:min-h-px group-data-[orientation=horizontal]/stepper:w-6 group-data-[orientation=horizontal]/stepper:min-w-6 group-data-[orientation=horizontal]/stepper:flex-1',
          'group-data-[orientation=vertical]/stepper:h-6 group-data-[orientation=vertical]/stepper:min-h-6 group-data-[orientation=vertical]/stepper:w-px group-data-[orientation=vertical]/stepper:min-w-px',
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

type StepperProps = useRender.ComponentProps<'div'> & {
  size?: StepperSize;
  /** Marker treatment. Styling only — indicator content is always children. */
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
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        role: 'list',
        className: cn(stepperVariants({ orientation, indicator }), className),
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
  });
}

function StepperItem({
  status = 'incomplete',
  className,
  render,
  ...props
}: useRender.ComponentProps<'div'> & { status?: StepperStatus }) {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        role: 'listitem',
        className: cn(stepperItemVariants(), className),
      },
      props,
    ),
    render,
    state: { slot: 'stepper-item', status },
  });
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
  ...props
}: useRender.ComponentProps<'div'>) {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      { className: cn(stepperIndicatorVariants(), className) },
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
      { className: cn('flex min-w-0 flex-1 flex-col gap-2', className) },
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
