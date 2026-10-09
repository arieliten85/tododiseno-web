"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/class-names";

/** Píxeles de desplazamiento mínimos para cambiar de estado (evita parpadeos). */
const TOLERANCE = 8;

/**
 * `<header>` que se oculta al bajar y reaparece al subir (patrón "headroom").
 * Siempre visible arriba de todo, con un menú o búsqueda abiertos
 * (`aria-expanded="true"` adentro) y cuando recibe foco de teclado.
 */
export function HideOnScrollHeader({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const header = ref.current;
      if (!header) return;
      const y = Math.max(window.scrollY, 0);
      const active = document.activeElement;
      const keyboardFocus =
        active instanceof HTMLElement &&
        header.contains(active) &&
        active.matches(":focus-visible") &&
        !active.closest("dialog:not([open])");
      const pinned =
        y <= header.offsetHeight ||
        keyboardFocus ||
        [...header.querySelectorAll('[aria-expanded="true"]')].some(
          // Lo que vive dentro de un <dialog> cerrado no cuenta como abierto.
          (el) => !el.closest("dialog:not([open])"),
        );
      if (pinned) {
        setHidden(false);
        lastY = y;
        return;
      }
      const delta = y - lastY;
      if (Math.abs(delta) < TOLERANCE) return;
      setHidden(delta > 0);
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={ref}
      onFocusCapture={() => setHidden(false)}
      className={cn(
        className,
        "transition-transform duration-300 ease-out motion-reduce:transition-none",
        hidden && "-translate-y-full shadow-none",
      )}
    >
      {children}
    </header>
  );
}
