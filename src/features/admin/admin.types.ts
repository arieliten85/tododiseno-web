import type { AudienceId, CategoryId } from "@/content/content.types";
import type { ProductType } from "@/content/spec-labels.content";

export type AdminSpec = { label: string; value: string };

export type AdminDetailItem = {
  item: string;
  quantity: number;
  size?: string;
  note?: string;
};

// Fila de la tabla stitch_products.
export type AdminProduct = {
  id: string;
  slug: string;
  product_type: ProductType;
  category: CategoryId;
  audience: AudienceId;
  visible_name: string;
  seo_name: string;
  description: string;
  image_urls: string[] | null;
  image_alt: string | null;
  customizable: boolean;
  customizable_details: string | null;
  quantity_unit: string;
  quantity_min: number;
  quantity_step: number;
  specs: AdminSpec[];
  detail_items: AdminDetailItem[];
  featured: boolean;
  published: boolean;
};

export const PRODUCTS_TABLE = "stitch_products";
export const IMAGES_BUCKET = "product-images";
export const MAX_PHOTOS = 4;

export const productTypeLabels: Record<ProductType, string> = {
  print: "Impresión",
  object: "Objeto",
  kit: "Kit",
};
