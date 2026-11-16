'use client';

import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge, StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const basePath = import.meta.env.VITE_BASE_PATH ?? '';

type Tone = 'success' | 'warning' | 'error' | 'neutral';

function useSelection(ids: string[], initial: string[]) {
  const [selected, setSelected] = useState(initial);

  const toggle = (id: string) => {
    setSelected(cur =>
      cur.includes(id) ? cur.filter(item => item !== id) : [...cur, id],
    );
  };

  const toggleAll = () => {
    setSelected(cur => (cur.length === ids.length ? [] : ids));
  };

  return { selected, setSelected, toggle, toggleAll };
}

function SortLabel({
  label,
  dir,
}: {
  label: string;
  dir?: 'asc' | 'desc' | 'none';
}) {
  const icon =
    dir === 'asc'
      ? 'arrow_upward'
      : dir === 'desc'
        ? 'arrow_downward'
        : 'swap_vert';

  return (
    <span className="inline-flex items-center gap-1">
      {label}
      {dir ? <Icon icon={icon} size="sm" /> : null}
    </span>
  );
}

function Toolbar({
  placeholder,
  filters,
  sort = true,
}: {
  placeholder: string;
  filters?: string[];
  sort?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative w-56">
        <Icon
          icon="search"
          size="sm"
          className="text-fg-tertiary pointer-events-none absolute top-1/2 left-2 -translate-y-1/2"
        />
        <Input size="sm" className="pl-8" placeholder={placeholder} />
      </div>
      {filters?.map(filter => (
        <Badge key={filter} outline withIcon size="sm">
          <Icon icon="filter_alt" size="sm" />
          {filter}
        </Badge>
      ))}
      <div className="ml-auto flex items-center gap-2">
        {sort ? (
          <Button variant="outline" size="sm">
            <Icon icon="swap_vert" size="sm" />
            Sort
          </Button>
        ) : null}
        <Button variant="outline" size="sm">
          <Icon icon="view_column" size="sm" />
          View
        </Button>
      </div>
    </div>
  );
}

function SelectionBar({
  count,
  onClear,
}: {
  count: number;
  onClear: () => void;
}) {
  if (count === 0) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div className="border-stroke-secondary bg-surface-secondary flex items-center gap-2 border px-2 py-1">
        <span className="paragraph-small-primary">{count} selected</span>
        <Button
          variant="ghost"
          size="icon-xxs"
          aria-label="Clear selection"
          onClick={onClear}>
          <IconShell size="sm">
            <Icon icon="close" />
          </IconShell>
        </Button>
        <Button variant="outline" size="xs">
          <Icon icon="filter_alt" size="sm" />
          Status
        </Button>
        <Button variant="outline" size="xs">
          <Icon icon="arrow_upward" size="sm" />
          Priority
        </Button>
        <Button variant="outline" size="xs">
          <Icon icon="download" size="sm" />
          Export
        </Button>
        <Button variant="outline" size="xs">
          <Icon icon="delete" size="sm" />
          Delete
        </Button>
      </div>
    </div>
  );
}

function RowMenu() {
  return (
    <Button variant="ghost" size="icon-xxs" aria-label="Row actions">
      <IconShell size="sm">
        <Icon icon="more_vert" />
      </IconShell>
    </Button>
  );
}

