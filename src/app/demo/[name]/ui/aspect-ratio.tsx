import { AspectRatio } from '@/components/ui/aspect-ratio';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

const DUMMY = 'https://placehold.co';

function dummyImage(width: number, height: number, label: string) {
  return `${DUMMY}/${width}x${height}?text=${encodeURIComponent(label)}`;
}

/** Single media frame using 16:9 — common video and hero proportion */
export function AspectRatioDemo() {
  return (
    <div className="min-w-[400px] p-4">
      <AspectRatio ratio={16 / 9}>
        <img
          src={dummyImage(640, 360, '16:9')}
          alt="Example constrained to 16:9"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  );
}

function RatioTile({
  ratio,
  ratioLabel,
  orientationLabel,
  width,
  height,
  className,
}: Readonly<{
  ratio: number;
  ratioLabel: string;
  orientationLabel: string;
  width: number;
  height: number;
  className?: string;
}>) {
  return (
    <div className={className}>
      <AspectRatio ratio={ratio}>
        <img
          src={dummyImage(width, height, ratioLabel)}
          alt={`${ratioLabel} ${orientationLabel} placeholder`}
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  );
}

export function AspectRatioLandscapeRatios() {
  const tiles: {
    ratio: number;
    ratioLabel: string;
    width: number;
    height: number;
  }[] = [
    { ratio: 1, ratioLabel: '1:1', width: 500, height: 500 },
    { ratio: 5 / 4, ratioLabel: '5:4', width: 500, height: 500 },
    { ratio: 4 / 3, ratioLabel: '4:3', width: 500, height: 500 },
    { ratio: 3 / 2, ratioLabel: '3:2', width: 500, height: 500 },
    { ratio: 16 / 9, ratioLabel: '16:9', width: 500, height: 500 },
    { ratio: 2, ratioLabel: '2:1', width: 500, height: 500 },
  ];

  return (
    <div className="grid max-w-5xl min-w-[400px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {tiles.map(tile => (
        <RatioTile
          key={tile.ratioLabel}
          ratio={tile.ratio}
          ratioLabel={tile.ratioLabel}
          orientationLabel="Landscape"
          width={tile.width}
          height={tile.height}
          className="size-[100px]"
        />
      ))}
    </div>
  );
}

/** Portrait-oriented frames — height greater than width (ratio less than 1). */
export function AspectRatioPortraitRatios() {
  const tiles: {
    ratio: number;
    ratioLabel: string;
    width: number;
    height: number;
  }[] = [
    { ratio: 1, ratioLabel: '1:1', width: 280, height: 280 },
    { ratio: 4 / 5, ratioLabel: '4:5', width: 280, height: 350 },
    { ratio: 3 / 4, ratioLabel: '3:4', width: 240, height: 320 },
    { ratio: 2 / 3, ratioLabel: '2:3', width: 280, height: 420 },
    { ratio: 9 / 16, ratioLabel: '9:16', width: 270, height: 480 },
    { ratio: 1 / 2, ratioLabel: '1:2', width: 280, height: 560 },
  ];

  return (
    <div className="grid max-w-5xl min-w-[400px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {tiles.map(tile => (
        <RatioTile
          key={tile.ratioLabel}
          ratio={tile.ratio}
          ratioLabel={tile.ratioLabel}
          orientationLabel="Portrait"
          width={tile.width}
          height={tile.height}
          className="w-full"
        />
      ))}
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'AspectRatioDemo',
    title: 'Default',
    description: 'Image clipped to a 16:9 frame with object-cover.',
  },
  {
    name: 'AspectRatioLandscapeRatios',
    title: 'Landscape ratios',
    description:
      'QBDS landscape proportions — useful for hero images, cards, and video.',
  },
  {
    name: 'AspectRatioPortraitRatios',
    title: 'Portrait ratios',
    description:
      'Taller frames for vertical photography and mobile-first layouts.',
  },
];

export const aspectRatio = createLegacyDemo('aspect-ratio', examples, {
  AspectRatioDemo: <AspectRatioDemo />,
  AspectRatioLandscapeRatios: <AspectRatioLandscapeRatios />,
  AspectRatioPortraitRatios: <AspectRatioPortraitRatios />,
});
