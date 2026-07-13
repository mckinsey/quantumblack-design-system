// url=<QBDS_TAG>
// source=src/components/ui/tag.tsx
// component=Tag
import figma from 'figma';

const instance = figma.selectedInstance;

const type = instance.getEnum('type', {
  primary: 'primary',
  'high-emphasis': 'secondary',
  accent: 'accent',
});

const outline = instance.getBoolean('outline');
const variant =
  type === 'accent' && outline ? 'accent-outline' : outline ? 'outline' : type;

const size = instance.getEnum('size', {
  xsm: 'xs',
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
});

const pill = instance.getBoolean('pill');
const label = instance.getString('label');
const showLeading = instance.getBoolean('showLeadingIcon');
const leading = showLeading ? instance.findInstance('Leading-Icon') : null;
let leadingCode: figma.ResultSection[] = [];

if (leading?.type === 'INSTANCE') {
  leadingCode = leading.executeTemplate().example;
}

export default {
  example: figma.code`
    <Tag variant="${variant}" size="${size}" pill={${pill}} onRemove={() => undefined}>
      ${leadingCode}
      ${label}
    </Tag>
  `,
  imports: ['import { Tag } from "@/components/ui/tag"'],
  id: 'tag',
  metadata: { nestable: true },
};
