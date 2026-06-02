import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { Toggle } from '@/components/ui/toggle';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

/** Default toggle button */
export function ToggleDemo() {
  return <Toggle>Toggle</Toggle>;
}

const toggleVariants = ['secondary', 'outline', 'ghost'] as const;

/** Toggle variants - secondary, outline, ghost */
export function ToggleVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {toggleVariants.map(v => (
        <Toggle key={v} variant={v}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Toggle>
      ))}
    </div>
  );
}

/** Toggle sizes */
export function ToggleSizes() {
  const sizes = [
    { size: 'xs', label: 'Extra Small' },
    { size: 'sm', label: 'Small' },
    { size: 'default', label: 'Default' },
    { size: 'lg', label: 'Large' },
  ] as const;
  return (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map(s => (
        <Toggle key={s.size} size={s.size}>
          {s.label}
        </Toggle>
      ))}
    </div>
  );
}

/** Toggle pressed states */
export function TogglePressed() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {toggleVariants.map(v => (
          <Toggle key={v} variant={v}>
            Off
          </Toggle>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {toggleVariants.map(v => (
          <Toggle key={v} variant={v} defaultPressed>
            On
          </Toggle>
        ))}
      </div>
    </div>
  );
}

const iconToggleVariants = ['secondary', 'outline', 'ghost'] as const;

/** Renders icon toggles for each variant with optional extra className */
function IconToggleRow({ className }: { className?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {iconToggleVariants.map(variant => (
        <Toggle
          key={variant}
          variant={variant}
          size="icon"
          className={className}>
          <IconShell size="sm">
            <Icon icon="crop_free" />
          </IconShell>
        </Toggle>
      ))}
    </div>
  );
}

/** Icon toggles - square buttons */
export function ToggleIcons() {
  return <IconToggleRow />;
}

/** Round icon toggles */
export function ToggleIconsRound() {
  return <IconToggleRow className="rounded-full" />;
}

/** Icon toggle sizes */
export function ToggleIconSizes() {
  const sizes = [
    { size: 'icon-xs', iconSize: 'sm' },
    { size: 'icon-sm', iconSize: 'sm' },
    { size: 'icon', iconSize: 'sm' },
    { size: 'icon-lg', iconSize: 'default' },
  ] as const;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map(({ size, iconSize }) => (
        <Toggle key={size} variant="secondary" size={size}>
          <IconShell size={iconSize}>
            <Icon icon="crop_free" />
          </IconShell>
        </Toggle>
      ))}
    </div>
  );
}

export const examples: DemoExample[] = [
  { name: 'ToggleDemo', title: 'Default', description: 'Basic toggle button.' },
  {
    name: 'ToggleVariants',
    title: 'Variants',
    description: 'Secondary, outline, and ghost toggle variants.',
  },
  {
    name: 'ToggleSizes',
    title: 'Sizes',
    description: 'Toggle button sizes from xs to lg.',
  },
  {
    name: 'TogglePressed',
    title: 'Pressed States',
    description: 'Toggle buttons in on and off states.',
  },
  {
    name: 'ToggleIcons',
    title: 'Icon Toggles',
    description: 'Square icon-only toggle buttons.',
  },
  {
    name: 'ToggleIconsRound',
    title: 'Round Icons',
    description: 'Circular icon toggle buttons.',
  },
  {
    name: 'ToggleIconSizes',
    title: 'Icon Sizes',
    description: 'Icon toggle buttons in different sizes.',
  },
];

export const toggle = createLegacyDemo('toggle', examples, {
  ToggleDemo: <ToggleDemo />,
  ToggleVariants: <ToggleVariants />,
  ToggleSizes: <ToggleSizes />,
  TogglePressed: <TogglePressed />,
  ToggleIcons: <ToggleIcons />,
  ToggleIconsRound: <ToggleIconsRound />,
  ToggleIconSizes: <ToggleIconSizes />,
});
