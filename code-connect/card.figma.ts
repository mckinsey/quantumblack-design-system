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
  'noMedia+stats': 'noMedia+stats',
  'media+stats': 'media+stats',
  'media+cta': 'media+cta',
});

const hasHeader = instance.getBoolean('hasHeader');
const hasMedia = instance.getBoolean('hasMedia');
const hasAttribution = instance.getBoolean('hasAttribution');
const hasDescription = instance.getBoolean('hasDescription');
const hasData = instance.getBoolean('hasData');
const hasFooter = instance.getBoolean('hasFooter');

const rootClasses = [
  contrast === 'high' ? 'bg-fill-onsurface-ui-2' : '',
  ratio === '3:4' ? 'aspect-[3/4]' : '',
]
  .filter(Boolean)
  .join(' ');

const titleInst = instance.findInstance('title');
const titleText =
  titleInst?.type === 'INSTANCE' ? titleInst.getString('text') : '';
const titleLines =
  titleInst?.type === 'INSTANCE'
    ? titleInst.getEnum('lines', { '2': '2', '3': '3', '5': 'auto' })
    : 'auto';

const titleClass =
  titleLines === '2'
    ? 'line-clamp-2 h-[2lh]'
    : titleLines === '3'
      ? 'line-clamp-3 h-[3lh]'
      : '';

const descInst = instance.findInstance('description');
const descText =
  descInst?.type === 'INSTANCE' ? descInst.getString('text') : '';
const descLines =
  descInst?.type === 'INSTANCE'
    ? descInst.getEnum('lines', { '2': '2', '3': '3', '5': 'auto' })
    : 'auto';

const descClass =
  descLines === '2'
    ? 'line-clamp-2 h-[2lh]'
    : descLines === '3'
      ? 'line-clamp-3 h-[3lh]'
      : '';

const headerSlot = instance.getSlot('headerSlot');
const headerConnected = headerSlot?.connectedInstances ?? [];
const headerChildren =
  headerConnected.length > 0
    ? headerConnected.map(n => n.executeTemplate().example).flat()
    : figma.code``;

const attributionSlot = instance.getSlot('attributionSlot');
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

const attributionBlock = hasAttribution
  ? figma.code`
      <CardAttribution>
        ${attributionChildren}
      </CardAttribution>
    `
  : figma.code``;

const descriptionBlock = hasDescription
  ? figma.code`
      <CardDescription${descClass ? ` className="${descClass}"` : ''}>${descText}</CardDescription>
    `
  : figma.code``;

const dataBlock = hasData
  ? figma.code`
      <CardData>
        ${dataChildren}
      </CardData>
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
const classProp = rootClasses ? ` className="${rootClasses}"` : '';

export default {
  example: figma.code`
    <Card${sizeProp}${classProp}>
      ${mediaBlock}
      <CardContent>
        ${attributionBlock}
        <CardTitle${titleClass ? ` className="${titleClass}"` : ''}>${titleText}</CardTitle>
        ${descriptionBlock}
      </CardContent>
      ${dataBlock}
      ${footerBlock}
    </Card>
  `,
  imports: [
    'import { Card, CardAttribution, CardContent, CardData, CardDescription, CardFooter, CardHeader, CardMedia, CardTitle } from "@/components/ui/card"',
  ],
  id: 'card',
  metadata: {
    nestable: true,
    notes: `type=${type}; contrast/ratio/lines via className`,
  },
};
