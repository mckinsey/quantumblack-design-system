'use client';

import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';

export const ACTION_MENU_PANEL_FIGMA =
  'w-[180px] min-w-[180px] max-w-[180px]';

export const ACTION_MENU_PANEL_DEMO =
  'w-[256px] min-w-[256px] max-w-[256px]';

export type ActionMenuUi = {
  Content: React.ElementType;
  Item: React.ElementType;
  Label: React.ElementType;
  Separator: React.ElementType;
  Shortcut: React.ElementType;
  Sub: React.ElementType;
  SubTrigger: React.ElementType;
  SubContent: React.ElementType;
  Portal: React.ElementType;
  Group: React.ElementType;
  CheckboxItem: React.ElementType;
  RadioGroup: React.ElementType;
  RadioItem: React.ElementType;
};

function FigmaLeadingIcon({ size = 'sm' }: { size?: 'sm' | 'default' }) {
  return (
    <IconShell size={size} variant="secondary">
      <Icon icon="crop_free" size={size === 'default' ? 'default' : 'sm'} />
    </IconShell>
  );
}

export function ActionMenuFigmaContextBody({ ui: U }: { ui: ActionMenuUi }) {
  return (
    <>
      <U.Group>
        <U.Label>GROUP HEADING</U.Label>

        <U.Item>
          <FigmaLeadingIcon />
          Item label
          <U.Shortcut>⌥⌘S</U.Shortcut>
        </U.Item>

        <U.Item>
          <FigmaLeadingIcon />
          Item label
          <U.Shortcut>⌥⌘S</U.Shortcut>
        </U.Item>
      </U.Group>

      <U.Separator />

      <U.Group>
        <U.Label>GROUP HEADING</U.Label>

        <U.Item>
          <FigmaLeadingIcon />
          Item label
          <U.Shortcut>⌥⌘S</U.Shortcut>
        </U.Item>

        <U.Sub>
          <U.SubTrigger inset>
            <FigmaLeadingIcon />
            Item label
          </U.SubTrigger>

          <U.Portal>
            <U.SubContent className={ACTION_MENU_PANEL_FIGMA}>
              <U.Item>Nested item</U.Item>
              <U.Item>Nested item</U.Item>
            </U.SubContent>
          </U.Portal>
        </U.Sub>

        <U.Item inset>
          <IconShell size="sm" variant="primary">
            <Icon icon="done" size="sm" />
          </IconShell>
          Item label
          <U.Shortcut>⌥⌘S</U.Shortcut>
        </U.Item>

        <U.Item disabled>
          <FigmaLeadingIcon />
          Item label
          <U.Shortcut>⌥⌘S</U.Shortcut>
        </U.Item>
      </U.Group>
    </>
  );
}

export function ActionMenuDefaultBody({ ui: U }: { ui: ActionMenuUi }) {
  return (
    <>
      <U.Group>
        <U.Label>My Account</U.Label>
        <U.Item>Profile</U.Item>
        <U.Item>Billing</U.Item>
        <U.Item>Settings</U.Item>
      </U.Group>

      <U.Separator />

      <U.Item>GitHub</U.Item>
      <U.Item>Support</U.Item>
      <U.Item disabled>API</U.Item>
    </>
  );
}

export function ActionMenuShortcutsBody({ ui: U }: { ui: ActionMenuUi }) {
  return (
    <>
      <U.Group>
        <U.Label>My Account</U.Label>

        <U.Item>
          Profile
          <U.Shortcut>⇧⌘P</U.Shortcut>
        </U.Item>

        <U.Item>
          Billing
          <U.Shortcut>⌘B</U.Shortcut>
        </U.Item>

        <U.Item>
          Settings
          <U.Shortcut>⌘S</U.Shortcut>
        </U.Item>
      </U.Group>

      <U.Separator />

      <U.Item>
        Log out
        <U.Shortcut>⇧⌘Q</U.Shortcut>
      </U.Item>
    </>
  );
}

export function ActionMenuIconsBody({ ui: U }: { ui: ActionMenuUi }) {
  return (
    <>
      <U.Item>
        <IconShell size="sm" variant="secondary">
          <Icon icon="person" size="sm" />
        </IconShell>
        Profile
      </U.Item>

      <U.Item>
        <IconShell size="sm" variant="secondary">
          <Icon icon="attach_money" size="sm" />
        </IconShell>
        Billing
      </U.Item>

      <U.Item>
        <IconShell size="sm" variant="secondary">
          <Icon icon="key" size="sm" />
        </IconShell>
        Settings
      </U.Item>

      <U.Separator />

      <U.Item variant="destructive">
        <IconShell size="sm" variant="secondary">
          <Icon icon="close" size="sm" />
        </IconShell>
        Log out
      </U.Item>
    </>
  );
}

