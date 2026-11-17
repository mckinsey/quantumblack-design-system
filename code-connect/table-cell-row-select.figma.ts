// url=<QBDS_TABLE_CELL_ROW_SELECT>
// source=src/components/ui/table.tsx
// component=TableCell
import figma from 'figma';

const instance = figma.selectedInstance;

const checkbox = instance.findInstance('Checkbox');
const control =
  checkbox?.type === 'INSTANCE'
    ? checkbox.executeTemplate().example
    : figma.code`<Checkbox />`;

export default {
  example: figma.code`
    <TableCell>
      ${control}
    </TableCell>
  `,
  imports: [
    'import { TableCell } from "@/components/ui/table"',
    'import { Checkbox } from "@/components/ui/checkbox"',
  ],
  id: 'table-cell-row-select',
  metadata: { nestable: true },
};
