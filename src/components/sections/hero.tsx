import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { MediaImage } from "@/components/ui/media-image";
import { LeafSprig, SoftBlob, WaveEdge } from "@/components/ui/ornaments";

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  action: { label: string; href: string };
  image: { src: string; alt: string };
};

/**
 * Hero de inicio: ocupa el alto de la pantalla menos el header (5rem) y la
 * foto va de fondo. En escritorio un velo crema la funde hacia la izquierda,
 * donde va el texto; en mobile el velo es parejo y el contenido va centrado.
 * La onda inferior toma el color de la sección siguiente (surface).
 */
export function Hero({
  eyebrow,
  title,
  description,
  action,
  image,
}: HeroProps) {
  return (
    <section className="bg-veil relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden [--hero-wave:clamp(1.5rem,4.15vw,4rem)]">
      <Container className="relative z-10 pt-12 pb-[calc(3rem+var(--hero-wave))] text-center lg:pt-16 lg:pb-[calc(4rem+var(--hero-wave))] lg:text-left">
        <div className="mx-auto max-w-[37.5rem] lg:mx-0">
          <p className="hero-enter text-accent-strong mb-3 text-xs font-semibold tracking-[0.1em] uppercase">
            {eyebrow}
          </p>
          <h1 className="hero-enter font-heading text-foreground text-[2.25rem] leading-[1.12] font-bold text-balance [--enter-delay:180ms] sm:text-[2.75rem] xl:text-5xl xl:leading-[1.1] xl:text-wrap">
            {title}
          </h1>
          <p className="hero-enter text-foreground/75 mx-auto mt-5 max-w-[30rem] text-base leading-7 text-pretty [--enter-delay:360ms] sm:text-lg sm:leading-[1.75] lg:mx-0">
            {description}
          </p>
          <div className="hero-enter mt-9 [--enter-delay:540ms]">
            <Button href={action.href} className="min-h-12 px-8">
              {action.label}
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </Container>

      <div className="hero-parallax absolute inset-0 -z-10">
        <MediaImage
          src={image.src}
          alt={image.alt}
          fill
          preload
          sizes="100vw"
          className="hero-image-enter object-cover object-[78%_center] lg:object-[right_70%]"
        />
        <div className="hero-veil absolute inset-0" />
      </div>

      <SoftBlob className="text-primary/13 pointer-events-none absolute bottom-0 left-0 hidden w-[clamp(18rem,27.9vw,24rem)] lg:block" />
      <LeafSprig className="text-ornament/40 pointer-events-none absolute bottom-5 left-4 hidden size-28 xl:block" />
      <WaveEdge className="text-surface pointer-events-none absolute inset-x-0 -bottom-px z-20 h-(--hero-wave) w-full" />
    </section>
  );
}
