import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { MediaImage } from "@/components/ui/media-image";

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  action: { label: string; href: string };
  image: { src: string; alt: string };
};

export function Hero({
  eyebrow,
  title,
  description,
  action,
  image,
}: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <MediaImage
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="from-background via-background/85 sm:via-background/70 absolute inset-0 bg-gradient-to-r to-transparent" />
      </div>
      <Container className="flex min-h-[28rem] items-center py-16 sm:min-h-[34rem] sm:py-24">
        <div className="max-w-xl">
          <p className="text-accent-strong mb-4 text-xs font-bold tracking-[0.24em] uppercase">
            {eyebrow}
          </p>
          <h1 className="font-heading text-foreground text-4xl leading-tight font-semibold text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="text-foreground/80 mt-5 text-base leading-7 text-pretty sm:text-lg">
            {description}
          </p>
          <Button href={action.href} className="mt-8">
            {action.label}
            <ArrowRightIcon className="size-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
