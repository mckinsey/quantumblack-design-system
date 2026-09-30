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
      <Stepper orientation="horizontal" size="sm" indicator="shape">
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
    expect(root).toHaveAttribute('data-indicator', 'shape');
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

  it('keeps indicator content consumer-owned', () => {
    render(
      <Stepper>
        <StepperItem status="completed">
          <StepperRail>
            <StepperIndicator>
              <span data-testid="custom-marker">done</span>
            </StepperIndicator>
          </StepperRail>
        </StepperItem>
      </Stepper>,
    );

    expect(screen.getByTestId('custom-marker')).toBeInTheDocument();
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
