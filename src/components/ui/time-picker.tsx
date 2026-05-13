'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { DropdownMenuRadioGroup } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface TimePickerItemProps extends React.ComponentProps<
  typeof DropdownMenuPrimitive.RadioItem
> {
  size?: 'default' | 'lg';
}

export interface TimePickerListProps extends React.ComponentProps<
  typeof DropdownMenuRadioGroup
> {
  readonly className?: string;
  readonly size?: 'default' | 'lg';
}

// ============================================================================
// SIZE VARIANTS
// ============================================================================

const timePickerItemVariants = cva(
  [
    'flex justify-center items-center bg-transparent text-fg-secondary cursor-pointer rounded-none outline-none',
    'hover:bg-stateslayer-overlay-hover hover:text-fg-primary',
    'active:bg-stateslayer-overlay-pressed active:text-fg-primary',
    'data-[state=checked]:bg-stateslayer-overlay-active data-[state=checked]:text-fg-primary-inverse',
    'disabled:cursor-not-allowed disabled:bg-stateslayer-overlay-disabled disabled:text-fg-disabled',
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

// ============================================================================
// COMPONENTS - TimePickerItem
// ============================================================================

/**
 * Individual time picker list item (hour or minute)
 */
export const TimePickerItem = ({
  size = 'default',
  className,
  onSelect,
  ...props
}: TimePickerItemProps) => {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="time-picker-item"
      {...props}
      onSelect={e => {
        e.preventDefault();
        onSelect?.(e);
      }}
      className={cn(timePickerItemVariants({ size }), className)}
    />
  );
};

TimePickerItem.displayName = 'TimePickerItem';

// ============================================================================
// COMPONENTS - TimePickerList
// ============================================================================

/**
 * List container for time picker items
 */
export function TimePickerList({
  size = 'default',
  className,
  ...props
}: TimePickerListProps) {
  return (
    <DropdownMenuRadioGroup
      {...props}
      className={cn(
        'flex size-fit flex-col',
        size === 'lg' ? 'gap-2' : 'gap-1',
        className,
      )}
    />
  );
}

TimePickerList.displayName = 'TimePickerList';

export interface TimePickerListContentProps extends React.ComponentProps<
  typeof DropdownMenuPrimitive.Content
> {
  readonly size?: 'default' | 'lg';
  readonly onOpenAutoFocus?: (event: Event) => void;
  readonly onCloseAutoFocus?: (event: Event) => void;
}

/**
 * DropdownMenuContent wrapper for time picker list content
 */
export function TimePickerListContent({
  size = 'default',
  className,
  side = 'bottom',
  avoidCollisions = false,
  ...props
}: TimePickerListContentProps) {
  return (
    <DropdownMenuPrimitive.Content
      data-slot="time-picker-list-content"
      side={side}
      avoidCollisions={avoidCollisions}
      className={cn(
        'bg-stateslayer-overlay-active-inverse shadow-elevation-0 flex flex-row overflow-hidden rounded-none py-1 pr-3 pl-2',
        'min-w-[var(--radix-dropdown-menu-trigger-width)]',
        size === 'lg'
          ? 'h-40 min-h-40 w-[112px] gap-2'
          : 'h-32 min-h-[120px] w-[96px] gap-1',
        className,
      )}
      {...props}
    />
  );
}

TimePickerListContent.displayName = 'TimePickerListContent';
