'use client';

import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { cva } from 'class-variance-authority';
import type * as React from 'react';

import { PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface TimePickerItemProps extends RadioPrimitive.Root.Props {
  size?: 'default' | 'lg';
}

export interface TimePickerListProps extends RadioGroupPrimitive.Props {
  readonly className?: string;
  readonly size?: 'default' | 'lg';
}

const timePickerItemVariants = cva(
  [
    'flex justify-center items-center bg-transparent text-fg-secondary cursor-pointer rounded-none outline-none',
    'hover:bg-stateslayer-overlay-hover hover:text-fg-primary',
    'active:bg-stateslayer-overlay-pressed active:text-fg-primary',
    'data-checked:bg-stateslayer-overlay-active data-checked:text-fg-primary-inverse',
    'data-disabled:cursor-not-allowed data-disabled:bg-stateslayer-overlay-disabled data-disabled:text-fg-disabled',
    'aspect-square',
  ],
  {
    variants: {
      size: {
        default: 'label-regular-primary size-7',
        lg: 'label-large-primary size-8',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export function TimePickerItem({
  size = 'default',
  className,
  ...props
}: TimePickerItemProps) {
  return (
    <RadioPrimitive.Root
      data-slot="time-picker-item"
      className={cn(timePickerItemVariants({ size }), className)}
      {...props}
    />
  );
}

TimePickerItem.displayName = 'TimePickerItem';

export function TimePickerList({
  size = 'default',
  className,
  ...props
}: TimePickerListProps) {
  return (
    <RadioGroupPrimitive
      data-slot="time-picker-list"
      data-size={size}
      className={cn(
        'flex size-fit flex-col',
        size === 'lg' ? 'gap-2' : 'gap-1',
        className,
      )}
      {...props}
    />
  );
}

TimePickerList.displayName = 'TimePickerList';

export interface TimePickerListContentProps extends React.ComponentProps<
  typeof PopoverContent
> {
  readonly size?: 'default' | 'lg';
}

export function TimePickerListContent({
  size = 'default',
  className,
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  ...props
}: TimePickerListContentProps) {
  return (
    <PopoverContent
      data-slot="time-picker-list-content"
      data-size={size}
      side={side}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'bg-stateslayer-overlay-active-inverse text-fg-primary shadow-elevation-0 flex w-auto flex-row overflow-hidden rounded-none border-none p-0',
        'min-w-[var(--radix-popover-trigger-width)]',
        'data-[state=open]:animate-none data-[state=closed]:animate-none',
        size === 'lg'
          ? 'h-40 min-h-40 w-[112px] gap-2 py-1 pr-3 pl-2'
          : 'h-32 min-h-[120px] w-[96px] gap-1 py-1 pr-3 pl-2',
        className,
      )}
      {...props}
    />
  );
}

TimePickerListContent.displayName = 'TimePickerListContent';
