// Vocabulario controlado para la grilla "Características".
// Agregar una etiqueta acá garantiza que dos productos nunca digan
// lo mismo con palabras distintas ("Medida" vs "Tamaño").
export const specLabels = [
  // ── Compartidas ───────────────────────────────────────────────────────────
  "Medida",
  "Material",
  "Terminación",
  "Presentación",
  "Colores",

  // ── Impresión ─────────────────────────────────────────────────────────────
  "Papel",
  "Gramaje",
  "Caras",

  // ── Kit ───────────────────────────────────────────────────────────────────
  "Cantidad de piezas",

  // ── Objeto (propiedades adicionales) ──────────────────────────────────────
  "Aroma",
  "Capacidad",
] as const;

export type SpecLabel = (typeof specLabels)[number];

// Unidad fija: el panel admin la muestra junto al campo y la agrega al guardar.
export const specUnits: Partial<Record<SpecLabel, string>> = {
  Gramaje: "g",
};

// Formato esperado de cada valor; el panel admin lo muestra como placeholder.
export const specExamples: Record<SpecLabel, string> = {
  Medida: "10 × 15 cm",
  Material: "Acrílico, madera, tela",
  Terminación: "Plastificado mate, puntas redondeadas",
  Presentación: "En bolsita organza, con sobre",
  Colores: "Blanco, negro, transparente",
  Papel: "Ilustración, adhesivo mate",
  Gramaje: "300",
  Caras: "Una cara, dos caras",
  "Cantidad de piezas": "3 ítems",
  Aroma: "Lavanda, vainilla",
  Capacidad: "100 ml",
};

// ── Product types ──────────────────────────────────────────────────────────────
export type ProductType = "print" | "object" | "kit";

/**
 * Propiedades FIJAS por tipo.
 * Son las más importantes de cada tipo: siempre aparecen en el formulario.
 * Si Florencia no las completa, se ocultan en la web (no se muestran vacías).
 */
export const fixedSpecs = {
  /** Impresión: tarjeta, sticker, póster, estampita, banderín */
  print: ["Medida", "Papel", "Gramaje"],
  /** Objeto: llavero, cajita, difusor, portarretrato, etc. */
  object: ["Material", "Presentación"],
  /** Kit: conjunto de ítems coordinados */
  kit: ["Cantidad de piezas", "Presentación"],
} as const satisfies Record<ProductType, readonly SpecLabel[]>;

/**
 * Propiedades OPCIONALES predefinidas por tipo.
 * Aparecen en el formulario con un ejemplo entre paréntesis.
 * Solo se muestran en la web si tienen un valor cargado.
 * Además, Florencia puede agregar campos adicionales libres (extraSpecs).
 */
export const optionalSpecs = {
  print: ["Caras", "Terminación", "Presentación"],
  object: ["Medida", "Colores", "Terminación", "Aroma", "Capacidad"],
  kit: [],
} as const satisfies Record<ProductType, readonly SpecLabel[]>;
