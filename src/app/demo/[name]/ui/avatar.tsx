import { type ReactNode, useState } from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@/components/ui/avatar';
import { NumericBadge, StatusBadge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tag } from '@/components/ui/tag';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';
import { cn } from '@/lib/utils';

const basePath = import.meta.env.VITE_BASE_PATH ?? '';

/** Default avatar with image */
export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src={`${basePath}/users/avatar-1.jpg`} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

const avatarSizes = ['xxs', 'xs', 'sm', 'default', 'lg', 'xl'] as const;

/** Renders avatars across all sizes, optionally with an image */
function AvatarSizeRow({ showImage }: { showImage?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      {avatarSizes.map(size => (
        <Avatar key={size} size={size === 'default' ? undefined : size}>
          {showImage && <AvatarImage src={`${basePath}/users/avatar-1.jpg`} />}
          <AvatarFallback>{size === 'xxs' ? 'C' : 'CN'}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

/** All avatar sizes with images */
export function AvatarSizes() {
  return <AvatarSizeRow showImage />;
}

/** Avatars with fallback initials (no image) */
export function AvatarFallbacks() {
  return <AvatarSizeRow />;
}

const AVATAR_IMG = `${basePath}/users/avatar-1.jpg`;

/** Disabled avatar states */
export function AvatarDisabled() {
  const sizes = ['sm', undefined, 'lg'] as const;
  return (
    <div className="flex items-center gap-4">
      {sizes.map((size, i) => (
        <Avatar key={i} disabled size={size ?? undefined}>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

/** Avatars with tooltip on hover */
export function AvatarWithTooltip() {
  const items = [
    { size: 'sm' as const, showImage: true, tooltip: 'Cool person' },
    { size: undefined, showImage: false, tooltip: 'Chuck Norris' },
    { size: 'lg' as const, showImage: true, tooltip: 'Cool person' },
  ];
  return (
    <div className="flex items-center gap-4">
      {items.map((item, i) => (
        <Tooltip key={i}>
          <TooltipTrigger asChild>
            <Avatar size={item.size}>
              {item.showImage && <AvatarImage src={AVATAR_IMG} />}
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>{item.tooltip}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

/** Avatars with notification count badge */
export function AvatarWithCount() {
  const items = [
    { avatarSize: undefined, badgeSize: 'sm' as const },
    { avatarSize: 'lg' as const, badgeSize: 'default' as const },
    { avatarSize: 'xl' as const, badgeSize: 'lg' as const },
  ];
  return (
    <div className="flex items-center gap-6">
      {items.map((item, i) => (
        <div key={i} className="relative">
          <Avatar size={item.avatarSize}>
            <AvatarImage src={AVATAR_IMG} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <NumericBadge
            variant="primary"
            size={item.badgeSize}
            className="absolute -top-1 -right-1 font-mono tabular-nums">
            9
          </NumericBadge>
        </div>
      ))}
    </div>
  );
}

/** Avatars with online status indicator */
export function AvatarWithStatus() {
  const sizes = ['sm', undefined, 'lg', 'xl'] as const;
  return (
    <div className="flex items-center gap-6">
      {sizes.map((size, i) => (
        <div key={i} className="relative">
          <Avatar size={size ?? undefined}>
            <AvatarImage src={AVATAR_IMG} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <StatusBadge
            variant="success"
            size={size ?? 'default'}
            className="absolute -right-0.5 -bottom-0.5"
          />
        </div>
      ))}
    </div>
  );
}

/** Group of stacked avatars with overflow counter */
export function AvatarGroupStacked() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src={`${basePath}/users/avatar-4.jpg`} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src={`${basePath}/users/avatar-5.jpg`} alt="@maxleiter" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src={`${basePath}/users/avatar-6.jpg`} alt="@evilrabbit" />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  );
}

const USERS = [
  {
    id: 1,
    name: 'First/Last Name',
    role: 'Research Science Analyst',
    avatar: `${basePath}/users/avatar-1.jpg`,
  },
  {
    id: 2,
    name: 'First/Last Name',
    role: 'Research Science Analyst',
    avatar: `${basePath}/users/avatar-2.jpg`,
  },
  {
    id: 3,
    name: 'First/Last Name',
    role: 'Research Science Analyst',
    avatar: `${basePath}/users/avatar-3.jpg`,
  },
];

const ROW_HOVER =
  'cursor-pointer transition-colors hover:bg-stateslayer-overlay-hover active:bg-stateslayer-overlay-pressed';

type User = { id: number; name: string; role: string; avatar: string };

type ListItemSize = 'xs' | 'sm' | 'default' | 'lg';

function initials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('');
}

function AvatarListItem({
  user,
  size,
  leading,
  trailing,
  className,
  onClick,
}: {
  user: User;
  size: ListItemSize;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const showDescription = size === 'default' || size === 'lg';
  const avatarSize = size === 'default' ? undefined : size;

  return (
    <div
      onClick={onClick}
      className={cn(
        'border-stroke-divider flex items-center border-b',
        size === 'lg' ? 'gap-4' : 'gap-3',
        className,
      )}>
      {leading}

      <Avatar size={avatarSize}>
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{initials(user.name)}</AvatarFallback>
      </Avatar>

      {showDescription ? (
        <div
          className={cn(
            'flex min-w-0 flex-1 flex-col',
            size === 'lg' && 'gap-0.5',
          )}>
          <span
            className={cn(
              'text-fg-primary truncate',
              size === 'lg'
                ? 'paragraph-large-primary'
                : 'paragraph-regular-primary',
            )}>
            {user.name}
          </span>
          <span
            className={cn(
              'text-fg-secondary truncate',
              size === 'lg'
                ? 'paragraph-regular-primary'
                : 'paragraph-small-primary',
            )}>
            {user.role}
          </span>
        </div>
      ) : (
        <span className="paragraph-small-primary text-fg-primary min-w-0 flex-1 truncate">
          {user.name}
        </span>
      )}

      {trailing}
    </div>
  );
}

const checkboxRowClass: Record<ListItemSize, string> = {
  xs: 'px-2 pt-2 pb-1',
  sm: 'px-2 pt-2 pb-1',
  default: 'pt-2 pr-1 pb-1 pl-2',
  lg: 'pt-2 pr-1 pb-1 pl-3',
};

const radioRowClass: Record<ListItemSize, string> = {
  xs: `px-2 py-2 ${ROW_HOVER}`,
  sm: `px-2 py-2 ${ROW_HOVER}`,
  default: `py-2 pr-1 pl-2 ${ROW_HOVER}`,
  lg: `py-2 pr-1 pl-3 ${ROW_HOVER}`,
};

const checkIconSize: Record<ListItemSize, string> = {
  xs: 'size-4',
  sm: 'size-4',
  default: 'size-5',
  lg: 'size-6',
};

const listWidth: Record<ListItemSize, string> = {
  xs: 'w-60',
  sm: 'w-60',
  default: 'w-60',
  lg: 'w-80',
};

const checkboxSize: Record<ListItemSize, 'default' | 'lg'> = {
  xs: 'default',
  sm: 'default',
  default: 'default',
  lg: 'lg',
};

const LIST_SIZES: ListItemSize[] = ['xs', 'sm', 'default', 'lg'];

/** Checkbox people-picker lists across all 4 sizes */
export function AvatarCheckboxList() {
  return (
    <div className="grid grid-cols-2 items-start gap-8">
      {LIST_SIZES.map(size => (
        <div key={size} className={`flex flex-col ${listWidth[size]}`}>
          {USERS.map(user => (
            <AvatarListItem
              key={user.id}
              user={user}
              size={size}
              className={checkboxRowClass[size]}
              leading={<Checkbox size={checkboxSize[size]} />}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Radio people-picker lists across all 4 sizes */
export function AvatarRadioList() {
  const [selected, setSelected] = useState<Record<ListItemSize, number | null>>(
    { xs: 1, sm: 1, default: 1, lg: 1 },
  );

  return (
    <div className="grid grid-cols-2 items-start gap-8">
      {LIST_SIZES.map(size => (
        <div key={size} className={`flex flex-col ${listWidth[size]}`}>
          {USERS.map(user => (
            <AvatarListItem
              key={user.id}
              user={user}
              size={size}
              className={radioRowClass[size]}
              onClick={() =>
                setSelected(prev => ({ ...prev, [size]: user.id }))
              }
              trailing={
                selected[size] === user.id ? (
                  <Icon
                    icon="check"
                    className={`text-fill-active shrink-0 ${checkIconSize[size]}`}
                  />
                ) : undefined
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const PICKER_USERS: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Product Designer',
    avatar: `${basePath}/users/avatar-1.jpg`,
  },
  {
    id: 2,
    name: 'Bob Williams',
    role: 'Software Engineer',
    avatar: `${basePath}/users/avatar-2.jpg`,
  },
  {
    id: 3,
    name: 'Carol Martinez',
    role: 'Research Analyst',
    avatar: `${basePath}/users/avatar-3.jpg`,
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Data Scientist',
    avatar: `${basePath}/users/avatar-4.jpg`,
  },
  {
    id: 5,
    name: 'Emma Brown',
    role: 'UX Researcher',
    avatar: `${basePath}/users/avatar-5.jpg`,
  },
];

const pickerItems = PICKER_USERS.map(u => ({
  value: String(u.id),
  label: u.name,
}));

/** Single-select people picker using Select */
export function AvatarPickerSingle() {
  const [value, setValue] = useState<string>('');

  const selectedUser = PICKER_USERS.find(u => String(u.id) === value);

  return (
    <Select
      items={pickerItems}
      value={value}
      onValueChange={v => setValue(v as string)}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a person">
          {selectedUser ? (
            <span className="flex items-center gap-2">
              <Avatar size="xs">
                <AvatarImage src={selectedUser.avatar} />
                <AvatarFallback>{initials(selectedUser.name)}</AvatarFallback>
              </Avatar>
              <span className="truncate">{selectedUser.name}</span>
            </span>
          ) : null}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {PICKER_USERS.map(user => (
          <SelectItem key={user.id} value={String(user.id)}>
            <Avatar size="sm">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{initials(user.name)}</AvatarFallback>
            </Avatar>

            <SelectItemText>{user.name}</SelectItemText>

            <SelectItemIndicator>
              <IconShell size="sm" variant="primary">
                <Icon icon="check" />
              </IconShell>
            </SelectItemIndicator>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/** Multi-select people picker using Select with checkboxes */
export function AvatarPickerMultiple() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Select
      multiple
      items={pickerItems}
      value={value}
      onValueChange={v => setValue(v as string[])}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select people">
          {value.length > 0 ? (
            <span className="flex items-center gap-2">
              <Tag
                variant="secondary"
                size="xs"
                pill
                onRemove={e => {
                  e.stopPropagation();
                  setValue([]);
                }}>
                <span className="pl-1">{value.length}</span>
              </Tag>
              <span className="truncate">people selected</span>
            </span>
          ) : null}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {PICKER_USERS.map(user => (
          <SelectItem key={user.id} value={String(user.id)}>
            <Checkbox
              size="default"
              checked={value.includes(String(user.id))}
              onCheckedChange={() => {}}
              tabIndex={-1}
              className="pointer-events-none"
            />

            <Avatar size="sm">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{initials(user.name)}</AvatarFallback>
            </Avatar>

            <SelectItemText>{user.name}</SelectItemText>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// NOSONAR - Intentional duplication of example metadata pattern across demo files
export const examples: DemoExample[] = [
  {
    name: 'AvatarDemo',
    title: 'Default',
    description: 'Basic avatar with image and fallback.',
  },
  {
    name: 'AvatarSizes',
    title: 'Sizes',
    description: 'Avatar sizes from xxs to xl.',
  },
  {
    name: 'AvatarFallbacks',
    title: 'Fallback Initials',
    description: 'Avatars without images showing initials.',
  },
  {
    name: 'AvatarDisabled',
    title: 'Disabled',
    description: 'Disabled avatar states.',
  },
  {
    name: 'AvatarWithTooltip',
    title: 'With Tooltip',
    description: 'Avatars with tooltip on hover.',
  },
  {
    name: 'AvatarWithCount',
    title: 'With Count Badge',
    description: 'Avatars with notification count badge.',
  },
  {
    name: 'AvatarWithStatus',
    title: 'With Status',
    description: 'Avatars with online status indicator.',
  },
  {
    name: 'AvatarGroupStacked',
    title: 'Group Stacked',
    description: 'Group of stacked avatars with overflow counter.',
  },
  {
    name: 'AvatarCheckboxList',
    title: 'Checkbox List',
    description:
      'People-picker lists with checkbox across all 4 sizes (xsm, sm, default, lg).',
  },
  {
    name: 'AvatarRadioList',
    title: 'Radio List',
    description:
      'Selectable people-picker lists with checkmark indicator across all 4 sizes.',
  },
  {
    name: 'AvatarPickerSingle',
    title: 'People Picker — Single',
    description:
      'Single-select people picker in a dropdown popover with avatar and checkmark.',
  },
  {
    name: 'AvatarPickerMultiple',
    title: 'People Picker — Multiple',
    description:
      'Multi-select people picker in a dropdown popover with checkboxes and avatar stack.',
  },
];

export const avatar = createLegacyDemo('avatar', examples, {
  AvatarDemo: <AvatarDemo />,
  AvatarSizes: <AvatarSizes />,
  AvatarFallbacks: <AvatarFallbacks />,
  AvatarDisabled: <AvatarDisabled />,
  AvatarWithTooltip: <AvatarWithTooltip />,
  AvatarWithCount: <AvatarWithCount />,
  AvatarWithStatus: <AvatarWithStatus />,
  AvatarGroupStacked: <AvatarGroupStacked />,
  AvatarCheckboxList: <AvatarCheckboxList />,
  AvatarRadioList: <AvatarRadioList />,
  AvatarPickerSingle: <AvatarPickerSingle />,
  AvatarPickerMultiple: <AvatarPickerMultiple />,
});