function TwoLine({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) {
  return (
    <div className="flex flex-col">
      <span>{primary}</span>
      <span className="paragraph-small-primary text-fg-secondary">
        {secondary}
      </span>
    </div>
  );
}

function StatusPill({ tone, label }: { tone: Tone; label: string }) {
  return (
    <Badge outline withDot size="sm">
      <StatusBadge variant={tone} size="sm" />
      {label}
    </Badge>
  );
}

function Person({
  name,
  src,
  initials,
}: {
  name: string;
  src?: string;
  initials?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <Avatar size="xs">
        {src ? <AvatarImage src={`${basePath}/users/${src}`} /> : null}
        <AvatarFallback>{initials ?? name.slice(0, 1)}</AvatarFallback>
      </Avatar>
      {name}
    </span>
  );
}

function SelectCell({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean | 'indeterminate';
  onCheckedChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={value => onCheckedChange(value === true)}
      aria-label={label}
    />
  );
}

function Trend({
  value,
  delta,
  tone,
}: {
  value: string;
  delta: string;
  tone: 'up' | 'down' | 'flat';
}) {
  return (
    <div className="flex flex-col items-end">
      <span>{value}</span>
      <span
        className={cn(
          'paragraph-small-primary',
          tone === 'up' && 'text-status-success',
          tone === 'down' && 'text-status-error',
          tone === 'flat' && 'text-fg-secondary',
        )}>
        {delta}
      </span>
    </div>
  );
}

const simpleRows = [
  {
    id: 'churn',
    name: 'Customer churn features',
    meta: 'dataset/churn-v3',
    status: 'Active',
    tone: 'success' as Tone,
    owner: 'Priya Raman',
    avatar: 'avatar-1.jpg',
    updated: '12 Oct 2026',
  },
  {
    id: 'forecast',
    name: 'Demand forecast model',
    meta: 'model/forecast-xgb',
    status: 'Pending',
    tone: 'warning' as Tone,
    owner: 'Tom Okafor',
    avatar: 'avatar-2.jpg',
    updated: '11 Oct 2026',
  },
  {
    id: 'retail',
    name: 'Retail transactions 2026',
    meta: 'dataset/retail-tx',
    status: 'Active',
    tone: 'success' as Tone,
    owner: 'Mei Lin',
    avatar: 'avatar-3.jpg',
    updated: '09 Oct 2026',
  },
  {
    id: 'triage',
    name: 'Support triage agent',
    meta: 'agent/triage',
    status: 'Failed',
    tone: 'error' as Tone,
    owner: 'Jonas Berg',
    avatar: 'avatar-4.jpg',
    updated: '07 Oct 2026',
  },
  {
    id: 'kpi',
    name: 'Quarterly KPI report',
    meta: 'file/kpi-q3.pdf',
    status: 'Archived',
    tone: 'neutral' as Tone,
    owner: 'Sara Duarte',
    avatar: 'avatar-5.jpg',
    updated: '30 Sep 2026',
  },
];

export function TableSimpleList() {
  const ids = simpleRows.map(row => row.id);
  const { selected, setSelected, toggle, toggleAll } = useSelection(ids, [
    'forecast',
    'retail',
  ]);
  const all = selected.length === ids.length;

  return (
    <div className="flex flex-col gap-3">
      <Toolbar placeholder="Filter names..." filters={['Status', 'Active']} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <SelectCell
                checked={
                  all ? true : selected.length > 0 ? 'indeterminate' : false
                }
                onCheckedChange={() => toggleAll()}
                label="Select all"
              />
            </TableHead>
            <TableHead selected>
              <SortLabel label="Name" dir="asc" />
            </TableHead>
            <TableHead>
              <SortLabel label="Status" dir="none" />
            </TableHead>
            <TableHead>
              <SortLabel label="Owner" dir="none" />
            </TableHead>
            <TableHead>
              <SortLabel label="Updated" dir="none" />
            </TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {simpleRows.map(row => (
            <TableRow key={row.id} selected={selected.includes(row.id)}>
              <TableCell>
                <SelectCell
                  checked={selected.includes(row.id)}
                  onCheckedChange={() => toggle(row.id)}
                  label={`Select ${row.name}`}
                />
              </TableCell>
              <TableCell>
                <TwoLine primary={row.name} secondary={row.meta} />
              </TableCell>
              <TableCell>
                <StatusPill tone={row.tone} label={row.status} />
              </TableCell>
              <TableCell>
                <Person name={row.owner} src={row.avatar} />
              </TableCell>
              <TableCell>{row.updated}</TableCell>
              <TableCell>
                <RowMenu />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SelectionBar count={selected.length} onClear={() => setSelected([])} />
    </div>
  );
}

const taskRows = [
  {
    id: '8782',
    title: 'Add export to CSV for audit log',
    kind: 'Feature',
    status: 'In progress',
    icon: 'schedule',
    priority: 'High',
    priorityIcon: 'arrow_upward',
  },
  {
    id: '8781',
    title: 'Fix pagination reset on filter change',
    kind: 'Bug',
    status: 'Todo',
    icon: 'circle',
    priority: 'Medium',
    priorityIcon: 'arrow_forward',
  },
  {
    id: '8779',
    title: 'Document row selection pattern',
    kind: 'Docs',
    status: 'Done',
    icon: 'check',
    priority: 'Low',
    priorityIcon: 'arrow_downward',
  },
  {
    id: '8776',
    title: 'Bulk status update from action bar',
    kind: 'Feature',
    status: 'In progress',
    icon: 'schedule',
    priority: 'High',
    priorityIcon: 'arrow_upward',
  },
  {
    id: '8770',
    title: 'Sort icon misaligned on wrapped headers',
    kind: 'Bug',
    status: 'Canceled',
    icon: 'cancel',
    priority: 'Medium',
    priorityIcon: 'arrow_forward',
  },
];

export function TableOrderedList() {
  const ids = taskRows.map(row => row.id);
  const { selected, setSelected, toggle, toggleAll } = useSelection(ids, [
    '8781',
    '8779',
  ]);

  return (
    <div className="flex flex-col gap-3">
      <Toolbar
        placeholder="Filter titles..."
        filters={['Status', 'In progress', 'Priority']}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>
              <SelectCell
                checked={
                  selected.length === ids.length
                    ? true
                    : selected.length > 0
                      ? 'indeterminate'
                      : false
                }
                onCheckedChange={() => toggleAll()}
                label="Select all"
              />
            </TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {taskRows.map(row => (
            <TableRow key={row.id} selected={selected.includes(row.id)}>
              <TableCell>
                <Icon
                  icon="drag_indicator"
                  size="sm"
                  className="text-fg-tertiary"
                />
              </TableCell>
              <TableCell>
                <SelectCell
                  checked={selected.includes(row.id)}
                  onCheckedChange={() => toggle(row.id)}
                  label={`Select ${row.id}`}
                />
              </TableCell>
              <TableCell>TASK-{row.id}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-2">
                  <Badge outline size="sm">
                    {row.kind}
                  </Badge>
                  {row.title}
                </span>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-2">
                  <Icon icon={row.icon} size="sm" />
                  {row.status}
                </span>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-2">
                  <Icon icon={row.priorityIcon} size="sm" />
                  {row.priority}
                </span>
              </TableCell>
              <TableCell>
                <RowMenu />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SelectionBar count={selected.length} onClear={() => setSelected([])} />
    </div>
  );
}

const credentialRows = [
  {
    id: 'ingest',
    name: 'Production ingest',
    meta: 'svc-ingest',
    key: 'sk-live-•••••••••3f9a',
    created: '02 Sep 2026',
    used: '2 hours ago',
    expires: '02 Mar 2027',
  },
  {
    id: 'staging',
    name: 'Staging pipelines',
    meta: 'svc-pipelines-stg',
    key: 'sk-test-•••••••••8c21',
    created: '15 Aug 2026',
    used: 'Yesterday',
    expires: '15 Feb 2027',
  },
  {
    id: 'analytics',
    name: 'Analytics read-only',
    meta: 'Rahul Shah',
    key: 'sk-live-•••••••••b7e0',
    created: '30 Jun 2026',
    used: '12 Oct 2026',
    expires: '30 Dec 2026',
  },
  {
    id: 'mcp',
    name: 'MCP server - docs',
    meta: 'mcp-docs',
    key: 'mcp-•••••••••04d1',
    created: '11 Apr 2026',
    used: '28 Sep 2026',
    expires: 'in 14 days',
    tone: 'warning' as Tone,
  },
  {
    id: 'legacy',
    name: 'Legacy export job',
    meta: 'Jonas Teller',
    key: 'sk-live-•••••••••9a5c',
    created: '03 Jan 2026',
    used: 'Never',
    expires: 'Expired',
    tone: 'error' as Tone,
  },
];

export function TableCredentials() {
  const ids = credentialRows.map(row => row.id);
  const { selected, setSelected, toggle, toggleAll } = useSelection(ids, [
    'staging',
    'analytics',
  ]);

  return (
    <div className="flex flex-col gap-3">
      <Toolbar
        placeholder="Filter keys..."
        filters={['Status', 'Active', 'Owner', 'Expires']}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <SelectCell
                checked={
                  selected.length === ids.length
                    ? true
                    : selected.length > 0
                      ? 'indeterminate'
                      : false
                }
                onCheckedChange={() => toggleAll()}
                label="Select all"
              />
            </TableHead>
            <TableHead selected>
              <SortLabel label="Name" dir="asc" />
            </TableHead>
            <TableHead>Key</TableHead>
            <TableHead>
              <SortLabel label="Created" dir="none" />
            </TableHead>
            <TableHead>
              <SortLabel label="Last used" dir="none" />
            </TableHead>
            <TableHead>
              <SortLabel label="Expires" dir="none" />
            </TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {credentialRows.map(row => (
            <TableRow key={row.id} selected={selected.includes(row.id)}>
              <TableCell>
                <SelectCell
                  checked={selected.includes(row.id)}
                  onCheckedChange={() => toggle(row.id)}
                  label={`Select ${row.name}`}
                />
              </TableCell>
              <TableCell>
                <TwoLine primary={row.name} secondary={row.meta} />
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-2">
                  {row.key}
                  <Button variant="ghost" size="icon-xxs" aria-label="Copy key">
                    <IconShell size="sm">
                      <Icon icon="content_copy" />
                    </IconShell>
                  </Button>
                </span>
              </TableCell>
              <TableCell>{row.created}</TableCell>
              <TableCell>{row.used}</TableCell>
              <TableCell>
                {row.tone ? (
                  <StatusPill tone={row.tone} label={row.expires} />
                ) : (
                  row.expires
                )}
              </TableCell>
              <TableCell>
                <RowMenu />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SelectionBar count={selected.length} onClear={() => setSelected([])} />
    </div>
  );
}

const usageRows = [
  [
    'triage',
    'Support triage agent',
    'agent/triage',
    '12,480',
    '48.2M',
    '3,912',
    '2',
    '$ 1,284.50',
    '5 min ago',
  ],
  [
    'invoices',
    'Invoice extraction',
    'workflow/invoices',
    '8,305',
    '21.7M',
    '1,206',
    '0',
    '$ 612.10',
    '1 hour ago',
  ],
  [
    'churn',
    'Churn analysis',
    'query/churn-weekly',
    '2,140',
    '6.4M',
    '388',
    '14',
    '$ 148.75',
    'Yesterday',
  ],
  [
    'docs',
    'Docs assistant',
    'agent/docs',
    '1,022',
    '3.1M',
    '944',
    '1',
    '$ 71.20',
    '09 Oct 2026',
  ],
  [
    'dq',
    'Data quality checks',
    'workflow/dq-nightly',
    '365',
    '0.9M',
    '0',
    '0',
    '$ 18.40',
    '07 Oct 2026',
  ],
] as const;

export function TableUsageMetrics() {
  const ids = usageRows.map(row => row[0]);
  const { selected, setSelected, toggle, toggleAll } = useSelection(ids, [
    'invoices',
    'churn',
  ]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Icon icon="filter_alt" size="sm" />
          Filter
        </Button>
        <Button variant="ghost" size="sm">
          <Icon icon="swap_vert" size="sm" />
          Sort
        </Button>
        <Button variant="outline" size="sm" className="ml-auto">
          <Icon icon="view_column" size="sm" />
          View
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <SelectCell
                checked={
                  selected.length === ids.length
                    ? true
                    : selected.length > 0
                      ? 'indeterminate'
                      : false
                }
                onCheckedChange={() => toggleAll()}
                label="Select all"
              />
            </TableHead>
            <TableHead selected>
              <SortLabel label="Name" dir="asc" />
            </TableHead>
            <TableHead align="end" selected>
              <SortLabel label="Runs" dir="desc" />
            </TableHead>
            <TableHead align="end">
              <SortLabel label="Tokens" dir="none" />
            </TableHead>
            <TableHead align="end">
              <SortLabel label="Sessions" dir="none" />
            </TableHead>
            <TableHead align="end">
              <SortLabel label="Errors" dir="none" />
            </TableHead>
            <TableHead align="end">
              <SortLabel label="Cost" dir="none" />
            </TableHead>
            <TableHead>
              <SortLabel label="Last run" dir="none" />
            </TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {usageRows.map(row => (
            <TableRow key={row[0]} selected={selected.includes(row[0])}>
              <TableCell>
                <SelectCell
                  checked={selected.includes(row[0])}
                  onCheckedChange={() => toggle(row[0])}
                  label={`Select ${row[1]}`}
                />
              </TableCell>
              <TableCell>
                <TwoLine primary={row[1]} secondary={row[2]} />
              </TableCell>
              <TableCell align="end">{row[3]}</TableCell>
              <TableCell align="end">{row[4]}</TableCell>
              <TableCell align="end">{row[5]}</TableCell>
              <TableCell align="end">{row[6]}</TableCell>
              <TableCell align="end">{row[7]}</TableCell>
              <TableCell>{row[8]}</TableCell>
              <TableCell>
                <RowMenu />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SelectionBar count={selected.length} onClear={() => setSelected([])} />
    </div>
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
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="label-regular-primary">Dataset schema</p>
        <p className="paragraph-small-primary text-fg-secondary">
          customer_profiles.parquet, 5 of 42 columns
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead selected>
              <SortLabel label="Column" dir="asc" />
            </TableHead>
            <TableHead>
              <SortLabel label="Type" dir="none" />
            </TableHead>
            <TableHead>Nullable</TableHead>
            <TableHead>Description</TableHead>
            <TableHead align="end">Example</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schemaRows.map(row => (
            <TableRow key={row[0]}>
              <TableCell>{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[2]}</TableCell>
              <TableCell>{row[3]}</TableCell>
              <TableCell align="end">{row[4]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const summaryRows: {
  team: string;
  cells: { value: string; delta: string; tone: 'up' | 'down' | 'flat' }[];
  updated: string;
}[] = [
  {
    team: 'Data science',
    updated: '5 min ago',
    cells: [
      { value: '1,284', delta: '+12.4%', tone: 'up' },
      { value: '48.2M', delta: '+9.7%', tone: 'up' },
      { value: '312.5', delta: '+6.3%', tone: 'up' },
      { value: '$4,820.10', delta: '+8.1%', tone: 'up' },
    ],
  },
  {
    team: 'Platform',
    updated: '2 hours ago',
    cells: [
      { value: '962', delta: '+3.1%', tone: 'up' },
      { value: '31.7M', delta: '+5.2%', tone: 'up' },
      { value: '208.0', delta: '−1.8%', tone: 'down' },
      { value: '$3,115.40', delta: '+2.4%', tone: 'up' },
    ],
  },
  {
    team: 'Analytics',
    updated: 'Yesterday',
    cells: [
      { value: '744', delta: '−4.8%', tone: 'down' },
      { value: '22.9M', delta: '−2.1%', tone: 'down' },
      { value: '141.2', delta: '−3.5%', tone: 'down' },
      { value: '$2,240.75', delta: '−3.9%', tone: 'down' },
    ],
  },
  {
    team: 'Risk',
    updated: '3 days ago',
    cells: [
      { value: '421', delta: '0.0%', tone: 'flat' },
      { value: '12.4M', delta: '+1.4%', tone: 'up' },
      { value: '88.6', delta: '0.0%', tone: 'flat' },
      { value: '$1,302.20', delta: '+0.6%', tone: 'up' },
    ],
  },
  {
    team: 'Marketing',
    updated: '12 Sep 2026',
    cells: [
      { value: '198', delta: '−18.2%', tone: 'down' },
      { value: '5.1M', delta: '−11.0%', tone: 'down' },
      { value: '32.4', delta: '−9.4%', tone: 'down' },
      { value: '$514.90', delta: '−14.7%', tone: 'down' },
    ],
  },
];

function CompareHead({
  label,
  dir,
}: {
  label: string;
  dir?: 'asc' | 'desc' | 'none';
}) {
  return (
    <span className="inline-flex flex-col items-end">
      <SortLabel label={label} dir={dir} />
      <span className="text-fg-secondary normal-case">vs Aug</span>
    </span>
  );
}

export function TableUsageSummary() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="label-regular-primary">Compute usage by team</p>
        <p className="paragraph-small-primary text-fg-secondary">
          1 to 30 Sep 2026
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <SortLabel label="Team" dir="none" />
            </TableHead>
            <TableHead align="end" selected>
              <CompareHead label="Runs" dir="desc" />
            </TableHead>
            <TableHead align="end">
              <CompareHead label="Tokens" />
            </TableHead>
            <TableHead align="end">
              <CompareHead label="Compute hours" />
            </TableHead>
            <TableHead align="end">
              <CompareHead label="Cost" dir="none" />
            </TableHead>
            <TableHead>
              <SortLabel label="Last updated" dir="none" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {summaryRows.map(row => (
            <TableRow key={row.team}>
              <TableCell>{row.team}</TableCell>
              {row.cells.map(cell => (
                <TableCell key={cell.value} align="end">
                  <Trend
                    value={cell.value}
                    delta={cell.delta}
                    tone={cell.tone}
                  />
                </TableCell>
              ))}
              <TableCell>{row.updated}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell align="end">
              <Trend value="3,609" delta="+4.6%" tone="up" />
            </TableCell>
            <TableCell align="end">
              <Trend value="120.3M" delta="+5.3%" tone="up" />
            </TableCell>
            <TableCell align="end">
              <Trend value="782.7" delta="+1.2%" tone="up" />
            </TableCell>
            <TableCell align="end">
              <Trend value="$11,993.35" delta="+3.6%" tone="up" />
            </TableCell>
            <TableCell>—</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

const roadmap = [
  {
    name: 'Disintermediate strategic channels',
    meta: 'Disintermediate end-to-end web services',
    src: 'avatar-1.jpg',
    start: 'Aug 28, 2026',
    end: 'Jan 24, 2027',
    release: 'Mesh impactful mindshare',
  },
  {
    name: 'Gamify innovative systems',
    meta: 'Drive scalable mindshare',
    initials: 'RA',
    start: 'Sep 3, 2026',
    end: 'Dec 2, 2026',
    release: 'Grow world-class communities',
  },
  {
    name: 'Strategize generative AI',
    meta: 'Empower innovative technologies',
    src: 'avatar-3.jpg',
    start: 'Oct 3, 2026',
    end: 'Oct 30, 2026',
    release: 'Revolutionize impactful large language models',
  },
  {
    name: 'Integrate dynamic lifetime value',
    meta: 'Utilize smart metrics',
    initials: 'MA',
    start: 'Jun 19, 2026',
    end: 'Mar 18, 2027',
    release: 'Cultivate frictionless networks',
  },
  {
    name: 'Visualize back-end mindshare',
    meta: 'Productize dynamic metrics',
    src: 'avatar-5.jpg',
    start: 'Jul 22, 2026',
    end: 'Jan 29, 2027',
    release: 'Transition robust schemas to collaborative front-end content',
  },
];

export function TableRoadmap() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="label-regular-primary">Product roadmap</p>
        <p className="paragraph-small-primary text-fg-secondary">
          Features by owner, 5 of 20 shown
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead selected>
              <SortLabel label="Name" dir="asc" />
            </TableHead>
            <TableHead>
              <SortLabel label="Start at" dir="none" />
            </TableHead>
            <TableHead>
              <SortLabel label="End at" dir="none" />
            </TableHead>
            <TableHead>Release</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roadmap.map(row => (
            <TableRow key={row.name}>
              <TableCell>
                <span className="inline-flex items-center gap-2">
                  <Avatar size="xs">
                    {row.src ? (
                      <AvatarImage src={`${basePath}/users/${row.src}`} />
                    ) : null}
                    <AvatarFallback>{row.initials}</AvatarFallback>
                  </Avatar>
                  <TwoLine primary={row.name} secondary={row.meta} />
                </span>
              </TableCell>
              <TableCell>{row.start}</TableCell>
              <TableCell>{row.end}</TableCell>
              <TableCell>{row.release}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const treeRows: {
  id: string;
  depth: number;
  open?: boolean;
  label: string;
  meta?: string;
  type?: string;
  completeness?: string;
  uniqueness?: string;
  regex?: { value: string; tone: Tone } | string;
  anomaly?: string;
}[] = [
  {
    id: 'core',
    depth: 0,
    open: true,
    label: 'Core Banking Data',
    meta: '8 datasets · updated 14d ago',
    completeness: '—',
    uniqueness: '—',
    regex: { value: '78%', tone: 'warning' },
    anomaly: '—',
  },
  {
    id: 'accounts',
    depth: 1,
    open: true,
    label: 'accounts.parquet',
    meta: 'Contains detailed information about individual bank accounts',
    completeness: '—',
    uniqueness: '—',
    regex: { value: '85%', tone: 'warning' },
    anomaly: '—',
  },
  {
    id: 'account-id',
    depth: 2,
    label: 'account_id',
    meta: 'Unique surrogate identifier for a bank account',
    type: 'str',
    completeness: '999.99',
    uniqueness: '999.99',
    regex: '999.99',
    anomaly: '999.99',
  },
  {
    id: 'balance',
    depth: 2,
    label: 'available_balance',
    meta: 'Balance available for withdrawal after holds',
    type: 'num',
    completeness: '99.1%',
    uniqueness: '—',
    regex: { value: '97%', tone: 'success' },
    anomaly: '—',
  },
  {
    id: 'bill',
    depth: 2,
    label: 'bill_pay',
    meta: 'Flag indicating whether online bill payment is active',
    type: 'bool',
    completeness: '100%',
    uniqueness: '—',
    regex: { value: '67%', tone: 'warning' },
    anomaly: '2',
  },
  {
    id: 'ref',
    depth: 2,
    label: 'core_ref',
    meta: 'Internal core banking system reference number',
    type: 'str',
    completeness: '96.4%',
    uniqueness: '99.8%',
    regex: { value: '6%', tone: 'error' },
    anomaly: '14',
  },
  {
    id: 'currency',
    depth: 2,
    label: 'currency',
    meta: 'ISO 4217 three-letter currency code (e.g. USD, EUR)',
    type: 'str',
    completeness: '100%',
    uniqueness: '—',
    regex: { value: '100%', tone: 'success' },
    anomaly: '—',
  },
  {
    id: 'branches',
    depth: 1,
    label: 'branches.csv',
    meta: 'Contains information about bank branches, including location',
    completeness: '—',
    uniqueness: '—',
    regex: { value: '77%', tone: 'warning' },
    anomaly: '—',
  },
  {
    id: 'cards',
    depth: 1,
    label: 'cards_statements.xml',
    meta: 'Contains detailed information on card portfolios',
    completeness: '—',
    uniqueness: '—',
    regex: '—',
    anomaly: '—',
  },
  {
    id: 'loans',
    depth: 1,
    label: 'loans_portfolio.xml',
    meta: 'Contains detailed records of loans, including terms',
    completeness: '—',
    uniqueness: '—',
    regex: { value: '83%', tone: 'warning' },
    anomaly: '—',
  },
  {
    id: 'products',
    depth: 1,
    label: 'products.csv',
    meta: 'Contains information about banking products offered',
    completeness: '—',
    uniqueness: '—',
    regex: { value: '64%', tone: 'error' },
    anomaly: '—',
  },
];

function RegexCell({ value }: { value: (typeof treeRows)[number]['regex'] }) {
  if (!value) {
    return '—';
  }

  if (typeof value === 'string') {
    return value;
  }

  return (
    <span className="inline-flex items-center justify-end gap-2">
      <StatusBadge variant={value.tone} size="sm" />
      {value.value}
    </span>
  );
}

export function TableDataReadiness() {
  return (
    <div className="flex flex-col gap-3">
      <Toolbar placeholder="Search sources, datasets, attributes..." />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Source / dataset / attribute</TableHead>
            <TableHead align="end">Completeness</TableHead>
            <TableHead align="end">Uniqueness</TableHead>
            <TableHead align="end">Regex</TableHead>
            <TableHead align="end">Anomaly</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {treeRows.map(row => (
            <TableRow key={row.id}>
              <TableCell>
                <span
                  className="inline-flex items-center gap-2"
                  style={{ paddingLeft: row.depth * 16 }}>
                  {row.depth < 2 ? (
                    <Icon
                      icon={row.open ? 'expand_more' : 'chevron_right'}
                      size="sm"
                    />
                  ) : (
                    <Badge size="sm" variant="alternative">
                      {row.type}
                    </Badge>
                  )}
                  <span className={row.depth < 2 ? 'font-medium' : undefined}>
                    {row.label}
                  </span>
                  {row.meta ? (
                    <span className="paragraph-small-primary text-fg-secondary truncate">
                      {row.meta}
                    </span>
                  ) : null}
                </span>
              </TableCell>
              <TableCell align="end">{row.completeness}</TableCell>
              <TableCell align="end">{row.uniqueness}</TableCell>
              <TableCell align="end">
                <RegexCell value={row.regex} />
              </TableCell>
              <TableCell align="end">{row.anomaly}</TableCell>
              <TableCell>{row.depth === 0 ? <RowMenu /> : null}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
