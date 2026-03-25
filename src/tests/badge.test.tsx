import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Badge, NumericBadge } from '@/components/ui/badge';

const componentName = 'badge';

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
  it('renders label text inside Badge', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders NumericBadge with children text', () => {
    render(<NumericBadge>42</NumericBadge>);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders NumericBadge with variant', () => {
    render(<NumericBadge variant="secondary">9</NumericBadge>);
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it.each([
    'high-emphasis',
    'alternative',
    'error',
    'warning',
    'success',
  ] as const)('renders variant="%s" without crashing', variant => {
    expect(() => render(<Badge variant={variant}>Label</Badge>)).not.toThrow();
  });

  it('renders pill and rect format variants', () => {
    const { rerender } = render(<Badge format="pill">Pill</Badge>);
    expect(screen.getByText('Pill')).toBeInTheDocument();
    rerender(<Badge format="rect">Rect</Badge>);
    expect(screen.getByText('Rect')).toBeInTheDocument();
  });
});
