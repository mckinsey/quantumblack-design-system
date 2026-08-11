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

function isButtonIconWrapper(node: figma.InstanceHandle | figma.TextHandle) {
  return (
    node.type === 'INSTANCE' &&
    (node.name === '.ButtonIcon-Horiz' ||
      node.name === '.ButtonIcon-Vert' ||
      node.name === '.ButtonIcon-Vertical' ||
      node.name.includes('ButtonIcon-Horiz') ||
      node.name.includes('ButtonIcon-Vert'))
  );
}

const wrappers = instance
  .findLayers(node => {
    if (!isButtonIconWrapper(node)) {
      return false;
    }

    const containing = node.__containingSlotName__;

    return (
      !containing ||
      containing === slotName ||
      containing === 'horizontalSlot' ||
      containing === 'verticalSlot'
    );
  })
  .filter((node): node is figma.InstanceHandle => node.type === 'INSTANCE');

const found = instance.findConnectedInstances(
  node =>
    isButtonIconWrapper(node) ||
    node.name === 'Button-Icon' ||
    node.name.includes('ButtonIcon'),
  { traverseInstances: true },
);

const source =
  wrappers.length > 0
    ? wrappers
    : connected.length > 0
      ? connected
      : found.length > 0
        ? found
        : [];

function hasVisibleSpacer(node: figma.InstanceHandle) {
  for (const [key, entry] of Object.entries(node.properties ?? {})) {
    if (
      /spacer|separator|divider/i.test(key) &&
      (entry?.value === true || entry?.value === 'true')
    ) {
      return true;
    }
  }

  return node.children.some(
    child =>
      child.type === 'INSTANCE' &&
      'name' in child &&
      typeof child.name === 'string' &&
      (child.name === '.baseTab_spacer' ||
        child.name === 'baseTab_spacer' ||
        child.name.includes('baseTab_spacer')),
  );
}

const children = source
  .filter((node): node is figma.InstanceHandle => node.type === 'INSTANCE')
  .flatMap((node, index) => {
    const icon = node.findInstance('IconShell', { traverseInstances: true });
    const iconCode =
      icon && icon.type === 'INSTANCE' ? icon.executeTemplate().example : [];

    const button = figma.code`
    <ToolbarButton aria-label="Tool ${String(index + 1)}">
      ${iconCode}
    </ToolbarButton>
  `;

    if (!hasVisibleSpacer(node)) {
      return [button];
    }

    return [
      button,
      figma.code`
    <ToolbarSeparator />
  `,
    ];
  });

export default {
  example: figma.code`
    {/*
      Matches demo composition where Figma can express it:
      - .ButtonIcon-Horiz / .ButtonIcon-Vertical → ToolbarButton + IconShell
      - visible .baseTab_spacer on that wrapper → ToolbarSeparator after that button
      Figma has no exclusive/multi-select axis. For clustered toggles in code, wrap with
      ToolbarGroup + ToggleGroup / ToggleGroupItem (see toolbar demos):
        <ToolbarGroup aria-label="…" render={<ToggleGroup defaultValue={[…]} orientation={…} />}>
          <ToolbarButton aria-label="…" render={<ToggleGroupItem value="…" />} value="…">…</ToolbarButton>
        </ToolbarGroup>
      Import ToggleGroup / ToggleGroupItem from "@/components/ui/toggle-group".
      Also available: ToolbarLink.
    */}
    <Toolbar${boxed ? ' boxed' : ''} orientation="${orientation}" shape="${shape}" size="${size}">
      ${children}
    </Toolbar>
  `,
  imports: [
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { Toolbar, ToolbarButton, ToolbarSeparator } from "@/components/ui/toolbar"',
  ],
  id: 'toolbar',
  metadata: { nestable: true },
};
