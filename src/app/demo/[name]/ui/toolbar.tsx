'use client';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  toolbarIconShellSizeMap,
  useToolbar,
} from '@/components/ui/toolbar';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

const toolbarTextButtonClass = 'h-9 w-auto min-w-9 px-2';

function SelectCheck() {
  return (
    <SelectItemIndicator>
      <IconShell size="sm">
        <Icon icon="check" />
      </IconShell>
    </SelectItemIndicator>
  );
}

function ToolbarIcon() {
  const { size } = useToolbar();

  return (
    <IconShell size={toolbarIconShellSizeMap[size]} variant="secondary">
      <Icon icon="crop_free" />
    </IconShell>
  );
}

function DefaultToolbarItems() {
  const { orientation } = useToolbar();

  return (
    <>
      <ToolbarGroup
        aria-label="Tool selection"
        render={
          <ToggleGroup defaultValue={['tool-1']} orientation={orientation} />
        }>
        <ToolbarButton
          aria-label="Tool 1"
          render={<ToggleGroupItem value="tool-1" />}
          value="tool-1">
          <ToolbarIcon />
        </ToolbarButton>
        <ToolbarButton
          aria-label="Tool 2"
          render={<ToggleGroupItem value="tool-2" />}
          value="tool-2">
          <ToolbarIcon />
        </ToolbarButton>
        <ToolbarButton
          aria-label="Tool 3"
          render={<ToggleGroupItem value="tool-3" />}
          value="tool-3">
          <ToolbarIcon />
        </ToolbarButton>
        <ToolbarButton
          aria-label="Tool 4"
          render={<ToggleGroupItem value="tool-4" />}
          value="tool-4">
          <ToolbarIcon />
        </ToolbarButton>
      </ToolbarGroup>

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
      <Toolbar aria-label="Default tools" boxed>
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

export function ToolbarComposition() {
  return (
    <Toolbar aria-label="Document tools" boxed shape="square">
      <ToggleGroup aria-label="Alignment" defaultValue={['align-left']}>
        <ToolbarButton
          aria-label="Align left"
          className={toolbarTextButtonClass}
          render={<ToggleGroupItem value="align-left" />}
          value="align-left">
          Align Left
        </ToolbarButton>
        <ToolbarButton
          aria-label="Align right"
          className={toolbarTextButtonClass}
          render={<ToggleGroupItem value="align-right" />}
          value="align-right">
          Align Right
        </ToolbarButton>
      </ToggleGroup>

      <ToolbarSeparator />

      <ToolbarGroup aria-label="Numerical format">
        <ToolbarButton aria-label="Format as currency">$</ToolbarButton>
        <ToolbarButton aria-label="Format as percent">%</ToolbarButton>
      </ToolbarGroup>

      <ToolbarSeparator />

      <Select defaultValue="helvetica" size="sm">
        <SelectTrigger aria-label="Font family" className="min-w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="helvetica">
            <SelectItemText>Helvetica</SelectItemText>
            <SelectCheck />
          </SelectItem>
          <SelectItem value="arial">
            <SelectItemText>Arial</SelectItemText>
            <SelectCheck />
          </SelectItem>
        </SelectContent>
      </Select>
      <ToolbarSeparator />

      <Select defaultValue="14" size="sm">
        <SelectTrigger aria-label="Font size" className="min-w-16">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="12">
            <SelectItemText>12</SelectItemText>
            <SelectCheck />
          </SelectItem>
          <SelectItem value="14">
            <SelectItemText>14</SelectItemText>
            <SelectCheck />
          </SelectItem>
          <SelectItem value="16">
            <SelectItemText>16</SelectItemText>
            <SelectCheck />
          </SelectItem>
          <SelectItem value="18">
            <SelectItemText>18</SelectItemText>
            <SelectCheck />
          </SelectItem>
        </SelectContent>
      </Select>
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
    description: 'Small, default, and large toolbar sizes.',
  },
  {
    name: 'ToolbarVertical',
    title: 'Vertical',
    description: 'Vertical orientation with boxed and unboxed variants.',
  },
  {
    name: 'ToolbarComposition',
    title: 'Composition',
    description:
      'Toggle group, button group, and font selects composed in one toolbar.',
  },
];

export const toolbar = createLegacyDemo('toolbar', examples, {
  ToolbarDemo: <ToolbarDemo />,
  ToolbarBoxed: <ToolbarBoxed />,
  ToolbarShapes: <ToolbarShapes />,
  ToolbarSizes: <ToolbarSizes />,
  ToolbarVertical: <ToolbarVertical />,
  ToolbarComposition: <ToolbarComposition />,
});
