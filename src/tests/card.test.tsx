import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// ---------- Polyfills ----------
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (typeof globalThis.ResizeObserver === 'undefined') {
  (globalThis as unknown as Record<string, unknown>).ResizeObserver =
    MockResizeObserver;
}
if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

const componentName = 'card';

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
  it('renders card with data-slot="card"', () => {
    render(<Card>Content</Card>);
    expect(document.querySelector('[data-slot="card"]')).toBeInTheDocument();
  });

  it('renders all card sub-components with their data-slots', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(
      document.querySelector('[data-slot="card-header"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="card-title"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="card-description"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="card-content"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="card-footer"]'),
    ).toBeInTheDocument();
  });

  it('renders title and description text correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>My Card</CardTitle>
          <CardDescription>Card body text</CardDescription>
        </CardHeader>
      </Card>,
    );
    expect(screen.getByText('My Card')).toBeInTheDocument();
    expect(screen.getByText('Card body text')).toBeInTheDocument();
  });
});
