"use client";

// static export: no image server, so point at the webp variants from scripts/optimize-images.mjs
// keep IMAGE_WIDTHS in sync with that script
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
