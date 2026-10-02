"use client";

/**
 * Loader de next/image para exportación estática: no hay servidor que
 * redimensione, así que se sirven las variantes WebP que genera en build
 * scripts/optimize-images.mjs (/public/brand/x/y.jpg -> /_img/x/y-<ancho>.webp).
 * Mantener IMAGE_WIDTHS sincronizado con ese script. Lo que no vive en
 * /brand (por ejemplo un SVG) se devuelve tal cual.
 */
const IMAGE_WIDTHS = [320, 480, 640, 960, 1280, 1600, 2000];

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}): string {
  if (!src.startsWith("/brand/") || src.endsWith(".svg")) return src;
  const stem = src.replace(/^\/brand\//, "").replace(/\.[^./]+$/, "");
  const variant =
    IMAGE_WIDTHS.find((candidate) => candidate >= width) ??
    IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
  return `/_img/${stem}-${variant}.webp`;
}
