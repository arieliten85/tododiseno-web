import type { ProductType } from "@/content/spec-labels.content";
import type { AdminSpec } from "../admin.types";
import { defaultSpecs } from "./default-specs";

// Solo se recuerdan las etiquetas, nunca los valores. Vive en este navegador.
const storageKey = (type: ProductType) => `admin-spec-labels:${type}`;

export function loadSpecTemplate(type: ProductType): AdminSpec[] {
  try {
    const raw = localStorage.getItem(storageKey(type));
    if (raw !== null) {
      const labels: unknown = JSON.parse(raw);
      if (
        Array.isArray(labels) &&
        labels.every((label) => typeof label === "string")
      ) {
        return labels.map((label) => ({ label, value: "" }));
      }
    }
  } catch {
    // sin storage o JSON roto: se usan las originales
  }
  return defaultSpecs(type);
}

export function saveSpecTemplate(type: ProductType, specs: AdminSpec[]) {
  try {
    const labels = specs.map((spec) => spec.label.trim()).filter(Boolean);
    localStorage.setItem(storageKey(type), JSON.stringify(labels));
  } catch {
    // sin storage: el próximo producto arranca con las originales
  }
}
