// url=<QBDS_DIALOG>
// source=src/components/ui/dialog.tsx
// component=DialogContent
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

const headerInst = instance.findInstance('baseDialog/Header', {
  traverseInstances: true,
});
const contentInst = instance.findInstance('baseDialog/Content', {
  traverseInstances: true,
});
const footerInst = instance.findInstance('baseDialog/Footer', {
  traverseInstances: true,
});

const title =
  headerInst?.type === 'INSTANCE'
    ? headerInst.getString('title')
    : 'Modal title';

const hasContextLabel =
  headerInst?.type === 'INSTANCE'
    ? headerInst.getBoolean('hasContextLabel')
    : true;

const hasIcon =
  headerInst?.type === 'INSTANCE' ? headerInst.getBoolean('hasIcon') : true;

const description =
  contentInst?.type === 'INSTANCE'
    ? contentInst.getString('description')
    : 'Optional intro message that appears above the body slot. Use it to set context for the action or summarise concisely the important details';

const hasContent =
  contentInst?.type === 'INSTANCE'
    ? contentInst.getBoolean('hasContent')
    : true;

const hasFooterLink =
  footerInst?.type === 'INSTANCE'
    ? footerInst.getBoolean('hasFooterLink')
    : true;

const hasFooterActions =
  footerInst?.type === 'INSTANCE'
    ? footerInst.getBoolean('hasFooterActions')
    : true;

const iconShellSize = size === 'default' || size === 'lg' ? 'lg' : 'default';
const btnSize = size === 'lg' ? 'lg' : 'default';
const bodyClass =
  size === 'default' || size === 'lg'
    ? 'paragraph-large-primary'
    : 'paragraph-regular-primary';

const contentInstHandle =
  contentInst?.type === 'INSTANCE' ? contentInst : undefined;
const contentSlot = contentInstHandle?.getSlot('contentSlot');
const contentConnected = contentSlot?.connectedInstances ?? [];
const contentChildren =
  contentConnected.length > 0
    ? contentConnected.map(n => n.executeTemplate().example).flat()
    : [];

const footerInstHandle =
  footerInst?.type === 'INSTANCE' ? footerInst : undefined;
const footerLinkSlot = footerInstHandle?.getSlot('footerLinkSlot');
const footerLinkConnected = footerLinkSlot?.connectedInstances ?? [];

const footerActionsSlot = footerInstHandle?.getSlot('footerActionsSlot');
const footerActionsConnected = footerActionsSlot?.connectedInstances ?? [];
const footerActionsFallback = figma.properties.children(['ButtonsGroup/CTAs']);
const footerActionsNodes =
  footerActionsConnected.length > 0
    ? footerActionsConnected.map(n => n.executeTemplate().example).flat()
    : footerActionsFallback;

const contextLabel = hasContextLabel
  ? figma.code`<DialogContextLabel>CONTEXT LABEL</DialogContextLabel>`
  : figma.code``;

const titleBlock = hasIcon
  ? figma.code`
      <DialogTitle
        icon={
          <IconShell size="${iconShellSize}" type="neutral" variant="primary">
            <Icon icon="backup" />
          </IconShell>
        }>
        ${title}
      </DialogTitle>
    `
  : figma.code`<DialogTitle>${title}</DialogTitle>`;

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

const footerLinkBlock = hasFooterLink
  ? footerLinkConnected.length > 0
    ? figma.code`
        <DialogFooterLink>
          ${figma.helpers.react.renderChildren(
            footerLinkConnected.map(n => n.executeTemplate().example).flat(),
          )}
        </DialogFooterLink>
      `
    : figma.code`
        <DialogFooterLink>
          <Button variant="ghost" size="${btnSize}">
            Learn more
          </Button>
        </DialogFooterLink>
      `
  : figma.code``;

const footerActionsBlock = hasFooterActions
  ? footerActionsConnected.length > 0 ||
    (Array.isArray(footerActionsFallback) && footerActionsFallback.length > 0)
    ? figma.code`
        <DialogFooterActions>
          ${figma.helpers.react.renderChildren(footerActionsNodes)}
        </DialogFooterActions>
      `
    : figma.code`
        <DialogFooterActions>
          <ButtonGroup spacing="spaced">
            <DialogClose render={<Button variant="outline" size="${btnSize}" />}>
              Close
            </DialogClose>
            <DialogClose render={<Button variant="default" size="${btnSize}" />}>
              Submit
            </DialogClose>
          </ButtonGroup>
        </DialogFooterActions>
      `
  : figma.code``;

export default {
  example: figma.code`
    <DialogContent size="${size}">
      <DialogHeader>
        ${contextLabel}
        ${titleBlock}
      </DialogHeader>
      <DialogBody>
        ${descriptionBlock}
        ${bodyContent}
      </DialogBody>
      <DialogFooter>
        ${footerLinkBlock}
        ${footerActionsBlock}
      </DialogFooter>
    </DialogContent>
  `,
  imports: [
    'import { Button } from "@/components/ui/button"',
    'import { ButtonGroup } from "@/components/ui/button-group"',
    'import { DialogBody, DialogClose, DialogContent, DialogContextLabel, DialogDescription, DialogFooter, DialogFooterActions, DialogFooterLink, DialogHeader, DialogTitle } from "@/components/ui/dialog"',
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
  ],
  id: 'dialog',
  metadata: { nestable: true },
};
