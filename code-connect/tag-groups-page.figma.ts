// url=<QBDS_TAG_GROUPS_PAGE>
// source=src/app/demo/[name]/ui/tag-group.tsx
// component=TagGroupsPage
import figma from 'figma';

export default {
  example: figma.code`
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        <Tag onRemove={() => {}}>
          <IconShell size="sm" type="neutral" variant="primary">
            <Icon icon="style" />
          </IconShell>
          Label
        </Tag>

        <Tag variant="outline" pill onRemove={() => {}}>
          <IconShell size="sm" type="neutral" variant="primary">
            <Icon icon="style" />
          </IconShell>
          Label
        </Tag>
      </div>

      <div className="flex flex-wrap gap-2">
        <TagToggle>
          <IconShell size="sm" type="neutral" variant="primary">
            <Icon icon="style" />
          </IconShell>
          Label
        </TagToggle>

        <TagToggle variant="outline" pill>
          <IconShell size="sm" type="neutral" variant="primary">
            <Icon icon="style" />
          </IconShell>
          Label
        </TagToggle>
      </div>

      <div className="flex flex-wrap gap-2">
        <Tag className="pl-1 pr-2" onRemove={() => {}}>
          <Avatar
            size="xs"
            className="size-5 shadow-none before:hidden hover:shadow-none">
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          Label
        </Tag>
      </div>
    </div>
  `,
  imports: [
    'import { Avatar, AvatarFallback } from "@/components/ui/avatar"',
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { Tag } from "@/components/ui/tag"',
    'import { TagToggle } from "@/components/ui/tag-toggle"',
  ],
  id: 'tag-groups-page',
  metadata: { nestable: false },
};
