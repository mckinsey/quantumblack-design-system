// url=<QBDS_BUTTON_GROUP>
// source=src/components/ui/button-group.tsx
// component=ButtonGroup
import figma from 'figma';

const buttons = figma.properties.children(['Button']);

export default {
  example: figma.code`
    <ButtonGroup spacing="spaced">
      ${figma.helpers.react.renderChildren(buttons)}
    </ButtonGroup>
  `,
  imports: [
    'import { ButtonGroup } from "@/components/ui/button-group"',
    'import { Button } from "@/components/ui/button"',
  ],
  id: 'button-group',
  metadata: { nestable: true },
};
