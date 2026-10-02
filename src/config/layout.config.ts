import type { LayoutConfig } from "./config.types";

export const layoutConfig = {
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
    { label: "Sobre mí", href: "/sobre-mi" },
    { label: "Contacto", href: "/contacto" },
  ],
  footerNavigation: [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
    { label: "Sobre mí", href: "/sobre-mi" },
    { label: "Contacto", href: "/contacto" },
  ],
  cta: { label: "Ver catálogo", href: "/catalogo" },
} satisfies LayoutConfig;
