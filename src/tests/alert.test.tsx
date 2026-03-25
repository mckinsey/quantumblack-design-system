import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  Alert,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

const componentName = 'alert';

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
  it('exposes role="alert" on the root element', () => {
    render(
      <Alert>
        <AlertContent>
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Description</AlertDescription>
        </AlertContent>
      </Alert>,
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders title and description text', () => {
    render(
      <Alert>
        <AlertContent>
          <AlertTitle>My Title</AlertTitle>
          <AlertDescription>My Description</AlertDescription>
        </AlertContent>
      </Alert>,
    );
    expect(screen.getByText('My Title')).toBeInTheDocument();
    expect(screen.getByText('My Description')).toBeInTheDocument();
  });

  it('applies modal layout via data-layout attribute', () => {
    render(
      <Alert layout="modal">
        <AlertContent>
          <AlertTitle>t</AlertTitle>
        </AlertContent>
      </Alert>,
    );
    expect(screen.getByRole('alert')).toHaveAttribute('data-layout', 'modal');
  });

  it('applies long layout via data-layout attribute', () => {
    render(
      <Alert layout="long">
        <AlertContent>
          <AlertTitle>t</AlertTitle>
        </AlertContent>
      </Alert>,
    );
    expect(screen.getByRole('alert')).toHaveAttribute('data-layout', 'long');
  });

  it('renders a close button with the correct data-slot', () => {
    render(
      <Alert>
        <AlertContent>
          <AlertTitle>t</AlertTitle>
        </AlertContent>
        <AlertClose />
      </Alert>,
    );
    expect(
      document.querySelector('[data-slot="alert-close"]'),
    ).toBeInTheDocument();
  });
});
