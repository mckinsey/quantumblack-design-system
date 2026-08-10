// url=<QBDS_LEFT_NAV>
// source=src/components/ui/sidebar-nav.tsx
// component=SidebarNav
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  reg: 'default',
  lg: 'lg',
});

const rail = instance.findInstance('Sidebar/Nav');
const menu = instance.findInstance('NavMenu');

const navSlot =
  rail && rail.type === 'INSTANCE' ? rail.getSlot('navItemsSlot') : undefined;
const navConnected = navSlot?.connectedInstances ?? [];
const navItems =
  navConnected.length > 0
    ? navConnected.map(n => n.executeTemplate().example).flat()
    : figma.properties.children(['.Sidebar/MenuItem']);

const utilSlot =
  rail && rail.type === 'INSTANCE' ? rail.getSlot('utilitySlot') : undefined;
const utilConnected = utilSlot?.connectedInstances ?? [];
const utilityItems =
  utilConnected.length > 0
    ? utilConnected.map(n => n.executeTemplate().example).flat()
    : figma.properties.children(['.Sidebar/UtilityItem']);

const avatarInSlot = utilConnected.some(
  n => n.type === 'INSTANCE' && n.name === 'Avatar',
);
const avatarNode =
  avatarInSlot || !rail || rail.type !== 'INSTANCE'
    ? null
    : rail.findInstance('Avatar', { traverseInstances: true });

let avatar: figma.ResultSection[] = [];

if (
  avatarNode &&
  avatarNode.type === 'INSTANCE' &&
  avatarNode.hasCodeConnect()
) {
  avatar = avatarNode.executeTemplate().example;
}

const itemsSlot =
  menu && menu.type === 'INSTANCE' ? menu.getSlot('itemsSlot') : undefined;
const itemsConnected = itemsSlot?.connectedInstances ?? [];
const menuItems =
  itemsConnected.length > 0
    ? itemsConnected.map(n => n.executeTemplate().example).flat()
    : figma.properties.children(['NavMenu/Item', 'NavMenu/Header']);

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
            ${avatar.length ? figma.code`<div className="flex justify-center">${avatar}</div>` : figma.code``}
          </SidebarFooter>
        </SidebarNavRail>
        <SidebarNavMenu>
          ${figma.helpers.react.renderChildren(menuItems)}
        </SidebarNavMenu>
      </SidebarNav>
    </SidebarProvider>
  `,
  imports: [
    'import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"',
    'import { SidebarFooter, SidebarHeader, SidebarMenu, SidebarNav, SidebarNavMenu, SidebarNavRail, SidebarProvider } from "@/components/ui/sidebar"',
  ],
  id: 'left-nav',
  metadata: { nestable: false },
};
