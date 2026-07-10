import { cleanup, render, screen } from '@testing-library/react';
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
  Sidebar,
  SidebarNavMenu,
  SidebarNavMenuButton,
  SidebarNavMenuHeader,
  SidebarNavMenuItem,
  SidebarNavMenuSub,
  SidebarNavMenuSubButton,
  SidebarNavRail,
  SidebarProvider,
} from '@/components/ui/sidebar';

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
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarNavMenu>
            <SidebarNavMenuHeader>SECTION</SidebarNavMenuHeader>
            <SidebarNavMenuItem>
              <SidebarNavMenuButton>Group</SidebarNavMenuButton>
            </SidebarNavMenuItem>
            <SidebarNavMenuSub>
              <SidebarNavMenuSubButton>Sub</SidebarNavMenuSubButton>
            </SidebarNavMenuSub>
          </SidebarNavMenu>
        </Sidebar>
      </SidebarProvider>,
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
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarNavMenu>
            <SidebarNavMenuItem>
              <SidebarNavMenuButton isActive>Active</SidebarNavMenuButton>
            </SidebarNavMenuItem>
          </SidebarNavMenu>
        </Sidebar>
      </SidebarProvider>,
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
      <SidebarProvider>
        <Sidebar collapsible="none">
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
        </Sidebar>
      </SidebarProvider>,
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
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarNavRail />
          <SidebarNavMenu mode="overlay" open={false}>
            <SidebarNavMenuHeader>SECTION</SidebarNavMenuHeader>
          </SidebarNavMenu>
        </Sidebar>
      </SidebarProvider>,
    );

    const menu = document.querySelector('[data-slot="sidebar-nav-menu"]');
    expect(menu).toHaveAttribute('data-mode', 'overlay');
    expect(menu).toHaveAttribute('data-state', 'closed');

    rerender(
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarNavRail />
          <SidebarNavMenu mode="overlay" open>
            <SidebarNavMenuHeader>SECTION</SidebarNavMenuHeader>
          </SidebarNavMenu>
        </Sidebar>
      </SidebarProvider>,
    );

    expect(menu).toHaveAttribute('data-state', 'open');
  });

  it('anchors overlay from Sidebar side=right', () => {
    render(
      <SidebarProvider>
        <Sidebar collapsible="none" side="right">
          <SidebarNavRail />
          <SidebarNavMenu mode="overlay" open>
            <SidebarNavMenuHeader>SECTION</SidebarNavMenuHeader>
          </SidebarNavMenu>
        </Sidebar>
      </SidebarProvider>,
    );

    const menu = document.querySelector('[data-slot="sidebar-nav-menu"]');
    expect(menu).toHaveClass('right-(--sidebar-width-icon)');
    expect(menu).not.toHaveClass('left-(--sidebar-width-icon)');
  });
});
