// url=<QBDS_ICON_BUTTON_SPLIT>
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

const segments = figma.properties.children(['Button-Icon']);

export default {
  example: figma.code`
    {/*
      Icon split = ButtonGroup spacing="attached" + two Button-Icon children.
      Nested Button-Icon Code Connect always emits size="icon" — this template cannot
      override that, so chevron width notes below are guidance only (apply in product code).
      - Narrow chevron: className={splitIconChevronSizing(size, { ghost }).chevronClassName}
      - Ghost: omit size="icon"; hug with the same helper ({ ghost: true }).
      - default / accent: IconShell type="neutral-inverse"; other variants use type="neutral".
      Dropdown on the chevron is composition (demo) — not part of this mapping.
    */}
    <ButtonGroup spacing="attached">
      ${figma.helpers.react.renderChildren(segments)}
    </ButtonGroup>
  `,
  imports: [
    'import { ButtonGroup } from "@/components/ui/button-group"',
    'import { Button } from "@/components/ui/button"',
  ],
  id: 'icon-button-split',
  metadata: { nestable: true },
};
