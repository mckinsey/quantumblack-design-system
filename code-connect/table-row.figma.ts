// url=<QBDS_TABLE_ROW>
// source=src/components/ui/table.tsx
// component=TableRow
import figma from 'figma';

const instance = figma.selectedInstance;

const type =
  instance.getEnum('type', {
    header: 'header',
    body: 'body',
  }) ?? 'body';

const state =
  instance.getEnum('state', {
    default: 'default',
    hover: 'default',
    selected: 'selected',
    disabled: 'disabled',
    dragging: 'dragging',
  }) ?? 'default';

const selected = state === 'selected';
const disabled = state === 'disabled';
const dragging = state === 'dragging';

const cellsSlot = instance.getSlot('cells');
const connected = cellsSlot?.connectedInstances ?? [];
const cells =
  connected.length > 0
    ? connected.map(n => n.executeTemplate().example).flat()
    : [];

const rowAttrs = [
  selected ? ' selected' : '',
  disabled ? ' disabled' : '',
  dragging ? ' data-state="dragging"' : '',
].join('');

const CellTag = type === 'header' ? 'TableHead' : 'TableCell';

const cellChildren = cells.length
  ? figma.helpers.react.renderChildren(cells)
  : figma.code`<${CellTag}>Cell</${CellTag}>`;

export default {
  example: figma.code`
    <TableRow${rowAttrs}>
      ${cellChildren}
    </TableRow>
  `,
  imports: [
    'import { TableRow, TableHead, TableCell } from "@/components/ui/table"',
  ],
  id: 'table-row',
  metadata: { nestable: true },
};
