import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Input } from '@/components/ui/input';

const componentName = 'input';

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
  it('renders with placeholder text', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders as disabled when disabled prop is set', () => {
    render(<Input disabled aria-label="disabled-input" />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders as aria-invalid when aria-invalid is set', () => {
    render(<Input aria-invalid="true" aria-label="error-input" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('user can type into the input', async () => {
    const user = userEvent.setup();
    render(<Input aria-label="text-input" />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });

  it.each(['sm', 'default', 'lg'] as const)(
    'renders size="%s" without crashing',
    size => {
      expect(() => render(<Input size={size} aria-label="sz" />)).not.toThrow();
    },
  );

  it.each(['default', 'inline'] as const)(
    'renders variant="%s" without crashing',
    variant => {
      expect(() =>
        render(<Input variant={variant} aria-label="vt" />),
      ).not.toThrow();
    },
  );
});
