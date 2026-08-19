// url=<QBDS_DIALOG_CONTENT>
// source=src/components/ui/dialog.tsx
// component=DialogBody
import figma from 'figma';

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'xs',
  md: 'sm',
  reg: 'default',
  lg: 'lg',
});

const description = instance.getString('description');
const hasContent = instance.getBoolean('hasContent');

const bodyClass =
  size === 'default' || size === 'lg'
    ? 'paragraph-large-primary'
    : 'paragraph-regular-primary';

const contentSlot = instance.getSlot('contentSlot');
const contentConnected = contentSlot?.connectedInstances ?? [];
const contentChildren =
  contentConnected.length > 0
    ? contentConnected.map(n => n.executeTemplate().example).flat()
    : [];

const descriptionBlock = figma.code`
  <DialogDescription>${description}</DialogDescription>
`;

const bodyContent =
  hasContent && contentChildren.length > 0
    ? figma.helpers.react.renderChildren(contentChildren)
    : hasContent
      ? figma.code`
          <p className="${bodyClass} text-fg-primary">${LOREM}</p>
        `
      : figma.code``;

export default {
  example: figma.code`
    <DialogBody>
      ${descriptionBlock}
      ${bodyContent}
    </DialogBody>
  `,
  imports: [
    'import { DialogBody, DialogDescription } from "@/components/ui/dialog"',
  ],
  id: 'dialog-content',
  metadata: { nestable: true },
};
