// url=<QBDS_ICON_SHELL>
// source=src/components/ui/icon-shell.tsx
// component=IconShell
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('Size', {
  '16': 'sm',
  '24': 'default',
  '32': 'lg',
});

const type = instance.getEnum('Type', {
  neutral: 'neutral',
  'neutral-inverse': 'neutral-inverse',
  accent: 'accent',
  'accent-inverse': 'accent',
});

const variant = instance.getEnum('State', {
  primary: 'primary',
  secondary: 'secondary',
  disabled: 'disabled',
});

const swapBySize = instance.getEnum('Size', {
  '16': 'IconSwap-16',
  '24': 'IconSwap-24',
  '32': 'IconSwap-32',
});

const swaps = [swapBySize, 'IconSwap-16', 'IconSwap-24', 'IconSwap-32'];
let icon: string | undefined;

for (const name of swaps) {
  const glyph = name ? instance.getInstanceSwap(name) : null;

  if (glyph && glyph.type === 'INSTANCE') {
    icon = glyph.name;
    break;
  }
}

export default {
  example: figma.code`
    <IconShell size="${size}" type="${type}" variant="${variant}">
      ${icon ? figma.code`<Icon icon="${icon}" />` : ''}
      {/* Replace with the real icon, e.g. <Icon icon="home" /> */}
    </IconShell>
  `,
  imports: [
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { Icon } from "@/components/ui/icon"',
  ],
  id: 'icon-shell',
  metadata: { nestable: true },
};
