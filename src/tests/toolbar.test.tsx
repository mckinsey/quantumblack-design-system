import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from '@/components/ui/toolbar';

const componentName = 'toolbar';

afterEach(() => {
  cleanup();
});

describe(`${componentName} — all examples render`, () => {
  it.each(Object.entries(exampleComponentMaps[componentName]))(
    'renders "%s" without crashing',
    (_, Example) => {
      expect(() => render(<Example />)).not.toThrow();
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

  it('applies boxed and variant data attributes', () => {
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
        <ToolbarToggleGroup type="single" defaultValue="a">
          <ToolbarToggleItem aria-label="Tool A" value="a">
            <IconShell size="sm">
              <Icon icon="crop_free" />
            </IconShell>
          </ToolbarToggleItem>
          <ToolbarToggleItem aria-label="Tool B" value="b">
            <IconShell size="sm">
              <Icon icon="crop_free" />
            </IconShell>
          </ToolbarToggleItem>
        </ToolbarToggleGroup>
      </Toolbar>,
    );

    expect(screen.getByRole('radio', { name: 'Tool A' })).toHaveAttribute(
      'data-state',
      'on',
    );

    await user.click(screen.getByRole('radio', { name: 'Tool B' }));

    expect(screen.getByRole('radio', { name: 'Tool B' })).toHaveAttribute(
      'data-state',
      'on',
    );
    expect(screen.getByRole('radio', { name: 'Tool A' })).toHaveAttribute(
      'data-state',
      'off',
    );
  });

  it('fires onClick for toolbar buttons', async () => {
    const user = userEvent.setup();
    let clicked = false;

    render(
      <Toolbar aria-label="Tools">
        <ToolbarButton
          aria-label="Run action"
          onClick={() => {
            clicked = true;
          }}>
          <IconShell size="sm">
            <Icon icon="crop_free" />
          </IconShell>
        </ToolbarButton>
      </Toolbar>,
    );

    await user.click(screen.getByRole('button', { name: 'Run action' }));

    expect(clicked).toBe(true);
  });
});
