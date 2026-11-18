'use client';

import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  type Modifier,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { type ReactNode, useState } from 'react';

import {
  Lines,
  Person,
  RowMenu,
  SelectCell,
  SelectHead,
  ShowCell,
  SortHead,
  StatusLabel,
  Toolbar,
  avatarSrc,
  useColumnView,
  useDataTable,
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

const simpleColumns = [
  { id: 'resource', label: 'Resource', index: 0 },
  { id: 'status', label: 'Status', index: 2 },
  { id: 'owner', label: 'Owner', index: 3 },
  { id: 'updated', label: 'Updated', index: 4, sort: 'date' as const },
];

export function TableSimpleList() {
  const list = useDataTable(simpleRows, simpleColumns, 'resource');
  const view = useColumnView(simpleColumns);
  const ids = list.rows.map(item => item.row[0]);
  const pick = useSelection(ids);
  const all = ids.length > 0 && ids.every(id => pick.has(id));
  const some = ids.some(id => pick.has(id)) && !all;

  return (
    <div className="flex w-full flex-col gap-4">
      <Toolbar
        columns={simpleColumns}
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
              label="Select all resources"
              onCheckedChange={pick.toggleAll}
            />
            {simpleColumns
              .filter(column => view.on(column.id))
              .map(column => (
                <SortHead
                  key={column.id}
                  dir={list.dir(column.id)}
                  label={column.label}
                  onSort={() => list.toggle(column.id)}
                />
              ))}
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.rows.map(({ row, index }) => (
            <TableRow key={row[0]} selected={pick.has(row[0])}>
              <SelectCell
                checked={pick.has(row[0])}
                label={`Select ${row[0]}`}
                onCheckedChange={on => pick.toggle(row[0], on)}
              />
              <TableCell>
                <Lines primary={row[0]} secondary={row[1]} />
              </TableCell>
              <ShowCell on={view.on('status')}>
                <StatusLabel label={row[2]} />
              </ShowCell>
              <ShowCell on={view.on('owner')}>
                <Person name={row[3]} src={avatarSrc(index)} />
              </ShowCell>
              <ShowCell on={view.on('updated')}>{row[4]}</ShowCell>
              <RowMenu icon="more_vert" label={`Actions for ${row[0]}`} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const orderedRows = [
  ['Lorem', 'Ipsum dolor sit amet'],
  ['Ipsum', 'Consectetur adipiscing elit'],
  ['Dolor', 'Sed do eiusmod tempor'],
  ['Sit', 'Incididunt ut labore et dolore'],
  ['Amet', 'Ut enim ad minim veniam'],
];

const orderedColumns = [
  { id: 'task', label: 'Task', index: 0 },
  { id: 'title', label: 'Title', index: 1 },
];

const vertical: Modifier = ({ transform }) => ({ ...transform, x: 0 });

function DragRow({
  id,
  selected,
  children,
}: {
  id: string;
  selected: boolean;
  children: ReactNode;
}) {
  const {
    attributes,
    isDragging,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  return (
    <TableRow
      ref={setNodeRef}
      data-state={isDragging ? 'dragging' : undefined}
      selected={selected}
      style={{
        transform: transform
          ? `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0)`
          : undefined,
        transition,
      }}>
      <TableCell className="w-9">
        <button
          ref={setActivatorNodeRef}
          className="inline-flex cursor-grab touch-none border-0 bg-transparent p-0 active:cursor-grabbing"
          type="button"
          {...attributes}
          {...listeners}
          aria-label={`Drag ${id}`}>
          <IconShell size="sm" variant="secondary">
            <Icon icon="drag_indicator" />
          </IconShell>
        </button>
      </TableCell>
      {children}
    </TableRow>
  );
}

export function TableOrderedList() {
  const [rows, setRows] = useState(orderedRows);
  const list = useDataTable(rows, orderedColumns);
  const view = useColumnView(orderedColumns);
  const ids = list.rows.map(item => item.row[0]);
  const pick = useSelection(ids);
  const all = ids.length > 0 && ids.every(id => pick.has(id));
  const some = ids.some(id => pick.has(id)) && !all;

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const visible = list.rows.map(item => item.row);
    const hidden = rows.filter(
      row => !visible.some(item => item[0] === row[0]),
    );
    const oldIndex = visible.findIndex(row => row[0] === active.id);
    const newIndex = visible.findIndex(row => row[0] === over.id);

    if (oldIndex < 0 || newIndex < 0) {
      return;
    }

    setRows([...arrayMove(visible, oldIndex, newIndex), ...hidden]);
    list.clearSort();
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <Toolbar
        columns={orderedColumns}
        onColumn={view.on}
        query={list.query}
        onQueryChange={list.setQuery}
        onSort={list.sortCurrent}
        setColumn={view.set}
      />
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[vertical]}
        sensors={sensors}
        onDragEnd={onDragEnd}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-9" />
              <SelectHead
                checked={all ? true : some ? 'indeterminate' : false}
                label="Select all tasks"
                onCheckedChange={pick.toggleAll}
              />
              {orderedColumns
                .filter(column => view.on(column.id))
                .map(column => (
                  <SortHead
                    key={column.id}
                    dir={list.dir(column.id)}
                    label={column.label}
                    onSort={() => list.toggle(column.id)}
                  />
                ))}
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
              {list.rows.map(({ row }) => (
                <DragRow key={row[0]} id={row[0]} selected={pick.has(row[0])}>
                  <SelectCell
                    checked={pick.has(row[0])}
                    label={`Select ${row[0]}`}
                    onCheckedChange={on => pick.toggle(row[0], on)}
                  />
                  <TableCell>{row[0]}</TableCell>
                  <ShowCell on={view.on('title')}>{row[1]}</ShowCell>
                  <RowMenu label={`Actions for ${row[0]}`} />
                </DragRow>
              ))}
            </SortableContext>
          </TableBody>
        </Table>
      </DndContext>
    </div>
  );
}
