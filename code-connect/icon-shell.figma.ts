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

export default {
  example: figma.code`
    <IconShell size="${size}" type="${type}" variant="${variant}">
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
