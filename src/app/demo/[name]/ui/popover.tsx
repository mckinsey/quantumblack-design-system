import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverMedia,
  type PopoverSize,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

function PopoverPanel({
  size = 'default',
  triggerLabel,
}: {
  size?: PopoverSize;
  triggerLabel: string;
}) {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>
        {triggerLabel}
      </PopoverTrigger>
      <PopoverContent size={size}>
        <PopoverHeader>
          <PopoverTitle>Popover title</PopoverTitle>
          <PopoverDescription>
            One or two short lines of context for what this panel controls.
          </PopoverDescription>
          <Separator className="bg-stroke-divider" />
        </PopoverHeader>
        <PopoverBody>
          <p className="paragraph-regular-primary text-fg-primary">
            Main content area for controls, lists, or supporting detail.
          </p>
        </PopoverBody>
        <PopoverFooter className="justify-end">
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
          <Button size="sm">Apply</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export function PopoverDefault() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
        <PopoverBody className="gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="popover-width">Width</Label>
            <Input
              id="popover-width"
              defaultValue="100%"
              className="col-span-2 h-8"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="popover-height">Height</Label>
            <Input
              id="popover-height"
              defaultValue="25px"
              className="col-span-2 h-8"
            />
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export function PopoverSizes() {
  const sizes: { size: PopoverSize; label: string }[] = [
    { size: 'sm', label: 'sm' },
    { size: 'default', label: 'reg' },
    { size: 'md', label: 'md' },
    { size: 'lg', label: 'lg' },
    { size: 'xl', label: 'xlg' },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {sizes.map(({ size, label }) => (
        <PopoverPanel key={size} size={size} triggerLabel={label} />
      ))}
    </div>
  );
}

export function PopoverComposition() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        With media
      </PopoverTrigger>
      <PopoverContent size="md">
        <PopoverMedia className="aspect-video">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&q=80"
            alt=""
          />
        </PopoverMedia>
        <PopoverHeader>
          <PopoverTitle>Popover title</PopoverTitle>
          <PopoverDescription>
            One or two short lines of context for what this panel controls.
          </PopoverDescription>
          <Separator className="bg-stroke-divider" />
        </PopoverHeader>
        <PopoverBody>
          <p className="paragraph-regular-primary text-fg-primary">
            Slot content for filters, forms, or navigation.
          </p>
        </PopoverBody>
        <PopoverFooter className="justify-end">
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
          <Button size="sm">Save</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export function PopoverAlignment() {
  return (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          Start
        </PopoverTrigger>
        <PopoverContent align="start" size="sm">
          <PopoverBody className="pt-4">
            <PopoverDescription>Aligned to start</PopoverDescription>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          Center
        </PopoverTrigger>
        <PopoverContent align="center" size="sm">
          <PopoverBody className="pt-4">
            <PopoverDescription>Aligned to center</PopoverDescription>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          End
        </PopoverTrigger>
        <PopoverContent align="end" size="sm">
          <PopoverBody className="pt-4">
            <PopoverDescription>Aligned to end</PopoverDescription>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export const examples = [
  {
    name: 'PopoverDefault',
    title: 'Default',
    description: 'Header and body with form fields.',
  },
  {
    name: 'PopoverSizes',
    title: 'Sizes',
    description: 'sm, reg, md, lg, and xlg widths with shared composition.',
  },
  {
    name: 'PopoverComposition',
    title: 'Composition',
    description: 'Media, divider, body, and footer actions.',
  },
  {
    name: 'PopoverAlignment',
    title: 'Alignment',
    description: 'Positioner align variants on the content.',
  },
];

export const popover = {
  name: 'popover',
  components: {
    Default: <PopoverDefault />,
    Sizes: <PopoverSizes />,
    Composition: <PopoverComposition />,
    Alignment: <PopoverAlignment />,
  },
};
