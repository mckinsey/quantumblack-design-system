'use client';

import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { cva } from 'class-variance-authority';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { cn } from '@/lib/utils';

type AccordionSize = 'default' | 'lg';
type AccordionExpandAlign = 'left' | 'right';

const accordionItemVariants = cva(['group/accordion-item flex flex-col']);

const accordionTriggerVariants = cva([
  'group/accordion-trigger relative flex w-full flex-1 items-center outline-none',
  'focus-visible:ring-stroke-status-focus focus-visible:ring-2',
  'cursor-pointer text-left text-fg-secondary transition-colors duration-200 ease-out',
  'group-data-open/accordion-item:text-fg-primary',
  'group-data-disabled/accordion-item:cursor-not-allowed group-data-disabled/accordion-item:text-fg-disabled',
  'group-data-[expand-align=left]/accordion:px-1',
  'group-data-[expand-align=right]/accordion:pr-1',
  'group-data-[expand-align=left]/accordion:group-data-[size=default]/accordion:gap-2',
  'group-data-[expand-align=left]/accordion:group-data-[size=lg]/accordion:gap-3',
  'group-data-[expand-align=right]/accordion:group-data-[size=default]/accordion:gap-3',
  'group-data-[expand-align=right]/accordion:group-data-[size=lg]/accordion:gap-4',
  'group-data-[size=default]/accordion:py-3 group-data-[size=default]/accordion:headings-h4-regular',
  'group-data-[size=lg]/accordion:py-4 group-data-[size=lg]/accordion:headings-h3-regular',
  '**:data-[slot=accordion-trigger-icon]:shrink-0',
  'group-data-[expand-align=right]/accordion:**:data-[slot=accordion-trigger-icon]:ml-auto',
  'group-data-[expand-align=left]/accordion:**:data-[slot=accordion-trigger-icon]:order-first',
]);

const accordionTriggerIconVariants = cva([
  'pointer-events-none text-[24px] size-6',
  'group-data-[size=lg]/accordion:text-[32px] group-data-[size=lg]/accordion:size-8',
]);

const accordionContentPanelVariants = cva([
  'overflow-hidden',
  'data-open:animate-accordion-down data-closed:animate-accordion-up',
]);

const accordionContentInnerVariants = cva([
  'flex flex-col text-fg-secondary',
  'h-(--accordion-panel-height) pb-4',
  'group-data-[size=default]/accordion:pt-3 group-data-[size=lg]/accordion:pt-0',
  'data-ending-style:h-0 data-starting-style:h-0',
  '[&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-fg-primary',
  '[&_p:not(:last-child)]:mb-4',
  'group-data-[size=default]/accordion:paragraph-regular-primary group-data-[size=default]/accordion:gap-3',
  'group-data-[size=lg]/accordion:paragraph-large-primary group-data-[size=lg]/accordion:gap-4',
  'group-data-[expand-align=left]/accordion:group-data-[size=default]/accordion:pr-1',
  'group-data-[expand-align=left]/accordion:group-data-[size=default]/accordion:pl-9',
  'group-data-[expand-align=left]/accordion:group-data-[size=lg]/accordion:pr-1',
  'group-data-[expand-align=left]/accordion:group-data-[size=lg]/accordion:pl-12',
  'group-data-[expand-align=right]/accordion:group-data-[size=default]/accordion:pr-10',
  'group-data-[expand-align=right]/accordion:group-data-[size=lg]/accordion:pr-12',
]);

function Accordion({
  size = 'default',
  expandAlign = 'right',
  className,
  ...props
}: AccordionPrimitive.Root.Props & {
  size?: AccordionSize;
  expandAlign?: AccordionExpandAlign;
}) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      data-size={size}
      data-expand-align={expandAlign}
      className={cn('group/accordion flex w-full flex-col', className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordionItemVariants(), className)}
      {...props}
    />
  );
}

function AccordionDivider() {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      data-slot="accordion-divider"
      className="flex h-2 w-full shrink-0 flex-col">
      <div className="border-stroke-divider h-1 w-full border-0 border-b border-solid" />
      <div className="h-1 w-full" />
    </div>
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(accordionTriggerVariants(), className)}
        {...props}>
        {children}
        <IconShell
          data-slot="accordion-trigger-icon"
          variant="secondary"
          className={cn(
            accordionTriggerIconVariants(),
            'inline-flex group-aria-expanded/accordion-trigger:hidden',
          )}>
          <Icon icon="expand_more" />
        </IconShell>
        <IconShell
          data-slot="accordion-trigger-icon"
          variant="secondary"
          className={cn(
            accordionTriggerIconVariants(),
            'hidden group-aria-expanded/accordion-trigger:inline-flex',
          )}>
          <Icon icon="expand_less" />
        </IconShell>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      keepMounted
      className={accordionContentPanelVariants()}
      {...props}>
      <div className={cn(accordionContentInnerVariants(), className)}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionDivider,
  type AccordionSize,
  type AccordionExpandAlign,
};
