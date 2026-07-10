// url=<QBDS_SIDEBAR_NAV>
// source=src/components/ui/sidebar-nav.tsx
// component=SidebarNavRail
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  reg: 'default',
  lg: 'lg',
});

const navItems = figma.properties.children(['.Sidebar/MenuItem']);
const utilityItems = figma.properties.children(['.Sidebar/UtilityItem']);

export default {
  example: figma.code`
    <SidebarProvider layout="nav" size="${size}">
      <SidebarNav>
        <SidebarNavRail>
          <SidebarHeader>
            <SidebarMenu>
              ${figma.helpers.react.renderChildren(navItems)}
            </SidebarMenu>
          </SidebarHeader>
          <SidebarFooter>
            <SidebarMenu className="items-center gap-4">
              ${figma.helpers.react.renderChildren(utilityItems)}
            </SidebarMenu>
          </SidebarFooter>
        </SidebarNavRail>
      </SidebarNav>
    </SidebarProvider>
  `,
  imports: [
    'import { SidebarFooter, SidebarHeader, SidebarMenu, SidebarNav, SidebarNavRail, SidebarProvider } from "@/components/ui/sidebar"',
  ],
  id: 'sidebar-nav',
  metadata: { nestable: true },
};
