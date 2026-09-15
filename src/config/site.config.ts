import type { SiteConfig } from "./config.types";
import { siteUrl } from "./url.config";

export const siteConfig: SiteConfig = {
  brand: "Todo Diseño Souvenirs",
  name: "Todo Diseño Souvenirs",
  logo: { alt: "Todo Diseño Souvenirs" },
  locale: "es-AR",
  url: siteUrl,
  contact: {
    phone: "+54 9 11 6145 2420",
  },
  socials: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },
  business: { servesCuisine: "Diseño gráfico y souvenirs personalizados" },
} satisfies SiteConfig;

export const whatsappNumber = "5491161452420";
export const whatsappHref = `https://wa.me/${whatsappNumber}`;
