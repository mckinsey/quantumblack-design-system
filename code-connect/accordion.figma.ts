// url=<QBDS_ACCORDION>
// source=src/components/ui/accordion.tsx
// component=Accordion
import figma from 'figma';

const instance = figma.selectedInstance;

const size =
  instance.getEnum('size', {
    reg: 'default',
    lg: 'lg',
  }) ?? 'default';

const expandAlign =
  instance.getEnum('expandAlign', {
    end: 'right',
    start: 'left',
  }) ?? 'right';

const slot = instance.getSlot('itemsSlot');
const connected = slot?.connectedInstances ?? [];
const items =
  connected.length > 0
    ? connected.flatMap(n => n.executeTemplate().example)
    : figma.properties.children(['base/accordion/Item']);

const sizeProp = size !== 'default' ? ` size="${size}"` : '';
const alignProp =
  expandAlign !== 'right' ? ` expandAlign="${expandAlign}"` : '';

export default {
  example: figma.code`
    <Accordion${alignProp}${sizeProp}>
      ${figma.helpers.react.renderChildren(items)}
    </Accordion>
  `,
  imports: [
    'import { Accordion, AccordionContent, AccordionDivider, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"',
  ],
  id: 'accordion',
  metadata: { nestable: false },
};
