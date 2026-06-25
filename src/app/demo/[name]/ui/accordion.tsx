import {
  Accordion,
  AccordionContent,
  AccordionDivider,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

const DESCRIPTION =
  'The expandable content area of the accordion. Use it for detailed information, supporting content, forms, or actions related to the accordion section.';

function TrailingBadge({ size }: { size?: 'sm' | 'default' }) {
  return (
    <Badge size={size} variant="high-emphasis" withIcon>
      <IconShell size="sm" type="neutral-inverse" variant="primary">
        <Icon icon="new_releases" />
      </IconShell>
      Label
    </Badge>
  );
}

const ITEMS = [
  { value: 'overview', label: 'Overview' },
  { value: 'configuration', label: 'Configuration' },
  { value: 'permissions', label: 'Permissions' },
  { value: 'advanced', label: 'Advanced' },
] as const;

function AccordionItems({
  badgeSize,
  showBadge = true,
}: {
  badgeSize?: 'sm' | 'default';
  showBadge?: boolean;
}) {
  return (
    <>
      {ITEMS.map(item => (
        <AccordionItem
          key={item.value}
          disabled={item.value === 'permissions'}
          value={item.value}>
          <AccordionTrigger>
            <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
              <span className="flex items-center">{item.label}</span>
              {showBadge ? (
                <span className="flex shrink-0 items-center group-data-disabled/accordion-item:opacity-[0.38]">
                  <TrailingBadge size={badgeSize} />
                </span>
              ) : null}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            {DESCRIPTION}
            <div className="border-stroke-status-error flex min-h-[38px] items-center justify-center border border-dashed p-2">
              <span className="paragraph-regular-primary text-status-error">
                Content Slot
              </span>
            </div>
          </AccordionContent>
          <AccordionDivider />
        </AccordionItem>
      ))}
    </>
  );
}

export function AccordionDemo() {
  return (
    <Accordion className="max-w-[392px]" defaultValue={['overview']}>
      <AccordionItems badgeSize="sm" />
    </Accordion>
  );
}

export function AccordionExpandLeft() {
  return (
    <Accordion
      className="max-w-[392px]"
      defaultValue={['overview']}
      expandAlign="left">
      <AccordionItems badgeSize="sm" />
    </Accordion>
  );
}

export function AccordionLarge() {
  return (
    <Accordion className="max-w-[392px]" defaultValue={['overview']} size="lg">
      <AccordionItems badgeSize="default" />
    </Accordion>
  );
}

export function AccordionLargeExpandLeft() {
  return (
    <Accordion
      className="max-w-[392px]"
      defaultValue={['overview']}
      expandAlign="left"
      size="lg">
      <AccordionItems badgeSize="default" />
    </Accordion>
  );
}

export function AccordionWithoutTrailing() {
  return (
    <Accordion className="max-w-[392px]" defaultValue={['overview']}>
      <AccordionItems showBadge={false} />
    </Accordion>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'AccordionWithoutTrailing',
    title: 'Accordian',
    description: 'Header row with label only.',
  },
  {
    name: 'AccordionDemo',
    title: 'Accordian With Badge',
    description:
      'Regular size with chevron on the right. One row expanded at a time.',
  },
  {
    name: 'AccordionExpandLeft',
    title: 'Chevron Left',
    description:
      'Expand/collapse control aligned to the start of the header row.',
  },
  {
    name: 'AccordionLarge',
    title: 'Large',
    description: 'Large header typography and spacing.',
  },
  {
    name: 'AccordionLargeExpandLeft',
    title: 'Large Chevron Left',
    description: 'Large size with left-aligned chevron.',
  },
];

export const accordion = createLegacyDemo('accordion', examples, {
  AccordionDemo: <AccordionDemo />,
  AccordionExpandLeft: <AccordionExpandLeft />,
  AccordionLarge: <AccordionLarge />,
  AccordionLargeExpandLeft: <AccordionLargeExpandLeft />,
  AccordionWithoutTrailing: <AccordionWithoutTrailing />,
});
