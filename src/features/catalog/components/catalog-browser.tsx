"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CloseIcon, FilterIcon } from "@/components/ui/icons";
import { SelectMenu } from "@/components/ui/select-menu";
import { cn } from "@/lib/class-names";
import type {
  AudienceId,
  CatalogPageContent,
  CategoryId,
} from "@/content/content.types";
import {
  facetCounts,
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

function sameSet<T>(a: ReadonlySet<T>, b: ReadonlySet<T>) {
  return a.size === b.size && [...a].every((value) => b.has(value));
}

function toggle<T>(current: ReadonlySet<T>, value: T) {
  const next = new Set(current);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

const radioClass = "accent-accent-strong size-4 shrink-0";

function FilterOption({
  name,
  label,
  count,
  checked,
  onSelect,
}: {
  name: string;
  label: string;
  count: number;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <label className="flex min-h-9 cursor-pointer items-center gap-3 text-sm">
      <input
        type="radio"
        name={name}
        className={radioClass}
        checked={checked}
        onChange={onSelect}
      />
      <span className="flex-1">{label}</span>
      <span className="text-muted-foreground text-xs tabular-nums">
        {count}
      </span>
    </label>
  );
}

type FilterGroupsProps = {
  idPrefix: string;
  categories: Array<{ id: CategoryId; label: string }>;
  audiences: Array<{ id: AudienceId; label: string }>;
  selectedCategory: CategoryId | null;
  selectedAudience: AudienceId | null;
  categoryCounts: Partial<Record<CategoryId, number>>;
  audienceCounts: Partial<Record<AudienceId, number>>;
  onSelectCategory: (id: CategoryId | null) => void;
  onSelectAudience: (id: AudienceId | null) => void;
  content: CatalogPageContent;
};

function FilterGroups({
  idPrefix,
  categories,
  audiences,
  selectedCategory,
  selectedAudience,
  categoryCounts,
  audienceCounts,
  onSelectCategory,
  onSelectAudience,
  content,
}: FilterGroupsProps) {
  const sum = (counts: Partial<Record<string, number>>) =>
    Object.values(counts).reduce<number>((total, n) => total + (n ?? 0), 0);
  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="text-muted-foreground mb-3 text-[0.7rem] font-bold tracking-[0.2em] uppercase">
          {content.filters.occasion}
        </legend>
        <ul className="space-y-1">
          <li>
            <FilterOption
              name={`${idPrefix}-ocasion`}
              label={content.filters.allOccasions}
              count={sum(categoryCounts)}
              checked={selectedCategory === null}
              onSelect={() => onSelectCategory(null)}
            />
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <FilterOption
                name={`${idPrefix}-ocasion`}
                label={category.label}
                count={categoryCounts[category.id] ?? 0}
                checked={selectedCategory === category.id}
                onSelect={() => onSelectCategory(category.id)}
              />
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset>
        <legend className="text-muted-foreground mb-3 text-[0.7rem] font-bold tracking-[0.2em] uppercase">
          {content.filters.audience}
        </legend>
        <ul className="space-y-1">
          <li>
            <FilterOption
              name={`${idPrefix}-destinatario`}
              label={content.filters.allAudiences}
              count={sum(audienceCounts)}
              checked={selectedAudience === null}
              onSelect={() => onSelectAudience(null)}
            />
          </li>
          {audiences.map((audience) => (
            <li key={audience.id}>
              <FilterOption
                name={`${idPrefix}-destinatario`}
                label={audience.label}
                count={audienceCounts[audience.id] ?? 0}
                checked={selectedAudience === audience.id}
                onSelect={() => onSelectAudience(audience.id)}
              />
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
}

export function CatalogBrowser({
  items,
  categories,
  audiences,
  content,
}: CatalogBrowserProps) {
  // q comes from header search
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [sort, setSort] = useState<CatalogSort>("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [draftCategories, setDraftCategories] = useState<
    ReadonlySet<CategoryId>
  >(new Set());
  const [draftAudiences, setDraftAudiences] = useState<ReadonlySet<AudienceId>>(
    new Set(),
  );
  const sheetRef = useRef<HTMLDialogElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // url is the source of truth for filters
  const selectedCategories = useMemo<ReadonlySet<CategoryId>>(() => {
    const found = categories.find(
      (c) => c.id === searchParams.get("categoria"),
    );
    return new Set(found ? [found.id] : []);
  }, [searchParams, categories]);
  const selectedAudiences = useMemo<ReadonlySet<AudienceId>>(() => {
    const found = audiences.find(
      (a) => a.id === searchParams.get("destinatario"),
    );
    return new Set(found ? [found.id] : []);
  }, [searchParams, audiences]);

  const updateUrl = (mutate: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  };
  const setFacet = (
    key: "categoria" | "destinatario",
    values: Iterable<string>,
  ) =>
    updateUrl((params) => {
      params.delete(key);
      for (const value of values) params.append(key, value);
    });

  const pageKey = `${searchParams.toString()}|${sort}`;
  const [pageState, setPageState] = useState({ key: pageKey, page: 1 });
  const page = pageState.key === pageKey ? pageState.page : 1;

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

  const optionCounts = useMemo(
    () =>
      facetCounts(items, {
        query,
        categories: new Set(),
        audiences: new Set(),
      }),
    [items, query],
  );
  const draftTotal = useMemo(
    () =>
      filterEntries(items, {
        query,
        categories: draftCategories,
        audiences: draftAudiences,
        sort,
      }).length,
    [items, query, draftCategories, draftAudiences, sort],
  );

  // nothing to apply if draft == applied or no results
  const draftChanged =
    !sameSet(draftCategories, selectedCategories) ||
    !sameSet(draftAudiences, selectedAudiences);
  const canApply = draftChanged && draftTotal > 0;

  useEffect(() => {
    const dialog = sheetRef.current;
    if (!dialog) return;
    if (filtersOpen && !dialog.open) dialog.showModal();
    if (!filtersOpen && dialog.open) dialog.close();
  }, [filtersOpen]);

  const openFilters = () => {
    setDraftCategories(selectedCategories);
    setDraftAudiences(selectedAudiences);
    setFiltersOpen(true);
  };

  const applyFilters = () => {
    updateUrl((params) => {
      params.delete("categoria");
      params.delete("destinatario");
      for (const id of draftCategories) params.append("categoria", id);
      for (const id of draftAudiences) params.append("destinatario", id);
    });
    setFiltersOpen(false);
    resultsRef.current?.scrollIntoView({ block: "start" });
  };

  const pagination = paginate(results, page);
  const hasFilters =
    selectedCategories.size > 0 ||
    selectedAudiences.size > 0 ||
    query.trim() !== "";

  const categoryLabel = (id: CategoryId) =>
    categories.find((c) => c.id === id)?.label ?? id;
  const audienceLabel = (id: AudienceId) =>
    audiences.find((a) => a.id === id)?.label ?? id;

  const clearQuery = () => updateUrl((params) => params.delete("q"));

  const resetFilters = () =>
    updateUrl((params) => {
      params.delete("q");
      params.delete("categoria");
      params.delete("destinatario");
    });

  const goToPage = (next: number) => {
    setPageState({ key: pageKey, page: next });
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <button
        type="button"
        className="bg-surface border-border inline-flex min-h-11 w-full items-center justify-between gap-2 rounded-full border px-5 text-sm font-semibold lg:hidden"
        aria-haspopup="dialog"
        onClick={openFilters}
      >
        <span className="flex items-center gap-2">
          <FilterIcon className="size-4" />
          {content.filters.title}
        </span>
        {selectedCategories.size + selectedAudiences.size > 0 ? (
          <span className="bg-primary-strong text-primary-foreground inline-flex size-6 items-center justify-center rounded-full text-xs">
            {selectedCategories.size + selectedAudiences.size}
          </span>
        ) : null}
      </button>

      <aside aria-label={content.filters.title} className="hidden lg:block">
        <div className="bg-surface border-border rounded-card sticky top-28 border p-5 shadow-sm">
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
          <FilterGroups
            idPrefix="lateral"
            categories={categories}
            audiences={audiences}
            selectedCategory={[...selectedCategories][0] ?? null}
            selectedAudience={[...selectedAudiences][0] ?? null}
            categoryCounts={optionCounts.categories}
            audienceCounts={optionCounts.audiences}
            onSelectCategory={(id) => setFacet("categoria", id ? [id] : [])}
            onSelectAudience={(id) => setFacet("destinatario", id ? [id] : [])}
            content={content}
          />
        </div>
      </aside>

      <dialog
        ref={sheetRef}
        aria-label={content.filters.title}
        onClose={() => setFiltersOpen(false)}
        onClick={(event) => {
          if (event.target === sheetRef.current) setFiltersOpen(false);
        }}
        className="bg-background text-foreground backdrop:bg-overlay/40 m-0 hidden h-dvh max-h-none w-dvw max-w-none flex-col p-0 open:flex lg:hidden!"
      >
        <div className="border-border flex items-center justify-between border-b px-5 py-3">
          <h2 className="font-heading flex items-center gap-2 text-lg font-semibold">
            <FilterIcon className="text-accent-strong size-4" />
            {content.filters.title}
          </h2>
          <button
            type="button"
            aria-label={content.filters.close}
            onClick={() => setFiltersOpen(false)}
            className="hover:bg-secondary inline-flex size-11 items-center justify-center rounded-full"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
          <FilterGroups
            idPrefix="panel"
            categories={categories}
            audiences={audiences}
            selectedCategory={[...draftCategories][0] ?? null}
            selectedAudience={[...draftAudiences][0] ?? null}
            categoryCounts={optionCounts.categories}
            audienceCounts={optionCounts.audiences}
            onSelectCategory={(id) =>
              setDraftCategories(new Set(id ? [id] : []))
            }
            onSelectAudience={(id) =>
              setDraftAudiences(new Set(id ? [id] : []))
            }
            content={content}
          />
        </div>
        <div className="border-border flex items-center gap-3 border-t px-5 py-3">
          {draftCategories.size + draftAudiences.size > 0 ? (
            <button
              type="button"
              onClick={() => {
                setDraftCategories(new Set());
                setDraftAudiences(new Set());
                updateUrl((params) => {
                  params.delete("categoria");
                  params.delete("destinatario");
                });
              }}
              className="text-accent-strong min-h-11 px-2 text-sm font-semibold underline underline-offset-4"
            >
              {content.filters.clear}
            </button>
          ) : null}
          <button
            type="button"
            onClick={applyFilters}
            disabled={!canApply}
            className="bg-primary-strong text-primary-foreground disabled:bg-muted disabled:text-muted-foreground inline-flex min-h-11 flex-1 items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors disabled:cursor-not-allowed"
          >
            {!draftChanged
              ? content.filters.applyIdle
              : draftTotal === 0
                ? content.filters.applyNone
                : draftTotal === 1
                  ? content.filters.applyOne
                  : `${content.filters.applyMany.replace("{n}", String(draftTotal))}`}
          </button>
        </div>
      </dialog>

      <div ref={resultsRef} className="scroll-mt-28">
        <div className="bg-surface border-border rounded-card mb-4 flex flex-wrap items-center justify-between gap-4 border px-5 py-3 shadow-sm">
          <p role="status" aria-live="polite" className="text-sm font-medium">
            {results.length === 1
              ? content.results.countOne
              : `${results.length} ${content.results.countMany}`}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground whitespace-nowrap">
                {content.results.sortLabel}
              </span>
              <SelectMenu
                label={content.results.sortLabel}
                value={sort}
                options={content.results.sortOptions}
                onChange={setSort}
              />
            </div>
          </div>
        </div>

        {hasFilters ? (
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-muted-foreground">
              {content.results.activeFilters}
            </span>
            {query.trim() ? (
              <button
                type="button"
                onClick={clearQuery}
                className="bg-secondary text-secondary-foreground inline-flex min-h-8 items-center gap-1.5 rounded-full px-3 font-semibold"
                aria-label={`${content.results.removeFilter} ${content.search.label}: ${query}`}
              >
                {content.search.label}: “{query}”
                <CloseIcon className="size-3" />
              </button>
            ) : null}
            {[...selectedCategories].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setFacet("categoria", toggle(selectedCategories, id));
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
                  setFacet("destinatario", toggle(selectedAudiences, id));
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
              className="bg-primary-strong text-primary-foreground mt-5 inline-flex min-h-11 items-center rounded-full px-6 text-sm font-semibold"
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
                    ? "bg-primary-strong text-primary-foreground"
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
