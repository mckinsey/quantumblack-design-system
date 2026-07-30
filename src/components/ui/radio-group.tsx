'use client';

import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const radioGroupVariants = cva('', {
  variants: {
    orientation: {
      vertical: 'grid',
      horizontal: 'flex flex-row',
    },
    density: {
      default: '',
      comfortable: '',
    },
    size: {
      sm: '',
      default: '',
      lg: '',
    },
  },
  compoundVariants: [
    { size: 'sm', density: 'default', class: 'gap-2' },
    { size: 'sm', density: 'comfortable', class: 'gap-3' },
    { size: 'default', density: 'default', class: 'gap-3' },
    { size: 'default', density: 'comfortable', class: 'gap-4' },
    { size: 'lg', density: 'default', class: 'gap-3' },
    { size: 'lg', density: 'comfortable', class: 'gap-4' },
  ],
  defaultVariants: {
    orientation: 'vertical',
    density: 'default',
    size: 'default',
  },
});

function RadioGroup({
  className,
  orientation = 'vertical',
  density = 'default',
  size = 'default',
  ...props
}: RadioGroupPrimitive.Props & VariantProps<typeof radioGroupVariants>) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      data-orientation={orientation}
      data-density={density}
      data-size={size}
      aria-orientation={orientation ?? undefined}
      className={cn(
        radioGroupVariants({ orientation, density, size }),
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
  size?: 'sm' | 'default' | 'lg';
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
