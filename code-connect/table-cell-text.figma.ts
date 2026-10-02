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

const classNames = [
  figmaPad === 'none' ? 'px-0' : '',
  lines === 'multi' ? 'whitespace-normal' : '',
]
  .filter(Boolean)
  .join(' ');

const classProp = classNames ? ` className="${classNames}"` : '';

const contentInst = instance.findInstance('CellContent-Text', {
  traverseInstances: true,
});

const cellText =
  contentInst?.type === 'INSTANCE'
    ? contentInst.getString('cellContent') || 'Text string'
    : 'Text string';

export default {
  example: figma.code`
    <TableCell${sizeProp}${classProp}>
      ${cellText}
    </TableCell>
  `,
  imports: ['import { TableCell } from "@/components/ui/table"'],
  id: 'table-cell-text',
  metadata: { nestable: true },
};
