import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';

// ============================================================================
// Example Components (New Format)
// ============================================================================

/**
 * Default icon shell
 */
export function IconShellDemo() {
  return (
    <IconShell className="text-fg-primary">
      <Icon icon="crop_free" />
    </IconShell>
  );
}

/**
 * Icon shell sizes
 */
export function IconShellSizes() {
  return (
    <div className="text-fg-primary flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
        <span className="text-fg-secondary text-xs">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconShell size="default">
          <Icon icon="crop_free" />
        </IconShell>
        <span className="text-fg-secondary text-xs">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconShell size="lg">
          <Icon icon="crop_free" />
        </IconShell>
        <span className="text-fg-secondary text-xs">Large</span>
      </div>
    </div>
  );
}

/**
 * Icon shell variants
 */
export function IconShellVariants() {
  return (
    <div className="text-fg-primary flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <IconShell size="default" variant="primary">
          <Icon icon="crop_free" />
        </IconShell>
        <span className="text-fg-secondary text-xs">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconShell size="default" variant="secondary">
          <Icon icon="crop_free" />
        </IconShell>
        <span className="text-fg-secondary text-xs">Secondary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconShell size="default" variant="disabled">
          <Icon icon="crop_free" />
        </IconShell>
        <span className="text-fg-secondary text-xs">Disabled</span>
      </div>
    </div>
  );
}

/**
 * All sizes and variants
 */
export function IconShellAll() {
  return (
    <div className="text-fg-primary space-y-6">
      <div className="space-y-2">
        <span className="text-fg-secondary text-xs">Small</span>
        <div className="flex items-center gap-4">
          <IconShell size="sm" variant="primary">
            <Icon icon="crop_free" />
          </IconShell>
          <IconShell size="sm" variant="secondary">
            <Icon icon="crop_free" />
          </IconShell>
          <IconShell size="sm" variant="disabled">
            <Icon icon="crop_free" />
          </IconShell>
        </div>
      </div>
      <div className="space-y-2">
        <span className="text-fg-secondary text-xs">Default</span>
        <div className="flex items-center gap-4">
          <IconShell size="default" variant="primary">
            <Icon icon="crop_free" />
          </IconShell>
          <IconShell size="default" variant="secondary">
            <Icon icon="crop_free" />
          </IconShell>
          <IconShell size="default" variant="disabled">
            <Icon icon="crop_free" />
          </IconShell>
        </div>
      </div>
      <div className="space-y-2">
        <span className="text-fg-secondary text-xs">Large</span>
        <div className="flex items-center gap-4">
          <IconShell size="lg" variant="primary">
            <Icon icon="crop_free" />
          </IconShell>
          <IconShell size="lg" variant="secondary">
            <Icon icon="crop_free" />
          </IconShell>
          <IconShell size="lg" variant="disabled">
            <Icon icon="crop_free" />
          </IconShell>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

export const examples = [
  {
    name: 'IconShellDemo',
    title: 'Default',
    description: 'Basic icon shell wrapper.',
  },
  {
    name: 'IconShellSizes',
    title: 'Sizes',
    description: 'Small, default, and large icon sizes.',
  },
  {
    name: 'IconShellVariants',
    title: 'Variants',
    description: 'Primary, secondary, and disabled variants.',
  },
  {
    name: 'IconShellAll',
    title: 'All Combinations',
    description: 'All sizes and variants together.',
  },
];

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const iconShell = {
  name: 'icon-shell',
  components: {
    Default: <IconShellDemo />,
    Sizes: <IconShellSizes />,
    Variants: <IconShellVariants />,
    'All Combinations': <IconShellAll />,
  },
};
