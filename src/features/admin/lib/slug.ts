// El sufijo (últimos 4 del UUID) evita choques entre nombres iguales.
export function generateSlug(visibleName: string, id: string): string {
  const base = visibleName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `${base}-${id.slice(-4)}`;
}
