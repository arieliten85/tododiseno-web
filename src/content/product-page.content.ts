import type { ProductPageContent } from "./content.types";
import { sharedContent } from "./shared.content";

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
    minimum: "Cantidad mínima sugerida: {min} {unit}",
    decrease: "Menos",
    increase: "Más",
    action: "Consultar por WhatsApp",
    newTab: sharedContent.newTab,
    message: {
      intro: "Hola Florencia! Vi este producto en tu web:",
      quantity: "Cantidad",
      closing:
        "Quiero coordinar los detalles (color, temática, personalización), ¿me pasás precio y tiempos de entrega? ¡Gracias!",
    },
  },
  details: {
    listTitle: "Qué incluye",
    textTitle: "Detalle",
    description:
      "Detalle completo de cada uno de los elementos listos para armar tu celebración.",
    unitOne: "1 unidad",
    unitMany: "{n} unidades",
  },
  related: {
    title: "También te puede interesar",
    description:
      "Otras ideas y detalles personalizados para combinar en tu festejo.",
    action: "Ver detalles",
  },
} satisfies ProductPageContent;
