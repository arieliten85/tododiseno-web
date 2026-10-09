import type { SharedContent, SocialLabels } from "./content.types";

const newTab = "(se abre en una pestaña nueva)";

const socialLabels = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  facebook: "Facebook",
} satisfies SocialLabels;

export const sharedContent = {
  newTab,
  skipToContent: "Saltar al contenido",
  rangeSeparator: " y ",
  socialLabels,
  breadcrumb: { label: "Ruta de navegación", home: "Inicio" },
  header: {
    homeLink: "ir al inicio",
    mainNav: "Principal",
    mobileNav: "Principal móvil",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    newTab,
    socialLabels,
  },
  whatsappFloat: {
    label: "Escribinos por WhatsApp",
    message: "Hola Florencia! Quiero hacerte una consulta.",
  },
} satisfies SharedContent;
