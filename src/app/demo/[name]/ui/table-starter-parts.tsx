'use client';

import {
  type Row,
  type SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { type ComponentProps, useMemo, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge, StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { TableCell, TableHead } from '@/components/ui/table';

type Tone = 'success' | 'warning' | 'error' | 'alternative' | 'brand-accent';

const tones: Record<string, Tone> = {
  Active: 'success',
  Pending: 'warning',
  Failed: 'error',
  Archived: 'alternative',
  'In progress': 'brand-accent',
  Todo: 'alternative',
  Done: 'success',
  Cancelled: 'error',
  High: 'error',
  Medium: 'warning',
  Low: 'alternative',
  Expired: 'error',
  'In 14 days': 'warning',
};

function dotTone(tone: Tone) {
  if (tone === 'alternative') {
    return 'neutral' as const;
  }

  if (tone === 'brand-accent') {
    return 'neutral-brand' as const;
  }

  return tone;
}

type Item = { id: string; row: string[]; index: number };

export type DataColumn = {
  id: string;
  index: number;
  sort?: 'text' | 'number' | 'date';
};

function sortingFn(sort: DataColumn['sort']) {
  if (sort === 'number') {
    return (a: Row<Item>, b: Row<Item>, id: string) => {
      const n = (value: string) => Number(value.replace(/[^0-9.]/g, '')) || 0;

      return n(a.getValue(id)) - n(b.getValue(id));
    };
  }

  if (sort === 'date') {
    return (a: Row<Item>, b: Row<Item>, id: string) =>
      new Date(a.getValue<string>(id)).getTime() -
      new Date(b.getValue<string>(id)).getTime();
  }

  return 'alphanumeric' as const;
}

export function useDataTable(
  rows: string[][],
  columns: DataColumn[],
  initialId?: string,
) {
  const data = useMemo<Item[]>(
    () => rows.map((row, index) => ({ id: row[0], row, index })),
    [rows],
  );
  const defs = useMemo(
    () =>
      columns.map(column => ({
        id: column.id,
        accessorFn: (item: Item) => item.row[column.index],
        sortingFn: sortingFn(column.sort),
      })),
    [columns],
  );
  const [sorting, setSorting] = useState<SortingState>(
    initialId ? [{ id: initialId, desc: false }] : [],
  );
  const [query, setQuery] = useState('');
  const table = useReactTable({
    data,
    columns: defs,
    state: { sorting, globalFilter: query },
    onSortingChange: setSorting,
    onGlobalFilterChange: setQuery,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      const q = String(filterValue).trim().toLowerCase();

      if (!q) {
        return true;
      }

      return row.original.row.some(cell => cell.toLowerCase().includes(q));
    },
    getRowId: row => row.id,
  });

  const dir = (id: string) => {
    const current = sorting.find(item => item.id === id);

    if (!current) {
      return 'none' as const;
    }

    return current.desc ? ('desc' as const) : ('asc' as const);
  };

  const toggle = (id: string) => {
    setSorting(cur => {
      const current = cur[0];

      if (current?.id === id) {
        return [{ id, desc: !current.desc }];
      }

      return [{ id, desc: false }];
    });
  };

  const sortCurrent = () => {
    const id = sorting[0]?.id ?? columns[0]?.id;

    if (id) {
      toggle(id);
    }
  };

  return {
    rows: table.getRowModel().rows.map(row => row.original),
    query,
    setQuery,
    dir,
    toggle,
    sortCurrent,
    clearSort: () => setSorting([]),
  };
}

export function useColumnView(columns: { id: string }[]) {
  const locked = columns[0]?.id;
  const [hidden, setHidden] = useState<string[]>([]);

  const on = (id: string) => id === locked || !hidden.includes(id);

  const set = (id: string, visible: boolean) => {
    if (id === locked) {
      return;
    }

    setHidden(cur =>
      visible ? cur.filter(item => item !== id) : [...new Set([...cur, id])],
    );
  };

  return { on, set };
}

export function useSelection(ids: string[]) {
  const [selected, setSelected] = useState<string[]>([]);
  const all = ids.length > 0 && selected.length === ids.length;
  const some = selected.length > 0 && !all;

  const toggleAll = (on: boolean) => {
    setSelected(on ? ids : []);
  };

  const toggle = (id: string, on: boolean) => {
    setSelected(cur => (on ? [...cur, id] : cur.filter(item => item !== id)));
  };

  const has = (id: string) => selected.includes(id);

  return { all, some, toggleAll, toggle, has };
}

export function StatusLabel({ label }: { label: string }) {
  const tone = tones[label] ?? 'alternative';

  return (
    <Badge outline size="sm" variant={tone} withDot>
      <StatusBadge variant={dotTone(tone)} size="sm" className="shrink-0" />
      {label}
    </Badge>
  );
}

export function Toolbar({
  placeholder = 'Filter names...',
  query,
  onQueryChange,
  onSort,
  columns = [],
  onColumn,
  setColumn,
}: {
  placeholder?: string;
  query?: string;
  onQueryChange?: (query: string) => void;
  onSort?: () => void;
  columns?: { id: string; label: string }[];
  onColumn?: (id: string) => boolean;
  setColumn?: (id: string, visible: boolean) => void;
}) {
  return (
    <div className="flex h-9 w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <InputGroup className="w-60" size="sm">
          <InputGroupAddon align="inline-start">
            <IconShell size="sm" variant="secondary">
              <Icon icon="search" />
            </IconShell>
          </InputGroupAddon>
          <InputGroupInput
            aria-label="Filter rows"
            placeholder={placeholder}
            value={onQueryChange ? query : undefined}
            onChange={
              onQueryChange
                ? event => onQueryChange(event.target.value)
                : undefined
            }
          />
        </InputGroup>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onSort} size="default" type="button" variant="outline">
          <IconShell size="sm" variant="secondary">
            <Icon icon="swap_vert" />
          </IconShell>
          Sort
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button size="default" type="button" variant="outline" />}>
            <IconShell size="sm" variant="secondary">
              <Icon icon="tune" />
            </IconShell>
            Settings
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.slice(1).map(column => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={onColumn?.(column.id) ?? true}
                closeOnClick={false}
                onCheckedChange={checked => setColumn?.(column.id, checked)}>
                {column.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export function ShowCell({
  on,
  ...props
}: ComponentProps<typeof TableCell> & { on: boolean }) {
  if (!on) {
    return null;
  }

  return <TableCell {...props} />;
}

export function SortHead({
  label,
  dir,
  align = 'start',
  onSort,
}: {
  label: string;
  dir: 'asc' | 'desc' | 'none';
  align?: 'start' | 'end';
  onSort: () => void;
}) {
  const icon =
    dir === 'asc'
      ? 'arrow_upward'
      : dir === 'desc'
        ? 'arrow_downward'
        : 'swap_vert';

  return (
    <TableHead
      align={align}
      aria-sort={
        dir === 'asc' ? 'ascending' : dir === 'desc' ? 'descending' : 'none'
      }
      selected={dir !== 'none'}>
      <button
        className="inline-flex cursor-pointer items-end gap-0.5 border-0 bg-transparent p-0 text-inherit uppercase"
        type="button"
        onClick={onSort}>
        {label}
        <Icon icon={icon} size="sm" />
      </button>
    </TableHead>
  );
}

export function SelectHead({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean | 'indeterminate';
  onCheckedChange: (on: boolean) => void;
}) {
  return (
    <TableHead>
      <Checkbox
        aria-label={label}
        checked={checked}
        onCheckedChange={value => onCheckedChange(value === true)}
      />
    </TableHead>
  );
}

export function SelectCell({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (on: boolean) => void;
}) {
  return (
    <TableCell>
      <Checkbox
        aria-label={label}
        checked={checked}
        onCheckedChange={value => onCheckedChange(value === true)}
      />
    </TableCell>
  );
}

export function RowMenu({
  label,
  icon = 'more_horiz',
}: {
  label: string;
  icon?: string;
}) {
  return (
    <TableCell className="w-16">
      <Button aria-label={label} size="icon-xs" type="button" variant="ghost">
        <IconShell size="sm" variant="secondary">
          <Icon icon={icon} />
        </IconShell>
      </Button>
    </TableCell>
  );
}

export function Lines({
  primary,
  secondary,
}: {
  primary: string;
  secondary?: string;
}) {
  return (
    <span className="flex min-w-0 flex-col">
      <span className="truncate">{primary}</span>
      {secondary ? (
        <span className="text-fg-secondary paragraph-small-primary truncate">
          {secondary}
        </span>
      ) : null}
    </span>
  );
}

const basePath = import.meta.env.VITE_BASE_PATH ?? '';

export function avatarSrc(index: number) {
  return `${basePath}/users/avatar-${(index % 6) + 1}.jpg`;
}

export function Person({ name, src }: { name: string; src: string }) {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2);

  return (
    <span className="flex items-center gap-2">
      <Avatar size="xs">
        <AvatarImage alt={name} src={src} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <span className="truncate">{name}</span>
    </span>
  );
}

export function BoardTitle({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-fg-primary label-regular-primary">{title}</p>
      <p className="text-fg-secondary paragraph-small-primary">{detail}</p>
    </div>
  );
}

export function Metric({ value, delta }: { value: string; delta?: string }) {
  const down = delta?.startsWith('-');

  return (
    <span className="flex flex-col items-end">
      <span>{value}</span>
      {delta ? (
        <span
          className={
            down
              ? 'text-status-error paragraph-small-primary'
              : 'text-status-success paragraph-small-primary'
          }>
          {delta}
        </span>
      ) : null}
    </span>
  );
}
