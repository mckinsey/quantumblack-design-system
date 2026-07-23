'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

/** Labeled slider field used across multiple examples */
function SliderField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <label className="text-fg-secondary mb-4 block text-sm">{label}</label>
      {children}
    </div>
  );
}

/** Default slider */
export function SliderDemo() {
  return (
    <div className="w-full max-w-sm">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  );
}

/** Slider with different min/max ranges */
export function SliderRanges() {
  return (
    <div className="w-full max-w-sm space-y-10 pb-4">
      <SliderField label="0-100 (default)">
        <Slider defaultValue={[50]} max={100} step={1} showStepLabels={false} />
      </SliderField>
      <SliderField label="0-200">
        <Slider
          defaultValue={[100]}
          max={200}
          step={1}
          showStepMarkers={false}
          showStepLabels={false}
        />
      </SliderField>
      <SliderField label="-50 to 50">
        <Slider
          defaultValue={[0]}
          min={-50}
          max={50}
          step={1}
          showStepMarkers={false}
          showStepLabels={false}
        />
      </SliderField>
    </div>
  );
}

/** Slider with step markers (dots only) */
export function SliderSteps() {
  return (
    <div className="w-full max-w-sm space-y-8">
      <SliderField label="Step: 10">
        <Slider
          defaultValue={[50]}
          max={100}
          step={10}
          showStepMarkers
          showStepLabels={false}
        />
      </SliderField>
      <SliderField label="Step: 25">
        <Slider
          defaultValue={[50]}
          max={100}
          step={25}
          showStepMarkers
          showStepLabels={false}
        />
      </SliderField>
    </div>
  );
}

/** Slider with step markers and labels */
export function SliderStepsLabeled() {
  return (
    <div className="w-full max-w-sm space-y-12 pb-6">
      <SliderField label="Step: 25 with labels">
        <Slider
          defaultValue={[50]}
          max={100}
          step={25}
          showStepMarkers
          showStepLabels
        />
      </SliderField>
      <SliderField label="Step: 20 with labels">
        <Slider
          defaultValue={[40]}
          max={100}
          step={20}
          showStepMarkers
          showStepLabels
        />
      </SliderField>
    </div>
  );
}

/** SingleValueSlider composed (inline-input=false) */
export function SliderComposed() {
  const [value, setValue] = useState([46]);

  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-fg-primary text-sm">Label entry</label>
        <span className="text-fg-primary text-sm">{value[0]}</span>
      </div>
      <div className="flex items-center gap-2">
        <IconShell size="sm" variant="secondary">
          <Icon icon="volume_mute" />
        </IconShell>
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
          className="flex-1"
          showStepLabels={false}
        />
        <IconShell size="sm" variant="secondary">
          <Icon icon="volume_up" />
        </IconShell>
      </div>
    </div>
  );
}

/** Slider with label, icons, and inline value input (SingleValueSlider inline-input=true) */
export function SliderInlineInput() {
  const [value, setValue] = useState([46]);

  return (
    <div className="w-full max-w-sm space-y-2">
      <label className="text-fg-primary text-sm">Label entry</label>
      <div className="flex items-center gap-2">
        <IconShell size="sm" variant="secondary">
          <Icon icon="volume_mute" />
        </IconShell>
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
          className="flex-1"
          showStepLabels={false}
        />
        <IconShell size="sm" variant="secondary">
          <Icon icon="volume_up" />
        </IconShell>
        <Input
          variant="inline"
          size="sm"
          className="w-10 shrink-0 text-center"
          value={String(value[0])}
          onChange={e => {
            const raw = e.target.value;

            if (raw === '') {
              return;
            }

            const next = Number(raw);

            if (!Number.isNaN(next)) {
              setValue([Math.min(100, Math.max(0, next))]);
            }
          }}
        />
      </div>
    </div>
  );
}

/** Slider with label and value display */
export function SliderLabeled() {
  const [value, setValue] = useState([50]);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-fg-primary text-sm">Brightness</label>
        <span className="text-fg-secondary font-mono text-sm">{value[0]}%</span>
      </div>
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
    </div>
  );
}

/** Range slider with two handles */
export function SliderRange() {
  const [range, setRange] = useState([25, 75]);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-fg-primary text-sm">Price Range</label>
        <span className="text-fg-secondary font-mono text-sm">
          ${range[0]} - ${range[1]}
        </span>
      </div>
      <Slider value={range} onValueChange={setRange} max={100} step={1} />
    </div>
  );
}

/** Disabled slider */
export function SliderDisabled() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-fg-disabled label-regular-primary">
          Brightness
        </label>
        <span className="text-fg-disabled label-regular-primary">50</span>
      </div>
      <Slider defaultValue={[50]} max={100} step={1} disabled />
    </div>
  );
}

/** Volume control slider with buttons */
export function SliderVolume() {
  const [volume, setVolume] = useState([50]);

  const decrease = () => setVolume([Math.max(0, volume[0] - 10)]);
  const increase = () => setVolume([Math.min(100, volume[0] + 10)]);

  return (
    <div className="w-full max-w-sm space-y-4">
      <label className="text-fg-primary text-sm">Volume</label>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" onClick={decrease}>
          <IconShell size="sm" hoverable>
            <Icon icon="volume_down" />
          </IconShell>
        </Button>
        <Slider
          value={volume}
          onValueChange={setVolume}
          max={100}
          step={1}
          className="flex-1"
        />
        <Button variant="ghost" size="icon-sm" onClick={increase}>
          <IconShell size="sm" hoverable>
            <Icon icon="volume_up" />
          </IconShell>
        </Button>
      </div>
      <p className="text-fg-secondary mb-4 block text-center text-sm">
        Volume: {volume[0]}%
      </p>
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'SliderDemo',
    title: 'Default',
    description: 'Basic slider with default value.',
  },
  {
    name: 'SliderRanges',
    title: 'Custom Ranges',
    description: 'Sliders with different min/max values.',
  },
  {
    name: 'SliderSteps',
    title: 'Step Markers',
    description: 'Sliders with visible step marker dots.',
  },
  {
    name: 'SliderStepsLabeled',
    title: 'Step Labels',
    description: 'Sliders with step markers and value labels.',
  },
  {
    name: 'SliderComposed',
    title: 'Composed Single Value',
    description: 'Label, value display, icons, and slider (SingleValueSlider).',
  },
  {
    name: 'SliderInlineInput',
    title: 'Inline Input',
    description: 'Slider with leading/trailing icons and inline numeric input.',
  },
  {
    name: 'SliderLabeled',
    title: 'With Label',
    description: 'Slider with label and value display.',
  },
  {
    name: 'SliderRange',
    title: 'Range Slider',
    description: 'Dual-handle range slider.',
  },
  {
    name: 'SliderDisabled',
    title: 'Disabled',
    description: 'Non-interactive slider with muted track and thumb.',
  },
  {
    name: 'SliderVolume',
    title: 'Volume Control',
    description: 'Slider with increment/decrement buttons.',
  },
];

export const slider = createLegacyDemo('slider', examples, {
  SliderDemo: <SliderDemo />,
  SliderRanges: <SliderRanges />,
  SliderSteps: <SliderSteps />,
  SliderStepsLabeled: <SliderStepsLabeled />,
  SliderComposed: <SliderComposed />,
  SliderInlineInput: <SliderInlineInput />,
  SliderLabeled: <SliderLabeled />,
  SliderRange: <SliderRange />,
  SliderDisabled: <SliderDisabled />,
  SliderVolume: <SliderVolume />,
});
