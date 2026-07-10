'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { RegistryLogo } from '@/components/registry/registry-logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  SidebarFooter,
  SidebarFooterButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuIconButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarNav,
  SidebarNavMenu,
  SidebarNavMenuButton,
  SidebarNavMenuItem,
  SidebarNavMenuSub,
  SidebarNavMenuSubButton,
  SidebarNavRail,
  SidebarProvider,
  SidebarSeparator,
  useSidebar,
  useSidebarNavMenuOverlay,
} from '@/components/ui/sidebar';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';
import { cn } from '@/lib/utils';

const basePath = import.meta.env.VITE_BASE_PATH ?? '';

type RailSize = 'default' | 'lg';

const primaryNav = [
  {
    id: 'home',
    icon: 'home',
    label: 'Home',
    title: 'Good morning, Priya',
    subtitle: 'Acme Corp workspace',
    body: 'You have 3 open tasks and 2 shared dashboards waiting for review. Pick up where you left off or open a starred project from the navigation panel.',
  },
  {
    id: 'dashboard',
    icon: 'space_dashboard',
    label: 'Dashboard',
    title: 'Revenue operations',
    subtitle: 'Q2 2026 · Live',
    body: 'Conversion is up 4.2% week over week. Pipeline coverage sits at 1.4× target. Review the weekly summary and drill into underperforming regions.',
  },
  {
    id: 'flow',
    icon: 'account_tree',
    label: 'Flow',
    title: 'Model training pipeline',
    subtitle: 'Run #1842 · In progress',
    body: 'Feature engineering finished 12 minutes ago. Training stage 3 of 5 is running on the EU cluster. Two upstream jobs are queued behind the current batch.',
  },
  {
    id: 'focus',
    icon: 'center_focus_strong',
    label: 'Focus',
    title: 'Sprint 24',
    subtitle: 'Ends Friday · 2 days left',
    body: 'You are working on parity fixes for the sidebar component. One blocker is assigned to you: align overlay motion with the Figma spec before stand-up.',
  },
] as const;

type NavId = (typeof primaryNav)[number]['id'];

type NavLink = {
  id: string;
  label: string;
  icon: string;
  title: string;
  subtitle: string;
  body: string;
};

type NavGroup = {
  label: string;
  icon: string;
  badge?: string;
  items: NavLink[];
};

type NavSection = {
  header: string;
  groups: NavGroup[];
};

function navItem(
  id: string,
  label: string,
  icon: string,
  ctx: { section: string; group: string },
): NavLink {
  return {
    id,
    label,
    icon,
    title: label,
    subtitle: `${ctx.section} · ${ctx.group}`,
    body: `${label} in ${ctx.group}.`,
  };
}

function navItemsFromSections(sections: NavSection[]) {
  return sections.flatMap(section =>
    section.groups.flatMap(group => group.items),
  );
}

function firstItemIdFromSections(sections: NavSection[]) {
  return navItemsFromSections(sections)[0]?.id ?? '';
}

function findItemInSections(sections: NavSection[], itemId: string) {
  return navItemsFromSections(sections).find(item => item.id === itemId);
}

function firstItemId(navId: NavId) {
  return firstItemIdFromSections(pageNav[navId].sections);
}

function findNavItem(navId: NavId, itemId: string) {
  return findItemInSections(pageNav[navId].sections, itemId);
}

