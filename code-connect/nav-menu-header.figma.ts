// url=<QBDS_NAV_MENU_HEADER>
// source=src/components/ui/sidebar.tsx
// component=SidebarGroupLabel
import figma from 'figma';

const instance = figma.selectedInstance;
const text = instance.getString('Text');

export default {
  example: figma.code`
    <SidebarGroupLabel>${text}</SidebarGroupLabel>
  `,
  imports: ['import { SidebarGroupLabel } from "@/components/ui/sidebar"'],
  id: 'nav-menu-header',
  metadata: { nestable: true },
};
