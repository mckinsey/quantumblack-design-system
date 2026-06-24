import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  Accordion,
  AccordionContent,
  AccordionDivider,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const componentName = 'accordion';

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
  it('exposes data-slot on root', () => {
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>Title</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(
      document.querySelector('[data-slot="accordion"]'),
    ).toBeInTheDocument();
  });

  it('renders trigger and content text', () => {
    render(
      <Accordion defaultValue={['a']}>
        <AccordionItem value="a">
          <AccordionTrigger>Title</AccordionTrigger>
          <AccordionContent>
            <p>Description</p>
            Body
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('applies size and expandAlign on root', () => {
    render(
      <Accordion expandAlign="left" size="lg">
        <AccordionItem value="a">
          <AccordionTrigger>t</AccordionTrigger>
          <AccordionContent>c</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const root = document.querySelector('[data-slot="accordion"]');
    expect(root).toHaveAttribute('data-size', 'lg');
    expect(root).toHaveAttribute('data-expand-align', 'left');
  });

  it('renders divider with separator role', () => {
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>Title</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
          <AccordionDivider />
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByRole('separator')).toHaveAttribute(
      'data-slot',
      'accordion-divider',
    );
  });

  it('toggles content on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>Title</AccordionTrigger>
          <AccordionContent>Hidden body</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const trigger = screen.getByRole('button', { name: /title/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Hidden body')).toBeVisible();
  });
});