const pageNav: Record<NavId, { sections: NavSection[] }> = {
  home: {
    sections: [
      {
        header: 'Workspace',
        groups: [
          {
            label: 'Recent activity',
            icon: 'history',
            items: [
              navItem('home-today', 'Today', 'today', {
                section: 'Workspace',
                group: 'Recent activity',
              }),
              navItem('home-this-week', 'This week', 'date_range', {
                section: 'Workspace',
                group: 'Recent activity',
              }),
            ],
          },
          {
            label: 'Starred',
            icon: 'star',
            items: [
              navItem('home-projects', 'Projects', 'folder', {
                section: 'Workspace',
                group: 'Starred',
              }),
              navItem('home-dashboards', 'Dashboards', 'dashboard', {
                section: 'Workspace',
                group: 'Starred',
              }),
            ],
          },
          {
            label: 'Shared with me',
            icon: 'group',
            items: [
              navItem('home-documents', 'Documents', 'description', {
                section: 'Workspace',
                group: 'Shared with me',
              }),
              navItem('home-reports', 'Reports', 'summarize', {
                section: 'Workspace',
                group: 'Shared with me',
              }),
            ],
          },
        ],
      },
      {
        header: 'Resources',
        groups: [
          {
            label: 'Documentation',
            icon: 'menu_book',
            items: [
              navItem(
                'home-getting-started',
                'Getting started',
                'play_circle',
                {
                  section: 'Resources',
                  group: 'Documentation',
                },
              ),
              navItem('home-api-reference', 'API reference', 'code', {
                section: 'Resources',
                group: 'Documentation',
              }),
            ],
          },
          {
            label: 'Release notes',
            icon: 'new_releases',
            items: [
              navItem('home-latest', 'Latest', 'fiber_new', {
                section: 'Resources',
                group: 'Release notes',
              }),
              navItem('home-archive', 'Archive', 'inventory_2', {
                section: 'Resources',
                group: 'Release notes',
              }),
            ],
          },
        ],
      },
    ],
  },
  dashboard: {
    sections: [
      {
        header: 'Analytics',
        groups: [
          {
            label: 'Overview',
            icon: 'insights',
            items: [
              navItem('dashboard-summary', 'Summary', 'analytics', {
                section: 'Analytics',
                group: 'Overview',
              }),
              navItem('dashboard-trends', 'Trends', 'trending_up', {
                section: 'Analytics',
                group: 'Overview',
              }),
            ],
          },
          {
            label: 'Revenue',
            icon: 'payments',
            items: [
              navItem('dashboard-mrr', 'MRR', 'paid', {
                section: 'Analytics',
                group: 'Revenue',
              }),
              navItem('dashboard-arr', 'ARR', 'account_balance', {
                section: 'Analytics',
                group: 'Revenue',
              }),
            ],
          },
          {
            label: 'Conversion',
            icon: 'trending_up',
            items: [
              navItem('dashboard-funnel', 'Funnel', 'filter_alt', {
                section: 'Analytics',
                group: 'Conversion',
              }),
              navItem('dashboard-cohorts', 'Cohorts', 'groups', {
                section: 'Analytics',
                group: 'Conversion',
              }),
            ],
          },
        ],
      },
      {
        header: 'Reports',
        groups: [
          {
            label: 'Weekly summary',
            icon: 'summarize',
            badge: 'New',
            items: [
              navItem('dashboard-emea', 'EMEA', 'public', {
                section: 'Reports',
                group: 'Weekly summary',
              }),
              navItem('dashboard-americas', 'Americas', 'public', {
                section: 'Reports',
                group: 'Weekly summary',
              }),
              navItem('dashboard-apac', 'APAC', 'public', {
                section: 'Reports',
                group: 'Weekly summary',
              }),
            ],
          },
        ],
      },
    ],
  },
  flow: {
    sections: [
      {
        header: 'Pipelines',
        groups: [
          {
            label: 'Data ingestion',
            icon: 'database',
            items: [
              navItem('flow-batch', 'Batch jobs', 'batch_prediction', {
                section: 'Pipelines',
                group: 'Data ingestion',
              }),
              navItem('flow-streaming', 'Streaming', 'stream', {
                section: 'Pipelines',
                group: 'Data ingestion',
              }),
            ],
          },
          {
            label: 'Feature engineering',
            icon: 'hub',
            items: [
              navItem('flow-transforms', 'Transforms', 'transform', {
                section: 'Pipelines',
                group: 'Feature engineering',
              }),
              navItem('flow-validation', 'Validation', 'rule', {
                section: 'Pipelines',
                group: 'Feature engineering',
              }),
            ],
          },
          {
            label: 'Model training',
            icon: 'model_training',
            items: [
              navItem('flow-experiments', 'Experiments', 'science', {
                section: 'Pipelines',
                group: 'Model training',
              }),
              navItem('flow-checkpoints', 'Checkpoints', 'save', {
                section: 'Pipelines',
                group: 'Model training',
              }),
            ],
          },
        ],
      },
      {
        header: 'Monitoring',
        groups: [
          {
            label: 'Job queue',
            icon: 'queue',
            items: [
              navItem('flow-running', 'Running', 'pending', {
                section: 'Monitoring',
                group: 'Job queue',
              }),
              navItem('flow-scheduled', 'Scheduled', 'schedule', {
                section: 'Monitoring',
                group: 'Job queue',
              }),
            ],
          },
          {
            label: 'Alerts',
            icon: 'notifications_active',
            items: [
              navItem('flow-open-alerts', 'Open', 'error', {
                section: 'Monitoring',
                group: 'Alerts',
              }),
              navItem('flow-resolved-alerts', 'Resolved', 'check_circle', {
                section: 'Monitoring',
                group: 'Alerts',
              }),
            ],
          },
        ],
      },
    ],
  },
  focus: {
    sections: [
      {
        header: 'Sprint',
        groups: [
          {
            label: 'Current sprint',
            icon: 'flag',
            items: [
              navItem('focus-board', 'Board', 'view_kanban', {
                section: 'Sprint',
                group: 'Current sprint',
              }),
              navItem('focus-burndown', 'Burndown', 'show_chart', {
                section: 'Sprint',
                group: 'Current sprint',
              }),
            ],
          },
          {
            label: 'Backlog',
            icon: 'view_list',
            items: [
              navItem('focus-prioritized', 'Prioritized', 'low_priority', {
                section: 'Sprint',
                group: 'Backlog',
              }),
              navItem('focus-icebox', 'Icebox', 'ac_unit', {
                section: 'Sprint',
                group: 'Backlog',
              }),
            ],
          },
          {
            label: 'Blockers',
            icon: 'block',
            items: [
              navItem('focus-assigned', 'Assigned to me', 'person', {
                section: 'Sprint',
                group: 'Blockers',
              }),
              navItem('focus-team-blockers', 'Team', 'groups', {
                section: 'Sprint',
                group: 'Blockers',
              }),
            ],
          },
        ],
      },
      {
        header: 'Tools',
        groups: [
          {
            label: 'Notes',
            icon: 'edit_note',
            items: [
              navItem('focus-meeting-notes', 'Meeting notes', 'event_note', {
                section: 'Tools',
                group: 'Notes',
              }),
              navItem('focus-scratchpad', 'Scratchpad', 'draw', {
                section: 'Tools',
                group: 'Notes',
              }),
            ],
          },
          {
            label: 'Focus timer',
            icon: 'timer',
            items: [
              navItem('focus-pomodoro', 'Pomodoro', 'hourglass_top', {
                section: 'Tools',
                group: 'Focus timer',
              }),
              navItem('focus-timer-history', 'History', 'history', {
                section: 'Tools',
                group: 'Focus timer',
              }),
            ],
          },
        ],
      },
    ],
  },
};

