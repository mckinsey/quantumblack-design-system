import * as React from 'react';

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Icon } from '@/components/ui/icon';

/** Pass on `ContextMenuContent` / `ContextMenuSubContent` via `className`. */
const CONTEXT_MENU_PANEL_CLASS = 'w-[256px] max-w-[256px] min-w-[256px]';

const TRIGGER_CLASS =
  'border-stroke-tertiary text-fg-secondary paragraph-regular-primary flex h-[150px] w-[300px] items-center justify-center border border-dashed select-none';

function ContextMenuTriggerArea({
  children,
  label = 'Right-click here',
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={TRIGGER_CLASS}>{label}</ContextMenuTrigger>

      {children}
    </ContextMenu>
  );
}

// ============================================================================
// Example Components
// ============================================================================

/**
 * Basic context menu with labels and separators
 */
export function ContextMenuDemo() {
  return (
    <ContextMenuTriggerArea>
      <ContextMenuContent className={CONTEXT_MENU_PANEL_CLASS}>
        <ContextMenuGroup>
          <ContextMenuLabel>My Account</ContextMenuLabel>
          <ContextMenuItem>Profile</ContextMenuItem>
          <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuItem>Settings</ContextMenuItem>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuItem>GitHub</ContextMenuItem>
        <ContextMenuItem>Support</ContextMenuItem>
        <ContextMenuItem disabled>API</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuTriggerArea>
  );
}

/**
 * Context menu with keyboard shortcut hints
 */
export function ContextMenuWithShortcuts() {
  return (
    <ContextMenuTriggerArea>
      <ContextMenuContent className={CONTEXT_MENU_PANEL_CLASS}>
        <ContextMenuGroup>
          <ContextMenuLabel>My Account</ContextMenuLabel>

          <ContextMenuItem>
            Profile
            <ContextMenuShortcut>⇧⌘P</ContextMenuShortcut>
          </ContextMenuItem>

          <ContextMenuItem>
            Billing
            <ContextMenuShortcut>⌘B</ContextMenuShortcut>
          </ContextMenuItem>

          <ContextMenuItem>
            Settings
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuItem>
          Log out
          <ContextMenuShortcut>⇧⌘Q</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuTriggerArea>
  );
}

/**
 * Context menu with icons alongside labels
 */
export function ContextMenuWithIcons() {
  return (
    <ContextMenuTriggerArea>
      <ContextMenuContent className={CONTEXT_MENU_PANEL_CLASS}>
        <ContextMenuItem>
          <Icon icon="person" className="size-4" />
          Profile
        </ContextMenuItem>

        <ContextMenuItem>
          <Icon icon="attach_money" className="size-4" />
          Billing
        </ContextMenuItem>

        <ContextMenuItem>
          <Icon icon="key" className="size-4" />
          Settings
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem variant="destructive">
          <Icon icon="close" className="size-4" />
          Log out
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuTriggerArea>
  );
}

/**
 * Nested submenus for secondary actions
 */
export function ContextMenuWithSubmenu() {
  return (
    <ContextMenuTriggerArea>
      <ContextMenuContent className={CONTEXT_MENU_PANEL_CLASS}>
        <ContextMenuGroup>
          <ContextMenuItem>
            <Icon icon="person" className="size-4" />
            Team
          </ContextMenuItem>

          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Icon icon="send" className="size-4" />
              Invite users
            </ContextMenuSubTrigger>

            <ContextMenuPortal>
              <ContextMenuSubContent className={CONTEXT_MENU_PANEL_CLASS}>
                <ContextMenuItem>
                  <Icon icon="mail" className="size-4" />
                  Email
                </ContextMenuItem>

                <ContextMenuItem>Message</ContextMenuItem>

                <ContextMenuSeparator />

                <ContextMenuItem>More&hellip;</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuPortal>
          </ContextMenuSub>

          <ContextMenuItem>
            New Team
            <ContextMenuShortcut>⌘+T</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenuTriggerArea>
  );
}

/**
 * Checkbox items for toggling options
 */
export function ContextMenuWithCheckboxes() {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <ContextMenuTriggerArea>
      <ContextMenuContent className={CONTEXT_MENU_PANEL_CLASS}>
        <ContextMenuGroup>
          <ContextMenuLabel>Appearance</ContextMenuLabel>

          <ContextMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}>
            Status Bar
          </ContextMenuCheckboxItem>

          <ContextMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
            disabled>
            Activity Bar
          </ContextMenuCheckboxItem>

          <ContextMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}>
            Panel
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenuTriggerArea>
  );
}

/**
 * Radio group for exclusive choices
 */
export function ContextMenuWithRadioGroup() {
  const [position, setPosition] = React.useState('bottom');

  return (
    <ContextMenuTriggerArea>
      <ContextMenuContent className={CONTEXT_MENU_PANEL_CLASS}>
        <ContextMenuGroup>
          <ContextMenuLabel>Panel Position</ContextMenuLabel>

          <ContextMenuRadioGroup value={position} onValueChange={setPosition}>
            <ContextMenuRadioItem value="top">Top</ContextMenuRadioItem>
            <ContextMenuRadioItem value="bottom">Bottom</ContextMenuRadioItem>
            <ContextMenuRadioItem value="right">Right</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenuTriggerArea>
  );
}

/**
 * Destructive variant for irreversible actions
 */
export function ContextMenuDestructive() {
  return (
    <ContextMenuTriggerArea label="Right-click for actions">
      <ContextMenuContent className={CONTEXT_MENU_PANEL_CLASS}>
        <ContextMenuGroup>
          <ContextMenuItem>
            <Icon icon="edit" className="size-4" />
            Edit
          </ContextMenuItem>

          <ContextMenuItem>
            <Icon icon="send" className="size-4" />
            Share
          </ContextMenuItem>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">
            <Icon icon="delete" className="size-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenuTriggerArea>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

export const examples = [
  {
    name: 'ContextMenuDemo',
    title: 'Default',
    description: 'Basic context menu with labels and separators.',
  },
  {
    name: 'ContextMenuWithShortcuts',
    title: 'Shortcuts',
    description: 'Context menu items with keyboard shortcut hints.',
  },
  {
    name: 'ContextMenuWithIcons',
    title: 'With Icons',
    description: 'Context items combined with icons for quick scanning.',
  },
  {
    name: 'ContextMenuWithSubmenu',
    title: 'Submenu',
    description: 'Nested submenus for secondary actions.',
  },
  {
    name: 'ContextMenuWithCheckboxes',
    title: 'Checkboxes',
    description: 'Checkbox items for toggling multiple options.',
  },
  {
    name: 'ContextMenuWithRadioGroup',
    title: 'Radio Group',
    description: 'Radio group for exclusive choices.',
  },
  {
    name: 'ContextMenuDestructive',
    title: 'Destructive',
    description: 'Destructive variant for irreversible actions.',
  },
];

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const contextMenu = {
  name: 'context-menu',
  components: {
    Default: <ContextMenuDemo />,
    Shortcuts: <ContextMenuWithShortcuts />,
    'With Icons': <ContextMenuWithIcons />,
    Submenu: <ContextMenuWithSubmenu />,
    Checkboxes: <ContextMenuWithCheckboxes />,
    'Radio Group': <ContextMenuWithRadioGroup />,
    Destructive: <ContextMenuDestructive />,
  },
};
