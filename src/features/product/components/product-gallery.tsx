"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/class-names";

type GallerySlide = {
  id: string;
  alt: string;
  /** Imagen grande ya renderizada en el servidor. */
  main: ReactNode;
  /** Miniatura ya renderizada en el servidor. */
  thumb: ReactNode;
};

/** Galería: foto principal y miniaturas. Las imágenes llegan prerenderizadas. */
export function ProductGallery({
  slides,
  label,
}: {
  slides: GallerySlide[];
  label: string;
}) {
  const [active, setActive] = useState(0);
  const current = slides[active] ?? slides[0];

  return (
    <div className="space-y-4" role="group" aria-label={label}>
      <div className="bg-surface border-border rounded-card relative aspect-[4/3] overflow-hidden border shadow-sm">
        {current?.main}
      </div>
      {slides.length > 1 ? (
        <ul className="grid grid-cols-4 gap-3">
          {slides.map((slide, index) => (
            <li key={slide.id}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={slide.alt}
                aria-pressed={index === active}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-xl border-2 transition-colors",
                  index === active
                    ? "border-accent-strong"
                    : "hover:border-accent border-transparent",
                )}
              >
                {slide.thumb}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
