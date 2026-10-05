import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import {
  ChatIcon,
  HeartIcon,
  HomeIcon,
  PencilIcon,
  PinIcon,
  RoseIcon,
  ScissorsIcon,
} from "@/components/ui/icons";
import { CardSprig } from "@/components/ui/card-sprig";
import { MediaImage } from "@/components/ui/media-image";
import { HeartsOrnament } from "@/components/ui/ornament";
import { WavyBand } from "@/components/ui/wavy-band";
import { siteConfig } from "@/config/site.config";
import { aboutContent as content } from "@/content/about.content";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Conocé a Florencia y su local en Lanús Oeste, donde diseña e imprime souvenirs, deco e impresos personalizados para cada celebración.",
  alternates: { canonical: "/sobre-mi/" },
};

const itemIcons = {
  design: PencilIcon,
  finish: ScissorsIcon,
  chat: ChatIcon,
} as const;

export default function AboutPage() {
  const { intro, commitment } = content;

  return (
    <section className="pb-section-md pt-6">
      <Container>
        <Breadcrumb
          items={[
            {
              label: "Inicio",
              href: "/",
              icon: <HomeIcon className="size-4" />,
            },
            { label: content.breadcrumb },
          ]}
        />
        <header className="mt-8 flex flex-col items-center text-center">
          <p className="text-accent-strong mb-3 text-[0.7rem] font-bold tracking-[0.2em] uppercase">
            {content.eyebrow}
          </p>
          <h1 className="font-heading text-4xl leading-tight font-semibold text-balance sm:text-5xl">
            {content.title}
          </h1>
          <HeartsOrnament className="mt-5" />
        </header>
      </Container>

      <WavyBand className="mt-10 sm:mt-14">
        <Container className="grid items-center gap-10 py-4 sm:py-6 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-[34.5rem]">
            <p className="font-heading text-accent-strong text-xl leading-snug font-medium italic">
              {content.tagline}
            </p>
            <p className="text-foreground/85 mt-2 text-lg leading-[1.75] text-pretty">
              {intro.before}{" "}
              <strong className="text-foreground font-semibold">
                {intro.name}
              </strong>{" "}
              <HeartIcon className="text-gold inline size-4 align-[-0.1em]" />{" "}
              {intro.after}
            </p>

            <div className="border-border bg-surface relative mt-7 rounded-2xl border p-1.5 shadow-md">
              <div className="border-border/70 rounded-[0.85rem] border px-5 py-5 sm:px-6">
                <h2 className="font-heading flex items-center gap-2 text-xl font-semibold">
                  <RoseIcon className="text-ornament h-5 w-auto shrink-0" />
                  {commitment.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {commitment.items.map((item) => {
                    const Icon = itemIcons[item.icon];
                    return (
                      <li
                        key={item.text}
                        className="text-foreground/85 flex items-start gap-3 text-[0.95rem] leading-6"
                      >
                        <span className="bg-muted text-accent-strong mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full">
                          <Icon className="size-3.5" />
                        </span>
                        {item.text}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <CardSprig src={siteConfig.decor.cardSprig} />
            </div>

            <p className="text-muted-foreground mt-5 flex items-center gap-2 text-sm">
              <PinIcon className="size-4 shrink-0" />
              {siteConfig.business.address}
            </p>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[23rem] overflow-hidden rounded-[1.25rem] shadow-lg">
            <MediaImage
              src={content.image.src}
              alt={content.image.alt}
              fill
              fetchPriority="high"
              sizes="(min-width: 1024px) 370px, 92vw"
              className="object-cover"
            />
          </div>
        </Container>
      </WavyBand>
    </section>
  );
}
