import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const componentName = 'dropdown-menu';

afterEach(() => {
  cleanup();
});

describe(`${componentName} — all examples render`, () => {
  it.each(Object.entries(exampleComponentMaps[componentName]))(
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

describe(`${componentName} — behaviour`, () => {
  function BasicMenu({ size }: { size?: 'reg' | 'lg' }) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent size={size}>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem disabled>Billing</DropdownMenuItem>
          <DropdownMenuItem inset>Settings</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  it('renders the trigger', () => {
    render(<BasicMenu />);
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
  });

  it('content is not visible before trigger click', () => {
    render(<BasicMenu />);
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  it('opens with menu role after trigger click', async () => {
    const user = userEvent.setup();

    render(<BasicMenu />);
    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('items have role="menuitem"', async () => {
    const user = userEvent.setup();

    render(<BasicMenu />);
    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(
      screen.getByRole('menuitem', { name: 'Profile' }),
    ).toBeInTheDocument();
  });

  it('default content carries data-size="reg"', async () => {
    const user = userEvent.setup();

    render(<BasicMenu />);
    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(screen.getByRole('menu')).toHaveAttribute('data-size', 'reg');
  });

  it('size="lg" propagates to content and items', async () => {
    const user = userEvent.setup();

    render(<BasicMenu size="lg" />);
    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(screen.getByRole('menu')).toHaveAttribute('data-size', 'lg');
    expect(screen.getByRole('menuitem', { name: 'Profile' })).toHaveAttribute(
      'data-size',
      'lg',
    );
  });

  it('inset items carry data-inset="true"', async () => {
    const user = userEvent.setup();

    render(<BasicMenu />);
    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(screen.getByRole('menuitem', { name: 'Settings' })).toHaveAttribute(
      'data-inset',
      'true',
    );
  });

  it('destructive items carry data-variant="destructive"', async () => {
    const user = userEvent.setup();

    render(<BasicMenu />);
    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveAttribute(
      'data-variant',
      'destructive',
    );
  });

  it('disabled items expose aria-disabled', async () => {
    const user = userEvent.setup();

    render(<BasicMenu />);
    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(screen.getByRole('menuitem', { name: 'Billing' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });
});
