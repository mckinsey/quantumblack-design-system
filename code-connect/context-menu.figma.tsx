import figma from '@figma/code-connect/react';

import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuSubTrigger,
} from '@/components/ui/context-menu';

figma.connect(ContextMenuContent, '<QBDS_MENU_CONTEXT>', {
  props: {
    size: figma.enum('size', {
      reg: 'reg',
      lg: 'lg',
    }),
    children: figma.children('*'),
  },
  example: ({ size, children }) => (
    <ContextMenuContent size={size}>{children}</ContextMenuContent>
  ),
});

figma.connect(ContextMenuItem, '<QBDS_MENU_ITEM_CONTEXT>', {
  props: {
    inset: figma.enum('inset', {
      true: true,
      false: false,
    }),
    disabled: figma.enum('state', {
      enabled: false,
      hover: false,
      disabled: true,
    }),
    label: figma.string('Label'),
    shortcut: figma.boolean('showShortcut', {
      true: figma.string('shortcutEntry'),
      false: undefined,
    }),
  },
  example: ({ inset, disabled, label, shortcut }) => (
    <ContextMenuItem disabled={disabled} inset={inset}>
      {label}
      {shortcut ? <ContextMenuShortcut>{shortcut}</ContextMenuShortcut> : null}
    </ContextMenuItem>
  ),
});

figma.connect(ContextMenuSubTrigger, '<QBDS_MENU_ITEM_SUBTRIGGER>', {
  props: {
    inset: figma.enum('inset', {
      true: true,
      false: false,
    }),
    label: figma.string('Label'),
  },
  example: ({ inset, label }) => (
    <ContextMenuSubTrigger inset={inset}>{label}</ContextMenuSubTrigger>
  ),
});
