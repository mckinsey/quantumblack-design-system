// url=<QBDS_ICON_SHELL>
// source=src/components/ui/icon-shell.tsx
// component=IconShell
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  '16': 'sm',
  '24': 'default',
  '32': 'lg',
});

const figmaType = instance.getEnum('type', {
  neutral: 'neutral',
  'neutral-inverse': 'neutral-inverse',
  accent: 'accent',
  'accent-inverse': 'accent-inverse',
});

const state = instance.getEnum('state', {
  primary: 'primary',
  secondary: 'secondary',
  disabled: 'disabled',
});

const disabled = state === 'disabled';
const variant = disabled ? undefined : state;

const customClassByType: Record<string, string | undefined> = {
  accent: 'text-status-success',
  'accent-inverse': 'text-status-success-inverse',
};

const type =
  figmaType === 'accent' || figmaType === 'accent-inverse'
    ? 'custom'
    : figmaType;

const resolvedSize = size ?? 'default';
const resolvedType = type ?? 'neutral';

const customClass = customClassByType[figmaType ?? ''];

const swapBySize = instance.getEnum('size', {
  '16': 'IconSwap-16',
  '24': 'IconSwap-24',
  '32': 'IconSwap-32',
});

const swaps = [swapBySize, 'IconSwap-16', 'IconSwap-24', 'IconSwap-32'];
let icon = 'crop_free';

for (const name of swaps) {
  const glyph = name ? instance.getInstanceSwap(name) : null;

  if (glyph && glyph.type === 'INSTANCE' && glyph.name) {
    icon = glyph.name.replace(/\s+/g, '_').toLowerCase();
    break;
  }
}

if (icon === 'crop_free') {
  const nested = instance.findLayers(
    node =>
      node.type === 'INSTANCE' &&
      !!node.name &&
      node.name !== instance.name &&
      !String(node.name).startsWith('Tooltip'),
  );
  const glyph = nested[0];

  if (glyph && glyph.type === 'INSTANCE' && glyph.name) {
    icon = glyph.name.replace(/\s+/g, '_').toLowerCase();
  }
}

export default {
  example: figma.code`
    <IconShell size="${resolvedSize}" type="${resolvedType}"${variant ? ` variant="${variant}"` : ''}${disabled ? ' disabled' : ''}${customClass ? ` className="${customClass}"` : ''}>
      <Icon icon="${icon}" />
    </IconShell>
  `,
  imports: [
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { Icon } from "@/components/ui/icon"',
  ],
  id: 'icon-shell',
  metadata: { nestable: true },
};
