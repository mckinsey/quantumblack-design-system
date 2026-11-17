// url=<QBDS_TABLE>
// source=src/components/ui/table.tsx
// component=Table
import figma from 'figma';

const instance = figma.selectedInstance;

const rowsSlot = instance.getSlot('rows');
const connected = rowsSlot?.connectedInstances ?? [];
const rendered = connected.map(row => row.executeTemplate());
const header = rendered
  .filter(row => row.metadata?.props?.section === 'header')
  .flatMap(row => row.example);
const body = rendered
  .filter(row => row.metadata?.props?.section !== 'header')
  .flatMap(row => row.example);

const headerBlock =
  header.length > 0
    ? figma.code`
        <TableHeader>
          ${figma.helpers.react.renderChildren(header)}
        </TableHeader>
      `
    : figma.code``;

const bodyRows =
  body.length > 0 ? body : figma.properties.children(['TableRow']);

export default {
  example: figma.code`
    <Table>
      ${headerBlock}
      <TableBody>
        ${figma.helpers.react.renderChildren(bodyRows)}
      </TableBody>
    </Table>
  `,
  imports: [
    'import { Table, TableBody, TableHeader } from "@/components/ui/table"',
  ],
  id: 'table',
  metadata: { nestable: true },
};
