'use client';

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge, StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const basePath = import.meta.env.VITE_BASE_PATH ?? '';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
    avatars: ['avatar-1.jpg', 'avatar-2.jpg', 'avatar-3.jpg'],
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
    avatars: ['avatar-4.jpg', 'avatar-5.jpg'],
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
    avatars: ['avatar-6.jpg', 'avatar-7.jpg', 'avatar-1.jpg', 'avatar-2.jpg'],
  },
];

const users = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    role: 'Admin',
    status: 'success' as const,
    avatar: `${basePath}/users/avatar-1.jpg`,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'Editor',
    status: 'success' as const,
    avatar: `${basePath}/users/avatar-2.jpg`,
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike@example.com',
    role: 'Viewer',
    status: 'warning' as const,
    avatar: `${basePath}/users/avatar-3.jpg`,
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'Editor',
    status: 'neutral' as const,
    avatar: `${basePath}/users/avatar-7.jpg`,
  },
];

const getUserStatusLabel = (status: string) => {
  switch (status) {
    case 'success':
      return 'Active';
    case 'warning':
      return 'Away';
    default:
      return 'Offline';
  }
};

const rows = [
  {
    primary:
      'Primary text that wraps onto a second or third line when the variant allows it',
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

export function TableDefault() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox aria-label="Select all" />
          </TableHead>
          <TableHead>Header</TableHead>
          <TableHead align="end">Header</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.value}>
            <TableCell>
              <Checkbox aria-label="Select row" />
            </TableCell>
            <TableCell>{row.primary}</TableCell>
            <TableCell align="end">{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function TableDensity() {
  const densities = ['default', 'comfortable'] as const;

  return (
    <div className="space-y-8">
      {densities.map(density => (
        <div key={density} className="space-y-2">
          <p className="text-fg-secondary label-small-primary">{density}</p>
          <Table density={density}>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead align="end">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(invoice => (
                <TableRow key={invoice.invoice}>
                  <TableCell>{invoice.invoice}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell align="end">{invoice.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
}

export function TableRowStates() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox aria-label="Select all" />
          </TableHead>
          <TableHead>Header</TableHead>
          <TableHead align="end">Header</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Checkbox aria-label="Default row" />
          </TableCell>
          <TableCell>{rows[0].primary}</TableCell>
          <TableCell align="end">{rows[0].value}</TableCell>
        </TableRow>
        <TableRow selected>
          <TableCell>
            <Checkbox aria-label="Selected row" checked />
          </TableCell>
          <TableCell>{rows[1].primary}</TableCell>
          <TableCell align="end">{rows[1].value}</TableCell>
        </TableRow>
        <TableRow disabled>
          <TableCell>
            <Checkbox aria-label="Disabled row" disabled />
          </TableCell>
          <TableCell>{rows[2].primary}</TableCell>
          <TableCell align="end">{rows[2].value}</TableCell>
        </TableRow>
        <TableRow data-state="dragging">
          <TableCell>
            <Checkbox aria-label="Dragging row" />
          </TableCell>
          <TableCell>{rows[0].primary}</TableCell>
          <TableCell align="end">{rows[0].value}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function TableRich() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id],
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead align="end">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.id} selected={selectedRows.includes(user.id)}>
            <TableCell>
              <Checkbox
                checked={selectedRows.includes(user.id)}
                onCheckedChange={() => toggleRow(user.id)}
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar size="sm">
                    {user.avatar && <AvatarImage src={user.avatar} />}
                    <AvatarFallback>
                      {user.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <StatusBadge
                    variant={user.status}
                    size="sm"
                    className="absolute -right-0.5 -bottom-0.5"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="paragraph-regular-primary">{user.name}</span>
                  <span className="text-fg-secondary label-small-primary">
                    {user.email}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="high-emphasis">{user.role}</Badge>
            </TableCell>
            <TableCell>
              <Badge outline variant="high-emphasis">
                {getUserStatusLabel(user.status)}
              </Badge>
            </TableCell>
            <TableCell align="end">
              <div className="flex items-center justify-end gap-1">
                <Button variant="ghost" size="icon-xxs" aria-label="Edit row">
                  <IconShell size="sm">
                    <Icon icon="edit" />
                  </IconShell>
                </Button>
                <Button variant="ghost" size="icon-xxs" aria-label="Delete row">
                  <IconShell size="sm">
                    <Icon icon="delete" />
                  </IconShell>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
  priority: 'low' | 'medium' | 'high';
};

const payments: Payment[] = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'ken99@example.com',
    priority: 'high',
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'success',
    email: 'Abe45@example.com',
    priority: 'medium',
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@example.com',
    priority: 'low',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'Silas22@example.com',
    priority: 'high',
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@example.com',
    priority: 'medium',
  },
];

const getPaymentColumns = (
  updateData: (newData: Payment[]) => void,
  currentData: Payment[],
): ColumnDef<Payment>[] => [
  {
    id: 'select',
    header: ({ table: t }) => (
      <Checkbox
        checked={
          t.getIsAllPageRowsSelected() ||
          (t.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => t.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();
      const isSorted = sortDirection !== false;

      let sortIcon = 'swap_vert';

      if (sortDirection === 'asc') {
        sortIcon = 'arrow_upward_alt';
      } else if (sortDirection === 'desc') {
        sortIcon = 'arrow_downward_alt';
      }

      let nextSortDirection = 'ascending';

      if (sortDirection === 'asc') {
        nextSortDirection = 'descending';
      }

      return (
        <button
          type="button"
          className="font-inherit flex cursor-pointer items-center gap-0.5 border-0 bg-transparent p-0 text-inherit"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          aria-label={`Sort by Email ${nextSortDirection}`}>
          Email
          <IconShell size="sm" variant={isSorted ? 'primary' : 'secondary'}>
            <Icon icon={sortIcon} />
          </IconShell>
        </button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as Payment['status'];

      return <Badge variant="high-emphasis">{status}</Badge>;
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const payment = row.original;
      const currentPriority =
        (row.getValue('priority') as Payment['priority']) || 'medium';

      const updatePriority = (newPriority: Payment['priority']) => {
        const updatedData = currentData.map((item: Payment) =>
          item.id === payment.id ? { ...item, priority: newPriority } : item,
        );
        updateData(updatedData);
      };

      return (
        <Select
          value={currentPriority}
          onValueChange={value => updatePriority(value as Payment['priority'])}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'));

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

export function DataTableDemo() {
  const [data, setData] = React.useState<Payment[]>(payments);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo(() => getPaymentColumns(setData, data), [data]);

  const dataTable = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          {dataTable.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const isSorted = header.column.getIsSorted() !== false;
                return (
                  <TableHead key={header.id} selected={isSorted}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {dataTable.getRowModel().rows?.length ? (
            dataTable.getRowModel().rows.map(row => (
              <TableRow key={row.id} selected={row.getIsSelected()}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export const examples = [
  {
    name: 'TableDefault',
    title: 'Default',
    description: 'Select, text, and numeric columns matching the Figma table.',
  },
  {
    name: 'TableDensity',
    title: 'Density',
    description: 'Default (compact) and comfortable cell padding.',
  },
  {
    name: 'TableRowStates',
    title: 'Row states',
    description: 'Default, selected, disabled, and dragging rows.',
  },
  {
    name: 'TableRich',
    title: 'Rich content',
    description:
      'Avatar, Badge, Checkbox, and Button composed in a user table.',
  },
  {
    name: 'DataTableDemo',
    title: 'Data table',
    description:
      'Sorting, filtering, pagination, and row selection with TanStack Table.',
  },
];

export const dataTableExamples = [
  {
    name: 'DataTableDemo',
    title: 'Default',
    description:
      'Data table with sorting, filtering, pagination, and row selection.',
  },
];

export const table = {
  name: 'table',
  components: {
    Default: <TableDefault />,
    Density: <TableDensity />,
    'Row states': <TableRowStates />,
    'Rich content': <TableRich />,
    'Data Table': <DataTableDemo />,
  },
};

export const dataTable = {
  name: 'data-table',
  components: {
    Default: <DataTableDemo />,
  },
};
