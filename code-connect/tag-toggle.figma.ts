// url=<QBDS_TAG_TOGGLE>
// source=src/components/ui/tag-toggle.tsx
// component=TagToggle
import figma from 'figma';

const instance = figma.selectedInstance;

const variant = instance.getBoolean('outline') ? 'outline' : 'default';

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
    <TagToggle variant="${variant}" size="${size}" pill={${pill}}>
      ${leadingCode}
      ${label}
    </TagToggle>
  `,
  imports: ['import { TagToggle } from "@/components/ui/tag-toggle"'],
  id: 'tag-toggle',
  metadata: { nestable: true },
};
