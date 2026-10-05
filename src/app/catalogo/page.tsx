import type { Metadata } from "next";
import { Suspense } from "react";
import { CtaPanel } from "@/components/sections/cta-panel";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";
import { audiences, categories } from "@/content/categories.content";
import { catalogPageContent as content } from "@/content/catalog-page.content";
import {
  CatalogBrowser,
  type CatalogBrowserItem,
} from "@/features/catalog/components/catalog-browser";
import { ProductCard } from "@/features/catalog/components/product-card";
import {
  createSearchText,
  PAGE_SIZE,
} from "@/features/catalog/lib/filter-products";
import {
  getProductPath,
  getProducts,
} from "@/features/catalog/lib/product-queries";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Catálogo de souvenirs, deco e impresos personalizados",
  description:
    "Explorá souvenirs, deco e impresos personalizados para comuniones, bautismos, cumpleaños temáticos, baby showers y Navidad. Todo a pedido, con envíos a todo el país.",
  alternates: { canonical: "/catalogo/" },
};

export default function CatalogPage() {
  const items: CatalogBrowserItem[] = getProducts().map((product, index) => ({
    slug: product.slug,
    name: product.visibleName,
    searchText: createSearchText(
      product.visibleName,
      product.seoName,
      product.description,
    ),
    category: product.category,
    audience: product.audience,
    order: index,
    card: (
      <ProductCard
        href={getProductPath(product.slug)}
        name={product.visibleName}
        image={product.image}
        actionLabel="Ver detalles"
        eager={index < 3}
      />
    ),
  }));

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Inicio", href: "/" },
          { label: content.breadcrumb },
        ]}
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
      />
      <Container>
        <Suspense
          fallback={
            // HTML estático (SEO y primera pintura): primera página sin filtros.
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {items.slice(0, PAGE_SIZE).map((item) => (
                <li key={item.slug}>{item.card}</li>
              ))}
            </ul>
          }
        >
          <CatalogBrowser
            items={items}
            categories={categories.map(({ id, label }) => ({ id, label }))}
            audiences={audiences}
            content={content}
          />
        </Suspense>
      </Container>
      <CtaPanel
        eyebrow={content.cta.eyebrow}
        title={content.cta.title}
        description={content.cta.description}
        action={{
          label: content.cta.action.label,
          href: createWhatsAppUrl(
            siteConfig.contact.whatsapp,
            content.cta.action.message,
          ),
        }}
        secondaryAction={content.cta.secondaryAction}
        reassurance={content.cta.reassurance}
        image={content.cta.image}
      />
    </>
  );
}
