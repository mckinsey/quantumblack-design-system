// url=<QBDS_TAGS_DISMISSABLE_SLOT>
// source=src/app/demo/[name]/ui/tag-group.tsx
// component=TagsDismissable
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
  id: 'tags-dismissable-slot',
  metadata: { nestable: false },
};
