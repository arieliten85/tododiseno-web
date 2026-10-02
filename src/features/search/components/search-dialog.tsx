"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRightIcon, CloseIcon, SearchIcon } from "@/components/ui/icons";
import { cn } from "@/lib/class-names";
import type { SearchContent } from "@/content/content.types";
import {
  normalizeText,
  suggestEntries,
  type CatalogEntry,
} from "@/features/catalog/lib/filter-products";

export type SearchItem = CatalogEntry & {
  categoryLabel: string;
  image: { src: string };
};

type SearchDialogProps = {
  items: SearchItem[];
  categories: Array<{ id: string; label: string }>;
  content: SearchContent;
  catalogPath: string;
};

type Option = {
  id: string;
  href: string;
  label: string;
  hint?: string;
  image?: string;
  kind: "category" | "product" | "all";
};

const MAX_PRODUCTS = 6;
const MIN_CHARS = 2;

/**
 * Único buscador del sitio. Un botón en el header abre un panel modal
 * (pantalla completa en el celular, panel arriba en escritorio) con
 * sugerencias en vivo. Enter o "Ver todos" lleva al catálogo con ?q=.
 * Patrón combobox/listbox de WAI-ARIA sobre <dialog> nativo: Escape, foco
 * atrapado y fondo inerte vienen del navegador.
 */
