'use client';

import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';

export const ACTION_MENU_PANEL_FIGMA = 'w-[240px] min-w-[240px] max-w-[240px]';

export const ACTION_MENU_PANEL_DEMO = 'w-[256px] min-w-[256px] max-w-[256px]';

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

function DoneSlot({ on }: { on?: boolean }) {
  return (
    <>
      <IconShell
        size="sm"
        variant="primary"
        className={on ? undefined : 'invisible'}>
        <Icon icon="done" size="sm" />
      </IconShell>
      {on ? <span className="sr-only">Selected</span> : null}
    </>
  );
}

function ContextRow({
  ui: U,
  selected,
  disabled,
  divider,
}: {
  ui: ActionMenuUi;
  selected?: boolean;
  disabled?: boolean;
  divider?: boolean;
}) {
  return (
    <>
      <U.Item disabled={disabled}>
        <DoneSlot on={selected} />
        <FigmaLeadingIcon />
        Item label
        <U.Shortcut>⌥⌘S</U.Shortcut>
      </U.Item>

      {divider ? <U.Separator /> : null}
    </>
  );
}

function SubRow({ ui: U, disabled }: { ui: ActionMenuUi; disabled?: boolean }) {
  return (
    <U.Item disabled={disabled}>
      <FigmaLeadingIcon />
      Item label
      <U.Shortcut>⌥⌘S</U.Shortcut>
    </U.Item>
  );
}

export function ActionMenuCompositionBody({ ui: U }: { ui: ActionMenuUi }) {
  return (
    <>
      <U.Group>
        <U.Label>GROUP HEADING</U.Label>
        <ContextRow ui={U} divider />
        <ContextRow ui={U} divider />
      </U.Group>

      <U.Group>
        <U.Label>GROUP HEADING</U.Label>
        <ContextRow ui={U} divider />

        <U.Sub>
          <U.SubTrigger inset>
            <FigmaLeadingIcon />
            Item label
          </U.SubTrigger>

          <U.Portal>
            <U.SubContent className={ACTION_MENU_PANEL_FIGMA}>
              <SubRow ui={U} />
              <SubRow ui={U} disabled />
              <SubRow ui={U} />

              <U.Sub>
                <U.SubTrigger>
                  <FigmaLeadingIcon />
                  Item label
                </U.SubTrigger>

                <U.Portal>
                  <U.SubContent className={ACTION_MENU_PANEL_FIGMA}>
                    <SubRow ui={U} />
                    <SubRow ui={U} />
                  </U.SubContent>
                </U.Portal>
              </U.Sub>

              <SubRow ui={U} disabled />
            </U.SubContent>
          </U.Portal>
        </U.Sub>

        <ContextRow ui={U} selected divider />
        <ContextRow ui={U} />
        <ContextRow ui={U} divider />
        <ContextRow ui={U} />
        <ContextRow ui={U} disabled />
        <ContextRow ui={U} selected />
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

export function ActionMenuRadioGroupBody({
  ui: U,
  value,
  onValueChange,
}: {
  ui: ActionMenuUi;
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <U.Group>
      <U.Label>Panel Position</U.Label>

      <U.RadioGroup value={value} onValueChange={onValueChange}>
        <U.RadioItem value="top">Top</U.RadioItem>
        <U.RadioItem value="bottom">Bottom</U.RadioItem>
        <U.RadioItem value="right">Right</U.RadioItem>
      </U.RadioGroup>
    </U.Group>
  );
}

export function ActionMenuSizeBody({
  ui: U,
  size,
}: {
  ui: ActionMenuUi;
  size: 'default' | 'lg';
}) {
  const iconSize = size === 'lg' ? 'default' : 'sm';

  return (
    <U.Group>
      <U.Item>
        <FigmaLeadingIcon size={iconSize} />
        Profile
      </U.Item>

      <U.Item>
        <FigmaLeadingIcon size={iconSize} />
        Billing
        <U.Shortcut>⌘B</U.Shortcut>
      </U.Item>

      <U.Sub>
        <U.SubTrigger inset>Invite users</U.SubTrigger>

        <U.Portal>
          <U.SubContent size={size} className={ACTION_MENU_PANEL_DEMO}>
            <U.Item>Email</U.Item>
            <U.Item>Message</U.Item>
          </U.SubContent>
        </U.Portal>
      </U.Sub>
    </U.Group>
  );
}

export const actionMenuExampleMeta = [
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
    key: 'Composition',
    title: 'Menu composition',
    description: 'submenu, selected, icons',
  },
  {
    key: 'Checkboxes',
    title: 'Checkboxes',
    description: 'Checkbox items (not on Menus Figma page).',
  },
  {
    key: 'RadioGroup',
    title: 'Radio Group',
    description:
      'Exclusive choice. Selected row uses the same trailing done check as select.',
  },
  {
    key: 'Size',
    title: 'Size',
    description: 'default and lg',
  },
] as const;
