// url=<QBDS_TAG_GROUP_DISMISSABLE>
// source=src/app/demo/[name]/ui/tag-group.tsx
// component=TagGroupDismissable
import figma from 'figma';

export default {
  example: figma.code`
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

      <Tag size="sm" onRemove={() => {}}>
        <IconShell size="sm" type="neutral" variant="primary">
          <Icon icon="style" />
        </IconShell>
        Label
      </Tag>
    </div>
  `,
  imports: [
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { Tag } from "@/components/ui/tag"',
  ],
  id: 'tag-group-dismissable',
  metadata: { nestable: false },
};
