import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogContextLabel,
  DialogDescription,
  DialogFooter,
  DialogFooterActions,
  DialogFooterLink,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const componentName = 'dialog';

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
  it('renders data-slot regions when open', async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger render={<Button>Open</Button>} />
        <DialogContent size="default" data-testid="dialog-content">
          <DialogHeader>
            <DialogContextLabel>Label</DialogContextLabel>
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <DialogDescription>Description</DialogDescription>
          </DialogBody>
          <DialogFooter>
            <DialogFooterLink>
              <span>Link</span>
            </DialogFooterLink>
            <DialogFooterActions>
              <span>Actions</span>
            </DialogFooterActions>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(screen.getByTestId('dialog-content')).toHaveAttribute(
      'data-size',
      'default',
    );
    expect(document.querySelector('[data-slot="dialog-header"]')).toBeTruthy();
    expect(
      document.querySelector('[data-slot="dialog-context-label"]'),
    ).toBeTruthy();
    expect(document.querySelector('[data-slot="dialog-body"]')).toBeTruthy();
    expect(
      document.querySelector('[data-slot="dialog-description"]'),
    ).toBeTruthy();
    expect(document.querySelector('[data-slot="dialog-footer"]')).toBeTruthy();
    expect(
      document.querySelector('[data-slot="dialog-footer-link"]'),
    ).toBeTruthy();
    expect(
      document.querySelector('[data-slot="dialog-footer-actions"]'),
    ).toBeTruthy();
  });

  it('xs and lg size props smoke render', async () => {
    const user = userEvent.setup();

    for (const size of ['xs', 'lg'] as const) {
      cleanup();
      render(
        <Dialog>
          <DialogTrigger render={<Button>{`Open ${size}`}</Button>} />
          <DialogContent size={size} data-testid={`dialog-${size}`}>
            <DialogHeader>
              <DialogTitle>Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>,
      );

      await user.click(screen.getByRole('button', { name: `Open ${size}` }));
      expect(screen.getByTestId(`dialog-${size}`)).toHaveAttribute(
        'data-size',
        size,
      );
    }
  });
});

describe(`${componentName} — behaviour`, () => {
  it('dialog content is not visible before trigger click', () => {
    render(
      <Dialog>
        <DialogTrigger render={<Button>Open</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hidden Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.queryByText('Hidden Title')).not.toBeInTheDocument();
  });

  it('dialog content appears after trigger click', async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger render={<Button>Open Dialog</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Visible Title</DialogTitle>
            <DialogDescription>Dialog body</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
    expect(screen.getByText('Visible Title')).toBeInTheDocument();
  });

  it('dialog has dialog role after open', async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger render={<Button>Open</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>T</DialogTitle>
            <DialogDescription>D</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('DialogClose render prop closes the dialog', async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger render={<Button>Open</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Closable</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogFooterActions>
              <DialogClose render={<Button>Done</Button>} />
            </DialogFooterActions>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Closable')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.queryByText('Closable')).not.toBeInTheDocument();
  });
});
