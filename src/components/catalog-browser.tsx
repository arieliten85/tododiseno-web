"use client";
import { useMemo, useState } from "react";
import { categories, products } from "@/content/catalog.content";
import { ProductCard } from "@/components/product-card";

export function CatalogBrowser() {
  const [query, setQuery] = useState(""); const [category, setCategory] = useState("Todas");
  const filtered = useMemo(() => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) && (category === "Todas" || p.category === category)), [query, category]);
  return <div className="flex flex-col gap-8"><div className="grid gap-3 rounded-card bg-card p-4 shadow-sm sm:grid-cols-[1fr_auto]"><label className="sr-only" htmlFor="search">Buscar productos</label><input id="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre..." className="min-h-12 rounded-button border border-border bg-background px-5 text-sm outline-none focus:border-primary" /><label className="sr-only" htmlFor="category">Filtrar por categoría</label><select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="min-h-12 rounded-button border border-border bg-background px-5 text-sm outline-none focus:border-primary"><option>Todas</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></div><p className="text-sm text-muted-foreground">{filtered.length} opciones para inspirarte</p>{filtered.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : <div className="rounded-card bg-card p-10 text-center text-muted-foreground">No encontramos productos con esa búsqueda.</div>}</div>;
}
