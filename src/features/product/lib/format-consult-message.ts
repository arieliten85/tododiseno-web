type ConsultMessageInput = {
  name: string;
  quantity: number;
  unit: string;
  url?: string;
  copy: { intro: string; quantity: string; closing: string };
};

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
