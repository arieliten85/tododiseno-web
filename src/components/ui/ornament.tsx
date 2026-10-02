import { cn } from "@/lib/class-names";
import { FlowerIcon } from "./icons";

/** Línea corta con florcita al centro: adorno de títulos de sección. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("text-accent flex w-40 items-center gap-3", className)}
    >
      <span className="bg-accent/60 h-px flex-1" />
      <FlowerIcon className="size-4" />
      <span className="bg-accent/60 h-px flex-1" />
    </div>
  );
}
