'use client';

import {
  Lines,
  SelectCell,
  SelectHead,
  ShowCell,
  SortHead,
  Toolbar,
  useColumnView,
  useDataTable,
  useSelection,
} from '@/app/demo/[name]/ui/table-starter-parts';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const metricRows = [
  [
    'Lorem ipsum dolor',
    '12,480',
    '48.3M',
    '9,812',
    '0.8%',
    '$1,284.10',
    '6 min ago',
  ],
  [
    'Sit amet consectetur',
    '6,320',
    '21.0M',
    '1,204',
    '1.4%',
    '$412.80',
    '2 hours ago',
  ],
  [
    'Adipiscing elit sed',
    '2,148',
    '6.4M',
    '388',
    '0.4%',
    '$148.75',
    'Yesterday',
  ],
  [
    'Do eiusmod tempor',
    '1,022',
    '3.1M',
    '844',
    '2.1%',
    '$1,730.20',
    '04 Oct 2026',
  ],
  ['Incididunt ut labore', '385', '0.8M', '8', '8%', '$15.40', '07 Oct 2026'],
];

const metricColumns = [
  { id: 'name', label: 'Name', index: 0 },
  {
    id: 'runs',
    label: 'Runs',
    index: 1,
    align: 'end' as const,
    sort: 'number' as const,
  },
  {
    id: 'tokens',
    label: 'Tokens',
    index: 2,
    align: 'end' as const,
    sort: 'number' as const,
  },
  {
    id: 'sessions',
    label: 'Sessions',
    index: 3,
    align: 'end' as const,
    sort: 'number' as const,
  },
  {
    id: 'errors',
    label: 'Errors',
    index: 4,
    align: 'end' as const,
    sort: 'number' as const,
  },
  {
    id: 'cost',
    label: 'Cost',
    index: 5,
    align: 'end' as const,
    sort: 'number' as const,
  },
  { id: 'last', label: 'Last run', index: 6 },
];

export function TableUsageMetrics() {
  const list = useDataTable(metricRows, metricColumns, 'name');
  const view = useColumnView(metricColumns);
  const ids = list.rows.map(item => item.row[0]);
  const pick = useSelection(ids);
  const all = ids.length > 0 && ids.every(id => pick.has(id));
  const some = ids.some(id => pick.has(id)) && !all;

  return (
    <div className="flex w-full flex-col gap-4">
      <Toolbar
        columns={metricColumns}
        query={list.query}
        onColumn={view.on}
        onQueryChange={list.setQuery}
        onSort={list.sortCurrent}
        setColumn={view.set}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <SelectHead
              checked={all ? true : some ? 'indeterminate' : false}
              label="Select all metrics"
              onCheckedChange={pick.toggleAll}
            />
            {metricColumns
              .filter(column => view.on(column.id))
              .map(column => (
                <SortHead
                  key={column.id}
                  align={column.align}
                  dir={list.dir(column.id)}
                  label={column.label}
                  onSort={() => list.toggle(column.id)}
                />
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.rows.map(({ row }) => (
            <TableRow key={row[0]} selected={pick.has(row[0])}>
              <SelectCell
                checked={pick.has(row[0])}
                label={`Select ${row[0]}`}
                onCheckedChange={on => pick.toggle(row[0], on)}
              />
              <TableCell>
                <Lines primary={row[0]} secondary="Lorem ipsum dolor" />
              </TableCell>
              <ShowCell align="end" on={view.on('runs')}>
                {row[1]}
              </ShowCell>
              <ShowCell align="end" on={view.on('tokens')}>
                {row[2]}
              </ShowCell>
              <ShowCell align="end" on={view.on('sessions')}>
                {row[3]}
              </ShowCell>
              <ShowCell align="end" on={view.on('errors')}>
                {row[4]}
              </ShowCell>
              <ShowCell align="end" on={view.on('cost')}>
                {row[5]}
              </ShowCell>
              <ShowCell on={view.on('last')}>{row[6]}</ShowCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
