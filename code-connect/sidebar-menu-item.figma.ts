// url=<QBDS_SIDEBAR_MENU_ITEM>
// source=src/components/ui/sidebar.tsx
// component=SidebarMenuItem
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

const shellBtn = instance.findInstance('SidebarMenuButton', {
  traverseInstances: true,
});
const shellIcon = instance.findInstance('IconShell', {
  traverseInstances: true,
});
const shell =
  shellBtn && shellBtn.type === 'INSTANCE'
    ? shellBtn
    : shellIcon && shellIcon.type === 'INSTANCE'
      ? shellIcon
      : null;

let icon: figma.ResultSection[] = [];

if (shell && shell.type === 'INSTANCE' && shell.hasCodeConnect()) {
  icon = shell.executeTemplate().example;
}

const tip = instance.findInstance('Tooltip/OneLine', {
  traverseInstances: true,
});
const shellTip =
  shell && shell.type === 'INSTANCE'
    ? shell.findInstance('Tooltip/OneLine', { traverseInstances: true })
    : null;
const tipNode =
  tip && tip.type === 'INSTANCE'
    ? tip
    : shellTip && shellTip.type === 'INSTANCE'
      ? shellTip
      : null;

const tipLabel =
  tipNode && tipNode.type === 'INSTANCE'
    ? tipNode.getString('label')
    : undefined;

const tooltip =
  tipLabel !== undefined
    ? figma.helpers.react.object({ children: tipLabel, hidden: false })
    : undefined;

export default {
  example: figma.code`
    <SidebarMenuItem>
      <SidebarMenuButton${figma.helpers.react.renderProp(
        'isActive',
        isActive || undefined,
      )}${figma.helpers.react.renderProp(
        'disabled',
        disabled || undefined,
      )}${tooltip ? figma.helpers.react.renderProp('tooltip', tooltip) : ''}>
        ${icon}
      </SidebarMenuButton>
    </SidebarMenuItem>
  `,
  imports: [
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"',
  ],
  id: 'sidebar-menu-item',
  metadata: { nestable: true },
};
