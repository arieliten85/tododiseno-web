"use client";

import { useEffect, useState } from "react";
import type { AdminProduct } from "../admin.types";
import { successClass } from "../admin-styles";
import { ProductDetail } from "./product-detail";
import { ProductForm } from "./product-form";
import { ProductList, emptyFilters, type ListFilters } from "./product-list";

type View =
  | { name: "list" }
  | { name: "detail"; product: AdminProduct }
  | { name: "form"; product: AdminProduct | null };

export function AdminApp() {
  const [view, setView] = useState<View>({ name: "list" });
  const [saved, setSaved] = useState(false);
  // Viven acá para que no se pierdan al abrir un producto y volver.
  const [filters, setFilters] = useState<ListFilters>(emptyFilters);

  // Cada pantalla arranca desde arriba, no donde quedó el scroll de la anterior.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

  return (
    <div className="flex flex-col gap-4">
      {view.name === "list" ? (
        <>
          {saved && (
            <p role="status" className={successClass}>
              Guardado
            </p>
          )}
          <ProductList
            filters={filters}
            onFiltersChange={setFilters}
            onNew={() => {
              setSaved(false);
              setView({ name: "form", product: null });
            }}
            onView={(product) => {
              setSaved(false);
              setView({ name: "detail", product });
            }}
            onEdit={(product) => {
              setSaved(false);
              setView({ name: "form", product });
            }}
          />
        </>
      ) : view.name === "detail" ? (
        <ProductDetail
          product={view.product}
          onEdit={() => setView({ name: "form", product: view.product })}
          onBack={() => setView({ name: "list" })}
        />
      ) : (
        <ProductForm
          product={view.product}
          onDone={() => {
            setSaved(true);
            setView({ name: "list" });
          }}
          onCancel={() => setView({ name: "list" })}
        />
      )}
    </div>
  );
}
