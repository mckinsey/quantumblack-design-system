import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';
import { cn } from '@/lib/utils';

// ============================================================================
// Example Components
// ============================================================================

/** Default icon inside IconShell */
export function IconShellDemo() {
  return (
    <IconShell className="text-fg-primary">
      <Icon icon="crop_free" />
    </IconShell>
  );
}

/** sm (16px), default (24px), and lg (32px) — optical-size-matched via font axes */
export function IconShellSizes() {
  return (
    <div className="text-fg-primary flex items-end gap-8">
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

/** Primary, secondary, and disabled opacity */
export function IconShellVariants() {
  return (
    <div className="text-fg-primary flex items-center gap-8">
      {(
        [
          ['primary', 'Primary (88%)'],
          ['secondary', 'Secondary (60%)'],
          ['disabled', 'Disabled (30%)'],
        ] as const
      ).map(([variant, label]) => (
        <div key={variant} className="flex flex-col items-center gap-2">
          <IconShell size="default" variant={variant}>
            <Icon icon="info" />
          </IconShell>
          <span className="text-fg-secondary text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}

/** Colour tokens: neutral (inherits parent), neutral-inverse, accent */
export function IconShellTypes() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <IconShell size="default" type="neutral" className="text-fg-primary">
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
        <IconShell size="default" type="accent">
          <Icon icon="mail" />
        </IconShell>
        <span className="text-fg-secondary text-xs">accent</span>
      </div>
    </div>
  );
}

/** Full size × variant matrix */
export function IconShellAll() {
  const sizes = ['sm', 'default', 'lg'] as const;
  const variants = ['primary', 'secondary', 'disabled'] as const;

  return (
    <div className="text-fg-primary space-y-6">
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
    <div className="text-fg-primary flex flex-wrap items-center gap-6">
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

/** Status and feedback glyphs — colour on Icon (not overridden by IconShell) */
export function IconStatus() {
  const icons = [
    { icon: 'check_circle', tone: 'text-status-success' },
    { icon: 'error', tone: 'text-status-error' },
    { icon: 'warning', tone: 'text-status-warning' },
    { icon: 'info', tone: 'text-status-information' },
    { icon: 'cancel', tone: 'text-fg-secondary' },
    { icon: 'playlist_add_check', tone: 'text-status-success' },
  ] as const;

  return (
    <div className="flex flex-wrap items-center gap-8">
      {icons.map(({ icon, tone }) => (
        <div key={icon} className="flex flex-col items-center gap-2">
          <IconShell size="default" variant="primary">
            <Icon icon={icon} className={tone} />
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
    <div className="text-fg-primary flex flex-wrap items-center gap-6">
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
    <div className="text-fg-primary flex items-end gap-10">
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
    <div className="text-fg-primary flex flex-wrap items-center gap-4">
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
    description: 'Basic IconShell wrapping a Material Symbol ligature.',
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
    description: 'Primary, secondary, and disabled opacity on the shell.',
  },
  {
    name: 'IconShellTypes',
    title: 'Types',
    description:
      'neutral, neutral-inverse (on dark), and accent colour tokens.',
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
    description: 'Success, error, warning, info, and related feedback glyphs.',
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
