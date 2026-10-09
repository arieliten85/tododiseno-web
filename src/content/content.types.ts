export type LinkContent = {
  label: string;
  href: string;
};

export type ImageContent = {
  src: string;
  alt: string;
};

export type PageMetadata = {
  title: string;
  description: string;
};

export type SocialLabels = {
  whatsapp: string;
  instagram: string;
  facebook: string;
};

export type HeaderContent = {
  homeLink: string;
  mainNav: string;
  mobileNav: string;
  openMenu: string;
  closeMenu: string;
  newTab: string;
  socialLabels: SocialLabels;
};

export type SharedContent = {
  newTab: string;
  skipToContent: string;
  rangeSeparator: string;
  socialLabels: SocialLabels;
  breadcrumb: { label: string; home: string };
  header: HeaderContent;
  whatsappFloat: { label: string; message: string };
};

export type NotFoundContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: LinkContent;
  secondaryAction: LinkContent;
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
  size?: string;
  note?: string;
};

export type Product = {
  id: string;
  /** es la URL pública, sin personajes con licencia */
  slug: string;
  category: CategoryId;
  audience: AudienceId;
  visibleName: string;
  seoName: string;
  description: string;
  image: ImageContent;
  gallery?: ImageContent[];
  /** 2+ = "Qué incluye", 1 = "Detalle" */
  detailItems?: DetailItem[];
  customizable: boolean;
  quantity: {
    unit: string;
    min: number;
    step: number;
  };
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
  categories: SectionIntro & { cardEyebrow: string };
  featured: SectionIntro & { cardAction: string };
  values: Array<TextCard & { icon: "design" | "chat" | "pin" }>;
  testimonials: SectionIntro & {
    items: Array<{ id: string; image: ImageContent }>;
    slider: {
      region: string;
      previous: string;
      next: string;
      goTo: string;
      slide: string;
    };
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
  metadata: PageMetadata;
  breadcrumb: string;
  cardAction: string;
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
    applyIdle: string;
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
  gallery: {
    open: string;
    dialog: string;
    close: string;
    previous: string;
    next: string;
    counter: string;
  };
  customizableNote: { label: string; text: string };
  consult: {
    title: string;
    hint: string;
    badge: string;
    quantityLabel: string;
    minimum: string;
    decrease: string;
    increase: string;
    action: string;
    newTab: string;
    message: { intro: string; quantity: string; closing: string };
  };
  details: {
    listTitle: string;
    textTitle: string;
    description: string;
    unitOne: string;
    unitMany: string;
  };
  related: SectionIntro & { action: string };
};

export type AboutContent = {
  metadata: PageMetadata;
  breadcrumb: string;
  eyebrow: string;
  title: string;
  tagline: string;
  intro: { before: string; name: string; after: string };
  commitment: {
    title: string;
    items: Array<{ icon: "design" | "finish" | "chat"; text: string }>;
  };
  image: ImageContent;
};

export type ContactContent = {
  metadata: PageMetadata;
  breadcrumb: string;
  eyebrow: string;
  title: string;
  description: string;
  card: {
    eyebrow: string;
    title: string;
    action: { label: string; message: string };
    reassurance: string;
    labels: SocialLabels & {
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
  newTab: string;
  rangeSeparator: string;
};

export type FooterContent = {
  navigationLabel: string;
  navigationTitle: string;
  contactTitle: string;
  socialTitle: string;
  hoursLabel: string;
  legal: string;
  disclaimer: string;
  credit: string;
  newTab: string;
  rangeSeparator: string;
  socialLabels: SocialLabels;
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
