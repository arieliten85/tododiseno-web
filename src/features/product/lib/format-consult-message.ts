type ConsultMessageInput = {
  name: string;
  quantity: number;
  unit: string;
  url?: string;
  /** Textos del mensaje; la estructura y los emojis quedan acá. */
  copy: { intro: string; quantity: string; closing: string };
};

/** Mensaje de WhatsApp autocompletado desde la página de producto. */
export function formatConsultMessage({
  name,
  quantity,
  unit,
  url,
  copy,
}: ConsultMessageInput) {
  return [
    copy.intro,
    `🛍️ ${name}`,
    `🔢 ${copy.quantity}: ${quantity} ${unit}`,
    ...(url ? [`🔗 ${url}`] : []),
    copy.closing,
  ].join("\n");
}
