'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { Tag } from '@/components/ui/tag';
import { TagToggle } from '@/components/ui/tag-toggle';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';
import { cn } from '@/lib/utils';

const basePath = import.meta.env.VITE_BASE_PATH ?? '';

/** Dismissable tag groups across sizes and shape/outline combos */
export function TagGroupDismissable() {
  const sizes = [
    { size: 'default' as const, label: 'Regular' },
    { size: 'lg' as const, label: 'Large' },
    { size: 'sm' as const, label: 'Small' },
    { size: 'xs' as const, label: 'Extra small' },
  ];

  const rows = [
    { variant: 'primary' as const, pill: false },
    { variant: 'primary' as const, pill: true },
    { variant: 'outline' as const, pill: false },
    { variant: 'outline' as const, pill: true },
  ];

  const labels = ['Label', 'Label', 'Label', 'Label'];

  return (
    <div className="flex flex-col gap-6">
      {sizes.map(({ size, label }) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-fg-tertiary text-sm">{label}</span>
          {rows.map(({ variant, pill }) => (
            <div key={`${variant}-${pill}`} className="flex flex-wrap gap-2">
              {labels.map((text, i) => (
                <Tag
                  key={i}
                  size={size}
                  pill={pill}
                  variant={variant}
                  onRemove={() => {}}>
                  <IconShell size="sm">
                    <Icon icon="style" />
                  </IconShell>
                  {text}
                </Tag>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Dismissable tag groups with avatars across sizes and shape/outline combos */
export function TagGroupAvatarDismissable() {
  const sizes = [
    { size: 'default' as const, label: 'Regular' },
    { size: 'lg' as const, label: 'Large' },
    { size: 'sm' as const, label: 'Small' },
  ];

  const rows = [
    { variant: 'primary' as const, pill: false },
    { variant: 'primary' as const, pill: true },
    { variant: 'outline' as const, pill: false },
    { variant: 'outline' as const, pill: true },
  ];

  const items = [
    { src: 'avatar-1.jpg', fallback: 'AB' },
    { src: 'avatar-2.jpg', fallback: 'CD' },
    { src: 'avatar-3.jpg', fallback: 'EF' },
    { src: 'avatar-5.jpg', fallback: 'GH' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {sizes.map(({ size, label }) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-fg-tertiary text-sm">{label}</span>
          {rows.map(({ variant, pill }) => (
            <div key={`${variant}-${pill}`} className="flex flex-wrap gap-2">
              {items.map(({ src, fallback }, i) => (
                <Tag
                  key={i}
                  size={size}
                  pill={pill}
                  variant={variant}
                  className={cn(pill && 'pr-2 pl-1')}
                  onRemove={() => {}}>
                  <Avatar
                    size={size === 'lg' ? 'sm' : 'xs'}
                    className={cn(
                      'shadow-none before:hidden hover:shadow-none',
                      size === 'lg' ? 'size-6' : 'size-5',
                    )}>
                    <AvatarImage src={`${basePath}/users/${src}`} alt="User" />
                    <AvatarFallback>{fallback}</AvatarFallback>
                  </Avatar>
                  Label
                </Tag>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Toggle tags group across sizes and shape/outline combos */
export function TagToggleGroup() {
  const sizes = [
    { size: 'default' as const, label: 'Regular' },
    { size: 'lg' as const, label: 'Large' },
    { size: 'sm' as const, label: 'Small' },
    { size: 'xs' as const, label: 'Extra small' },
  ];

  const rows = [
    { variant: 'default' as const, pill: false },
    { variant: 'default' as const, pill: true },
    { variant: 'outline' as const, pill: false },
    { variant: 'outline' as const, pill: true },
  ];

  const labels = ['Label', 'Label', 'Label', 'Label'];

  return (
    <div className="flex flex-col gap-6">
      {sizes.map(({ size, label }) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-fg-tertiary text-sm">{label}</span>
          {rows.map(({ variant, pill }) => (
            <div key={`${variant}-${pill}`} className="flex flex-wrap gap-2">
              {labels.map((text, i) => (
                <TagToggle key={i} size={size} pill={pill} variant={variant}>
                  <IconShell size="sm">
                    <Icon icon="style" />
                  </IconShell>
                  {text}
                </TagToggle>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'TagGroupDismissable',
    title: 'Dismissable',
    description:
      'Groups of dismissable tags across sizes, shapes, and outlines.',
  },
  {
    name: 'TagGroupAvatarDismissable',
    title: 'With Avatar',
    description: 'Groups of dismissable tags with avatars.',
  },
  {
    name: 'TagToggleGroup',
    title: 'Toggle Tags group',
    description:
      'Groups of toggleable tags across sizes, shapes, and outlines.',
  },
];

export const tagGroup = createLegacyDemo('tag-group', examples, {
  TagGroupDismissable: <TagGroupDismissable />,
  TagGroupAvatarDismissable: <TagGroupAvatarDismissable />,
  TagToggleGroup: <TagToggleGroup />,
});
