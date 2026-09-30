import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperLabel,
  StepperMarkerCircle,
  StepperRail,
  StepperSeparator,
  StepperTitle,
} from '@/components/ui/stepper';

const componentName = 'stepper';

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
  it('exposes data-slot on every part', () => {
    render(
      <Stepper>
        <StepperItem status="active">
          <StepperRail>
            <StepperIndicator>1</StepperIndicator>
            <StepperSeparator />
          </StepperRail>
          <StepperContent>
            <StepperLabel>Step 1</StepperLabel>
            <StepperTitle>Title</StepperTitle>
            <StepperDescription>Description</StepperDescription>
          </StepperContent>
        </StepperItem>
      </Stepper>,
    );

    for (const slot of [
      'stepper',
      'stepper-item',
      'stepper-rail',
      'stepper-indicator',
      'stepper-separator',
      'stepper-content',
      'stepper-label',
      'stepper-title',
      'stepper-description',
    ]) {
      expect(
        document.querySelector(`[data-slot="${slot}"]`),
      ).toBeInTheDocument();
    }
  });

  it('publishes layout axes as data attributes for descendant styling', () => {
    render(
      <Stepper orientation="horizontal" size="sm" indicator="custom">
        <StepperItem status="completed">
          <StepperRail>
            <StepperIndicator />
          </StepperRail>
        </StepperItem>
      </Stepper>,
    );

    const root = document.querySelector('[data-slot="stepper"]');
    expect(root).toHaveAttribute('data-orientation', 'horizontal');
    expect(root).toHaveAttribute('data-size', 'sm');
    expect(root).toHaveAttribute('data-indicator', 'custom');
    expect(
      document.querySelector('[data-slot="stepper-item"]'),
    ).toHaveAttribute('data-status', 'completed');
  });

  it('exposes list semantics by default', () => {
    render(
      <Stepper>
        <StepperItem status="active" />
      </Stepper>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });

  it('sets aria-current=step on active items only', () => {
    const { rerender } = render(
      <Stepper>
        <StepperItem status="active" />
      </Stepper>,
    );

    expect(screen.getByRole('listitem')).toHaveAttribute(
      'aria-current',
      'step',
    );

    rerender(
      <Stepper>
        <StepperItem status="incomplete" />
      </Stepper>,
    );

    expect(screen.getByRole('listitem')).not.toHaveAttribute('aria-current');
  });

  it('lets consumers override aria-current on StepperItem', () => {
    render(
      <Stepper>
        <StepperItem status="active" aria-current={undefined} />
      </Stepper>,
    );

    expect(screen.getByRole('listitem')).not.toHaveAttribute('aria-current');
  });

  it('keeps indicator content consumer-owned for incomplete number and custom', () => {
    render(
      <Stepper>
        <StepperItem status="incomplete">
          <StepperRail>
            <StepperIndicator>
              <span data-testid="step-number">1</span>
            </StepperIndicator>
          </StepperRail>
        </StepperItem>
      </Stepper>,
    );

    expect(screen.getByTestId('step-number')).toBeInTheDocument();
  });

  it('swaps number marker to status icons for completed and error', () => {
    const { rerender } = render(
      <Stepper>
        <StepperItem status="completed">
          <StepperRail>
            <StepperIndicator>1</StepperIndicator>
          </StepperRail>
        </StepperItem>
      </Stepper>,
    );

    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(
      document.querySelector(
        '[data-slot="stepper-marker-number"] [data-slot="icon-glyph"]',
      ),
    ).toHaveTextContent('check_circle_outline');

    rerender(
      <Stepper>
        <StepperItem status="error">
          <StepperRail>
            <StepperIndicator>1</StepperIndicator>
          </StepperRail>
        </StepperItem>
      </Stepper>,
    );

    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(
      document.querySelector(
        '[data-slot="stepper-marker-number"] [data-slot="icon-glyph"]',
      ),
    ).toHaveTextContent('cancel');
  });

  it('renders exported markers with status from the item', () => {
    render(
      <Stepper indicator="custom">
        <StepperItem status="active">
          <StepperRail>
            <StepperIndicator>
              <StepperMarkerCircle />
            </StepperIndicator>
          </StepperRail>
        </StepperItem>
      </Stepper>,
    );

    expect(
      document.querySelector('[data-slot="stepper-marker-circle"]'),
    ).toBeInTheDocument();
  });

  it('accepts explicit status on exported markers', () => {
    render(
      <Stepper indicator="custom">
        <StepperItem status="incomplete">
          <StepperRail>
            <StepperIndicator>
              <StepperMarkerCircle status="error" />
            </StepperIndicator>
          </StepperRail>
        </StepperItem>
      </Stepper>,
    );

    expect(
      document.querySelector('[data-slot="stepper-marker-circle"]'),
    ).toBeInTheDocument();
  });
});

describe(`${componentName} — render prop`, () => {
  it('swaps host elements while keeping slots and classes', () => {
    render(
      <Stepper render={<ol />} className="custom-root">
        <StepperItem render={<li />} status="active">
          <StepperRail>
            <StepperIndicator render={<button type="button" />}>
              1
            </StepperIndicator>
          </StepperRail>
          <StepperContent>
            <StepperTitle render={<h3 />}>Title</StepperTitle>
          </StepperContent>
        </StepperItem>
      </Stepper>,
    );

    const root = document.querySelector('[data-slot="stepper"]');
    expect(root?.tagName).toBe('OL');
    expect(root).toHaveClass('custom-root');
    expect(document.querySelector('[data-slot="stepper-item"]')?.tagName).toBe(
      'LI',
    );
    expect(screen.getByRole('button')).toHaveAttribute(
      'data-slot',
      'stepper-indicator',
    );
    expect(screen.getByRole('heading', { level: 3 })).toHaveAttribute(
      'data-slot',
      'stepper-title',
    );
  });
});
