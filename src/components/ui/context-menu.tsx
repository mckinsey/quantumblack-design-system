'use client';

import { ContextMenu as ContextMenuPrimitive } from '@base-ui/react/context-menu';
import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { cn } from '@/lib/utils';

type ContextMenuSize = 'default' | 'lg';

const ContextMenuSizeContext = React.createContext<ContextMenuSize>('default');

function useContextMenuSize() {
  return React.useContext(ContextMenuSizeContext);
}

const popupMotion =
  'z-50 max-h-(--available-height) origin-(--transform-origin) overflow-x-hidden overflow-y-auto bg-fill-active-inverse text-fg-primary shadow-elevation-2 outline-none duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';

function CheckboxItemMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-[7px] w-2"
      viewBox="0 0 8 7"
      fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 1.25L6.25 0L2.5 3.75L1.25 2.5L0 3.75L2.5 6.25L7.5 1.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ContextMenu({ ...props }: ContextMenuPrimitive.Root.Props) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuPortal({ ...props }: ContextMenuPrimitive.Portal.Props) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

function ContextMenuTrigger({
  className,
  ...props
}: ContextMenuPrimitive.Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn('select-none', className)}
      {...props}
    />
  );
}

function ContextMenuContent({
  align = 'start',
  alignOffset = 4,
  side = 'right',
  sideOffset = 0,
  className,
  size = 'default',
  ...props
}: ContextMenuPrimitive.Popup.Props &
  Pick<
    ContextMenuPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  > & {
    size?: ContextMenuSize;
  }) {
  return (
    <ContextMenuSizeContext.Provider value={size}>
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Positioner
          className="isolate z-50 outline-none"
          align={align}
          alignOffset={alignOffset}
          side={side}
          sideOffset={sideOffset}>
          <ContextMenuPrimitive.Popup
            data-slot="context-menu-content"
            data-size={size}
            className={cn(
              popupMotion,
              size === 'lg' ? 'px-1 py-2' : 'p-1',
              className,
            )}
            {...props}
          />
        </ContextMenuPrimitive.Positioner>
      </ContextMenuPrimitive.Portal>
    </ContextMenuSizeContext.Provider>
  );
}

