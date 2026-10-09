export type SiteContact = {
  email?: string;
  phoneDisplay?: string;
  whatsapp?: string;
  instagramHandle?: string;
  facebookLabel?: string;
};

export type SiteSocials = Partial<
  Record<"instagram" | "facebook" | "tiktok" | "x", string>
>;

export type BusinessHours = {
  days: string;
  ranges: string[];
};

export type BusinessInfo = {
  legalName?: string;
  address?: string;
  /** sin ciudad, para el footer */
  addressShort?: string;
  area?: string;
  hours: BusinessHours[];
  mapQuery?: string;
};

export type SiteCredit = {
  name: string;
  url?: string;
};

export type SiteConfig = {
  brand: string;
  name: string;
  tagline?: string;
  logo?: {
    src?: string;
    alt: string;
  };
  decor: {
    cardSprig?: string;
  };
  url?: string;
  locale: "es" | "es-AR" | "es-UY" | "es-CL" | "es-MX";
  contact: SiteContact;
  socials: SiteSocials;
  business: BusinessInfo;
  /** si falta, no se muestra la línea */
  credit?: SiteCredit;
};

export type SeoConfig = {
  title: string;
  description: string;
  keywords: string[];
};

export type NavigationItem = { label: string; href: string };

export type LayoutConfig = {
  navigation: NavigationItem[];
  footerNavigation: NavigationItem[];
  cta: { label: string; href: string };
};
