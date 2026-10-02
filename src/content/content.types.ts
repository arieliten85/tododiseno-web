export type LinkContent = {
  label: string;
  href: string;
};

export type ImageContent = {
  /** Ruta pública bajo /brand, por ejemplo /brand/hero/mesa.jpg */
  src: string;
  alt: string;
};

export type TextCard = {
  title: string;
  description: string;
};

export type SectionIntro = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export type CategoryId =
  | "comuniones"
  | "cumpleanos-tematicos"
  | "baby-shower"
  | "bautismo"
  | "navidad"
  | "otros-eventos";

export type AudienceId = "nina" | "nino" | "unisex";

export type Category = {
  id: CategoryId;
  label: string;
  description: string;
  image: ImageContent;
};

export type Audience = {
  id: AudienceId;
  label: string;
};

export type DetailItem = {
  item: string;
  quantity: number;
  /** Medida concreta, solo si aplica. */
  size?: string;
  /** Aclaración corta, solo si aplica. */
  note?: string;
};

export type Product = {
  id: string;
  /**
   * Slug genérico y sin nombres de personajes con licencia: es la URL pública.
   * Ejemplo: "kit-tematico-cumpleanos-01".
   */
  slug: string;
  category: CategoryId;
  audience: AudienceId;
  /** Nombre que ve la clienta en pantalla (puede incluir el personaje). */
  visibleName: string;
  /** Nombre genérico para <title>, <h1> real y SEO. */
  seoName: string;
  description: string;
  image: ImageContent;
  gallery?: ImageContent[];
  /** 2+ ítems = lista "Qué incluye"; 1 ítem = párrafo "Detalle". Opcional. */
  detailItems?: DetailItem[];
  customizable: boolean;
  quantity: {
    unit: string;
    min: number;
    step: number;
  };
  /** Aparece en "Trabajos recientes" del inicio. */
  featured?: boolean;
};

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    action: LinkContent;
    image: ImageContent;
  };
  categories: SectionIntro;
  featured: SectionIntro & { cardAction: string };
  values: Array<TextCard & { icon: "design" | "chat" | "pin" }>;
  testimonials: SectionIntro & {
    items: Array<{ id: string; image: ImageContent }>;
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    chips: string[];
    action: { label: string; message: string };
    secondaryAction: LinkContent;
    reassurance: string;
    badge: string;
    image: ImageContent;
  };
};

export type CatalogPageContent = {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  description: string;
  filters: {
    title: string;
    clear: string;
    close: string;
    applyOne: string;
    applyMany: string;
    applyNone: string;
    occasion: string;
    allOccasions: string;
    allAudiences: string;
    audience: string;
    note: { title: string; description: string };
  };
  results: {
    countOne: string;
    countMany: string;
    removeFilter: string;
    sortLabel: string;
    sortOptions: Array<{ id: "relevance" | "name"; label: string }>;
    activeFilters: string;
    clearFilters: string;
    empty: { title: string; description: string };
  };
  search: { label: string };
  pagination: { label: string; page: string; next: string };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    action: { label: string; message: string };
    secondaryAction: LinkContent;
    reassurance: string;
    image: ImageContent;
  };
};

export type ProductPageContent = {
  share: { label: string; copied: string };
  customizableNote: { label: string; text: string };
  consult: {
    title: string;
    hint: string;
    badge: string;
    quantityLabel: string;
    action: string;
  };
  details: {
    listTitle: string;
    textTitle: string;
    description: string;
  };
  related: SectionIntro & { action: string };
};

export type AboutContent = {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: ImageContent;
  action: { label: string; message: string };
};

export type ContactContent = {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  description: string;
  card: {
    eyebrow: string;
    title: string;
    action: { label: string; message: string };
    reassurance: string;
    labels: {
      whatsapp: string;
      instagram: string;
      email: string;
      address: string;
      hours: string;
    };
  };
  map: {
    title: string;
    note: string;
    directions: string;
  };
  info: Array<TextCard & { icon: "pickup" | "shipping" }>;
};

export type FooterContent = {
  navigationTitle: string;
  contactTitle: string;
  socialTitle: string;
  hoursLabel: string;
  legal: string;
  disclaimer: string;
};

export type SearchContent = {
  trigger: string;
  title: string;
  placeholder: string;
  close: string;
  closeShort: string;
  clear: string;
  submit: string;
  categoriesTitle: string;
  productsTitle: string;
  viewAll: string;
  viewCatalog: string;
  empty: string;
  resultsOne: string;
  resultsMany: string;
  hint: string;
};
