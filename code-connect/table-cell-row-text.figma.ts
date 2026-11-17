// url=<QBDS_TABLE_CELL_ROW_TEXT>
// source=src/components/ui/table.tsx
// component=TableCell
import figma from 'figma';

const instance = figma.selectedInstance;

const content = instance.getInstanceSwap('content');
let primary = JSON.stringify('Primary text');
let secondaryNode = figma.code``;

if (content?.type === 'INSTANCE') {
  const primaryNode = content.findText('Primary');

  if (primaryNode?.type === 'TEXT' && primaryNode.textContent) {
    primary = JSON.stringify(primaryNode.textContent);
  }

  if (content.getBoolean('hasSecondary')) {
    const secondaryText = content.findText('Secondary');
    const secondary = JSON.stringify(
      secondaryText?.type === 'TEXT' && secondaryText.textContent
        ? secondaryText.textContent
        : 'Secondary text',
    );

    secondaryNode = figma.code`<span>{${secondary}}</span>`;
  }
}

export default {
  example: figma.code`
    <TableCell>
      {${primary}}
      ${secondaryNode}
    </TableCell>
  `,
  imports: ['import { TableCell } from "@/components/ui/table"'],
  id: 'table-cell-row-text',
  metadata: { nestable: true },
};
