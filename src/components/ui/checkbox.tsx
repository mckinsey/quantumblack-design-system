'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { CheckboxGroup as CheckboxGroupPrimitive } from '@base-ui/react/checkbox-group';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

type TriState = boolean | 'indeterminate';

function fromTriState(value: TriState | undefined) {
  if (value === undefined) {
    return undefined;
  }

  if (value === 'indeterminate') {
    return { checked: false as const, indeterminate: true };
  }

  return { checked: value, indeterminate: false };
}

function CheckmarkIcon({ size }: { size: 'default' | 'lg' }) {
  const isRegular = size === 'default';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        isRegular ? 'h-[7px] w-2' : 'h-[9px] w-[11px]',
        'group-data-indeterminate:hidden',
      )}
      viewBox={isRegular ? '0 0 8 7' : '0 0 11 9'}
      fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={
          isRegular
            ? 'M7.5 1.25L6.25 0L2.5 3.75L1.25 2.5L0 3.75L2.5 6.25L7.5 1.25Z'
            : 'M10.5 1.25L9.25 0L3.5 5.75L1.25 3.5L0 4.75L3.5 8.25L10.5 1.25Z'
        }
        fill="currentColor"
      />
    </svg>
  );
}

const checkboxGroupVariants = cva('', {
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

function CheckboxGroup({
  className,
  orientation = 'vertical',
  density = 'default',
  ...props
}: CheckboxGroupPrimitive.Props & VariantProps<typeof checkboxGroupVariants>) {
  return (
    <CheckboxGroupPrimitive
      data-slot="checkbox-group"
      data-orientation={orientation}
      data-density={density}
      className={cn(checkboxGroupVariants({ orientation, density }), className)}
      {...props}
    />
  );
}

interface CheckboxProps extends Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  'checked' | 'defaultChecked' | 'indeterminate' | 'onCheckedChange'
> {
  size?: 'default' | 'lg';
  checked?: TriState;
  defaultChecked?: TriState;
  onCheckedChange?: (checked: TriState) => void;
}

function Checkbox({
  className,
  size = 'default',
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  const isRegular = size === 'default';
  const boundingBoxClass = isRegular ? 'size-5' : 'size-6';
  const visibleBoxClass = isRegular ? 'size-4' : 'size-5';
  const indicatorWidth = isRegular ? '8px' : '10px';
  const controlled = fromTriState(checked);
  const uncontrolled = fromTriState(defaultChecked);

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-size={size}
      className={cn(
        boundingBoxClass,
        'group peer relative flex shrink-0 cursor-pointer items-center justify-center outline-none',
        'data-disabled:cursor-not-allowed',
        className,
      )}
      {...(controlled !== undefined
        ? {
            checked: controlled.checked,
            indeterminate: controlled.indeterminate,
          }
        : uncontrolled !== undefined
          ? {
              defaultChecked: uncontrolled.checked,
              indeterminate: uncontrolled.indeterminate,
            }
          : {})}
      onCheckedChange={nextChecked => {
        onCheckedChange?.(nextChecked);
      }}
      {...props}>
      <span
        data-slot="checkbox-visual"
        className={cn(
          visibleBoxClass,
          'relative flex items-center justify-center',
          'border-stroke-primary border bg-transparent',
          'group-focus-visible:ring-stroke-status-focus group-focus-visible:ring-2',
          'group-focus-visible:border-stroke-active',
          'group-data-disabled:border-stroke-tertiary',
          'group-data-disabled:group-data-checked:border-stroke-tertiary',
          'group-data-disabled:group-data-indeterminate:border-stroke-tertiary',
        )}>
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="text-fill-active group-data-disabled:text-fill-disabled absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-none">
          <CheckmarkIcon size={size} />

          <div
            className={cn(
              'bg-fill-active group-data-disabled:bg-fill-disabled h-0.5 group-data-checked:hidden',
            )}
            style={{ width: indicatorWidth }}
          />
        </CheckboxPrimitive.Indicator>
      </span>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox, CheckboxGroup, checkboxGroupVariants };
