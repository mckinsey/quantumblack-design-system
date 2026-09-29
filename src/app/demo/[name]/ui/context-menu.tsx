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

const TRIGGER_CLASS =
  'border-stroke-tertiary text-fg-secondary paragraph-regular-primary flex h-[150px] w-[300px] items-center justify-center border border-dashed select-none';

const contextMenuUi: ActionMenuUi = {
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  Label: ContextMenuLabel,
  Separator: ContextMenuSeparator,
  Shortcut: ContextMenuShortcut,
  Sub: ContextMenuSub,
  SubTrigger: ContextMenuSubTrigger,
  SubContent: ContextMenuSubContent,
  Portal: ContextMenuPortal,
  Group: ContextMenuGroup,
  CheckboxItem: ContextMenuCheckboxItem,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
};

function ContextMenuShell({
  children,
  label = 'Right-click here',
  contentClassName = ACTION_MENU_PANEL_DEMO,
  contentSize,
}: Readonly<{
  children: React.ReactNode;
  label?: string;
  contentClassName?: string;
  contentSize?: 'default' | 'lg';
}>) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={TRIGGER_CLASS}>{label}</ContextMenuTrigger>

      <ContextMenuContent size={contentSize} className={contentClassName}>
        {children}
      </ContextMenuContent>
    </ContextMenu>
  );
}

function makeContextExample(
  Body: React.ComponentType<{ ui: ActionMenuUi }>,
  opts?: {
    panelClass?: string;
    size?: 'default' | 'lg';
    triggerLabel?: string;
  },
) {
  return function Example() {
    return (
      <ContextMenuShell
        label={opts?.triggerLabel ?? 'Right-click here'}
        contentClassName={opts?.panelClass ?? ACTION_MENU_PANEL_DEMO}
        contentSize={opts?.size}>
        <Body ui={contextMenuUi} />
      </ContextMenuShell>
    );
  };
}

export const ContextMenuFigmaContext = makeContextExample(
  ActionMenuFigmaContextBody,
  { panelClass: ACTION_MENU_PANEL_FIGMA },
);

export const ContextMenuDemo = makeContextExample(ActionMenuDefaultBody);
export const ContextMenuWithShortcuts = makeContextExample(
  ActionMenuShortcutsBody,
);
export const ContextMenuWithIcons = makeContextExample(ActionMenuIconsBody);
export const ContextMenuWithSubmenu = makeContextExample(ActionMenuSubmenuBody);
export const ContextMenuSelectedRow = makeContextExample(
  ActionMenuSelectedRowBody,
  { panelClass: ACTION_MENU_PANEL_FIGMA },
);
export const ContextMenuWithCheckboxes = makeContextExample(
  ActionMenuCheckboxesBody,
);
export const ContextMenuWithRadioGroup = makeContextExample(
  ActionMenuRadioGroupBody,
);
export const ContextMenuLarge = makeContextExample(ActionMenuLargeBody, {
  size: 'lg',
});
export const ContextMenuDestructive = makeContextExample(
  ActionMenuDestructiveBody,
  { triggerLabel: 'Right-click for actions' },
);

const exampleComponents: Record<
  (typeof actionMenuExampleMeta)[number]['key'],
  React.ComponentType
> = {
  FigmaContext: ContextMenuFigmaContext,
  Default: ContextMenuDemo,
  Shortcuts: ContextMenuWithShortcuts,
  WithIcons: ContextMenuWithIcons,
  Submenu: ContextMenuWithSubmenu,
  SelectedRow: ContextMenuSelectedRow,
  Checkboxes: ContextMenuWithCheckboxes,
  RadioGroup: ContextMenuWithRadioGroup,
  Large: ContextMenuLarge,
  Destructive: ContextMenuDestructive,
};

const contextExampleNames = {
  FigmaContext: 'ContextMenuFigmaContext',
  Default: 'ContextMenuDemo',
  Shortcuts: 'ContextMenuWithShortcuts',
  WithIcons: 'ContextMenuWithIcons',
  Submenu: 'ContextMenuWithSubmenu',
  SelectedRow: 'ContextMenuSelectedRow',
  Checkboxes: 'ContextMenuWithCheckboxes',
  RadioGroup: 'ContextMenuWithRadioGroup',
  Large: 'ContextMenuLarge',
  Destructive: 'ContextMenuDestructive',
} as const;

export const examples = actionMenuExampleMeta.map(meta => ({
  name: contextExampleNames[meta.key],
  title: meta.title,
  description: meta.description,
}));

export const contextMenu = {
  name: 'context-menu',
  components: Object.fromEntries(
    actionMenuExampleMeta.map(meta => [
      meta.title,
      React.createElement(exampleComponents[meta.key]),
    ]),
  ),
};
