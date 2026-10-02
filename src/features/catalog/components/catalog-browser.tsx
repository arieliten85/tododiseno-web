"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CloseIcon, FilterIcon, SearchIcon } from "@/components/ui/icons";
import { cn } from "@/lib/class-names";
import type {
  AudienceId,
  CatalogPageContent,
  CategoryId,
} from "@/content/content.types";
import {
  filterEntries,
  paginate,
  type CatalogEntry,
  type CatalogSort,
} from "../lib/filter-products";

export type CatalogBrowserItem = CatalogEntry & { card: ReactNode };

type CatalogBrowserProps = {
  items: CatalogBrowserItem[];
  categories: Array<{ id: CategoryId; label: string }>;
  audiences: Array<{ id: AudienceId; label: string }>;
  content: CatalogPageContent;
};

function toggle<T>(current: ReadonlySet<T>, value: T) {
  const next = new Set(current);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

const checkboxClass =
  "border-border accent-accent-strong size-4 shrink-0 rounded border";

/**
 * Filtros, buscador, orden y paginado del catálogo, todo en el navegador.
 * Las tarjetas llegan ya renderizadas desde el servidor (HTML estático y SEO);
 * acá solo se decide cuáles mostrar.
 */
export function CatalogBrowser({
  items,
  categories,
  audiences,
  content,
}: CatalogBrowserProps) {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    ReadonlySet<CategoryId>
  >(new Set());
  const [selectedAudiences, setSelectedAudiences] = useState<
    ReadonlySet<AudienceId>
  >(new Set());
  const [sort, setSort] = useState<CatalogSort>("relevance");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  useEffect(() => {
    // Sincroniza con la URL (sistema externo): ?categoria=... filtra y #buscar enfoca el buscador.
    const params = new URLSearchParams(window.location.search);
    const initial = categories
      .filter((category) => params.getAll("categoria").includes(category.id))
      .map((category) => category.id);
    if (initial.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCategories(new Set(initial));
    }
    if (window.location.hash === "#buscar") searchRef.current?.focus();
  }, [categories]);

  const results = useMemo(
    () =>
      filterEntries(items, {
        query,
        categories: selectedCategories,
        audiences: selectedAudiences,
        sort,
      }),
    [items, query, selectedCategories, selectedAudiences, sort],
  );

  const pagination = paginate(results, page);
  const hasFilters =
    selectedCategories.size > 0 ||
    selectedAudiences.size > 0 ||
    query.trim() !== "";

  const categoryLabel = (id: CategoryId) =>
    categories.find((c) => c.id === id)?.label ?? id;
  const audienceLabel = (id: AudienceId) =>
    audiences.find((a) => a.id === id)?.label ?? id;

  const resetFilters = () => {
    setQuery("");
    setSelectedCategories(new Set());
    setSelectedAudiences(new Set());
    setPage(1);
  };

  const goToPage = (next: number) => {
    setPage(next);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filtersPanel = (
    <div className="space-y-6">
      <fieldset>
        <legend className="text-muted-foreground mb-3 text-[0.7rem] font-bold tracking-[0.2em] uppercase">
          {content.filters.occasion}
        </legend>
        <ul className="space-y-2.5">
          {categories.map((category) => (
            <li key={category.id}>
              <label className="flex min-h-8 cursor-pointer items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  className={checkboxClass}
                  checked={selectedCategories.has(category.id)}
                  onChange={() => {
                    setSelectedCategories((current) =>
                      toggle(current, category.id),
                    );
                    setPage(1);
                  }}
                />
                {category.label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset>
        <legend className="text-muted-foreground mb-3 text-[0.7rem] font-bold tracking-[0.2em] uppercase">
          {content.filters.audience}
        </legend>
        <ul className="space-y-2.5">
          {audiences.map((audience) => (
            <li key={audience.id}>
              <label className="flex min-h-8 cursor-pointer items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  className={checkboxClass}
                  checked={selectedAudiences.has(audience.id)}
                  onChange={() => {
                    setSelectedAudiences((current) =>
                      toggle(current, audience.id),
                    );
                    setPage(1);
                  }}
                />
                {audience.label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <div className="bg-secondary rounded-lg p-4 text-sm">
        <p className="text-accent-strong mb-1 text-[0.7rem] font-bold tracking-[0.2em] uppercase">
          {content.filters.note.title}
        </p>
        <p className="text-foreground/80 leading-6">
          {content.filters.note.description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <aside aria-label={content.filters.title}>
        <button
          type="button"
          className="bg-surface border-border mb-4 inline-flex min-h-11 w-full items-center justify-between gap-2 rounded-full border px-5 text-sm font-semibold lg:hidden"
          aria-expanded={filtersOpen}
          aria-controls={`${baseId}-filters`}
          onClick={() => setFiltersOpen((value) => !value)}
        >
          <span className="flex items-center gap-2">
            <FilterIcon className="size-4" />
            {content.filters.title}
          </span>
        </button>
        <div
          id={`${baseId}-filters`}
          className={cn(
            "bg-surface border-border rounded-card border p-5 shadow-sm lg:sticky lg:top-28 lg:block",
            filtersOpen ? "block" : "hidden",
          )}
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-heading flex items-center gap-2 text-lg font-semibold">
              <FilterIcon className="text-accent-strong size-4" />
              {content.filters.title}
            </h2>
            {hasFilters ? (
              <button
                type="button"
                onClick={resetFilters}
                className="text-accent-strong text-xs font-semibold underline underline-offset-4"
              >
                {content.filters.clear}
              </button>
            ) : null}
          </div>
          {filtersPanel}
        </div>
      </aside>

      <div ref={resultsRef} className="scroll-mt-28">
        <div className="bg-surface border-border rounded-card mb-4 flex flex-wrap items-center justify-between gap-4 border px-5 py-3 shadow-sm">
          <p role="status" aria-live="polite" className="text-sm font-medium">
            {results.length === 1
              ? content.results.countOne
              : `${results.length} ${content.results.countMany}`}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <label className="relative">
              <span className="sr-only">{content.search.label}</span>
              <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <input
                ref={searchRef}
                id="buscar"
                type="search"
                value={query}
                placeholder={content.search.placeholder}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                className="border-border bg-background placeholder:text-muted-foreground min-h-10 w-48 rounded-full border pr-4 pl-9 text-sm"
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                {content.results.sortLabel}
              </span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as CatalogSort)}
                className="bg-secondary min-h-10 rounded-full border-0 px-4 text-sm font-medium"
              >
                {content.results.sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {hasFilters ? (
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-muted-foreground">
              {content.results.activeFilters}
            </span>
            {[...selectedCategories].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setSelectedCategories((current) => toggle(current, id));
                  setPage(1);
                }}
                className="bg-secondary text-secondary-foreground inline-flex min-h-8 items-center gap-1.5 rounded-full px-3 font-semibold"
                aria-label={`${content.results.removeFilter} ${categoryLabel(id)}`}
              >
                {categoryLabel(id)}
                <CloseIcon className="size-3" />
              </button>
            ))}
            {[...selectedAudiences].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setSelectedAudiences((current) => toggle(current, id));
                  setPage(1);
                }}
                className="bg-secondary text-secondary-foreground inline-flex min-h-8 items-center gap-1.5 rounded-full px-3 font-semibold"
                aria-label={`${content.results.removeFilter} ${audienceLabel(id)}`}
              >
                {audienceLabel(id)}
                <CloseIcon className="size-3" />
              </button>
            ))}
            <button
              type="button"
              onClick={resetFilters}
              className="text-accent-strong font-semibold underline underline-offset-4"
            >
              {content.results.clearFilters}
            </button>
          </div>
        ) : null}

        {pagination.items.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {pagination.items.map((item) => (
              <li key={item.slug}>{item.card}</li>
            ))}
          </ul>
        ) : (
          <div className="bg-surface border-border rounded-card border p-10 text-center">
            <p className="font-heading text-xl font-semibold">
              {content.results.empty.title}
            </p>
            <p className="text-muted-foreground mt-2">
              {content.results.empty.description}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="bg-primary text-primary-foreground mt-5 inline-flex min-h-11 items-center rounded-full px-6 text-sm font-semibold"
            >
              {content.results.clearFilters}
            </button>
          </div>
        )}

        {pagination.totalPages > 1 ? (
          <nav
            aria-label={content.pagination.label}
            className="mt-10 flex items-center justify-center gap-2"
          >
            {Array.from(
              { length: pagination.totalPages },
              (_, index) => index + 1,
            ).map((number) => (
              <button
                key={number}
                type="button"
                aria-current={number === pagination.page ? "page" : undefined}
                aria-label={`${content.pagination.page} ${number}`}
                onClick={() => goToPage(number)}
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  number === pagination.page
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary",
                )}
              >
                {number}
              </button>
            ))}
            {pagination.page < pagination.totalPages ? (
              <button
                type="button"
                onClick={() => goToPage(pagination.page + 1)}
                className="hover:bg-secondary min-h-10 rounded-full px-4 text-sm font-semibold"
              >
                {content.pagination.next} →
              </button>
            ) : null}
          </nav>
        ) : null}
      </div>
    </div>
  );
}
