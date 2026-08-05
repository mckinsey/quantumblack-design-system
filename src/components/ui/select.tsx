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

interface SelectContextValue {
  size?: SelectSize;
  disabled?: boolean;
}

const SelectContext = React.createContext<SelectContextValue | undefined>(
  undefined,
);

const useSelectContext = () => {
  return React.useContext(SelectContext);
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
    'relative flex w-fit items-center whitespace-nowrap text-left',
    'rounded-none outline-none transition-[border-color,box-shadow,background-color]',
    'cursor-pointer',
    'data-placeholder:text-fg-tertiary',
    '*:data-[slot=select-value]:min-w-0 *:data-[slot=select-value]:flex-1 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2',
    '[&_[data-slot=select-feedback-icon]]:shrink-0 [&_[data-slot=select-icon]]:shrink-0 [&_[data-slot=select-icon]]:self-center',
    'data-disabled:cursor-not-allowed data-disabled:text-fg-disabled',
  ],
  {
    variants: {
      variant: {
        default: [
          inputVariantStyles.default.base,
          inputVariantStyles.default.text,
          inputVariantStyles.default.hover,
          inputVariantStyles.default.focus,
          'data-[popup-open]:bg-stateslayer-overlay-active-inverse data-[popup-open]:ring-stroke-status-focus data-[popup-open]:shadow-elevation-0',
          inputVariantStyles.default.error,
          'aria-invalid:data-[popup-open]:ring-stroke-status-error',
          'data-disabled:bg-stateslayer-overlay-disabled',
        ],
        inline: [
          inputVariantStyles.inline.base,
          inputVariantStyles.inline.border,
          inputVariantStyles.inline.text,
          inputVariantStyles.inline.hover,
          'px-0!',
          inputVariantStyles.inline.focus,
          'data-[popup-open]:border-b-stroke-status-focus data-[popup-open]:shadow-elevation-0',
          inputVariantStyles.inline.error,
          'aria-invalid:data-[popup-open]:border-b-status-error',
          inputVariantStyles.inline.disabled,
          'data-disabled:pointer-events-none data-disabled:data-placeholder:text-fg-disabled',
        ],
      },
      size: {
        sm: `${inputSizeDefinitions.sm} gap-2`,
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
        className: 'border-b-[2px]',
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
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const selectItemVariants = cva(
  [
    'relative flex w-full items-center outline-none select-none',
    'cursor-pointer',
    'text-fg-secondary',
    'data-highlighted:overlay-hover data-highlighted:text-fg-primary',
    'active:overlay-pressed data-highlighted:active:overlay-pressed',
    'data-disabled:cursor-not-allowed data-disabled:text-fg-disabled',
    'data-disabled:data-highlighted:[background-image:none] data-disabled:data-highlighted:text-fg-disabled',
    'data-disabled:active:[background-image:none]',
  ],
  {
    variants: {
      size: {
        sm: 'paragraph-regular-primary gap-2 py-2 pr-2 pl-1',
        default: 'paragraph-regular-primary gap-2 py-2 pr-2 pl-1',
        lg: 'paragraph-large-primary gap-1 p-2',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const selectLabelSize = {
  sm: 'label-regular-primary px-1 py-2',
  default: 'label-regular-primary px-1 py-2',
  lg: 'label-large-primary p-2',
} as const;

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
function Select({
  size = 'default',
  disabled = false,
  children,
  ...props
}: SelectProps) {
  return (
    <SelectContext.Provider value={{ size, disabled }}>
      <SelectPrimitive.Root data-slot="select" disabled={disabled} {...props}>
        {children}
      </SelectPrimitive.Root>
    </SelectContext.Provider>
  );
}

function SelectValue(props: SelectPrimitive.Value.Props) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectIcon({ className, ...props }: SelectPrimitive.Icon.Props) {
  return (
    <SelectPrimitive.Icon
      data-slot="select-icon"
      className={cn('flex shrink-0 items-center justify-center', className)}
      {...props}
    />
  );
}

function selectIconSize(size: SelectSize = 'default') {
  return size === 'lg' ? 'default' : 'sm';
}

function SelectTrigger({
  className,
  children,
  variant = 'default',
  disabled,
  ...props
}: SelectPrimitive.Trigger.Props & VariantProps<typeof selectTriggerVariants>) {
  const sizeContext = useSelectContext();
  const size = sizeContext?.size ?? 'default';
  const iconSize = selectIconSize(size);
  const isDisabled = Boolean(disabled || sizeContext?.disabled);

  return (
    <SelectPrimitive.Trigger
      {...props}
      disabled={isDisabled}
      data-slot="select-trigger"
      data-variant={variant}
      className={cn(selectTriggerVariants({ variant, size }), className)}>
      {children}
      <SelectIcon className="transition-transform duration-200 [[data-popup-open]>&]:rotate-180">
        <IconShell size={iconSize} variant="secondary" disabled={isDisabled}>
          <Icon icon="expand_more" size={iconSize} />
        </IconShell>
      </SelectIcon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  sideOffset = 4,
  alignItemWithTrigger = false,
  ...positionerProps
}: SelectPrimitive.Positioner.Props & {
  className?: string;
  children?: React.ReactNode;
}) {
  const sizeContext = useSelectContext();
  const size = sizeContext?.size ?? 'default';
  const listPad = size === 'lg' ? 'px-1 py-2' : 'p-1';

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        sideOffset={sideOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        {...positionerProps}>
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            'bg-fill-active-inverse text-fg-primary',
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
          <SelectPrimitive.List
            className={cn(
              'max-h-[var(--available-height)] min-w-[var(--anchor-width)]',
              listPad,
            )}>
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
  const size = useSelectContext()?.size ?? 'default';

  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn('text-fg-secondary', selectLabelSize[size], className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  const sizeContext = useSelectContext();
  const size = sizeContext?.size ?? 'default';

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(selectItemVariants({ size }), className)}
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
  const sizeContext = useSelectContext();
  const iconSize = selectIconSize(sizeContext?.size);

  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-arrow"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}>
      <IconShell size={iconSize} variant="secondary">
        <Icon icon="expand_less" size={iconSize} />
      </IconShell>
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownArrow({
  className,
  ...props
}: SelectPrimitive.ScrollDownArrow.Props) {
  const sizeContext = useSelectContext();
  const iconSize = selectIconSize(sizeContext?.size);

  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-arrow"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}>
      <IconShell size={iconSize} variant="secondary">
        <Icon icon="expand_more" size={iconSize} />
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
  selectItemVariants,
  selectTriggerVariants,
  useSelectContext,
};
