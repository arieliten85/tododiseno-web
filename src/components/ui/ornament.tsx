import { cn } from "@/lib/class-names";
import { HeartIcon } from "./icons";

export type OrnamentVariant = "flower" | "heart";

export function FlowerMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
      className={cn("size-5", className)}
    >
      <g className="fill-accent">
        <circle cx="10" cy="6.1" r="3.4" />
        <circle cx="13.7" cy="8.8" r="3.4" />
        <circle cx="12.3" cy="13.2" r="3.4" />
        <circle cx="7.7" cy="13.2" r="3.4" />
        <circle cx="6.3" cy="8.8" r="3.4" />
      </g>
      <circle cx="10" cy="10" r="2.2" className="fill-gold" />
    </svg>
  );
}

export function Ornament({
  className,
  variant = "flower",
}: {
  className?: string;
  variant?: OrnamentVariant;
}) {
  const line =
    variant === "heart"
      ? "border-accent/70 h-0 flex-1 border-t border-dotted"
      : "bg-accent/60 h-px flex-1";
  return (
    <div
      aria-hidden="true"
      className={cn("flex w-40 items-center gap-3", className)}
    >
      <span className={line} />
      {variant === "heart" ? (
        <HeartIcon className="text-accent size-4 shrink-0" />
      ) : (
        <FlowerMark className="shrink-0" />
      )}
      <span className={line} />
    </div>
  );
}

export function HeartsOrnament({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex w-72 max-w-full items-center gap-3", className)}
    >
      <span className="bg-accent/50 h-px flex-1" />
      <HeartIcon className="text-gold size-3.5" />
      <FlowerMark className="size-4" />
      <HeartIcon className="text-gold size-3.5" />
      <span className="bg-accent/50 h-px flex-1" />
    </div>
  );
}
