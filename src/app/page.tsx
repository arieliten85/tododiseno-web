import type { Metadata } from "next";
import { CategoryGrid } from "@/components/sections/category-grid";
import { CtaPanel } from "@/components/sections/cta-panel";
import { Hero } from "@/components/sections/hero";
import { Testimonials } from "@/components/sections/testimonials";
import { ValuesStrip } from "@/components/sections/values-strip";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { seoConfig } from "@/config/seo.config";
import { siteConfig } from "@/config/site.config";
import { categories } from "@/content/categories.content";
import { homeContent } from "@/content/home.content";
import { sharedContent } from "@/content/shared.content";
import { ProductCard } from "@/features/catalog/components/product-card";
import {
  getFeaturedProducts,
  getProductPath,
} from "@/features/catalog/lib/product-queries";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | ${seoConfig.title}` },
  alternates: { canonical: "/" },
};

export default function Home() {
  const featured = getFeaturedProducts();
  const {
    hero,
    categories: categoriesIntro,
    featured: featuredIntro,
    values,
    testimonials,
    cta,
  } = homeContent;

  return (
    <>
      <Hero {...hero} />

      <CategoryGrid
        eyebrow={categoriesIntro.eyebrow}
        title={categoriesIntro.title}
        description={categoriesIntro.description}
        eyebrowLabel={categoriesIntro.cardEyebrow}
        sprigSrc={siteConfig.decor.cardSprig}
        items={categories.map((category) => ({
          id: category.id,
          label: category.label,
          href: `/catalogo/?categoria=${category.id}`,
          image: category.image,
        }))}
      />

      <section className="bg-secondary/60 py-section-md">
        <Container>
          <SectionHeading
            ornament="heart"
            eyebrow={featuredIntro.eyebrow}
            title={featuredIntro.title}
            description={featuredIntro.description}
          />
          <ul
            data-reveal-stagger
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {featured.map((product) => (
              <li key={product.slug} data-reveal>
                <ProductCard
                  href={getProductPath(product.slug)}
                  name={product.visibleName}
                  image={product.image}
                  actionLabel={featuredIntro.cardAction}
                  sprigSrc={siteConfig.decor.cardSprig}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ValuesStrip items={values} />
      <Testimonials {...testimonials} />
      <CtaPanel
        eyebrow={cta.eyebrow}
        title={cta.title}
        description={cta.description}
        chips={cta.chips}
        action={{
          label: cta.action.label,
          href: createWhatsAppUrl(
            siteConfig.contact.whatsapp,
            cta.action.message,
          ),
        }}
        secondaryAction={cta.secondaryAction}
        reassurance={cta.reassurance}
        badge={cta.badge}
        image={cta.image}
        imageSide="left"
        newTabLabel={sharedContent.newTab}
      />

      <ScrollReveal />
    </>
  );
}
