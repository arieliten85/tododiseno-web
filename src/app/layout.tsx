import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { WhatsAppFloat } from "@/components/sections/whatsapp-float";
import { layoutConfig } from "@/config/layout.config";
import { defaultMetadata } from "@/config/seo.config";
import { siteConfig } from "@/config/site.config";
import { categories } from "@/content/categories.content";
import { searchContent } from "@/content/search.content";
import { createSearchText } from "@/features/catalog/lib/filter-products";
import { getProducts } from "@/features/catalog/lib/product-queries";
import { footerContent } from "@/content/footer.content";
import { createLocalBusinessJsonLd } from "@/lib/seo/json-ld";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { bodyFont, headingFont } from "@/theme/fonts";
import "./globals.css";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const jsonLd = createLocalBusinessJsonLd(siteConfig);
  const instagram = siteConfig.socials.instagram;
  const facebook = siteConfig.socials.facebook;
  const searchItems = getProducts().map((product, index) => ({
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
    categoryLabel:
      categories.find((category) => category.id === product.category)?.label ??
      "",
    image: { src: product.image.src },
  }));

  return (
    <html
      lang="es-AR"
      className={`${headingFont.variable} ${bodyFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#contenido"
          className="bg-surface text-foreground focus:ring-accent-strong sr-only z-50 rounded-md px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:ring-2"
        >
          Saltar al contenido
        </a>
        <Header
          name={siteConfig.name}
          brand={siteConfig.brand}
          logo={siteConfig.logo}
          navigation={layoutConfig.navigation}
          search={{
            items: searchItems,
            categories: categories.map(({ id, label }) => ({ id, label })),
            content: searchContent,
            catalogPath: "/catalogo/",
          }}
          instagramHref={instagram}
          facebookHref={facebook}
        />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer
          name={siteConfig.name}
          brand={siteConfig.brand}
          logo={siteConfig.logo}
          navigation={layoutConfig.footerNavigation}
          phone={siteConfig.contact.phoneDisplay}
          email={siteConfig.contact.email}
          address={siteConfig.business.address}
          hours={siteConfig.business.hours}
          instagram={
            instagram && siteConfig.contact.instagramHandle
              ? { href: instagram, label: siteConfig.contact.instagramHandle }
              : undefined
          }
          facebook={
            facebook && siteConfig.contact.facebookLabel
              ? { href: facebook, label: siteConfig.contact.facebookLabel }
              : undefined
          }
          credit={siteConfig.credit}
          content={footerContent}
        />
        <WhatsAppFloat
          href={createWhatsAppUrl(
            siteConfig.contact.whatsapp,
            "Hola Florencia! Quiero hacerte una consulta.",
          )}
          label="Escribinos por WhatsApp (se abre en una pestaña nueva)"
        />
      </body>
    </html>
  );
}
