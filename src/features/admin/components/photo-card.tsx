import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  onRemove: () => void;
};

export function PhotoCard({ src, alt, onRemove }: Props) {
  return (
    <li className="relative">
      <Image
        src={src}
        alt={alt}
        width={160}
        height={160}
        unoptimized
        className="aspect-square w-full rounded-md object-cover"
      />
      <button
        type="button"
        aria-label="Quitar foto"
        onClick={onRemove}
        className="absolute top-1 right-1 flex size-8 items-center justify-center rounded-full bg-white/90 text-sm shadow"
      >
        ✕
      </button>
    </li>
  );
}
