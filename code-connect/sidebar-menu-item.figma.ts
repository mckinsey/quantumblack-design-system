// url=<QBDS_SIDEBAR_MENU_ITEM>
// source=src/components/ui/sidebar-nav.tsx
// component=SidebarNavIconButton
import figma from 'figma';

const instance = figma.selectedInstance;

const isActive = instance.getEnum('state', {
  enabled: false,
  hover: false,
  active: true,
  'active-accent': true,
  disabled: false,
});

const disabled = instance.getEnum('state', {
  enabled: false,
  hover: false,
  active: false,
  'active-accent': false,
  disabled: true,
});

const shell =
  instance.findInstance('IconShell', { traverseInstances: true }) ??
  instance.findInstance('SidebarMenuButton', { traverseInstances: true });

let icon: figma.ResultSection[] = [];

if (shell && shell.type === 'INSTANCE' && shell.hasCodeConnect()) {
  icon = shell.executeTemplate().example;
}

const tip = instance.findInstance('Tooltip/OneLine', {
  traverseInstances: true,
});
const tipLabel =
  tip && tip.type === 'INSTANCE' ? tip.getString('label') : undefined;

export default {
  example: figma.code`
    <SidebarMenuItem>
      <SidebarNavIconButton${figma.helpers.react.renderProp(
        'isActive',
        isActive || undefined,
      )}${figma.helpers.react.renderProp(
        'disabled',
        disabled || undefined,
      )}${tipLabel ? figma.helpers.react.renderProp('tooltip', tipLabel) : ''}>
        ${icon}
      </SidebarNavIconButton>
    </SidebarMenuItem>
  `,
  imports: [
    'import { SidebarMenuItem, SidebarNavIconButton } from "@/components/ui/sidebar"',
  ],
  id: 'sidebar-menu-item',
  metadata: { nestable: true },
};
