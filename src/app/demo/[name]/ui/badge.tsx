import { Badge, NumericBadge, StatusBadge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

/** Default numeric badge */
export function BadgeDemo() {
  return (
    <div className="flex items-center gap-3">
      <Badge>Label</Badge>
      <Badge outline variant="high-emphasis">
        Label
      </Badge>
      <Badge format="pill" variant="high-emphasis">
        Label
      </Badge>
      <Badge format="pill" outline variant="high-emphasis">
        Label
      </Badge>
      <NumericBadge variant="primary">9</NumericBadge>
      <NumericBadge outline variant="primary">
        9
      </NumericBadge>
    </div>
  );
}

/** Matches QB DS label-only matrix: sm + default (reg) per row, no large. */
const labelOnlyVariants = [
  'high-emphasis',
  'brand-accent',
  'alternative',
  'error',
  'warning',
  'success',
] as const;

/**
 * Label-only text badges: all rectangle rows first, then all pill rows.
 * Each row: small filled, default filled, small outline, default outline.
 */
export function BadgeLabelOnly() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        {labelOnlyVariants.map(v => (
          <div key={v} className="flex flex-wrap items-center gap-3">
            <Badge format="rect" size="sm" variant={v}>
              Label
            </Badge>
            <Badge format="rect" size="default" variant={v}>
              Label
            </Badge>
            <Badge format="rect" outline size="sm" variant={v}>
              Label
            </Badge>
            <Badge format="rect" outline size="default" variant={v}>
              Label
            </Badge>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {labelOnlyVariants.map(v => (
          <div key={v} className="flex flex-wrap items-center gap-3">
            <Badge format="pill" size="sm" variant={v}>
              Label
            </Badge>
            <Badge format="pill" size="default" variant={v}>
              Label
            </Badge>
            <Badge format="pill" outline size="sm" variant={v}>
              Label
            </Badge>
            <Badge format="pill" outline size="default" variant={v}>
              Label
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

const labelBadgeSizes = ['sm', 'default', 'lg'] as const;

const numericBadgeSizes = ['sm', 'default', 'lg'] as const;

/** Renders a NumericBadge in all sizes, filled and outline, for a given variant */
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

/** Numeric badge: primary, secondary, and accent — all sizes, filled and outline. */
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

/** QB DS Hint-Dot matrix: rows = status, columns = sm→xl filled then sm→xl outline. */
const statusMatrixVariants = [
  'neutral',
  'neutral-brand',
  'error',
  'warning',
  'success',
] as const;

/** Status dot badge: 5×8 grid (filled | outline × four sizes per row). */
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

/** Material Symbols ligature per badge variant. */
const iconByVariant = {
  'high-emphasis': 'check_circle',
  'brand-accent': 'check_circle',
  alternative: 'info',
  error: 'cancel',
  warning: 'schedule',
  success: 'check_circle',
} as const;

/** Icon color for outline badges only – icon matches outline, passed from demo */
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

/**
 * Icon + label: all rectangle rows first, then all pill rows. Small filled badges use built-in `gap-0.5`
 * (2px); default size uses 4px gap. Outline sm keeps the default gap.
 */
export function BadgeIconLabel() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        {iconLabelVariants.map(v => {
          const iconName = iconByVariant[v];

          return (
            <div key={v} className="flex flex-wrap items-center gap-3">
              <Badge format="rect" size="sm" variant={v} withIcon>
                <Icon icon={iconName} size="sm" />
                Label
              </Badge>
              <Badge format="rect" size="default" variant={v} withIcon>
                <Icon icon={iconName} />
                Label
              </Badge>
              <Badge format="rect" outline size="sm" variant={v} withIcon>
                <Icon
                  icon={iconName}
                  size="sm"
                  className={iconOutlineColorByVariant[v]}
                />
                Label
              </Badge>
              <Badge format="rect" outline size="default" variant={v} withIcon>
                <Icon
                  icon={iconName}
                  className={iconOutlineColorByVariant[v]}
                />
                Label
              </Badge>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-3">
        {iconLabelVariants.map(v => {
          const iconName = iconByVariant[v];

          return (
            <div key={v} className="flex flex-wrap items-center gap-3">
              <Badge format="pill" size="sm" variant={v} withIcon>
                <Icon icon={iconName} size="sm" />
                Label
              </Badge>
              <Badge format="pill" size="default" variant={v} withIcon>
                <Icon icon={iconName} />
                Label
              </Badge>
              <Badge format="pill" outline size="sm" variant={v} withIcon>
                <Icon
                  icon={iconName}
                  size="sm"
                  className={iconOutlineColorByVariant[v]}
                />
                Label
              </Badge>
              <Badge format="pill" outline size="default" variant={v} withIcon>
                <Icon
                  icon={iconName}
                  className={iconOutlineColorByVariant[v]}
                />
                Label
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Outline badge types that pair with a leading status dot. */
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

/**
 * Dot + label: all rectangle rows first, then all pill rows. Outline badge with leading
 * `StatusBadge` dot; each row is small, default, and large sizes.
 */
export function BadgeDotLabel() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        {dotLabelOutlineVariants.map(v => (
          <div key={v} className="flex flex-wrap items-center gap-3">
            {labelBadgeSizes.map(badgeSize => (
              <Badge
                key={badgeSize}
                format="rect"
                outline
                size={badgeSize}
                variant={v}
                withDot>
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
      <div className="flex flex-col gap-3">
        {dotLabelOutlineVariants.map(v => (
          <div key={v} className="flex flex-wrap items-center gap-3">
            {labelBadgeSizes.map(badgeSize => (
              <Badge
                key={badgeSize}
                format="pill"
                outline
                size={badgeSize}
                variant={v}
                withDot>
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
    </div>
  );
}

export const examples: DemoExample[] = [
  { name: 'BadgeDemo', title: 'Default', description: 'Basic numeric badge.' },
  {
    name: 'BadgeLabelOnly',
    title: 'Label only',
    description:
      'Text-only badges: small and default sizes (no large). Rectangle rows first, then pill; filled then outline in each row.',
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
      'Leading 16px icon and label. All rectangle rows first, then all pill rows. Small filled badges use 2px icon–label gap (`gap-0.5`); outline sm uses the default 4px gap.',
  },
  {
    name: 'BadgeDotLabel',
    title: 'Dot + Label',
    description:
      'Outline badge with status dot and label; use `withDot` for horizontal padding (8px default, 8+12px lg). All rectangle rows first, then pill; three sizes per row.',
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
