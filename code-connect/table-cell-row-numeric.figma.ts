// url=<QBDS_TABLE_CELL_ROW_NUMERIC>
// source=src/components/ui/table.tsx
// component=TableCell
import figma from 'figma';

const instance = figma.selectedInstance;

const content = instance.getInstanceSwap('content');
let value = JSON.stringify('999.99');

if (content?.type === 'INSTANCE') {
  const valueNode = content.findText('Value');

  if (valueNode?.type === 'TEXT' && valueNode.textContent) {
    value = JSON.stringify(valueNode.textContent);
  }
}

export default {
  example: figma.code`<TableCell align="end">{${value}}</TableCell>`,
  imports: ['import { TableCell } from "@/components/ui/table"'],
  id: 'table-cell-row-numeric',
  metadata: { nestable: true },
};
