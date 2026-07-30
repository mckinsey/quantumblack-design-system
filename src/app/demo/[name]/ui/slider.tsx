'use client';

import { useId, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

/** Default slider */
export function SliderDemo() {
  return (
    <div className="w-full max-w-sm">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  );
}

/** SingleValueSlider composed (inline-input=false) */
export function SliderComposed() {
  const id = useId();
  const labelId = `${id}-label`;
  const [value, setValue] = useState([46]);

  const decrease = () => setValue([Math.max(0, value[0] - 10)]);
  const increase = () => setValue([Math.min(100, value[0] + 10)]);

  return (
    <div className="flex w-full max-w-60 flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} id={labelId}>
          Label entry
        </Label>
        <span className="text-fg-primary label-regular-primary">
          {value[0]}
        </span>
      </div>
      <div className="flex h-6 items-center gap-2">
        <Button type="button" size="icon-xs" variant="ghost" onClick={decrease}>
          <IconShell type="neutral" hoverable>
            <Icon icon="volume_mute" />
            <span className="sr-only">Decrease volume</span>
          </IconShell>
        </Button>
        <Slider
          id={id}
          aria-labelledby={labelId}
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
          className="flex-1"
          showStepLabels={false}
        />
        <Button type="button" size="icon-xs" variant="ghost" onClick={increase}>
          <IconShell type="neutral" hoverable>
            <Icon icon="volume_up" />
            <span className="sr-only">Increase volume</span>
          </IconShell>
        </Button>
      </div>
    </div>
  );
}

/** Slider with label, icons, and inline value input (SingleValueSlider inline-input=true) */
export function SliderInlineInput() {
  const id = useId();
  const labelId = `${id}-label`;
  const [value, setValue] = useState([46]);

  const decrease = () => setValue([Math.max(0, value[0] - 10)]);
  const increase = () => setValue([Math.min(100, value[0] + 10)]);

  return (
    <div className="flex w-full max-w-60 flex-col gap-4">
      <Label htmlFor={id} id={labelId}>
        Label entry
      </Label>
      <div className="flex items-center gap-2">
        <Button type="button" size="icon-xs" variant="ghost" onClick={decrease}>
          <IconShell type="neutral" hoverable>
            <Icon icon="volume_mute" />
            <span className="sr-only">Decrease volume</span>
          </IconShell>
        </Button>
        <Slider
          id={id}
          aria-labelledby={labelId}
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
          className="flex-1"
          showStepLabels={false}
        />
        <Button type="button" size="icon-xs" variant="ghost" onClick={increase}>
          <IconShell type="neutral" hoverable>
            <Icon icon="volume_up" />
            <span className="sr-only">Increase volume</span>
          </IconShell>
        </Button>
        <Input
          variant="inline"
          size="default"
          className="w-6 shrink-0 text-center"
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

/** Range slider with two handles (RangeSlider Default) */
export function SliderRange() {
  const id = useId();
  const labelId = `${id}-label`;
  const [range, setRange] = useState([21, 78]);

  return (
    // gap-6 = Figma 16px label gap + 8px; absolute thumbs sit above the track box and eat into gap-4
    <div className="flex w-full max-w-60 flex-col gap-6 pb-12">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} id={labelId}>
          Label entry
        </Label>
        <span className="text-fg-primary label-regular-primary">
          {range[0]} — {range[1]}
        </span>
      </div>
      <Slider
        id={id}
        aria-labelledby={labelId}
        value={range}
        onValueChange={setRange}
        max={100}
        step={1}
        showStepLabels
      />
    </div>
  );
}

/** Slider with step markers and labels */
export function SliderStepsLabeled() {
  const id = useId();
  const labelId = `${id}-label`;

  return (
    <div className="w-full max-w-sm pb-12">
      {/* mb-6 = Figma 16px label gap + 8px; absolute thumbs sit above the track box and eat into mb-4 */}
      <Label htmlFor={id} id={labelId} className="mb-6">
        Step: 25
      </Label>
      <Slider
        id={id}
        aria-labelledby={labelId}
        defaultValue={[50]}
        max={100}
        step={25}
        showStepMarkers
        showStepLabels
      />
    </div>
  );
}

/** Range slider with step markers and labels */
export function SliderStepsLabeledRange() {
  const id = useId();
  const labelId = `${id}-label`;
  const [range, setRange] = useState([25, 75]);

  return (
    <div className="flex w-full max-w-60 flex-col gap-6 pb-12">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} id={labelId}>
          Label entry
        </Label>
        <span className="text-fg-primary label-regular-primary">
          {range[0]} — {range[1]}
        </span>
      </div>
      <Slider
        id={id}
        aria-labelledby={labelId}
        value={range}
        onValueChange={setRange}
        max={100}
        step={25}
        showStepMarkers
        showStepLabels
      />
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'SliderDemo',
    title: 'Default',
    description: 'Basic single-value slider.',
  },
  {
    name: 'SliderComposed',
    title: 'With Label & Icons',
    description: 'Label, value readout, and leading/trailing icon buttons.',
  },
  {
    name: 'SliderInlineInput',
    title: 'With Inline Input',
    description: 'Label, icons, and inline numeric input.',
  },
  {
    name: 'SliderRange',
    title: 'Range',
    description: 'Dual-handle range with step labels.',
  },
  {
    name: 'SliderStepsLabeled',
    title: 'Step Markers',
    description: 'Discrete steps with markers and labels.',
  },
  {
    name: 'SliderStepsLabeledRange',
    title: 'Step Markers with Range',
    description: 'Dual-handle range with discrete step markers and labels.',
  },
];

export const slider = createLegacyDemo('slider', examples, {
  SliderDemo: <SliderDemo />,
  SliderComposed: <SliderComposed />,
  SliderInlineInput: <SliderInlineInput />,
  SliderRange: <SliderRange />,
  SliderStepsLabeled: <SliderStepsLabeled />,
  SliderStepsLabeledRange: <SliderStepsLabeledRange />,
});
