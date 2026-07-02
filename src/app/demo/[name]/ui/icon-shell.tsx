import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';
import { cn } from '@/lib/utils';

// ============================================================================
// Example Components
// ============================================================================

/** Default icon inside IconShell — neutral, 24px, secondary (Figma default). */
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

/** Primary, secondary, and disabled — encoded on the shell via variant */
export function IconShellVariants() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-fg-secondary mb-3 text-xs font-medium">
          Neutral type — variant sets emphasis (default secondary)
        </p>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <IconShell size="default" variant="primary">
              <Icon icon="info" />
            </IconShell>
            <span className="text-fg-secondary text-xs">primary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconShell size="default" variant="secondary">
              <Icon icon="info" />
            </IconShell>
            <span className="text-fg-secondary text-xs">secondary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconShell size="default" variant="disabled">
              <Icon icon="info" />
            </IconShell>
            <span className="text-fg-secondary text-xs">disabled</span>
          </div>
        </div>
      </div>
      <div>
        <p className="text-fg-secondary mb-3 text-xs font-medium">
          Status colour — pass className (not a type)
        </p>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <IconShell
              size="default"
              variant="primary"
              className="text-status-information">
              <Icon icon="info" />
            </IconShell>
            <span className="text-fg-secondary text-xs">info</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Colour tokens: content types + status via className */
