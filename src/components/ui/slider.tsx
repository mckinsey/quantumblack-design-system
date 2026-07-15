'use client';

import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import * as React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type SliderRootProps = React.ComponentProps<typeof SliderPrimitive.Root>;

type SliderProps = Omit<
  SliderRootProps,
  'onValueChange' | 'onValueCommitted'
> & {
  showStepMarkers?: boolean;
  showValueTooltip?: boolean;
  showStepLabels?: boolean;
  formatValue?: (value: number) => string;
  onValueChange?: (value: number[]) => void;
};

type Marker = { value: number; percentage: number };

const thumbClasses = cn(
  'relative flex h-4 w-4 cursor-pointer items-center justify-center rounded-full',
  'bg-fill-active shadow-none',
  'transition-[box-shadow,outline-color,background-color] duration-200',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-stroke-primary',
  'data-disabled:pointer-events-none data-disabled:bg-fill-onsurface-ui-2 data-disabled:shadow-elevation-0',
);

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
            isActive ? 'bg-fill-active' : 'bg-fill-stepmarkers-track',
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

  const startInteraction = React.useCallback(() => {
    if (disabled) {
      return;
    }

    setIsInteracting(true);
  }, [disabled]);

  const stopInteraction = React.useCallback(() => {
    setIsInteracting(false);
  }, []);

  const currentValue = React.useMemo(() => {
    if (value !== undefined) {
      return Array.isArray(value) ? [...value] : [value];
    }

    return internalValue;
  }, [internalValue, value]);

  const isVertical = orientation === 'vertical';

  const handleValueChange = React.useCallback<
    NonNullable<SliderRootProps['onValueChange']>
  >(
    (newValue, details) => {
      const values = Array.isArray(newValue) ? [...newValue] : [newValue];

      setInternalValue(values);
      onValueChange?.(values);

      if (details.reason === 'drag' || details.reason === 'track-press') {
        startInteraction();
      }
    },
    [onValueChange, startInteraction],
  );

  const handleValueCommitted = React.useCallback<
    NonNullable<SliderRootProps['onValueCommitted']>
  >(() => {
    stopInteraction();
  }, [stopInteraction]);

  const markers = React.useMemo(
    () => generateMarkers(min, max, step, showStepMarkers),
    [min, max, step, showStepMarkers],
  );

  const thumbCount = currentValue.length;

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
      onValueCommitted={handleValueCommitted}
      className={cn(
        'data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
        className,
      )}>
      <SliderPrimitive.Control
        onPointerDown={startInteraction}
        className={cn(
          'relative flex w-full touch-none items-center select-none',
          'data-[orientation=horizontal]:px-2',
          'data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-22 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:py-2',
        )}>
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            'bg-fill-stepmarkers-track relative grow',
            'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full',
            'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
          )}>
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-fill-active data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
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

        {Array.from({ length: thumbCount }, (_, i) => (
          <Tooltip
            key={i}
            open={showValueTooltip && (isInteracting || isHovering)}>
            <TooltipTrigger asChild>
              <SliderPrimitive.Thumb
                index={i}
                data-slot="slider-thumb"
                className={cn(
                  thumbClasses,
                  (isHovering || isInteracting) &&
                    'outline-stroke-primary outline outline-2 outline-offset-0',
                  isInteracting && 'shadow-elevation-1 transition-none',
                )}
                onPointerEnter={() => setIsHovering(true)}
                onPointerLeave={() => setIsHovering(false)}>
                <div className="bg-fill-active-inverse h-1 w-1 rounded-full" />
              </SliderPrimitive.Thumb>
            </TooltipTrigger>

            <TooltipContent
              side={isVertical ? 'left' : 'top'}
              sideOffset={10}
              align="center"
              className="!animate-none text-center">
              {formatValue(currentValue[i])}
            </TooltipContent>
          </Tooltip>
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
