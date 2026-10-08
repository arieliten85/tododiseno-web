"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRightIcon, CloseIcon, ZoomInIcon } from "@/components/ui/icons";
import { cn } from "@/lib/class-names";

type GallerySlide = {
  id: string;
  alt: string;
  /** Imagen grande ya renderizada en el servidor. */
  main: ReactNode;
  /** Miniatura ya renderizada en el servidor. */
  thumb: ReactNode;
  /** Imagen para la vista ampliada, ya renderizada en el servidor. */
  zoom: ReactNode;
};

type GalleryLabels = {
  open: string;
  dialog: string;
  close: string;
  previous: string;
  next: string;
  /** Plantilla con {current} y {total}. */
  counter: string;
};

const roundButton =
  "bg-surface/90 text-foreground hover:bg-surface inline-flex size-11 items-center justify-center rounded-full shadow-md transition-colors";

/**
 * Galería: foto principal, miniaturas y vista ampliada. La ampliación usa un
 * <dialog> nativo (modal): Escape, foco atrapado, fondo inerte y retorno del
 * foco al botón de origen los resuelve el navegador. Flechas del teclado y
 * botones recorren las imágenes. Las imágenes llegan prerenderizadas.
 */
export function ProductGallery({
  slides,
  label,
  labels,
}: {
  slides: GallerySlide[];
  label: string;
  labels: GalleryLabels;
}) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const current = slides[active] ?? slides[0];
  const multiple = slides.length > 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const step = (direction: 1 | -1) =>
    setActive((index) => (index + direction + slides.length) % slides.length);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (!multiple) return;
    if (event.key === "ArrowRight") step(1);
    else if (event.key === "ArrowLeft") step(-1);
  };

  const counter = labels.counter
    .replace("{current}", String(active + 1))
    .replace("{total}", String(slides.length));

  return (
    <div className="space-y-4" role="group" aria-label={label}>
      <div className="bg-surface border-border rounded-card relative aspect-[4/3] overflow-hidden border shadow-sm">
        {current?.main}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-label={`${labels.open}: ${current?.alt ?? label}`}
          className="group absolute inset-0 cursor-zoom-in focus-visible:outline-offset-[-6px]"
        >
          <span
            aria-hidden="true"
            className="bg-surface/90 text-foreground absolute right-3 bottom-3 inline-flex size-10 items-center justify-center rounded-full shadow-md transition-transform group-hover:scale-105"
          >
            <ZoomInIcon className="size-5" />
          </span>
        </button>
      </div>
      {multiple ? (
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

      <dialog
        ref={dialogRef}
        aria-label={labels.dialog}
        onClose={() => setOpen(false)}
        onKeyDown={onKeyDown}
        onClick={(event) => {
          // Un clic fuera de la imagen y de los botones cierra la vista.
          if (event.target === event.currentTarget) setOpen(false);
        }}
        className="bg-overlay/95 m-0 hidden h-dvh max-h-none w-dvw max-w-none flex-col overscroll-contain p-0 pb-4 backdrop:bg-transparent open:flex sm:pb-6"
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <p
            aria-live="polite"
            className="text-surface text-sm font-semibold tracking-wide"
          >
            {counter}
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={labels.close}
            className={roundButton}
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <div
          className="relative min-h-0 flex-1"
          onClick={(event) => {
            // La imagen ocupa todo el escenario: cualquier clic fuera de los botones cierra.
            if (!(event.target as HTMLElement).closest("button")) {
              setOpen(false);
            }
          }}
        >
          {open ? current?.zoom : null}
          {multiple ? (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={labels.previous}
                className={cn(
                  roundButton,
                  "absolute top-1/2 left-3 -translate-y-1/2 sm:left-6",
                )}
              >
                <ArrowRightIcon className="size-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={labels.next}
                className={cn(
                  roundButton,
                  "absolute top-1/2 right-3 -translate-y-1/2 sm:right-6",
                )}
              >
                <ArrowRightIcon className="size-5" />
              </button>
            </>
          ) : null}
        </div>
      </dialog>
    </div>
  );
}
