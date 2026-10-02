// url=<QBDS_CARD_DESCRIPTION_REG>
// source=src/components/ui/card.tsx
// component=CardDescription
import figma from 'figma';

const instance = figma.selectedInstance;

const text = JSON.stringify(
  String(
    instance.getString('text') ??
      'A short supporting description that gives readers extra context about the card content.',
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
    <CardDescription className="${linesClass}">{${text}}</CardDescription>
  `,
  imports: ['import { CardDescription } from "@/components/ui/card"'],
  id: 'card-description-reg',
  metadata: { nestable: true },
};
