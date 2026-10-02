import type { Product } from "./content.types";

const photo = (id: string, alt: string) => ({
  src: `/brand/products/${id}.jpg`,
  alt,
});

const pieces = { unit: "unidades", min: 10, step: 5 } as const;
const kit = { unit: "kits", min: 1, step: 1 } as const;

/**
 * Catálogo. Para sumar un producto: agregá un objeto acá y dejá su foto en
 * public/brand/products/<id>.jpg (`bun dev` y `bun run build` optimizan solas).
 * Nunca se inventan cantidades ni medidas: sin dato real, se omite `detailItems`.
 * El slug es la URL pública: genérico y sin nombres de personajes con licencia.
 */
export const products = [
  {
    id: "kit-tematico-cumpleanos-01",
    slug: "kit-tematico-cumpleanos-01",
    category: "cumpleanos-tematicos",
    audience: "nino",
    visibleName: "Kit Inter de Miami Messi",
    seoName: "Kit temático de cumpleaños",
    description:
      "Set de decoración personalizado inspirado en el Inter de Miami, ideal para cumpleaños y celebraciones temáticas. Incluye distintos detalles decorativos coordinados y puede personalizarse con nombre, edad y temática.",
    image: photo(
      "kit-tematico-cumpleanos-01",
      "Kit temático de cumpleaños con banderín, toppers y stickers",
    ),
    gallery: [
      photo(
        "kit-tematico-cumpleanos-01-2",
        "Personaje decorativo del kit temático",
      ),
      photo(
        "kit-tematico-cumpleanos-01-3",
        "Toppers y banderín del kit temático",
      ),
      photo(
        "kit-tematico-cumpleanos-01-4",
        "Stickers circulares del kit temático",
      ),
    ],
    detailItems: [
      { item: "Invitación virtual", quantity: 1, note: "Opcional" },
      { item: "Banderín de torta + personaje", quantity: 1, size: "10 cm" },
      {
        item: "Banderín con nombre (5 triangulitos)",
        quantity: 1,
        note: "Consultar para agregar más",
      },
      {
        item: "Toppers",
        quantity: 10,
        note: "Se pueden usar para cupcakes, magdalenas, alfajorcitos, trufas, postres o decoración de algún frasquito",
      },
      {
        item: "Stickers circulares",
        quantity: 15,
        size: "4x4 cm",
        note: "Para decorar golosinas, vasos, platos, botellas, etc.",
      },
      { item: "Personaje para decorar", quantity: 1, size: "30 cm" },
      { item: "Poster Feliz Cumple", quantity: 1 },
      {
        item: "Props para fotos",
        quantity: 5,
        note: "A elección entre distintas frases",
      },
    ],
    customizable: true,
    quantity: kit,
    featured: true,
  },
  {
    id: "cajas-personalizadas-01",
    slug: "cajas-personalizadas-01",
    category: "otros-eventos",
    audience: "unisex",
    visibleName: "Cajas Personalizadas",
    seoName: "Cajas personalizadas",
    description:
      "Cajas diseñadas con el nombre, la fecha y la temática de tu evento, listas para armar tus souvenirs.",
    image: photo(
      "cajas-personalizadas-01",
      "Cajas personalizadas con nombre y diseño floral",
    ),
    customizable: true,
    quantity: pieces,
    featured: true,
  },
  {
    id: "banderin-tematico-01",
    slug: "banderin-tematico-01",
    category: "cumpleanos-tematicos",
    audience: "nino",
    visibleName: "Banderín temático de cumpleaños",
    seoName: "Banderín temático de cumpleaños",
    description:
      "Banderín con el nombre del festejado y la temática elegida, para decorar la mesa o la pared del salón.",
    image: photo("banderin-tematico-01", "Banderín temático de cumpleaños"),
    customizable: true,
    quantity: kit,
    featured: true,
  },
  {
    id: "toppers-cupcakes-01",
    slug: "toppers-cupcakes-01",
    category: "otros-eventos",
    audience: "unisex",
    visibleName: "Toppers cupcakes mesa dulce",
    seoName: "Toppers para mesa dulce",
    description:
      "Toppers personalizados para completar cupcakes, postres y toda la mesa dulce con el mismo diseño.",
    image: photo(
      "toppers-cupcakes-01",
      "Toppers personalizados sobre cupcakes en una mesa dulce",
    ),
    customizable: true,
    quantity: pieces,
    featured: true,
  },
  {
    id: "cajas-pochocleras-01",
    slug: "cajas-pochocleras-01",
    category: "cumpleanos-tematicos",
    audience: "nina",
    visibleName: "Cajas Pochocleras María Becerra",
    seoName: "Cajas pochocleras personalizadas",
    description:
      "Cajas pochocleras con diseño temático, para servir pochoclos y golosinas en el festejo.",
    image: photo(
      "cajas-pochocleras-01",
      "Cajas pochocleras con diseño temático",
    ),
    customizable: true,
    quantity: pieces,
  },
  {
    id: "centro-de-mesa-01",
    slug: "centro-de-mesa-01",
    category: "cumpleanos-tematicos",
    audience: "nina",
    visibleName: "Centro de mesa Kuromi",
    seoName: "Centro de mesa personalizado",
    description:
      "Centro de mesa con el nombre y la edad de la cumpleañera, en la temática elegida.",
    image: photo(
      "centro-de-mesa-01",
      "Tarjetas de mesa personalizadas con nombre y edad",
    ),
    customizable: true,
    quantity: pieces,
  },
  {
    id: "toppers-tematicos-01",
    slug: "toppers-tematicos-01",
    category: "cumpleanos-tematicos",
    audience: "nino",
    visibleName: "Toppers temáticos Picachu",
    seoName: "Toppers temáticos",
    description:
      "Toppers con la temática del cumpleaños y el nombre del festejado, para tortas y mesa dulce.",
    image: photo("toppers-tematicos-01", "Toppers temáticos para cumpleaños"),
    customizable: true,
    quantity: pieces,
  },
  {
    id: "souvenir-comunion-01",
    slug: "souvenir-comunion-01",
    category: "comuniones",
    audience: "nina",
    visibleName: "Jaboncitos Souvenir Personalizados",
    seoName: "Souvenir personalizado para comunión",
    description:
      "Souvenir para comuniones con etiqueta personalizada, nombre y fecha, listo para regalar.",
    image: photo(
      "souvenir-comunion-01",
      "Souvenir de comunión con etiqueta personalizada",
    ),
    customizable: true,
    quantity: pieces,
  },
  {
    id: "stickers-baby-shower-01",
    slug: "stickers-baby-shower-01",
    category: "baby-shower",
    audience: "nino",
    visibleName: "Stickers Baby Shower",
    seoName: "Stickers personalizados para baby shower",
    description:
      "Stickers redondos personalizados con nombre y temática para decorar los detalles del baby shower.",
    image: photo(
      "stickers-baby-shower-01",
      "Sticker personalizado de baby shower",
    ),
    customizable: true,
    quantity: pieces,
  },
  {
    id: "souvenirs-tematicos-01",
    slug: "souvenirs-tematicos-01",
    category: "cumpleanos-tematicos",
    audience: "nino",
    visibleName: "Souvenirs temático Spider man",
    seoName: "Souvenirs temáticos de cumpleaños",
    description:
      "Souvenirs de cumpleaños con la temática elegida y el nombre del festejado.",
    image: photo("souvenirs-tematicos-01", "Souvenirs temáticos de cumpleaños"),
    customizable: true,
    quantity: pieces,
  },
  {
    id: "estampitas-confirmacion-01",
    slug: "estampitas-confirmacion-01",
    category: "comuniones",
    audience: "nina",
    visibleName: "Velitas y Estampitas para Confirmación",
    seoName: "Estampitas personalizadas",
    description:
      "Estampitas personalizadas con nombre, frase y fecha, para comuniones y confirmaciones.",
    image: photo(
      "estampitas-confirmacion-01",
      "Estampitas personalizadas para confirmación",
    ),
    customizable: true,
    quantity: pieces,
  },
  {
    id: "toppers-tortas-01",
    slug: "toppers-tortas-01",
    category: "cumpleanos-tematicos",
    audience: "nino",
    visibleName: "Toppers para tortas ToyStory",
    seoName: "Toppers para tortas",
    description:
      "Topper de torta con el nombre y la edad del festejado, en la temática que elijas.",
    image: photo(
      "toppers-tortas-01",
      "Topper de torta temático con nombre y edad",
    ),
    customizable: true,
    quantity: pieces,
  },
  {
    id: "antifaces-tematicos-01",
    slug: "antifaces-tematicos-01",
    category: "cumpleanos-tematicos",
    audience: "unisex",
    visibleName: "Antifaces temáticas",
    seoName: "Antifaces temáticos",
    description:
      "Antifaces con la temática del cumpleaños, ideales como props para fotos y juegos.",
    image: photo(
      "antifaces-tematicos-01",
      "Antifaces temáticos para cumpleaños",
    ),
    customizable: true,
    quantity: pieces,
  },
  {
    id: "pochocleras-tematicas-01",
    slug: "pochocleras-tematicas-01",
    category: "cumpleanos-tematicos",
    audience: "nino",
    visibleName: "Pochocleras temáticas",
    seoName: "Pochocleras temáticas",
    description:
      "Pochocleras con diseño temático y el nombre del festejado, para servir golosinas.",
    image: photo("pochocleras-tematicas-01", "Pochocleras con diseño temático"),
    customizable: true,
    quantity: pieces,
  },
  {
    id: "tarjeta-invitacion-comunion-01",
    slug: "tarjeta-invitacion-comunion-01",
    category: "comuniones",
    audience: "nina",
    visibleName: "Tarjeta Invitación Comunión",
    seoName: "Tarjeta de invitación para comunión",
    description:
      "Invitación impresa con diseño floral, personalizada con el nombre, la fecha y los datos de la ceremonia.",
    image: photo(
      "tarjeta-invitacion-comunion-01",
      "Tarjeta de invitación de comunión con diseño floral",
    ),
    customizable: true,
    quantity: pieces,
  },
  {
    id: "centro-de-mesa-02",
    slug: "centro-de-mesa-02",
    category: "cumpleanos-tematicos",
    audience: "nino",
    visibleName: "Centro de Mesa Selección Argentina",
    seoName: "Centro de mesa personalizado",
    description:
      "Centro de mesa con el nombre y el número del festejado, en la temática elegida.",
    image: photo(
      "centro-de-mesa-02",
      "Centro de mesa personalizado con nombre y número",
    ),
    customizable: true,
    quantity: pieces,
  },
] satisfies Product[];
