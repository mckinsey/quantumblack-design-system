'use client';

import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import * as React from 'react';

import { cn } from '@/lib/utils';

function RadioGroup({
  className,
  orientation = 'vertical',
  ...props
}: RadioGroupPrimitive.Props & {
  orientation?: 'vertical' | 'horizontal';
}) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      data-orientation={orientation}
      className={cn(
        orientation === 'horizontal' ? 'flex flex-row gap-3' : 'grid gap-3',
        className,
      )}
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
        'group relative shrink-0 rounded-full outline-none',
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

export { RadioGroup, RadioGroupItem };
