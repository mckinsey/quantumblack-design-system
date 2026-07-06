import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Icon } from '@/components/ui/icon';
import { IconShell, iconVariants } from '@/components/ui/icon-shell';

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
        <Icon icon="info" />
      </IconShell>,
    );
    expect(document.querySelector('[data-slot="icon"]')).toBeInTheDocument();
  });

  it('defaults to neutral secondary (fill-active + opacity-60)', () => {
    const { container } = render(
      <IconShell>
        <Icon icon="info" />
      </IconShell>,
    );
    const shell = container.querySelector('[data-slot="icon"]');
    expect(shell?.className).toContain('text-fill-active');
    expect(shell?.className).toContain('opacity-60');
  });

  it.each(['primary', 'secondary', 'disabled'] as const)(
    'renders variant="%s" without crashing',
    variant => {
      expect(() =>
        render(
          <IconShell variant={variant}>
            <Icon icon="info" />
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
            <Icon icon="info" />
          </IconShell>,
        ),
      ).not.toThrow();
    },
  );

  it.each(['neutral', 'neutral-inverse', 'custom'] as const)(
    'renders type="%s" without crashing',
    type => {
      expect(() =>
        render(
          <IconShell type={type}>
            <Icon icon="info" />
          </IconShell>,
        ),
      ).not.toThrow();
    },
  );

  it('renders hoverable without crashing', () => {
    const { container } = render(
      <IconShell hoverable>
        <Icon icon="info" />
      </IconShell>,
    );
    const shell = container.querySelector('[data-slot="icon"]');
    expect(shell?.className).toContain('hover:opacity-88');
  });

  it('renders children inside the shell', () => {
    render(
      <IconShell>
        <span data-testid="icon-child">icon</span>
      </IconShell>,
    );
    expect(screen.getByTestId('icon-child')).toBeInTheDocument();
  });

  it('maps neutral-inverse to fill-active-inverse', () => {
    expect(
      iconVariants({ type: 'neutral-inverse', variant: 'primary' }),
    ).toContain('text-fill-active-inverse');
  });
});
