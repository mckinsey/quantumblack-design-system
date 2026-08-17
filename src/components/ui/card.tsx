import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const cardVariants = cva(
  'group/card text-fg-primary flex flex-col gap-0 shadow-elevation-0',
  {
    variants: {
      size: {
        default: '[--card-inset:--spacing(7)]',
        sm: '[--card-inset:--spacing(6)]',
      },
      contrast: {
        low: 'bg-fill-onsurface-ui-1',
        high: 'bg-fill-onsurface-ui-2',
      },
    },
    defaultVariants: {
      size: 'default',
      contrast: 'low',
    },
  },
);

function Card({
  className,
  size = 'default',
  contrast = 'low',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-contrast={contrast}
      className={cn(cardVariants({ size, contrast }), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'relative z-10 flex w-full items-center justify-between gap-2 px-(--card-inset) pt-(--card-inset)',
        className,
      )}
      {...props}
    />
  );
}

function CardMedia({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-media"
      className={cn(
        'bg-fill-onsurface-ui-2 relative aspect-[2/1] w-full shrink-0 overflow-clip',
        '[&>img]:absolute [&>img]:inset-0 [&>img]:size-full [&>img]:object-cover',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'text-fg-primary overflow-hidden',
        'group-data-[size=default]/card:headings-h2-regular',
        'group-data-[size=sm]/card:headings-h3-regular',
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        'text-fg-secondary overflow-hidden',
        'group-data-[size=default]/card:paragraph-large-primary',
        'group-data-[size=sm]/card:paragraph-regular-primary',
        className,
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'ml-auto flex shrink-0 items-center justify-end',
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('flex flex-col px-(--card-inset)', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'mt-auto flex items-end justify-between px-(--card-inset) pb-(--card-inset)',
        '[[data-slot=card]:not(:has(>[data-slot=card-media]))_&]:min-h-0 [[data-slot=card]:not(:has(>[data-slot=card-media]))_&]:flex-1',
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardMedia,
};
