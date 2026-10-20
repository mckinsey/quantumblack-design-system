// url=<QBDS_POPOVER>
// source=src/components/ui/popover.tsx
// component=PopoverContent
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  md: 'md',
  lg: 'lg',
  xlg: 'xl',
});

const title = instance.getString('title');
const description = instance.getString('description');

const hasMedia = instance.getBoolean('hasMedia');
const hasHeader = instance.getBoolean('hasHeader');
const hasDescription = instance.getBoolean('hasDescription');
const hasDivider = instance.getBoolean('hasDivider');
const hasContent = instance.getBoolean('hasContent');
const hasFooter = instance.getBoolean('hasFooter');

const mediaSlot = instance.getSlot('mediaSlot');
const mediaConnected = mediaSlot?.connectedInstances ?? [];
const mediaChildren =
  mediaConnected.length > 0
    ? mediaConnected.map(n => n.executeTemplate().example).flat()
    : [];

const contentSlot = instance.getSlot('contentSlot');
const contentConnected = contentSlot?.connectedInstances ?? [];
const contentChildren =
  contentConnected.length > 0
    ? contentConnected.map(n => n.executeTemplate().example).flat()
    : [];

const footerSlot = instance.getSlot('footerSlot');
const footerConnected = footerSlot?.connectedInstances ?? [];
const footerChildren =
  footerConnected.length > 0
    ? footerConnected.map(n => n.executeTemplate().example).flat()
    : [];

const divider = figma.code`
  <Separator className="bg-stroke-divider" />
`;

const headerBlock = hasHeader
  ? figma.code`
        <PopoverHeader>
          <PopoverTitle>${title}</PopoverTitle>
          ${hasDescription ? figma.code`<PopoverDescription>${description}</PopoverDescription>` : figma.code``}
          ${hasDivider ? divider : figma.code``}
        </PopoverHeader>
      `
  : figma.code``;

const bodyBlock =
  hasContent && contentChildren.length > 0
    ? figma.code`
        <PopoverBody>
          ${figma.helpers.react.renderChildren(contentChildren)}
        </PopoverBody>
      `
    : hasContent
      ? figma.code`
          <PopoverBody>
            <p className="paragraph-regular-primary text-fg-primary">
              Main content area for controls, lists, or supporting detail.
            </p>
          </PopoverBody>
        `
      : figma.code``;

const mediaBlock =
  hasMedia && mediaChildren.length > 0
    ? figma.code`<PopoverMedia>${figma.helpers.react.renderChildren(mediaChildren)}</PopoverMedia>`
    : hasMedia
      ? figma.code`
          <PopoverMedia className="aspect-video" />
        `
      : figma.code``;

const footerBlock =
  hasFooter && footerChildren.length > 0
    ? figma.code`
        <PopoverFooter className="justify-end">
          ${figma.helpers.react.renderChildren(footerChildren)}
        </PopoverFooter>
      `
    : hasFooter
      ? figma.code`
          <PopoverFooter className="justify-end">
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button size="sm">Apply</Button>
          </PopoverFooter>
        `
      : figma.code``;

export default {
  example: figma.code`
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>
        Open
      </PopoverTrigger>
      <PopoverContent size="${size}">
        ${mediaBlock}
        ${headerBlock}
        ${bodyBlock}
        ${footerBlock}
      </PopoverContent>
    </Popover>
  `,
  imports: [
    'import { Button } from "@/components/ui/button"',
    'import { Popover, PopoverBody, PopoverContent, PopoverDescription, PopoverFooter, PopoverHeader, PopoverMedia, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"',
    'import { Separator } from "@/components/ui/separator"',
  ],
  id: 'popover-content',
};
