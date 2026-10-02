import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { MediaImage } from "@/components/ui/media-image";

type ProductCardProps = {
  href: string;
  name: string;
  image: { src: string; alt: string };
  actionLabel: string;
  /** Marca la primera imagen visible para cargarla con prioridad. */
  priority?: boolean;
};

/** Tarjeta de producto del catálogo: foto, nombre y acceso al detalle. Sin precio. */
export function ProductCard({
  href,
  name,
  image,
  actionLabel,
  priority,
}: ProductCardProps) {
  return (
    <article className="group bg-surface border-border rounded-card relative flex h-full flex-col overflow-hidden border p-2.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <Link
        href={href}
        className="relative block aspect-[4/3] overflow-hidden rounded-xl"
        tabIndex={-1}
        aria-hidden="true"
      >
        <MediaImage
          src={image.src}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="border-border mt-3 flex flex-1 flex-col items-center gap-4 border-t border-dashed px-2 pt-4 pb-2 text-center">
        <h3 className="font-heading text-foreground text-lg leading-snug font-semibold text-balance">
          <Link
            href={href}
            className="after:absolute after:inset-0 hover:underline"
          >
            {name}
            <span className="sr-only">: {actionLabel}</span>
          </Link>
        </h3>
        <span
          className="bg-secondary text-secondary-foreground group-hover:bg-primary/40 mt-auto inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors"
          aria-hidden="true"
        >
          {actionLabel}
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
