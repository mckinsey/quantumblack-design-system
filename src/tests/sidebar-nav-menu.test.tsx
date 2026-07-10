import {
  act,
  cleanup,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarNav,
  SidebarNavMenu,
  SidebarNavMenuButton,
  SidebarNavMenuHeader,
  SidebarNavMenuItem,
  SidebarNavMenuSub,
  SidebarNavMenuSubButton,
  SidebarNavRail,
  useSidebarNavMenuOverlay,
} from '@/components/ui/sidebar-nav';

const componentName = 'sidebar';

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
      <SidebarNav>
        <SidebarNavMenu>
          <SidebarNavMenuHeader>SECTION</SidebarNavMenuHeader>
          <SidebarNavMenuItem>
            <SidebarNavMenuButton>Group</SidebarNavMenuButton>
          </SidebarNavMenuItem>
          <SidebarNavMenuSub>
            <SidebarNavMenuSubButton>Sub</SidebarNavMenuSubButton>
          </SidebarNavMenuSub>
        </SidebarNavMenu>
      </SidebarNav>,
    );

    expect(
      document.querySelector('[data-slot="sidebar-nav-menu"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sidebar-nav-menu-header"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sidebar-nav-menu-item"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sidebar-nav-menu-button"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sidebar-nav-menu-sub"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sidebar-nav-menu-sub-button"]'),
    ).toBeInTheDocument();
  });

  it('sets aria-current on active row', () => {
    render(
      <SidebarNav>
        <SidebarNavMenu>
          <SidebarNavMenuItem>
            <SidebarNavMenuButton isActive>Active</SidebarNavMenuButton>
          </SidebarNavMenuItem>
        </SidebarNavMenu>
      </SidebarNav>,
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
      <SidebarNav>
        <SidebarNavMenu>
          <Collapsible className="group/collapsible">
            <SidebarNavMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarNavMenuButton showChevron>Group</SidebarNavMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarNavMenuSub>
                  <SidebarNavMenuSubButton>Sub-item</SidebarNavMenuSubButton>
                </SidebarNavMenuSub>
              </CollapsibleContent>
            </SidebarNavMenuItem>
          </Collapsible>
        </SidebarNavMenu>
      </SidebarNav>,
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
      <SidebarNav>
        <SidebarNavRail />
        <SidebarNavMenu mode="overlay" open={false}>
          <SidebarNavMenuHeader>SECTION</SidebarNavMenuHeader>
        </SidebarNavMenu>
      </SidebarNav>,
    );

    const menu = document.querySelector('[data-slot="sidebar-nav-menu"]');
    expect(menu).toHaveAttribute('data-mode', 'overlay');
    expect(menu).toHaveAttribute('data-state', 'closed');

    rerender(
      <SidebarNav>
        <SidebarNavRail />
        <SidebarNavMenu mode="overlay" open>
          <SidebarNavMenuHeader>SECTION</SidebarNavMenuHeader>
        </SidebarNavMenu>
      </SidebarNav>,
    );

    expect(menu).toHaveAttribute('data-state', 'open');
  });

  it('anchors overlay from Sidebar side=right', () => {
    render(
      <SidebarNav side="right">
        <SidebarNavRail />
        <SidebarNavMenu mode="overlay" open>
          <SidebarNavMenuHeader>SECTION</SidebarNavMenuHeader>
        </SidebarNavMenu>
      </SidebarNav>,
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
