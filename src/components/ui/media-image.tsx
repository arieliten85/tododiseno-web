import Image, { type ImageProps } from "next/image";
import { getImageMeta } from "@/lib/images/image-meta";

type MediaImageProps = Omit<
  ImageProps,
  "src" | "width" | "height" | "placeholder" | "blurDataURL"
> & {
  src: string;
  fill?: boolean;
};

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
