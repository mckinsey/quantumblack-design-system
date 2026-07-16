'use client';

import { Select as SelectPrimitive } from '@base-ui/react/select';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  inputFocusRingWidth,
  inputInlineFocusBorderWidth,
  inputSizeDefinitions,
  inputVariantStyles,
} from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type SelectSize = 'sm' | 'default' | 'lg';
export type SelectVariant = 'default' | 'inline';
export type SelectValidation = 'error' | 'warning' | 'success';

interface SelectSizeContextValue {
  size?: SelectSize;
}

const defaultValidationStyles = [
  'data-[validation=error]:border data-[validation=error]:border-stroke-status-error data-[validation=error]:ring-0',
  'data-[validation=warning]:border data-[validation=warning]:border-stroke-status-warning data-[validation=warning]:ring-0',
  'data-[validation=success]:border data-[validation=success]:border-stroke-status-success data-[validation=success]:ring-0',
] as const;

const inlineValidationStyles = [
  'data-[validation=error]:border-b-stroke-status-error data-[validation=error]:ring-0',
  'data-[validation=warning]:border-b-stroke-status-warning data-[validation=warning]:ring-0',
  'data-[validation=success]:border-b-stroke-status-success data-[validation=success]:ring-0',
] as const;

const SelectSizeContext = React.createContext<
  SelectSizeContextValue | undefined
>(undefined);

const useSelectSizeContext = () => {
  return React.useContext(SelectSizeContext);
};

type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root> & {
  /**
   * The size of the select and its items.
   * @default "default"
   */
  size?: SelectSize;
};

