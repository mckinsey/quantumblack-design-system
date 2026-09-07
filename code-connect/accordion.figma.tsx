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
      end: 'right',
      start: 'left',
    }),
    items: figma.children('baseItems-Accordion*'),
  },
  example: ({ size, expandAlign, items }) => (
    <Accordion expandAlign={expandAlign} size={size}>
      {items}
    </Accordion>
  ),
});

// Title-only row (hasTrailing = false): the label is the trigger child, no
// extra layout needed.
figma.connect(AccordionItem, '<QBDS_ACCORDION_ITEM>', {
  variant: { hasTrailing: false },
  props: {
    disabled: figma.enum('state', {
      enabled: false,
      expanded: false,
      disabled: true,
    }),
    label: figma.textContent('Item label'),
    description: figma.string('description'),
    content: figma.boolean('hasContent', {
      true: figma.slot('contentSlot'),
      false: undefined,
    }),
  },
  example: ({ disabled, label, description, content }) => (
    <AccordionItem disabled={disabled} value={label}>
      <AccordionTrigger>{label}</AccordionTrigger>
      <AccordionContent>
        <p>{description}</p>
        {content}
      </AccordionContent>
      <AccordionDivider />
    </AccordionItem>
  ),
});

// Row with a trailing element (hasTrailing = true): wrap the label and the
// trailing slot in a space-between flex row so the trailing item aligns to the
// end of the header and dims when the row is disabled. `figma.slot` renders
// whatever component sits in the Figma `trailingSlot` via its own Code Connect.
figma.connect(AccordionItem, '<QBDS_ACCORDION_ITEM>', {
  variant: { hasTrailing: true },
  props: {
    disabled: figma.enum('state', {
      enabled: false,
      expanded: false,
      disabled: true,
    }),
    label: figma.textContent('Item label'),
    description: figma.string('description'),
    trailing: figma.slot('trailingSlot'),
    content: figma.boolean('hasContent', {
      true: figma.slot('contentSlot'),
      false: undefined,
    }),
  },
  example: ({ disabled, label, description, trailing, content }) => (
    <AccordionItem disabled={disabled} value={label}>
      <AccordionTrigger>
        <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
          <span className="flex items-center">{label}</span>
          <span className="flex shrink-0 items-center group-data-disabled/accordion-item:opacity-[0.38]">
            {trailing}
          </span>
        </span>
      </AccordionTrigger>
      <AccordionContent>
        {description}
        {content}
      </AccordionContent>
      <AccordionDivider />
    </AccordionItem>
  ),
});
