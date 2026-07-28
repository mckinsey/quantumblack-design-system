import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { SliderComposed, SliderRange } from '@/app/demo/[name]/ui/slider';
import { Slider } from '@/components/ui/slider';

if (typeof globalThis.PointerEvent === 'undefined') {
  class PointerEvent extends MouseEvent {
    constructor(type: string, props?: MouseEventInit) {
      super(type, props);
    }
  }

  Object.defineProperty(globalThis, 'PointerEvent', {
    value: PointerEvent,
  });
}

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

/** Base UI clips the range input; name lives on the root group. */
function getThumbs(name: string) {
  const group = screen.getByRole('group', { name });

  return within(group).getAllByRole('slider', { hidden: true });
}

describe(`${componentName} — values`, () => {
  it('exposes single thumb aria values', () => {
    render(
      <Slider
        defaultValue={[50]}
        min={0}
        max={100}
        step={1}
        aria-label="Volume"
      />,
    );

    const [thumb] = getThumbs('Volume');

    expect(thumb).toHaveAttribute('aria-valuenow', '50');
    expect(thumb).toHaveAttribute('min', '0');
    expect(thumb).toHaveAttribute('max', '100');
  });

  it('exposes range thumb aria values', () => {
    render(
      <Slider
        defaultValue={[25, 75]}
        min={0}
        max={100}
        step={1}
        aria-label="Range"
      />,
    );

    const thumbs = getThumbs('Range');

    expect(thumbs).toHaveLength(2);
    expect(thumbs[0]).toHaveAttribute('aria-valuenow', '25');
    expect(thumbs[1]).toHaveAttribute('aria-valuenow', '75');
  });

  it('shows step label values', () => {
    render(
      <Slider
        defaultValue={[50]}
        max={100}
        step={25}
        showStepMarkers
        showStepLabels
        aria-label="Steps"
      />,
    );

    for (const label of ['0', '25', '50', '75', '100']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('hides step labels when showStepLabels is false', () => {
    render(
      <Slider
        defaultValue={[50]}
        max={100}
        step={25}
        showStepMarkers
        showStepLabels={false}
        aria-label="No labels"
      />,
    );

    expect(getThumbs('No labels')[0]).toHaveAttribute('aria-valuenow', '50');

    for (const label of ['0', '25', '75', '100']) {
      expect(screen.queryByText(label)).not.toBeInTheDocument();
    }
  });

  it('shows formatValue in tooltip on hover', () => {
    render(
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        formatValue={v => `${v}%`}
        aria-label="Formatted"
      />,
    );

    const thumb = document.querySelector('[data-slot="slider-thumb"]');

    expect(thumb).toBeTruthy();
    fireEvent.pointerEnter(thumb!);

    expect(screen.getByRole('tooltip')).toHaveTextContent('50%');
  });
});

describe(`${componentName} — interaction`, () => {
  it('changes value with keyboard arrows', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        onValueChange={onValueChange}
        aria-label="Keyboard"
      />,
    );

    const [thumb] = getThumbs('Keyboard');

    thumb.focus();
    await user.keyboard('{ArrowRight}');

    expect(onValueChange).toHaveBeenCalled();
    expect(thumb).toHaveAttribute('aria-valuenow', '51');
  });

  it('does not change value when disabled', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        disabled
        onValueChange={onValueChange}
        aria-label="Disabled"
      />,
    );

    const [thumb] = getThumbs('Disabled');

    expect(thumb).toBeDisabled();

    thumb.focus();
    await user.keyboard('{ArrowRight}');

    expect(onValueChange).not.toHaveBeenCalled();
    expect(thumb).toHaveAttribute('aria-valuenow', '50');
  });

  it('syncs aria value when controlled value changes', () => {
    const { rerender } = render(
      <Slider value={[10]} max={100} step={1} aria-label="Controlled" />,
    );

    expect(getThumbs('Controlled')[0]).toHaveAttribute('aria-valuenow', '10');

    rerender(
      <Slider value={[40]} max={100} step={1} aria-label="Controlled" />,
    );

    expect(getThumbs('Controlled')[0]).toHaveAttribute('aria-valuenow', '40');
  });
});

describe(`${componentName} — demos`, () => {
  it('SliderComposed readout updates when increased', async () => {
    const user = userEvent.setup();

    render(
      <Renderer>
        <SliderComposed />
      </Renderer>,
    );

    expect(screen.getByText('46')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Increase volume' }));

    expect(screen.getByText('56')).toBeInTheDocument();
    expect(screen.queryByText('46')).not.toBeInTheDocument();
  });

  it('SliderRange shows initial range readout', () => {
    render(
      <Renderer>
        <SliderRange />
      </Renderer>,
    );

    expect(screen.getByText('21 — 78')).toBeInTheDocument();
  });
});
