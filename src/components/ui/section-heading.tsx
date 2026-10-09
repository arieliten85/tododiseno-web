import { cn } from "@/lib/class-names";
import { Ornament, type OrnamentVariant } from "./ornament";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  ornament?: OrnamentVariant | false;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  ornament = "flower",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      data-reveal
      className={cn("max-w-content-medium", centered && "mx-auto text-center")}
    >
      {eyebrow ? (
        <p className="text-accent-strong mb-3 text-xs font-bold tracking-[0.24em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="font-heading text-foreground text-3xl leading-tight font-semibold text-balance sm:text-4xl">
        {title}
      </Tag>
      {ornament ? (
        <Ornament
          variant={ornament}
          className={cn("mt-4", centered && "mx-auto")}
        />
      ) : null}
      {description ? (
        <p className="text-muted-foreground mt-4 text-base leading-7 text-pretty sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
