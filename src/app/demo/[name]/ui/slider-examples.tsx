'use client';

import { useState } from 'react';

import { VolumeDown } from '@/components/icons/VolumeDown';
import { VolumeUp } from '@/components/icons/VolumeUp';
import { Slider } from '@/components/ui/slider';

export function LabeledSlider() {
  const [value, setValue] = useState([50]);

  return (
    <div className="flex flex-col gap-4">
      {/* Label and value display */}
      <div className="flex justify-between text-xs">
        <span className="text-fg-primary">Label Entry</span>
        <span className="text-fg-primary">{value[0]}</span>
      </div>

      {/* Controlled slider */}
      <Slider value={value} onValueChange={setValue} max={100} step={5} />
    </div>
  );
}

export function RangeSlider() {
  const [value, setValue] = useState([25, 75]);

  return (
    <div className="flex flex-col gap-4">
      {/* Custom formatted value display */}
      <div className="flex justify-between text-xs">
        <span className="text-fg-primary">Price Range</span>
        <span className="text-fg-primary">{`$${value[0]} - $${value[1]}`}</span>
      </div>

      {/* Range slider with two handles */}
      <Slider
        value={value}
        onValueChange={setValue}
        max={100}
        step={1}
        showStepMarkers={false}
      />
    </div>
  );
}

export function VolumeControl() {
  const [value, setValue] = useState([20]);

  const handleVolumeUp = () => {
    setValue([Math.min(100, value[0] + 10)]);
  };

  const handleVolumeDown = () => {
    setValue([Math.max(0, value[0] - 10)]);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header with label and percentage */}
      <div className="ty-body-ui-02 flex justify-between">
        <span className="text-fg-secondary">Volume</span>
        <span className="text-fg-primary">{value[0]}%</span>
      </div>

      {/* Slider with control buttons */}
      <div className="flex items-center gap-2">
        <button
          className="size-[24px]"
          onClick={handleVolumeDown}
          aria-label="Decrease volume">
          <VolumeDown className="icon-24 icon-interactive text-fg-primary" />
        </button>

        <Slider
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          step={5}
          className="flex-1"
        />

        <button
          className="size-[24px]"
          onClick={handleVolumeUp}
          aria-label="Increase volume">
          <VolumeUp className="icon-24 icon-interactive text-fg-primary" />
        </button>
      </div>
    </div>
  );
}
