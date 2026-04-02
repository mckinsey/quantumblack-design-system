import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';
import * as React from 'react';

import { Delete } from '@/components/icons/Delete';
import { Edit } from '@/components/icons/Edit';
import { Mail } from '@/components/icons/Mail';
import { Person } from '@/components/icons/Person';
import { Send } from '@/components/icons/Send';
import { Button } from '@/components/ui/button';
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

// ============================================================================
// Example Components
// ============================================================================

/**
 * Basic dropdown menu with labels and separators
 */
export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="start">
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
    </DropdownMenu>
  );
}

/**
 * Dropdown with keyboard shortcut hints
 */
export function DropdownMenuWithShortcuts() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-44" align="start">
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
    </DropdownMenu>
  );
}

/**
 * Dropdown with icons alongside labels
 */
export function DropdownMenuWithIcons() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem>
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>

        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Nested submenus for secondary actions
 */
export function DropdownMenuWithSubmenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Person className="size-4" />
            Team
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Send className="size-4" />
              Invite users
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail className="size-4" />
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
    </DropdownMenu>
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="start">
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
    </DropdownMenu>
  );
}

/**
 * Radio group for exclusive choices
 */
export function DropdownMenuWithRadioGroup() {
  const [position, setPosition] = React.useState('bottom');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-32" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>

          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Destructive variant for irreversible actions
 */
export function DropdownMenuDestructive() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Edit className="size-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Send className="size-4" />
            Share
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <Delete className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
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
    Destructive: <DropdownMenuDestructive />,
  },
};
