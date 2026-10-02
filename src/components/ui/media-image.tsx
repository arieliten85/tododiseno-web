import Image, { type ImageProps } from "next/image";
import { getImageMeta } from "@/lib/images/image-meta";

type MediaImageProps = Omit<
  ImageProps,
  "src" | "width" | "height" | "placeholder" | "blurDataURL"
> & {
  /** Ruta pública de la imagen original, por ejemplo /brand/hero/mesa.jpg */
  src: string;
  /** Con `fill` el contenedor define el tamaño; sin `fill` se usan las medidas reales. */
  fill?: boolean;
};

/**
 * Envuelve next/image con las medidas reales y el placeholder borroso que
 * calcula scripts/optimize-images.mjs. Server Component: el registro de
 * metadatos nunca viaja al navegador.
 */
export function MediaImage({
  src,
  fill,
  alt,
  sizes,
  ...props
}: MediaImageProps) {
  const meta = getImageMeta(src);
  const placeholder = meta
    ? ({ placeholder: "blur", blurDataURL: meta.blur } as const)
    : {};

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        {...placeholder}
        {...props}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={meta?.width ?? 1200}
      height={meta?.height ?? 900}
      sizes={sizes}
      {...placeholder}
      {...props}
    />
  );
}
