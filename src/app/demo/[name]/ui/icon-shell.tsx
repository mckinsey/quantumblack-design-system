import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';
import { cn } from '@/lib/utils';

// ============================================================================
// Example Components
// ============================================================================

/** Default shell — secondary opacity, neutral tone */
export function IconShellDemo() {
  return (
    <IconShell>
      <Icon icon="crop_free" />
    </IconShell>
  );
}

/** sm (16px), default (24px), and lg (32px) — optical-size-matched via font axes */
export function IconShellSizes() {
  return (
    <div className="flex items-end gap-8">
      {(
        [
          ['sm', '16px · 20dp@400'],
          ['default', '24px · 24dp@300'],
          ['lg', '32px · 40dp@300'],
        ] as const
      ).map(([size, label]) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <IconShell size={size}>
            <Icon icon="search" />
          </IconShell>
          <span className="text-fg-secondary text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}

/** Static opacity — primary (88%), secondary (60%), disabled (30%) */
export function IconShellVariants() {
  const items = [
    { label: 'Primary (88%)', variant: 'primary' as const },
    { label: 'Secondary (60%)', variant: 'secondary' as const },
    { label: 'Disabled (30%)', disabled: true },
  ];

  return (
    <div className="flex items-center gap-8">
      {items.map(({ label, variant, disabled }) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <IconShell size="default" variant={variant} disabled={disabled}>
            <Icon icon="info" />
          </IconShell>
          <span className="text-fg-secondary text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}

/** Colour tone — neutral, neutral-inverse, custom + className */
export function IconShellTypes() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <IconShell size="default" type="neutral">
          <Icon icon="mail" />
        </IconShell>
        <span className="text-fg-secondary text-xs">neutral</span>
      </div>
      <div className="bg-fill-active flex flex-col items-center gap-2 rounded-lg px-6 py-4">
        <IconShell size="default" type="neutral-inverse">
          <Icon icon="mail" />
        </IconShell>
        <span className="text-fg-primary-inverse text-xs">neutral-inverse</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconShell
          size="default"
          type="custom"
          className="text-status-success"
          variant="primary">
          <Icon icon="mail" />
        </IconShell>
        <span className="text-fg-secondary text-xs">custom</span>
      </div>
    </div>
  );
}

type MatrixType = {
  label: string;
  type: 'neutral' | 'neutral-inverse' | 'custom';
  className?: string;
  dark?: boolean;
};

const MATRIX_TYPES: MatrixType[] = [
  { label: 'neutral', type: 'neutral' },
  {
    label: 'custom',
    type: 'custom',
    className: 'text-status-success',
  },
  { label: 'neutral-inverse', type: 'neutral-inverse', dark: true },
  {
    label: 'custom (inverse)',
    type: 'custom',
    className: 'text-status-success-inverse',
    dark: true,
  },
];

/** Full type × size × variant matrix */
export function IconShellAll() {
  const sizes = ['sm', 'default', 'lg'] as const;
  const states = [
    { key: 'secondary', variant: 'secondary' as const },
    { key: 'primary', variant: 'primary' as const },
    { key: 'disabled', disabled: true },
  ];

  return (
    <div className="space-y-8">
      {MATRIX_TYPES.map(({ label, type, className, dark }) => (
        <div
          key={label}
          className={cn('space-y-4 rounded-lg p-4', dark && 'bg-fill-active')}>
          <span
            className={cn(
              'text-xs font-medium',
              dark ? 'text-fg-primary-inverse' : 'text-fg-secondary',
            )}>
            {label}
          </span>
          {sizes.map(size => (
            <div key={size} className="space-y-2">
              <span
                className={cn(
                  'text-xs capitalize',
                  dark ? 'text-fg-secondary-inverse' : 'text-fg-secondary',
                )}>
                {size}
              </span>
              <div className="flex items-center gap-4">
                {states.map(state => (
                  <IconShell
                    key={state.key}
                    size={size}
                    type={type}
                    variant={state.variant}
                    disabled={state.disabled}
                    className={className}>
                    <Icon icon="crop_free" />
                  </IconShell>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Override base colour via type custom or directly on Icon */
export function IconShellCustomColor() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <IconShell
          type="custom"
          className="text-brand-accents-qb-accent"
          variant="primary">
          <Icon icon="favorite" />
        </IconShell>
        <span className="text-fg-secondary text-xs">custom shell class</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconShell variant="primary">
          <Icon icon="error" className="text-status-error" />
        </IconShell>
        <span className="text-fg-secondary text-xs">class on Icon</span>
      </div>
      <div className="bg-fill-active flex flex-col items-center gap-2 rounded-lg px-6 py-4">
        <IconShell
          type="custom"
          className="text-status-success-inverse"
          variant="secondary">
          <Icon icon="check_circle" />
        </IconShell>
        <span className="text-fg-primary-inverse text-xs">custom on dark</span>
      </div>
    </div>
  );
}

/** Icon-only buttons — secondary rest, primary on hover/active */
export function IconShellHoverable() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <IconShell hoverable>
        <Icon icon="edit" />
      </IconShell>
      <IconShell size="sm" hoverable>
        <Icon icon="more_vert" />
      </IconShell>
      <IconShell size="sm" hoverable disabled>
        <Icon icon="delete" />
      </IconShell>
    </div>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

export const examples: DemoExample[] = [
  {
    name: 'IconShellDemo',
    title: 'Default',
    description: 'Secondary opacity on neutral tone.',
  },
  {
    name: 'IconShellSizes',
    title: 'Sizes',
    description: 'sm (16px), default (24px), lg (32px).',
  },
  {
    name: 'IconShellVariants',
    title: 'Variants',
    description:
      'Static opacity via variant. Use disabled prop for disabled state.',
  },
  {
    name: 'IconShellTypes',
    title: 'Types',
    description: 'neutral, neutral-inverse, or custom with className.',
  },
  {
    name: 'IconShellAll',
    title: 'Type × size × variant matrix',
    description:
      'All type, size, and opacity combinations on light and dark surfaces.',
  },
  {
    name: 'IconShellCustomColor',
    title: 'Custom colour',
    description: 'type="custom" + className, or colour on Icon directly.',
  },
  {
    name: 'IconShellHoverable',
    title: 'Hoverable',
    description:
      'Icon-only buttons. No variant — fixed secondary rest, primary on hover/active.',
  },
];

// ============================================================================
// Legacy format
// ============================================================================

export const iconShell = createLegacyDemo('icon-shell', examples, {
  IconShellDemo: <IconShellDemo />,
  IconShellSizes: <IconShellSizes />,
  IconShellVariants: <IconShellVariants />,
  IconShellTypes: <IconShellTypes />,
  IconShellAll: <IconShellAll />,
  IconShellCustomColor: <IconShellCustomColor />,
  IconShellHoverable: <IconShellHoverable />,
});
