// url=<QBDS_MENU_SELECT>
// source=src/components/ui/select.tsx
// component=Select
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
    : figma.properties.children(['MenuItem/Select']);

const sizeProp = size === 'default' ? '' : ` size="${size}"`;

export default {
  example: figma.code`
    /*
     * Based on the use case, choose Select, Dropdown Menu, or Context Menu.
     */
    <Select${sizeProp}>
      <SelectContent>
        ${figma.helpers.react.renderChildren(items)}
      </SelectContent>
    </Select>
  `,
  imports: ['import { Select, SelectContent } from "@/components/ui/select"'],
  id: 'menu-select',
  metadata: { nestable: true },
};
