'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { cn } from '@/lib/utils';

type DropdownMenuSize = 'default' | 'lg';

const DropdownMenuSizeContext =
  React.createContext<DropdownMenuSize>('default');

function useDropdownMenuSize() {
  return React.useContext(DropdownMenuSizeContext);
}

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

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

interface DropdownMenuContentProps extends React.ComponentProps<
  typeof DropdownMenuPrimitive.Content
> {
  children?: React.ReactNode;
  onOpenAutoFocus?: (event: Event) => void;
  size?: DropdownMenuSize;
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  size = 'default',
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuSizeContext.Provider value={size}>
        <DropdownMenuPrimitive.Content
          data-slot="dropdown-menu-content"
          data-size={size}
          sideOffset={sideOffset}
          className={cn(
            'bg-fill-active-inverse text-fg-primary shadow-elevation-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto',
            size === 'lg' ? 'px-1 py-2' : 'p-1',
            className,
          )}
          {...props}
        />
      </DropdownMenuSizeContext.Provider>
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  const size = useDropdownMenuSize();
  const isLg = size === 'lg';
  const padding = inset
    ? isLg
      ? 'py-2 pr-3 pl-9'
      : 'py-2 pr-2 pl-7'
    : isLg
      ? 'px-3 py-2'
      : 'p-2';

  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      data-size={size}
      className={cn(
        isLg ? 'paragraph-large-primary' : 'paragraph-regular-primary',
        'text-fg-secondary data-[highlighted]:bg-stateslayer-overlay-hover data-[highlighted]:text-fg-primary active:bg-stateslayer-overlay-pressed [&_svg:not([class*="text-"])]:text-fg-tertiary data-[disabled]:text-fg-disabled relative flex cursor-pointer items-center gap-2 outline-none select-none data-[disabled]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
        padding,
        'data-[variant=destructive]:text-destructive data-[variant=destructive]:data-[highlighted]:text-destructive data-[variant=destructive]:[&_svg:not([class*="text-"])]:!text-destructive',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  const size = useDropdownMenuSize();
  const isLg = size === 'lg';

  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-size={size}
      className={cn(
        isLg ? 'paragraph-large-primary' : 'paragraph-regular-primary',
        'text-fg-secondary data-[highlighted]:bg-stateslayer-overlay-hover data-[highlighted]:text-fg-primary active:bg-stateslayer-overlay-pressed data-[disabled]:text-fg-disabled group relative flex cursor-pointer items-center gap-2 outline-none select-none data-[disabled]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
        isLg ? 'py-2 pr-3 pl-9' : 'py-2 pr-2 pl-7',
        className,
      )}
      checked={checked}
      {...props}>
      <span className="pointer-events-none absolute left-1 flex size-4 items-center justify-center">
        <span className="border-stroke-primary group-data-[disabled]:border-stroke-tertiary relative flex size-4 items-center justify-center border bg-transparent">
          <DropdownMenuPrimitive.ItemIndicator className="text-fill-active group-data-[disabled]:text-fill-disabled absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CheckboxItemMark />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  const size = useDropdownMenuSize();
  const isLg = size === 'lg';

  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-size={size}
      className={cn(
        isLg ? 'paragraph-large-primary' : 'paragraph-regular-primary',
        'text-fg-secondary data-[highlighted]:bg-stateslayer-overlay-hover data-[highlighted]:text-fg-primary active:bg-stateslayer-overlay-pressed data-[disabled]:text-fg-disabled group relative flex cursor-pointer items-center gap-2 outline-none select-none data-[disabled]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
        isLg ? 'py-2 pr-3 pl-9' : 'py-2 pr-2 pl-7',
        className,
      )}
      {...props}>
      <span className="pointer-events-none absolute left-1 flex size-4 items-center justify-center">
        <span className="border-stroke-primary group-data-[disabled]:border-stroke-tertiary relative flex size-4 items-center justify-center rounded-full border bg-transparent">
          <DropdownMenuPrimitive.ItemIndicator className="flex items-center justify-center">
            <span
              aria-hidden
              className="bg-fill-active group-data-[disabled]:bg-fill-disabled size-2 rounded-full"
            />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  const size = useDropdownMenuSize();

  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
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

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <div
      className={cn(
        'pointer-events-none -mx-1 flex h-2 shrink-0 flex-col',
        className,
      )}
      style={{ width: 'calc(100% + 8px)' }}>
      <DropdownMenuPrimitive.Separator
        className="border-stroke-divider h-1 w-full shrink-0 border-0 border-b border-solid bg-transparent"
        data-slot="dropdown-menu-separator"
        {...props}
      />
      <div aria-hidden className="h-1 w-full shrink-0" />
    </div>
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        'paragraph-regular-primary text-fg-tertiary ml-auto',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  const size = useDropdownMenuSize();
  const isLg = size === 'lg';
  const paddingBySize = {
    default: { inset: 'py-2 pr-1 pl-7', default: 'py-2 pr-1 pl-2' },
    lg: { inset: 'py-2 pr-2 pl-9', default: 'py-2 pr-2 pl-3' },
  } as const;
  const padding = paddingBySize[size][inset ? 'inset' : 'default'];

  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      data-size={size}
      className={cn(
        isLg ? 'paragraph-large-primary' : 'paragraph-regular-primary',
        'text-fg-secondary data-[highlighted]:bg-stateslayer-overlay-hover data-[highlighted]:text-fg-primary data-[state=open]:bg-stateslayer-overlay-hover data-[state=open]:text-fg-primary [&_svg:not([class*="text-"])]:text-fg-tertiary flex cursor-pointer items-center gap-2 outline-none select-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
        padding,
        className,
      )}
      {...props}>
      {children}
      <IconShell className="ml-auto" size={isLg ? 'default' : 'sm'}>
        <Icon icon="chevron_right" />
      </IconShell>
    </DropdownMenuPrimitive.SubTrigger>
  );
}

type DropdownMenuSubContentProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.SubContent
> & {
  children?: React.ReactNode;
  size?: DropdownMenuSize;
};

function DropdownMenuSubContent({
  className,
  size,
  ...props
}: DropdownMenuSubContentProps) {
  const parentSize = useDropdownMenuSize();
  const effectiveSize = size ?? parentSize;

  return (
    <DropdownMenuSizeContext.Provider value={effectiveSize}>
      <DropdownMenuPrimitive.SubContent
        data-slot="dropdown-menu-sub-content"
        data-size={effectiveSize}
        className={cn(
          'bg-fill-active-inverse text-fg-primary shadow-elevation-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden',
          effectiveSize === 'lg' ? 'px-1 py-2' : 'p-1',
          className,
        )}
        {...props}
      />
    </DropdownMenuSizeContext.Provider>
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
