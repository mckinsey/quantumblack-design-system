// url=<QBDS_MENU_ITEM_HEADER>
// source=src/components/ui/dropdown-menu.tsx
// component=DropdownMenuLabel
import figma from 'figma';

const instance = figma.selectedInstance;

const label = JSON.stringify(
  String(instance.getString('headingEntry') ?? 'GROUP HEADING'),
);

export default {
  example: figma.code`
    /*
     * Based on the use case, choose Select, Dropdown Menu, or Context Menu.
     */
    <DropdownMenuLabel>{${label}}</DropdownMenuLabel>
  `,
  imports: [
    'import { DropdownMenuLabel } from "@/components/ui/dropdown-menu"',
  ],
  id: 'menu-item-header',
  metadata: { nestable: true },
};
