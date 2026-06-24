import figma from '@figma/code-connect/react';

import {
  Accordion,
  AccordionContent,
  AccordionDivider,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

figma.connect(Accordion, '<QBDS_ACCORDION>', {
  props: {
    size: figma.enum('size', {
      reg: 'default',
      lg: 'lg',
    }),
    expandAlign: figma.enum('expandAlign', {
      right: 'right',
      left: 'left',
    }),
    items: figma.children('baseItems-Accordion*'),
  },
  example: ({ size, expandAlign, items }) => (
    <Accordion expandAlign={expandAlign} size={size}>
      {items}
    </Accordion>
  ),
});

figma.connect(AccordionItem, '<QBDS_ACCORDION_ITEM>', {
  props: {
    disabled: figma.enum('state', {
      enabled: false,
      expanded: false,
      disabled: true,
    }),
    description: figma.string('description'),
    trailing: figma.boolean('showTrailing', {
      true: figma.children('Badge/Icon+Label*'),
      false: undefined,
    }),
    content: figma.boolean('showContent', {
      true: figma.slot('contentSlot'),
      false: undefined,
    }),
    label: figma.textContent('Item label'),
  },
  example: ({ disabled, description, trailing, content, label }) => (
    <AccordionItem disabled={disabled} value={label}>
      <AccordionTrigger>
        {label}
        {trailing}
      </AccordionTrigger>
      <AccordionContent>
        {description}
        {content}
      </AccordionContent>
      <AccordionDivider />
    </AccordionItem>
  ),
});
