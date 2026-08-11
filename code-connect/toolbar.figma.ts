// url=<QBDS_TOOLBAR>
// source=src/components/ui/toolbar.tsx
// component=Toolbar
import figma from 'figma';

const instance = figma.selectedInstance;

const size =
  instance.getEnum('size', {
    sm: 'sm',
    reg: 'default',
    lg: 'lg',
  }) ?? 'default';

const shape =
  instance.getEnum('shape', {
    circle: 'circle',
    square: 'square',
  }) ?? 'circle';

const orientation =
  instance.getEnum('orientation', {
    horizontal: 'horizontal',
    vertical: 'vertical',
  }) ?? 'horizontal';

const boxed =
  instance.getEnum('boxed', {
    true: 'true',
    false: 'false',
  }) === 'true';

const slotName = orientation === 'vertical' ? 'verticalSlot' : 'horizontalSlot';
const slot = instance.getSlot(slotName);
const connected = slot?.connectedInstances ?? [];

const buttons =
  connected.length > 0
    ? connected.map((node, index) => {
        const icon =
          node.type === 'INSTANCE' ? node.findInstance('IconShell') : null;
        const iconCode =
          icon && icon.type === 'INSTANCE'
            ? icon.executeTemplate().example
            : [];

        return figma.code`
    <ToolbarButton aria-label="Tool ${String(index + 1)}">
      ${iconCode}
    </ToolbarButton>
  `;
      })
    : figma.helpers.react.renderChildren(
        figma.properties.children(['Button-Icon']),
      );

export default {
  example: figma.code`
    <Toolbar${boxed ? ' boxed' : ''} orientation="${orientation}" shape="${shape}" size="${size}">
      ${buttons}
    </Toolbar>
  `,
  imports: [
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { Toolbar, ToolbarButton } from "@/components/ui/toolbar"',
  ],
  id: 'toolbar',
  metadata: { nestable: false },
};
