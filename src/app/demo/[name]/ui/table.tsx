'use client';

import { useState } from 'react';

import {
  TableCredentials,
  TableUsageMetrics,
} from '@/app/demo/[name]/ui/table-credentials';
import { TableDatasetSchema } from '@/app/demo/[name]/ui/table-examples';
import {
  TableRoadmap,
  TableUsageSummary,
} from '@/app/demo/[name]/ui/table-readonly';
import {
  TableOrderedList,
  TableSimpleList,
} from '@/app/demo/[name]/ui/table-selection';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export {
  TableCredentials,
  TableDatasetSchema,
  TableOrderedList,
  TableRoadmap,
  TableSimpleList,
  TableUsageMetrics,
  TableUsageSummary,
};

const rows = [
  {
    primary: 'Primary text that wraps onto a second or third line',
    value: '999.99',
  },
  {
    primary: 'Primary text that wraps onto a second line',
    value: '42.00',
  },
  {
    primary: 'Short label',
    value: '1.25',
  },
];

function SimpleTable({
  density = 'default',
}: {
  density?: 'default' | 'comfortable';
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const ids = rows.map(row => row.value);
  const all = selected.length === ids.length;
  const some = selected.length > 0 && !all;

  const toggleAll = (on: boolean) => {
    setSelected(on ? ids : []);
  };

  const toggle = (id: string, on: boolean) => {
    setSelected(cur => (on ? [...cur, id] : cur.filter(item => item !== id)));
  };

  return (
    <Table density={density}>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              aria-label="Select all"
              checked={all ? true : some ? 'indeterminate' : false}
              onCheckedChange={value => toggleAll(value === true)}
            />
          </TableHead>
          <TableHead>Header</TableHead>
          <TableHead align="end">Header</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.value} selected={selected.includes(row.value)}>
            <TableCell>
              <Checkbox
                aria-label={`Select ${row.value}`}
                checked={selected.includes(row.value)}
                onCheckedChange={value => toggle(row.value, value === true)}
              />
            </TableCell>
            <TableCell>{row.primary}</TableCell>
            <TableCell align="end">{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function TableDefault() {
  return <SimpleTable />;
}

export function TableDensity() {
  return (
    <div className="flex w-full flex-col gap-8">
      {(['default', 'comfortable'] as const).map(density => (
        <div key={density} className="flex flex-col gap-2">
          <p className="text-fg-secondary label-small-primary">{density}</p>
          <SimpleTable density={density} />
        </div>
      ))}
    </div>
  );
}

function RowSample({
  label,
  selected,
  disabled,
}: {
  label: string;
  selected?: boolean;
  disabled?: boolean;
}) {
  const row = rows[0];

  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-fg-secondary label-small-primary">{label}</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                aria-label={`${label} select all`}
                checked={selected}
                disabled={disabled}
              />
            </TableHead>
            <TableHead>Header</TableHead>
            <TableHead align="end">Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow selected={selected} disabled={disabled}>
            <TableCell>
              <Checkbox
                aria-label={label}
                checked={selected}
                disabled={disabled}
              />
            </TableCell>
            <TableCell>{row.primary}</TableCell>
            <TableCell align="end">{row.value}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export function TableRowStates() {
  return (
    <div className="flex w-full flex-col gap-8">
      <RowSample label="Default" />
      <RowSample label="Selected" selected />
      <RowSample label="Disabled" disabled />
    </div>
  );
}

export const examples = [
  {
    name: 'TableDefault',
    title: 'Table',
    description:
      'Header row and body rows: select, text, and a numeric column.',
  },
  {
    name: 'TableRowStates',
    title: 'Row states',
    description:
      'Default, selected, and disabled, with space between each. Hover the default row for the hover fill.',
  },
  {
    name: 'TableDensity',
    title: 'Density',
    description: 'Default and comfortable body cell padding.',
  },
  {
    name: 'TableDatasetSchema',
    title: 'Readonly tables',
    description:
      'Read-only columns. Column and Type sort the rows. No select cell and no hover.',
  },
  {
    name: 'TableSimpleList',
    title: 'Simple list',
    description:
      'Selectable rows with a filter bar, status, owner, and a row action.',
  },
  {
    name: 'TableOrderedList',
    title: 'Ordered list',
    description: 'A drag handle beside the select cell. Drag stays visual.',
  },
  {
    name: 'TableCredentials',
    title: 'Credentials',
    description: 'Masked keys, copy, and an expiry status.',
  },
  {
    name: 'TableUsageMetrics',
    title: 'Usage and metrics',
    description:
      'Numeric columns for runs, tokens, sessions, errors, and cost.',
  },
  {
    name: 'TableUsageSummary',
    title: 'Usage summary',
    description: 'Read-only totals with a delta under each number.',
  },
  {
    name: 'TableRoadmap',
    title: 'Roadmap',
    description:
      'Read-only rows with an avatar, a second line, and release text.',
  },
];

export const table = {
  name: 'table',
  components: {
    Table: <TableDefault />,
    'Row states': <TableRowStates />,
    Density: <TableDensity />,
    'Readonly tables': <TableDatasetSchema />,
    'Simple list': <TableSimpleList />,
    'Ordered list': <TableOrderedList />,
    Credentials: <TableCredentials />,
    'Usage and metrics': <TableUsageMetrics />,
    'Usage summary': <TableUsageSummary />,
    Roadmap: <TableRoadmap />,
  },
};
