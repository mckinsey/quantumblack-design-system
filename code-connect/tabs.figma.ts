// url=<QBDS_TABS>
// source=src/components/ui/tabs.tsx
// component=TabsTrigger
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  reg: 'default',
  lg: 'lg',
  xlg: 'xl',
});

const disabled = instance.getEnum('state', {
  enabled: false,
  hover: false,
  focused: false,
  active: false,
  disabled: true,
});

const label = instance.getString('tabEntry');

const showLeading = instance.getBoolean('showLeadingIcon');
const leadingNames = ['Icon/Leading/Small', 'Icon/Leading/Regular'];
let leadingCode: figma.ResultSection[] = [];

for (const name of leadingNames) {
  const leading = showLeading ? instance.findInstance(name) : null;

  if (leading?.type === 'INSTANCE') {
    leadingCode = leading.executeTemplate().example;
    break;
  }
}

const iconNote = leadingCode.length
  ? `// Tabs do not style leading icons. Use controlled value and set IconShell variant manually: primary when value matches the trigger, else secondary.\n    `
  : '';

const imports = ['import { TabsTrigger } from "@/components/ui/tabs"'];

if (leadingCode.length) {
  imports.push(
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { Icon } from "@/components/ui/icon"',
  );
}

export default {
  example: figma.code`
    ${iconNote}<TabsTrigger size="${size}" value="tab"${disabled ? ' disabled' : ''}>
      ${leadingCode}
      ${label}
    </TabsTrigger>
  `,
  imports,
  id: 'tabs',
  metadata: { nestable: true },
};