export function SearchDialog({
  items,
  categories,
  content,
  catalogPath,
}: SearchDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Abierto solo para la ruta en que se abrió: al navegar se cierra solo.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const listId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const trimmed = query.trim();
  const searching = normalizeText(trimmed).length >= MIN_CHARS;

  const { options, total } = useMemo(() => {
    if (!searching) {
      return {
        total: 0,
        options: categories.map<Option>((category) => ({
          id: `cat-${category.id}`,
          href: `${catalogPath}?categoria=${category.id}`,
          label: category.label,
          kind: "category",
        })),
      };
    }
    const normalized = normalizeText(trimmed);
    const matchedCategories = categories
      .filter((category) => normalizeText(category.label).includes(normalized))
      .map<Option>((category) => ({
        id: `cat-${category.id}`,
        href: `${catalogPath}?categoria=${category.id}`,
        label: category.label,
        kind: "category",
      }));
    const { items: products, total } = suggestEntries(
      items,
      trimmed,
      MAX_PRODUCTS,
    );
    const productOptions = products.map<Option>((product) => ({
      id: `prod-${product.slug}`,
      href: `${catalogPath}${product.slug}/`,
      label: product.name,
      hint: product.categoryLabel,
      image: product.image.src,
      kind: "product",
    }));
    const all: Option[] =
      total > 0
        ? [
            {
              id: "all",
              href: `${catalogPath}?q=${encodeURIComponent(trimmed)}`,
              label: `${content.viewAll} “${trimmed}”`,
              kind: "all",
            },
          ]
        : [];
    return {
      total,
      options: [...matchedCategories, ...productOptions, ...all],
    };
  }, [searching, trimmed, items, categories, catalogPath, content.viewAll]);

  const close = () => setOpenPath(null);

  const go = (href: string) => {
    close();
    router.push(href);
  };

  const submit = () => {
    if (activeIndex >= 0 && options[activeIndex]) {
      go(options[activeIndex].href);
      return;
    }
    if (searching) go(`${catalogPath}?q=${encodeURIComponent(trimmed)}`);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (options.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? options.length - 1 : index - 1));
    }
  };

  const activeId =
    activeIndex >= 0 && options[activeIndex]
      ? `${listId}-${options[activeIndex].id}`
      : undefined;

  const productOptions = options.filter((option) => option.kind === "product");
  const categoryOptions = options.filter(
    (option) => option.kind === "category",
  );
  const allOption = options.find((option) => option.kind === "all");

  const renderOption = (option: Option) => {
    const index = options.indexOf(option);
    const active = index === activeIndex;
    return (
      <li key={option.id} role="presentation">
        <Link
          id={`${listId}-${option.id}`}
          role="option"
          aria-selected={active}
          href={option.href}
          onClick={close}
          onMouseMove={() => setActiveIndex(index)}
          className={cn(
            "flex min-h-12 items-center gap-3 rounded-xl px-3 py-2 text-sm",
            active ? "bg-secondary" : "hover:bg-secondary",
            option.kind === "all" && "text-accent-strong font-semibold",
          )}
        >
          {option.image ? (
            <Image
              src={option.image}
              alt=""
              width={48}
              height={48}
              className="bg-muted size-12 shrink-0 rounded-lg object-cover"
            />
          ) : null}
          <span className="min-w-0 flex-1">
            <span className="block truncate font-medium">{option.label}</span>
            {option.hint ? (
              <span className="text-muted-foreground block truncate text-xs">
                {option.hint}
              </span>
            ) : null}
          </span>
          {option.kind === "all" ? (
            <ArrowRightIcon className="size-4 shrink-0" />
          ) : null}
        </Link>
      </li>
    );
  };

  return (
    <>
      <button
        type="button"
        aria-label={content.trigger}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpenPath(pathname)}
        className="text-accent-strong hover:bg-secondary inline-flex size-11 items-center justify-center rounded-full"
      >
        <SearchIcon className="size-5" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={content.title}
        onClose={() => {
          setOpenPath(null);
          setQuery("");
          setActiveIndex(-1);
        }}
        onClick={(event) => {
          // Un clic sobre el fondo (el propio <dialog>) lo cierra.
          if (event.target === dialogRef.current) close();
        }}
        className={cn(
          "bg-background text-foreground m-0 hidden h-dvh max-h-none w-dvw max-w-none flex-col p-0 backdrop:bg-black/40 open:flex",
          "md:top-16 md:right-auto md:bottom-auto md:left-1/2 md:h-auto md:max-h-[75dvh] md:w-[40rem] md:-translate-x-1/2 md:rounded-2xl md:shadow-xl",
        )}
      >
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
          className="border-border focus-within:border-accent-strong flex items-center gap-2 border-b px-4 py-3"
        >
          <SearchIcon
            className="text-muted-foreground size-5 shrink-0"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="text"
            autoFocus
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="search"
            role="combobox"
            aria-label={content.title}
            aria-expanded={options.length > 0}
            aria-controls={listId}
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            placeholder={content.placeholder}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(-1);
            }}
            onKeyDown={onKeyDown}
            className="placeholder:text-muted-foreground min-h-11 min-w-0 flex-1 bg-transparent text-base outline-none focus-visible:outline-none"
          />
          {query ? (
            <button
              type="button"
              aria-label={content.clear}
              onClick={() => {
                setQuery("");
                setActiveIndex(-1);
                inputRef.current?.focus();
              }}
              className="text-muted-foreground hover:bg-secondary inline-flex size-9 items-center justify-center rounded-full"
            >
              <CloseIcon className="size-4" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={close}
            aria-label={content.close}
            className="text-foreground hover:bg-secondary inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold"
          >
            <span className="md:hidden">{content.closeShort}</span>
            <CloseIcon className="hidden size-5 md:block" />
          </button>
        </form>

        <div className="flex-1 overflow-y-auto overscroll-contain p-3">
          <p role="status" aria-live="polite" className="sr-only">
            {searching
              ? total === 1
                ? content.resultsOne
                : `${total} ${content.resultsMany}`
              : ""}
          </p>

          {searching && total === 0 && categoryOptions.length === 0 ? (
            <div className="px-3 py-8 text-center">
              <p className="text-muted-foreground text-sm">
                {content.empty} “{trimmed}”.
              </p>
              <Link
                href={catalogPath}
                onClick={close}
                className="text-accent-strong mt-3 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4"
              >
                {content.viewCatalog}
              </Link>
            </div>
          ) : (
            <ul id={listId} role="listbox" aria-label={content.title}>
              {categoryOptions.length > 0 ? (
                <li role="presentation">
                  <p className="text-muted-foreground px-3 pt-1 pb-2 text-[0.7rem] font-bold tracking-[0.2em] uppercase">
                    {content.categoriesTitle}
                  </p>
                  <ul role="presentation">
                    {categoryOptions.map(renderOption)}
                  </ul>
                </li>
              ) : null}
              {productOptions.length > 0 ? (
                <li role="presentation">
                  <p className="text-muted-foreground px-3 pt-3 pb-2 text-[0.7rem] font-bold tracking-[0.2em] uppercase">
                    {content.productsTitle}
                  </p>
                  <ul role="presentation">
                    {productOptions.map(renderOption)}
                  </ul>
                </li>
              ) : null}
              {allOption ? (
                <li
                  role="presentation"
                  className="border-border mt-2 border-t pt-2"
                >
                  <ul role="presentation">{renderOption(allOption)}</ul>
                </li>
              ) : null}
            </ul>
          )}

          {!searching && trimmed.length > 0 ? (
            <p className="text-muted-foreground px-3 pt-3 text-xs">
              {content.hint}
            </p>
          ) : null}
        </div>
      </dialog>
    </>
  );
}
