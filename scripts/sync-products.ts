import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env.local");
const envContent = readFileSync(envPath, "utf-8");

const getEnv = (key: string) => {
  const match = envContent.match(new RegExp(`^${key}=(.*)$`, "m"));
  if (!match) return undefined;
  return match[1].trim().replace(/^['"]|['"]$/g, "");
};

const supabaseUrl = getEnv("NEXT_PUBLIC_SUPABASE_URL");
const supabaseKey = getEnv("SUPABASE_SERVICE_ROLE_KEY") || getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials in .env.local");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const specLabelsPath = resolve(process.cwd(), "src/content/spec-labels.content.ts");
const specLabelsContent = readFileSync(specLabelsPath, "utf-8");
const validSpecLabels = Array.from(
  specLabelsContent.matchAll(/"([^"]+)"/g)
)
  .map((m) => m[1])
  .filter((label) =>
    [
      "Medida",
      "Material",
      "Terminación",
      "Presentación",
      "Colores",
      "Papel",
      "Gramaje",
      "Caras",
      "Cantidad de piezas",
      "Aroma",
      "Capacidad",
    ].includes(label)
  );

const categoryArg = process.argv[2];

async function main() {
  let query = supabase
    .from("stitch_products")
    .select("*")
    .eq("published", true);

  if (categoryArg) {
    query = query.eq("category", categoryArg);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("No data returned from Supabase");
  }

  const products: any[] = [];

  for (const row of data) {
    const product: any = {};

    if (row.slug) {
      product.id = row.slug;
      product.slug = row.slug;
    }

    if (row.product_type != null && row.product_type !== "") {
      product.productType = row.product_type;
    }

    if (row.category != null && row.category !== "") {
      product.category = row.category;
    }

    if (row.audience != null && row.audience !== "") {
      product.audience = row.audience;
    }

    if (row.visible_name != null && row.visible_name !== "") {
      product.visibleName = row.visible_name;
    }

    if (row.seo_name != null && row.seo_name !== "") {
      product.seoName = row.seo_name;
    }

    if (row.description != null && row.description !== "") {
      product.description = row.description;
    }

    if (row.codigo != null && row.codigo !== "") {
      product.codigo = row.codigo;
    }

    if (row.notas != null && row.notas !== "") {
      product.notas = row.notas;
    }

    if (row.customizable_details != null && row.customizable_details !== "") {
      product.customizable_details = row.customizable_details;
    }

    if (row.customizable != null) {
      product.customizable = row.customizable;
    }

    if (row.featured != null) {
      product.featured = row.featured;
    }

    if (row.quantity_unit != null && row.quantity_min != null && row.quantity_step != null) {
      product.quantity = {
        unit: row.quantity_unit,
        min: row.quantity_min,
        step: row.quantity_step,
      };
    }

    if (Array.isArray(row.image_urls) && row.image_urls.length > 0) {
      const altText = row.image_alt || row.visible_name;
      product.image = { src: row.image_urls[0], alt: altText };
      if (row.image_urls.length > 1) {
        product.gallery = row.image_urls.slice(1).map((src: string) => ({ src, alt: altText }));
      }
    }

    if (row.specs != null) {
      const known = row.specs.filter((s: any) => validSpecLabels.includes(s.label));
      const extra = row.specs.filter((s: any) => !validSpecLabels.includes(s.label));
      if (known.length > 0) product.specs = known;
      if (extra.length > 0) product.extraSpecs = extra;
    }

    products.push(product);
  }

  const outputPath = resolve(process.cwd(), "src/content/products.content.ts");
  const fileContent = `import type { Product } from "./content.types";

export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;

  writeFileSync(outputPath, fileContent, "utf-8");
  console.log(`Synced ${products.length} products to ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
