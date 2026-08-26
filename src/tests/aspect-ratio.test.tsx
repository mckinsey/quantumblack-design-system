import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const componentName = 'aspect-ratio';

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
  it('renders root with data-slot="aspect-ratio"', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <span>content</span>
      </AspectRatio>,
    );
    expect(
      document.querySelector('[data-slot="aspect-ratio"]'),
    ).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <AspectRatio ratio={1}>
        <span>media</span>
      </AspectRatio>,
    );
    expect(screen.getByText('media')).toBeInTheDocument();
  });

  it('sets --ratio style custom property', () => {
    render(
      <AspectRatio ratio={4 / 3}>
        <span>content</span>
      </AspectRatio>,
    );
    const root = document.querySelector('[data-slot="aspect-ratio"]');
    expect(root).toHaveStyle({ '--ratio': '1.3333333333333333' });
  });

  it('merges consumer style without dropping --ratio', () => {
    render(
      <AspectRatio ratio={2} style={{ opacity: 0.5 }}>
        <span>content</span>
      </AspectRatio>,
    );
    const root = document.querySelector('[data-slot="aspect-ratio"]');
    expect(root).toHaveStyle({ '--ratio': '2', opacity: '0.5' });
  });
});
