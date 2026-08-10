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
    { size: 'xxs', label: 'XXS' },
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

/** Off and on: text, icon, and round icon */
export function ToggleToggled() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="paragraph-small-primary text-fg-secondary">Normal</p>
        <div className="flex flex-wrap items-center gap-3">
          <Toggle>Toggle</Toggle>
          <Toggle size="icon" aria-label="Toggle">
            <IconShell size="sm" hoverable>
              <Icon icon="crop_free" />
            </IconShell>
          </Toggle>
          <Toggle size="icon" className="rounded-full" aria-label="Toggle">
            <IconShell size="sm" hoverable>
              <Icon icon="crop_free" />
            </IconShell>
          </Toggle>
        </div>
      </div>
      <div className="space-y-2">
        <p className="paragraph-small-primary text-fg-secondary">Toggled</p>
        <div className="flex flex-wrap items-center gap-3">
          <Toggle pressed>Toggle</Toggle>
          <Toggle size="icon" pressed aria-label="Toggle">
            <IconShell size="sm" hoverable>
              <Icon icon="crop_free" />
            </IconShell>
          </Toggle>
          <Toggle
            size="icon"
            pressed
            className="rounded-full"
            aria-label="Toggle">
            <IconShell size="sm" hoverable>
              <Icon icon="crop_free" />
            </IconShell>
          </Toggle>
        </div>
      </div>
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
    description: 'Toggle button sizes from xxs to lg.',
  },
  {
    name: 'ToggleToggled',
    title: 'Toggled State',
    description: 'Normal and toggled text, icon, and round icon toggles.',
  },
];

export const toggle = createLegacyDemo('toggle', examples, {
  ToggleDemo: <ToggleDemo />,
  ToggleVariants: <ToggleVariants />,
  ToggleSizes: <ToggleSizes />,
  ToggleToggled: <ToggleToggled />,
});
