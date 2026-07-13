// url=<QBDS_TAG_GROUP_AVATAR>
// source=src/app/demo/[name]/ui/tag-group.tsx
// component=TagGroupAvatarDismissable
import figma from 'figma';

export default {
  example: figma.code`
    <div className="flex flex-wrap gap-2">
      <Tag className="pl-1 pr-2" onRemove={() => {}}>
        <Avatar size="xs" className="size-5 shadow-none before:hidden hover:shadow-none">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        Label
      </Tag>

      <Tag variant="outline" pill className="pl-1 pr-2" onRemove={() => {}}>
        <Avatar size="xs" className="size-5 shadow-none before:hidden hover:shadow-none">
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
        Label
      </Tag>
    </div>
  `,
  imports: [
    'import { Avatar, AvatarFallback } from "@/components/ui/avatar"',
    'import { Tag } from "@/components/ui/tag"',
  ],
  id: 'tag-group-avatar',
  metadata: { nestable: false },
};
