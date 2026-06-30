import figma from '@figma/code-connect/react';

import { AspectRatio } from '@/components/ui/aspect-ratio';

figma.connect(AspectRatio, '<QBDS_ASPECT_RATIO>', {
  variant: { Portrait: 'False' },
  props: {
    ratio: figma.enum('Aspect ratio', {
      '1:1': 1,
      '5:4': 1.25,
      '4:3': 1.33,
      '3:2': 1.5,
      '16:9': 1.78,
      '2:1': 2,
      '1:2': 0.5,
    }),
  },
  example: ({ ratio }) => (
    <AspectRatio ratio={ratio}>
      <div className="bg-muted h-full w-full" />
    </AspectRatio>
  ),
});

figma.connect(AspectRatio, '<QBDS_ASPECT_RATIO>', {
  variant: { Portrait: 'True' },
  props: {
    ratio: figma.enum('Aspect ratio', {
      '1:1': 1,
      '5:4': 0.8,
      '4:3': 0.75,
      '3:2': 0.67,
      '16:9': 0.56,
      '2:1': 0.5,
      '1:2': 2,
    }),
  },
  example: ({ ratio }) => (
    <AspectRatio ratio={ratio}>
      <div className="bg-muted h-full w-full" />
    </AspectRatio>
  ),
});
