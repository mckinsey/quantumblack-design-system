// url=<QBDS_NAV_MENU_ITEM>
// source=src/components/ui/sidebar-nav.tsx
// component=SidebarNavMenuButton
import figma from 'figma';

const instance = figma.selectedInstance;

const hierarchy = instance.getEnum('hierarchy', {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
});

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

const isExpanded = instance.getEnum('state', {
  'active-expanded': true,
  enabled: false,
  hover: false,
  active: false,
  disabled: false,
});

const withIcon =
  instance.getEnum('withIcon', {
    true: true,
    false: false,
  }) ?? false;

const withChildren =
  instance.getEnum('withChildren', {
    true: true,
    false: false,
  }) ?? false;

const label =
  hierarchy === 'primary'
    ? instance.getString('Header')
    : instance.getString('label');

const showTrailing = instance.getBoolean('showTrailingSlot');
const trailingSlot = showTrailing ? instance.getSlot('trailingSlot') : null;
const trailingConnected = trailingSlot?.connectedInstances ?? [];
const trailing =
  trailingConnected.length > 0
    ? trailingConnected.map(n => n.executeTemplate().example).flat()
    : showTrailing
      ? figma.properties.children(['Badge/Label-Only'])
      : [];

const leading = withIcon ? instance.findInstance('Leading-Icon') : null;

let iconCode: figma.ResultSection[] = [];

if (leading && leading.type === 'INSTANCE' && leading.hasCodeConnect()) {
  iconCode = leading.executeTemplate().example;
}

const subSlot = instance.getSlot('subItemsSlot');
const subConnected = subSlot?.connectedInstances ?? [];
const subItems =
  subConnected.length > 0
    ? subConnected.map(n => n.executeTemplate().example).flat()
    : figma.properties.children(['NavMenu/Item']);

const buttonProps = `${figma.helpers.react.renderProp(
  'isActive',
  isActive || undefined,
)}${figma.helpers.react.renderProp('disabled', disabled || undefined)}`;

const groupButton = figma.code`
  <SidebarNavMenuButton${buttonProps}${figma.helpers.react.renderProp(
    'showChevron',
    withChildren || undefined,
  )}>
    ${iconCode}<span>${label}</span>${figma.helpers.react.renderChildren(trailing)}
  </SidebarNavMenuButton>
`;

const subButton = figma.code`
  <SidebarNavMenuSubButton${buttonProps}>
    ${iconCode}<span>${label}</span>
  </SidebarNavMenuSubButton>
`;

export default {
  example:
    hierarchy === 'primary'
      ? withChildren && subItems.length
        ? figma.code`
            <Collapsible${isExpanded ? ' defaultOpen' : ''} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  ${groupButton}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarNavMenuSub>
                    ${figma.helpers.react.renderChildren(subItems)}
                  </SidebarNavMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          `
        : figma.code`
            <SidebarMenuItem>
              ${groupButton}
            </SidebarMenuItem>
          `
      : figma.code`
          <SidebarMenuSubItem>
            ${subButton}
          </SidebarMenuSubItem>
        `,
  imports: [
    'import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"',
    'import { SidebarMenuItem, SidebarMenuSubItem, SidebarNavMenuButton, SidebarNavMenuSub, SidebarNavMenuSubButton } from "@/components/ui/sidebar"',
  ],
  id: 'nav-menu-item',
  metadata: { nestable: true },
};
