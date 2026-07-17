// url=<QBDS_AVATAR>
// source=src/components/ui/avatar.tsx
// component=Avatar
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  'xxs-20': 'xxs',
  'xsm-24': 'xs',
  'sm-28': 'sm',
  'reg-36': 'default',
  'lg-48': 'lg',
  'xlg-64': 'xl',
});

const disabled = instance.getEnum('state', {
  enabled: false,
  hover: false,
  focused: false,
  pressed: false,
  disabled: true,
});

const showPhoto = instance.getBoolean('showPhoto');
const showUserInitials = instance.getBoolean('showUserInitials');
const showIcon = instance.getBoolean('showIcon');
const showCounterTop = instance.getBoolean('showCounterTop');
const showStatus = instance.getBoolean('showStatus');

const initials =
  size === 'xxs'
    ? instance.getString('userInitial')
    : instance.getString('userInitials');

const photoBlock = showPhoto
  ? figma.code`<AvatarImage src="" />`
  : figma.code``;

const iconNode = showIcon ? instance.findInstance('IconShell') : null;
let iconBlock: figma.ResultSection[] = [];

if (iconNode?.type === 'INSTANCE') {
  iconBlock = iconNode.executeTemplate().example;
}

const fallbackBlock = showUserInitials
  ? figma.code`<AvatarFallback>${initials}</AvatarFallback>`
  : figma.code``;

const counterBlock = showCounterTop
  ? figma.code`
      <NumericBadge
        variant="primary"
        className="absolute -top-1 -right-1 font-mono tabular-nums">
        9
      </NumericBadge>
    `
  : figma.code``;

const statusBlock = showStatus
  ? figma.code`
      <StatusBadge
        variant="success"
        className="absolute -right-0.5 -bottom-0.5"
      />
    `
  : figma.code``;

const needsWrap = showCounterTop || showStatus;

const avatarInner = figma.code`
  <Avatar${figma.helpers.react.renderProp('size', size)}${disabled ? ' disabled' : ''}>
    ${photoBlock}
    ${iconBlock}
    ${fallbackBlock}
  </Avatar>
`;

export default {
  example: needsWrap
    ? figma.code`
    <div className="relative w-fit">
      ${avatarInner}
      ${counterBlock}
      ${statusBlock}
    </div>
  `
    : avatarInner,
  imports: [
    'import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"',
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { NumericBadge, StatusBadge } from "@/components/ui/badge"',
  ],
  id: 'avatar',
  metadata: { nestable: true },
};
