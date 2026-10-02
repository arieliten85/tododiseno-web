import type { Metadata } from "next";
import type { SeoConfig } from "./config.types";
import { siteConfig } from "./site.config";
import { siteUrl } from "./url.config";

export const seoConfig = {
  title: "Souvenirs, deco e impresos personalizados en Lanús",
  description:
    "Diseñamos e imprimimos souvenirs, decoración y detalles personalizados para comuniones, bautismos, cumpleaños temáticos, baby showers y Navidad. Local en Lanús Oeste y envíos a todo el país.",
  keywords: [
    "souvenirs personalizados",
    "cumpleaños temáticos",
    "souvenirs comunión",
    "souvenirs bautismo",
    "baby shower",
    "diseño e impresión",
    "Lanús",
  ],
} satisfies SeoConfig;

export const defaultMetadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${siteConfig.name} | ${seoConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  openGraph: {
    title: seoConfig.title,
    description: seoConfig.description,
    ...(siteUrl ? { url: siteUrl } : {}),
    siteName: siteConfig.name,
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.title,
    description: seoConfig.description,
  },
} satisfies Metadata;