const selectTriggerVariants = cva(
  [
    'relative flex w-fit items-center justify-between whitespace-nowrap',
    'rounded-none outline-none transition-[border-color,box-shadow,background-color]',
    'cursor-pointer',
    'data-placeholder:text-fg-tertiary',
    '*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2',
  ],
  {
    variants: {
      variant: {
        default: [
          inputVariantStyles.default.base,
          inputVariantStyles.default.text,
          inputVariantStyles.default.hover,
          'focus-visible:bg-stateslayer-overlay-active-inverse focus-visible:ring-stroke-status-focus',
          'data-[popup-open]:bg-stateslayer-overlay-active-inverse data-[popup-open]:ring-stroke-status-focus data-[popup-open]:shadow-elevation-0',
          ...defaultValidationStyles,
          'aria-invalid:border-status-error aria-invalid:ring-0',
          'data-invalid:border-status-error data-invalid:ring-0',
          'data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:bg-stateslayer-overlay-disabled data-disabled:text-fg-disabled',
        ],
        inline: [
          inputVariantStyles.inline.base,
          inputVariantStyles.inline.border,
          inputVariantStyles.inline.text,
          inputVariantStyles.inline.hover,
          'px-0!',
          'focus-visible:border-b-stroke-status-focus focus-visible:ring-0 focus-visible:shadow-elevation-0',
          'data-[popup-open]:border-b-stroke-status-focus data-[popup-open]:shadow-elevation-0',
          ...inlineValidationStyles,
          'aria-invalid:border-b-status-error aria-invalid:ring-0',
          'data-invalid:border-b-status-error data-invalid:ring-0',
          'data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:text-fg-disabled',
        ],
      },
      size: {
        sm: `${inputSizeDefinitions.sm} gap-1`,
        default: `${inputSizeDefinitions.default} gap-2`,
        lg: `${inputSizeDefinitions.lg} gap-2`,
      },
    },
    compoundVariants: [
      { variant: 'default', size: 'sm', className: inputFocusRingWidth.sm },
      {
        variant: 'default',
        size: 'default',
        className: inputFocusRingWidth.default,
      },
      { variant: 'default', size: 'lg', className: inputFocusRingWidth.lg },
      {
        variant: 'default',
        size: 'sm',
        className: 'data-[popup-open]:ring-[1px]',
      },
      {
        variant: 'default',
        size: 'default',
        className: 'data-[popup-open]:ring-[1px]',
      },
      {
        variant: 'default',
        size: 'lg',
        className: 'data-[popup-open]:ring-[2px]',
      },
      {
        variant: 'inline',
        size: 'sm',
        className: inputInlineFocusBorderWidth.sm,
      },
      {
        variant: 'inline',
        size: 'default',
        className: inputInlineFocusBorderWidth.default,
      },
      {
        variant: 'inline',
        size: 'lg',
        className: inputInlineFocusBorderWidth.lg,
      },
      {
        variant: 'inline',
        size: 'sm',
        className: 'data-[popup-open]:border-b-[1px]',
      },
      {
        variant: 'inline',
        size: 'default',
        className: 'data-[popup-open]:border-b-[1px]',
      },
      {
        variant: 'inline',
        size: 'lg',
        className: 'data-[popup-open]:border-b-[2px]',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

/**
 * Select component for choosing from a list of options.
 *
 * Built on Base UI Select primitive. Supports single and multiple selection
 * via the `multiple` prop.
 *
 * @example
 * ```tsx
 * <Select items={items}>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Pick one" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="a">Option A</SelectItem>
 *     <SelectItem value="b">Option B</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
function Select({ size = 'default', children, ...props }: SelectProps) {
  return (
    <SelectSizeContext.Provider value={{ size }}>
      <SelectPrimitive.Root data-slot="select" {...props}>
        {children}
      </SelectPrimitive.Root>
    </SelectSizeContext.Provider>
  );
}

function SelectValue(props: SelectPrimitive.Value.Props) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectIcon({ className, ...props }: SelectPrimitive.Icon.Props) {
  return (
    <SelectPrimitive.Icon
      data-slot="select-icon"
      className={cn('shrink-0', className)}
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  children,
  variant = 'default',
  validationState,
  ...props
}: SelectPrimitive.Trigger.Props &
  VariantProps<typeof selectTriggerVariants> & {
    validationState?: SelectValidation;
  }) {
  const sizeContext = useSelectSizeContext();
  const size = sizeContext?.size ?? 'default';
  const iconSize = size === 'lg' ? 'default' : 'sm';
  const invalid =
    props['aria-invalid'] ?? (validationState === 'error' ? true : undefined);

  return (
    <SelectPrimitive.Trigger
      {...props}
      data-slot="select-trigger"
      data-variant={variant}
      data-validation={validationState || undefined}
      aria-invalid={invalid}
      className={cn(selectTriggerVariants({ variant, size }), className)}>
      {children}
      <SelectIcon className="transition-transform duration-200 [[data-popup-open]>&]:rotate-180">
        <IconShell size={iconSize} variant="secondary">
          <Icon icon="expand_more" />
        </IconShell>
      </SelectIcon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  sideOffset = 0,
  alignItemWithTrigger = false,
  ...positionerProps
}: SelectPrimitive.Positioner.Props & {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        sideOffset={sideOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        {...positionerProps}>
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            'bg-stateslayer-overlay-active-inverse text-fg-primary',
            'relative z-50 overflow-hidden',
            'shadow-elevation-1',
            'data-open:animate-in data-closed:animate-out',
            'data-closed:fade-out-0 data-open:fade-in-0',
            'data-closed:zoom-out-95 data-open:zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className,
          )}>
          <SelectScrollUpArrow />
          <SelectPrimitive.List className="max-h-[var(--available-height)] min-w-[var(--anchor-width)] p-1">
            {children}
          </SelectPrimitive.List>
          <SelectScrollDownArrow />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn('border-stroke-divider mb-1 border-b pb-1', className)}
      {...props}
    />
  );
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        'text-fg-tertiary paragraph-small-primary px-2 py-1.5',
        className,
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  const sizeContext = useSelectSizeContext();
  const size = sizeContext?.size ?? 'default';

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'relative flex w-full cursor-default items-center outline-none select-none',

        (size === 'sm' || size === 'default') &&
          'paragraph-regular-primary gap-2 py-2 pr-2 pl-1',
        size === 'lg' && 'paragraph-large-primary gap-1 p-2',

        'text-fg-secondary',

        'data-highlighted:bg-stateslayer-overlay-hover data-highlighted:text-fg-primary cursor-pointer',
        'active:bg-stateslayer-overlay-pressed',

        'data-disabled:text-fg-disabled data-disabled:cursor-not-allowed',

        className,
      )}
      {...props}>
      {children}
    </SelectPrimitive.Item>
  );
}

function SelectItemText({
  className,
  ...props
}: SelectPrimitive.ItemText.Props) {
  return (
    <SelectPrimitive.ItemText
      data-slot="select-item-text"
      className={cn(
        'flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap',
        className,
      )}
      {...props}
    />
  );
}

function SelectItemIndicator({
  className,
  children,
  ...props
}: SelectPrimitive.ItemIndicator.Props) {
  return (
    <SelectPrimitive.ItemIndicator
      data-slot="select-item-indicator"
      className={cn('flex items-center justify-center', className)}
      {...props}>
      {children}
    </SelectPrimitive.ItemIndicator>
  );
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <div
      className={cn('pointer-events-none flex h-2 w-full flex-col', className)}>
      <div className="h-1 w-full" />
      <SelectPrimitive.Separator
        className="border-stroke-divider h-1 w-full border-b"
        data-slot="select-separator"
        {...props}
      />
    </div>
  );
}

function SelectScrollUpArrow({
  className,
  ...props
}: SelectPrimitive.ScrollUpArrow.Props) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-arrow"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}>
      <IconShell size="sm" variant="secondary">
        <Icon icon="expand_more" className="rotate-180" />
      </IconShell>
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownArrow({
  className,
  ...props
}: SelectPrimitive.ScrollDownArrow.Props) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-arrow"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}>
      <IconShell size="sm" variant="secondary">
        <Icon icon="expand_more" />
      </IconShell>
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectScrollDownArrow,
  SelectScrollUpArrow,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
  useSelectSizeContext,
};
