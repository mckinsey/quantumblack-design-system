import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const componentName = 'radio-group';

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

describe(`${componentName} — state`, () => {
  it('selects default value', () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" aria-label="a" />
        <RadioGroupItem value="b" aria-label="b" />
      </RadioGroup>,
    );

    expect(screen.getByRole('radio', { name: 'a' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    expect(screen.getByRole('radio', { name: 'b' })).toHaveAttribute(
      'aria-checked',
      'false',
    );
  });

  it('is disabled when disabled prop is set', () => {
    render(<RadioGroupItem value="a" aria-label="a" disabled />);
    expect(screen.getByRole('radio', { name: 'a' })).toHaveAttribute(
      'data-disabled',
    );
  });

  it('can change selection', async () => {
    const user = userEvent.setup();

    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" aria-label="a" />
        <RadioGroupItem value="b" aria-label="b" />
      </RadioGroup>,
    );

    await user.click(screen.getByRole('radio', { name: 'b' }));
    expect(screen.getByRole('radio', { name: 'b' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  it('renders lg size', () => {
    render(<RadioGroupItem value="a" aria-label="a" size="lg" />);
    expect(screen.getByRole('radio', { name: 'a' })).toHaveAttribute(
      'data-slot',
      'radio-group-item',
    );
  });

  it('renders density and orientation attrs', () => {
    const { container } = render(
      <RadioGroup density="comfortable" orientation="horizontal">
        <RadioGroupItem value="a" aria-label="a" />
      </RadioGroup>,
    );

    const group = container.querySelector('[data-slot="radio-group"]');

    expect(group).toHaveAttribute('data-density', 'comfortable');
    expect(group).toHaveAttribute('data-orientation', 'horizontal');
  });
});
