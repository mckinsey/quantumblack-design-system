// url=<QBDS_TABLE_HEAD_COLUMN>
// source=src/components/ui/table.tsx
// component=TableHead
import figma from 'figma';

const instance = figma.selectedInstance;

const type =
  instance.getEnum('type', {
    text: 'text',
    numeric: 'numeric',
  }) ?? 'text';

const sort =
  instance.getEnum('sort', {
    none: 'none',
    unsorted: 'unsorted',
    ascending: 'ascending',
    descending: 'descending',
  }) ?? 'none';

const label = JSON.stringify(instance.getString('label') || 'Header');
const align = type === 'numeric' ? ' align="end"' : '';
const selected =
  sort === 'ascending' || sort === 'descending' ? ' selected' : '';
const icon =
  sort === 'ascending'
    ? 'arrow_upward'
    : sort === 'descending'
      ? 'arrow_downward'
      : sort === 'unsorted'
        ? 'swap_vert'
        : '';

const iconNode = icon
  ? figma.code`<Icon icon="${icon}" size="sm" />`
  : figma.code``;

const hasSecondary = instance.getBoolean('hasSecondary');
const secondary = JSON.stringify(
  instance.getString('secondary') || 'Secondary',
);
const secondaryNode = hasSecondary
  ? figma.code`<span>{${secondary}}</span>`
  : figma.code``;

export default {
  example: figma.code`
    <TableHead${align}${selected}>
      {${label}}
      ${iconNode}
      ${secondaryNode}
    </TableHead>
  `,
  imports: [
    'import { TableHead } from "@/components/ui/table"',
    'import { Icon } from "@/components/ui/icon"',
  ],
  id: 'table-head-column',
  metadata: { nestable: true },
};