const showcaseNavSections: NavSection[] = [
  {
    header: 'Workspace',
    groups: [
      {
        label: 'Client programs',
        icon: 'folder',
        items: [
          navItem('showcase-active-clients', 'Active clients', 'business', {
            section: 'Workspace',
            group: 'Client programs',
          }),
          navItem('showcase-prospects', 'Prospects', 'person_search', {
            section: 'Workspace',
            group: 'Client programs',
          }),
        ],
      },
      {
        label: 'Delivery pipeline',
        icon: 'folder',
        items: [
          navItem('showcase-in-progress', 'In progress', 'pending', {
            section: 'Workspace',
            group: 'Delivery pipeline',
          }),
          navItem('showcase-completed', 'Completed', 'check_circle', {
            section: 'Workspace',
            group: 'Delivery pipeline',
          }),
        ],
      },
      {
        label: 'Infrastructure',
        icon: 'folder',
        badge: 'Live',
        items: [
          navItem('showcase-api-gateway', 'API gateway', 'crop_free', {
            section: 'Workspace',
            group: 'Infrastructure',
          }),
          navItem('showcase-auth-service', 'Auth service', 'crop_free', {
            section: 'Workspace',
            group: 'Infrastructure',
          }),
          navItem('showcase-data-sync', 'Data sync', 'crop_free', {
            section: 'Workspace',
            group: 'Infrastructure',
          }),
        ],
      },
      {
        label: 'Archived projects',
        icon: 'folder',
        items: [
          navItem('showcase-2025', '2025', 'inventory_2', {
            section: 'Workspace',
            group: 'Archived projects',
          }),
          navItem('showcase-2024', '2024', 'inventory_2', {
            section: 'Workspace',
            group: 'Archived projects',
          }),
        ],
      },
    ],
  },
  {
    header: 'Administration',
    groups: [
      {
        label: 'Team access',
        icon: 'folder',
        items: [
          navItem('showcase-members', 'Members', 'group', {
            section: 'Administration',
            group: 'Team access',
          }),
          navItem('showcase-roles', 'Roles', 'admin_panel_settings', {
            section: 'Administration',
            group: 'Team access',
          }),
        ],
      },
      {
        label: 'Integrations',
        icon: 'folder',
        items: [
          navItem('showcase-connected-apps', 'Connected apps', 'extension', {
            section: 'Administration',
            group: 'Integrations',
          }),
          navItem('showcase-webhooks', 'Webhooks', 'webhook', {
            section: 'Administration',
            group: 'Integrations',
          }),
        ],
      },
      {
        label: 'Audit log',
        icon: 'folder',
        items: [
          navItem('showcase-sign-ins', 'Sign-ins', 'login', {
            section: 'Administration',
            group: 'Audit log',
          }),
          navItem('showcase-changes', 'Changes', 'edit', {
            section: 'Administration',
            group: 'Audit log',
          }),
        ],
      },
    ],
  },
];

