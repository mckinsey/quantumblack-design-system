// url=<QBDS_MENU_ITEM_CONTEXT>
// source=src/components/ui/dropdown-menu.tsx
// component=DropdownMenuItem
import figma from 'figma';

const instance = figma.selectedInstance;

const inset = instance.getEnum('inset', {
  true: true,
  false: false,
}) ?? false;

const disabled =
  instance.getEnum('state', {
    enabled: false,
    hover: false,
    disabled: true,
  }) ?? false;

const label = JSON.stringify(
  String(instance.getString('label') ?? 'Item label'),
);

const hasShortcut = instance.getBoolean('hasShortcut');
const shortcutLit = hasShortcut
  ? JSON.stringify(String(instance.getString('shortcutEntry') ?? '⌥⌘S'))
  : null;

const insetProp = inset ? ' inset' : '';
const disabledProp = disabled ? ' disabled' : '';

const shortcutBlock = shortcutLit
  ? figma.code`<DropdownMenuShortcut>{${shortcutLit}}</DropdownMenuShortcut>`
  : figma.code``;

export default {
  example: figma.code`
    /*
     * Figma MenuItem/Context — same row styles as ContextMenuItem.
     * Use ContextMenuItem when the menu is opened via context-menu / right-click.
     */
    <DropdownMenuItem${insetProp}${disabledProp}>
      {${label}}
      ${shortcutBlock}
    </DropdownMenuItem>
  `,
  imports: [
    'import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu"',
  ],
  id: 'menu-item-context',
  metadata: { nestable: true },
};
