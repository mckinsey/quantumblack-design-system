// url=<QBDS_CARD>
// source=src/components/ui/card.tsx
// component=Card
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

const type = instance.getEnum('type', {
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

const rootClasses = [ratio === '3:4' ? 'aspect-[3/4]' : '']
  .filter(Boolean)
  .join(' ');

const titleInst = instance.findInstance('title');
const titleText =
  titleInst?.type === 'INSTANCE' ? titleInst.getString('text') : '';
const titleLines =
  titleInst?.type === 'INSTANCE'
    ? titleInst.getEnum('lines', { '2': '2', '3': '3', '5': '5' })
    : undefined;

const titleClass =
  titleLines === '2'
    ? 'line-clamp-2 h-[2lh]'
    : titleLines === '3'
      ? 'line-clamp-3 h-[3lh]'
      : titleLines === '5'
        ? 'line-clamp-5 h-[5lh]'
        : '';

const descInst = instance.findInstance('description');
const descText =
  descInst?.type === 'INSTANCE' ? descInst.getString('text') : '';
const descLines =
  descInst?.type === 'INSTANCE'
    ? descInst.getEnum('lines', { '2': '2', '3': '3', '5': '5' })
    : undefined;

const descClass =
  descLines === '2'
    ? 'line-clamp-2 h-[2lh]'
    : descLines === '3'
      ? 'line-clamp-3 h-[3lh]'
      : descLines === '5'
        ? 'line-clamp-5 h-[5lh]'
        : '';

const headerSlot = instance.getSlot('headerSlot');
const headerConnected = headerSlot?.connectedInstances ?? [];
const headerChildren =
  headerConnected.length > 0
    ? headerConnected.map(n => n.executeTemplate().example).flat()
    : figma.code``;

const attributionSlot = instance.getSlot('cardAttribution');
const attributionConnected = attributionSlot?.connectedInstances ?? [];
const attributionChildren =
  attributionConnected.length > 0
    ? attributionConnected.map(n => n.executeTemplate().example).flat()
    : figma.code``;

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

const showAttribution = hasAttribution && attributionConnected.length > 0;
const showData = hasData && dataConnected.length > 0;
const showSwap = type === 'custom' && swapConnected.length > 0;

const headerBlock = hasHeader
  ? figma.code`
      <CardHeader>
        ${headerChildren}
      </CardHeader>
    `
  : figma.code``;

const mediaBlock = hasMedia
  ? figma.code`
      <CardMedia>
        ${headerBlock}
      </CardMedia>
    `
  : headerBlock;

const attributionBlock = showAttribution
  ? figma.code`
      <div className="flex w-full items-center gap-2 pb-3">
        ${attributionChildren}
      </div>
    `
  : figma.code``;

const descriptionBlock = hasDescription
  ? figma.code`
      <CardDescription${descClass ? ` className="${descClass}"` : ''}>${descText}</CardDescription>
    `
  : figma.code``;

const dataBlock = showData
  ? figma.code`
      <div
        role="separator"
        aria-orientation="horizontal"
        className="border-stroke-divider h-0 w-12 border-0 border-b border-solid"
      />
      <div className="flex w-full flex-col gap-2">
        ${dataChildren}
      </div>
    `
  : figma.code``;

const footerBlock = hasFooter
  ? figma.code`
      <CardFooter>
        ${footerChildren}
      </CardFooter>
    `
  : figma.code``;

const sizeProp = size === 'sm' ? ' size="sm"' : '';
const contrastProp = contrast === 'high' ? ' contrast="high"' : '';
const classProp = rootClasses ? ` className="${rootClasses}"` : '';

const contentClass =
  type === 'custom'
    ? 'flex-1'
    : hasMedia
      ? 'flex-1 gap-3 py-6'
      : 'gap-4 pt-(--card-inset)';

const customExample = figma.code`
    <Card${sizeProp}${contrastProp}${classProp}>
      <CardContent className="${contentClass}">
        ${showSwap ? swapChildren : figma.code``}
      </CardContent>
    </Card>
  `;

const standardExample = figma.code`
    <Card${sizeProp}${contrastProp}${classProp}>
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
  example: type === 'custom' ? customExample : standardExample,
  imports: [
    'import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardMedia, CardTitle } from "@/components/ui/card"',
  ],
  id: 'card',
  metadata: {
    nestable: true,
  },
};
