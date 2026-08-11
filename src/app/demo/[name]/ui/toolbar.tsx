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

function ToolbarIcon({ icon }: { icon: string }) {
  const { size } = useToolbar();

  return (
    <IconShell size={toolbarIconShellSizeMap[size]} variant="secondary">
      <Icon icon={icon} />
    </IconShell>
  );
}

function DefaultToolbarItems() {
  const { orientation } = useToolbar();

  return (
    <>
      <ToolbarGroup
        aria-label="Text alignment"
        render={
          <ToggleGroup
            defaultValue={['align-left']}
            orientation={orientation}
          />
        }>
        <ToolbarButton
          aria-label="Align left"
          render={<ToggleGroupItem value="align-left" />}
          value="align-left">
          <ToolbarIcon icon="format_align_left" />
        </ToolbarButton>
        <ToolbarButton
          aria-label="Align center"
          render={<ToggleGroupItem value="align-center" />}
          value="align-center">
          <ToolbarIcon icon="format_align_center" />
        </ToolbarButton>
        <ToolbarButton
          aria-label="Align right"
          render={<ToggleGroupItem value="align-right" />}
          value="align-right">
          <ToolbarIcon icon="format_align_right" />
        </ToolbarButton>
        <ToolbarButton
          aria-label="Justify"
          render={<ToggleGroupItem value="align-justify" />}
          value="align-justify">
          <ToolbarIcon icon="format_align_justify" />
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarButton aria-label="Undo">
        <ToolbarIcon icon="undo" />
      </ToolbarButton>
      <ToolbarButton aria-label="Redo">
        <ToolbarIcon icon="redo" />
      </ToolbarButton>
    </>
  );
}

export function ToolbarDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Toolbar aria-label="Circle shape tools" shape="circle">
        <DefaultToolbarItems />
      </Toolbar>
      <Toolbar aria-label="Square shape tools" shape="square">
        <DefaultToolbarItems />
      </Toolbar>
    </div>
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
      'Unboxed circle and square toolbars with text-alignment toggles, a separator, and undo/redo actions.',
  },
  {
    name: 'ToolbarBoxed',
    title: 'Boxed',
    description:
      'Same tools inside an elevated boxed container, shown next to the unboxed layout.',
  },
  {
    name: 'ToolbarShapes',
    title: 'Shapes',
    description:
      'Boxed toolbars with circle (pill) and square container and button shapes.',
  },
  {
    name: 'ToolbarSizes',
    title: 'Sizes',
    description:
      'Small, default, and large sizes for icon buttons and spacing.',
  },
  {
    name: 'ToolbarVertical',
    title: 'Vertical',
    description:
      'Stacked orientation for side panels — boxed and unboxed side by side.',
  },
  {
    name: 'ToolbarComposition',
    title: 'Composition',
    description:
      'Mixed controls in one bar: alignment toggles, number format buttons, and font family/size selects.',
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
