// url=<QBDS_TAG_GROUP_DISMISSABLE>
// source=src/app/demo/[name]/ui/tag-group.tsx
// component=TagGroupDismissable
import figma from 'figma';

const tags = figma.properties.children(['Tag-Dismissable']);

export default {
  example: figma.code`
    <div className="flex flex-wrap gap-2">
      ${figma.helpers.react.renderChildren(tags)}
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
