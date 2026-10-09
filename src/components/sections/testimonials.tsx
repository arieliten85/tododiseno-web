import { Container } from "@/components/ui/container";
import { MediaImage } from "@/components/ui/media-image";
import { SectionHeading } from "@/components/ui/section-heading";

type TestimonialsProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: Array<{ id: string; image: { src: string; alt: string } }>;
};

/** Capturas reales de mensajes de clientas (sin texto inventado). */
export function Testimonials({
  eyebrow,
  title,
  description,
  items,
}: TestimonialsProps) {
  return (
    <section className="bg-secondary/60 py-section-md">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <ul data-reveal-stagger className="mt-12 grid gap-6 sm:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.id}
              data-reveal
              className="bg-surface rounded-card overflow-hidden shadow-md"
            >
              <div className="relative aspect-[32/35]">
                <MediaImage
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 640px) 30vw, 92vw"
                  className="object-contain"
                />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
