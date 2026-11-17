'use client';

import { useState } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge, StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { Input } from '@/components/ui/input';
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

export function Toolbar({ filter, value }: { filter: string; value: string }) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Input
          aria-label="Filter rows"
          className="w-60"
          placeholder="Filter rows"
          size="sm"
        />
        <Button size="xs" type="button" variant="ghost">
          <IconShell size="sm" variant="secondary">
            <Icon icon="filter_list" />
          </IconShell>
          {filter}
          <Badge size="sm" variant="alternative">
            {value}
          </Badge>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" type="button" variant="ghost">
          Sort
        </Button>
        <Button size="sm" type="button" variant="ghost">
          View
        </Button>
      </div>
    </div>
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

export function RowMenu({ label }: { label: string }) {
  return (
    <TableCell className="w-16">
      <Button aria-label={label} size="icon-xs" type="button" variant="ghost">
        <IconShell size="sm" variant="secondary">
          <Icon icon="more_horiz" />
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

export function Person({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2);

  return (
    <span className="flex items-center gap-2">
      <Avatar size="xs">
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
