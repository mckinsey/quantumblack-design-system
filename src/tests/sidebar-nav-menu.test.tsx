import {
  act,
  cleanup,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactNode, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import {
  SidebarNav,
  SidebarNavMenu,
  SidebarNavMenuButton,
  SidebarNavMenuSub,
  SidebarNavMenuSubButton,
  SidebarNavRail,
  useSidebarNavMenuOverlay,
} from '@/components/ui/sidebar-nav';

const componentName = 'sidebar';

function NavShell({
  side = 'left',
  size,
  children,
}: {
  side?: 'left' | 'right';
  size?: 'default' | 'lg';
  children: ReactNode;
}) {
  return (
    <SidebarProvider layout="nav" side={side} size={size}>
      <SidebarNav>{children}</SidebarNav>
    </SidebarProvider>
  );
}

afterEach(() => {
  cleanup();
});

describe(`${componentName} — nav menu examples render`, () => {
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

describe('SidebarNavMenu — structure', () => {
  it('defaults to overlay mode closed when mode is omitted', () => {
    render(
      <NavShell>
        <SidebarNavRail />
        <SidebarNavMenu>
          <SidebarGroupLabel>SECTION</SidebarGroupLabel>
        </SidebarNavMenu>
      </NavShell>,
    );

    const menu = document.querySelector('[data-slot="sidebar-nav-menu"]');
    expect(menu).toHaveAttribute('data-mode', 'overlay');
    expect(menu).toHaveAttribute('data-state', 'closed');
  });

  it('exposes data-slot on nav menu parts', () => {
    render(
      <NavShell>
        <SidebarNavMenu mode="inline">
          <SidebarGroupLabel>SECTION</SidebarGroupLabel>
          <SidebarMenuItem>
            <SidebarNavMenuButton>Group</SidebarNavMenuButton>
          </SidebarMenuItem>
          <SidebarNavMenuSub>
            <SidebarMenuSubItem>
              <SidebarNavMenuSubButton>Sub</SidebarNavMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarNavMenuSub>
        </SidebarNavMenu>
      </NavShell>,
    );

    expect(
      document.querySelector('[data-slot="sidebar-nav-menu"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sidebar-group-label"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sidebar-menu-item"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sidebar-nav-menu-button"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sidebar-menu-sub"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sidebar-nav-menu-sub-button"]'),
    ).toBeInTheDocument();
  });

  it('reflects provider size on group label via data-size', () => {
    render(
      <NavShell size="lg">
        <SidebarNavMenu mode="inline">
          <SidebarGroupLabel>SECTION</SidebarGroupLabel>
        </SidebarNavMenu>
      </NavShell>,
    );

    expect(
      document.querySelector('[data-slot="sidebar-group-label"]'),
    ).toHaveAttribute('data-size', 'lg');
  });

  it('sets aria-current and data-active on active row', () => {
    render(
      <NavShell>
        <SidebarNavMenu mode="inline">
          <SidebarMenuItem>
            <SidebarNavMenuButton isActive>Active</SidebarNavMenuButton>
          </SidebarMenuItem>
        </SidebarNavMenu>
      </NavShell>,
    );

    const row = screen.getByRole('button', { name: 'Active' });
    expect(row).toHaveAttribute('aria-current', 'page');
    expect(row).toHaveAttribute('data-active', 'true');
  });
});

describe('SidebarNavMenu — collapsible group', () => {
  it('toggles aria-expanded on trigger', async () => {
    const user = userEvent.setup();

    render(
      <NavShell>
        <SidebarNavMenu mode="inline">
          <Collapsible className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger
                render={<SidebarNavMenuButton>Group</SidebarNavMenuButton>}
              />
              <CollapsibleContent>
                <SidebarNavMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarNavMenuSubButton>Sub-item</SidebarNavMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarNavMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarNavMenu>
      </NavShell>,
    );

    const trigger = screen.getByRole('button', { name: 'Group' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('data-panel-open', '');
    expect(screen.getByText('Sub-item')).toBeInTheDocument();
  });
});

describe('SidebarNavMenu — overlay mode', () => {
  it('reflects open state via data-state', () => {
    const { rerender } = render(
      <NavShell>
        <SidebarNavRail />
        <SidebarNavMenu open={false}>
          <SidebarGroupLabel>SECTION</SidebarGroupLabel>
        </SidebarNavMenu>
      </NavShell>,
    );

    let menu = document.querySelector('[data-slot="sidebar-nav-menu"]');
    expect(menu).toHaveAttribute('data-mode', 'overlay');
    expect(menu).toHaveAttribute('data-state', 'closed');

    rerender(
      <NavShell>
        <SidebarNavRail />
        <SidebarNavMenu open>
          <SidebarGroupLabel>SECTION</SidebarGroupLabel>
        </SidebarNavMenu>
      </NavShell>,
    );

    menu = document.querySelector('[data-slot="sidebar-nav-menu"]');
    expect(menu).toHaveAttribute('data-state', 'open');
  });

  it('anchors overlay from Sidebar side=right', () => {
    render(
      <NavShell side="right">
        <SidebarNavRail />
        <SidebarNavMenu open>
          <SidebarGroupLabel>SECTION</SidebarGroupLabel>
        </SidebarNavMenu>
      </NavShell>,
    );

    const nav = document.querySelector('[data-slot="sidebar-nav"]');
    const menu = document.querySelector('[data-slot="sidebar-nav-menu"]');
    expect(nav).toHaveAttribute('data-side', 'right');
    expect(menu).toHaveAttribute('data-mode', 'overlay');
    expect(menu).toHaveAttribute('data-state', 'open');
  });

  it('closes on outside pointerdown', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    function Harness() {
      const [open, setOpen] = useState(true);

      return (
        <div>
          <button type="button">Outside</button>
          <NavShell>
            <SidebarNavRail>
              <button type="button">Rail</button>
            </SidebarNavRail>
            <SidebarNavMenu
              open={open}
              onOpenChange={next => {
                onOpenChange(next);
                setOpen(next);
              }}>
              <SidebarNavMenuButton>Inside</SidebarNavMenuButton>
            </SidebarNavMenu>
          </NavShell>
        </div>
      );
    }

    render(<Harness />);

    const menu = document.querySelector('[data-slot="sidebar-nav-menu"]');
    expect(menu).toHaveAttribute('data-state', 'open');

    await user.click(screen.getByRole('button', { name: 'Outside' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(menu).toHaveAttribute('data-state', 'closed');
  });

  it('does not close when clicking inside the menu', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <NavShell>
        <SidebarNavRail />
        <SidebarNavMenu open onOpenChange={onOpenChange}>
          <SidebarNavMenuButton>Inside</SidebarNavMenuButton>
        </SidebarNavMenu>
      </NavShell>,
    );

    await user.click(screen.getByRole('button', { name: 'Inside' }));
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(
      document.querySelector('[data-slot="sidebar-nav-menu"]'),
    ).toHaveAttribute('data-state', 'open');
  });

  it('does not dismiss when clicking the icon rail', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <NavShell>
        <SidebarNavRail>
          <button type="button">Rail</button>
        </SidebarNavRail>
        <SidebarNavMenu open onOpenChange={onOpenChange}>
          <SidebarGroupLabel>SECTION</SidebarGroupLabel>
        </SidebarNavMenu>
      </NavShell>,
    );

    await user.click(screen.getByRole('button', { name: 'Rail' }));
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(
      document.querySelector('[data-slot="sidebar-nav-menu"]'),
    ).toHaveAttribute('data-state', 'open');
  });
});

describe('useSidebarNavMenuOverlay', () => {
  it('opens on selectActive and closes when the same item is selected again', () => {
    const { result } = renderHook(() => useSidebarNavMenuOverlay('home'));

    expect(result.current.open).toBe(false);
    expect(result.current.active).toBe('home');

    act(() => {
      result.current.selectActive('dashboard');
    });

    expect(result.current.active).toBe('dashboard');
    expect(result.current.open).toBe(true);

    act(() => {
      result.current.selectActive('dashboard');
    });

    expect(result.current.open).toBe(false);
  });
});
