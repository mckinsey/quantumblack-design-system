// url=<QBDS_SIDEBAR_NAV>
// source=src/components/ui/sidebar-nav.tsx
// component=SidebarNav
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  reg: 'default',
  lg: 'lg',
});

const navItems = figma.properties.children(['.Sidebar/MenuItem']);
const utilityItems = figma.properties.children(['.Sidebar/UtilityItem']);

const avatarNode = instance.findInstance('Avatar', { traverseInstances: true });

let avatarBlock = figma.code``;

if (avatarNode && avatarNode.type === 'INSTANCE') {
  const avatarSize = avatarNode.getEnum('size', {
    'xxs-20': 'xxs',
    'xsm-24': 'xs',
    'sm-28': 'sm',
    'reg-36': 'default',
    'lg-48': 'lg',
    'xlg-64': 'xl',
  });
  const initials = avatarNode.getString('userInitials');
  const showPhoto = avatarNode.getBoolean('showPhoto');

  avatarBlock = figma.code`
    <Avatar size="${avatarSize}">
      ${showPhoto ? figma.code`<AvatarImage src="" />` : ''}
      <AvatarFallback>${initials}</AvatarFallback>
    </Avatar>
  `;
}

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
            <SidebarSeparator className="mb-4" />
            <SidebarMenu className="items-center gap-4">
              ${figma.helpers.react.renderChildren(utilityItems)}
            </SidebarMenu>
            <SidebarSeparator className="mt-4 mb-6" />
            <div className="flex justify-center">
              ${avatarBlock}
            </div>
          </SidebarFooter>
        </SidebarNavRail>
      </SidebarNav>
    </SidebarProvider>
  `,
  imports: [
    'import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"',
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { SidebarFooter, SidebarFooterButton, SidebarHeader, SidebarMenu, SidebarMenuIconButton, SidebarMenuItem, SidebarNav, SidebarNavRail, SidebarProvider, SidebarSeparator } from "@/components/ui/sidebar"',
  ],
  id: 'sidebar-nav',
  metadata: { nestable: true },
};
