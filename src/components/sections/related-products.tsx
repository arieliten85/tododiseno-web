import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/class-names";

type RelatedProductsProps = {
  title: string;
  description?: string;
  /** Cada ítem trae su tarjeta ya armada (la sección no conoce el producto). */
  items: ReadonlyArray<{ slug: string; card: ReactNode }>;
  /** `page`: sección a todo el ancho. `inline`: dentro de otra columna. */
  layout?: "page" | "inline";
};

/** Sugerencias de productos: lista de tarjetas con título; sin ítems no se muestra. */
export function RelatedProducts({
  title,
  description,
  items,
  layout = "page",
}: RelatedProductsProps) {
  if (items.length === 0) return null;

  const list = (
    <ul
      className={cn(
        "grid gap-5 sm:grid-cols-2",
        layout === "page" ? "mt-12 lg:grid-cols-4" : "mt-6 xl:grid-cols-3",
      )}
    >
      {items.map((item) => (
        <li key={item.slug}>{item.card}</li>
      ))}
    </ul>
  );

  if (layout === "inline") {
    return (
      <section
        aria-label={title}
        className="border-border mt-14 border-t border-dashed pt-10"
      >
        <h2 className="font-heading text-foreground text-2xl font-semibold text-balance">
          {title}
        </h2>
        {description ? (
          <p className="text-muted-foreground mt-2 text-pretty">
            {description}
          </p>
        ) : null}
        {list}
      </section>
    );
  }

  return (
    <section className="py-section-md">
      <Container>
        <SectionHeading
          ornament="heart"
          title={title}
          description={description}
        />
        {list}
      </Container>
    </section>
  );
}
