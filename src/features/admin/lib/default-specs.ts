import type { ProductType } from "@/content/spec-labels.content";
import type { AdminSpec } from "../admin.types";

const labels: Record<ProductType, string[]> = {
  print: ["Medida", "Papel", "Gramaje", "Terminación", "Presentación"],
  object: ["Material", "Medida", "Presentación"],
  kit: ["Cantidad de piezas", "Presentación"],
};

export function defaultSpecs(type: ProductType): AdminSpec[] {
  return labels[type].map((label) => ({ label, value: "" }));
}
