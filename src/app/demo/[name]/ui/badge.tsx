import { Badge, NumericBadge, StatusBadge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';
import { cn } from '@/lib/utils';

export function BadgeDemo() {
  return (
    <div className="flex items-center gap-3">
      <Badge>Label</Badge>
      <Badge outline variant="high-emphasis">
        Label
      </Badge>
      <NumericBadge variant="primary">9</NumericBadge>
      <NumericBadge outline variant="primary">
        9
      </NumericBadge>
    </div>
  );
}

const labelOnlyVariants = [
  'high-emphasis',
  'brand-accent',
  'alternative',
  'error',
  'warning',
  'success',
] as const;

export function BadgeLabelOnly() {
  return (
    <div className="flex flex-col gap-3">
      {labelOnlyVariants.map(v => (
        <div key={v} className="flex flex-wrap items-center gap-3">
          <Badge size="sm" variant={v}>
            Label
          </Badge>
          <Badge size="default" variant={v}>
            Label
          </Badge>
          <Badge outline size="sm" variant={v}>
            Label
          </Badge>
          <Badge outline size="default" variant={v}>
            Label
          </Badge>
        </div>
      ))}
    </div>
  );
}

const labelBadgeSizes = ['sm', 'default', 'lg'] as const;

const numericBadgeSizes = ['sm', 'default', 'lg'] as const;

function NumericBadgeSizeGrid({
  variant,
}: {
  variant: 'primary' | 'secondary' | 'accent';
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {numericBadgeSizes.map(size => (
        <NumericBadge key={size} variant={variant} size={size}>
          9
        </NumericBadge>
      ))}
      {numericBadgeSizes.map(size => (
        <NumericBadge
          key={`${size}-outline`}
          variant={variant}
          size={size}
          outline>
          9
        </NumericBadge>
      ))}
    </div>
  );
}

export function BadgeNumericSection() {
  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-3">
        <p className="text-fg-secondary text-xs font-medium">Primary</p>
        <NumericBadgeSizeGrid variant="primary" />
      </div>
      <div className="space-y-3">
        <p className="text-fg-secondary text-xs font-medium">Secondary</p>
        <NumericBadgeSizeGrid variant="secondary" />
      </div>
      <div className="space-y-3">
        <p className="text-fg-secondary text-xs font-medium">Accent</p>
        <NumericBadgeSizeGrid variant="accent" />
      </div>
    </div>
  );
}

const statusBadgeSizes = ['sm', 'default', 'lg', 'xl'] as const;

const statusMatrixVariants = [
  'neutral',
  'neutral-brand',
  'error',
  'warning',
  'success',
] as const;

export function BadgeStatusSection() {
  return (
    <div className="grid grid-cols-8 place-items-center gap-x-6 gap-y-8">
      {statusMatrixVariants.map(variant => (
        <div key={variant} className="contents">
          {statusBadgeSizes.map(size => (
            <StatusBadge
              key={`${variant}-${size}`}
              variant={variant}
              size={size}
            />
          ))}
          {statusBadgeSizes.map(size => (
            <StatusBadge
              key={`${variant}-${size}-outline`}
              variant={variant}
              size={size}
              outline
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const iconLabelVariants = [
  'high-emphasis',
  'brand-accent',
  'alternative',
  'error',
  'warning',
  'success',
] as const;

const iconByVariant = {
  'high-emphasis': 'check_circle',
  'brand-accent': 'check_circle',
  alternative: 'info',
  error: 'cancel',
  warning: 'schedule',
  success: 'check_circle',
} as const;

const iconOutlineColorByVariant: Record<
  (typeof iconLabelVariants)[number],
  string
> = {
  'high-emphasis': 'text-fg-primary',
  'brand-accent': 'text-brand-accents-qb-accent',
  alternative: 'text-fg-secondary',
  error: 'text-status-error',
  warning: 'text-status-warning',
  success: 'text-status-success',
};

export function BadgeIconLabel() {
  return (
    <div className="flex flex-col gap-3">
      {iconLabelVariants.map(v => {
        const icon = iconByVariant[v];

        return (
          <div key={v} className="flex flex-wrap items-center gap-3">
            <Badge size="sm" variant={v} withIcon>
              <IconShell size="sm">
                <Icon icon={icon} />
              </IconShell>
              Label
            </Badge>
            <Badge size="default" variant={v} withIcon>
              <IconShell size="sm">
                <Icon icon={icon} />
              </IconShell>
              Label
            </Badge>
            <Badge outline size="sm" variant={v} withIcon>
              <Icon
                icon={icon}
                className={cn('size-4', iconOutlineColorByVariant[v])}
              />
              Label
            </Badge>
            <Badge outline size="default" variant={v} withIcon>
              <Icon
                icon={icon}
                className={cn('size-4', iconOutlineColorByVariant[v])}
              />
              Label
            </Badge>
          </div>
        );
      })}
    </div>
  );
}

const dotLabelOutlineVariants = [
  'high-emphasis',
  'alternative',
  'success',
  'warning',
  'error',
  'brand-accent',
] as const;

const dotLabelToStatusVariant = {
  'high-emphasis': 'neutral',
  alternative: 'neutral',
  success: 'success',
  warning: 'warning',
  error: 'error',
  'brand-accent': 'neutral-brand',
} as const satisfies Record<
  (typeof dotLabelOutlineVariants)[number],
  'neutral' | 'neutral-brand' | 'error' | 'warning' | 'success'
>;

export function BadgeDotLabel() {
  return (
    <div className="flex flex-col gap-3">
      {dotLabelOutlineVariants.map(v => (
        <div key={v} className="flex flex-wrap items-center gap-3">
          {labelBadgeSizes.map(badgeSize => (
            <Badge key={badgeSize} outline size={badgeSize} variant={v} withDot>
              <StatusBadge
                variant={dotLabelToStatusVariant[v]}
                size={badgeSize === 'lg' ? 'default' : 'sm'}
                className="shrink-0"
              />
              Label
            </Badge>
          ))}
        </div>
      ))}
    </div>
  );
}

export const examples: DemoExample[] = [
  { name: 'BadgeDemo', title: 'Default', description: 'Basic numeric badge.' },
  {
    name: 'BadgeLabelOnly',
    title: 'Label only',
    description:
      'Text-only pill badges: small and default sizes (no large). Filled then outline in each row.',
  },
  {
    name: 'BadgeNumericSection',
    title: 'Numeric badge',
    description:
      'Primary, secondary, and accent numeric badges: all sizes, filled and outline, with spacing between each variant group.',
  },
  {
    name: 'BadgeStatusSection',
    title: 'Status badge',
    description:
      'Hint-dot matrix: five statuses × eight columns (sm→xl filled, then sm→xl outline).',
  },
  {
    name: 'BadgeIconLabel',
    title: 'Icon + Label',
    description:
      'Leading 16px icon and label. Small filled badges use 2px icon–label gap (`gap-0.5`); outline sm uses the default 4px gap.',
  },
  {
    name: 'BadgeDotLabel',
    title: 'Dot + Label',
    description:
      'Outline badge with status dot and label; use `withDot` for horizontal padding (8px default, 8+12px lg). Three sizes per row.',
  },
];

export const badge = createLegacyDemo('badge', examples, {
  BadgeDemo: <BadgeDemo />,
  BadgeLabelOnly: <BadgeLabelOnly />,
  BadgeNumericSection: <BadgeNumericSection />,
  BadgeStatusSection: <BadgeStatusSection />,
  BadgeIconLabel: <BadgeIconLabel />,
  BadgeDotLabel: <BadgeDotLabel />,
});
