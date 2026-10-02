import type { AudienceId, CategoryId } from "@/content/content.types";

export type CatalogEntry = {
  slug: string;
  name: string;
  searchText: string;
  category: CategoryId;
  audience: AudienceId;
  /** Posición original en el catálogo; define el orden "Relevancia". */
  order: number;
};

export type CatalogSort = "relevance" | "name";

export type CatalogFilters = {
  query: string;
  categories: ReadonlySet<CategoryId>;
  audiences: ReadonlySet<AudienceId>;
  sort: CatalogSort;
};

export const PAGE_SIZE = 12;

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function createSearchText(...parts: string[]) {
  return normalize(parts.join(" "));
}

export function filterEntries<T extends CatalogEntry>(
  entries: readonly T[],
  filters: CatalogFilters,
): T[] {
  const query = normalize(filters.query);

  const matches = entries.filter((entry) => {
    if (filters.categories.size > 0 && !filters.categories.has(entry.category))
      return false;
    if (filters.audiences.size > 0 && !filters.audiences.has(entry.audience))
      return false;
    if (query && !entry.searchText.includes(query)) return false;
    return true;
  });

  return [...matches].sort((a, b) =>
    filters.sort === "name"
      ? a.name.localeCompare(b.name, "es")
      : a.order - b.order,
  );
}

export function paginate<T>(
  items: readonly T[],
  page: number,
  size = PAGE_SIZE,
) {
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * size;
  return { items: items.slice(start, start + size), page: current, totalPages };
}