export function ActionMenuSubmenuBody({ ui: U }: { ui: ActionMenuUi }) {
  return (
    <U.Group>
      <U.Item>
        <IconShell size="sm" variant="secondary">
          <Icon icon="person" size="sm" />
        </IconShell>
        Team
      </U.Item>

      <U.Sub>
        <U.SubTrigger>
          <IconShell size="sm" variant="secondary">
            <Icon icon="send" size="sm" />
          </IconShell>
          Invite users
        </U.SubTrigger>

        <U.Portal>
          <U.SubContent className={ACTION_MENU_PANEL_DEMO}>
            <U.Item>
              <IconShell size="sm" variant="secondary">
                <Icon icon="mail" size="sm" />
              </IconShell>
              Email
            </U.Item>

            <U.Item>Message</U.Item>

            <U.Separator />

            <U.Item>More&hellip;</U.Item>
          </U.SubContent>
        </U.Portal>
      </U.Sub>

      <U.Item>
        New Team
        <U.Shortcut>⌘+T</U.Shortcut>
      </U.Item>
    </U.Group>
  );
}

export function ActionMenuSelectedRowBody({ ui: U }: { ui: ActionMenuUi }) {
  return (
    <>
      <U.Item inset>
        <IconShell size="sm" variant="primary">
          <Icon icon="done" size="sm" />
        </IconShell>
        Current workspace
      </U.Item>

      <U.Item inset>Other workspace</U.Item>
    </>
  );
}

export function ActionMenuCheckboxesBody({ ui: U }: { ui: ActionMenuUi }) {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <U.Group>
      <U.Label>Appearance</U.Label>

      <U.CheckboxItem
        checked={showStatusBar}
        onCheckedChange={setShowStatusBar}>
        Status Bar
      </U.CheckboxItem>

      <U.CheckboxItem
        checked={showActivityBar}
        onCheckedChange={setShowActivityBar}
        disabled>
        Activity Bar
      </U.CheckboxItem>

      <U.CheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
        Panel
      </U.CheckboxItem>
    </U.Group>
  );
}

export function ActionMenuRadioGroupBody({ ui: U }: { ui: ActionMenuUi }) {
  const [position, setPosition] = React.useState('bottom');

  return (
    <U.Group>
      <U.Label>Panel Position</U.Label>

      <U.RadioGroup value={position} onValueChange={setPosition}>
        <U.RadioItem value="top">Top</U.RadioItem>
        <U.RadioItem value="bottom">Bottom</U.RadioItem>
        <U.RadioItem value="right">Right</U.RadioItem>
      </U.RadioGroup>
    </U.Group>
  );
}

export function ActionMenuLargeBody({ ui: U }: { ui: ActionMenuUi }) {
  return (
    <U.Group>
      <U.Item>
        <FigmaLeadingIcon size="default" />
        Profile
      </U.Item>

      <U.Item>
        <FigmaLeadingIcon size="default" />
        Billing
        <U.Shortcut>⌘B</U.Shortcut>
      </U.Item>

      <U.Sub>
        <U.SubTrigger inset>Invite users</U.SubTrigger>

        <U.Portal>
          <U.SubContent size="lg" className={ACTION_MENU_PANEL_DEMO}>
            <U.Item>Email</U.Item>
            <U.Item>Message</U.Item>
          </U.SubContent>
        </U.Portal>
      </U.Sub>
    </U.Group>
  );
}

export function ActionMenuDestructiveBody({ ui: U }: { ui: ActionMenuUi }) {
  return (
    <>
      <U.Group>
        <U.Item>
          <IconShell size="sm" variant="secondary">
            <Icon icon="edit" size="sm" />
          </IconShell>
          Edit
        </U.Item>

        <U.Item>
          <IconShell size="sm" variant="secondary">
            <Icon icon="send" size="sm" />
          </IconShell>
          Share
        </U.Item>
      </U.Group>

      <U.Separator />

      <U.Group>
        <U.Item variant="destructive">
          <IconShell size="sm" variant="secondary">
            <Icon icon="delete" size="sm" />
          </IconShell>
          Delete
        </U.Item>
      </U.Group>
    </>
  );
}

export const actionMenuExampleMeta = [
  {
    key: 'FigmaContext',
    title: 'Figma Menu/Context',
    description:
      'Menu/Context layout: group headings, leading icons, shortcuts, submenu, selected row (done), disabled.',
  },
  {
    key: 'Default',
    title: 'Default',
    description: 'Basic menu with labels and separators.',
  },
  {
    key: 'Shortcuts',
    title: 'Shortcuts',
    description: 'Items with keyboard shortcut hints.',
  },
  {
    key: 'WithIcons',
    title: 'With Icons',
    description: 'Leading IconShell + icon composition.',
  },
  {
    key: 'Submenu',
    title: 'Submenu',
    description: 'Nested submenus for secondary actions.',
  },
  {
    key: 'SelectedRow',
    title: 'Selected row',
    description:
      'MenuItem/Context selected: inset row with leading done indicator.',
  },
  {
    key: 'Checkboxes',
    title: 'Checkboxes',
    description: 'Checkbox items (Radix; not on Menus Figma page).',
  },
  {
    key: 'RadioGroup',
    title: 'Radio Group',
    description: 'Radio group for exclusive choices.',
  },
  {
    key: 'Large',
    title: 'Large',
    description: 'size=lg panel and items.',
  },
  {
    key: 'Destructive',
    title: 'Destructive',
    description: 'Destructive item variant (code extension).',
  },
] as const;
