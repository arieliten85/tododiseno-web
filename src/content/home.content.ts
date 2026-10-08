import type { HomeContent } from "./content.types";

export const homeContent = {
  hero: {
    eyebrow: "DETALLES PARA MOMENTOS ESPECIALES",
    title: "Cada detalle, pensado para tu celebración",
    description:
      "Souvenirs, deco e impresos personalizados para comuniones, cumpleaños infantiles, bautismos y baby showers. Diseños hechos a medida en Lanús, con impresión de alta calidad.",
    action: { label: "Ver catálogo", href: "/catalogo" },
    image: {
      src: "/brand/hero/mesa-de-souvenirs.jpg",
      alt: "Mesa con cajitas y souvenirs personalizados en tonos rosados",
    },
  },
  categories: {
    eyebrow: "TEMÁTICAS ESPECIALES",
    title: "Encontrá lo que buscás",
    description:
      "Diseñamos piezas adaptadas al estilo y la atmósfera de cada ocasión.",
    cardEyebrow: "Catálogo",
  },
  featured: {
    eyebrow: "LOS MÁS ELEGIDOS",
    title: "Trabajos recientes",
    description: "Algunos de los pedidos que salieron del local últimamente.",
    cardAction: "Ver detalles",
  },
  values: [
    {
      icon: "design",
      title: "Diseños personalizados",
      description:
        "Cada pieza se adapta al nombre, la temática y los colores de tu evento.",
    },
    {
      icon: "chat",
      title: "Atención por WhatsApp",
      description:
        "Te acompañamos en todo el proceso, desde la idea hasta la entrega.",
    },
    {
      icon: "pin",
      title: "Retiro en Lanús o envío",
      description:
        "Retirás sin costo en el local, o enviamos por encomienda a todo el país.",
    },
  ],
  testimonials: {
    eyebrow: "EXPERIENCIAS REALES",
    title: "Lo que dicen nuestras clientas",
    description:
      "La mayor satisfacción es acompañar momentos que quedan en la memoria para siempre.",
    items: [
      {
        id: "testimonio-01",
        image: {
          src: "/brand/testimonials/testimonio-01.jpg",
          alt: "Captura de WhatsApp: una clienta celebra con entusiasmo la agenda personalizada y las frases de cada mesa",
        },
      },
      {
        id: "testimonio-02",
        image: {
          src: "/brand/testimonials/testimonio-02.jpg",
          alt: "Captura de WhatsApp: una clienta responde con alegría al ver su pedido terminado",
        },
      },
      {
        id: "testimonio-03",
        image: {
          src: "/brand/testimonials/testimonio-03.jpg",
          alt: "Captura de Instagram: una clienta cuenta que entregó los cuadros y que la emocionaron",
        },
      },
    ],
  },
  cta: {
    eyebrow: "PEDIDOS PERSONALIZADOS",
    title: "¿Tenés una idea en mente?",
    description: "Contanos cómo te imaginás tu evento y lo armamos juntos.",
    chips: ["Asesoramiento personalizado", "Boceto y coordinación previa"],
    action: {
      label: "Escribinos por WhatsApp",
      message:
        "Hola Florencia! Estoy preparando un evento y quiero consultarte por una idea.",
    },
    secondaryAction: { label: "Ver catálogo", href: "/catalogo" },
    reassurance: "Respondemos por WhatsApp en el día.",
    badge: "Local en Lanús Oeste",
    image: {
      src: "/brand/about/florencia-en-el-local.jpg",
      alt: "Estantes del local con souvenirs, cajitas y decoraciones armadas",
    },
  },
} satisfies HomeContent;
