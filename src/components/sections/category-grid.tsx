import Link from "next/link";
import { CardSprig } from "@/components/ui/card-sprig";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { MediaImage } from "@/components/ui/media-image";
import { SectionHeading } from "@/components/ui/section-heading";

type CategoryGridProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  eyebrowLabel: string;
  items: Array<{
    id: string;
    label: string;
    href: string;
    image: { src: string; alt: string };
  }>;
};

export function CategoryGrid({
  eyebrow,
  title,
  description,
  eyebrowLabel,
  items,
}: CategoryGridProps) {
  return (
    <section className="bg-surface py-section-md">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="group border-border bg-surface rounded-card relative block overflow-hidden border shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3]">
                  <MediaImage
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardSprig />
                <div className="bg-surface/95 absolute inset-x-3 bottom-3 flex items-center justify-between rounded-lg px-4 py-3 backdrop-blur">
                  <div>
                    <p className="text-muted-foreground text-[0.65rem] font-bold tracking-[0.2em] uppercase">
                      {eyebrowLabel}
                    </p>
                    <h3 className="font-heading text-lg font-semibold">
                      {item.label}
                    </h3>
                  </div>
                  <span
                    className="bg-secondary text-accent-strong inline-flex size-9 items-center justify-center rounded-full"
                    aria-hidden="true"
                  >
                    <ArrowRightIcon className="size-4" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
