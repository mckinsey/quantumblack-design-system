// url=<QBDS_TABLE_HEAD_SELECT>
// source=src/components/ui/table.tsx
// component=TableHead
import figma from 'figma';

const instance = figma.selectedInstance;

const checkbox = instance.findInstance('Checkbox');
const control =
  checkbox?.type === 'INSTANCE'
    ? checkbox.executeTemplate().example
    : figma.code`<Checkbox />`;

export default {
  example: figma.code`
    <TableHead>
      ${control}
    </TableHead>
  `,
  imports: [
    'import { TableHead } from "@/components/ui/table"',
    'import { Checkbox } from "@/components/ui/checkbox"',
  ],
  id: 'table-head-select',
  metadata: { nestable: true },
};
