'use client';

import * as React from 'react';

import {
  ActionMenuCheckboxesBody,
  ActionMenuDefaultBody,
  ActionMenuDestructiveBody,
  ActionMenuFigmaContextBody,
  ActionMenuIconsBody,
  ActionMenuLargeBody,
  ActionMenuRadioGroupBody,
  ActionMenuSelectedRowBody,
  ActionMenuShortcutsBody,
  ActionMenuSubmenuBody,
  ACTION_MENU_PANEL_DEMO,
  ACTION_MENU_PANEL_FIGMA,
  actionMenuExampleMeta,
  type ActionMenuUi,
} from '@/app/demo/[name]/ui/action-menu-examples.shared';
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
import { Toggle } from '@/components/ui/toggle';

const DROPDOWN_TOGGLE_TRIGGER_OPEN =
  'data-[state=open]:bg-fill-active data-[state=open]:text-fg-primary-inverse data-[state=open]:border-stroke-active-inverse data-[state=open]:border-2';

const dropdownMenuUi: ActionMenuUi = {
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Sub: DropdownMenuSub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
  Portal: DropdownMenuPortal,
  Group: DropdownMenuGroup,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
};

function DropdownMenuShell({
  triggerLabel,
  children,
  contentClassName = ACTION_MENU_PANEL_DEMO,
  contentSize,
}: Readonly<{
  triggerLabel: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
  contentSize?: 'default' | 'lg';
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

      <DropdownMenuContent
        align="start"
        size={contentSize}
        className={contentClassName}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function makeDropdownExample(
  Body: React.ComponentType<{ ui: ActionMenuUi }>,
  opts?: { panelClass?: string; size?: 'default' | 'lg'; triggerLabel?: string },
) {
  return function Example() {
    return (
      <DropdownMenuShell
        triggerLabel={opts?.triggerLabel ?? 'Open'}
        contentClassName={opts?.panelClass ?? ACTION_MENU_PANEL_DEMO}
        contentSize={opts?.size}>
        <Body ui={dropdownMenuUi} />
      </DropdownMenuShell>
    );
  };
}

export const DropdownMenuFigmaContext = makeDropdownExample(
  ActionMenuFigmaContextBody,
  { panelClass: ACTION_MENU_PANEL_FIGMA },
);

export const DropdownMenuDemo = makeDropdownExample(ActionMenuDefaultBody);
export const DropdownMenuWithShortcuts = makeDropdownExample(
  ActionMenuShortcutsBody,
);
export const DropdownMenuWithIcons = makeDropdownExample(ActionMenuIconsBody);
export const DropdownMenuWithSubmenu = makeDropdownExample(ActionMenuSubmenuBody);
export const DropdownMenuSelectedRow = makeDropdownExample(
  ActionMenuSelectedRowBody,
  { panelClass: ACTION_MENU_PANEL_FIGMA },
);
export const DropdownMenuWithCheckboxes = makeDropdownExample(
  ActionMenuCheckboxesBody,
);
export const DropdownMenuWithRadioGroup = makeDropdownExample(
  ActionMenuRadioGroupBody,
);
export const DropdownMenuLarge = makeDropdownExample(ActionMenuLargeBody, {
  size: 'lg',
});
export const DropdownMenuDestructive = makeDropdownExample(
  ActionMenuDestructiveBody,
  { triggerLabel: 'Actions' },
);

const exampleComponents: Record<
  (typeof actionMenuExampleMeta)[number]['key'],
  React.ComponentType
> = {
  FigmaContext: DropdownMenuFigmaContext,
  Default: DropdownMenuDemo,
  Shortcuts: DropdownMenuWithShortcuts,
  WithIcons: DropdownMenuWithIcons,
  Submenu: DropdownMenuWithSubmenu,
  SelectedRow: DropdownMenuSelectedRow,
  Checkboxes: DropdownMenuWithCheckboxes,
  RadioGroup: DropdownMenuWithRadioGroup,
  Large: DropdownMenuLarge,
  Destructive: DropdownMenuDestructive,
};

const dropdownExampleNames = {
  FigmaContext: 'DropdownMenuFigmaContext',
  Default: 'DropdownMenuDemo',
  Shortcuts: 'DropdownMenuWithShortcuts',
  WithIcons: 'DropdownMenuWithIcons',
  Submenu: 'DropdownMenuWithSubmenu',
  SelectedRow: 'DropdownMenuSelectedRow',
  Checkboxes: 'DropdownMenuWithCheckboxes',
  RadioGroup: 'DropdownMenuWithRadioGroup',
  Large: 'DropdownMenuLarge',
  Destructive: 'DropdownMenuDestructive',
} as const;

export const examples = actionMenuExampleMeta.map(meta => ({
  name: dropdownExampleNames[meta.key],
  title: meta.title,
  description: meta.description,
}));

export const dropdownMenu = {
  name: 'dropdown-menu',
  components: Object.fromEntries(
    actionMenuExampleMeta.map(meta => [
      meta.title,
      React.createElement(exampleComponents[meta.key]),
    ]),
  ),
};
