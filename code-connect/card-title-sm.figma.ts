// url=<QBDS_CARD_TITLE_SM>
// source=src/components/ui/card.tsx
// component=CardTitle
import figma from 'figma';

const instance = figma.selectedInstance;

const text = JSON.stringify(
  String(
    instance.getString('text') ??
      'Descriptive card title that summarises the content in a clear, scannable way.',
  ),
);

const lines = (instance.getEnum('lines', {
  '2': '2',
  '3': '3',
  '5': '5',
}) ?? '3') as '2' | '3' | '5';

const linesClass =
  lines === '2'
    ? 'line-clamp-2 h-[2lh]'
    : lines === '5'
      ? 'line-clamp-5 h-[5lh]'
      : 'line-clamp-3 h-[3lh]';

export default {
  example: figma.code`
    <CardTitle className="${linesClass}">{${text}}</CardTitle>
  `,
  imports: ['import { CardTitle } from "@/components/ui/card"'],
  id: 'card-title-sm',
  metadata: { nestable: true },
};
