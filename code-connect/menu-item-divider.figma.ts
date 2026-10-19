// url=<QBDS_MENU_ITEM_DIVIDER>
// source=src/components/ui/dropdown-menu.tsx
// component=DropdownMenuSeparator
import figma from 'figma';

const instance = figma.selectedInstance;

const type =
  instance.getEnum('type', {
    default: 'default',
    inverse: 'inverse',
  }) ?? 'default';

const typeProp = type === 'default' ? '' : ` type="${type}"`;

export default {
  example: figma.code`
    /*
     * Based on the use case, choose Select, Dropdown Menu, or Context Menu.
     */
    <DropdownMenuSeparator${typeProp} />
  `,
  imports: [
    'import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"',
  ],
  id: 'menu-item-divider',
  metadata: { nestable: true },
};
