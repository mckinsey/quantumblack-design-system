'use client';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  SegmentedControls,
  SegmentedControlsItem,
} from '@/components/ui/segmented-controls';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

/** Default segmented control */
export function SegmentedControlsDemo() {
  return (
    <SegmentedControls defaultValue="week">
      <SegmentedControlsItem value="day">Day</SegmentedControlsItem>
      <SegmentedControlsItem value="week">Week</SegmentedControlsItem>
      <SegmentedControlsItem value="month">Month</SegmentedControlsItem>
    </SegmentedControls>
  );
}

/** Segmented control types - secondary-filled and ghost */
export function SegmentedControlsTypes() {
  return (
    <div className="flex flex-col gap-4">
      <SegmentedControls defaultValue="week" type="secondary-filled">
        <SegmentedControlsItem value="day">Day</SegmentedControlsItem>
        <SegmentedControlsItem value="week">Week</SegmentedControlsItem>
        <SegmentedControlsItem value="month">Month</SegmentedControlsItem>
      </SegmentedControls>

      <SegmentedControls defaultValue="week" type="ghost">
        <SegmentedControlsItem value="day">Day</SegmentedControlsItem>
        <SegmentedControlsItem value="week">Week</SegmentedControlsItem>
        <SegmentedControlsItem value="month">Month</SegmentedControlsItem>
      </SegmentedControls>
    </div>
  );
}

/** Ghost segmented control */
export function SegmentedControlsGhost() {
  return (
    <SegmentedControls defaultValue="week" type="ghost">
      <SegmentedControlsItem value="day">Day</SegmentedControlsItem>
      <SegmentedControlsItem value="week">Week</SegmentedControlsItem>
      <SegmentedControlsItem value="month">Month</SegmentedControlsItem>
    </SegmentedControls>
  );
}

/** Segmented control sizes */
export function SegmentedControlsSizes() {
  return (
    <div className="flex flex-col items-start gap-4">
      <SegmentedControls defaultValue="week" size="reg">
        <SegmentedControlsItem value="day">Day</SegmentedControlsItem>
        <SegmentedControlsItem value="week">Week</SegmentedControlsItem>
        <SegmentedControlsItem value="month">Month</SegmentedControlsItem>
      </SegmentedControls>

      <SegmentedControls defaultValue="week" size="sm">
        <SegmentedControlsItem value="day">Day</SegmentedControlsItem>
        <SegmentedControlsItem value="week">Week</SegmentedControlsItem>
        <SegmentedControlsItem value="month">Month</SegmentedControlsItem>
      </SegmentedControls>

      <SegmentedControls defaultValue="week" size="xsm">
        <SegmentedControlsItem value="day">Day</SegmentedControlsItem>
        <SegmentedControlsItem value="week">Week</SegmentedControlsItem>
        <SegmentedControlsItem value="month">Month</SegmentedControlsItem>
      </SegmentedControls>

      <SegmentedControls defaultValue="week" size="xxs">
        <SegmentedControlsItem value="day">Day</SegmentedControlsItem>
        <SegmentedControlsItem value="week">Week</SegmentedControlsItem>
        <SegmentedControlsItem value="month">Month</SegmentedControlsItem>
      </SegmentedControls>
    </div>
  );
}

/** Icon-only segments */
export function SegmentedControlsIconOnly() {
  return (
    <SegmentedControls defaultValue="left">
      <SegmentedControlsItem aria-label="Align left" value="left">
        <IconShell size="sm">
          <Icon icon="format_align_left" />
        </IconShell>
      </SegmentedControlsItem>

      <SegmentedControlsItem aria-label="Align center" value="center">
        <IconShell size="sm">
          <Icon icon="format_align_center" />
        </IconShell>
      </SegmentedControlsItem>

      <SegmentedControlsItem aria-label="Align right" value="right">
        <IconShell size="sm">
          <Icon icon="format_align_right" />
        </IconShell>
      </SegmentedControlsItem>
    </SegmentedControls>
  );
}

/** Disabled segment */
export function SegmentedControlsDisabled() {
  return (
    <SegmentedControls defaultValue="day">
      <SegmentedControlsItem value="day">Day</SegmentedControlsItem>
      <SegmentedControlsItem value="week">Week</SegmentedControlsItem>
      <SegmentedControlsItem disabled value="month">
        Month
      </SegmentedControlsItem>
    </SegmentedControls>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'SegmentedControlsDemo',
    title: 'Default',
    description: 'Single-select segmented control.',
  },
  {
    name: 'SegmentedControlsTypes',
    title: 'Types',
    description: 'Secondary-filled and ghost types.',
  },
  {
    name: 'SegmentedControlsGhost',
    title: 'Ghost',
    description: 'Ghost type with transparent segment backgrounds.',
  },
  {
    name: 'SegmentedControlsSizes',
    title: 'Sizes',
    description: 'Reg, sm, xsm, and xxs sizes.',
  },
  {
    name: 'SegmentedControlsIconOnly',
    title: 'Icon Only',
    description: 'Segments with icon-only content.',
  },
  {
    name: 'SegmentedControlsDisabled',
    title: 'Disabled',
    description: 'A segmented control with a disabled segment.',
  },
];

export const segmentedControls = createLegacyDemo(
  'segmented-controls',
  examples,
  {
    SegmentedControlsDemo: <SegmentedControlsDemo />,
    SegmentedControlsTypes: <SegmentedControlsTypes />,
    SegmentedControlsGhost: <SegmentedControlsGhost />,
    SegmentedControlsSizes: <SegmentedControlsSizes />,
    SegmentedControlsIconOnly: <SegmentedControlsIconOnly />,
    SegmentedControlsDisabled: <SegmentedControlsDisabled />,
  },
);
