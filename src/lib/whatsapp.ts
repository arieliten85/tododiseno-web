/** Arma un enlace wa.me con el mensaje ya escrito. */
export function createWhatsAppUrl(phone: string | undefined, message: string) {
  const base = phone ? `https://wa.me/${phone}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(message)}`;
}
