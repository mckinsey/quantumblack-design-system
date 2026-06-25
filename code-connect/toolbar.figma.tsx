import figma from '@figma/code-connect/react';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  toolbarIconShellSizeMap,
} from '@/components/ui/toolbar';

figma.connect(Toolbar, '<QBDS_TOOLBAR_BUTTON_ICONS>', {
  props: {
    size: figma.enum('size', {
      sm: 'sm',
      reg: 'reg',
      lg: 'lg',
    }),
    shape: figma.enum('shape', {
      circle: 'circle',
      square: 'square',
    }),
    boxed: figma.enum('boxed', {
      true: true,
      false: false,
    }),
    orientation: figma.enum('orientation', {
      horizontal: 'horizontal',
      vertical: 'vertical',
    }),
  },
  example: ({ size, shape, boxed, orientation }) => (
    <Toolbar boxed={boxed} orientation={orientation} shape={shape} size={size}>
      <ToolbarButton aria-label="Tool 1">
        <IconShell size={toolbarIconShellSizeMap[size]} variant="secondary">
          <Icon icon="crop_free" />
        </IconShell>
      </ToolbarButton>
      <ToolbarButton aria-label="Tool 2">
        <IconShell size={toolbarIconShellSizeMap[size]} variant="secondary">
          <Icon icon="crop_free" />
        </IconShell>
      </ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Tool 3">
        <IconShell size={toolbarIconShellSizeMap[size]} variant="secondary">
          <Icon icon="crop_free" />
        </IconShell>
      </ToolbarButton>
    </Toolbar>
  ),
});
