'use client';

import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import * as React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type SliderProps = Omit<
  React.ComponentProps<typeof SliderPrimitive.Root>,
  'onValueChange'
> & {
  showStepMarkers?: boolean;
  showValueTooltip?: boolean;
  showStepLabels?: boolean;
  formatValue?: (value: number) => string;
  onValueChange?: (value: number[]) => void;
};

type Marker = { value: number; percentage: number };

const isValueInRange = (value: number, currentValues: number[]): boolean => {
  if (currentValues.length === 1) {
    return value <= currentValues[0];
  }

  const [minVal, maxVal] = [
    Math.min(...currentValues),
    Math.max(...currentValues),
  ];

  return value >= minVal && value <= maxVal;
};

const generateMarkers = (
  min: number,
  max: number,
  step: number | undefined,
  showIntermediate: boolean,
): Marker[] => {
  const markers: Marker[] = [{ value: min, percentage: 0 }];

  if (showIntermediate && step && step > 0) {
    for (let i = min + step; i < max; i += step) {
      markers.push({ value: i, percentage: ((i - min) / (max - min)) * 100 });
    }
  }

  markers.push({ value: max, percentage: 100 });

  return markers;
};

const StepMarker = React.memo(
  ({
    marker,
    isActive,
    isVertical,
    showLabel,
    disabled,
  }: {
    marker: Marker;
    isActive: boolean;
    isVertical: boolean;
    showLabel: boolean;
    disabled: boolean;
  }) => {
    const isMin = marker.percentage === 0;
    const isMax = marker.percentage === 100;

    let labelColor = 'text-fg-tertiary';

    if (disabled) {
      labelColor = 'text-fg-disabled';
    } else if (isActive) {
      labelColor = 'text-fg-primary';
    }

    return (
      <div
        className={cn(
          'pointer-events-none absolute flex items-center',
          isVertical
            ? 'left-1/2 -translate-x-1/2 flex-row'
            : 'top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col',
        )}
        style={{ [isVertical ? 'top' : 'left']: `${marker.percentage}%` }}>
        <div
          className={cn(
            'h-1 w-1 rounded-full transition-colors',
            isActive ? 'bg-fill-active' : 'bg-slider-track',
          )}
        />

        {showLabel && (
          <span
            className={cn(
              'label-regular-primary whitespace-nowrap',
              isVertical
                ? 'ml-1.5'
                : cn(
                    'absolute top-full mt-2',
                    isMin && 'left-0',
                    isMax && 'right-0',
                    !isMin && !isMax && 'left-1/2 -translate-x-1/2',
                    labelColor,
                  ),
              isVertical && labelColor,
            )}>
            {marker.value}
          </span>
        )}
      </div>
    );
  },
);
StepMarker.displayName = 'StepMarker';

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step,
  disabled = false,
  showStepMarkers = false,
  showValueTooltip = true,
  showStepLabels = true,
  formatValue = val => val.toString(),
  onValueChange,
  orientation = 'horizontal',
  ...props
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState<number[]>(() => {
    if (value !== undefined) {
      return Array.isArray(value) ? [...value] : [value];
    }

    if (defaultValue !== undefined) {
      return Array.isArray(defaultValue) ? [...defaultValue] : [defaultValue];
    }

    return [min];
  });
  const [isInteracting, setIsInteracting] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);

  const currentValue = React.useMemo(() => {
    if (value !== undefined) {
      return Array.isArray(value) ? [...value] : [value];
    }

    return internalValue;
  }, [internalValue, value]);

  const isVertical = orientation === 'vertical';

  const handleValueChange = React.useCallback(
    (newValue: number | readonly number[]) => {
      const values = Array.isArray(newValue) ? [...newValue] : [newValue];

      setInternalValue(values);
      onValueChange?.(values);
    },
    [onValueChange],
  );

  const markers = React.useMemo(
    () => generateMarkers(min, max, step, showStepMarkers),
    [min, max, step, showStepMarkers],
  );

  const thumbClasses = cn(
    'relative flex h-4 w-4 cursor-pointer items-center justify-center rounded-full transition-all duration-200',
    'bg-fill-active shadow-none',
    'hover:outline hover:outline-2 hover:outline-stroke-primary',
    'focus:outline focus:outline-2 focus:outline-stroke-primary focus:shadow-elevation-1',
    'active:shadow-elevation-1',
    'data-disabled:pointer-events-none data-disabled:bg-fill-onsurface-ui-2 data-disabled:shadow-elevation-0',
  );

  return (
    <SliderPrimitive.Root
      {...props}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      orientation={orientation}
      minStepsBetweenValues={1}
      thumbAlignment="edge"
      onValueChange={handleValueChange}
      className={cn('data-horizontal:w-full data-vertical:h-full', className)}>
      <SliderPrimitive.Control
        className={cn(
          'relative flex w-full touch-none items-center select-none',
          'data-horizontal:px-2',
          'data-vertical:h-full data-vertical:min-h-22 data-vertical:w-auto data-vertical:flex-col data-vertical:py-2',
        )}>
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            'bg-slider-track relative grow',
            'data-horizontal:h-px data-horizontal:w-full',
            'data-vertical:h-full data-vertical:w-px',
          )}>
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-fill-active data-horizontal:h-full data-vertical:w-full"
          />

          {markers.map((marker, i) => (
            <StepMarker
              key={`${marker.value}-${i}`}
              marker={marker}
              isActive={isValueInRange(marker.value, currentValue)}
              isVertical={isVertical}
              showLabel={showStepLabels}
              disabled={disabled}
            />
          ))}
        </SliderPrimitive.Track>

        {currentValue.map((val, i) => (
          <Tooltip
            key={i}
            open={showValueTooltip && (isInteracting || isHovering)}>
            <TooltipTrigger asChild>
              <SliderPrimitive.Thumb
                index={i}
                data-slot="slider-thumb"
                className={thumbClasses}
                onPointerDown={() => setIsInteracting(true)}
                onPointerUp={() => setIsInteracting(false)}
                onPointerEnter={() => setIsHovering(true)}
                onPointerLeave={() => {
                  setIsInteracting(false);
                  setIsHovering(false);
                }}>
                <div className="bg-fill-active-inverse h-1 w-1 rounded-full" />
              </SliderPrimitive.Thumb>
            </TooltipTrigger>

            <TooltipContent
              side={isVertical ? 'left' : 'top'}
              sideOffset={6}
              className="max-w-[140px] min-w-[36px] !animate-none truncate text-center leading-4 tracking-[0.024px]">
              {formatValue(val)}
            </TooltipContent>
          </Tooltip>
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
