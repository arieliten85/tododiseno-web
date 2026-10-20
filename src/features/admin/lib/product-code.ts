// Código visible del producto: Florencia nombra con él la carpeta de Drive.
export function productCode(id: string): string {
  return `producto_${id.slice(0, 8)}`;
}
