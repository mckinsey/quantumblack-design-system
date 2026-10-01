// url=<QBDS_TABLE_HEAD>
// source=src/components/ui/table.tsx
// component=TableHead
import figma from 'figma';

const instance = figma.selectedInstance;

const figmaPad =
  instance.getEnum('padding', {
    none: 'none',
    reg: 'reg',
  }) ?? 'reg';

const type =
  instance.getEnum('type', {
    text: 'text',
    numeric: 'numeric',
  }) ?? 'text';

const sort =
  instance.getEnum('sort', {
    none: 'none',
    sortable: 'sortable',
    asc: 'asc',
    desc: 'desc',
  }) ?? 'none';

const title = instance.getString('columnTitle') || 'HEADER';
const selected = sort === 'asc' || sort === 'desc';

const classNames = [
  type === 'numeric' ? 'text-right' : '',
  figmaPad === 'none' ? 'px-0' : '',
]
  .filter(Boolean)
  .join(' ');

const classProp = classNames ? ` className="${classNames}"` : '';
const sizeProp = figmaPad === 'reg' ? ' size="sm"' : '';
const selectedProp = selected ? ' selected' : '';

const sortIcons: Record<
  string,
  { icon: string; variant: 'primary' | 'secondary' }
> = {
  sortable: { icon: 'swap_vert', variant: 'secondary' },
  asc: { icon: 'arrow_upward_alt', variant: 'primary' },
  desc: { icon: 'arrow_downward_alt', variant: 'primary' },
};

const sortMeta = sortIcons[sort];
const moreInfo = instance.findInstance('More-info', {
  traverseInstances: true,
});
const moreInfoCode =
  moreInfo?.type === 'INSTANCE'
    ? moreInfo.executeTemplate().example
    : figma.code``;

const headerContent =
  sort === 'none'
    ? figma.code`${title}`
    : figma.code`
        <button
          type="button"
          className="font-inherit flex cursor-pointer items-center gap-0.5 border-0 bg-transparent p-0 text-inherit">
          ${title}
          <IconShell size="sm" variant="${sortMeta.variant}">
            <Icon icon="${sortMeta.icon}" />
          </IconShell>
        </button>
      `;

export default {
  example: figma.code`
    <TableHead${sizeProp}${selectedProp}${classProp}>
      ${headerContent}
      ${moreInfoCode}
    </TableHead>
  `,
  imports: [
    'import { TableHead } from "@/components/ui/table"',
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
  ],
  id: 'table-head',
  metadata: { nestable: true },
};
