import Link from "next/link";
import type { Product } from "@/content/catalog.content";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-card bg-card shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/catalogo/${product.slug}`} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <div className="size-full bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${product.image})` }} role="img" aria-label={product.name} />
        </div>
        <div className="flex items-center justify-between gap-4 p-5">
          <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{product.category}</p><h3 className="mt-2 font-heading text-xl text-card-foreground">{product.name}</h3></div>
          <span className="shrink-0 rounded-button border border-primary px-4 py-2 text-sm font-bold text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">Ver más</span>
        </div>
      </Link>
    </article>
  );
}
