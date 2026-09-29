'use client';

import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { cva } from 'class-variance-authority';
import type * as React from 'react';

import { DropdownMenuRadioGroup } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface TimePickerItemProps extends MenuPrimitive.RadioItem.Props {
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

// ============================================================================
// COMPONENTS - TimePickerItem
// ============================================================================

/**
 * Individual time picker list item (hour or minute)
 */
export const TimePickerItem = ({
  size = 'default',
  className,
  ...props
}: TimePickerItemProps) => {
  return (
    <MenuPrimitive.RadioItem
      data-slot="time-picker-item"
      className={cn(timePickerItemVariants({ size }), className)}
      {...props}
      closeOnClick={false}
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

export interface TimePickerListContentProps
  extends
    MenuPrimitive.Popup.Props,
    Pick<
      MenuPrimitive.Positioner.Props,
      'align' | 'alignOffset' | 'side' | 'sideOffset'
    > {
  readonly size?: 'default' | 'lg';
  readonly avoidCollisions?: boolean;
}

/**
 * DropdownMenuContent wrapper for time picker list content
 */
export function TimePickerListContent({
  size = 'default',
  className,
  side = 'bottom',
  align = 'center',
  sideOffset = 0,
  alignOffset = 0,
  avoidCollisions = false,
  ...props
}: TimePickerListContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionAvoidance={
          avoidCollisions
            ? undefined
            : { side: 'none', align: 'none', fallbackAxisSide: 'none' }
        }>
        <MenuPrimitive.Popup
          data-slot="time-picker-list-content"
          className={cn(
            'bg-stateslayer-overlay-active-inverse shadow-elevation-0 z-50 flex origin-(--transform-origin) flex-row overflow-hidden rounded-none py-1 pr-3 pl-2 outline-none',
            'min-w-(--anchor-width)',
            size === 'lg'
              ? 'h-40 min-h-40 w-[112px] gap-2'
              : 'h-32 min-h-[120px] w-[96px] gap-1',
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

TimePickerListContent.displayName = 'TimePickerListContent';
