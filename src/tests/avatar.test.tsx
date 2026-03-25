import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from '@/components/ui/avatar';

const componentName = 'avatar';

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
  it('renders the avatar root with data-slot="avatar"', () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    expect(document.querySelector('[data-slot="avatar"]')).toBeInTheDocument();
  });

  it('shows fallback text when no image is provided', () => {
    render(
      <Avatar>
        <AvatarFallback>PP</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText('PP')).toBeInTheDocument();
  });

  it('renders AvatarGroup with multiple avatars', () => {
    render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );
    expect(screen.getByText('A1')).toBeInTheDocument();
    expect(screen.getByText('A2')).toBeInTheDocument();
    expect(screen.getByText('A3')).toBeInTheDocument();
  });

  it('shows fallback when AvatarImage fails to load', () => {
    render(
      <Avatar>
        <AvatarImage src="/does-not-exist.jpg" alt="Test user" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText('TU')).toBeInTheDocument();
  });

  it('disabled avatar is not focusable via keyboard', () => {
    render(
      <Avatar disabled>
        <AvatarFallback>DI</AvatarFallback>
      </Avatar>,
    );
    const avatar = document.querySelector('[data-slot="avatar"]');
    expect(avatar).toHaveAttribute('tabindex', '-1');
  });
});
