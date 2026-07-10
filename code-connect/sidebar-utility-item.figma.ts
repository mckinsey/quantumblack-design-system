// url=<QBDS_SIDEBAR_UTILITY_ITEM>
// source=src/components/ui/sidebar-nav.tsx
// component=SidebarFooterButton
import figma from 'figma';

const instance = figma.selectedInstance;

const disabled = instance.getEnum('state', {
  enabled: false,
  hover: false,
  disabled: true,
});

const shell = instance.findInstance('IconShell', { traverseInstances: true });

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
      <SidebarFooterButton${figma.helpers.react.renderProp(
        'disabled',
        disabled || undefined,
      )}${tooltip ? figma.helpers.react.renderProp('tooltip', tooltip) : ''}>
        ${icon}
      </SidebarFooterButton>
    </SidebarMenuItem>
  `,
  imports: [
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { SidebarMenuItem } from "@/components/ui/sidebar"',
    'import { SidebarFooterButton } from "@/components/ui/sidebar-nav"',
  ],
  id: 'sidebar-utility-item',
  metadata: { nestable: true },
};
