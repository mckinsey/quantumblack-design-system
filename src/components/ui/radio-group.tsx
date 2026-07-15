'use client';

import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const radioGroupVariants = cva('', {
  variants: {
    orientation: {
      vertical: 'grid',
      horizontal: 'flex flex-row',
    },
    density: {
      default: 'gap-3',
      comfortable: 'gap-4',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    density: 'default',
  },
});

function RadioGroup({
  className,
  orientation = 'vertical',
  density = 'default',
  ...props
}: RadioGroupPrimitive.Props & VariantProps<typeof radioGroupVariants>) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      data-orientation={orientation}
      data-density={density}
      className={cn(radioGroupVariants({ orientation, density }), className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  size = 'default',
  ...props
}: RadioPrimitive.Root.Props & {
  size?: 'default' | 'lg';
}) {
  const isLg = size === 'lg';
  const bboxSize = isLg ? 'size-6' : 'size-5';
  const circleSize = isLg ? 'size-5' : 'size-4';
  const dotSize = isLg ? 'size-2.5' : 'size-2';

  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      data-size={size}
      className={cn(
        bboxSize,
        'group relative shrink-0 cursor-pointer rounded-full outline-none',
        'flex items-center justify-center',
        'data-disabled:cursor-not-allowed',
        className,
      )}
      {...props}>
      <div
        className={cn(
          circleSize,
          'rounded-full border bg-transparent transition-colors',
          'border-stroke-primary',
          'ring-stroke-status-focus group-focus-visible:border-stroke-active group-focus-visible:ring-2',
          'group-data-disabled:border-stroke-tertiary',
        )}
      />

      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            dotSize,
            'bg-fill-active rounded-full',
            'group-data-disabled:bg-fill-disabled',
          )}
        />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem, radioGroupVariants };
