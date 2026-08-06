import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Button } from '@/components/ui/button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  splitIconChevronSizing,
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

describe(`${componentName} — splitIconChevronSizing`, () => {
  it('returns narrower chevron width for filled icon sizes', () => {
    expect(splitIconChevronSizing('icon-lg')).toEqual({
      chevronClassName: 'w-8 px-0',
    });
    expect(splitIconChevronSizing('icon')).toEqual({
      chevronClassName: 'w-6 px-0',
    });
    expect(splitIconChevronSizing('icon-sm')).toEqual({
      chevronClassName: 'w-5 px-0',
    });
    expect(splitIconChevronSizing('icon-xs')).toEqual({
      chevronClassName: 'w-5 px-0',
    });
    expect(splitIconChevronSizing('icon-xxs')).toEqual({
      chevronClassName: 'w-4 px-0',
    });
  });

  it('returns hug width for ghost', () => {
    expect(splitIconChevronSizing('icon-lg', { ghost: true })).toEqual({
      chevronClassName: 'w-6 px-0',
    });
    expect(splitIconChevronSizing('icon', { ghost: true })).toEqual({
      chevronClassName: 'w-4 px-0',
    });
  });

  it('defaults to icon', () => {
    expect(splitIconChevronSizing()).toEqual(splitIconChevronSizing('icon'));
  });
});
