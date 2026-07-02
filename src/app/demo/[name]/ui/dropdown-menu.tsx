import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { Toggle } from '@/components/ui/toggle';

// When the menu trigger merges props, Radix may set `data-state="open"` instead of
// the toggle’s `on` — mirror the pressed styles for both.
const DROPDOWN_TOGGLE_TRIGGER_OPEN =
  'data-[state=open]:bg-fill-active data-[state=open]:text-fg-primary-inverse data-[state=open]:border-stroke-active-inverse data-[state=open]:border-2';

/** Pass on `DropdownMenuContent` / `DropdownMenuSubContent` via `className`. */
const DROPDOWN_MENU_PANEL_CLASS = 'w-[256px] max-w-[256px] min-w-[256px]';

function DropdownMenuWithToggleTrigger({
  triggerLabel,
  children,
}: Readonly<{
  triggerLabel: React.ReactNode;
  children: React.ReactNode;
}>) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Toggle
          variant="outline"
          pressed={open}
          onPressedChange={setOpen}
          className={DROPDOWN_TOGGLE_TRIGGER_OPEN}>
          {triggerLabel}
        </Toggle>
      </DropdownMenuTrigger>

      {children}
    </DropdownMenu>
  );
}

// ============================================================================
// Example Components
// ============================================================================

/**
 * Basic dropdown menu with labels and separators
 */
export function DropdownMenuDemo() {
  return (
    <DropdownMenuWithToggleTrigger triggerLabel="Open">
      <DropdownMenuContent align="start" className={DROPDOWN_MENU_PANEL_CLASS}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuWithToggleTrigger>
  );
}

/**
 * Dropdown with keyboard shortcut hints
 */
export function DropdownMenuWithShortcuts() {
  return (
    <DropdownMenuWithToggleTrigger triggerLabel="Open">
      <DropdownMenuContent align="start" className={DROPDOWN_MENU_PANEL_CLASS}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuWithToggleTrigger>
  );
}

/**
 * Dropdown with icons alongside labels
 */
export function DropdownMenuWithIcons() {
  return (
    <DropdownMenuWithToggleTrigger triggerLabel="Open">
      <DropdownMenuContent align="start" className={DROPDOWN_MENU_PANEL_CLASS}>
        <DropdownMenuItem>
          <IconShell size="sm" variant="secondary">
            <Icon icon="person" />
          </IconShell>
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem>
          <IconShell size="sm" variant="secondary">
            <Icon icon="attach_money" />
          </IconShell>
          Billing
        </DropdownMenuItem>

        <DropdownMenuItem>
          <IconShell size="sm" variant="secondary">
            <Icon icon="key" />
          </IconShell>
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive">
          <IconShell size="sm" variant="secondary">
            <Icon icon="close" />
          </IconShell>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuWithToggleTrigger>
  );
}

/**
 * Nested submenus for secondary actions
 */
export function DropdownMenuWithSubmenu() {
  return (
    <DropdownMenuWithToggleTrigger triggerLabel="Open">
      <DropdownMenuContent align="start" className={DROPDOWN_MENU_PANEL_CLASS}>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconShell size="sm" variant="secondary">
              <Icon icon="person" />
            </IconShell>
            Team
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <IconShell size="sm" variant="secondary">
                <Icon icon="send" />
              </IconShell>
              Invite users
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent className={DROPDOWN_MENU_PANEL_CLASS}>
                <DropdownMenuItem>
                  <IconShell size="sm" variant="secondary">
                    <Icon icon="mail" />
                  </IconShell>
                  Email
                </DropdownMenuItem>

                <DropdownMenuItem>Message</DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem>More&hellip;</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenuWithToggleTrigger>
  );
}

/**
 * Checkbox items for toggling options
 */
export function DropdownMenuWithCheckboxes() {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <DropdownMenuWithToggleTrigger triggerLabel="Open">
      <DropdownMenuContent align="start" className={DROPDOWN_MENU_PANEL_CLASS}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>

          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}>
            Status Bar
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
            disabled>
            Activity Bar
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}>
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenuWithToggleTrigger>
  );
}

/**
 * Radio group for exclusive choices
 */
export function DropdownMenuWithRadioGroup() {
  const [position, setPosition] = React.useState('bottom');

  return (
    <DropdownMenuWithToggleTrigger triggerLabel="Open">
      <DropdownMenuContent align="start" className={DROPDOWN_MENU_PANEL_CLASS}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>

          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenuWithToggleTrigger>
  );
}

/**
 * Larger touch targets and typography
 */
export function DropdownMenuLarge() {
  return (
    <DropdownMenuWithToggleTrigger triggerLabel="Open">
      <DropdownMenuContent
        align="start"
        size="lg"
        className={DROPDOWN_MENU_PANEL_CLASS}>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconShell size="default" variant="secondary">
              <Icon icon="person" />
            </IconShell>
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem>
            <IconShell size="default" variant="secondary">
              <Icon icon="attach_money" />
            </IconShell>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger inset>Invite users</DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent
                size="lg"
                className={DROPDOWN_MENU_PANEL_CLASS}>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenuWithToggleTrigger>
  );
}

/**
 * Destructive variant for irreversible actions
 */
export function DropdownMenuDestructive() {
  return (
    <DropdownMenuWithToggleTrigger triggerLabel="Actions">
      <DropdownMenuContent align="start" className={DROPDOWN_MENU_PANEL_CLASS}>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconShell size="sm" variant="secondary">
              <Icon icon="edit" />
            </IconShell>
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem>
            <IconShell size="sm" variant="secondary">
              <Icon icon="send" />
            </IconShell>
            Share
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <IconShell size="sm" variant="secondary">
              <Icon icon="delete" />
            </IconShell>
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenuWithToggleTrigger>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

export const examples = [
  {
    name: 'DropdownMenuDemo',
    title: 'Default',
    description: 'Basic dropdown menu with labels and separators.',
  },
  {
    name: 'DropdownMenuWithShortcuts',
    title: 'Shortcuts',
    description: 'Dropdown menu items with keyboard shortcut hints.',
  },
  {
    name: 'DropdownMenuWithIcons',
    title: 'With Icons',
    description: 'Dropdown items combined with icons for quick scanning.',
  },
  {
    name: 'DropdownMenuWithSubmenu',
    title: 'Submenu',
    description: 'Nested submenus for secondary actions.',
  },
  {
    name: 'DropdownMenuWithCheckboxes',
    title: 'Checkboxes',
    description: 'Checkbox items for toggling multiple options.',
  },
  {
    name: 'DropdownMenuWithRadioGroup',
    title: 'Radio Group',
    description: 'Radio group for exclusive choices.',
  },
  {
    name: 'DropdownMenuLarge',
    title: 'Large',
    description: 'Larger touch targets and typography.',
  },
  {
    name: 'DropdownMenuDestructive',
    title: 'Destructive',
    description: 'Destructive variant for irreversible actions.',
  },
];

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const dropdownMenu = {
  name: 'dropdown-menu',
  components: {
    Default: <DropdownMenuDemo />,
    Shortcuts: <DropdownMenuWithShortcuts />,
    'With Icons': <DropdownMenuWithIcons />,
    Submenu: <DropdownMenuWithSubmenu />,
    Checkboxes: <DropdownMenuWithCheckboxes />,
    'Radio Group': <DropdownMenuWithRadioGroup />,
    Large: <DropdownMenuLarge />,
    Destructive: <DropdownMenuDestructive />,
  },
};
