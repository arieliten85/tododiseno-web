import { cn } from "@/lib/class-names";
import { MediaImage } from "@/components/ui/media-image";

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
