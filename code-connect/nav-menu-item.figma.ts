// url=<QBDS_NAV_MENU_ITEM>
// source=src/components/ui/sidebar-nav.tsx
// component=SidebarNavMenuButton
import figma from 'figma';

const instance = figma.selectedInstance;

const isActive = instance.getEnum('state', {
  enabled: false,
  hover: false,
  active: true,
  'active-expanded': true,
  disabled: false,
});

const disabled = instance.getEnum('state', {
  enabled: false,
  hover: false,
  active: false,
  'active-expanded': false,
  disabled: true,
});

const withIcon = instance.getBoolean('withIcon');
const withChildren = instance.getBoolean('withChildren');
const label = instance.getString('label');
const showTrailing = instance.getBoolean('showTrailingSlot');

const shell = instance.findInstance('IconShell', { traverseInstances: true });
const badge = instance.findInstance('Badge/Label-Only', {
  traverseInstances: true,
});
const subItems = figma.properties.children(['subItemsSlot']);

let iconName: string | undefined;

if (withIcon && shell && shell.type === 'INSTANCE') {
  const swapBySize = shell.getEnum('Size', {
    '16': 'IconSwap-16',
    '24': 'IconSwap-24',
    '32': 'IconSwap-32',
  });
  const swaps = [swapBySize, 'IconSwap-16', 'IconSwap-24', 'IconSwap-32'];

  for (const name of swaps) {
    const glyph = name ? shell.getInstanceSwap(name) : null;

    if (glyph && glyph.type === 'INSTANCE' && glyph.name) {
      iconName = glyph.name.replace(/\s+/g, '_').toLowerCase();
      break;
    }
  }
}

let badgeCode: figma.ResultSection[] = [];

if (
  showTrailing &&
  badge &&
  badge.type === 'INSTANCE' &&
  badge.hasCodeConnect()
) {
  badgeCode = badge.executeTemplate().example;
}

const iconTag = iconName
  ? `<IconShell size="sm" type="neutral" variant="${
      isActive ? 'primary' : 'secondary'
    }">
      <Icon icon="${iconName}" />
    </IconShell>
    `
  : '';

const button = figma.code`
  <SidebarNavMenuButton${figma.helpers.react.renderProp(
    'isActive',
    isActive || undefined,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled || undefined,
  )}${figma.helpers.react.renderProp('showChevron', withChildren || undefined)}>
    ${iconTag}<span>${label}</span>${badgeCode.length ? badgeCode : ''}
  </SidebarNavMenuButton>
`;

export default {
  example:
    withChildren && subItems.length
      ? figma.code`
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarNavMenuItem>
              <CollapsibleTrigger asChild>
                ${button}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarNavMenuSub>
                  ${figma.helpers.react.renderChildren(subItems)}
                </SidebarNavMenuSub>
              </CollapsibleContent>
            </SidebarNavMenuItem>
          </Collapsible>
        `
      : figma.code`
          <SidebarNavMenuItem>
            ${button}
          </SidebarNavMenuItem>
        `,
  imports: [
    'import { Badge } from "@/components/ui/badge"',
    'import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"',
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { SidebarMenuSubItem, SidebarNavMenuButton, SidebarNavMenuItem, SidebarNavMenuSub, SidebarNavMenuSubButton } from "@/components/ui/sidebar"',
  ],
  id: 'nav-menu-item',
  metadata: { nestable: true },
};
