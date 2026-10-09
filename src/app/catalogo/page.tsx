import type { Metadata } from "next";
import { Suspense } from "react";
import { CtaPanel } from "@/components/sections/cta-panel";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";
import { audiences, categories } from "@/content/categories.content";
import { catalogPageContent as content } from "@/content/catalog-page.content";
import { sharedContent } from "@/content/shared.content";
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
  ...content.metadata,
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
        actionLabel={content.cardAction}
        sprigSrc={siteConfig.decor.cardSprig}
        eager={index < 3}
      />
    ),
  }));

  return (
    <>
      <PageHero
        breadcrumbLabel={sharedContent.breadcrumb.label}
        breadcrumb={[
          { label: sharedContent.breadcrumb.home, href: "/" },
          { label: content.breadcrumb },
        ]}
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
      />
      <Container>
        <Suspense
          fallback={
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
        newTabLabel={sharedContent.newTab}
      />
    </>
  );
}
