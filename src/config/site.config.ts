import type { SiteConfig } from "./config.types";
import { siteUrl } from "./url.config";

export const siteConfig = {
  brand: "Todo Diseño",
  name: "Todo Diseño Souvenirs",
  logo: {
    alt: "Todo Diseño Souvenirs",
  },
  locale: "es-AR",
  url: siteUrl,
  contact: {
    email: "tododiseno2014@gmail.com",
    phoneDisplay: "11-6145-2420",
    whatsapp: "5491161452420",
    instagramHandle: "@tododisenosouvenir",
  },
  socials: {
    instagram: "https://www.instagram.com/tododisenosouvenir/",
  },
  business: {
    address: "25 de Mayo 445, Lanús Oeste, Buenos Aires",
    area: "Lanús Oeste",
    mapQuery: "25 de Mayo 445, Lanús Oeste, Buenos Aires",
    hours: [
      { days: "Lun a jue", ranges: ["10:00 a 12:00", "17:00 a 19:00"] },
      { days: "Vie", ranges: ["11:00 a 13:00", "17:00 a 19:00"] },
      { days: "Sáb", ranges: ["11:00 a 13:00"] },
    ],
  },
} satisfies SiteConfig;
