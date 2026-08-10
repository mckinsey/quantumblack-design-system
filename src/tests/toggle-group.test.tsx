import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const componentName = 'toggle-group';

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

describe(`${componentName} — structure & interaction`, () => {
  it('renders with data-slot on group and items', () => {
    render(
      <ToggleGroup aria-label="Options" defaultValue={['a']}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(document.querySelector('[data-slot="toggle-group"]')).toBeTruthy();
    expect(
      document.querySelectorAll('[data-slot="toggle-group-item"]'),
    ).toHaveLength(2);
  });

  it('marks the selected item as pressed', () => {
    render(
      <ToggleGroup aria-label="Options" defaultValue={['a']}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(screen.getByRole('button', { name: 'A' })).toHaveAttribute(
      'data-pressed',
    );
    expect(screen.getByRole('button', { name: 'B' })).not.toHaveAttribute(
      'data-pressed',
    );
  });

  it('switches selection on click', async () => {
    const user = userEvent.setup();

    render(
      <ToggleGroup aria-label="Options" defaultValue={['a']}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );

    await user.click(screen.getByRole('button', { name: 'B' }));

    expect(screen.getByRole('button', { name: 'B' })).toHaveAttribute(
      'data-pressed',
    );
    expect(screen.getByRole('button', { name: 'A' })).not.toHaveAttribute(
      'data-pressed',
    );
  });

  it('applies variant and size data attributes', () => {
    render(
      <ToggleGroup
        aria-label="Options"
        defaultValue={['a']}
        size="sm"
        variant="ghost">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );

    const group = document.querySelector('[data-slot="toggle-group"]');
    expect(group).toHaveAttribute('data-variant', 'ghost');
    expect(group).toHaveAttribute('data-size', 'sm');
  });
});
