import { TableUsageMetrics } from '@/app/demo/[name]/ui/table-credentials';
import {
  TableRoadmap,
  TableUsageSummary,
} from '@/app/demo/[name]/ui/table-readonly';
import {
  TableOrderedList,
  TableSimpleList,
} from '@/app/demo/[name]/ui/table-selection';

export {
  TableOrderedList,
  TableRoadmap,
  TableSimpleList,
  TableUsageMetrics,
  TableUsageSummary,
};

export const examples = [
  {
    name: 'TableSimpleList',
    title: 'Simple list',
    description:
      'Selectable rows with a filter bar, status, owner, and a row action.',
  },
  {
    name: 'TableOrderedList',
    title: 'Draggable rows',
    description:
      'Drag a row by the handle to reorder it. Sort applies until the next drag.',
  },
  {
    name: 'TableUsageMetrics',
    title: 'Usage and metrics',
    description:
      'Numeric columns for runs, tokens, sessions, errors, and cost.',
  },
  {
    name: 'TableUsageSummary',
    title: 'Usage summary',
    description: 'Read-only totals with a delta under each number.',
  },
  {
    name: 'TableRoadmap',
    title: 'Roadmap',
    description:
      'Read-only rows with an avatar, a second line, and release text.',
  },
];

export const dataTable = {
  name: 'data-table',
  previewClassName: 'px-[54px] py-[64px]',
  showInstallation: false,
  showApi: false,
  components: {
    'Simple list': <TableSimpleList />,
    'Draggable rows': <TableOrderedList />,
    'Usage and metrics': <TableUsageMetrics />,
    'Usage summary': <TableUsageSummary />,
    Roadmap: <TableRoadmap />,
  },
};
