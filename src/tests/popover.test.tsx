import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';

const componentName = 'popover';

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

describe(`${componentName} — structure & interaction`, () => {
  it('renders trigger and content slots when open', async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>,
    );

    expect(
      document.querySelector('[data-slot="popover-trigger"]'),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(
      document.querySelector('[data-slot="popover-content"]'),
    ).toBeInTheDocument();
  });

  it('supports render on the trigger', async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          Open popover
        </PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>,
    );

    await user.click(screen.getByRole('button', { name: 'Open popover' }));
    expect(await screen.findByText('Popover body')).toBeInTheDocument();
  });

  it('renders header, title, and description slots', async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Title</PopoverTitle>
            <PopoverDescription>Description</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>,
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(
      document.querySelector('[data-slot="popover-header"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="popover-title"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="popover-description"]'),
    ).toBeInTheDocument();
  });
});
