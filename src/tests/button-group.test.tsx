import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Button } from '@/components/ui/button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '@/components/ui/button-group';

const componentName = 'button-group';

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
  it('renders with role="group" and data-slot="button-group"', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toHaveAttribute(
      'data-slot',
      'button-group',
    );
  });

  it('renders its button children', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('defaults to spaced horizontal', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('data-orientation', 'horizontal');
    expect(group).toHaveAttribute('data-spacing', 'spaced');
  });

  it('applies vertical orientation', () => {
    render(
      <ButtonGroup orientation="vertical">
        <Button>One</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toHaveAttribute(
      'data-orientation',
      'vertical',
    );
  });

  it('applies attached spacing', () => {
    render(
      <ButtonGroup spacing="attached">
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toHaveAttribute(
      'data-spacing',
      'attached',
    );
  });

  it('renders Text and Separator subcomponents', () => {
    render(
      <ButtonGroup spacing="attached">
        <ButtonGroupText>Label</ButtonGroupText>
        <ButtonGroupSeparator />
        <Button>Go</Button>
      </ButtonGroup>,
    );
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="button-group-separator"]'),
    ).toBeTruthy();
  });

  it('merges a custom className', () => {
    render(
      <ButtonGroup className="custom-class">
        <Button>One</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toHaveClass('custom-class');
  });
});
