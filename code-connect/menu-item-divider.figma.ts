// url=<QBDS_MENU_ITEM_DIVIDER>
// source=src/components/ui/dropdown-menu.tsx
// component=DropdownMenuSeparator
import figma from 'figma';

export default {
  example: figma.code`
    /*
     * Based on the use case, choose Select, Dropdown Menu, or Context Menu.
     */
    <DropdownMenuSeparator />
  `,
  imports: [
    'import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"',
  ],
  id: 'menu-item-divider',
  metadata: { nestable: true },
};
