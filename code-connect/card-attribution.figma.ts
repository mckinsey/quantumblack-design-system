// url=<QBDS_CARD_ATTRIBUTION>
// source=src/components/ui/card.tsx
// component=Card
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
});

const layout = instance.getEnum('layout', {
  inline: 'inline',
  stacked: 'stacked',
});

const hasVisual = instance.getBoolean('hasVisual');
const hasSecondary = instance.getBoolean('hasSecondary');
const primary = instance.getString('primary') || 'Alex Rivera';
const secondary = instance.getString('secondary') || '3 hours ago';

const artworkSlot = instance.getSlot('artworkSlot');
const artworkConnected = artworkSlot?.connectedInstances ?? [];
const artworkChildren =
  artworkConnected.length > 0
    ? artworkConnected.map(n => n.executeTemplate().example).flat()
    : figma.code``;

const primaryClass =
  size === 'sm'
    ? 'paragraph-regular-primary text-fg-primary'
    : 'paragraph-large-primary text-fg-primary';

const secondaryClass =
  size === 'sm'
    ? 'paragraph-regular-primary text-fg-secondary'
    : 'paragraph-large-primary text-fg-secondary';

const avatarSize = size === 'sm' ? 'xs' : 'sm';

const fallbackAvatar = figma.code`
  <Avatar size="${avatarSize}">
    <AvatarImage src="" />
    <AvatarFallback>LI</AvatarFallback>
  </Avatar>
`;

const artworkVisual =
  artworkConnected.length > 0 ? artworkChildren : fallbackAvatar;

const inlineText = hasSecondary
  ? figma.code`
      <span className="${primaryClass}">${primary}</span>
      <span className="${secondaryClass}">· ${secondary}</span>
    `
  : figma.code`
      <span className="${secondaryClass}">${secondary}</span>
    `;

const stackedText = hasSecondary
  ? figma.code`
      <span className="${primaryClass}">${primary}</span>
      <span className="${secondaryClass}">${secondary}</span>
    `
  : figma.code`
      <span className="${secondaryClass}">${secondary}</span>
    `;

export default {
  example:
    layout === 'stacked'
      ? figma.code`
          <div className="flex w-full flex-col gap-1 pb-3">
            ${hasVisual ? artworkVisual : figma.code``}
            <div className="flex flex-col gap-0.5">
              ${stackedText}
            </div>
          </div>
        `
      : figma.code`
          <div className="flex w-full items-center gap-2 pb-3">
            ${hasVisual ? artworkVisual : figma.code``}
            <div className="flex items-center gap-1">
              ${inlineText}
            </div>
          </div>
        `,
  imports: [
    'import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"',
  ],
  id: 'card-attribution',
  metadata: { nestable: true },
};
