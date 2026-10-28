import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { PencilIcon } from "@/components/ui/icons";
import { MediaImage } from "@/components/ui/media-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site.config";
import { siteUrl } from "@/config/url.config";
import { catalogPageContent } from "@/content/catalog-page.content";
import { productPageContent as content } from "@/content/product-page.content";
import { sharedContent } from "@/content/shared.content";
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
import { ProductNotes } from "@/features/product/components/product-notes";
import { ProductSpecs } from "@/features/product/components/product-specs";
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
    // generic name here, never the licensed character
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
  const allSpecs = [...(product.specs ?? []), ...(product.extraSpecs ?? [])];
  const notes =
    product.notas
      ?.split("\n")
      .map((line) => line.trim())
      .filter(Boolean) ?? [];
  const productUrl = siteUrl
    ? new URL(getProductPath(product.slug), siteUrl).toString()
    : undefined;

  return (
    <>
      <Container className="pt-6">
        <Breadcrumb
          label={sharedContent.breadcrumb.label}
          items={[
            { label: sharedContent.breadcrumb.home, href: "/" },
            { label: catalogPageContent.breadcrumb, href: "/catalogo/" },
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

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <ProductGallery
            label={product.visibleName}
            labels={content.gallery}
            slides={images.map((image, index) => ({
              id: image.src,
              alt: image.alt,
              main: (
                <MediaImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  preload={index === 0}
                  sizes="(min-width: 1024px) 600px, 92vw"
                  skeleton
                  className="object-cover"
                />
              ),
              thumb: (
                <MediaImage
                  src={image.src}
                  alt=""
                  fill
                  sizes="120px"
                  skeleton
                  className="object-cover"
                />
              ),
              zoom: (
                <MediaImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="eager"
                  sizes="100vw"
                  className="object-contain"
                />
              ),
            }))}
          />

          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {category ? (
                  <span className="bg-secondary text-accent-strong rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap">
                    {category.label}
                  </span>
                ) : null}
                {product.codigo ? (
                  <span className="border-border text-muted-foreground rounded-full border px-4 py-[calc(0.5rem-1px)] text-xs font-semibold tracking-wide whitespace-nowrap">
                    {content.codeLabel} {product.codigo}
                  </span>
                ) : null}
              </div>
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
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-foreground/90 flex gap-3 text-sm leading-6">
                  <PencilIcon className="text-accent-strong mt-0.5 size-4 shrink-0" />
                  <span>
                    <strong className="text-accent-strong font-semibold">
                      {content.customizableNote.label}
                    </strong>
                    {" — "}
                    {product.customizable_details?.trim()
                      ? product.customizable_details.trim()
                      : content.customizableNote.text}
                    {" Coordiná los detalles a tu gusto por WhatsApp."}
                  </span>
                </p>
              </div>
            ) : null}

            <ConsultCard
              productName={product.visibleName}
              productUrl={productUrl}
              whatsapp={siteConfig.contact.whatsapp}
              unit={product.quantity.unit}
              min={product.quantity.min}
              step={product.quantity.step}
              content={content.consult}
            />
          </div>
        </div>

        {/* Mismas columnas que galería + compra. En desktop hay dos filas
            (títulos / cajas): Características las comparte vía subgrid y Notas
            ocupa solo la de cajas, así mide lo mismo que la tabla. */}
        {allSpecs.length > 0 || notes.length > 0 ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:grid-rows-[auto_auto] lg:gap-x-10 lg:gap-y-4">
            {allSpecs.length > 0 ? (
              <ProductSpecs
                title={content.specs.title}
                items={allSpecs}
                className="lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:[&>dl]:mt-0"
              />
            ) : null}
            {notes.length > 0 ? (
              <div
                className={`flex ${allSpecs.length > 0 ? "lg:col-start-2 lg:row-start-2" : ""}`}
              >
                <ProductNotes
                  title={content.notes.title}
                  closing={content.notes.closing}
                  items={notes}
                />
              </div>
            ) : null}
          </div>
        ) : null}

        {product.detailItems && product.detailItems.length > 0 ? (
          <div className="mt-14">
            <DetailItems
              items={product.detailItems}
              listTitle={content.details.listTitle}
              textTitle={content.details.textTitle}
              description={content.details.description}
              unitLabel={(quantity) =>
                quantity === 1
                  ? content.details.unitOne
                  : content.details.unitMany.replace("{n}", String(quantity))
              }
            />
          </div>
        ) : null}
      </Container>

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
                  sprigSrc={siteConfig.decor.cardSprig}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
