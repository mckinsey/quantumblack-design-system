// url=<QBDS_TABLE_CELL_TEXT>
// source=src/components/ui/table.tsx
// component=TableCell
import figma from 'figma';

const instance = figma.selectedInstance;

const figmaPad =
  instance.getEnum('padding', {
    none: 'none',
    reg: 'reg',
  }) ?? 'reg';

const lines =
  instance.getEnum('lines', {
    single: 'single',
    multi: 'multi',
  }) ?? 'single';

const sizeProp = figmaPad === 'reg' ? ' size="sm"' : '';
const padClassProp = figmaPad === 'none' ? ' className="px-0"' : '';

const contentInst = instance.findInstance('CellContent-Text', {
  traverseInstances: true,
});

const cellText =
  contentInst?.type === 'INSTANCE'
    ? contentInst.getString('cellContent') || 'Text string'
    : 'Text string';

export default {
  example: figma.code`
    <TableCell${sizeProp} lines="${lines}"${padClassProp}>
      ${cellText}
    </TableCell>
  `,
  imports: ['import { TableCell } from "@/components/ui/table"'],
  id: 'table-cell-text',
  metadata: { nestable: true },
};
