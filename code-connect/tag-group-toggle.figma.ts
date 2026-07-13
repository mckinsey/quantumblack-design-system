// url=<QBDS_TAG_GROUP_TOGGLE>
// source=src/app/demo/[name]/ui/tag-group.tsx
// component=TagToggleGroup
import figma from 'figma';

export default {
  example: figma.code`
    <div className="flex flex-wrap gap-2">
      <TagToggle>
        <IconShell size="sm" type="neutral" variant="primary">
          <Icon icon="style" />
        </IconShell>
        Label
      </TagToggle>

      <TagToggle pill>
        <IconShell size="sm" type="neutral" variant="primary">
          <Icon icon="style" />
        </IconShell>
        Label
      </TagToggle>

      <TagToggle variant="outline">
        <IconShell size="sm" type="neutral" variant="primary">
          <Icon icon="style" />
        </IconShell>
        Label
      </TagToggle>
    </div>
  `,
  imports: [
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { TagToggle } from "@/components/ui/tag-toggle"',
  ],
  id: 'tag-group-toggle',
  metadata: { nestable: false },
};
