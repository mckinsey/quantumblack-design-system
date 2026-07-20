'use client';

import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AvatarContextValue = {
  size?: 'xxs' | 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  disabled?: boolean;
};

const AvatarContext = React.createContext<AvatarContextValue>({});

const useAvatarContext = () => React.useContext(AvatarContext);

const avatarVariants = cva(
  [
    'relative flex shrink-0 rounded-full shadow-elevation-0',
    'transition-all duration-200',
  ].join(' '),
  {
    variants: {
      size: {
        xxs: 'size-5',
        xs: 'size-6',
        sm: 'size-7',
        default: 'size-9',
        lg: 'size-12',
        xl: 'size-16',
      },
      state: {
        default: [
          'bg-fill-onsurface-ui-2',
          'border border-stroke-active-inverse',
        ],
        disabled: [
          'bg-fill-onsurface-ui-2',
          'border border-stroke-active-inverse',
          "before:absolute before:inset-0 before:rounded-full before:content-['']",
          'before:pointer-events-none before:z-10',
          'before:overlay-disabled',
        ],
      },
    },
    compoundVariants: [
      {
        size: ['default', 'lg', 'xl'],
        state: ['default', 'disabled'],
        class: 'border-2',
      },
      {
        state: 'default',
        class: [
          'hover:shadow-elevation-1',
          "before:absolute before:inset-0 before:rounded-full before:content-['']",
          'before:pointer-events-none before:z-10',
          'before:transition-opacity before:duration-200',
          'before:overlay-hover before:opacity-0',
          'hover:before:opacity-100',
          'active:before:overlay-pressed active:before:opacity-100',
        ].join(' '),
      },
      {
        size: ['xxs', 'xs', 'sm'],
        state: ['default', 'disabled'],
        class: 'before:-inset-px',
      },
      {
        size: ['default', 'lg', 'xl'],
        state: ['default', 'disabled'],
        class: 'before:-inset-[2px]',
      },
    ],
    defaultVariants: {
      size: 'default',
      state: 'default',
    },
  },
);

const avatarFallbackVariants = cva(
  'flex size-full items-center justify-center rounded-full text-fg-primary',
  {
    variants: {
      size: {
        xxs: 'paragraph-small-emphasised',
        xs: 'paragraph-small-emphasised',
        sm: 'paragraph-small-emphasised',
        default: 'paragraph-regular-emphasised-600',
        lg: 'paragraph-large-emphasised',
        xl: 'headings-h3-semibold',
      },
      disabled: {
        true: 'text-fg-disabled',
      },
    },
    defaultVariants: {
      size: 'default',
      disabled: false,
    },
  },
);

export interface AvatarProps
  extends AvatarPrimitive.Root.Props, VariantProps<typeof avatarVariants> {
  disabled?: boolean;
}

function Avatar({
  className,
  size,
  disabled,
  children,
  ...props
}: AvatarProps) {
  return (
    <AvatarContext.Provider
      value={{ size: size ?? undefined, disabled: disabled ?? undefined }}>
      <AvatarPrimitive.Root
        data-slot="avatar"
        className={cn(
          avatarVariants({
            size,
            state: disabled ? 'disabled' : 'default',
          }),
          !disabled && 'ring-stroke-status-focus',
          !disabled &&
            (size === 'xxs' || size === 'xs' || size === 'sm'
              ? 'focus-visible:ring-[1px]'
              : 'focus-visible:ring-2'),
          disabled && 'cursor-not-allowed',
          className,
        )}
        {...props}>
        {children}
      </AvatarPrimitive.Root>
    </AvatarContext.Provider>
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      className={cn(
        'aspect-square size-full rounded-full object-cover',
        className,
      )}
      data-slot="avatar-image"
      {...props}
    />
  );
}

export interface AvatarFallbackProps
  extends
    AvatarPrimitive.Fallback.Props,
    VariantProps<typeof avatarFallbackVariants> {
  disabled?: boolean;
}

function AvatarFallback({
  className,
  disabled: disabledProp,
  size: sizeProp,
  ...props
}: AvatarFallbackProps) {
  const context = useAvatarContext();
  const size = sizeProp !== undefined ? sizeProp : context.size;
  const disabled = disabledProp !== undefined ? disabledProp : context.disabled;

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(avatarFallbackVariants({ size, disabled }), className)}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        'group/avatar-group flex items-center',
        '*:data-[slot=avatar]:ring-background *:data-[slot=avatar]:not-first:-ml-2',
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <Button
      type="button"
      variant={'ghost'}
      data-slot="avatar-group-count"
      className={className}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount };
