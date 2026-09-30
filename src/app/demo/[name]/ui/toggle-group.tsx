import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

export function ToggleGroupDemo() {
  return (
    <ToggleGroup defaultValue={['week']} aria-label="Time range">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
  );
}

const toggleGroupVariants = ['secondary', 'ghost'] as const;

export function ToggleGroupVariants() {
  return (
    <div className="flex flex-col gap-4">
      {toggleGroupVariants.map(variant => (
        <ToggleGroup
          key={variant}
          defaultValue={['week']}
          variant={variant}
          aria-label={`${variant} time range`}>
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  );
}

export function ToggleGroupSizes() {
  const sizes = [
    { size: 'default' as const, label: 'Default' },
    { size: 'sm' as const, label: 'Small' },
    { size: 'xs' as const, label: 'Extra small' },
    { size: 'xxs' as const, label: 'XXS' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {sizes.map(({ size, label }) => (
        <ToggleGroup
          key={size}
          defaultValue={['week']}
          size={size}
          aria-label={`${label} time range`}>
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  );
}

export function ToggleGroupIconOnly() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
      <ToggleGroupItem aria-label="Align left" value="left" size="icon-sm">
        <IconShell size="sm" hoverable>
          <Icon icon="format_align_left" />
        </IconShell>
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align center" value="center" size="icon-sm">
        <IconShell size="sm" hoverable>
          <Icon icon="format_align_center" />
        </IconShell>
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align right" value="right" size="icon-sm">
        <IconShell size="sm" hoverable>
          <Icon icon="format_align_right" />
        </IconShell>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ToggleGroupDisabled() {
  return (
    <ToggleGroup defaultValue={['day']} aria-label="Time range">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem disabled value="month">
        Month
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ToggleGroupLoose() {
  return (
    <ToggleGroup
      contained={false}
      defaultValue={['week']}
      aria-label="Loose toggle group">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'ToggleGroupDemo',
    title: 'Default',
    description: 'Contained single-select toggle group.',
  },
  {
    name: 'ToggleGroupVariants',
    title: 'Variants',
    description: 'Secondary and ghost contained groups.',
  },
  {
    name: 'ToggleGroupSizes',
    title: 'Sizes',
    description: 'Contained groups from default down to xxs.',
  },
  {
    name: 'ToggleGroupIconOnly',
    title: 'Icon only',
    description: 'Icon toggles inside a contained group.',
  },
  {
    name: 'ToggleGroupDisabled',
    title: 'Disabled',
    description: 'Group with one disabled item.',
  },
  {
    name: 'ToggleGroupLoose',
    title: 'Loose',
    description: 'No track — for toolbar-style grouping.',
  },
];

export const toggleGroup = createLegacyDemo('toggle-group', examples, {
  ToggleGroupDemo: <ToggleGroupDemo />,
  ToggleGroupVariants: <ToggleGroupVariants />,
  ToggleGroupSizes: <ToggleGroupSizes />,
  ToggleGroupIconOnly: <ToggleGroupIconOnly />,
  ToggleGroupDisabled: <ToggleGroupDisabled />,
  ToggleGroupLoose: <ToggleGroupLoose />,
});
