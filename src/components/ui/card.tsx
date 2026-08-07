import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

type CardSize = 'sm' | 'default';

const CardSizeContext = React.createContext<CardSize>('default');

function useCardSize() {
  return React.useContext(CardSizeContext);
}

const cardVariants = cva(
  [
    'group/card text-fg-primary flex flex-col overflow-clip',
    'bg-fill-onsurface-ui-1 shadow-elevation-0',
  ],
  {
    variants: {
      size: {
        default: 'pb-7',
        sm: 'pb-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

function Card({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof cardVariants>) {
  return (
    <CardSizeContext.Provider value={size ?? 'default'}>
      <div
        data-slot="card"
        data-size={size}
        className={cn(cardVariants({ size }), className)}
        {...props}
      />
    </CardSizeContext.Provider>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'relative z-1 flex w-full items-center justify-between gap-2',
        'group-data-[size=default]/card:px-7 group-data-[size=default]/card:pt-7',
        'group-data-[size=sm]/card:px-6 group-data-[size=sm]/card:pt-6',
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
      className={cn(
        'flex flex-col',
        'group-data-[size=default]/card:gap-3 group-data-[size=default]/card:px-7 group-data-[size=default]/card:py-6',
        'group-data-[size=sm]/card:gap-4 group-data-[size=sm]/card:px-6 group-data-[size=sm]/card:py-5',
        className,
      )}
      {...props}
    />
  );
}

function CardAttribution({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-attribution"
      className={cn(
        'flex w-full items-center gap-2',
        'group-data-[size=default]/card:pb-3',
        'group-data-[size=sm]/card:pb-2',
        className,
      )}
      {...props}
    />
  );
}

function CardStatGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-stat-group"
      className={cn(
        'flex items-center',
        'group-data-[size=default]/card:gap-5',
        'group-data-[size=sm]/card:gap-4',
        className,
      )}
      {...props}
    />
  );
}

function CardStat({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-stat"
      className={cn(
        'text-fg-secondary flex items-center gap-1',
        'group-data-[size=default]/card:label-large-primary',
        'group-data-[size=sm]/card:label-regular-primary',
        className,
      )}
      {...props}
    />
  );
}

function CardData({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-data"
      className={cn(
        'flex w-full flex-col',
        'group-data-[size=default]/card:gap-4 group-data-[size=default]/card:px-7',
        'group-data-[size=sm]/card:gap-4 group-data-[size=sm]/card:px-6',
        className,
      )}
      {...props}>
      <div
        role="separator"
        aria-orientation="horizontal"
        data-slot="card-data-divider"
        className="flex h-2 w-12 shrink-0 flex-col">
        <div className="border-stroke-divider h-1 w-full border-0 border-b border-solid" />
        <div className="h-1 w-full" />
      </div>
      <div className="flex w-full flex-col gap-2">{children}</div>
    </div>
  );
}

function CardDataRow({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-data-row"
      className={cn(
        'flex w-full items-start justify-between',
        'group-data-[size=default]/card:label-large-primary',
        'group-data-[size=sm]/card:label-regular-primary',
        className,
      )}
      {...props}
    />
  );
}

function CardDataLabel({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="card-data-label"
      className={cn('text-fg-secondary flex items-center gap-0.5', className)}
      {...props}
    />
  );
}

function CardDataValue({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="card-data-value"
      className={cn(
        'text-fg-primary text-right',
        'group-data-[size=default]/card:paragraph-large-primary',
        'group-data-[size=sm]/card:paragraph-regular-primary',
        className,
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'flex items-center justify-between',
        'group-data-[size=default]/card:px-7',
        'group-data-[size=sm]/card:px-6',
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
  CardAttribution,
  CardStatGroup,
  CardStat,
  CardData,
  CardDataRow,
  CardDataLabel,
  CardDataValue,
  cardVariants,
  useCardSize,
};
