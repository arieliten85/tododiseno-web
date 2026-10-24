"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { categories, audiences } from "@/content/categories.content";
import type { AudienceId, CategoryId } from "@/content/content.types";
import {
  specExamples,
  specLabels,
  specUnits,
  type ProductType,
  type SpecLabel,
} from "@/content/spec-labels.content";
import { PencilIcon } from "@/components/ui/icons";
import { getSupabase } from "@/lib/supabase";
import {
  IMAGES_BUCKET,
  MAX_PHOTOS,
  PRODUCTS_TABLE,
  productTypeLabels,
  type AdminDetailItem,
  type AdminProduct,
  type AdminSpec,
} from "../admin.types";
import {
  errorClass,
  inputClass,
  labelClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "../admin-styles";
import { compressImage } from "../lib/compress-image";
import { defaultSpecs } from "../lib/default-specs";
import { loadSpecTemplate, saveSpecTemplate } from "../lib/spec-template";
import { generateSlug } from "../lib/slug";
import { PhotoCard } from "./photo-card";

// custom: la fila escribe un nombre propio en vez de elegir del vocabulario.
type FormSpec = AdminSpec & { custom?: boolean };

const CUSTOM_OPTION = "__custom";

const PAPEL_OPTIONS = [
  "Fotográfico mate",
  "Fotográfico brillante",
  "Fotográfico mate adhesivo",
  "Fotográfico brillante adhesivo",
  "Texturizado",
  "Kraft",
  "Cartulina",
  "Ilustración",
] as const;

const TERMINACION_OPTIONS = [
  "Recta",
  "Redondeada",
  "Troquelada",
  "Perforada",
  "Laminado mate",
  "Laminado brillante",
  "Anillado",
] as const;

function specOptionsFor(label: string): readonly string[] | null {
  if (label === "Papel") return PAPEL_OPTIONS;
  if (label === "Terminación") return TERMINACION_OPTIONS;
  return null;
}

const isCustomSpec = (spec: FormSpec) =>
  spec.custom ??
  (spec.label !== "" && !specLabels.some((l) => l === spec.label));

const unitFor = (label: string) =>
  specUnits[canonicalLabel(label) as SpecLabel];

// Con unidad fija se escribe solo el número; si igual pone "g", se descarta.
const stripUnit = (value: string) => value.replace(/[a-zA-Z.\s]+$/, "");

const toInputValue = (label: string, value: string) =>
  unitFor(label) ? stripUnit(value) : value;

function finalValue(label: string, value: string): string {
  const unit = unitFor(label);
  if (!unit) return value.trim();
  const amount = stripUnit(value.trim()).trim();
  return amount ? `${amount} ${unit}` : "";
}

function specPlaceholder(label: string): string {
  const example = specLabels.find((l) => l === label);
  return example ? `Ej: ${specExamples[example]}` : "Valor";
}

// "medida" escrito a mano se guarda como "Medida" del vocabulario.
const canonicalLabel = (label: string) =>
  specLabels.find((l) => l.toLowerCase() === label.trim().toLowerCase()) ??
  label.trim();

type DetailRow = { item: string; quantity: string; size: string; note: string };

type FormState = {
  product_type: ProductType | "";
  category: CategoryId | "";
  audience: AudienceId;
  codigo: string;
  visible_name: string;
  seo_name: string;
  description: string;
  notas: string;
  image_urls: string[];
  customizable: boolean;
  customizable_details: string;
  quantity_min: string;
  featured: boolean;
  published: boolean;
  specs: FormSpec[];
  detail_items: DetailRow[];
};

type Props = {
  product: AdminProduct | null;
  onDone: () => void;
  onCancel: () => void;
};

const emptyDetail: DetailRow = { item: "", quantity: "1", size: "", note: "" };

function initialState(product: AdminProduct | null): FormState {
  if (!product) {
    return {
      product_type: "",
      category: "",
      audience: "unisex",
      codigo: "",
      visible_name: "",
      seo_name: "",
      description: "",
      notas: "",
      image_urls: [],
      customizable: true,
      customizable_details: "",
      quantity_min: "1",
      featured: false,
      published: true,
      specs: [],
      detail_items: [],
    };
  }
  return {
    product_type: product.product_type,
    category: product.category,
    audience: product.audience,
    codigo: product.codigo ?? "",
    visible_name: product.visible_name,
    seo_name: product.seo_name,
    description: product.description,
    notas: product.notas ?? "",
    image_urls: product.image_urls ?? [],
    customizable: product.customizable,
    customizable_details: product.customizable_details ?? "",
    quantity_min: String(product.quantity_min),
    featured: product.featured,
    published: product.published,
    specs: product.specs.map((spec) => ({
      ...spec,
      value: toInputValue(spec.label, spec.value),
    })),
    detail_items: product.detail_items.map((row) => ({
      item: row.item,
      quantity: String(row.quantity),
      size: row.size ?? "",
      note: row.note ?? "",
    })),
  };
}

function toDetailItems(rows: DetailRow[]): AdminDetailItem[] {
  return rows
    .filter((row) => row.item.trim())
    .map((row) => ({
      item: row.item.trim(),
      quantity: Number(row.quantity),
      ...(row.size.trim() && { size: row.size.trim() }),
      ...(row.note.trim() && { note: row.note.trim() }),
    }));
}

type NewPhoto = { file: File; preview: string };

function validate(form: FormState, newPhotoCount: number): string | null {
  if (!form.product_type) return "Elegí el tipo de producto.";
  if (!form.category) return "Elegí la categoría.";
  if (!form.visible_name.trim()) return "Falta el nombre del producto.";
  if (!form.description.trim()) return "Falta la descripción.";
  if (form.customizable && !form.customizable_details.trim()) return "Completá qué se puede personalizar.";
  if (form.image_urls.length + newPhotoCount === 0)
    return "Agregá al menos una foto.";
  const incomplete = form.specs.find(
    (spec) => !spec.label.trim() || !finalValue(spec.label, spec.value),
  );
  if (incomplete)
    return incomplete.label.trim()
      ? `Completá “${incomplete.label.trim()}” o quitala.`
      : "Hay una característica sin nombre o sin valor: completala o quitala.";
  const min = Number(form.quantity_min);
  if (form.quantity_min.trim() && (!Number.isInteger(min) || min < 1))
    return "La cantidad mínima tiene que ser un número entero desde 1.";
  const items = toDetailItems(form.detail_items);
  if (items.some((row) => !Number.isInteger(row.quantity) || row.quantity < 1))
    return "Cada ítem de “Qué incluye” necesita una cantidad desde 1.";
  if (
    form.detail_items.some((row) => !row.item.trim() && (row.size || row.note))
  )
    return "Hay un ítem sin nombre en “Qué incluye”.";
  return null;
}

export function ProductForm({ product, onDone, onCancel }: Props) {
  const [form, setForm] = useState(() => initialState(product));
  const [id] = useState(() => product?.id ?? crypto.randomUUID());
  const [newPhotos, setNewPhotos] = useState<NewPhoto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function patch(values: Partial<FormState>) {
    setForm((current) => ({ ...current, ...values }));
  }

  function changeType(next: ProductType) {
    const hasValues = form.specs.some((spec) => spec.value.trim());
    if (
      hasValues &&
      !window.confirm(
        "¿Reemplazar las características actuales con las del nuevo tipo?",
      )
    )
      return;
    patch({ product_type: next, specs: loadSpecTemplate(next) });
  }

  function resetSpecs() {
    if (!form.product_type) return;
    const hasValues = form.specs.some((spec) => spec.value.trim());
    if (
      hasValues &&
      !window.confirm("¿Volver a las características originales de este tipo?")
    )
      return;
    patch({ specs: defaultSpecs(form.product_type) });
  }

  const photoCount = form.image_urls.length + newPhotos.length;

  function addPhotos(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).slice(
      0,
      MAX_PHOTOS - photoCount,
    );
    event.target.value = "";
    setNewPhotos((current) => [
      ...current,
      ...files.map((file) => ({ file, preview: URL.createObjectURL(file) })),
    ]);
  }

  function removeNewPhoto(index: number) {
    URL.revokeObjectURL(newPhotos[index].preview);
    setNewPhotos((current) => current.filter((_, i) => i !== index));
  }

  const usedLabels = new Set(form.specs.map((spec) => spec.label));

  function updateSpec(index: number, values: Partial<FormSpec>) {
    patch({
      specs: form.specs.map((spec, i) =>
        i === index ? { ...spec, ...values } : spec,
      ),
    });
  }

  function updateDetail(index: number, values: Partial<DetailRow>) {
    patch({
      detail_items: form.detail_items.map((row, i) =>
        i === index ? { ...row, ...values } : row,
      ),
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problem = validate(form, newPhotos.length);
    if (problem) {
      setError(problem);
      return;
    }
    setSaving(true);
    setError(null);

    const slug = product?.slug ?? generateSlug(form.visible_name, id);
    const supabase = getSupabase();

    const imageUrls = [...form.image_urls];
    for (let index = 0; index < newPhotos.length; index++) {
      const blob = await compressImage(newPhotos[index].file).catch(() => null);
      if (!blob) {
        setError("No se pudo procesar una de las fotos. Probá con otra.");
        setSaving(false);
        return;
      }
      const path = `${slug}/${Date.now()}-${index}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from(IMAGES_BUCKET)
        .upload(path, blob, { contentType: "image/jpeg" });
      if (uploadError) {
        console.error(uploadError);
        setError("No se pudo subir una de las fotos. Probá de nuevo.");
        setSaving(false);
        return;
      }
      imageUrls.push(
        supabase.storage.from(IMAGES_BUCKET).getPublicUrl(path).data.publicUrl,
      );
    }

    const { error: saveError } = await supabase.from(PRODUCTS_TABLE).upsert({
      id,
      slug,
      product_type: form.product_type,
      category: form.category,
      audience: form.audience,
      codigo: form.codigo.trim() || null,
      visible_name: form.visible_name.trim(),
      seo_name: form.seo_name.trim() || form.visible_name.trim(),
      description: form.description.trim(),
      notas: form.notas.trim() || null,
      image_urls: imageUrls,
      customizable: form.customizable,
      customizable_details: form.customizable ? (form.customizable_details.trim() || null) : null,
      // En edición se respeta la unidad ya guardada.
      quantity_unit:
        product?.quantity_unit ??
        (form.product_type === "kit" ? "kits" : "unidades"),
      quantity_min: Number(form.quantity_min) || 1,
      specs: form.specs.map((spec) => ({
        label: canonicalLabel(spec.label),
        value: finalValue(spec.label, spec.value),
      })),
      detail_items: toDetailItems(form.detail_items),
      featured: form.featured,
      published: form.published,
    });

    if (saveError) {
      console.error(saveError);
      setError("No se pudo guardar el producto. Probá de nuevo.");
      setSaving(false);
      return;
    }
    newPhotos.forEach((photo) => URL.revokeObjectURL(photo.preview));
    if (form.product_type) saveSpecTemplate(form.product_type, form.specs);
    onDone();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-lg bg-white p-4 shadow-sm sm:p-6"
    >
      <h1 className="text-xl font-semibold">
        {product ? "Editar producto" : "Nuevo producto"}
      </h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className={labelClass}>
          Tipo de producto *
          <select
            value={form.product_type}
            onChange={(e) => changeType(e.target.value as ProductType)}
            className={inputClass}
          >
            <option value="" disabled>
              Elegí uno
            </option>
            {Object.entries(productTypeLabels).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          Categoría *
          <select
            value={form.category}
            onChange={(e) => patch({ category: e.target.value as CategoryId })}
            className={inputClass}
          >
            <option value="" disabled>
              Elegí una
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          Género *
          <select
            value={form.audience}
            onChange={(e) => patch({ audience: e.target.value as AudienceId })}
            className={inputClass}
          >
            {audiences.map((audience) => (
              <option key={audience.id} value={audience.id}>
                {audience.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <label className={labelClass}>
          Nombre del producto *
          <input
            value={form.visible_name}
            onChange={(e) => patch({ visible_name: e.target.value })}
            className={inputClass}
          />
          <p className="text-xs font-normal text-[#6b7280]">
            Sin personajes. Ej: &quot;Tarjeta de comunión&quot;, no &quot;Tarjeta
            Mickey&quot;.
          </p>
        </label>
        <label className={labelClass}>
          Código
          <input
            placeholder="Ej: AC 9"
            value={form.codigo}
            onChange={(e) => patch({ codigo: e.target.value })}
            className={inputClass}
          />
          <p className="text-xs font-normal text-[#6b7280]">
            Tu código interno.
          </p>
        </label>
      </div>
      <label className={labelClass}>
        Descripción corta *
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => patch({ description: e.target.value })}
          className={`${inputClass} py-2`}
        />
      </label>
      <label className={labelClass}>
        Notas
        <textarea
          rows={3}
          placeholder="Ej: Con 30 unidades va la caja de regalo. Ver catálogo para más diseños."
          value={form.notas}
          onChange={(e) => patch({ notas: e.target.value })}
          className={`${inputClass} py-2`}
        />
        <p className="text-xs font-normal text-[#6b7280]">
          Opcional — promociones, aclaraciones o info extra.
        </p>
      </label>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-sm font-medium text-[#374151]">
          Fotos del producto *{" "}
          <span className="font-normal text-[#6b7280]">
            ({photoCount} de {MAX_PHOTOS})
          </span>
        </legend>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {form.image_urls.map((url, index) => (
            <PhotoCard
              key={url}
              src={url}
              alt={`Foto ${index + 1} del producto`}
              onRemove={() =>
                patch({
                  image_urls: form.image_urls.filter((_, i) => i !== index),
                })
              }
            />
          ))}
          {newPhotos.map((photo, index) => (
            <PhotoCard
              key={photo.preview}
              src={photo.preview}
              alt={`Foto nueva ${index + 1}`}
              onRemove={() => removeNewPhoto(index)}
            />
          ))}
          {photoCount < MAX_PHOTOS && (
            <li className={photoCount === 0 ? "col-span-full" : undefined}>
              <label
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-[#9ca3af] bg-[#f9fafb] text-center text-sm font-medium text-[#374151] active:bg-[#f3f4f6] has-[:focus-visible]:border-[#3b82f6] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#3b82f6]/40 ${
                  photoCount === 0 ? "min-h-36" : "aspect-square"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="flex size-11 items-center justify-center rounded-full bg-[#111] text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
                Agregar fotos
                <span className="px-2 text-xs font-normal text-[#6b7280]">
                  Tocá acá para elegir de tu galería
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={addPhotos}
                  className="sr-only"
                />
              </label>
            </li>
          )}
        </ul>
      </fieldset>

      <label className={`${labelClass} sm:max-w-xs`}>
        Cantidad mínima
        <input
          type="number"
          inputMode="numeric"
          min={1}
          placeholder="1"
          value={form.quantity_min}
          onChange={(e) => patch({ quantity_min: e.target.value })}
          className={inputClass}
        />
      </label>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-base">
          <label className="flex min-h-11 items-center gap-2">
            <input
              type="checkbox"
              checked={form.customizable}
              onChange={(e) => patch({ customizable: e.target.checked, customizable_details: e.target.checked ? form.customizable_details : "" })}
              className="size-5"
            />
            ¿Personalizable?
          </label>
          <label className="flex min-h-11 items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => patch({ featured: e.target.checked })}
              className="size-5"
            />
            ¿Destacado?
          </label>
          <label className="flex min-h-11 items-center gap-2">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => patch({ published: e.target.checked })}
              className="size-5"
            />
            ¿Publicado?
          </label>
        </div>
        {form.customizable && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              ¿Qué se puede personalizar?
              <textarea
                rows={2}
                placeholder="Ej: Los textos, colores y tamaños se pueden adaptar a tu pedido."
                value={form.customizable_details}
                onChange={(e) => patch({ customizable_details: e.target.value })}
                className="mt-1 block w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2 text-sm text-[#111827] shadow-sm placeholder:text-[#9ca3af] focus:border-[#3b82f6] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 resize-none"
              />
            </label>
            <div className="bg-secondary rounded-lg p-4">
              <p className="text-foreground/90 flex gap-3 text-sm leading-6">
                <PencilIcon className="text-accent-strong mt-0.5 size-4 shrink-0" />
                <span>
                  <strong className="text-accent-strong font-semibold">Producto personalizable</strong>
                  {" — "}
                  {form.customizable_details.trim() ? (
                    form.customizable_details.trim()
                  ) : (
                    <span className="italic opacity-50">Describí qué se puede personalizar…</span>
                  )}
                  {" Coordiná los detalles a tu gusto por WhatsApp."}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-sm font-medium text-[#374151]">
          Características (completá las que dejes o quitá las que no uses)
        </legend>
        {form.specs.map((spec, index) => (
          <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2">
            {isCustomSpec(spec) ? (
              <input
                aria-label="Nombre de la característica"
                placeholder="Nombre"
                value={spec.label}
                onChange={(e) =>
                  updateSpec(index, { label: e.target.value, custom: true })
                }
                className={inputClass}
              />
            ) : (
              <select
                aria-label="Característica"
                value={spec.label}
                onChange={(e) =>
                  e.target.value === CUSTOM_OPTION
                    ? updateSpec(index, { label: "", custom: true })
                    : updateSpec(index, { label: e.target.value })
                }
                className={inputClass}
              >
                <option value="" disabled>
                  Elegir…
                </option>
                {specLabels.map((label) => (
                  <option
                    key={label}
                    value={label}
                    disabled={usedLabels.has(label) && label !== spec.label}
                  >
                    {label}
                  </option>
                ))}
                <option value={CUSTOM_OPTION}>Otra…</option>
              </select>
            )}
            <div className="relative">
              {specOptionsFor(spec.label) ? (
                <select
                  aria-label={`Valor de ${spec.label}`}
                  value={spec.value}
                  onChange={(e) => updateSpec(index, { value: e.target.value })}
                  className={inputClass}
                >
                  <option value="" disabled>Elegir…</option>
                  {specOptionsFor(spec.label)!.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <>
                  <input
                    aria-label={`Valor de ${spec.label || "la característica"}`}
                    placeholder={specPlaceholder(spec.label)}
                    value={spec.value}
                    onChange={(e) => updateSpec(index, { value: e.target.value })}
                    className={`${inputClass} ${unitFor(spec.label) ? "pr-9" : ""}`}
                  />
                  {unitFor(spec.label) && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-base text-[#6b7280]"
                    >
                      {unitFor(spec.label)}
                    </span>
                  )}
                </>
              )}
            </div>
            <button
              type="button"
              aria-label={`Quitar ${spec.label || "característica"}`}
              onClick={() =>
                patch({ specs: form.specs.filter((_, i) => i !== index) })
              }
              className={secondaryButtonClass}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            patch({ specs: [...form.specs, { label: "", value: "" }] })
          }
          className={`${secondaryButtonClass} self-start`}
        >
          + Agregar característica
        </button>
        {form.product_type && (
          <button
            type="button"
            onClick={resetSpecs}
            className="self-start text-sm text-[#6b7280] underline"
          >
            Volver a las originales
          </button>
        )}
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-sm font-medium text-[#374151]">
          Qué incluye
        </legend>
        {form.detail_items.map((row, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-2 sm:grid-cols-[2fr_1fr_1fr_2fr_auto]"
          >
            <input
              aria-label="Nombre del ítem"
              placeholder="Nombre"
              value={row.item}
              onChange={(e) => updateDetail(index, { item: e.target.value })}
              className={`${inputClass} col-span-2 sm:col-span-1`}
            />
            <input
              aria-label="Cantidad"
              placeholder="Cantidad"
              type="number"
              inputMode="numeric"
              min={1}
              value={row.quantity}
              onChange={(e) =>
                updateDetail(index, { quantity: e.target.value })
              }
              className={inputClass}
            />
            <input
              aria-label="Medida"
              placeholder="Medida"
              value={row.size}
              onChange={(e) => updateDetail(index, { size: e.target.value })}
              className={inputClass}
            />
            <input
              aria-label="Nota"
              placeholder="Nota"
              value={row.note}
              onChange={(e) => updateDetail(index, { note: e.target.value })}
              className={`${inputClass} col-span-2 sm:col-span-1`}
            />
            <button
              type="button"
              aria-label="Quitar ítem"
              onClick={() =>
                patch({
                  detail_items: form.detail_items.filter((_, i) => i !== index),
                })
              }
              className={secondaryButtonClass}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            patch({ detail_items: [...form.detail_items, emptyDetail] })
          }
          className={`${secondaryButtonClass} self-start`}
        >
          + Agregar ítem
        </button>
      </fieldset>

      {error && (
        <p role="alert" className={errorClass}>
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className={primaryButtonClass}>
          {saving ? "Guardando…" : "Guardar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className={secondaryButtonClass}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
