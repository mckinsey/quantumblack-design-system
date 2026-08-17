// url=<QBDS_CARD>
// source=src/components/ui/card.tsx
// component=Card
//
// Figma-only: hasHeader, hasMedia, hasAttribution, hasDescription, hasData, hasFooter
// Archetypes: noMedia → CardDemo | media+stats → CardWithImageAndData | media+cta → CardWithImage | custom → CardCustom
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
});

const contrast = instance.getEnum('contrast', {
  low: 'low',
  high: 'high',
});

const ratio = instance.getEnum('ratio', {
  '3:4': '3:4',
  auto: 'auto',
});

const cardType = instance.getEnum('type', {
  noMedia: 'noMedia',
  'media+stats': 'media+stats',
  'media+cta': 'media+cta',
  custom: 'custom',
});

const hasHeader = instance.getBoolean('hasHeader');
const hasMedia = instance.getBoolean('hasMedia');
const hasAttribution = instance.getBoolean('hasAttribution');
const hasDescription = instance.getBoolean('hasDescription');
const hasData = instance.getBoolean('hasData');
const hasFooter = instance.getBoolean('hasFooter');

const isMediaType = cardType === 'media+stats' || cardType === 'media+cta';
const showMedia = cardType !== 'noMedia' && (hasMedia || isMediaType);

const rootClasses = [
  ratio === '3:4' ? 'aspect-[3/4]' : '',
  ratio === '3:4' ? (size === 'sm' ? 'w-[320px]' : 'w-[360px]') : '',
]
  .filter(Boolean)
  .join(' ');

function linesClass(lines: string | undefined) {
  if (lines === '2') return 'line-clamp-2 h-[2lh]';
  if (lines === '3') return 'line-clamp-3 h-[3lh]';
  if (lines === '5') return 'line-clamp-5 h-[5lh]';
  return '';
}

const labelRowClass =
  size === 'sm'
    ? 'label-regular-primary flex w-full items-start justify-between'
    : 'label-large-primary flex w-full items-start justify-between';

const valueClass =
  size === 'sm'
    ? 'paragraph-regular-primary text-fg-primary text-right'
    : 'paragraph-large-primary text-fg-primary text-right';

const statLabelClass =
  size === 'sm'
    ? 'label-regular-primary text-fg-secondary flex items-center gap-1'
    : 'label-large-primary text-fg-secondary flex items-center gap-1';

const statGap = size === 'sm' ? 'gap-4' : 'gap-5';

const attributionTextClass =
  size === 'sm'
    ? 'paragraph-regular-primary text-fg-secondary'
    : 'paragraph-large-primary text-fg-secondary';

const cardDivider = figma.code`
  <div
    role="separator"
    aria-orientation="horizontal"
    className="border-stroke-divider h-0 w-12 border-0 border-b border-solid"
  />
`;

const titleInst = instance.findInstance('title');
const titleText =
  titleInst?.type === 'INSTANCE' ? titleInst.getString('text') : '';
const titleLines =
  titleInst?.type === 'INSTANCE'
    ? titleInst.getEnum('lines', { '2': '2', '3': '3', '5': '5' })
    : undefined;

const titleClass = linesClass(titleLines);

const descInst = instance.findInstance('description');
const descText =
  descInst?.type === 'INSTANCE' ? descInst.getString('text') : '';
const descLines =
  descInst?.type === 'INSTANCE'
    ? descInst.getEnum('lines', { '2': '2', '3': '3', '5': '5' })
    : undefined;

const descClass = linesClass(descLines);

const headerSlot = instance.getSlot('headerSlot');
const headerConnected = headerSlot?.connectedInstances ?? [];
const headerStartChildren =
  headerConnected.length > 0
    ? headerConnected
        .slice(0, 1)
        .map(n => n.executeTemplate().example)
        .flat()
    : figma.code``;

const headerEndChildren =
  headerConnected.length > 1
    ? headerConnected
        .slice(1)
        .map(n => n.executeTemplate().example)
        .flat()
    : figma.code``;

const attributionSlot = instance.getSlot('cardAttribution');
const attributionConnected = attributionSlot?.connectedInstances ?? [];

const dataSlot = instance.getSlot('dataSlot');
const dataConnected = dataSlot?.connectedInstances ?? [];
const dataChildren =
  dataConnected.length > 0
    ? dataConnected.map(n => n.executeTemplate().example).flat()
    : figma.code``;

const footerSlot = instance.getSlot('footerSlot');
const footerConnected = footerSlot?.connectedInstances ?? [];
const footerChildren =
  footerConnected.length > 0
    ? footerConnected.map(n => n.executeTemplate().example).flat()
    : figma.code``;

const swapSlot = instance.getSlot('swapContent');
const swapConnected = swapSlot?.connectedInstances ?? [];
const swapChildren =
  swapConnected.length > 0
    ? swapConnected.map(n => n.executeTemplate().example).flat()
    : figma.code``;

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
  headerConnected.length > 0 ? headerStartChildren : fallbackBadge;

const headerEnd = headerConnected.length > 1 ? headerEndChildren : fallbackMore;

const headerInner = figma.code`
  ${headerStart}
  <CardAction>
    ${headerEnd}
  </CardAction>
`;

const headerBlock =
  hasHeader && !showMedia
    ? figma.code`
        <CardHeader>
          ${headerInner}
        </CardHeader>
      `
    : figma.code``;

const mediaHeaderBlock =
  hasHeader && showMedia
    ? figma.code`
        <CardHeader>
          ${headerInner}
        </CardHeader>
      `
    : figma.code``;

