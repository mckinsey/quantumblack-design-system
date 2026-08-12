import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarLink,
  ToolbarSeparator,
} from '@/components/ui/toolbar';

const componentName = 'toolbar';

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

describe(`${componentName} — structure & interaction`, () => {
  it('renders with toolbar role', () => {
    render(
      <Toolbar aria-label="Editor tools">
        <ToolbarButton aria-label="Action">
          <IconShell size="sm">
            <Icon icon="crop_free" />
          </IconShell>
        </ToolbarButton>
      </Toolbar>,
    );

    expect(
      screen.getByRole('toolbar', { name: 'Editor tools' }),
    ).toBeInTheDocument();
  });

  it('applies boxed and variant data attributes when boxed', () => {
    render(
      <Toolbar aria-label="Tools" boxed shape="square" size="lg">
        <ToolbarButton aria-label="Action">
          <IconShell size="sm">
            <Icon icon="crop_free" />
          </IconShell>
        </ToolbarButton>
      </Toolbar>,
    );

    const toolbar = screen.getByRole('toolbar', { name: 'Tools' });
    expect(toolbar).toHaveAttribute('data-boxed', 'true');
    expect(toolbar).toHaveAttribute('data-shape', 'square');
    expect(toolbar).toHaveAttribute('data-size', 'lg');
    expect(toolbar).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('sets data-boxed to false when unboxed', () => {
    render(
      <Toolbar aria-label="Tools">
        <ToolbarButton aria-label="Action">
          <IconShell size="sm">
            <Icon icon="crop_free" />
          </IconShell>
        </ToolbarButton>
      </Toolbar>,
    );

    expect(screen.getByRole('toolbar', { name: 'Tools' })).toHaveAttribute(
      'data-boxed',
      'false',
    );
  });

  it('renders a separator between groups', () => {
    render(
      <Toolbar aria-label="Tools">
        <ToolbarButton aria-label="First">
          <IconShell size="sm">
            <Icon icon="crop_free" />
          </IconShell>
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton aria-label="Second">
          <IconShell size="sm">
            <Icon icon="crop_free" />
          </IconShell>
        </ToolbarButton>
      </Toolbar>,
    );

    expect(
      document.querySelector('[data-slot="toolbar-separator"]'),
    ).toBeInTheDocument();
  });

  it('activates a toggle item when clicked', async () => {
    const user = userEvent.setup();

    render(
      <Toolbar aria-label="Tools">
        <ToolbarGroup
          render={<ToggleGroup defaultValue={['a']} />}
          aria-label="Tools group">
          <ToolbarButton
            aria-label="Tool A"
            render={<ToggleGroupItem value="a" />}
            value="a">
            <IconShell size="sm">
              <Icon icon="crop_free" />
            </IconShell>
          </ToolbarButton>
          <ToolbarButton
            aria-label="Tool B"
            render={<ToggleGroupItem value="b" />}
            value="b">
            <IconShell size="sm">
              <Icon icon="crop_free" />
            </IconShell>
          </ToolbarButton>
        </ToolbarGroup>
      </Toolbar>,
    );

    expect(screen.getByRole('button', { name: 'Tool A' })).toHaveAttribute(
      'data-pressed',
    );

    await user.click(screen.getByRole('button', { name: 'Tool B' }));

    expect(screen.getByRole('button', { name: 'Tool B' })).toHaveAttribute(
      'data-pressed',
    );
    expect(screen.getByRole('button', { name: 'Tool A' })).not.toHaveAttribute(
      'data-pressed',
    );
  });

  it('moves roving focus to dropdown trigger with arrow keys', async () => {
    const user = userEvent.setup();

    render(
      <Toolbar aria-label="Tools">
        <ToolbarButton aria-label="First tool">
          <IconShell size="sm">
            <Icon icon="crop_free" />
          </IconShell>
        </ToolbarButton>
        <DropdownMenu>
          <ToolbarButton
            aria-label="Open menu"
            render={<DropdownMenuTrigger />}>
            Menu
          </ToolbarButton>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Toolbar>,
    );

    const firstTool = screen.getByRole('button', { name: 'First tool' });
    const menuTrigger = screen.getByRole('button', { name: 'Open menu' });

    await user.click(firstTool);
    expect(firstTool).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(menuTrigger).toHaveFocus();
  });

  it('fires onClick for toolbar buttons', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Toolbar aria-label="Tools">
        <ToolbarButton aria-label="Run action" onClick={onClick}>
          <IconShell size="sm">
            <Icon icon="crop_free" />
          </IconShell>
        </ToolbarButton>
      </Toolbar>,
    );

    await user.click(screen.getByRole('button', { name: 'Run action' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a toolbar link', () => {
    render(
      <Toolbar aria-label="Tools">
        <ToolbarLink href="#history">Edited 51m ago</ToolbarLink>
      </Toolbar>,
    );

    const link = screen.getByRole('link', { name: 'Edited 51m ago' });
    expect(link).toHaveAttribute('href', '#history');
    expect(link).toHaveAttribute('data-slot', 'toolbar-link');
  });
});
