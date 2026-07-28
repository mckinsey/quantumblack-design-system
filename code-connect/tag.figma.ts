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

const disabled = instance.getEnum('state', {
  enabled: false,
  hover: false,
  focus: false,
  pressed: false,
  disabled: true,
});

const showLeading = instance.getBoolean('showLeadingIcon');
const leading = showLeading ? instance.findInstance('Leading-Icon') : null;

let icon = 'style';

if (leading && leading.type === 'INSTANCE') {
  const swaps = ['IconSwap-16', 'IconSwap-24', 'IconSwap-32'];

  for (const name of swaps) {
    const glyph = leading.getInstanceSwap(name);

    if (glyph && glyph.type === 'INSTANCE' && glyph.name) {
      icon = glyph.name.replace(/\s+/g, '_').toLowerCase();
      break;
    }
  }
}

export default {
  example: figma.code`
    <Tag variant="${variant}" size="${size}" pill={${pill}}${disabled ? ' disabled' : ''} onRemove={() => undefined}>
      ${
        showLeading
          ? figma.code`
      <IconShell size="sm" type={tagIconTone['${variant}']} variant="primary"${disabled ? ' disabled' : ''}>
        <Icon icon="${icon}" />
      </IconShell>
      `
          : ''
      }
      ${label}
    </Tag>
  `,
  imports: [
    'import { Tag, tagIconTone } from "@/components/ui/tag"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { Icon } from "@/components/ui/icon"',
  ],
  id: 'tag',
  metadata: { nestable: true },
};
