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

export function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function tokenize(query: string) {
  return normalizeText(query).split(/\s+/).filter(Boolean);
}

function matchesTokens(text: string, tokens: readonly string[]) {
  return tokens.every((token) => text.includes(token));
}

export function suggestEntries<T extends CatalogEntry>(
  entries: readonly T[],
  query: string,
  limit: number,
) {
  const tokens = tokenize(query);
  if (tokens.length === 0) return { items: [] as T[], total: 0 };
  const phrase = tokens.join(" ");
  const scored = entries
    .filter((entry) => matchesTokens(entry.searchText, tokens))
    .map((entry) => {
      const name = normalizeText(entry.name);
      const score = name.startsWith(phrase)
        ? 0
        : name.includes(` ${phrase}`)
          ? 1
          : matchesTokens(name, tokens)
            ? 2
            : 3;
      return { entry, score };
    })
    .sort((a, b) => a.score - b.score || a.entry.order - b.entry.order);
  return {
    items: scored.slice(0, limit).map(({ entry }) => entry),
    total: scored.length,
  };
}

export function createSearchText(...parts: string[]) {
  return normalizeText(parts.join(" "));
}

export function filterEntries<T extends CatalogEntry>(
  entries: readonly T[],
  filters: CatalogFilters,
): T[] {
  const tokens = tokenize(filters.query);

  const matches = entries.filter((entry) => {
    if (filters.categories.size > 0 && !filters.categories.has(entry.category))
      return false;
    if (filters.audiences.size > 0 && !filters.audiences.has(entry.audience))
      return false;
    if (!matchesTokens(entry.searchText, tokens)) return false;
    return true;
  });

  return [...matches].sort((a, b) =>
    filters.sort === "name"
      ? a.name.localeCompare(b.name, "es")
      : a.order - b.order,
  );
}

// counts ignore the group's own selection so you can add a 2nd option; 0 = dead end
export function facetCounts(
  entries: readonly CatalogEntry[],
  selection: {
    query: string;
    categories: ReadonlySet<CategoryId>;
    audiences: ReadonlySet<AudienceId>;
  },
) {
  const tokens = tokenize(selection.query);
  const categories: Partial<Record<CategoryId, number>> = {};
  const audiences: Partial<Record<AudienceId, number>> = {};
  for (const entry of entries) {
    if (!matchesTokens(entry.searchText, tokens)) continue;
    if (
      selection.audiences.size === 0 ||
      selection.audiences.has(entry.audience)
    )
      categories[entry.category] = (categories[entry.category] ?? 0) + 1;
    if (
      selection.categories.size === 0 ||
      selection.categories.has(entry.category)
    )
      audiences[entry.audience] = (audiences[entry.audience] ?? 0) + 1;
  }
  return { categories, audiences };
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
