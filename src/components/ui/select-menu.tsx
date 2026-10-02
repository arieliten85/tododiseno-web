"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/class-names";

type SelectMenuProps<T extends string> = {
  /** Texto accesible del control (ej.: "Ordenar por"). */
  label: string;
  value: T;
  options: ReadonlyArray<{ id: T; label: string }>;
  onChange: (value: T) => void;
  className?: string;
};

/**
 * Selector desplegable propio (patrón listbox de WAI-ARIA). Reemplaza al
 * <select> nativo, cuyo menú el navegador dibuja donde quiere (fuera del
 * diseño en móvil o con zoom); acá la lista siempre queda pegada al botón.
 */
export function SelectMenu<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: SelectMenuProps<T>) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const baseId = useId();

  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.id === value),
  );
  const current = options[selectedIndex];

  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const openMenu = () => {
    setActiveIndex(selectedIndex);
    setOpen(true);
  };

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  };

  const choose = (index: number) => {
    onChange(options[index].id);
    close();
  };

  const onListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % options.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex(
          (index) => (index - 1 + options.length) % options.length,
        );
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        close(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${current.label}`}
        onClick={() => (open ? close(false) : openMenu())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openMenu();
          }
        }}
        className="bg-secondary hover:bg-muted inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors"
      >
        {current.label}
        <svg
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
          className={cn("size-4 transition-transform", open && "rotate-180")}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={`${baseId}-${activeIndex}`}
          onKeyDown={onListKeyDown}
          className="bg-surface border-border absolute top-full right-0 z-30 mt-2 min-w-full overflow-hidden rounded-2xl border p-1 shadow-lg outline-none"
        >
          {options.map((option, index) => (
            <li
              key={option.id}
              id={`${baseId}-${index}`}
              role="option"
              aria-selected={option.id === value}
              onClick={() => choose(index)}
              onMouseMove={() => setActiveIndex(index)}
              className={cn(
                "flex min-h-10 cursor-pointer items-center rounded-xl px-4 text-sm whitespace-nowrap",
                index === activeIndex && "bg-secondary",
                option.id === value && "font-semibold",
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
