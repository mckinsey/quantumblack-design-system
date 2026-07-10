import {
  act,
  cleanup,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import {
  SidebarNav,
  SidebarNavMenu,
  SidebarNavRail,
  useSidebarNavMenuOverlay,
} from '@/components/ui/sidebar-nav';

const componentName = 'sidebar';

function NavShell({
  side = 'left',
  children,
}: {
  side?: 'left' | 'right';
  children: ReactNode;
}) {
  return (
    <SidebarProvider layout="nav" side={side}>
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
  it('exposes data-slot on nav menu parts', () => {
    render(
      <NavShell>
        <SidebarNavMenu>
          <SidebarGroupLabel>SECTION</SidebarGroupLabel>
          <SidebarMenuItem>
            <SidebarMenuButton>Group</SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton>Sub</SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
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
      document.querySelector('[data-slot="sidebar-menu-button"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sidebar-menu-sub"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sidebar-menu-sub-button"]'),
    ).toBeInTheDocument();
  });

  it('sets aria-current on active row', () => {
    render(
      <NavShell>
        <SidebarNavMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive>Active</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarNavMenu>
      </NavShell>,
    );

    expect(screen.getByRole('button', { name: 'Active' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });
});

describe('SidebarNavMenu — collapsible group', () => {
  it('toggles aria-expanded on trigger', async () => {
    const user = userEvent.setup();

    render(
      <NavShell>
        <SidebarNavMenu>
          <Collapsible className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>Group</SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>Sub-item</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
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
    expect(screen.getByText('Sub-item')).toBeInTheDocument();
  });
});

describe('SidebarNavMenu — overlay mode', () => {
  it('reflects open state via data-state', () => {
    const { rerender } = render(
      <NavShell>
        <SidebarNavRail />
        <SidebarNavMenu mode="overlay" open={false}>
          <SidebarGroupLabel>SECTION</SidebarGroupLabel>
        </SidebarNavMenu>
      </NavShell>,
    );

    const menu = document.querySelector('[data-slot="sidebar-nav-menu"]');
    expect(menu).toHaveAttribute('data-mode', 'overlay');
    expect(menu).toHaveAttribute('data-state', 'closed');

    rerender(
      <NavShell>
        <SidebarNavRail />
        <SidebarNavMenu mode="overlay" open>
          <SidebarGroupLabel>SECTION</SidebarGroupLabel>
        </SidebarNavMenu>
      </NavShell>,
    );

    expect(menu).toHaveAttribute('data-state', 'open');
  });

  it('anchors overlay from Sidebar side=right', () => {
    render(
      <NavShell side="right">
        <SidebarNavRail />
        <SidebarNavMenu mode="overlay" open>
          <SidebarGroupLabel>SECTION</SidebarGroupLabel>
        </SidebarNavMenu>
      </NavShell>,
    );

    const menu = document.querySelector('[data-slot="sidebar-nav-menu"]');
    expect(menu).toHaveClass('right-(--sidebar-width-icon)');
    expect(menu).not.toHaveClass('left-(--sidebar-width-icon)');
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

  it('exposes close and openMenu', () => {
    const { result } = renderHook(() => useSidebarNavMenuOverlay('home'));

    act(() => {
      result.current.openMenu();
    });

    expect(result.current.open).toBe(true);

    act(() => {
      result.current.close();
    });

    expect(result.current.open).toBe(false);
  });
});
