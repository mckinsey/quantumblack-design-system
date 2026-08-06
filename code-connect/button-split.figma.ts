// url=<QBDS_BUTTON_SPLIT>
// source=src/components/ui/button-group.tsx
// component=ButtonGroup
import figma from 'figma';

const instance = figma.selectedInstance;

instance.getEnum('type', {
  primary: 'default',
  'primary-accent': 'accent',
  'secondary-filled': 'secondary',
  'secondary-outline': 'outline',
  ghost: 'ghost',
});

instance.getEnum('size', {
  xxsm: 'xxs',
  xsm: 'xs',
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
});

instance.getEnum('state', {
  enabled: 'enabled',
  'dropdown-open': 'dropdown-open',
});

const main = instance.findInstance('Button');
let mainCode: figma.ResultSection[] = [];

if (main && main.type === 'INSTANCE') {
  mainCode = main.executeTemplate().example;
}

const trigger = instance.findInstance('Button-Icon');
let triggerCode: figma.ResultSection[] = [];

if (trigger && trigger.type === 'INSTANCE') {
  triggerCode = trigger.executeTemplate().example;
}

export default {
  example: figma.code`
    {/*
      Split = ButtonGroup spacing="attached" + Button + Button (chevron).
      - Chevron uses full size="icon" when paired with a text Button, except ghost: use
        splitIconChevronSizing(size, { ghost: true }).chevronClassName (icon-width hug).
      - default / accent icons: IconShell type="neutral-inverse"; other variants use type="neutral".
      Dropdown on the chevron is composition (demo) — not part of this mapping.
    */}
    <ButtonGroup spacing="attached">
      ${mainCode}
      ${triggerCode}
    </ButtonGroup>
  `,
  imports: [
    'import { ButtonGroup } from "@/components/ui/button-group"',
    'import { Button } from "@/components/ui/button"',
  ],
  id: 'button-split',
  metadata: { nestable: true },
};
