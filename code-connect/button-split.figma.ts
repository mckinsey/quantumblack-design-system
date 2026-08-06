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
      Split = ButtonGroup spacing="attached" + Button + Button-Icon (chevron).
      Nested Button-Icon Code Connect always emits size="icon" — this template cannot
      override that, so chevron width notes below are guidance only (apply in product code).
      - Text+chevron: full size="icon", except ghost → splitIconChevronSizing(size, { ghost: true }).chevronClassName
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