function ContextMenuGroup({ ...props }: ContextMenuPrimitive.Group.Props) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}) {
  const size = useContextMenuSize();

  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-label"
      data-inset={inset}
      data-size={size}
      className={cn(
        'text-fg-secondary label-regular-primary flex h-9 items-center p-2 data-[inset]:pl-8',
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: ContextMenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  const size = useContextMenuSize();
  const isLg = size === 'lg';
  const padding = inset
    ? isLg
      ? 'py-2 pr-3 pl-9'
      : 'py-2 pr-2 pl-7'
    : isLg
      ? 'px-3 py-2'
      : 'p-2';

  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      data-size={size}
      className={cn(
        isLg ? 'paragraph-large-primary' : 'paragraph-regular-primary',
        'text-fg-secondary data-highlighted:bg-stateslayer-overlay-hover data-highlighted:text-fg-primary active:bg-stateslayer-overlay-pressed [&_svg:not([class*="text-"])]:text-fg-tertiary data-disabled:text-fg-disabled relative flex cursor-pointer items-center gap-2 outline-none select-none data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
        padding,
        'data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:text-destructive data-[variant=destructive]:[&_svg:not([class*="text-"])]:!text-destructive',
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuSub({ ...props }: ContextMenuPrimitive.SubmenuRoot.Props) {
  return (
    <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
  );
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}) {
  const size = useContextMenuSize();
  const isLg = size === 'lg';
  const paddingBySize = {
    default: { inset: 'py-2 pr-1 pl-7', default: 'py-2 pr-1 pl-2' },
    lg: { inset: 'py-2 pr-2 pl-9', default: 'py-2 pr-2 pl-3' },
  } as const;
  const padding = paddingBySize[size][inset ? 'inset' : 'default'];

  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      data-size={size}
      className={cn(
        isLg ? 'paragraph-large-primary' : 'paragraph-regular-primary',
        'text-fg-secondary data-highlighted:bg-stateslayer-overlay-hover data-highlighted:text-fg-primary data-popup-open:bg-stateslayer-overlay-hover data-popup-open:text-fg-primary data-open:bg-stateslayer-overlay-hover data-open:text-fg-primary [&_svg:not([class*="text-"])]:text-fg-tertiary flex cursor-pointer items-center gap-2 outline-none select-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
        padding,
        className,
      )}
      {...props}>
      {children}
      <IconShell className="ml-auto" size={isLg ? 'default' : 'sm'}>
        <Icon icon="chevron_right" />
      </IconShell>
    </ContextMenuPrimitive.SubmenuTrigger>
  );
}

function ContextMenuSubContent({
  className,
  size,
  ...props
}: React.ComponentProps<typeof ContextMenuContent>) {
  const parentSize = useContextMenuSize();

  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      className={cn('w-auto', className)}
      side="right"
      size={size ?? parentSize}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: ContextMenuPrimitive.CheckboxItem.Props) {
  const size = useContextMenuSize();
  const isLg = size === 'lg';

  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-size={size}
      className={cn(
        isLg ? 'paragraph-large-primary' : 'paragraph-regular-primary',
        'text-fg-secondary data-highlighted:bg-stateslayer-overlay-hover data-highlighted:text-fg-primary active:bg-stateslayer-overlay-pressed data-disabled:text-fg-disabled group relative flex cursor-pointer items-center gap-2 outline-none select-none data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
        isLg ? 'py-2 pr-3 pl-9' : 'py-2 pr-2 pl-7',
        className,
      )}
      checked={checked}
      {...props}>
      <span className="pointer-events-none absolute left-1 flex size-4 items-center justify-center">
        <span className="border-stroke-primary group-data-disabled:border-stroke-tertiary relative flex size-4 items-center justify-center border bg-transparent">
          <ContextMenuPrimitive.CheckboxItemIndicator className="text-fill-active group-data-disabled:text-fill-disabled absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CheckboxItemMark />
          </ContextMenuPrimitive.CheckboxItemIndicator>
        </span>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioGroup({
  ...props
}: ContextMenuPrimitive.RadioGroup.Props) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: ContextMenuPrimitive.RadioItem.Props) {
  const size = useContextMenuSize();
  const isLg = size === 'lg';

  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      data-size={size}
      className={cn(
        isLg ? 'paragraph-large-primary' : 'paragraph-regular-primary',
        'text-fg-secondary data-highlighted:bg-stateslayer-overlay-hover data-highlighted:text-fg-primary active:bg-stateslayer-overlay-pressed data-disabled:text-fg-disabled group relative flex cursor-pointer items-center gap-2 outline-none select-none data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
        isLg ? 'px-3 py-2' : 'p-2',
        className,
      )}
      {...props}>
      {children}
      <ContextMenuPrimitive.RadioItemIndicator className="ml-auto flex items-center justify-center">
        <IconShell size={isLg ? 'default' : 'sm'} variant="primary">
          <Icon icon="done" size={isLg ? 'default' : 'sm'} />
        </IconShell>
      </ContextMenuPrimitive.RadioItemIndicator>
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuPrimitive.Separator.Props) {
  return (
    <div
      className={cn(
        'pointer-events-none -mx-1 flex h-2 shrink-0 flex-col',
        className,
      )}
      style={{ width: 'calc(100% + 8px)' }}>
      <ContextMenuPrimitive.Separator
        className="border-stroke-divider h-1 w-full shrink-0 border-0 border-b border-solid bg-transparent"
        data-slot="context-menu-separator"
        {...props}
      />
      <div aria-hidden className="h-1 w-full shrink-0" />
    </div>
  );
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        'paragraph-regular-primary text-fg-tertiary ml-auto',
        className,
      )}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuPortal,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
};
