// url=<QBDS_CARD_MEDIA>
// source=src/components/ui/card.tsx
// component=CardMedia
import figma from 'figma';

const PLACEHOLDER_BG = '22232a';
const PLACEHOLDER_FG = 'FFF';

const instance = figma.selectedInstance;

const ratio = (instance.getEnum('ratio', {
  '2:1': '2:1',
  '16:9': '16:9',
}) ?? '2:1') as '2:1' | '16:9';

const hasHeader = instance.getBoolean('hasHeader');

const headerSlot = instance.getSlot('headerSlot');
const headerConnected = headerSlot?.connectedInstances ?? [];

const fallbackBadge = figma.code`
  <Badge outline variant="high-emphasis" withIcon>
    <IconShell size="sm" type="neutral" variant="secondary">
      <Icon icon="new_releases" />
    </IconShell>
    Label
  </Badge>
`;

const fallbackMore = figma.code`
  <Button variant="ghost" size="icon-sm" aria-label="More options">
    <IconShell hoverable>
      <Icon icon="more_vert" />
    </IconShell>
  </Button>
`;

const headerStart =
  headerConnected.length > 0
    ? headerConnected
        .slice(0, 1)
        .map(n => n.executeTemplate().example)
        .flat()
    : fallbackBadge;

const headerEnd =
  headerConnected.length > 1
    ? headerConnected
        .slice(1)
        .map(n => n.executeTemplate().example)
        .flat()
    : headerConnected.length === 0
      ? fallbackMore
      : figma.code``;

const headerAction =
  headerConnected.length === 1
    ? figma.code``
    : figma.code`
        <CardAction>
          ${headerEnd}
        </CardAction>
      `;

const headerBlock = hasHeader
  ? figma.code`
      <CardHeader>
        ${headerStart}
        ${headerAction}
      </CardHeader>
    `
  : figma.code``;

const mediaClass = ratio === '16:9' ? 'aspect-video' : '';
const mediaClassAttr = mediaClass ? ` className="${mediaClass}"` : '';

const imgSrc = `https://placehold.co/640x320/${PLACEHOLDER_BG}/${PLACEHOLDER_FG}`;

export default {
  example: figma.code`
    <CardMedia${mediaClassAttr}>
      <img alt="" src="${imgSrc}" />
      ${headerBlock}
    </CardMedia>
  `,
  imports: [
    'import { Badge } from "@/components/ui/badge"',
    'import { Button } from "@/components/ui/button"',
    'import { CardAction, CardHeader, CardMedia } from "@/components/ui/card"',
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
  ],
  id: 'card-media',
  metadata: { nestable: true },
};
