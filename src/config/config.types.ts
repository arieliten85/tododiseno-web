export type SiteContact = {
  email?: string;
  /** Número para mostrar, tal como se lee en pantalla. */
  phoneDisplay?: string;
  /** Número internacional sin signos, para enlaces wa.me. */
  whatsapp?: string;
  /** Usuario de Instagram para mostrar, con arroba. */
  instagramHandle?: string;
  /** Nombre de la página de Facebook para mostrar. */
  facebookLabel?: string;
};

export type SiteSocials = Partial<
  Record<"instagram" | "facebook" | "tiktok" | "x", string>
>;

export type BusinessHours = {
  /** Etiqueta del tramo, por ejemplo "Lun a jue". */
  days: string;
  /** Franjas horarias del tramo, por ejemplo "10:00 a 12:00". */
  ranges: string[];
};

export type BusinessInfo = {
  legalName?: string;
  address?: string;
  /** Zona usada en textos cortos, por ejemplo "Lanús Oeste". */
  area?: string;
  hours: BusinessHours[];
  mapQuery?: string;
};

export type SiteConfig = {
  brand: string;
  name: string;
  logo?: {
    src?: string;
    alt: string;
  };
  url?: string;
  locale: "es" | "es-AR" | "es-UY" | "es-CL" | "es-MX";
  contact: SiteContact;
  socials: SiteSocials;
  business: BusinessInfo;
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
