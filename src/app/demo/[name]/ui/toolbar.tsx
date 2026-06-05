'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
  toolbarIconShellSizeMap,
  useToolbar,
} from '@/components/ui/toolbar';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

function ToolbarIcon() {
  const { size } = useToolbar();

  return (
    <IconShell size={toolbarIconShellSizeMap[size]} variant="secondary">
      <Icon icon="crop_free" />
    </IconShell>
  );
}

function DefaultToolbarItems() {
  return (
    <>
      <ToolbarToggleGroup type="single" defaultValue="tool-1">
        <ToolbarToggleItem aria-label="Tool 1" value="tool-1">
          <ToolbarIcon />
        </ToolbarToggleItem>
        <ToolbarToggleItem aria-label="Tool 2" value="tool-2">
          <ToolbarIcon />
        </ToolbarToggleItem>
        <ToolbarToggleItem aria-label="Tool 3" value="tool-3">
          <ToolbarIcon />
        </ToolbarToggleItem>
        <ToolbarToggleItem aria-label="Tool 4" value="tool-4">
          <ToolbarIcon />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>

      <ToolbarSeparator />

      <ToolbarButton aria-label="Tool 5">
        <ToolbarIcon />
      </ToolbarButton>
      <ToolbarButton aria-label="Tool 6">
        <ToolbarIcon />
      </ToolbarButton>
    </>
  );
}

export function ToolbarDemo() {
  return (
    <Toolbar aria-label="Editor tools">
      <DefaultToolbarItems />
    </Toolbar>
  );
}

export function ToolbarBoxed() {
  return (
    <div className="flex flex-col gap-6">
      <Toolbar aria-label="Boxed tools" boxed>
        <DefaultToolbarItems />
      </Toolbar>
      <Toolbar aria-label="Unboxed tools">
        <DefaultToolbarItems />
      </Toolbar>
    </div>
  );
}

export function ToolbarShapes() {
  return (
    <div className="flex flex-col gap-6">
      <Toolbar aria-label="Circle shape tools" boxed shape="circle">
        <DefaultToolbarItems />
      </Toolbar>
      <Toolbar aria-label="Square shape tools" boxed shape="square">
        <DefaultToolbarItems />
      </Toolbar>
    </div>
  );
}

export function ToolbarSizes() {
  return (
    <div className="flex flex-col items-start gap-6">
      <Toolbar aria-label="Small tools" boxed size="sm">
        <DefaultToolbarItems />
      </Toolbar>
      <Toolbar aria-label="Regular tools" boxed size="reg">
        <DefaultToolbarItems />
      </Toolbar>
      <Toolbar aria-label="Large tools" boxed size="lg">
        <DefaultToolbarItems />
      </Toolbar>
    </div>
  );
}

export function ToolbarVertical() {
  return (
    <div className="flex gap-8">
      <Toolbar aria-label="Vertical boxed tools" boxed orientation="vertical">
        <DefaultToolbarItems />
      </Toolbar>
      <Toolbar aria-label="Vertical unboxed tools" orientation="vertical">
        <DefaultToolbarItems />
      </Toolbar>
    </div>
  );
}

export function ToolbarWithDropdown() {
  return (
    <Toolbar aria-label="Tools with menu" boxed>
      <ToolbarToggleGroup type="single" defaultValue="tool-1">
        <ToolbarToggleItem aria-label="Tool 1" value="tool-1">
          <ToolbarIcon />
        </ToolbarToggleItem>
        <ToolbarToggleItem aria-label="Tool 2" value="tool-2">
          <ToolbarIcon />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>

      <ToolbarSeparator />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ToolbarButton aria-label="Tool 3">
            <ToolbarIcon />
          </ToolbarButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem>Export</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Toolbar>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'ToolbarDemo',
    title: 'Default',
    description:
      'Unboxed horizontal toolbar (default) with toggle group, separator, and icon actions.',
  },
  {
    name: 'ToolbarBoxed',
    title: 'Boxed',
    description:
      'Optional boxed container with elevation; compare with the default unboxed layout.',
  },
  {
    name: 'ToolbarShapes',
    title: 'Shapes',
    description: 'Circle and square container and button shapes.',
  },
  {
    name: 'ToolbarSizes',
    title: 'Sizes',
    description: 'Small, regular, and large toolbar sizes.',
  },
  {
    name: 'ToolbarVertical',
    title: 'Vertical',
    description: 'Vertical orientation with boxed and unboxed variants.',
  },
  {
    name: 'ToolbarWithDropdown',
    title: 'With Dropdown',
    description: 'Toolbar button composed with a dropdown menu trigger.',
  },
];

export const toolbar = createLegacyDemo('toolbar', examples, {
  ToolbarDemo: <ToolbarDemo />,
  ToolbarBoxed: <ToolbarBoxed />,
  ToolbarShapes: <ToolbarShapes />,
  ToolbarSizes: <ToolbarSizes />,
  ToolbarVertical: <ToolbarVertical />,
  ToolbarWithDropdown: <ToolbarWithDropdown />,
});
