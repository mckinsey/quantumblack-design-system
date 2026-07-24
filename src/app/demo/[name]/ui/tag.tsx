'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { Tag, type TagProps, tagIconTone } from '@/components/ui/tag';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';
import { cn } from '@/lib/utils';

const basePath = import.meta.env.VITE_BASE_PATH ?? '';

function TagLeadingIcon({
  variant = 'primary',
  disabled,
}: {
  variant?: TagProps['variant'];
  disabled?: boolean;
}) {
  return (
    <IconShell
      size="sm"
      type={tagIconTone[variant ?? 'primary']}
      variant="primary"
      disabled={disabled}>
      <Icon icon="style" />
    </IconShell>
  );
}

/** Default tag with remove button */
export function TagDemo() {
  return (
    <Tag onRemove={() => console.log('Remove')}>
      <TagLeadingIcon />
      Default Tag
    </Tag>
  );
}

/** Tag variants - all button styles */
export function TagVariants() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-fg-tertiary text-sm">
        Leading IconShell type via tagIconTone — secondary uses neutral-inverse;
        others use neutral.
      </span>
      <div className="flex flex-wrap gap-3">
        <Tag variant="primary" onRemove={() => {}}>
          <TagLeadingIcon variant="primary" />
          Primary
        </Tag>
        <Tag variant="secondary" onRemove={() => {}}>
          <TagLeadingIcon variant="secondary" />
          Secondary
        </Tag>
        <Tag variant="accent" onRemove={() => {}}>
          <TagLeadingIcon variant="accent" />
          Accent
        </Tag>
        <Tag variant="outline" onRemove={() => {}}>
          <TagLeadingIcon variant="outline" />
          Outline
        </Tag>

        <Tag variant="accent-outline" onRemove={() => {}}>
          <TagLeadingIcon variant="accent-outline" />
          Accent Outline
        </Tag>
      </div>
    </div>
  );
}

/** Pill-shaped tags */
export function TagPill() {
  return (
    <div className="flex flex-wrap gap-3">
      <Tag variant="primary" pill onRemove={() => {}}>
        <TagLeadingIcon variant="primary" />
        Primary
      </Tag>
      <Tag variant="secondary" pill onRemove={() => {}}>
        <TagLeadingIcon variant="secondary" />
        Secondary
      </Tag>
      <Tag variant="accent" pill onRemove={() => {}}>
        <TagLeadingIcon variant="accent" />
        Accent
      </Tag>
      <Tag variant="outline" pill onRemove={() => {}}>
        <TagLeadingIcon variant="outline" />
        Outline
      </Tag>

      <Tag variant="accent-outline" pill onRemove={() => {}}>
        <TagLeadingIcon variant="accent-outline" />
        Accent Outline
      </Tag>
    </div>
  );
}

/** Tag sizes */
export function TagSizes() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-fg-tertiary text-sm">
          Default shape (4px padding)
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <Tag size="xs" onRemove={() => {}}>
            <TagLeadingIcon />
            Extra small
          </Tag>
          <Tag size="sm" onRemove={() => {}}>
            <TagLeadingIcon />
            Small
          </Tag>
          <Tag size="default" onRemove={() => {}}>
            <TagLeadingIcon />
            Default
          </Tag>
          <Tag size="lg" onRemove={() => {}}>
            <TagLeadingIcon />
            Large
          </Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-fg-tertiary text-sm">
          Pill shape (8px padding)
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <Tag size="xs" pill onRemove={() => {}}>
            <TagLeadingIcon />
            Extra small
          </Tag>
          <Tag size="sm" pill onRemove={() => {}}>
            <TagLeadingIcon />
            Small
          </Tag>
          <Tag size="default" pill onRemove={() => {}}>
            <TagLeadingIcon />
            Default
          </Tag>
          <Tag size="lg" pill onRemove={() => {}}>
            <TagLeadingIcon />
            Large
          </Tag>
        </div>
      </div>
    </div>
  );
}

const avatarInTag = 'shadow-none hover:shadow-none before:hidden';

/** Avatar image sizes in tag: small/regular = 20px, lg = 24px. */
const avatarInTagSmallRegular = 'size-5'; // 20px
const avatarInTagLg = 'size-6'; // 24px

/** Figma pill+avatar uses pl 4px / pr 8px; override via className (twMerge overrides px-2). */
const pillAvatarPadding = 'pl-1 pr-2';

const avatarEl = (
  src: string,
  fallback: string,
  size: 'sm' | 'default' | 'lg',
) => (
  <Avatar
    size={size === 'lg' ? 'sm' : 'xs'}
    className={cn(
      avatarInTag,
      size === 'lg' ? avatarInTagLg : avatarInTagSmallRegular,
    )}>
    <AvatarImage src={`${basePath}/users/${src}`} alt="User" />
    <AvatarFallback>{fallback}</AvatarFallback>
  </Avatar>
);

