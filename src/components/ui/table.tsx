'use client';

import type * as React from 'react';

import { cn } from '@/lib/utils';

type Density = 'default' | 'comfortable';
type Align = 'start' | 'end';

interface TableProps extends React.ComponentProps<'table'> {
  density?: Density;
  readOnly?: boolean;
}

const readOnlyGutter =
  'group-data-readonly/table:border-b-0 group-data-readonly/table:bg-transparent group-data-readonly/table:bg-no-repeat group-data-readonly/table:px-0 group-data-readonly/table:not-first:pl-3 group-data-readonly/table:not-last:pr-3 group-data-readonly/table:[background-position:center_bottom] group-data-readonly/table:[background-size:calc(100%-1.5rem)_1px] group-data-readonly/table:first:[background-position:left_bottom] group-data-readonly/table:first:[background-size:calc(100%-0.75rem)_1px] group-data-readonly/table:last:[background-position:right_bottom] group-data-readonly/table:last:[background-size:calc(100%-0.75rem)_1px] group-data-readonly/table:only:[background-position:left_bottom] group-data-readonly/table:only:[background-size:100%_1px]';

function Table({
  className,
  density = 'default',
  readOnly = false,
  ...props
}: TableProps) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto has-[[data-state=dragging]]:overflow-visible has-[[data-state=dragging]]:py-6">
      <table
        data-slot="table"
        data-density={density}
        data-readonly={readOnly || undefined}
        className={cn(
          'group/table w-full caption-bottom border-separate border-spacing-0',
          className,
        )}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead data-slot="table-header" className={cn(className)} {...props} />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('border-stroke-divider border-t font-medium', className)}
      {...props}
    />
  );
}

interface TableRowProps extends React.ComponentProps<'tr'> {
  selected?: boolean;
  disabled?: boolean;
}

function TableRow({
  className,
  selected = false,
  disabled = false,
  ...props
}: TableRowProps) {
  const dataState = selected
    ? 'selected'
    : (props as { 'data-state'?: string })['data-state'];

  return (
    <tr
      {...props}
      data-slot="table-row"
      data-state={dataState}
      data-disabled={disabled || undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        'group/row transition-colors duration-200',
        'hover:bg-stateslayer-overlay-hover',
        'group-data-readonly/table:hover:bg-transparent',
        'data-[state=selected]:bg-stateslayer-overlay-active-inverse',
        'group-data-readonly/table:data-[state=selected]:bg-transparent',
        'data-[state=dragging]:bg-surface-secondary data-[state=dragging]:relative data-[state=dragging]:z-10',
        'data-[state=dragging]:[filter:drop-shadow(0_8px_12px_var(--color-elevations-shade-t-03))_drop-shadow(0_4px_8px_var(--color-elevations-shade-03))]',
        'data-disabled:cursor-not-allowed data-disabled:hover:bg-transparent',
        className,
      )}
    />
  );
}

interface TableHeadProps extends Omit<React.ComponentProps<'th'>, 'align'> {
  align?: Align;
  selected?: boolean;
}

function TableHead({
  className,
  align = 'start',
  selected = false,
  ...props
}: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      data-align={align}
      data-state={selected ? 'selected' : undefined}
      className={cn(
        'border-stroke-tertiary paragraph-small-primary text-fg-secondary border-b bg-transparent align-bottom whitespace-nowrap uppercase',
        '[&_button]:uppercase',
        'h-12 min-h-12 px-3 py-3',
        'group-data-readonly/table:[background-image:linear-gradient(var(--color-stroke-tertiary),var(--color-stroke-tertiary))]',
        readOnlyGutter,
        'group-data-disabled/row:cursor-not-allowed group-data-disabled/row:*:pointer-events-none',
        'data-[state=selected]:text-fg-primary',
        '[&:has([role=checkbox])]:w-11 [&:has([role=checkbox])]:px-3 [&:has([role=checkbox])]:pr-3',
        {
          'text-left': align === 'start',
          'text-right': align === 'end',
        },
        className,
      )}
      {...props}
    />
  );
}

interface TableCellProps extends Omit<React.ComponentProps<'td'>, 'align'> {
  align?: Align;
}

function TableCell({ className, align = 'start', ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      data-align={align}
      className={cn(
        'border-stroke-divider label-regular-primary text-fg-primary border-b align-middle',
        'h-14 min-h-14 px-3 py-4 group-data-[density=comfortable]/table:h-16 group-data-[density=comfortable]/table:min-h-16 group-data-[density=comfortable]/table:py-5',
        'group-data-readonly/table:[background-image:linear-gradient(var(--color-stroke-divider),var(--color-stroke-divider))]',
        readOnlyGutter,
        'group-data-[state=dragging]/row:bg-surface-secondary',
        'group-data-disabled/row:cursor-not-allowed group-data-disabled/row:opacity-[0.38] group-data-disabled/row:*:pointer-events-none',
        '[&:has([role=checkbox])]:w-11 [&:has([role=checkbox])]:px-3',
        {
          'text-left': align === 'start',
          'text-right': align === 'end',
        },
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-fg-secondary mt-2 text-sm', className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
