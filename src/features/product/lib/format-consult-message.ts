type ConsultMessageInput = {
  name: string;
  quantity: number;
  unit: string;
  url?: string;
};

/** Mensaje de WhatsApp autocompletado desde la página de producto. */
export function formatConsultMessage({
  name,
  quantity,
  unit,
  url,
}: ConsultMessageInput) {
  return [
    "Hola Florencia! Vi este producto en tu web:",
    `🛍️ ${name}`,
    `🔢 Cantidad: ${quantity} ${unit}`,
    ...(url ? [`🔗 ${url}`] : []),
    "Quiero coordinar los detalles (color, temática, personalización), ¿me pasás precio y tiempos de entrega? ¡Gracias!",
  ].join("\n");
}
