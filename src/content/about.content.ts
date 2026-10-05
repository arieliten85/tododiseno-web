import type { AboutContent } from "./content.types";

export const aboutContent = {
  breadcrumb: "Sobre mí",
  eyebrow: "EL LOCAL DE FLORENCIA",
  title: "Detrás de cada souvenir",
  tagline: "El valor de lo hecho con el corazón",
  intro: {
    before: "Soy",
    name: "Florencia",
    after:
      "y desde mi local en Lanús Oeste diseño e imprimo souvenirs, deco e impresos para los momentos que las familias quieren recordar. Cada pedido se piensa desde cero: el nombre, la temática, los colores y cada detalle se ajustan a lo que estás imaginando.",
  },
  commitment: {
    title: "Mi compromiso con tu recuerdo",
    items: [
      { icon: "design", text: "Diseño personalizado y cercano." },
      {
        icon: "finish",
        text: "Cuidado por los acabados, corte e impresión de alta calidad.",
      },
      {
        icon: "chat",
        text: "Comunicación directa de persona a persona para cada detalle.",
      },
    ],
  },
  image: {
    src: "/brand/about/florencia-en-el-local.jpg",
    alt: "Interior del local con estantes de souvenirs y decoraciones",
  },
} satisfies AboutContent;
