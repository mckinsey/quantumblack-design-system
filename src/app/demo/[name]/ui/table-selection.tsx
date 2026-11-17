'use client';

import {
  Lines,
  Person,
  RowMenu,
  SelectCell,
  SelectHead,
  StatusLabel,
  Toolbar,
  useSelection,
} from '@/app/demo/[name]/ui/table-starter-parts';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const simpleRows = [
  [
    'Lorem ipsum dolor',
    'sit amet consectetur',
    'Active',
    'Lorem Ipsum',
    '12 Oct 2026',
  ],
  [
    'Adipiscing elit sed',
    'do eiusmod tempor',
    'Pending',
    'Dolor Sit',
    '03 Oct 2026',
  ],
  [
    'Incididunt ut labore',
    'et dolore magna',
    'Active',
    'Amet Consectetur',
    '09 Oct 2026',
  ],
  [
    'Ut enim ad minim',
    'veniam quis nostrud',
    'Failed',
    'Elit Sed',
    '07 Oct 2026',
  ],
  [
    'Exercitation ullamco',
    'laboris nisi aliquip',
    'Archived',
    'Magna Aliqua',
    '30 Sep 2026',
  ],
];

export function TableSimpleList() {
  const ids = simpleRows.map(row => row[0]);
  const pick = useSelection(ids);

  return (
    <div className="flex w-full flex-col gap-4">
      <Toolbar filter="Status" value="Active" />
      <Table>
        <TableHeader>
          <TableRow>
            <SelectHead
              checked={pick.all ? true : pick.some ? 'indeterminate' : false}
              label="Select all resources"
              onCheckedChange={pick.toggleAll}
            />
            <TableHead>Resource</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {simpleRows.map(row => (
            <TableRow key={row[0]} selected={pick.has(row[0])}>
              <SelectCell
                checked={pick.has(row[0])}
                label={`Select ${row[0]}`}
                onCheckedChange={on => pick.toggle(row[0], on)}
              />
              <TableCell>
                <Lines primary={row[0]} secondary={row[1]} />
              </TableCell>
              <TableCell>
                <StatusLabel label={row[2]} />
              </TableCell>
              <TableCell>
                <Person name={row[3]} />
              </TableCell>
              <TableCell>{row[4]}</TableCell>
              <RowMenu label={`Actions for ${row[0]}`} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const orderedRows = [
  ['Lorem', 'Ipsum dolor sit amet', 'In progress', 'High'],
  ['Ipsum', 'Consectetur adipiscing elit', 'Todo', 'Medium'],
  ['Dolor', 'Sed do eiusmod tempor', 'Done', 'Low'],
  ['Sit', 'Incididunt ut labore et dolore', 'In progress', 'High'],
  ['Amet', 'Ut enim ad minim veniam', 'Cancelled', 'Medium'],
];

export function TableOrderedList() {
  const ids = orderedRows.map(row => row[0]);
  const pick = useSelection(ids);

  return (
    <div className="flex w-full flex-col gap-4">
      <Toolbar filter="Status" value="In progress" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-9" />
            <SelectHead
              checked={pick.all ? true : pick.some ? 'indeterminate' : false}
              label="Select all tasks"
              onCheckedChange={pick.toggleAll}
            />
            <TableHead>Task</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderedRows.map(row => (
            <TableRow key={row[0]} selected={pick.has(row[0])}>
              <TableCell className="w-9">
                <IconShell size="sm" variant="secondary">
                  <Icon icon="drag_indicator" />
                </IconShell>
              </TableCell>
              <SelectCell
                checked={pick.has(row[0])}
                label={`Select ${row[0]}`}
                onCheckedChange={on => pick.toggle(row[0], on)}
              />
              <TableCell>{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell>
                <StatusLabel label={row[2]} />
              </TableCell>
              <TableCell>
                <StatusLabel label={row[3]} />
              </TableCell>
              <RowMenu label={`Actions for ${row[0]}`} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
