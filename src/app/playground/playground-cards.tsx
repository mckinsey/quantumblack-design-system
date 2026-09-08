import { DefaultCard } from '@/app/demo/[name]/ui/card';

const cardCount = 6;

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
    <div className="flex flex-col gap-8 p-8">
      <div>
        <p className="paragraph-small text-fg-tertiary mb-1">{subtitle}</p>
        <h1 className="headings-h2-regular text-fg-primary mb-3">{title}</h1>
        <p className="paragraph-small text-fg-secondary max-w-2xl">{body}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: cardCount }, (_, i) => (
          <DefaultCard key={i} />
        ))}
      </div>
    </div>
  );
}
