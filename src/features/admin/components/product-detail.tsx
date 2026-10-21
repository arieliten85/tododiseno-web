import Image from "next/image";
import type { ReactNode } from "react";
import { audiences, categories } from "@/content/categories.content";
import { productTypeLabels, type AdminProduct } from "../admin.types";
import { primaryButtonClass, secondaryButtonClass } from "../admin-styles";
import { productCode } from "../lib/product-code";

type Props = {
  product: AdminProduct;
  onEdit: () => void;
  onBack: () => void;
};

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-[#e5e7eb] py-3 sm:flex-row sm:gap-4">
      <dt className="text-sm font-medium text-[#6b7280] sm:w-48 sm:shrink-0">
        {label}
      </dt>
      <dd className="min-w-0 text-base break-words">{children}</dd>
    </div>
  );
}

const yesNo = (value: boolean) => (value ? "Sí" : "No");

export function ProductDetail({ product, onEdit, onBack }: Props) {
  const category = categories.find((c) => c.id === product.category);
  const audience = audiences.find((a) => a.id === product.audience);

  return (
    <section className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">{product.visible_name}</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onBack}
            className={secondaryButtonClass}
          >
            Volver
          </button>
          <button type="button" onClick={onEdit} className={primaryButtonClass}>
            Editar
          </button>
        </div>
      </div>

      <dl>
        <Row label="Referencia interna">
          <code className="font-mono text-sm">{productCode(product.id)}</code>
        </Row>
        {product.codigo && (
          <Row label="Código">{product.codigo}</Row>
        )}
        <Row label="Tipo">{productTypeLabels[product.product_type]}</Row>
        <Row label="Categoría">{category?.label ?? product.category}</Row>
        <Row label="Género">{audience?.label ?? product.audience}</Row>
        {product.description && (
          <Row label="Descripción">{product.description}</Row>
        )}
        {product.image_urls && product.image_urls.length > 0 && (
          <Row label="Fotos">
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {product.image_urls.map((url, index) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={url}
                      alt={`Foto ${index + 1} de ${product.visible_name}`}
                      width={160}
                      height={160}
                      unoptimized
                      className="aspect-square w-full rounded-md object-cover"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Row>
        )}
        <Row label="Venta">
          Mínimo {product.quantity_min} {product.quantity_unit}
        </Row>
        {product.customizable && <Row label="Personalizable">Sí</Row>}
        {product.featured && <Row label="Destacado">Sí</Row>}
        <Row label="Publicado">{yesNo(product.published)}</Row>
        {product.specs.length > 0 && (
          <Row label="Características">
            <ul className="flex flex-col gap-1">
              {product.specs.map((spec, index) => (
                <li key={index}>
                  <span className="text-[#6b7280]">{spec.label}:</span>{" "}
                  {spec.value}
                </li>
              ))}
            </ul>
          </Row>
        )}
        {product.detail_items.length > 0 && (
          <Row label="Qué incluye">
            <ul className="flex flex-col gap-1">
              {product.detail_items.map((row, index) => (
                <li key={index}>
                  {row.quantity} × {row.item}
                  {row.size && ` · ${row.size}`}
                  {row.note && ` · ${row.note}`}
                </li>
              ))}
            </ul>
          </Row>
        )}
      </dl>
    </section>
  );
}
