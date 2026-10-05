import { cn } from "@/lib/class-names";
import { MediaImage } from "@/components/ui/media-image";

/**
 * Detalle decorativo para el ángulo superior derecho de una card. El
 * contenedor debe ser `relative`; no capta clics ni lo leen los lectores de
 * pantalla. La imagen llega por props: la UI no conoce los assets de marca.
 */
export function CardSprig({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <MediaImage
      src={src}
      alt=""
      aria-hidden="true"
      sizes="28px"
      className={cn(
        "pointer-events-none absolute top-4 right-4 z-10 w-6 sm:top-5 sm:right-5 sm:w-7",
        className,
      )}
    />
  );
}
