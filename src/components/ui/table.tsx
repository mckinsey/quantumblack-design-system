'use client';

import type * as React from 'react';

import { cn } from '@/lib/utils';

type Density = 'default' | 'comfortable';
type Align = 'start' | 'end';

interface TableProps extends React.ComponentProps<'table'> {
  density?: Density;
}

function Table({ className, density = 'default', ...props }: TableProps) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        data-density={density}
        className={cn('group/table w-full caption-bottom', className)}
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
        'data-[state=selected]:bg-stateslayer-overlay-active-inverse',
        'data-[state=dragging]:bg-surface-secondary data-[state=dragging]:shadow-elevation-2',
        'data-disabled:pointer-events-none data-disabled:hover:bg-transparent',
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
        'border-stroke-tertiary label-small-primary text-fg-secondary border-b bg-transparent align-bottom whitespace-nowrap',
        'px-3 pt-3 pb-3',
        'hover:border-stroke-tertiary-hover transition-colors duration-200',
        'data-[state=selected]:border-stroke-active data-[state=selected]:text-fg-primary',
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
        'border-stroke-divider paragraph-regular-primary text-fg-primary border-b align-middle',
        'px-3 py-4 group-data-[density=comfortable]/table:py-5',
        'group-data-disabled/row:opacity-[0.38]',
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
