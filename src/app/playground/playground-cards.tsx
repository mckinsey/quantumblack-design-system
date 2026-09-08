import {
  CardContrast,
  CardDemo,
  CardOverride,
  CardSize,
  CardWithImage,
  CardWithImageAndData,
} from '@/app/demo/[name]/ui/card';

const cardSections = [
  { title: 'Default', content: <CardDemo /> },
  { title: 'With image', content: <CardWithImage /> },
  { title: 'With image and data', content: <CardWithImageAndData /> },
  { title: 'Sizes', content: <CardSize /> },
  { title: 'Contrast', content: <CardContrast /> },
  { title: 'Custom cards', content: <CardOverride /> },
];

export function PlaygroundCards({
  title,
  subtitle,
  body,
}: {
  title: string;
  subtitle: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-10 p-8">
      <div>
        <p className="paragraph-small text-fg-tertiary mb-1">{subtitle}</p>
        <h1 className="headings-h2-regular text-fg-primary mb-3">{title}</h1>
        <p className="paragraph-small text-fg-secondary max-w-2xl">{body}</p>
      </div>

      {cardSections.map(section => (
        <section key={section.title} className="flex flex-col gap-4">
          <h2 className="headings-h3-regular text-fg-primary">
            {section.title}
          </h2>
          {section.content}
        </section>
      ))}
    </div>
  );
}
