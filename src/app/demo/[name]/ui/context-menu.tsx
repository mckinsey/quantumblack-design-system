'use client';

import * as React from 'react';

import {
  ACTION_MENU_PANEL_DEMO,
  ACTION_MENU_PANEL_FIGMA,
  ActionMenuCheckboxesBody,
  ActionMenuCompositionBody,
  ActionMenuDefaultBody,
  ActionMenuRadioGroupBody,
  ActionMenuShortcutsBody,
  ActionMenuSizeBody,
  type ActionMenuUi,
  actionMenuExampleMeta,
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

const radioLabel: Record<string, string> = {
  top: 'Top',
  bottom: 'Bottom',
  right: 'Right',
};

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

export function ContextMenuDemo() {
  return (
    <ContextMenuShell>
      <ActionMenuDefaultBody ui={contextMenuUi} />
    </ContextMenuShell>
  );
}

export function ContextMenuWithShortcuts() {
  return (
    <ContextMenuShell>
      <ActionMenuShortcutsBody ui={contextMenuUi} />
    </ContextMenuShell>
  );
}

export function ContextMenuComposition() {
  return (
    <ContextMenuShell contentClassName={ACTION_MENU_PANEL_FIGMA}>
      <ActionMenuCompositionBody ui={contextMenuUi} />
    </ContextMenuShell>
  );
}

export function ContextMenuWithCheckboxes() {
  return (
    <ContextMenuShell>
      <ActionMenuCheckboxesBody ui={contextMenuUi} />
    </ContextMenuShell>
  );
}
export function ContextMenuWithRadioGroup() {
  const [position, setPosition] = React.useState('bottom');

  return (
    <ContextMenuShell label={radioLabel[position]}>
      <ActionMenuRadioGroupBody
        ui={contextMenuUi}
        value={position}
        onValueChange={setPosition}
      />
    </ContextMenuShell>
  );
}

export function ContextMenuSizes() {
  return (
    <div className="flex flex-wrap items-start gap-8">
      <ContextMenuShell label="Default">
        <ActionMenuSizeBody ui={contextMenuUi} size="default" />
      </ContextMenuShell>

      <ContextMenuShell label="Large" contentSize="lg">
        <ActionMenuSizeBody ui={contextMenuUi} size="lg" />
      </ContextMenuShell>
    </div>
  );
}

const exampleComponents: Record<
  (typeof actionMenuExampleMeta)[number]['key'],
  React.ComponentType
> = {
  Default: ContextMenuDemo,
  Shortcuts: ContextMenuWithShortcuts,
  Composition: ContextMenuComposition,
  Checkboxes: ContextMenuWithCheckboxes,
  RadioGroup: ContextMenuWithRadioGroup,
  Size: ContextMenuSizes,
};

const contextExampleNames = {
  Default: 'ContextMenuDemo',
  Shortcuts: 'ContextMenuWithShortcuts',
  Composition: 'ContextMenuComposition',
  Checkboxes: 'ContextMenuWithCheckboxes',
  RadioGroup: 'ContextMenuWithRadioGroup',
  Size: 'ContextMenuSizes',
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
