import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

/** Default button - the primary call to action style */
export function ButtonDemo() {
  return <Button>Click me</Button>;
}

/** All button variants displayed side by side */
export function ButtonVariants() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}

/** Button size variations */
export function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="lg">Large</Button>
      <Button size="default">Default</Button>
      <Button size="sm">Small</Button>
      <Button size="xs">Extra Small</Button>
      <Button size="xxs">XXS</Button>
    </div>
  );
}

/** Disabled button states */
export function ButtonDisabled() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="default" disabled>
        Default
      </Button>
      <Button variant="accent" disabled>
        Accent
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
    </div>
  );
}

/** Buttons with leading and trailing icons */
export function ButtonWithIcons() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button>
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
        Leading Icon
      </Button>
      <Button>
        Trailing Icon
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
    </div>
  );
}

/** Loading state buttons with spinner */
export function ButtonLoading() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled className="w-[100px]">
        <IconShell size="sm">
          <Icon icon="progress_activity" className="animate-spin" />
        </IconShell>
      </Button>
      <Button variant="outline" disabled className="w-[100px]">
        <IconShell size="sm">
          <Icon icon="progress_activity" className="animate-spin" />
        </IconShell>
      </Button>
      <Button variant="secondary" disabled>
        <IconShell size="sm">
          <Icon icon="progress_activity" className="animate-spin" />
        </IconShell>
        Loading...
      </Button>
    </div>
  );
}

/** Icon-only buttons in various sizes */
export function ButtonIconOnly() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="icon-lg">
        <IconShell size="default">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon">
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon-sm">
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon-xs">
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
    </div>
  );
}

/** Circular icon buttons */
export function ButtonIconRounded() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="icon-lg" className="rounded-full">
        <IconShell size="default">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon" className="rounded-full">
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon-sm" className="rounded-full" variant="outline">
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
      <Button size="icon-xs" className="rounded-full" variant="ghost">
        <IconShell size="sm">
          <Icon icon="crop_free" />
        </IconShell>
      </Button>
    </div>
  );
}

/** Button groups / CTAs */
export function ButtonGroups() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
      {/* Left column: secondary | secondary, secondary | ghost, default | secondary, default | ghost */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Button variant="secondary">Button</Button>
          <Button variant="secondary">Button</Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">Button</Button>
          <Button variant="ghost">Button</Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default">Button</Button>
          <Button variant="secondary">Button</Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default">Button</Button>
          <Button variant="ghost">Button</Button>
        </div>
      </div>
      {/* Right column: outline | secondary, ghost | secondary, outline | default, ghost | default */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline">Button</Button>
          <Button variant="secondary">Button</Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">Button</Button>
          <Button variant="secondary">Button</Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Button</Button>
          <Button variant="default">Button</Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">Button</Button>
          <Button variant="default">Button</Button>
        </div>
      </div>

      {/* Accent + outline (left) | outline + accent (right, variants interchanged) */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Button variant="accent">Button</Button>
          <Button variant="outline">Button</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline">Button</Button>
          <Button variant="accent">Button</Button>
        </div>
      </div>

      {/* Different sizes – default | secondary (left) | secondary | default (right, variants interchanged) */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Button variant="default" size="xs">
            Button
          </Button>
          <Button variant="secondary" size="xs">
            Button
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default" size="sm">
            Button
          </Button>
          <Button variant="secondary" size="sm">
            Button
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default" size="default">
            Button
          </Button>
          <Button variant="secondary" size="default">
            Button
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default" size="lg">
            Button
          </Button>
          <Button variant="secondary" size="lg">
            Button
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="xs">
            Button
          </Button>
          <Button variant="default" size="xs">
            Button
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            Button
          </Button>
          <Button variant="default" size="sm">
            Button
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="default">
            Button
          </Button>
          <Button variant="default" size="default">
            Button
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="lg">
            Button
          </Button>
          <Button variant="default" size="lg">
            Button
          </Button>
        </div>
      </div>
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'ButtonDemo',
    title: 'Default',
    description: 'The default button style with primary styling.',
  },
  {
    name: 'ButtonVariants',
    title: 'Variants',
    description:
      'All available button variants: default, accent, secondary, outline, and ghost.',
  },
  {
    name: 'ButtonSizes',
    title: 'Sizes',
    description: 'Button size options from extra small to large.',
  },
  {
    name: 'ButtonDisabled',
    title: 'Disabled',
    description: 'Buttons in disabled state across all variants.',
  },
  {
    name: 'ButtonWithIcons',
    title: 'With Icons',
    description: 'Buttons with leading, trailing, or both icons.',
  },
  {
    name: 'ButtonLoading',
    title: 'Loading',
    description: 'Loading state with animated spinner.',
  },
  {
    name: 'ButtonIconOnly',
    title: 'Icon Only',
    description: 'Icon-only buttons in various sizes.',
  },
  {
    name: 'ButtonIconRounded',
    title: 'Rounded Icons',
    description: 'Circular icon buttons using rounded-full class.',
  },
  {
    name: 'ButtonGroups',
    title: 'Button Groups / CTAs',
    description:
      'Pairs of buttons for primary and secondary actions: default, secondary, and outline combinations.',
  },
];

export const button = createLegacyDemo('button', examples, {
  ButtonDemo: <ButtonDemo />,
  ButtonVariants: <ButtonVariants />,
  ButtonSizes: <ButtonSizes />,
  ButtonDisabled: <ButtonDisabled />,
  ButtonWithIcons: <ButtonWithIcons />,
  ButtonLoading: <ButtonLoading />,
  ButtonIconOnly: <ButtonIconOnly />,
  ButtonIconRounded: <ButtonIconRounded />,
  ButtonGroups: <ButtonGroups />,
});
