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
      Icon split = ButtonGroup spacing="attached" + two icon Buttons.
      - ghost: chevron segment uses className="w-4 px-0" (not size="icon") so width matches the glyph.
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
