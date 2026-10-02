import type { MetadataRoute } from "next";
import {
  getProductPath,
  getProducts,
} from "@/features/catalog/lib/product-queries";
import { siteUrl } from "@/config/url.config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  const pages = ["/", "/catalogo/", "/sobre-mi/", "/contacto/"].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
  const products = getProducts().map((product) => ({
    url: new URL(getProductPath(product.slug), siteUrl).toString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...products];
}
