// url=<QBDS_MENU_ITEM_SUBTRIGGER>
// source=src/components/ui/dropdown-menu.tsx
// component=DropdownMenuSubTrigger
import figma from 'figma';

const instance = figma.selectedInstance;

const inset = instance.getEnum('inset', {
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
     * Figma MenuItem/Subtrigger — same as ContextMenuSubTrigger for context-menu triggers.
     */
    <DropdownMenuSubTrigger${insetProp}>{${label}}</DropdownMenuSubTrigger>
  `,
  imports: [
    'import { DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu"',
  ],
  id: 'menu-item-subtrigger',
  metadata: { nestable: true },
};
