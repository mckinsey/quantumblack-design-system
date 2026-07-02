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

const ligatures: Record<string, string> = {
  dashboard: 'space_dashboard',
  schema: 'account_tree',
  api: 'center_focus_strong',
};

const symbolIcons: Record<string, string> = {
  '43700:22223': 'home',
  '43700:22225': 'home',
  '43587:145651': 'space_dashboard',
  '43587:145652': 'space_dashboard',
  '43700:22348': 'account_tree',
  '43700:22350': 'account_tree',
  '43707:23897': 'center_focus_strong',
  '43707:23899': 'center_focus_strong',
  '43814:16919': 'notifications',
  '43814:16921': 'notifications',
  '43789:14391': 'settings',
  '43789:14393': 'settings',
  '43722:33907': 'light_mode',
  '43722:33909': 'light_mode',
  '42119:161245': 'info',
  '42119:161247': 'info',
};

function iconFromGlyph(glyph: figma.InstanceHandle): string | undefined {
  if (glyph.name !== 'crop_free') {
    return glyph.name;
  }

  if (glyph.symbolId && symbolIcons[glyph.symbolId]) {
    return symbolIcons[glyph.symbolId];
  }

  const nested = glyph.findLayers(
    n => n.type === 'INSTANCE' && n.name !== 'crop_free',
    { traverseInstances: true },
  )[0];

  if (nested && nested.type === 'INSTANCE') {
    return nested.name;
  }

  return undefined;
}

const swapBySize = instance.getEnum('Size', {
  '16': 'IconSwap-16',
  '24': 'IconSwap-24',
  '32': 'IconSwap-32',
});
const swaps = [swapBySize, 'IconSwap-32', 'IconSwap-24', 'IconSwap-16'];
let icon: string | undefined;

for (const name of swaps) {
  const glyph = name ? instance.getInstanceSwap(name) : null;

  if (glyph && glyph.type === 'INSTANCE') {
    icon = iconFromGlyph(glyph);

    if (icon) {
      break;
    }
  }
}

if (!icon) {
  for (const [key, prop] of Object.entries(instance.properties)) {
    if (!key.startsWith('IconSwap') || typeof prop.value !== 'string') {
      continue;
    }

    if (prop.value === 'crop_free') {
      continue;
    }

    if (prop.value.includes(':')) {
      const mapped = symbolIcons[prop.value];

      if (mapped) {
        icon = mapped;
        break;
      }
    } else {
      icon = prop.value;
      break;
    }
  }
}

if (!icon) {
  const known = [
    'home',
    'dashboard',
    'schema',
    'api',
    'notifications',
    'settings',
    'light_mode',
    'info',
  ];
  const hit = instance.findLayers(
    n => n.type === 'INSTANCE' && known.includes(n.name),
    { traverseInstances: true },
  )[0];

  if (hit && hit.type === 'INSTANCE') {
    icon = hit.name;
  }
}

const ligature = icon ? (ligatures[icon] ?? icon) : undefined;

export default {
  example: figma.code`
    <IconShell size="${size}" type="${type}" variant="${variant}">
      ${ligature ? figma.code`<Icon icon="${ligature}" />` : ''}
    </IconShell>
  `,
  imports: [
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { Icon } from "@/components/ui/icon"',
  ],
  id: 'icon-shell',
  metadata: { nestable: true },
};
