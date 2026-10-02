import type { ContactContent } from "./content.types";

export const contactContent = {
  breadcrumb: "Contacto",
  eyebrow: "ESTAMOS EN LANÚS OESTE",
  title: "Hablemos de tu evento",
  description:
    "Queremos acompañarte a crear los recuerdos más lindos para tu celebración. Escribinos o coordiná tu visita al local.",
  card: {
    eyebrow: "ATENCIÓN Y PEDIDOS",
    title: "Datos del local",
    action: {
      label: "Escribinos a WhatsApp",
      message: "Hola Florencia! Quiero consultarte por un evento.",
    },
    reassurance: "Respuesta personalizada y asesoramiento en el día",
    labels: {
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      email: "Mail",
      address: "Dirección",
      hours: "Horarios de atención",
    },
  },
  map: {
    title: "Mapa del local en Lanús Oeste",
    note: "Lanús Oeste, Buenos Aires",
    directions: "Cómo llegar",
  },
  info: [
    {
      icon: "pickup",
      title: "Retiro en el local",
      description:
        "Sin cargo adicional. Podés retirar tu pedido personalmente en Lanús Oeste una vez que te confirmemos que está listo.",
    },
    {
      icon: "shipping",
      title: "Envíos a todo el país",
      description:
        "Embalaje reforzado. Enviamos por encomienda, correo o moto. Consultanos.",
    },
  ],
} satisfies ContactContent;
