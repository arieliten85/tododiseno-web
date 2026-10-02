import type { ProductPageContent } from "./content.types";

export const productPageContent = {
  share: { label: "Compartir producto", copied: "Enlace copiado" },
  customizableNote: {
    label: "Producto personalizable",
    text: "Color, tamaño, texto y temática se coordinan a tu gusto por WhatsApp.",
  },
  consult: {
    title: "Consultá este producto",
    hint: "Seleccioná cantidad estimada",
    badge: "Respuesta rápida",
    quantityLabel: "Cantidad",
    action: "Consultar por WhatsApp",
  },
  details: {
    listTitle: "Qué incluye",
    textTitle: "Detalle",
    description:
      "Detalle completo de cada uno de los elementos listos para armar tu celebración.",
  },
  related: {
    title: "También te puede interesar",
    description:
      "Otras ideas y detalles personalizados para combinar en tu festejo.",
    action: "Ver detalles",
  },
} satisfies ProductPageContent;
