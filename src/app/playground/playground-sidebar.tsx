import { useState } from 'react';

import {
  type NavGroup,
  type NavId,
  type NavSection,
  firstItemId,
  pageNav,
  primaryNav,
  utilityNav,
} from '@/app/demo/[name]/ui/sidebar-demo-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarNav,
  SidebarNavIconButton,
  SidebarNavMenu,
  SidebarNavMenuButton,
  SidebarNavMenuSub,
  SidebarNavMenuSubButton,
  SidebarNavRail,
  SidebarNavUtilityButton,
  SidebarProvider,
  SidebarSeparator,
  useSidebar,
  useSidebarNavMenuOverlay,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const basePath = import.meta.env.VITE_BASE_PATH ?? '';

function navIcon(icon: string, active = false, size: 'sm' | 'default' = 'sm') {
  return (
    <IconShell
      size={size}
      type="neutral"
      variant={active ? 'primary' : 'secondary'}>
      <Icon icon={icon} />
    </IconShell>
  );
}

function NavMenuGroupRow({
  groupKey,
  group,
  defaultOpen = false,
  activeRowId,
  onActivate,
  onSelect,
}: {
  groupKey: string;
  group: NavGroup;
  defaultOpen?: boolean;
  activeRowId?: string | null;
  onActivate?: (id: string | null) => void;
  onSelect?: (id: string) => void;
}) {
  const { size } = useSidebar();
  const iconSize = size === 'lg' ? 'default' : 'sm';
  const [open, setOpen] = useState(defaultOpen);
  const groupActive = activeRowId === groupKey;

  return (
    <Collapsible
      open={open}
      onOpenChange={next => {
        setOpen(next);

        if (next) {
          onActivate?.(groupKey);
          return;
        }

        if (groupActive) {
          onActivate?.(null);
        }
      }}
      className={cn('group/collapsible', groupActive && 'bg-fill-muted')}>
      <SidebarMenuItem>
        <CollapsibleTrigger
          render={
            <SidebarNavMenuButton showChevron isActive={groupActive}>
              {navIcon(group.icon, groupActive, iconSize)}
              <span>{group.label}</span>
              {group.badge ? (
                <Badge
                  size="sm"
                  variant="high-emphasis"
                  outline
                  className="ml-auto">
                  {group.badge}
                </Badge>
              ) : null}
            </SidebarNavMenuButton>
          }
        />
        <CollapsibleContent>
          <SidebarNavMenuSub>
            {group.items.map(item => {
              const isActive = activeRowId === item.id;

              return (
                <SidebarMenuSubItem key={item.id}>
                  <SidebarNavMenuSubButton
                    isActive={isActive}
                    onClick={() => {
                      onActivate?.(item.id);
                      onSelect?.(item.id);
                    }}>
                    {navIcon(item.icon, isActive, iconSize)}
                    <span>{item.label}</span>
                  </SidebarNavMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarNavMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

function NavMenuSections({
  sections,
  selectedId,
  onSelect,
}: {
  sections: NavSection[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const [activeRowId, setActiveRowId] = useState<string | null>(selectedId);

  return (
    <>
      {sections.map((section, sectionIndex) => (
        <SidebarGroup key={section.header}>
          <SidebarGroupLabel>{section.header}</SidebarGroupLabel>
          <SidebarMenu>
            {section.groups.map((group, index) => {
              const groupKey = `g:${section.header}:${group.label}`;

              return (
                <NavMenuGroupRow
                  key={groupKey}
                  groupKey={groupKey}
                  group={group}
                  activeRowId={activeRowId}
                  onActivate={setActiveRowId}
                  onSelect={onSelect}
                  defaultOpen={sectionIndex === 0 && index === 0}
                />
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}

function NavRail({
  active,
  onActive,
}: {
  active: NavId;
  onActive: (id: NavId) => void;
}) {
  const { size } = useSidebar();
  const iconSize = size === 'lg' ? 'lg' : 'default';

  return (
    <SidebarNavRail>
      <SidebarHeader>
        <SidebarMenu>
          {primaryNav.map(item => {
            const isActive = active === item.id;

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarNavIconButton
                  isActive={isActive}
                  tooltip={item.label}
                  onClick={() => onActive(item.id)}>
                  <IconShell
                    size={iconSize}
                    variant={isActive ? 'primary' : 'secondary'}>
                    <Icon icon={item.icon} />
                  </IconShell>
                </SidebarNavIconButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarFooter>
        <SidebarSeparator className="mb-4" />
        <SidebarMenu className="items-center gap-4">
          {utilityNav.map(item => (
            <SidebarMenuItem key={item.label}>
              <SidebarNavUtilityButton tooltip={item.label}>
                <IconShell size="default" hoverable>
                  <Icon icon={item.icon} />
                </IconShell>
              </SidebarNavUtilityButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator className="mt-4 mb-6" />
        <div className="flex justify-center">
          <Avatar size="sm">
            <AvatarImage src={`${basePath}/users/avatar-1.jpg`} />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
        </div>
      </SidebarFooter>
    </SidebarNavRail>
  );
}

export function PlaygroundSidebar({
  activeNav,
  selectedId,
  onActiveNavChange,
  onSelect,
}: {
  activeNav: NavId;
  selectedId: string;
  onActiveNavChange: (nav: NavId) => void;
  onSelect: (id: string) => void;
}) {
  const navOverlay = useSidebarNavMenuOverlay<NavId>(activeNav);

  function handleRailActive(id: NavId) {
    navOverlay.selectActive(id);
    onActiveNavChange(id);
  }

  return (
    <SidebarProvider layout="nav" defaultOpen className="h-full min-h-0 w-auto">
      <SidebarNav>
        <NavRail active={activeNav} onActive={handleRailActive} />
        <SidebarNavMenu
          mode="overlay"
          open={navOverlay.open}
          onOpenChange={navOverlay.setOpen}>
          <NavMenuSections
            key={activeNav}
            sections={pageNav[activeNav].sections}
            selectedId={selectedId}
            onSelect={id => {
              onSelect(id);
              navOverlay.setOpen(false);
            }}
          />
        </SidebarNavMenu>
      </SidebarNav>
    </SidebarProvider>
  );
}

export { firstItemId };
