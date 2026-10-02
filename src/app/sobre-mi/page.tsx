import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { WhatsAppIcon } from "@/components/ui/icons";
import { MediaImage } from "@/components/ui/media-image";
import { Ornament } from "@/components/ui/ornament";
import { siteConfig } from "@/config/site.config";
import { aboutContent as content } from "@/content/about.content";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Conocé a Florencia y su local en Lanús Oeste, donde diseña e imprime souvenirs, deco e impresos personalizados para cada celebración.",
  alternates: { canonical: "/sobre-mi/" },
};

export default function AboutPage() {
  return (
    <section className="pb-section-md py-6">
      <Container>
        <Breadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: content.breadcrumb },
          ]}
        />
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="bg-secondary text-accent-strong mb-5 w-fit rounded-full px-4 py-1.5 text-[0.7rem] font-bold tracking-[0.2em] uppercase">
              {content.eyebrow}
            </p>
            <h1 className="font-heading text-4xl leading-tight font-semibold text-balance sm:text-5xl">
              {content.title}
            </h1>
            <Ornament className="mt-5" />
            <div className="mt-6 space-y-4 text-lg leading-8">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-foreground/85 text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
            <Button
              href={createWhatsAppUrl(
                siteConfig.contact.whatsapp,
                content.action.message,
              )}
              variant="whatsapp"
              className="mt-8"
            >
              <WhatsAppIcon className="size-5" />
              {content.action.label}
            </Button>
          </div>
          <div className="bg-surface rounded-card relative aspect-[4/5] overflow-hidden p-2 shadow-md">
            <div className="relative size-full overflow-hidden rounded-xl">
              <MediaImage
                src={content.image.src}
                alt={content.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 560px, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
