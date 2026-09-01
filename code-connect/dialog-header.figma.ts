// url=<QBDS_DIALOG_HEADER>
// source=src/components/ui/dialog.tsx
// component=DialogHeader
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'xs',
  md: 'sm',
  reg: 'default',
  lg: 'lg',
});

const title = instance.getString('title');
const hasContextLabel = instance.getBoolean('hasContextLabel');
const hasIcon = instance.getBoolean('hasIcon');

const iconShellSize = size === 'default' || size === 'lg' ? 'lg' : 'default';

const contextSlot = instance.getSlot('contextLabelSlot');
const contextConnected = contextSlot?.connectedInstances ?? [];

const contextLabel = hasContextLabel
  ? contextConnected.length > 0
    ? figma.helpers.react.renderChildren(
        contextConnected.map(n => n.executeTemplate().example).flat(),
      )
    : figma.code`<DialogContextLabel>CONTEXT LABEL</DialogContextLabel>`
  : figma.code``;

const titleBlock = hasIcon
  ? figma.code`
      <div className="flex w-full min-w-0 items-start gap-3">
        <IconShell size="${iconShellSize}" type="neutral" variant="primary">
          <Icon icon="backup" />
        </IconShell>
        <DialogTitle>${title}</DialogTitle>
      </div>
    `
  : figma.code`<DialogTitle>${title}</DialogTitle>`;

export default {
  example: figma.code`
    <DialogHeader>
      ${contextLabel}
      ${titleBlock}
    </DialogHeader>
  `,
  imports: [
    'import { DialogContextLabel, DialogHeader, DialogTitle } from "@/components/ui/dialog"',
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
  ],
  id: 'dialog-header',
  metadata: { nestable: true },
};
