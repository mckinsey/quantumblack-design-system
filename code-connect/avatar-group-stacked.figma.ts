// url=<QBDS_AVATAR_GROUP_STACKED>
// source=src/components/ui/avatar.tsx
// component=AvatarGroup
import figma from 'figma';

const instance = figma.selectedInstance;

const showOverflow = instance.getBoolean('showOverflowCounter');

const avatars = figma.properties.children(['Avatar']);

const overflowBlock = showOverflow
  ? figma.code`<AvatarGroupCount>+3</AvatarGroupCount>`
  : figma.code``;

export default {
  example: figma.code`
    <AvatarGroup>
      ${figma.helpers.react.renderChildren(avatars)}
      ${overflowBlock}
    </AvatarGroup>
  `,
  imports: [
    'import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar"',
  ],
  id: 'avatar-group-stacked',
  metadata: { nestable: false },
};