/** Tags with avatar — 8 variant combos: 4 non-pill + 4 pill (3 sizes sm/reg/lg only) */
export function TagWithAvatar() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-fg-tertiary text-sm">Default shape</span>
        <div className="flex flex-wrap items-center gap-3">
          <Tag variant="primary" onRemove={() => {}}>
            {avatarEl('avatar-6.jpg', 'AB', 'default')}
            Primary
          </Tag>

          <Tag variant="accent" onRemove={() => {}}>
            {avatarEl('avatar-7.jpg', 'CD', 'default')}
            Accent
          </Tag>

          <Tag variant="outline" onRemove={() => {}}>
            {avatarEl('avatar-3.jpg', 'EF', 'default')}
            Outline
          </Tag>

          <Tag variant="accent-outline" onRemove={() => {}}>
            {avatarEl('avatar-1.jpg', 'GH', 'default')}
            Accent Outline
          </Tag>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-fg-tertiary text-sm">Pill shape</span>
        <div className="flex flex-wrap items-center gap-3">
          <Tag
            variant="primary"
            pill
            className={pillAvatarPadding}
            onRemove={() => {}}>
            {avatarEl('avatar-6.jpg', 'AB', 'default')}
            Primary
          </Tag>

          <Tag
            variant="accent"
            pill
            className={pillAvatarPadding}
            onRemove={() => {}}>
            {avatarEl('avatar-7.jpg', 'CD', 'default')}
            Accent
          </Tag>

          <Tag
            variant="outline"
            pill
            className={pillAvatarPadding}
            onRemove={() => {}}>
            {avatarEl('avatar-3.jpg', 'EF', 'default')}
            Outline
          </Tag>

          <Tag
            variant="accent-outline"
            pill
            className={pillAvatarPadding}
            onRemove={() => {}}>
            {avatarEl('avatar-1.jpg', 'GH', 'default')}
            Accent Outline
          </Tag>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-fg-tertiary text-sm">
          Sizes (sm, default, lg)
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <Tag size="sm" onRemove={() => {}}>
            {avatarEl('avatar-5.jpg', 'IJ', 'sm')}
            Small
          </Tag>

          <Tag size="default" onRemove={() => {}}>
            {avatarEl('avatar-2.jpg', 'KL', 'default')}
            Default
          </Tag>

          <Tag size="lg" onRemove={() => {}}>
            {avatarEl('avatar-3.jpg', 'MN', 'lg')}
            Large
          </Tag>
        </div>
      </div>
    </div>
  );
}

/** Disabled tags */
export function TagDisabled() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-fg-tertiary text-sm">Default shape</span>
        <div className="flex flex-wrap items-center gap-3">
          <Tag variant="primary" disabled onRemove={() => {}}>
            <TagLeadingIcon variant="primary" disabled />
            Primary
          </Tag>

          <Tag variant="secondary" disabled onRemove={() => {}}>
            <TagLeadingIcon variant="secondary" disabled />
            Secondary
          </Tag>

          <Tag variant="accent" disabled onRemove={() => {}}>
            <TagLeadingIcon variant="accent" disabled />
            Accent
          </Tag>

          <Tag variant="outline" disabled onRemove={() => {}}>
            <TagLeadingIcon variant="outline" disabled />
            Outline
          </Tag>

          <Tag variant="accent-outline" disabled onRemove={() => {}}>
            <TagLeadingIcon variant="accent-outline" disabled />
            Accent Outline
          </Tag>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-fg-tertiary text-sm">Pill shape</span>
        <div className="flex flex-wrap items-center gap-3">
          <Tag variant="primary" pill disabled onRemove={() => {}}>
            <TagLeadingIcon variant="primary" disabled />
            Primary
          </Tag>

          <Tag variant="secondary" pill disabled onRemove={() => {}}>
            <TagLeadingIcon variant="secondary" disabled />
            Secondary
          </Tag>

          <Tag variant="accent" pill disabled onRemove={() => {}}>
            <TagLeadingIcon variant="accent" disabled />
            Accent
          </Tag>

          <Tag variant="outline" pill disabled onRemove={() => {}}>
            <TagLeadingIcon variant="outline" disabled />
            Outline
          </Tag>

          <Tag variant="accent-outline" pill disabled onRemove={() => {}}>
            <TagLeadingIcon variant="accent-outline" disabled />
            Accent Outline
          </Tag>
        </div>
      </div>
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'TagDemo',
    title: 'Default',
    description: 'Basic tag with icon and remove button.',
  },
  {
    name: 'TagVariants',
    title: 'Variants',
    description:
      'All style variants. Leading IconShell type comes from tagIconTone — secondary uses neutral-inverse; others use neutral.',
  },
  {
    name: 'TagPill',
    title: 'Pill Shape',
    description: 'Tags with rounded pill shape.',
  },
  { name: 'TagSizes', title: 'Sizes', description: 'Tag size options.' },
  {
    name: 'TagWithAvatar',
    title: 'With Avatar',
    description: 'Tags with avatar at each size.',
  },
  {
    name: 'TagDisabled',
    title: 'Disabled',
    description:
      'Disabled tags. Pass disabled to IconShell as well so the leading icon uses disabled opacity.',
  },
];

export const tag = createLegacyDemo('tag', examples, {
  TagDemo: <TagDemo />,
  TagVariants: <TagVariants />,
  TagPill: <TagPill />,
  TagSizes: <TagSizes />,
  TagWithAvatar: <TagWithAvatar />,
  TagDisabled: <TagDisabled />,
});
