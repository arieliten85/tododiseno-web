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
  /** Shimmer mientras carga una foto sin blur propio (solo con fill). */
  skeleton?: boolean;
};

export function MediaImage({
  src: initialSrc,
  fill,
  alt,
  sizes,
  skeleton,
  className,
  onLoad,
  ...props
}: MediaImageProps) {
  const [src, setSrc] = useState(initialSrc);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setSrc(initialSrc);
    setLoaded(false);
  }, [initialSrc]);
  const meta = getImageMeta(src);
  const placeholder = meta
    ? ({ placeholder: "blur", blurDataURL: meta.blur } as const)
    : {};

  const handleError = () => setSrc(FALLBACK_SRC);

  if (fill) {
    const showSkeleton = skeleton && !meta;
    const image = (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        onError={handleError}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        className={
          showSkeleton
            ? `${className ?? ""} ${loaded ? "image-fade-in" : "opacity-0"}`
            : className
        }
        {...placeholder}
        {...props}
      />
    );
    if (!showSkeleton) return image;

    return (
      <>
        {loaded ? null : (
          <span aria-hidden="true" className="image-skeleton absolute inset-0" />
        )}
        {image}
      </>
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
      onLoad={onLoad}
      className={className}
      {...placeholder}
      {...props}
    />
  );
}
