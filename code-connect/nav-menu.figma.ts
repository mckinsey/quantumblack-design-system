// url=<QBDS_NAV_MENU>
// source=src/components/ui/sidebar.tsx
// component=SidebarNavMenu
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  reg: 'default',
  lg: 'lg',
});

const withIcons = instance.getEnum('withIcons', {
  true: true,
  false: false,
});

const items = figma.properties.children(['NavMenu/Item', 'NavMenu/Header']);

export default {
  example: figma.code`
    <SidebarProvider size="${size}">
      <Sidebar collapsible="none">
        <SidebarNavMenu${figma.helpers.react.renderProp(
          'withIcons',
          withIcons || undefined,
        )}>
          ${figma.helpers.react.renderChildren(items)}
        </SidebarNavMenu>
      </Sidebar>
    </SidebarProvider>
  `,
  imports: [
    'import { Sidebar, SidebarNavMenu, SidebarProvider } from "@/components/ui/sidebar"',
  ],
  id: 'nav-menu',
  metadata: { nestable: true },
};
