// url=<QBDS_BUTTON_GROUP>
// source=src/components/ui/button-group.tsx
// component=ButtonGroup
import figma from 'figma';

// ButtonsGroup/CTAs is a 2-button CTA pair in Figma (primary + alternate).
// Nested Button instances resolve via their own Code Connect (button-text).
const buttons = figma.properties.children(['Button']);

export default {
  example: figma.code`
    <ButtonGroup>
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
