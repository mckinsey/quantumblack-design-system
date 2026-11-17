'use client';

import {
  Lines,
  RowMenu,
  SelectCell,
  SelectHead,
  StatusLabel,
  Toolbar,
  useSelection,
} from '@/app/demo/[name]/ui/table-starter-parts';
import { Button } from '@/components/ui/button';
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

const credentialRows = [
  [
    'Lorem ipsum',
    'lorem-••••••••dolor',
    '02 May 2026',
    '2 hours ago',
    '12 Dec 2027',
    '',
  ],
  [
    'Sit amet',
    'lorem-••••••••sit',
    '15 Aug 2026',
    'Yesterday',
    '15 Aug 2027',
    '',
  ],
  [
    'Consectetur elit',
    'lorem-••••••••amet',
    '11 Apr 2026',
    '30 days ago',
    '30 Dec 2026',
    '',
  ],
  [
    'Adipiscing sed',
    'lorem-••••••••elit',
    '28 Dec 2025',
    '18 Dec 2026',
    'In 14 days',
    'warning',
  ],
  [
    'Eiusmod tempor',
    'lorem-••••••••sed',
    '03 Jan 2026',
    'Never',
    'Expired',
    'error',
  ],
];

export function TableCredentials() {
  const ids = credentialRows.map(row => row[0]);
  const pick = useSelection(ids);

  return (
    <div className="flex w-full flex-col gap-4">
      <Toolbar filter="Status" value="Active" />
      <Table>
        <TableHeader>
          <TableRow>
            <SelectHead
              checked={pick.all ? true : pick.some ? 'indeterminate' : false}
              label="Select all credentials"
              onCheckedChange={pick.toggleAll}
            />
            <TableHead>Name</TableHead>
            <TableHead>Key</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last used</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {credentialRows.map(row => (
            <TableRow key={row[0]} selected={pick.has(row[0])}>
              <SelectCell
                checked={pick.has(row[0])}
                label={`Select ${row[0]}`}
                onCheckedChange={on => pick.toggle(row[0], on)}
              />
              <TableCell>
                <Lines primary={row[0]} secondary="Lorem ipsum dolor" />
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-2">
                  <span className="truncate">{row[1]}</span>
                  <Button
                    aria-label={`Copy ${row[0]}`}
                    size="icon-xs"
                    type="button"
                    variant="ghost">
                    <IconShell size="sm" variant="secondary">
                      <Icon icon="content_copy" />
                    </IconShell>
                  </Button>
                </span>
              </TableCell>
              <TableCell>{row[2]}</TableCell>
              <TableCell>{row[3]}</TableCell>
              <TableCell>
                {row[5] ? <StatusLabel label={row[4]} /> : row[4]}
              </TableCell>
              <RowMenu label={`Actions for ${row[0]}`} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

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

export function TableUsageMetrics() {
  const ids = metricRows.map(row => row[0]);
  const pick = useSelection(ids);

  return (
    <div className="flex w-full flex-col gap-4">
      <Toolbar filter="Owner" value="Mine" />
      <Table>
        <TableHeader>
          <TableRow>
            <SelectHead
              checked={pick.all ? true : pick.some ? 'indeterminate' : false}
              label="Select all metrics"
              onCheckedChange={pick.toggleAll}
            />
            <TableHead>Name</TableHead>
            <TableHead align="end">Runs</TableHead>
            <TableHead align="end">Tokens</TableHead>
            <TableHead align="end">Sessions</TableHead>
            <TableHead align="end">Errors</TableHead>
            <TableHead align="end">Cost</TableHead>
            <TableHead>Last run</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metricRows.map(row => (
            <TableRow key={row[0]} selected={pick.has(row[0])}>
              <SelectCell
                checked={pick.has(row[0])}
                label={`Select ${row[0]}`}
                onCheckedChange={on => pick.toggle(row[0], on)}
              />
              <TableCell>
                <Lines primary={row[0]} secondary="Lorem ipsum dolor" />
              </TableCell>
              <TableCell align="end">{row[1]}</TableCell>
              <TableCell align="end">{row[2]}</TableCell>
              <TableCell align="end">{row[3]}</TableCell>
              <TableCell align="end">{row[4]}</TableCell>
              <TableCell align="end">{row[5]}</TableCell>
              <TableCell>{row[6]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
