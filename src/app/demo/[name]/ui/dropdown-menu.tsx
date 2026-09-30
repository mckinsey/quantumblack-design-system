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

const radioLabel: Record<string, string> = {
  top: 'Top',
  bottom: 'Bottom',
  right: 'Right',
};

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        {triggerLabel}
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

export function DropdownMenuDemo() {
  return (
    <DropdownMenuShell triggerLabel="Open">
      <ActionMenuDefaultBody ui={dropdownMenuUi} />
    </DropdownMenuShell>
  );
}

export function DropdownMenuWithShortcuts() {
  return (
    <DropdownMenuShell triggerLabel="Open">
      <ActionMenuShortcutsBody ui={dropdownMenuUi} />
    </DropdownMenuShell>
  );
}

export function DropdownMenuComposition() {
  return (
    <DropdownMenuShell
      triggerLabel="Open"
      contentClassName={ACTION_MENU_PANEL_FIGMA}>
      <ActionMenuCompositionBody ui={dropdownMenuUi} />
    </DropdownMenuShell>
  );
}

export function DropdownMenuWithCheckboxes() {
  return (
    <DropdownMenuShell triggerLabel="Open">
      <ActionMenuCheckboxesBody ui={dropdownMenuUi} />
    </DropdownMenuShell>
  );
}
export function DropdownMenuWithRadioGroup() {
  const [position, setPosition] = React.useState('bottom');

  return (
    <DropdownMenuShell triggerLabel={radioLabel[position]}>
      <ActionMenuRadioGroupBody
        ui={dropdownMenuUi}
        value={position}
        onValueChange={setPosition}
      />
    </DropdownMenuShell>
  );
}

export function DropdownMenuSizes() {
  return (
    <div className="flex flex-wrap items-start gap-8">
      <DropdownMenuShell triggerLabel="Default">
        <ActionMenuSizeBody ui={dropdownMenuUi} size="default" />
      </DropdownMenuShell>

      <DropdownMenuShell triggerLabel="Large" contentSize="lg">
        <ActionMenuSizeBody ui={dropdownMenuUi} size="lg" />
      </DropdownMenuShell>
    </div>
  );
}

const exampleComponents: Record<
  (typeof actionMenuExampleMeta)[number]['key'],
  React.ComponentType
> = {
  Default: DropdownMenuDemo,
  Shortcuts: DropdownMenuWithShortcuts,
  Composition: DropdownMenuComposition,
  Checkboxes: DropdownMenuWithCheckboxes,
  RadioGroup: DropdownMenuWithRadioGroup,
  Size: DropdownMenuSizes,
};

const dropdownExampleNames = {
  Default: 'DropdownMenuDemo',
  Shortcuts: 'DropdownMenuWithShortcuts',
  Composition: 'DropdownMenuComposition',
  Checkboxes: 'DropdownMenuWithCheckboxes',
  RadioGroup: 'DropdownMenuWithRadioGroup',
  Size: 'DropdownMenuSizes',
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
