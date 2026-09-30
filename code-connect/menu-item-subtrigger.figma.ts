// url=<QBDS_MENU_ITEM_SUBTRIGGER>
// source=src/components/ui/dropdown-menu.tsx
// component=DropdownMenuSubTrigger
import figma from 'figma';

const instance = figma.selectedInstance;

const inset =
  instance.getEnum('inset', {
    true: true,
    false: false,
  }) ?? false;

const label = JSON.stringify(
  String(instance.getString('label') ?? 'Item label'),
);

const insetProp = inset ? ' inset' : '';

export default {
  example: figma.code`
    /*
     * Based on the use case, choose Select, Dropdown Menu, or Context Menu.
     */
    <DropdownMenuSub>
      <DropdownMenuSubTrigger${insetProp}>{${label}}</DropdownMenuSubTrigger>
    </DropdownMenuSub>
  `,
  imports: [
    'import { DropdownMenuSub, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu"',
  ],
  id: 'menu-item-subtrigger',
  metadata: { nestable: true },
};
