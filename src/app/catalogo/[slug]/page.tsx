import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { PencilIcon } from "@/components/ui/icons";
import { MediaImage } from "@/components/ui/media-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { ValuesStrip } from "@/components/sections/values-strip";
import { siteConfig } from "@/config/site.config";
import { siteUrl } from "@/config/url.config";
import { homeContent } from "@/content/home.content";
import { productPageContent as content } from "@/content/product-page.content";
import { ProductCard } from "@/features/catalog/components/product-card";
import {
  getCategory,
  getProductBySlug,
  getProductPath,
  getProducts,
  getRelatedProducts,
} from "@/features/catalog/lib/product-queries";
import { ConsultCard } from "@/features/product/components/consult-card";
import { DetailItems } from "@/features/product/components/detail-items";
import { ProductGallery } from "@/features/product/components/product-gallery";
import { ShareButton } from "@/features/product/components/share-button";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    // Título y h1 reales usan el nombre genérico: nunca el personaje con licencia.
    title: product.seoName,
    description: product.description,
    alternates: { canonical: getProductPath(product.slug) },
    openGraph: { title: product.seoName, description: product.description },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);
  const images = [product.image, ...(product.gallery ?? [])];
  const productUrl = siteUrl
    ? new URL(getProductPath(product.slug), siteUrl).toString()
    : undefined;

  return (
    <>
      <Container className="pt-6">
        <Breadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: "Catálogo", href: "/catalogo/" },
            ...(category
              ? [
                  {
                    label: category.label,
                    href: `/catalogo/?categoria=${category.id}`,
                  },
                ]
              : []),
            { label: product.visibleName },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <ProductGallery
            label={product.visibleName}
            slides={images.map((image, index) => ({
              id: image.src,
              alt: image.alt,
              main: (
                <MediaImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 600px, 92vw"
                  className="object-cover"
                />
              ),
              thumb: (
                <MediaImage
                  src={image.src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              ),
            }))}
          />

          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              {category ? (
                <span className="bg-secondary text-accent-strong rounded-full px-4 py-1.5 text-xs font-bold">
                  {category.label}
                </span>
              ) : null}
              <ShareButton
                title={product.seoName}
                label={content.share.label}
                copiedLabel={content.share.copied}
              />
            </div>

            <div>
              <h1 className="sr-only">{product.seoName}</h1>
              <h2 className="font-heading text-foreground text-3xl leading-tight font-semibold text-balance sm:text-4xl">
                {product.visibleName}
              </h2>
              <p className="text-muted-foreground mt-4 leading-7 text-pretty">
                {product.description}
              </p>
            </div>

            {product.customizable ? (
              <p className="bg-secondary text-foreground/90 flex gap-3 rounded-lg p-4 text-sm leading-6">
                <PencilIcon className="text-accent-strong mt-0.5 size-4 shrink-0" />
                <span>
                  <strong className="text-accent-strong font-semibold">
                    {content.customizableNote.label}
                  </strong>{" "}
                  — {content.customizableNote.text}
                </span>
              </p>
            ) : null}

            <ConsultCard
              productName={product.visibleName}
              productUrl={productUrl}
              whatsapp={siteConfig.contact.whatsapp}
              unit={product.quantity.unit}
              min={product.quantity.min}
              step={product.quantity.step}
              content={content.consult}
              minimumLabel={`Cantidad mínima sugerida: ${product.quantity.min} ${product.quantity.unit}`}
            />
          </div>
        </div>

        {product.detailItems && product.detailItems.length > 0 ? (
          <div className="mt-14">
            <DetailItems
              items={product.detailItems}
              listTitle={content.details.listTitle}
              textTitle={content.details.textTitle}
              description={content.details.description}
              unitLabel={(quantity) =>
                quantity === 1 ? "1 unidad" : `${quantity} unidades`
              }
            />
          </div>
        ) : null}
      </Container>

      <div className="mt-16">
        <ValuesStrip items={homeContent.values} />
      </div>

      <section className="py-section-md">
        <Container>
          <SectionHeading
            ornament="heart"
            title={content.related.title}
            description={content.related.description}
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <li key={item.slug}>
                <ProductCard
                  href={getProductPath(item.slug)}
                  name={item.visibleName}
                  image={item.image}
                  actionLabel={content.related.action}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
