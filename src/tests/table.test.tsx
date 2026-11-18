import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  TableOrderedList,
  TableSimpleList,
} from '@/app/demo/[name]/ui/table-selection';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const componentName = 'table';

afterEach(() => {
  cleanup();
});

describe.each(['table', 'data-table'])('%s — all examples render', name => {
  it.each(Object.entries(exampleComponentMaps[name]))(
    'renders "%s" without crashing',
    (_, Example) => {
      expect(() =>
        render(
          <Renderer>
            <Example />
          </Renderer>,
        ),
      ).not.toThrow();
    },
  );
});

describe(`${componentName} — structure`, () => {
  it('renders column headers', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByText('Invoice')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders data rows', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>$100</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>$200</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
  });

  it('renders data-slot attributes on table parts', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>H</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>D</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(document.querySelector('[data-slot="table"]')).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="table-header"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="table-body"]'),
    ).toBeInTheDocument();
  });

  it('sets density and row state attributes', () => {
    render(
      <Table density="comfortable">
        <TableBody>
          <TableRow selected disabled>
            <TableCell>Row</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(
      document.querySelector('[data-density="comfortable"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-readonly="true"]'),
    ).not.toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="table-row"][data-state="selected"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="table-row"][data-disabled]'),
    ).toBeInTheDocument();
  });

  it('marks a read-only table', () => {
    render(
      <Table readOnly>
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
            <TableCell>B</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(document.querySelector('[data-readonly]')).toBeInTheDocument();
  });
});

describe('simple list', () => {
  const names = () =>
    screen
      .getAllByRole('row')
      .slice(1)
      .map(row => row.textContent ?? '');

  it('sorts from the headers and the toolbar, and filters the search', () => {
    render(<TableSimpleList />);

    expect(names()[0]).toContain('Adipiscing elit sed');
    expect(screen.getAllByText('more_vert')).toHaveLength(5);

    fireEvent.click(screen.getByRole('button', { name: /Updated/ }));
    expect(names()[0]).toContain('30 Sep 2026');

    fireEvent.click(screen.getByRole('button', { name: /Sort$/ }));
    expect(names()[0]).toContain('12 Oct 2026');

    fireEvent.change(screen.getByRole('textbox', { name: 'Filter rows' }), {
      target: { value: 'magna' },
    });
    expect(screen.getByText('Magna Aliqua')).toBeInTheDocument();
    expect(screen.queryByText('Lorem Ipsum')).not.toBeInTheDocument();
  });

  it('hides every column after the first from View', () => {
    render(<TableSimpleList />);

    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));
    fireEvent.click(screen.getByRole('menuitemcheckbox', { name: 'Status' }));
    fireEvent.click(screen.getByRole('menuitemcheckbox', { name: 'Owner' }));

    expect(
      screen.queryByRole('button', { name: 'Status' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Owner' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Resource' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('menuitemcheckbox', { name: 'Resource' }),
    ).not.toBeInTheDocument();
  });
});

describe('draggable rows', () => {
  it('reorders a row when the handle is dragged', () => {
    render(<TableOrderedList />);
    const order = () =>
      screen
        .getAllByRole('row')
        .slice(1)
        .map(row => row.textContent ?? '');

    expect(order()[0]).toContain('Lorem');
    expect(
      screen.queryByRole('button', { name: 'Status' }),
    ).not.toBeInTheDocument();

    const body = screen.getAllByRole('row').slice(1);

    body.forEach((row, index) => {
      vi.spyOn(row, 'getBoundingClientRect').mockReturnValue({
        top: index * 50,
        bottom: index * 50 + 50,
        left: 0,
        right: 200,
        width: 200,
        height: 50,
        x: 0,
        y: index * 50,
        toJSON: () => ({}),
      });
    });

    const handle = screen.getByRole('button', { name: 'Drag Lorem' });

    fireEvent.mouseDown(handle, { button: 0, clientX: 12, clientY: 20 });
    fireEvent.mouseMove(document, { button: 0, clientX: 12, clientY: 140 });
    fireEvent.mouseUp(document, { button: 0, clientX: 12, clientY: 140 });

    expect(order()[0]).toContain('Ipsum');
    expect(order()[2]).toContain('Lorem');
  });
});
