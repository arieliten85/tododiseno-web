import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  CheckCircleIcon,
  HeartIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { MediaImage } from "@/components/ui/media-image";

type CtaPanelProps = {
  eyebrow: string;
  title: string;
  description: string;
  chips?: string[];
  action: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  reassurance?: string;
  badge?: string;
  image: { src: string; alt: string };
  imageSide?: "left" | "right";
  /** Aviso para lectores de pantalla en acciones externas (pestaña nueva). */
  newTabLabel?: string;
};

/** Bloque de cierre: texto + botón de WhatsApp junto a una foto. */
export function CtaPanel({
  eyebrow,
  title,
  description,
  chips,
  action,
  secondaryAction,
  reassurance,
  badge,
  image,
  imageSide = "right",
  newTabLabel,
}: CtaPanelProps) {
  return (
    <section className="py-section-md">
      <Container>
        <div className="bg-secondary border-border rounded-card grid items-center gap-8 border p-6 shadow-md sm:p-10 lg:grid-cols-2">
          <div className={imageSide === "left" ? "lg:order-2" : undefined}>
            <p className="bg-surface text-accent-strong mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.65rem] font-bold tracking-[0.2em] uppercase">
              <HeartIcon className="size-3" />
              {eyebrow}
            </p>
            <h2 className="font-heading text-3xl leading-tight font-semibold text-balance sm:text-4xl">
              {title}
            </h2>
            <p className="text-foreground/80 mt-4 leading-7 text-pretty">
              {description}
            </p>
            {chips && chips.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <li
                    key={chip}
                    className="bg-surface text-accent-strong rounded-full px-3 py-1.5 text-xs font-semibold"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                href={action.href}
                variant="whatsapp"
                newTabLabel={newTabLabel}
              >
                <WhatsAppIcon className="size-5" />
                {action.label}
              </Button>
              {secondaryAction ? (
                <Button
                  href={secondaryAction.href}
                  variant="outline"
                  newTabLabel={newTabLabel}
                >
                  {secondaryAction.label}
                </Button>
              ) : null}
            </div>
            {reassurance ? (
              <p className="text-muted-foreground mt-5 flex items-center gap-2 text-sm">
                <CheckCircleIcon className="text-detail size-4" />
                {reassurance}
              </p>
            ) : null}
          </div>
          <div className="bg-surface rounded-card relative aspect-[4/3] overflow-hidden p-2 shadow-sm">
            <div className="relative size-full overflow-hidden rounded-xl">
              <MediaImage
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 520px, 90vw"
                className="object-cover"
              />
            </div>
            {badge ? (
              <span className="bg-surface/95 text-foreground absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm">
                <HeartIcon className="text-accent-strong size-3" />
                {badge}
              </span>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