export function IconShellTypes() {
  const statusIcons = [
    {
      label: 'success',
      icon: 'check_circle',
      className: 'text-status-success',
    },
    { label: 'error', icon: 'error', className: 'text-status-error' },
    { label: 'warning', icon: 'warning', className: 'text-status-warning' },
    { label: 'info', icon: 'info', className: 'text-status-information' },
  ] as const;

  return (
    <div className="flex flex-col gap-8">
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
          <span className="text-fg-primary-inverse text-xs opacity-80">
            neutral-inverse
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <IconShell size="default" type="accent">
            <Icon icon="mail" />
          </IconShell>
          <span className="text-fg-secondary text-xs">accent</span>
        </div>
        <div className="bg-brand-accents-qb-accent flex flex-col items-center gap-2 rounded-lg px-6 py-4">
          <IconShell size="default" type="accent-inverse">
            <Icon icon="mail" />
          </IconShell>
          <span className="text-fg-primary-inverse text-xs opacity-80">
            accent-inverse
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        {statusIcons.map(({ label, icon, className }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <IconShell size="default" variant="primary" className={className}>
              <Icon icon={icon} />
            </IconShell>
            <span className="text-fg-secondary text-xs">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Full size × variant matrix (neutral type) */
export function IconShellAll() {
  const sizes = ['sm', 'default', 'lg'] as const;
  const variants = ['primary', 'secondary', 'disabled'] as const;

  return (
    <div className="space-y-6">
      {sizes.map(size => (
        <div key={size} className="space-y-2">
          <span className="text-fg-secondary text-xs font-medium capitalize">
            {size}
          </span>
          <div className="flex items-center gap-4">
            {variants.map(variant => (
              <IconShell key={variant} size={size} variant={variant}>
                <Icon icon="crop_free" />
              </IconShell>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Icon without IconShell — size set directly on the component */
export function IconStandalone() {
  return (
    <div className="text-fg-primary flex items-end gap-8">
      {(['sm', 'default', 'lg'] as const).map(size => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon
            icon="favorite"
            size={size}
            className="text-brand-accents-qb-accent"
          />
          <span className="text-fg-secondary text-xs">{size}</span>
        </div>
      ))}
    </div>
  );
}

const CATALOG_ICONS = [
  { icon: 'add', label: 'add' },
  { icon: 'remove', label: 'remove' },
  { icon: 'search', label: 'search' },
  { icon: 'close', label: 'close' },
  { icon: 'check', label: 'check' },
  { icon: 'edit', label: 'edit' },
  { icon: 'delete', label: 'delete' },
  { icon: 'send', label: 'send' },
  { icon: 'mail', label: 'mail' },
  { icon: 'person', label: 'person' },
  { icon: 'calendar_month', label: 'calendar_month' },
  { icon: 'schedule', label: 'schedule' },
  { icon: 'attach_money', label: 'attach_money' },
  { icon: 'more_vert', label: 'more_vert' },
  { icon: 'link', label: 'link' },
  { icon: 'lock', label: 'lock' },
  { icon: 'layers', label: 'layers' },
  { icon: 'description', label: 'description' },
  { icon: 'crop_free', label: 'crop_free' },
] as const;

/** Common ligatures used across QBDS components */
export function IconCatalog() {
  return (
    <div className="text-fg-primary grid max-w-2xl grid-cols-4 gap-x-4 gap-y-6 sm:grid-cols-6 md:grid-cols-8">
      {CATALOG_ICONS.map(({ icon, label }) => (
        <div key={icon} className="flex flex-col items-center gap-2">
          <IconShell size="default" variant="secondary">
            <Icon icon={icon} />
          </IconShell>
          <span className="text-fg-secondary max-w-full truncate text-center font-mono text-[10px]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Chevrons and arrows */
export function IconNavigation() {
  const icons = [
    'chevron_left',
    'chevron_right',
    'keyboard_arrow_down',
    'keyboard_arrow_up',
    'arrow_forward',
    'arrow_downward_alt',
    'arrow_upward_alt',
    'swap_vert',
  ] as const;

  return (
    <div className="flex flex-wrap items-center gap-6">
      {icons.map(icon => (
        <div key={icon} className="flex flex-col items-center gap-2">
          <IconShell size="default">
            <Icon icon={icon} />
          </IconShell>
          <span className="text-fg-secondary font-mono text-[10px]">
            {icon}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Status and feedback glyphs — status colour via className */
export function IconStatus() {
  const icons: { icon: string; className?: string }[] = [
    { icon: 'check_circle', className: 'text-status-success' },
    { icon: 'error', className: 'text-status-error' },
    { icon: 'warning', className: 'text-status-warning' },
    { icon: 'info', className: 'text-status-information' },
    { icon: 'cancel' },
    { icon: 'playlist_add_check' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-8">
      {icons.map(({ icon, className }) => (
        <div key={icon} className="flex flex-col items-center gap-2">
          <IconShell size="default" variant="primary" className={className}>
            <Icon icon={icon} />
          </IconShell>
          <span className="text-fg-secondary font-mono text-[10px]">
            {icon}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Icons inside buttons — leading, trailing, icon-only */
export function IconInButtons() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button>
        <IconShell size="sm">
          <Icon icon="add" />
        </IconShell>
        Create
      </Button>
      <Button variant="secondary">
        Save
        <IconShell size="sm">
          <Icon icon="check" />
        </IconShell>
      </Button>
      <Button variant="outline">
        <IconShell size="sm">
          <Icon icon="delete" />
        </IconShell>
        Delete
      </Button>
      <Button size="icon" aria-label="Search">
        <IconShell size="sm">
          <Icon icon="search" />
        </IconShell>
      </Button>
      <Button size="icon-sm" variant="ghost" aria-label="More options">
        <IconShell size="sm">
          <Icon icon="more_vert" />
        </IconShell>
      </Button>
    </div>
  );
}

/** Loading spinner via progress_activity ligature */
export function IconLoading() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {(['sm', 'default', 'lg'] as const).map(size => (
        <div key={size} className="flex flex-col items-center gap-2">
          <IconShell size={size}>
            <Icon icon="progress_activity" className="animate-spin" />
          </IconShell>
          <span className="text-fg-secondary text-xs">{size}</span>
        </div>
      ))}
      <Button disabled className="min-w-[120px]">
        <IconShell size="sm">
          <Icon icon="progress_activity" className="animate-spin" />
        </IconShell>
        Loading…
      </Button>
    </div>
  );
}

/** Same glyph at three sizes — stroke weight stays visually consistent (optical sizing) */
export function IconOpticalSizing() {
  return (
    <div className="flex items-end gap-10">
      {(['sm', 'default', 'lg'] as const).map(size => (
        <div key={size} className="flex flex-col items-center gap-3">
          <IconShell size={size} variant="primary">
            <Icon icon="menu" />
          </IconShell>
          <div className="text-fg-secondary text-center text-xs">
            <div className="font-medium capitalize">{size}</div>
            <div className="font-mono text-[10px] opacity-80">
              {size === 'sm' && '20dp @ wght 400'}
              {size === 'default' && '24dp @ wght 300'}
              {size === 'lg' && '40dp @ wght 300'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Input-adjacent icons at small size */
export function IconInputAffordances() {
  const icons = [
    'search',
    'person',
    'mail',
    'calendar_month',
    'schedule',
    'attach_money',
    'key',
    'backspace',
  ] as const;

  return (
    <div className="flex flex-wrap items-center gap-4">
      {icons.map(icon => (
        <div
          key={icon}
          className={cn(
            'border-border-primary bg-fill-onsurface-ui-3 flex h-10 items-center gap-2 rounded-md border px-3',
          )}>
          <IconShell size="sm" variant="secondary">
            <Icon icon={icon} />
          </IconShell>
          <span className="text-fg-secondary text-sm">Placeholder</span>
        </div>
      ))}
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
    description:
      'Neutral type, default (24px) size, secondary state — matches Figma defaults.',
  },
  {
    name: 'IconShellSizes',
    title: 'Sizes',
    description:
      'sm (16px), default (24px), and lg (32px) with matching optical-size sources.',
  },
  {
    name: 'IconShellVariants',
    title: 'Variants',
    description:
      'Primary, secondary, and disabled emphasis — encoded on the shell via variant.',
  },
  {
    name: 'IconShellTypes',
    title: 'Types',
    description:
      'Content types (neutral, accent, …) encode colour; status icons use className.',
  },
  {
    name: 'IconShellAll',
    title: 'Size × variant matrix',
    description: 'All size and variant combinations in one view.',
  },
  {
    name: 'IconStandalone',
    title: 'Without IconShell',
    description:
      'Icon alone with an explicit size prop and custom colour class.',
  },
  {
    name: 'IconCatalog',
    title: 'Common icons',
    description: 'Ligature names for icons used across QBDS components.',
  },
  {
    name: 'IconNavigation',
    title: 'Navigation',
    description: 'Chevrons, keyboard arrows, and sort direction icons.',
  },
  {
    name: 'IconStatus',
    title: 'Status',
    description: 'Alert and feedback glyphs — status colour via className.',
  },
  {
    name: 'IconInButtons',
    title: 'In buttons',
    description: 'Leading, trailing, and icon-only button patterns.',
  },
  {
    name: 'IconLoading',
    title: 'Loading',
    description: 'Animated progress_activity spinner at each size.',
  },
  {
    name: 'IconOpticalSizing',
    title: 'Optical sizing',
    description:
      'Why sizes differ: each maps to a distinct Google optical size and weight.',
  },
  {
    name: 'IconInputAffordances',
    title: 'Input affordances',
    description: 'Typical sm icons beside input placeholders.',
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
  IconStandalone: <IconStandalone />,
  IconCatalog: <IconCatalog />,
  IconNavigation: <IconNavigation />,
  IconStatus: <IconStatus />,
  IconInButtons: <IconInButtons />,
  IconLoading: <IconLoading />,
  IconOpticalSizing: <IconOpticalSizing />,
  IconInputAffordances: <IconInputAffordances />,
});