function firstShowcaseItemId() {
  return firstItemIdFromSections(showcaseNavSections);
}

function findShowcaseItem(itemId: string) {
  return findItemInSections(showcaseNavSections, itemId);
}

const utilityNav = [
  { icon: 'notifications', label: 'Notifications' },
  { icon: 'settings', label: 'Settings' },
  { icon: 'light_mode', label: 'Theme' },
  { icon: 'info', label: 'Info' },
];

function itemTooltip(label: string) {
  return { children: label, hidden: false };
}

function navIcon(icon: string, active = false) {
  return (
    <IconShell
      size="sm"
      type="neutral"
      variant={active ? 'primary' : 'secondary'}>
      <Icon icon={icon} />
    </IconShell>
  );
}

function NavMenuGroupRow({
  group,
  withIcons = false,
  defaultOpen = false,
  selectedId,
  onSelect,
}: {
  group: NavGroup;
  withIcons?: boolean;
  defaultOpen?: boolean;
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <Collapsible
      defaultOpen={defaultOpen}
      className="group/collapsible data-[state=open]:bg-fill-muted">
      <SidebarNavMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarNavMenuButton showChevron>
            {withIcons ? navIcon(group.icon) : null}
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
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarNavMenuSub>
            {group.items.map(item => {
              const isActive = selectedId === item.id;

              return (
                <SidebarMenuSubItem key={item.id}>
                  <SidebarNavMenuSubButton
                    isActive={isActive}
                    onClick={() => onSelect?.(item.id)}>
                    {withIcons ? navIcon(item.icon, isActive) : null}
                    <span>{item.label}</span>
                  </SidebarNavMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarNavMenuSub>
        </CollapsibleContent>
      </SidebarNavMenuItem>
    </Collapsible>
  );
}

function NavMenuSectionsContent({
  sections,
  withIcons = false,
  selectedId,
  onSelect,
}: {
  sections: NavSection[];
  withIcons?: boolean;
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <>
      {sections.map((section, sectionIndex) => (
        <SidebarGroup key={section.header}>
          <SidebarGroupLabel>{section.header}</SidebarGroupLabel>

          <SidebarMenu>
            {section.groups.map((group, index) => (
              <NavMenuGroupRow
                key={group.label}
                group={group}
                withIcons={withIcons}
                selectedId={selectedId}
                onSelect={onSelect}
                defaultOpen={sectionIndex === 0 && index === 0}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}

function NavMenuShowcaseContent({
  withIcons = false,
  selectedId,
  onSelect,
}: {
  withIcons?: boolean;
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <NavMenuSectionsContent
      sections={showcaseNavSections}
      withIcons={withIcons}
      selectedId={selectedId}
      onSelect={onSelect}
    />
  );
}

function NavMenuContent({
  active = 'home',
  withIcons = false,
  selectedId,
  onSelect,
}: {
  active?: NavId;
  withIcons?: boolean;
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <NavMenuSectionsContent
      sections={pageNav[active].sections}
      withIcons={withIcons}
      selectedId={selectedId}
      onSelect={onSelect}
    />
  );
}

function NavRailContent({
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
                <SidebarMenuIconButton
                  isActive={isActive}
                  tooltip={itemTooltip(item.label)}
                  onClick={() => onActive(item.id)}>
                  <IconShell
                    size={iconSize}
                    variant={isActive ? 'primary' : 'secondary'}>
                    <Icon icon={item.icon} />
                  </IconShell>
                </SidebarMenuIconButton>
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
              <SidebarFooterButton tooltip={itemTooltip(item.label)}>
                <IconShell size="default" variant="secondary">
                  <Icon icon={item.icon} />
                </IconShell>
              </SidebarFooterButton>
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

function LeftNavShell({
  mode,
  withIcons = false,
  showRail = true,
  showNavMenu = true,
  showcaseMenu = false,
  size = 'lg',
  sidebarSide = 'left',
  fullscreen,
  onToggleFullscreen,
}: {
  mode: 'inline' | 'overlay';
  withIcons?: boolean;
  showRail?: boolean;
  showNavMenu?: boolean;
  showcaseMenu?: boolean;
  size?: RailSize;
  sidebarSide?: 'left' | 'right';
  fullscreen: boolean;
  onToggleFullscreen: () => void;
}) {
  const navOverlay = useSidebarNavMenuOverlay<NavId>('home');
  const [selectedItemId, setSelectedItemId] = useState(() =>
    showcaseMenu ? firstShowcaseItemId() : firstItemId('home'),
  );
  const overlay = showRail && mode === 'overlay';

  useEffect(() => {
    if (showcaseMenu) {
      return;
    }

    setSelectedItemId(firstItemId(navOverlay.active));
  }, [navOverlay.active, showcaseMenu]);

  const pageItem = showcaseMenu
    ? (findShowcaseItem(selectedItemId) ??
      findShowcaseItem(firstShowcaseItemId()))
    : (findNavItem(navOverlay.active, selectedItemId) ??
      findNavItem(navOverlay.active, firstItemId(navOverlay.active)));

  function handleRailActive(id: NavId) {
    if (overlay) {
      navOverlay.selectActive(id);
      return;
    }

    navOverlay.setActive(id);
  }

  return (
    <div
      className={cn(
        'border-stroke-divider bg-surface-secondary flex w-full flex-col overflow-hidden',
        fullscreen ? 'h-full min-h-svh' : 'h-[720px] rounded-lg border',
      )}>
      <AppHeader
        fullscreen={fullscreen}
        onToggleFullscreen={onToggleFullscreen}
      />
      <div
        className={cn(
          'flex min-h-0 flex-1',
          sidebarSide === 'right' && 'flex-row-reverse',
        )}>
        <SidebarProvider
          layout="nav"
          size={size}
          side={sidebarSide}
          className="h-full min-h-0 w-auto">
          <SidebarNav>
            {showRail ? (
              <NavRailContent
                active={navOverlay.active}
                onActive={handleRailActive}
              />
            ) : null}
            {showNavMenu ? (
              <SidebarNavMenu
                mode={overlay ? 'overlay' : 'inline'}
                open={overlay ? navOverlay.open : undefined}
                onOpenChange={overlay ? navOverlay.setOpen : undefined}>
                {showcaseMenu ? (
                  <NavMenuShowcaseContent
                    withIcons={withIcons}
                    selectedId={selectedItemId}
                    onSelect={setSelectedItemId}
                  />
                ) : (
                  <NavMenuContent
                    key={navOverlay.active}
                    active={navOverlay.active}
                    withIcons={withIcons}
                    selectedId={selectedItemId}
                    onSelect={setSelectedItemId}
                  />
                )}
              </SidebarNavMenu>
            ) : null}
          </SidebarNav>
        </SidebarProvider>
        <AppMain
          title={pageItem?.title ?? ''}
          subtitle={pageItem?.subtitle ?? ''}
          body={pageItem?.body ?? ''}
        />
      </div>
    </div>
  );
}

function AppHeader({
  fullscreen,
  onToggleFullscreen,
}: {
  fullscreen: boolean;
  onToggleFullscreen: () => void;
}) {
  return (
    <header className="border-stroke-divider bg-surface-primary flex h-[72px] shrink-0 items-center gap-3 border-b px-6">
      <RegistryLogo className="h-6 w-6" />
      <span className="headings-h3-regular text-fg-primary">QuantumBlack</span>
      <Button size="sm" className="ml-auto" onClick={onToggleFullscreen}>
        <Icon icon={fullscreen ? 'close_fullscreen' : 'open_in_full'} />
        {fullscreen ? 'Close fullscreen' : 'Open fullscreen'}
      </Button>
    </header>
  );
}

function AppMain({
  title,
  subtitle,
  body,
}: {
  title: string;
  subtitle: string;
  body: string;
}) {
  return (
    <SidebarInset className="bg-surface-secondary overflow-auto p-8">
      <p className="paragraph-small text-fg-tertiary mb-1">{subtitle}</p>
      <h1 className="headings-h2-regular text-fg-primary mb-3">{title}</h1>
      <p className="paragraph-small text-fg-secondary max-w-2xl">{body}</p>
    </SidebarInset>
  );
}

function FullscreenShell({
  children,
}: {
  children: (props: {
    fullscreen: boolean;
    onToggleFullscreen: () => void;
  }) => ReactNode;
}) {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      {children({
        fullscreen: false,
        onToggleFullscreen: () => setFullscreen(true),
      })}
      <Dialog open={fullscreen} onOpenChange={setFullscreen}>
        <DialogContent
          showCloseButton={false}
          className="border-stroke-divider fixed inset-0 flex h-svh max-h-svh w-svw max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 p-0 shadow-none sm:max-w-none">
          <DialogTitle className="sr-only">App shell preview</DialogTitle>
          {children({
            fullscreen: true,
            onToggleFullscreen: () => setFullscreen(false),
          })}
        </DialogContent>
      </Dialog>
    </>
  );
}

function SidebarFrame({ children }: { children: ReactNode }) {
  return (
    <div className="border-stroke-divider h-[996px] w-full overflow-hidden rounded-lg border">
      {children}
    </div>
  );
}

function LabeledSection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="paragraph-small text-fg-secondary">{label}</span>
      {children}
    </div>
  );
}

export function SidebarApp() {
  return (
    <FullscreenShell>
      {({ fullscreen, onToggleFullscreen }) => (
        <LeftNavShell
          mode="overlay"
          withIcons
          fullscreen={fullscreen}
          onToggleFullscreen={onToggleFullscreen}
        />
      )}
    </FullscreenShell>
  );
}

export function SidebarAppRight() {
  return (
    <FullscreenShell>
      {({ fullscreen, onToggleFullscreen }) => (
        <LeftNavShell
          mode="overlay"
          withIcons
          sidebarSide="right"
          fullscreen={fullscreen}
          onToggleFullscreen={onToggleFullscreen}
        />
      )}
    </FullscreenShell>
  );
}

function NavRailFrame({ size }: { size: RailSize }) {
  const [active, setActive] = useState<NavId>('home');

  return (
    <SidebarProvider
      layout="nav"
      size={size}
      className="h-[840px] min-h-0 w-auto">
      <SidebarNav className="h-full min-h-0 w-auto">
        <NavRailContent active={active} onActive={setActive} />
      </SidebarNav>
    </SidebarProvider>
  );
}

export function SidebarSizes() {
  return (
    <SidebarFrame>
      <div className="bg-surface-secondary flex h-full items-start justify-center gap-8 p-6">
        <RailSizeSection size="default" label="Default" />
        <RailSizeSection size="lg" label="Large" />
      </div>
    </SidebarFrame>
  );
}

function RailSizeSection({ size, label }: { size: RailSize; label: string }) {
  return (
    <FullscreenShell>
      {({ fullscreen, onToggleFullscreen }) =>
        fullscreen ? (
          <LeftNavShell
            mode="inline"
            showNavMenu={false}
            size={size}
            fullscreen
            onToggleFullscreen={onToggleFullscreen}
          />
        ) : (
          <LabeledSection label={label}>
            <Button size="sm" onClick={onToggleFullscreen}>
              <Icon icon="open_in_full" />
              Open fullscreen
            </Button>
            <NavRailFrame size={size} />
          </LabeledSection>
        )
      }
    </FullscreenShell>
  );
}

function NavMenuStandalone({
  size,
  withIcons = false,
}: {
  size: RailSize;
  withIcons?: boolean;
}) {
  const [selectedId, setSelectedId] = useState(firstShowcaseItemId);

  return (
    <div className="h-[520px]">
      <SidebarProvider
        layout="nav"
        size={size}
        className="h-full min-h-0 w-auto">
        <SidebarNav className="h-full min-h-0 w-auto">
          <SidebarNavMenu className="h-full">
            <NavMenuShowcaseContent
              withIcons={withIcons}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </SidebarNavMenu>
        </SidebarNav>
      </SidebarProvider>
    </div>
  );
}

function NavMenuFullscreenTrigger({
  size,
  withIcons,
  label,
}: {
  size: RailSize;
  withIcons: boolean;
  label: string;
}) {
  return (
    <FullscreenShell>
      {({ fullscreen, onToggleFullscreen }) =>
        fullscreen ? (
          <LeftNavShell
            mode="inline"
            showRail={false}
            showcaseMenu
            withIcons={withIcons}
            size={size}
            fullscreen
            onToggleFullscreen={onToggleFullscreen}
          />
        ) : (
          <Button size="sm" onClick={onToggleFullscreen}>
            <Icon icon="open_in_full" />
            {label}
          </Button>
        )
      }
    </FullscreenShell>
  );
}

function NavMenuSizeShowcase({ withIcons }: { withIcons: boolean }) {
  return (
    <div className="border-stroke-divider w-full overflow-hidden rounded-lg border">
      <div className="bg-surface-secondary flex flex-col gap-6 p-6">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <NavMenuFullscreenTrigger
            size="default"
            withIcons={withIcons}
            label="Open default fullscreen"
          />
          <NavMenuFullscreenTrigger
            size="lg"
            withIcons={withIcons}
            label="Open large fullscreen"
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <LabeledSection label="Default">
            <NavMenuStandalone size="default" withIcons={withIcons} />
          </LabeledSection>
          <LabeledSection label="Large">
            <NavMenuStandalone size="lg" withIcons={withIcons} />
          </LabeledSection>
        </div>
      </div>
    </div>
  );
}

export function SidebarNavMenuSizes() {
  return <NavMenuSizeShowcase withIcons={false} />;
}

export function SidebarNavMenuIcons() {
  return <NavMenuSizeShowcase withIcons />;
}

export const examples: DemoExample[] = [
  {
    name: 'SidebarApp',
    title: 'Sidebar',
    description:
      'Icon rail where each icon opens its own NavMenu from behind the rail. Open fullscreen for the full app shell.',
  },
  {
    name: 'SidebarSizes',
    title: 'Sidebar sizes',
    description:
      'SidebarNavRail at default and lg, side by side. Open fullscreen for the rail in an app shell.',
  },
  {
    name: 'SidebarNavMenuSizes',
    title: 'NavMenu sizes',
    description:
      'NavMenu at default and lg without icons. Open fullscreen for an app shell preview.',
  },
  {
    name: 'SidebarNavMenuIcons',
    title: 'NavMenu with icons',
    description:
      'NavMenu at default and lg with icons on groups and sub-items. Open fullscreen for an app shell preview.',
  },
];

export const sidebar = createLegacyDemo('sidebar', examples, {
  SidebarApp: <SidebarApp />,
  SidebarSizes: <SidebarSizes />,
  SidebarNavMenuSizes: <SidebarNavMenuSizes />,
  SidebarNavMenuIcons: <SidebarNavMenuIcons />,
});
