import type { FooterContent } from "./content.types";
import { sharedContent } from "./shared.content";

export const footerContent = {
  navigationLabel: "Navegación del pie",
  navigationTitle: "NAVEGACIÓN",
  contactTitle: "CONTACTO & LOCAL",
  socialTitle: "NUESTRAS REDES",
  hoursLabel: "Horarios de atención:",
  legal: "Todos los derechos reservados.",
  credit: "Diseño y desarrollo web por",
  newTab: sharedContent.newTab,
  rangeSeparator: sharedContent.rangeSeparator,
  socialLabels: sharedContent.socialLabels,
  disclaimer:
    "Los diseños temáticos son creaciones personalizadas bajo pedido. Los personajes y marcas mencionados pertenecen a sus respectivos titulares; este sitio no está afiliado a ellos.",
} satisfies FooterContent;
