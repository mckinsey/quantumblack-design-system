import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Slider } from '@/components/ui/slider';

const componentName = 'slider';

afterEach(() => {
  cleanup();
});

describe(`${componentName} — all examples render`, () => {
  it.each(Object.entries(exampleComponentMaps[componentName]))(
    'renders "%s" without crashing',
    (_, Example) => {
      expect(() =>
        render(
          <Renderer>
            <Example />
          </Renderer>,
        ),
      ).not.toThrow();
    },
  );
});

describe(`${componentName} — structure`, () => {
  it('renders with data-slot="slider"', () => {
    render(<Slider defaultValue={[50]} max={100} step={1} />);
    expect(document.querySelector('[data-slot="slider"]')).toBeInTheDocument();
  });

  it('renders track and range slots', () => {
    render(<Slider defaultValue={[50]} max={100} step={1} />);
    expect(
      document.querySelector('[data-slot="slider-track"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="slider-range"]'),
    ).toBeInTheDocument();
  });

  it('renders one thumb for single value', () => {
    render(<Slider defaultValue={[50]} max={100} step={1} />);
    expect(
      document.querySelectorAll('[data-slot="slider-thumb"]'),
    ).toHaveLength(1);
  });

  it('renders two thumbs for range value', () => {
    render(<Slider defaultValue={[25, 75]} max={100} step={1} />);
    expect(
      document.querySelectorAll('[data-slot="slider-thumb"]'),
    ).toHaveLength(2);
  });

  it.each([
    ['showStepMarkers', { showStepMarkers: true, step: 25 }],
    ['disabled', { disabled: true }],
    ['vertical', { orientation: 'vertical' as const }],
  ] as const)('renders %s without crashing', (_, props) => {
    expect(() =>
      render(<Slider defaultValue={[50]} max={100} step={1} {...props} />),
    ).not.toThrow();
  });
});
