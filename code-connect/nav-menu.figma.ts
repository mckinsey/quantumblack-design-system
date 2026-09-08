// url=<QBDS_NAV_MENU>
// source=src/components/ui/sidebar-nav.tsx
// component=SidebarNavMenu
import figma from 'figma';

const instance = figma.selectedInstance;

const size =
  instance.getEnum('size', {
    reg: 'default',
    lg: 'lg',
  }) ?? 'default';

const slot = instance.getSlot('itemsSlot');
const connected = slot?.connectedInstances ?? [];
const items =
  connected.length > 0
    ? connected.map(n => n.executeTemplate().example).flat()
    : figma.properties.children(['NavMenu/Item', 'NavMenu/Header']);

const sizeProp = size === 'default' ? '' : ` size="${size}"`;

export default {
  example: figma.code`
    <SidebarProvider layout="nav"${sizeProp}>
      <SidebarNav>
        <SidebarNavMenu>
          ${figma.helpers.react.renderChildren(items)}
        </SidebarNavMenu>
      </SidebarNav>
    </SidebarProvider>
  `,
  imports: [
    'import { SidebarNav, SidebarNavMenu, SidebarProvider } from "@/components/ui/sidebar"',
  ],
  id: 'nav-menu',
  metadata: { nestable: true },
};
