import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Info } from '@/components/icons/Info';
import { IconShell } from '@/components/ui/icon-shell';

const componentName = 'icon-shell';

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
  it('renders with data-slot="icon"', () => {
    render(
      <IconShell>
        <Info />
      </IconShell>,
    );
    expect(document.querySelector('[data-slot="icon"]')).toBeInTheDocument();
  });

  it.each(['primary', 'secondary', 'disabled'] as const)(
    'renders variant="%s" without crashing',
    variant => {
      expect(() =>
        render(
          <IconShell variant={variant}>
            <Info />
          </IconShell>,
        ),
      ).not.toThrow();
    },
  );

  it.each(['sm', 'default', 'lg'] as const)(
    'renders size="%s" without crashing',
    size => {
      expect(() =>
        render(
          <IconShell size={size}>
            <Info />
          </IconShell>,
        ),
      ).not.toThrow();
    },
  );

  it.each(['neutral', 'neutral-inverse', 'accent'] as const)(
    'renders type="%s" without crashing',
    type => {
      expect(() =>
        render(
          <IconShell type={type}>
            <Info />
          </IconShell>,
        ),
      ).not.toThrow();
    },
  );

  it('renders children inside the shell', () => {
    render(
      <IconShell>
        <span data-testid="icon-child">icon</span>
      </IconShell>,
    );
    expect(screen.getByTestId('icon-child')).toBeInTheDocument();
  });
});
