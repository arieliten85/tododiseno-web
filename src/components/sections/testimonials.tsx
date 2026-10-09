import type { ComponentProps } from "react";
import { Container } from "@/components/ui/container";
import { MediaImage } from "@/components/ui/media-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Slider } from "@/components/ui/slider";

type TestimonialsProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: Array<{ id: string; image: { src: string; alt: string } }>;
  slider: ComponentProps<typeof Slider>["labels"];
};

/** Capturas reales de mensajes de clientas (sin texto inventado). */
export function Testimonials({
  eyebrow,
  title,
  description,
  items,
  slider,
}: TestimonialsProps) {
  return (
    <section className="bg-secondary/60 py-section-md">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <Slider
          labels={slider}
          itemClassName="basis-[86%] sm:basis-[calc(50%-0.75rem)] lg:basis-[calc((100%-3rem)/3)]"
          className="mt-12"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-surface rounded-card overflow-hidden shadow-md"
            >
              <div className="relative aspect-[32/35]">
                <MediaImage
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 86vw"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
}
