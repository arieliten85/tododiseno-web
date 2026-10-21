"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { getImageMeta } from "@/lib/images/image-meta";

// Imagen que se muestra cuando el archivo del producto no existe todavía.
const FALLBACK_SRC = "/brand/decor/placeholder-product.svg";

type MediaImageProps = Omit<
  ImageProps,
  "src" | "width" | "height" | "placeholder" | "blurDataURL"
> & {
  src: string;
  fill?: boolean;
};

export function MediaImage({
  src: initialSrc,
  fill,
  alt,
  sizes,
  ...props
}: MediaImageProps) {
  const [src, setSrc] = useState(initialSrc);
  useEffect(() => { setSrc(initialSrc); }, [initialSrc]);
  const meta = getImageMeta(src);
  const placeholder = meta
    ? ({ placeholder: "blur", blurDataURL: meta.blur } as const)
    : {};

  const handleError = () => setSrc(FALLBACK_SRC);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        onError={handleError}
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
      onError={handleError}
      {...placeholder}
      {...props}
    />
  );
}
