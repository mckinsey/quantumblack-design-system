import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
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
  it('exposes data-slot on root, item, indicator, and separator', () => {
    render(
      <Stepper>
        <StepperItem status="active">
          <StepperRail>
            <StepperIndicator>1</StepperIndicator>
            <StepperSeparator />
          </StepperRail>
          <StepperContent>
            <StepperTitle>Title</StepperTitle>
          </StepperContent>
        </StepperItem>
      </Stepper>,
    );

    expect(document.querySelector('[data-slot="stepper"]')).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="stepper-item"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="stepper-indicator"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="stepper-separator"]'),
    ).toBeInTheDocument();
  });

  it('marks completed number indicators with status icons', () => {
    render(
      <Stepper>
        <StepperItem status="completed">
          <StepperRail>
            <StepperIndicator>1</StepperIndicator>
          </StepperRail>
        </StepperItem>
      </Stepper>,
    );

    expect(
      document.querySelector('[data-slot="stepper-indicator"]'),
    ).toHaveAttribute('data-status', 'completed');
  });
});
