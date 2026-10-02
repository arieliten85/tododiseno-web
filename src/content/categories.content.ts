import type { Audience, Category } from "./content.types";

export const categories = [
  {
    id: "comuniones",
    label: "Comuniones",
    description:
      "Estampitas, souvenirs y detalles delicados para un día muy especial.",
    image: {
      src: "/brand/categories/comuniones.jpg",
      alt: "Souvenirs personalizados para comunión",
    },
  },
  {
    id: "cumpleanos-tematicos",
    label: "Cumpleaños Temáticos",
    description:
      "Kits, banderines y deco con la temática favorita del festejado.",
    image: {
      src: "/brand/categories/cumpleanos-tematicos.jpg",
      alt: "Decoración de cumpleaños temático",
    },
  },
  {
    id: "baby-shower",
    label: "Baby Shower",
    description:
      "Cajitas, tags y centros de mesa pensados para recibir al bebé.",
    image: {
      src: "/brand/categories/baby-shower.jpg",
      alt: "Kit de baby shower personalizado",
    },
  },
  {
    id: "bautismo",
    label: "Bautismo",
    description: "Recuerdos e impresos a juego para una celebración cálida.",
    image: {
      src: "/brand/categories/bautismo.jpg",
      alt: "Recuerdos personalizados de bautismo",
    },
  },
  {
    id: "navidad",
    label: "Navidad",
    description:
      "Cartitas a Papá Noel y detalles personalizados para las fiestas.",
    image: {
      src: "/brand/categories/navidad.jpg",
      alt: "Detalles navideños personalizados",
    },
  },
  {
    id: "otros-eventos",
    label: "Otros Eventos",
    description: "¿Tenés otra idea? También armamos una propuesta a tu medida.",
    image: {
      src: "/brand/categories/otros-eventos.jpg",
      alt: "Piezas personalizadas para otros eventos",
    },
  },
] satisfies Category[];

export const audiences = [
  { id: "nina", label: "Niña" },
  { id: "nino", label: "Niño" },
  { id: "unisex", label: "Unisex / Neutro" },
] satisfies Audience[];
