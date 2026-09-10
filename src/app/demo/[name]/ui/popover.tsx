import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2 pt-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">Width</Label>
            <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="height">Height</Label>
            <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function PopoverSimple() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Info</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <PopoverDescription>
          This is a simple popover with text content only.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}

export function PopoverAlignment() {
  return (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            Start
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-48">
          <PopoverDescription>Aligned to start</PopoverDescription>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            Center
          </Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-48">
          <PopoverDescription>Aligned to center</PopoverDescription>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            End
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-48">
          <PopoverDescription>Aligned to end</PopoverDescription>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export const examples = [
  {
    name: 'PopoverDemo',
    title: 'Default',
    description: 'Popover with form inputs.',
  },
  {
    name: 'PopoverSimple',
    title: 'Simple',
    description: 'Popover with text content.',
  },
  {
    name: 'PopoverAlignment',
    title: 'Alignment',
    description: 'Popovers with different alignments.',
  },
];

export const popover = {
  name: 'popover',
  components: {
    Default: <PopoverDemo />,
    Simple: <PopoverSimple />,
    Alignment: <PopoverAlignment />,
  },
};
