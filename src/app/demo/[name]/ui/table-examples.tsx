'use client';

import { useState } from 'react';

import { Icon } from '@/components/ui/icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function SortLabel({
  label,
  dir,
  onSort,
}: {
  label: string;
  dir: 'asc' | 'desc' | 'none';
  onSort: () => void;
}) {
  const icon =
    dir === 'asc'
      ? 'arrow_upward'
      : dir === 'desc'
        ? 'arrow_downward'
        : 'swap_vert';

  return (
    <button
      type="button"
      className="inline-flex cursor-pointer items-end gap-0.5 border-0 bg-transparent p-0 text-inherit uppercase"
      onClick={onSort}>
      {label}
      <Icon icon={icon} size="sm" />
    </button>
  );
}

const schemaRows = [
  ['churn_risk', 'float', 'Yes', 'Model score between 0 and 1', '0.37'],
  ['customer_id', 'string', 'No', 'Unique customer identifier', 'CUS-004512'],
  [
    'lifetime_value',
    'decimal',
    'Yes',
    'Total revenue to date, in USD',
    '12,480.00',
  ],
  ['region', 'string', 'Yes', 'Sales region code', 'EMEA'],
  ['signup_date', 'date', 'No', 'Date the account was created', '2024-03-18'],
];

export function TableDatasetSchema() {
  const [sort, setSort] = useState<{ index: 0 | 1; dir: 'asc' | 'desc' }>({
    index: 0,
    dir: 'asc',
  });

  const rows = [...schemaRows].sort((a, b) => {
    const cmp = a[sort.index].localeCompare(b[sort.index], undefined, {
      numeric: true,
    });

    return sort.dir === 'asc' ? cmp : -cmp;
  });

  const onSort = (index: 0 | 1) => {
    setSort(cur =>
      cur.index === index
        ? { index, dir: cur.dir === 'asc' ? 'desc' : 'asc' }
        : { index, dir: 'asc' },
    );
  };

  const dir = (index: 0 | 1) => (sort.index === index ? sort.dir : 'none');

  return (
    <Table readOnly>
      <TableHeader>
        <TableRow>
          <TableHead
            selected={sort.index === 0}
            aria-sort={
              sort.index === 0
                ? sort.dir === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }>
            <SortLabel label="Column" dir={dir(0)} onSort={() => onSort(0)} />
          </TableHead>
          <TableHead
            selected={sort.index === 1}
            aria-sort={
              sort.index === 1
                ? sort.dir === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }>
            <SortLabel label="Type" dir={dir(1)} onSort={() => onSort(1)} />
          </TableHead>
          <TableHead>Nullable</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Example</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row[0]}>
            <TableCell>{row[0]}</TableCell>
            <TableCell>{row[1]}</TableCell>
            <TableCell>{row[2]}</TableCell>
            <TableCell>{row[3]}</TableCell>
            <TableCell>{row[4]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
