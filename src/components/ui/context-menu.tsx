'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { cn } from '@/lib/utils';

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

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  );
}

interface ContextMenuContentProps extends React.ComponentProps<
  typeof ContextMenuPrimitive.Content
> {
  children?: React.ReactNode;
  onOpenAutoFocus?: (event: Event) => void;
}

function ContextMenuContent({ className, ...props }: ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          'bg-stateslayer-overlay-active-inverse text-fg-primary shadow-elevation-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto p-2',
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

function ContextMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        'paragraph-regular-primary text-fg-secondary data-[highlighted]:bg-stateslayer-overlay-hover data-[highlighted]:text-fg-primary active:bg-stateslayer-overlay-pressed [&_svg:not([class*="text-"])]:text-fg-tertiary data-[disabled]:text-fg-disabled relative flex cursor-default items-center gap-2 py-2 pr-2 pl-2 outline-none select-none data-[disabled]:pointer-events-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        'data-[variant=destructive]:text-destructive data-[variant=destructive]:data-[highlighted]:bg-destructive/10 data-[variant=destructive]:data-[highlighted]:text-destructive dark:data-[variant=destructive]:data-[highlighted]:bg-destructive/20 data-[variant=destructive]:[&_svg:not([class*="text-"])]:!text-destructive cursor-pointer',
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        'paragraph-regular-primary text-fg-secondary data-[highlighted]:bg-stateslayer-overlay-hover data-[highlighted]:text-fg-primary active:bg-stateslayer-overlay-pressed data-[disabled]:text-fg-disabled group relative flex cursor-default items-center gap-2 py-2 pr-2 pl-8 outline-none select-none data-[disabled]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className,
      )}
      checked={checked}
      {...props}>
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
        <span className="border-stroke-primary group-data-[disabled]:border-stroke-tertiary relative flex size-4 items-center justify-center border bg-transparent">
          <ContextMenuPrimitive.ItemIndicator className="text-fill-active group-data-[disabled]:text-fill-disabled absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CheckboxItemMark />
          </ContextMenuPrimitive.ItemIndicator>
        </span>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
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
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        'paragraph-regular-primary text-fg-secondary data-[highlighted]:bg-stateslayer-overlay-hover data-[highlighted]:text-fg-primary active:bg-stateslayer-overlay-pressed data-[disabled]:text-fg-disabled group relative flex cursor-default items-center gap-2 py-2 pr-2 pl-8 outline-none select-none data-[disabled]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className,
      )}
      {...props}>
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
        <span className="border-stroke-primary group-data-[disabled]:border-stroke-tertiary relative flex size-4 items-center justify-center rounded-full border bg-transparent">
          <ContextMenuPrimitive.ItemIndicator className="flex items-center justify-center">
            <span
              aria-hidden
              className="bg-fill-active group-data-[disabled]:bg-fill-disabled size-2 rounded-full"
            />
          </ContextMenuPrimitive.ItemIndicator>
        </span>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        'text-fg-secondary paragraph-small-primary px-2 py-1.5 uppercase data-[inset]:pl-8',
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <div
      className={cn(
        'pointer-events-none -mx-2 flex h-2 shrink-0 flex-col',
        className,
      )}
      style={{ width: 'calc(100% + 16px)' }}>
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

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        'paragraph-regular-primary text-fg-secondary data-[highlighted]:bg-stateslayer-overlay-hover data-[highlighted]:text-fg-primary data-[state=open]:bg-stateslayer-overlay-hover data-[state=open]:text-fg-primary [&_svg:not([class*="text-"])]:text-fg-tertiary flex cursor-default items-center gap-2 py-2 pr-2 pl-2 outline-none select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className,
      )}
      {...props}>
      {children}
      <IconShell className="ml-auto" size="sm">
        <Icon icon="chevron_right" />
      </IconShell>
    </ContextMenuPrimitive.SubTrigger>
  );
}

type ContextMenuSubContentProps = React.ComponentProps<
  typeof ContextMenuPrimitive.SubContent
> & {
  children?: React.ReactNode;
};

function ContextMenuSubContent({
  className,
  ...props
}: ContextMenuSubContentProps) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        'bg-stateslayer-overlay-active-inverse text-fg-primary shadow-elevation-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-context-menu-content-transform-origin) overflow-hidden p-1',
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
