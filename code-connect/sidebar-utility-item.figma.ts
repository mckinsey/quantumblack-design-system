// url=<QBDS_SIDEBAR_UTILITY_ITEM>
// source=src/components/ui/sidebar-nav.tsx
// component=SidebarNavUtilityButton
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
const tipLabel =
  tip && tip.type === 'INSTANCE' ? tip.getString('label') : undefined;

export default {
  example: figma.code`
    <SidebarMenuItem>
      <SidebarNavUtilityButton${figma.helpers.react.renderProp(
        'disabled',
        disabled || undefined,
      )}${tipLabel ? figma.helpers.react.renderProp('tooltip', tipLabel) : ''}>
        ${icon}
      </SidebarNavUtilityButton>
    </SidebarMenuItem>
  `,
  imports: [
    'import { SidebarMenuItem, SidebarNavUtilityButton } from "@/components/ui/sidebar"',
  ],
  id: 'sidebar-utility-item',
  metadata: { nestable: true },
};
