import type { Product } from "./content.types";

const photo = (id: string, alt: string) => ({
  src: `/brand/products/${id}.jpg`,
  alt,
});

const pieces = { unit: "unidades", min: 10, step: 5 } as const;
const kit = { unit: "kits", min: 1, step: 1 } as const;

// new product: add an object + public/brand/products/<id>.jpg. no invented quantities/sizes
export const products = [

  // ── TEST · estampita comunión (datos reales de Florencia) ───────────────
  {
    id: "tarjeta-comunion-314f",
    slug: "tarjeta-comunion-314f",
    productType: "print",
    category: "comuniones",
    audience: "unisex",
    visibleName: "Estampita Comunión",
    seoName: "Estampita de Comunión personalizada",
    codigo: "AC9",
    description:
      "Estampitas de Comunión personalizadas, con diseños delicados y detalles especiales para acompañar este momento tan importante.",
    notas:
      "El catálogo completo para ver más diseños disponibles.\nLlevando 30 estampitas llevás la caja contenedora de regalo.",
    image: {
      src: "https://snwjaaahigaivjyepcrc.supabase.co/storage/v1/object/public/product-images/tarjeta-comunion-314f/1792528260800-0.jpg",
      alt: "Estampita de Comunión personalizada",
    },
    gallery: [
      {
        src: "https://snwjaaahigaivjyepcrc.supabase.co/storage/v1/object/public/product-images/tarjeta-comunion-314f/1792528264030-1.jpg",
        alt: "Estampita de Comunión — detalle",
      },
      {
        src: "https://snwjaaahigaivjyepcrc.supabase.co/storage/v1/object/public/product-images/tarjeta-comunion-314f/1792528265299-2.jpg",
        alt: "Estampita de Comunión — presentación",
      },
    ],
    specs: [
      { label: "Medida", value: "12x7cm" },
      { label: "Papel", value: "Fotográfico mate" },
      { label: "Gramaje", value: "250 g" },
      { label: "Presentación", value: "Individual" },
      { label: "Terminación", value: "Redondeada" },
    ],
    customizable: true,
    customizable_details:
      "Los textos, frases y colores de cada modelo se pueden adaptar o modificar a tu gusto. Las terminaciones pueden ser rectas o redondeadas.",
    quantity: { unit: "unidades", min: 15, step: 5 },
    featured: false,
  },

  // ── DEMO print · comuniones ─────────────────────────────────────────────
  {
    id: "estampita-comunion-demo",
    slug: "estampita-comunion-demo",
    productType: "print",
    category: "comuniones",
    audience: "nina",
    visibleName: "Estampita de Comunión",
    seoName: "Estampita personalizada para comunión",
    description:
      "Estampita personalizada para recordar la primera comunión. Lleva el nombre, la fecha y el lugar de la ceremonia.",
    image: photo(
      "estampita-comunion-demo",
      "Estampita de comunión personalizada",
    ),
    specs: [
      { label: "Medida", value: "5 × 9 cm" },
      { label: "Papel", value: "Ilustración" },
      { label: "Gramaje", value: "300 g" },
      { label: "Caras", value: "Dos caras" },
      { label: "Terminación", value: "Puntas redondeadas" },
      { label: "Presentación", value: "Individual" },
    ],
    customizable: true,
    quantity: pieces,
    featured: true,
  },

  // ── DEMO object · comuniones ────────────────────────────────────────────
  {
    id: "cajita-piramidal-comunion-demo",
    slug: "cajita-piramidal-comunion-demo",
    productType: "object",
    category: "comuniones",
    audience: "unisex",
    visibleName: "Cajita Piramidal con Nombre",
    seoName: "Cajita piramidal personalizada para comunión",
    description:
      "Cajita piramidal personalizada con el nombre, para entregar los recuerdos de la comunión.",
    image: photo(
      "cajita-piramidal-comunion-demo",
      "Cajita piramidal personalizada con nombre para comunión",
    ),
    customizable: true,
    quantity: pieces,
    featured: true,
  },

  // ── DEMO kit · comuniones ───────────────────────────────────────────────
  {
    id: "kit-comunion-demo",
    slug: "kit-comunion-demo",
    productType: "kit",
    category: "comuniones",
    audience: "nina",
    visibleName: "Kit de Comunión Completo",
    seoName: "Kit de decoración y recuerdos para comunión",
    description:
      "Set completo para comunión: estampita, souvenir y tarjeta de invitación, todo coordinado con el mismo diseño personalizado.",
    image: photo(
      "kit-comunion-demo",
      "Kit de comunión con estampita, souvenir y tarjeta coordinados",
    ),
    detailItems: [
      {
        item: "Estampita impresa",
        quantity: 1,
        note: "Personalizada con nombre, fecha y lugar",
      },
      {
        item: "Cajita piramidal",
        quantity: 1,
        note: "Con el nombre coordinado",
      },
      {
        item: "Tarjeta de invitación",
        quantity: 1,
        note: "Personalizada con los datos de la ceremonia",
      },
    ],
    specs: [
      { label: "Cantidad de piezas", value: "3 ítems" },
    ],
    customizable: true,
    quantity: kit,
    featured: true,
  },
] satisfies Product[];
