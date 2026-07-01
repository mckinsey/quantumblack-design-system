// url=<QBDS_BUTTON_GROUP>
// source=src/components/ui/button-group.tsx
// component=ButtonGroup
import figma from 'figma';

const instance = figma.selectedInstance;

const buttons = instance.findConnectedInstances(
  node => node.codeConnectId?.() === 'button-text',
  { traverseInstances: true },
);

let firstCode: figma.ResultSection[] = [];
let secondCode: figma.ResultSection[] = [];

const first = buttons[0];
const second = buttons[1];

if (first && first.type === 'INSTANCE') {
  firstCode = first.executeTemplate().example;
}

if (second && second.type === 'INSTANCE') {
  secondCode = second.executeTemplate().example;
}

export default {
  example: figma.code`
    <ButtonGroup>
      ${firstCode}
      ${secondCode}
    </ButtonGroup>
  `,
  imports: [
    'import { ButtonGroup } from "@/components/ui/button-group"',
    'import { Button } from "@/components/ui/button"',
  ],
  id: 'button-group',
  metadata: { nestable: true },
};
