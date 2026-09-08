// url=<QBDS_ACCORDION_ITEM>
// source=src/components/ui/accordion.tsx
// component=AccordionItem
import figma from 'figma';

function textProp(node: figma.InstanceHandle, ...names: string[]) {
  for (const name of names) {
    const value = node.getString(name);

    if (typeof value === 'string' && value) {
      return value;
    }
  }

  return '';
}

const instance = figma.selectedInstance;

const disabled =
  instance.getEnum('state', {
    enabled: false,
    expanded: false,
    disabled: true,
  }) ?? false;

const hasTrailing = instance.getBoolean('hasTrailing');
const hasContent = instance.getBoolean('hasContent');

const labelNode = instance.findText('Item label');
const labelRaw =
  textProp(instance, 'label') ||
  (labelNode?.type === 'TEXT' && labelNode.textContent
    ? labelNode.textContent
    : 'Item label');
const label = JSON.stringify(labelRaw);

const description = JSON.stringify(
  textProp(instance, 'description') ||
    'The expandable content area of the accordion.',
);

const trailingSlot = hasTrailing ? instance.getSlot('trailingSlot') : null;
const trailingConnected = trailingSlot?.connectedInstances ?? [];
const trailingChildren =
  trailingConnected.length > 0
    ? trailingConnected.flatMap(n => n.executeTemplate().example)
    : [];

const contentSlot = hasContent ? instance.getSlot('contentSlot') : null;
const contentConnected = contentSlot?.connectedInstances ?? [];
const contentChildren =
  contentConnected.length > 0
    ? contentConnected.flatMap(n => n.executeTemplate().example)
    : [];

const disabledProp = disabled ? ' disabled' : '';

const triggerBody = hasTrailing
  ? figma.code`
      <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <span className="flex items-center">{${label}}</span>
        <span className="flex shrink-0 items-center group-data-disabled/accordion-item:opacity-[0.38]">
          ${figma.helpers.react.renderChildren(trailingChildren)}
        </span>
      </span>
    `
  : figma.code`{${label}}`;

const contentBody = hasContent
  ? figma.code`
      {${description}}
      ${figma.helpers.react.renderChildren(contentChildren)}
    `
  : figma.code`
      <p>{${description}}</p>
    `;

export default {
  example: figma.code`
    <AccordionItem${disabledProp} value={${label}}>
      <AccordionTrigger>
        ${triggerBody}
      </AccordionTrigger>
      <AccordionContent>
        ${contentBody}
      </AccordionContent>
      <AccordionDivider />
    </AccordionItem>
  `,
  imports: [
    'import { AccordionContent, AccordionDivider, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"',
  ],
  id: 'accordion-item',
  metadata: { nestable: true },
};
