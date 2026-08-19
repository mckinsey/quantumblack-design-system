// url=<QBDS_DIALOG_FOOTER>
// source=src/components/ui/dialog.tsx
// component=DialogFooter
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'xs',
  md: 'sm',
  reg: 'default',
  lg: 'lg',
});

const hasFooterLink = instance.getBoolean('hasFooterLink');
const hasFooterActions = instance.getBoolean('hasFooterActions');

const btnSize = size === 'lg' ? 'lg' : 'default';

const footerLinkSlot = instance.getSlot('footerLinkSlot');
const footerLinkConnected = footerLinkSlot?.connectedInstances ?? [];

const footerActionsSlot = instance.getSlot('footerActionsSlot');
const footerActionsConnected = footerActionsSlot?.connectedInstances ?? [];
const footerActionsFallback = figma.properties.children(['ButtonsGroup/CTAs']);
const footerActionsNodes =
  footerActionsConnected.length > 0
    ? footerActionsConnected.map(n => n.executeTemplate().example).flat()
    : footerActionsFallback;

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
    <DialogFooter>
      ${footerLinkBlock}
      ${footerActionsBlock}
    </DialogFooter>
  `,
  imports: [
    'import { Button } from "@/components/ui/button"',
    'import { ButtonGroup } from "@/components/ui/button-group"',
    'import { DialogClose, DialogFooter, DialogFooterActions, DialogFooterLink } from "@/components/ui/dialog"',
  ],
  id: 'dialog-footer',
  metadata: { nestable: true },
};
