// url=<QBDS_TAG_GROUP_AVATAR>
// source=src/app/demo/[name]/ui/tag-group.tsx
// component=TagGroupAvatarDismissable
import figma from 'figma';

const tags = figma.properties.children(['Tag-Avatar-Dismissable']);

export default {
  example: figma.code`
    <div className="flex flex-wrap gap-2">
      ${figma.helpers.react.renderChildren(tags)}
    </div>
  `,
  imports: [
    'import { Avatar, AvatarFallback } from "@/components/ui/avatar"',
    'import { Tag } from "@/components/ui/tag"',
  ],
  id: 'tag-group-avatar',
  metadata: { nestable: false },
};
