import Link from "next/link";
import type { Product } from "@/content/catalog.content";

export function ProductCard({ product }: { product: Product }) {
  return <article className="group overflow-hidden rounded-card bg-card shadow-sm transition-transform hover:-translate-y-1"><Link href={`/catalogo/${product.slug}`}><div className="aspect-[4/3] bg-muted bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} role="img" aria-label={product.name} /><div className="flex flex-col gap-3 p-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{product.category}</p><h3 className="font-heading text-xl text-card-foreground">{product.name}</h3><span className="text-sm font-semibold text-primary">Ver detalle →</span></div></Link></article>;
}
