"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { categories } from "@/content/categories.content";
import type { CategoryId } from "@/content/content.types";
import type { ProductType } from "@/content/spec-labels.content";
import { getSupabase } from "@/lib/supabase";
import {
  PRODUCTS_TABLE,
  productTypeLabels,
  type AdminProduct,
} from "../admin.types";
import { errorClass, inputClass, primaryButtonClass } from "../admin-styles";
import { IconButton } from "./icon-button";
import { productCode } from "../lib/product-code";

const PLACEHOLDER_SRC = "/brand/decor/placeholder-product.svg";

export type ListFilters = {
  query: string;
  category: CategoryId | "";
  type: ProductType | "";
};

export const emptyFilters: ListFilters = { query: "", category: "", type: "" };

type Props = {
  filters: ListFilters;
  onFiltersChange: (filters: ListFilters) => void;
  onNew: () => void;
  onView: (product: AdminProduct) => void;
  onEdit: (product: AdminProduct) => void;
};

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; products: AdminProduct[] };

const normalize = (text: string) =>
  text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function matches(product: AdminProduct, filters: ListFilters): boolean {
  if (filters.category && product.category !== filters.category) return false;
  if (filters.type && product.product_type !== filters.type) return false;
  const query = normalize(filters.query.trim());
  if (!query) return true;
  const haystack = normalize(
    `${product.visible_name} ${product.description} ${productCode(product.id)}`,
  );
  return haystack.includes(query);
}

export function ProductList({
  filters,
  onFiltersChange,
  onNew,
  onView,
  onEdit,
}: Props) {
  const [state, setState] = useState<State>({ status: "loading" });
  const [reloads, setReloads] = useState(0);
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    let active = true;
    getSupabase()
      .from(PRODUCTS_TABLE)
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        setState(
          error
            ? { status: "error" }
            : { status: "ready", products: (data ?? []) as AdminProduct[] },
        );
      });
    return () => {
      active = false;
    };
  }, [reloads]);

  const visible =
    state.status === "ready"
      ? state.products.filter((product) => matches(product, filters))
      : [];
  const hasFilters = Boolean(
    filters.query.trim() || filters.category || filters.type,
  );

  async function handleDelete(product: AdminProduct) {
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) return;
    setDeleteError(false);
    const { error } = await getSupabase()
      .from(PRODUCTS_TABLE)
      .delete()
      .eq("id", product.id);
    if (error) setDeleteError(true);
    else setReloads((count) => count + 1);
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Catálogo — Todo Diseño</h1>
        <button type="button" onClick={onNew} className={primaryButtonClass}>
          Nuevo producto
        </button>
      </div>

      {deleteError && (
        <p role="alert" className={errorClass}>
          No se pudo eliminar el producto.
        </p>
      )}

      {state.status === "loading" && <p>Cargando…</p>}
      {state.status === "error" && (
        <p role="alert" className={errorClass}>
          No se pudieron cargar los productos.
        </p>
      )}
      {state.status === "ready" && state.products.length === 0 && (
        <p>Todavía no hay productos cargados.</p>
      )}

      {state.status === "ready" && state.products.length > 0 && (
        <div className="flex flex-col gap-3">
          <input
            type="search"
            aria-label="Buscar producto"
            placeholder="Buscar por nombre, descripción o código"
            value={filters.query}
            onChange={(e) =>
              onFiltersChange({ ...filters, query: e.target.value })
            }
            className={inputClass}
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              aria-label="Filtrar por categoría"
              value={filters.category}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  category: e.target.value as CategoryId | "",
                })
              }
              className={inputClass}
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            <select
              aria-label="Filtrar por tipo"
              value={filters.type}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  type: e.target.value as ProductType | "",
                })
              }
              className={inputClass}
            >
              <option value="">Todos los tipos</option>
              {Object.entries(productTypeLabels).map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-[#6b7280]" aria-live="polite">
            {visible.length} de {state.products.length} productos
            {hasFilters && (
              <>
                {" · "}
                <button
                  type="button"
                  onClick={() => onFiltersChange(emptyFilters)}
                  className="underline"
                >
                  Limpiar filtros
                </button>
              </>
            )}
          </p>
        </div>
      )}

      {state.status === "ready" &&
        state.products.length > 0 &&
        visible.length === 0 && (
          <p>Ningún producto coincide con la búsqueda.</p>
        )}

      {state.status === "ready" && visible.length > 0 && (
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#d1d5db] text-[#6b7280]">
              <tr>
                <th className="hidden p-3 md:table-cell">Código</th>
                <th className="p-3">Nombre</th>
                <th className="hidden p-3 sm:table-cell">Tipo</th>
                <th className="hidden p-3 sm:table-cell">Categoría</th>

                <th className="p-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((product) => (
                <tr key={product.id} className="odd:bg-[#f9fafb]">
                  <td className="hidden p-3 font-mono text-xs md:table-cell">
                    {productCode(product.id)}
                  </td>
                  <td className="p-3 font-medium">
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.image_urls?.[0] ?? PLACEHOLDER_SRC}
                        alt=""
                        width={40}
                        height={40}
                        unoptimized
                        className="size-10 shrink-0 rounded object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => onView(product)}
                        className="text-left underline decoration-[#d1d5db] underline-offset-2"
                      >
                        {product.visible_name}
                      </button>
                    </div>
                  </td>
                  <td className="hidden p-3 sm:table-cell">
                    {productTypeLabels[product.product_type]}
                  </td>
                  <td className="hidden p-3 sm:table-cell">
                    {categories.find((c) => c.id === product.category)?.label ??
                      product.category}
                  </td>

                  <td className="p-3">
                    <div className="flex flex-wrap justify-end gap-2">
                      <IconButton label="Ver" onClick={() => onView(product)}>
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </IconButton>
                      <IconButton
                        label="Editar"
                        onClick={() => onEdit(product)}
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      </IconButton>
                      <IconButton
                        label="Eliminar"
                        danger
                        onClick={() => handleDelete(product)}
                      >
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="m19 6-1 14H6L5 6" />
                        <path d="M10 11v6M14 11v6" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
