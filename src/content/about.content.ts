import type { AboutContent } from "./content.types";

export const aboutContent = {
  breadcrumb: "Sobre mí",
  eyebrow: "EL LOCAL DE FLORENCIA",
  title: "Detrás de cada souvenir",
  paragraphs: [
    "Soy Florencia y desde mi local en Lanús Oeste diseño e imprimo souvenirs, deco e impresos para los momentos que las familias quieren recordar.",
    "Cada pedido se piensa desde cero: el nombre, la temática, los colores y cada detalle se ajustan a lo que estás imaginando.",
  ],
  image: {
    src: "/brand/about/florencia-en-el-local.jpg",
    alt: "Interior del local con estantes de souvenirs y decoraciones",
  },
  action: {
    label: "Escribime por WhatsApp",
    message: "Hola Florencia! Quiero consultarte por un pedido personalizado.",
  },
} satisfies AboutContent;
