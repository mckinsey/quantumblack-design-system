import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Checkbox } from '@/components/ui/checkbox';

const componentName = 'checkbox';

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
  it('is unchecked by default', () => {
    render(<Checkbox aria-label="test" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-checked',
      'false',
    );
  });

  it('is checked when checked={true}', () => {
    render(<Checkbox aria-label="test" checked />);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  it('shows indeterminate state when checked="indeterminate"', () => {
    render(<Checkbox aria-label="test" checked="indeterminate" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-checked',
      'mixed',
    );
  });

  it('is disabled when disabled prop is set', () => {
    render(<Checkbox aria-label="test" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('can be toggled by the user', async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="test" defaultChecked={false} />);
    const cb = screen.getByRole('checkbox');
    expect(cb).toHaveAttribute('aria-checked', 'false');
    await user.click(cb);
    expect(cb).toHaveAttribute('aria-checked', 'true');
  });

  it('renders in lg size', () => {
    render(<Checkbox aria-label="test" size="lg" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});
