'use client';

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

export type DialogSize = 'xs' | 'sm' | 'default' | 'lg';

const dialogContentVariants = cva(
  [
    'group/dialog bg-fill-onsurface-ui-1 shadow-elevation-2',
    'fixed top-1/2 left-1/2 z-50 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col outline-none',
    'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
    'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
    'duration-200',
  ],
  {
    variants: {
      size: {
        xs: 'w-[420px] min-h-[264px] max-h-[520px]',
        sm: 'w-[560px] min-h-[280px] max-h-[820px]',
        default: 'w-[640px] min-h-[320px] max-h-[820px]',
        lg: 'w-[820px] min-h-[320px] max-h-[960px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const dialogInsetX =
  'group-data-[size=xs]/dialog:px-6 group-data-[size=sm]/dialog:px-8 group-data-[size=default]/dialog:px-10 group-data-[size=lg]/dialog:px-10';

const dialogDescriptionPb =
  'group-data-[size=xs]/dialog:pb-4 group-data-[size=sm]/dialog:pb-6 group-data-[size=default]/dialog:pb-6 group-data-[size=lg]/dialog:pb-6';

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-black/50',
        'data-open:animate-in data-open:fade-in-0',
        'data-closed:animate-out data-closed:fade-out-0',
        'duration-200',
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  size = 'default',
  showCloseButton = false,
  ...props
}: DialogPrimitive.Popup.Props & {
  size?: DialogSize;
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        data-size={size}
        className={cn(dialogContentVariants({ size }), className)}
        {...props}>
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute top-4 right-4"
                aria-label="Close"
              />
            }>
            <Icon icon="close" className="size-4" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        'text-fg-primary flex w-full shrink-0 flex-col gap-2 pt-8 pb-3',
        dialogInsetX,
        className,
      )}
      {...props}
    />
  );
}

function DialogContextLabel({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="dialog-context-label"
      className={cn(
        'text-fg-secondary shrink-0',
        'group-data-[size=xs]/dialog:paragraph-small-primary',
        'group-data-[size=sm]/dialog:paragraph-regular-primary',
        'group-data-[size=default]/dialog:paragraph-regular-primary',
        'group-data-[size=lg]/dialog:paragraph-regular-primary',
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  icon,
  children,
  ...props
}: DialogPrimitive.Title.Props & {
  icon?: React.ReactNode;
}) {
  return (
    <div
      data-slot="dialog-title-row"
      className="flex w-full min-w-0 items-start gap-3 pt-2">
      {icon}
      <DialogPrimitive.Title
        data-slot="dialog-title"
        className={cn(
          'text-fg-primary min-w-0 flex-1 truncate',
          'group-data-[size=xs]/dialog:headings-h3-regular',
          'group-data-[size=sm]/dialog:headings-h2-regular',
          'group-data-[size=default]/dialog:headings-h2-regular',
          'group-data-[size=lg]/dialog:headings-h2-regular',
          className,
        )}
        {...props}>
        {children}
      </DialogPrimitive.Title>
    </div>
  );
}

function DialogBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-body"
      className={cn(
        'flex min-h-0 w-full flex-1 flex-col overflow-y-auto',
        dialogInsetX,
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        'text-fg-secondary shrink-0 overflow-hidden text-ellipsis',
        'group-data-[size=xs]/dialog:paragraph-regular-primary',
        'group-data-[size=sm]/dialog:paragraph-regular-primary',
        'group-data-[size=default]/dialog:paragraph-large-primary',
        'group-data-[size=lg]/dialog:paragraph-large-primary',
        dialogDescriptionPb,
        className,
      )}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'text-fg-primary flex w-full shrink-0 items-end justify-between',
        'group-data-[size=xs]/dialog:min-h-[84px] group-data-[size=xs]/dialog:p-6',
        'group-data-[size=sm]/dialog:min-h-[100px] group-data-[size=sm]/dialog:p-8',
        'group-data-[size=default]/dialog:min-h-[112px] group-data-[size=default]/dialog:px-10 group-data-[size=default]/dialog:py-8',
        'group-data-[size=lg]/dialog:p-9',
        className,
      )}
      {...props}
    />
  );
}

function DialogFooterLink({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer-link"
      className={cn('flex shrink-0 items-center', className)}
      {...props}
    />
  );
}

function DialogFooterActions({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer-actions"
      className={cn('ml-auto flex shrink-0 items-center', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogContextLabel,
  DialogDescription,
  DialogFooter,
  DialogFooterActions,
  DialogFooterLink,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  dialogContentVariants,
};
