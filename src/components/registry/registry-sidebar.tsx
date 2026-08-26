import { Link, useLocation } from 'react-router';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Icon } from '@/components/ui/icon';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { getUIPrimitives } from '@/lib/registry';

const uiItems = getUIPrimitives();

const COMPONENT_GROUPS: { label: string; names: string[] }[] = [
  {
    label: 'Date & Time',
    names: ['calendar', 'date-picker', 'time-input', 'time-picker'],
  },
  {
    label: 'Form Controls',
    names: [
      'checkbox',
      'combobox',
      'field',
      'input',
      'input-group',
      'number-field',
      'radio-group',
      'select',
      'slider',
      'switch',
      'textarea',
    ],
  },
  { label: 'Overlay', names: ['dialog', 'popover', 'sonner', 'tooltip'] },
];

const groupedNames = new Set(COMPONENT_GROUPS.flatMap(g => g.names));
const EXCLUDED_NAMES = new Set(['label', 'toggle-group']);

type SidebarEntry =
  | {
      type: 'group';
      sortKey: string;
      group: (typeof COMPONENT_GROUPS)[number];
      groupItems: typeof uiItems;
    }
  | { type: 'item'; sortKey: string; item: (typeof uiItems)[number] };

const sortedComponentEntries: SidebarEntry[] = [
  ...COMPONENT_GROUPS.map(group => ({
    type: 'group' as const,
    sortKey: group.label,
    group,
    groupItems: uiItems.filter(item => group.names.includes(item.name)),
  })).filter(e => e.groupItems.length > 0),
  ...uiItems
    .filter(
      item => !groupedNames.has(item.name) && !EXCLUDED_NAMES.has(item.name),
    )
    .map(item => ({ type: 'item' as const, sortKey: item.title, item })),
].sort((a, b) => a.sortKey.localeCompare(b.sortKey));

// Section navigation items
export const sectionItems = [
  { title: 'Introduction', path: '/' },
  { title: 'Components', path: '/components' },
  { title: 'Tokens', path: '/tokens' },
  { title: 'Installation', path: '/installation' },
];

export function MobileSidebarTrigger() {
  const { setOpenMobile } = useSidebar();

  return (
    <div className="absolute top-8 right-4 md:hidden">
      <Button aria-label="Open menu" onClick={() => setOpenMobile(true)}>
        <Icon
          icon="menu"
          className="size-5"
          style={{ fontSize: 20, width: 20, height: 20, lineHeight: '20px' }}
        />
      </Button>
    </div>
  );
}

export function RegistrySidebar() {
  const { pathname } = useLocation();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <ScrollArea className="h-full w-full pr-2">
          {/* Sections */}
          <SidebarGroup>
            <SidebarGroupLabel className="paragraph-small-emphasised text-fg-secondary underline">
              Sections
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sectionItems.map(item => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.path}>
                      <Link onClick={() => setOpenMobile(false)} to={item.path}>
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Components */}
          <SidebarGroup>
            <SidebarGroupLabel className="paragraph-small-emphasised text-fg-secondary underline">
              Components
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sortedComponentEntries.map(entry =>
                  entry.type === 'group' ? (
                    <SidebarMenuItem key={entry.group.label}>
                      <Collapsible
                        defaultOpen={true}
                        className="group/subgroup w-full">
                        <CollapsibleTrigger asChild className="cursor-pointer">
                          <SidebarMenuButton className="flex w-full items-center justify-between">
                            <span>{entry.group.label}</span>
                            <Icon
                              icon="keyboard_arrow_down"
                              size="sm"
                              className="flex-shrink-0 transition-transform duration-200 group-data-[state=open]/subgroup:rotate-180"
                            />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {entry.groupItems.map(item => (
                              <SidebarMenuSubItem key={item.name}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={
                                    pathname === `/registry/${item.name}`
                                  }>
                                  <Link
                                    onClick={() => setOpenMobile(false)}
                                    to={`/registry/${item.name}`}>
                                    {item.title}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    </SidebarMenuItem>
                  ) : (
                    <SidebarMenuItem key={entry.item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === `/registry/${entry.item.name}`}>
                        <Link
                          onClick={() => setOpenMobile(false)}
                          to={`/registry/${entry.item.name}`}>
                          {entry.item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ),
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <ScrollBar />
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
