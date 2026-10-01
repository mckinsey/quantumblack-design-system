'use client';

import type * as React from 'react';

import { cn } from '@/lib/utils';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn('w-full caption-bottom', className)}
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
      className={cn('border-t font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  );
}

interface TableRowProps extends React.ComponentProps<'tr'> {
  selected?: boolean;
}

function TableRow({ className, selected = false, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      data-state={selected ? 'selected' : undefined}
      className={cn('group', className)}
      {...props}
    />
  );
}

interface TableHeadProps extends React.ComponentProps<'th'> {
  size?: 'sm' | 'default';
  selected?: boolean;
}

function TableHead({
  className,
  size = 'default',
  selected = false,
  ...props
}: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      data-state={selected ? 'selected' : undefined}
      className={cn(
        'border-stroke-tertiary h-[60px] border-b bg-transparent text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[1px]',
        'text-fg-secondary hover:border-stroke-tertiary-hover',
        'transition-colors duration-200',
        'data-[state=selected]:text-fg-primary',
        'label-regular-primary',
        {
          'px-3': size === 'sm',
          'px-4': size === 'default',
        },
        className,
      )}
      {...props}
    />
  );
}

interface TableCellProps extends React.ComponentProps<'td'> {
  size?: 'sm' | 'default';
  lines?: 'single' | 'multi';
}

function TableCell({
  className,
  size = 'default',
  lines = 'single',
  ...props
}: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'border-stroke-tertiary text-fg-primary h-[60px] border-b align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[1px]',
        "[tr[data-state='selected']>td]:border-stroke-active [tr[data-state='selected']>td]:text-fg-primary",
        'hover:border-stroke-tertiary-hover group-hover:border-stroke-tertiary-hover',
        'transition-colors delay-75 duration-200',
        'label-regular-primary py-1',
        {
          'px-3': size === 'sm',
          'px-4': size === 'default',
          'whitespace-nowrap': lines === 'single',
          'whitespace-normal': lines === 'multi',
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
