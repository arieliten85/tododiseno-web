import type { CatalogPageContent } from "./content.types";

export const catalogPageContent = {
  breadcrumb: "Catálogo",
  eyebrow: "CATÁLOGO · TODO DISEÑO",
  title: "Souvenirs y detalles personalizados para momentos especiales",
  description:
    "Diseñamos y creamos piezas personalizadas para acompañar cada celebración con identidad y estilo. Encontrá propuestas para comuniones, bautismos, cumpleaños temáticos, baby showers y Navidad, realizadas a pedido y adaptadas a cada ocasión.",
  filters: {
    title: "Filtrar por",
    clear: "Limpiar",
    occasion: "Ocasión",
    audience: "Destinatario",
    note: {
      title: "Personalización",
      description:
        "¿Buscás una temática especial? Todos los modelos se adaptan a tu festejo.",
    },
  },
  results: {
    countOne: "1 producto encontrado",
    countMany: "productos encontrados",
    removeFilter: "Quitar filtro",
    sortLabel: "Ordenar por:",
    sortOptions: [
      { id: "relevance", label: "Relevancia" },
      { id: "name", label: "Nombre (A-Z)" },
    ],
    activeFilters: "Filtros activos:",
    clearFilters: "Limpiar filtros",
    empty: {
      title: "No encontramos productos con esos filtros",
      description:
        "Probá con otra ocasión o escribinos: también armamos propuestas a medida.",
    },
  },
  search: {
    label: "Buscar en el catálogo",
    placeholder: "Buscar por nombre…",
  },
  pagination: { label: "Paginación", page: "Página", next: "Siguiente" },
  cta: {
    eyebrow: "CONVERSACIÓN PERSONALIZADA",
    title: "¿Tenés una fecha especial en mente?",
    description:
      "Contame qué evento estás preparando, tus colores favoritos o el estilo que soñás. Lo charlamos sin compromiso y pensamos los recuerdos juntas.",
    action: {
      label: "Escribirme por WhatsApp",
      message:
        "Hola Florencia! Vi tu catálogo y quiero consultarte por un evento que estoy preparando.",
    },
    secondaryAction: { label: "Ver catálogo de ideas", href: "/catalogo" },
    reassurance: "Atención personalizada y propuestas pensadas a tu medida.",
    image: {
      src: "/brand/about/mesa-de-cumpleanos.jpg",
      alt: "Mesa de cumpleaños temática con banderines y rosetas de colores",
    },
  },
} satisfies CatalogPageContent;
