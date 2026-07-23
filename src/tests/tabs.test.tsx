import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const componentName = 'tabs';

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
  it('exposes data-slot on root, list, trigger, and content', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel</TabsContent>
      </Tabs>,
    );

    expect(document.querySelector('[data-slot="tabs"]')).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="tabs-list"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="tabs-trigger"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="tabs-content"]'),
    ).toBeInTheDocument();
  });

  it.each(['default', 'lg', 'xl'] as const)(
    'renders size="%s" without crashing',
    size => {
      expect(() =>
        render(
          <Tabs defaultValue="a" size={size}>
            <TabsList>
              <TabsTrigger value="a">A</TabsTrigger>
            </TabsList>
            <TabsContent value="a">Panel</TabsContent>
          </Tabs>,
        ),
      ).not.toThrow();
    },
  );

  it('renders disabled trigger', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b" disabled>
            B
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">A panel</TabsContent>
        <TabsContent value="b">B panel</TabsContent>
      </Tabs>,
    );

    expect(
      document.querySelector('[data-slot="tabs-trigger"][data-disabled]'),
    ).toBeInTheDocument();
  });
});
