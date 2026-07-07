import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

const componentName = 'context-menu';

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
  function BasicMenu({ size }: { size?: 'default' | 'lg' }) {
    return (
      <ContextMenu>
        <ContextMenuTrigger>Target</ContextMenuTrigger>
        <ContextMenuContent size={size}>
          <ContextMenuItem>Profile</ContextMenuItem>
          <ContextMenuItem disabled>Billing</ContextMenuItem>
          <ContextMenuItem inset>Settings</ContextMenuItem>
          <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  }

  it('renders the trigger', () => {
    render(<BasicMenu />);
    expect(screen.getByText('Target')).toBeInTheDocument();
  });

  it('content is not visible before right-click', () => {
    render(<BasicMenu />);
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  it('opens with menu role after right-click', async () => {
    const user = userEvent.setup();

    render(<BasicMenu />);
    await user.pointer({
      keys: '[MouseRight]',
      target: screen.getByText('Target'),
    });

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('items have role="menuitem"', async () => {
    const user = userEvent.setup();

    render(<BasicMenu />);
    await user.pointer({
      keys: '[MouseRight]',
      target: screen.getByText('Target'),
    });

    expect(
      screen.getByRole('menuitem', { name: 'Profile' }),
    ).toBeInTheDocument();
  });

  it('default content carries data-size="default"', async () => {
    const user = userEvent.setup();

    render(<BasicMenu />);
    await user.pointer({
      keys: '[MouseRight]',
      target: screen.getByText('Target'),
    });

    expect(screen.getByRole('menu')).toHaveAttribute('data-size', 'default');
  });

  it('size="lg" propagates to content and items', async () => {
    const user = userEvent.setup();

    render(<BasicMenu size="lg" />);
    await user.pointer({
      keys: '[MouseRight]',
      target: screen.getByText('Target'),
    });

    expect(screen.getByRole('menu')).toHaveAttribute('data-size', 'lg');
    expect(screen.getByRole('menuitem', { name: 'Profile' })).toHaveAttribute(
      'data-size',
      'lg',
    );
  });

  it('inset items carry data-inset="true"', async () => {
    const user = userEvent.setup();

    render(<BasicMenu />);
    await user.pointer({
      keys: '[MouseRight]',
      target: screen.getByText('Target'),
    });

    expect(screen.getByRole('menuitem', { name: 'Settings' })).toHaveAttribute(
      'data-inset',
      'true',
    );
  });

  it('destructive items carry data-variant="destructive"', async () => {
    const user = userEvent.setup();

    render(<BasicMenu />);
    await user.pointer({
      keys: '[MouseRight]',
      target: screen.getByText('Target'),
    });

    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveAttribute(
      'data-variant',
      'destructive',
    );
  });

  it('disabled items expose aria-disabled', async () => {
    const user = userEvent.setup();

    render(<BasicMenu />);
    await user.pointer({
      keys: '[MouseRight]',
      target: screen.getByText('Target'),
    });

    expect(screen.getByRole('menuitem', { name: 'Billing' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });
});
