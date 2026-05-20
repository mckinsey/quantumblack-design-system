import { Icon } from '@/components/ui/icon';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

/** Basic icon usage with a ligature name. */
export function IconDemo() {
  return <Icon icon="search" className="text-fg-primary" />;
}

/** Explicit standalone sizing without IconShell context. */
export function IconSizes() {
  return (
    <div className="flex items-end gap-8">
      {(['sm', 'default', 'lg'] as const).map(size => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon icon="favorite" size={size} className="text-fg-primary" />
          <span className="text-fg-secondary text-xs">{size}</span>
        </div>
      ))}
    </div>
  );
}

/** Standalone icon colours (without IconShell). */
export function IconColors() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Icon
        icon="check_circle"
        size="default"
        className="text-status-success"
      />
      <Icon icon="error" size="default" className="text-status-error" />
      <Icon icon="warning" size="default" className="text-status-warning" />
      <Icon
        icon="bolt"
        size="default"
        className="text-brand-accents-qb-accent"
      />
    </div>
  );
}

/** Loading glyph animation using Icon directly. */
export function IconSpinner() {
  return (
    <div className="flex items-center gap-4">
      <Icon
        icon="progress_activity"
        size="sm"
        className="text-fg-primary animate-spin"
      />
      <Icon
        icon="progress_activity"
        size="default"
        className="text-fg-primary animate-spin"
      />
      <Icon
        icon="progress_activity"
        size="lg"
        className="text-fg-primary animate-spin"
      />
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'IconDemo',
    title: 'Default',
    description: 'Basic Material Symbols ligature rendered with Icon.',
  },
  {
    name: 'IconSizes',
    title: 'Sizes',
    description:
      'Standalone sm/default/lg sizes mapped to QBDS optical sizing.',
  },
  {
    name: 'IconColors',
    title: 'Colours',
    description:
      'Applying semantic and accent colour classes directly to Icon.',
  },
  {
    name: 'IconSpinner',
    title: 'Loading',
    description: 'Animated progress_activity spinner without IconShell.',
  },
];

export const icon = createLegacyDemo('icon', examples, {
  IconDemo: <IconDemo />,
  IconSizes: <IconSizes />,
  IconColors: <IconColors />,
  IconSpinner: <IconSpinner />,
});
