import { categories } from "@/content/categories.content";
import type { CategoryId, Product } from "@/content/content.types";
import { products } from "@/content/products.content";

const slugs = new Set<string>();
for (const product of products) {
  if (slugs.has(product.slug)) {
    throw new Error(`Slug de producto duplicado: ${product.slug}`);
  }
  slugs.add(product.slug);
}

export function getProducts(): readonly Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.filter((product) => product.featured).slice(0, limit);
}

export function getCategory(id: CategoryId) {
  return categories.find((category) => category.id === id);
}

// same category first, then the rest
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const others = products.filter(
    (candidate) => candidate.slug !== product.slug,
  );
  const sameCategory = others.filter(
    (candidate) => candidate.category === product.category,
  );
  const rest = others.filter(
    (candidate) => candidate.category !== product.category,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getProductPath(slug: string) {
  return `/catalogo/${slug}/`;
}
