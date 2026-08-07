import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  Card,
  CardAction,
  CardAttribution,
  CardContent,
  CardData,
  CardDataLabel,
  CardDataRow,
  CardDataValue,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardStat,
  CardStatGroup,
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
        <CardContent>
          <CardAttribution>Attribution</CardAttribution>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardContent>
        <CardData>
          <CardDataRow>
            <CardDataLabel>Label</CardDataLabel>
            <CardDataValue>Value</CardDataValue>
          </CardDataRow>
        </CardData>
        <CardFooter>
          <CardStatGroup>
            <CardStat>21</CardStat>
          </CardStatGroup>
        </CardFooter>
      </Card>,
    );

    const slots = [
      'card',
      'card-media',
      'card-header',
      'card-action',
      'card-content',
      'card-attribution',
      'card-title',
      'card-description',
      'card-data',
      'card-data-divider',
      'card-data-row',
      'card-data-label',
      'card-data-value',
      'card-footer',
      'card-stat-group',
      'card-stat',
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
              <CardStatGroup>
                <CardStat>1</CardStat>
              </CardStatGroup>
            </CardFooter>
          </Card>,
        ),
      ).not.toThrow();
    },
  );
});
