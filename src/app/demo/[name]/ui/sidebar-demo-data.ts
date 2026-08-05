export type RailSize = 'default' | 'lg';

export const primaryNav = [
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

export type NavId = (typeof primaryNav)[number]['id'];

export type NavLink = {
  id: string;
  label: string;
  icon: string;
  title: string;
  subtitle: string;
  body: string;
};

export type NavGroup = {
  label: string;
  icon: string;
  badge?: string;
  items: NavLink[];
};

export type NavSection = {
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

export function firstItemId(navId: NavId) {
  return firstItemIdFromSections(pageNav[navId].sections);
}

export function findNavItem(navId: NavId, itemId: string) {
  return findItemInSections(pageNav[navId].sections, itemId);
}

export const pageNav: Record<NavId, { sections: NavSection[] }> = {
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

export const showcaseNavSections: NavSection[] = [
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

export function firstShowcaseItemId() {
  return firstItemIdFromSections(showcaseNavSections);
}

export function findShowcaseItem(itemId: string) {
  return findItemInSections(showcaseNavSections, itemId);
}

export const utilityNav = [
  { icon: 'notifications', label: 'Notifications' },
  { icon: 'settings', label: 'Settings' },
  { icon: 'light_mode', label: 'Theme' },
  { icon: 'info', label: 'Info' },
];
