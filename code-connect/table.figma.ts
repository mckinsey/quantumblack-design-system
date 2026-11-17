// url=<QBDS_TABLE>
// source=src/components/ui/table.tsx
// component=Table
import figma from 'figma';

const instance = figma.selectedInstance;

const rowsSlot = instance.getSlot('rows');
const connected = rowsSlot?.connectedInstances ?? [];
const rows =
  connected.length > 0
    ? connected.map(n => n.executeTemplate().example).flat()
    : figma.properties.children(['TableRow']);

export default {
  example: figma.code`
    <Table>
      <TableBody>
        ${figma.helpers.react.renderChildren(rows)}
      </TableBody>
    </Table>
  `,
  imports: ['import { Table, TableBody } from "@/components/ui/table"'],
  id: 'table',
  metadata: { nestable: true },
};
