import meta from "./image-meta.generated.json";

export type ImageMeta = {
  width: number;
  height: number;
  blur: string;
};

const registry = meta as Record<string, ImageMeta>;

export function getImageMeta(src: string): ImageMeta | undefined {
  return registry[src];
}
