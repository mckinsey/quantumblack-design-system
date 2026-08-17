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
  CardMedia,
  CardTitle,
} from '@/components/ui/card';

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
  it('exposes data-slot on every sub-component', () => {
    const { container } = render(
      <Card>
        <CardMedia>
          <CardHeader>
            <span>Badge</span>
            <CardAction>Action</CardAction>
          </CardHeader>
        </CardMedia>
        <CardContent className="gap-4">
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardContent>
        <CardFooter>
          <span>Footer</span>
        </CardFooter>
      </Card>,
    );

    const slots = [
      'card',
      'card-media',
      'card-header',
      'card-action',
      'card-content',
      'card-title',
      'card-description',
      'card-footer',
    ];

    for (const slot of slots) {
      expect(
        container.querySelector(`[data-slot="${slot}"]`),
      ).toBeInTheDocument();
    }
  });

  it('renders title and description text', () => {
    render(
      <Card>
        <CardContent>
          <CardTitle>My Title</CardTitle>
          <CardDescription>My Description</CardDescription>
        </CardContent>
      </Card>,
    );
    expect(screen.getByText('My Title')).toBeInTheDocument();
    expect(screen.getByText('My Description')).toBeInTheDocument();
  });

  it('applies default size via data-size', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.querySelector('[data-slot="card"]')).toHaveAttribute(
      'data-size',
      'default',
    );
  });

  it('applies sm size via data-size', () => {
    const { container } = render(<Card size="sm">Content</Card>);
    expect(container.querySelector('[data-slot="card"]')).toHaveAttribute(
      'data-size',
      'sm',
    );
  });

  it('applies default contrast via data-contrast', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.querySelector('[data-slot="card"]')).toHaveAttribute(
      'data-contrast',
      'low',
    );
  });

  it('applies high contrast via data-contrast', () => {
    const { container } = render(<Card contrast="high">Content</Card>);
    expect(container.querySelector('[data-slot="card"]')).toHaveAttribute(
      'data-contrast',
      'high',
    );
  });

  it('keeps flex-1 on nested no-media footer when outer card has media', () => {
    const { container } = render(
      <Card>
        <CardMedia>
          <CardHeader>
            <span>Outer</span>
          </CardHeader>
        </CardMedia>
        <CardContent>
          <Card>
            <CardContent>
              <CardTitle>Inner</CardTitle>
            </CardContent>
            <CardFooter data-testid="inner-footer">
              <span>Inner footer</span>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>,
    );

    expect(
      container.querySelector('[data-testid="inner-footer"]')?.className,
    ).toContain('flex-1');
  });
});

describe(`${componentName} — size smoke`, () => {
  it.each(['default', 'sm'] as const)(
    'renders full composition at size="%s"',
    size => {
      expect(() =>
        render(
          <Card size={size} className="aspect-[3/4]">
            <CardHeader>
              <span>Badge</span>
              <CardAction>More</CardAction>
            </CardHeader>
            <CardContent>
              <CardTitle className="line-clamp-2 h-[2lh]">Title</CardTitle>
              <CardDescription className="line-clamp-2 h-[2lh]">
                Description
              </CardDescription>
            </CardContent>
            <CardFooter>
              <span>1</span>
            </CardFooter>
          </Card>,
        ),
      ).not.toThrow();
    },
  );
});

describe(`${componentName} — composition smoke`, () => {
  it('renders card with content rows', () => {
    expect(() =>
      render(
        <Card className="aspect-[3/4]">
          <CardHeader>
            <span>Badge</span>
            <CardAction>More</CardAction>
          </CardHeader>
          <CardContent className="gap-4 pt-(--card-inset)">
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
            <div className="flex w-full items-start justify-between">
              <span>Last updated</span>
              <span>20/06/2026</span>
            </div>
          </CardContent>
          <CardFooter>
            <span>21</span>
          </CardFooter>
        </Card>,
      ),
    ).not.toThrow();
  });

  it('renders card with image', () => {
    expect(() =>
      render(
        <Card className="aspect-[3/4]">
          <CardMedia>
            <CardHeader>
              <span>Badge</span>
              <CardAction>More</CardAction>
            </CardHeader>
          </CardMedia>
          <CardContent className="gap-3 pt-6">
            <div className="flex w-full items-center gap-2 pb-3">
              3 hours ago
            </div>
            <CardTitle>Title</CardTitle>
          </CardContent>
          <CardFooter>
            <CardAction>CTA</CardAction>
          </CardFooter>
        </Card>,
      ),
    ).not.toThrow();
  });

  it('renders card with image and data', () => {
    expect(() =>
      render(
        <Card className="aspect-[3/4]">
          <CardMedia>
            <CardHeader>
              <span>Badge</span>
            </CardHeader>
          </CardMedia>
          <CardContent className="flex-1 gap-3 py-6">
            <div className="flex w-full items-center gap-2 pb-3">
              3 hours ago
            </div>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardContent>
          <CardFooter>
            <span>21</span>
          </CardFooter>
        </Card>,
      ),
    ).not.toThrow();
  });
});