const mediaBlock = showMedia
  ? figma.code`
      <CardMedia>
        <img alt="" src="https://placehold.co/640x320" />
        ${mediaHeaderBlock}
      </CardMedia>
    `
  : figma.code``;

const attributionAvatar =
  attributionConnected.length > 0
    ? attributionConnected
        .slice(0, 1)
        .map(n => n.executeTemplate().example)
        .flat()
    : figma.code`
        <Avatar size="sm">
          <AvatarImage src="" />
          <AvatarFallback>LI</AvatarFallback>
        </Avatar>
      `;

const attributionTimestamp = figma.code`
  <span className="${attributionTextClass}">3 hours ago</span>
`;

const attributionInner = figma.code`
  ${attributionAvatar}
  ${attributionTimestamp}
`;

const attributionBlock =
  hasAttribution && (attributionConnected.length > 0 || isMediaType)
    ? figma.code`
        <div className="flex w-full items-center gap-2 pb-3">
          ${attributionInner}
        </div>
      `
    : figma.code``;

const fallbackDataRow = (label: string, value: string) => figma.code`
  <div className="${labelRowClass}">
    <span className="text-fg-secondary flex items-center gap-0.5">${label}</span>
    <span className="${valueClass}">${value}</span>
  </div>
`;

const fallbackData = figma.code`
  ${fallbackDataRow('Last updated', '20/06/2026')}
  ${fallbackDataRow('Date Created', '12/04/2026')}
`;

const descriptionBlock = hasDescription
  ? figma.code`
      <CardDescription${descClass ? ` className="${descClass}"` : ''}>${descText}</CardDescription>
    `
  : figma.code``;

const dataBlock =
  hasData && (dataConnected.length > 0 || cardType === 'noMedia')
    ? figma.code`
        ${cardDivider}
        <div className="flex w-full flex-col gap-2">
          ${dataConnected.length > 0 ? dataChildren : fallbackData}
        </div>
      `
    : figma.code``;

const statItem = (icon: string, value: string) => figma.code`
  <div className="${statLabelClass}">
    <IconShell size="${size === 'sm' ? 'sm' : 'default'}" type="neutral" variant="secondary">
      <Icon icon="${icon}" />
    </IconShell>
    ${value}
  </div>
`;

const statsRow = figma.code`
  <div className="flex items-center ${statGap}">
    ${statItem('visibility', '21')}
    ${statItem('favorite', '8')}
    ${statItem('download', '3')}
  </div>
`;

const bookmarkAction = figma.code`
  <Button variant="ghost" size="icon-sm" aria-label="Bookmark">
    <IconShell hoverable>
      <Icon icon="bookmark_add" />
    </IconShell>
  </Button>
`;

const statsFooterFallback = figma.code`
  ${statsRow}
  <CardAction>
    ${bookmarkAction}
  </CardAction>
`;

const ctaFooterFallback = figma.code`
  <Button variant="outline">Secondary</Button>
  <Button>Primary</Button>
`;

const footerStartConnected =
  footerConnected.length > 1
    ? footerConnected
        .slice(0, -1)
        .map(n => n.executeTemplate().example)
        .flat()
    : figma.code``;

const footerEndConnected =
  footerConnected.length > 0
    ? footerConnected
        .slice(-1)
        .map(n => n.executeTemplate().example)
        .flat()
    : figma.code``;

const statsFooterConnected = figma.code`
  ${footerConnected.length > 1 ? footerStartConnected : statsRow}
  <CardAction>
    ${footerEndConnected}
  </CardAction>
`;

const footerInner =
  footerConnected.length > 0
    ? cardType === 'media+cta'
      ? footerChildren
      : cardType === 'media+stats' || cardType === 'noMedia'
        ? statsFooterConnected
        : footerChildren
    : cardType === 'media+cta'
      ? ctaFooterFallback
      : cardType === 'media+stats' || cardType === 'noMedia'
        ? statsFooterFallback
        : figma.code``;

const footerClass =
  cardType === 'media+cta' ? ' className="justify-end gap-2"' : '';

const footerBlock = hasFooter
  ? figma.code`
      <CardFooter${footerClass}>
        ${footerInner}
      </CardFooter>
    `
  : figma.code``;

const sizeProp = size === 'sm' ? ' size="sm"' : '';
const contrastProp = contrast === 'high' ? ' contrast="high"' : '';
const classProp = rootClasses ? ` className="${rootClasses}"` : '';

const contentClass =
  cardType === 'custom'
    ? 'flex-1'
    : showMedia
      ? 'flex-1 gap-3 py-(--card-inset)'
      : 'gap-4 pt-(--card-inset)';

const customExample = figma.code`
  <Card${sizeProp}${contrastProp}${classProp}>
    <CardContent className="${contentClass}">
      ${swapConnected.length > 0 ? swapChildren : figma.code``}
    </CardContent>
  </Card>
`;

const standardExample = figma.code`
  <Card${sizeProp}${contrastProp}${classProp}>
    ${headerBlock}
    ${mediaBlock}
    <CardContent className="${contentClass}">
      ${attributionBlock}
      <CardTitle${titleClass ? ` className="${titleClass}"` : ''}>${titleText}</CardTitle>
      ${descriptionBlock}
      ${dataBlock}
    </CardContent>
    ${footerBlock}
  </Card>
`;

export default {
  example: cardType === 'custom' ? customExample : standardExample,
  imports: [
    'import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"',
    'import { Badge } from "@/components/ui/badge"',
    'import { Button } from "@/components/ui/button"',
    'import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardMedia, CardTitle } from "@/components/ui/card"',
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
  ],
  id: 'card',
  metadata: {
    nestable: true,
  },
};
