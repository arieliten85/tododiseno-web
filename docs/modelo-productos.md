# Modelo y carga de productos

Leer antes de tocar `src/content/products.content.ts`, `src/content/spec-labels.content.ts` o `src/content/content.types.ts`.

## Tipos de producto

| Tipo | `productType` | Ejemplos |
| --- | --- | --- |
| Impresión | `"print"` | Estampitas, tarjetas de invitación, stickers, banderines |
| Objeto | `"object"` | Llaveros, cajitas, vasos, latitas |
| Kit | `"kit"` | Conjuntos de varios ítems coordinados |

## Propiedades (`specs`)

Salen del vocabulario de `spec-labels.content.ts`. Se muestran solo si tienen valor.

```ts
export const fixedSpecs = {
  print: ["Medida", "Papel", "Gramaje"],
  object: ["Material", "Presentación"],
  kit: ["Cantidad de piezas", "Presentación"],
};

export const optionalSpecs = {
  print: ["Caras", "Terminación", "Presentación"],
  object: ["Medida", "Colores", "Terminación", "Aroma", "Capacidad"],
  kit: [],
};
```

Lo que no entra en el vocabulario va en `extraSpecs`, con etiqueta libre:

```ts
extraSpecs?: { label: string; value: string }[];
// { label: "Tipo de tinta", value: "Sublimación" }
```

## Detalle y "Qué incluye" (`detailItems`)

- 1 ítem: sección "Detalle".
- 2 o más: sección "Qué incluye".
- Sin ítems: no aparece sección.

```ts
{
  item: string;
  quantity: number;
  size?: string;
  note?: string;
}
```

Los kits siempre llevan `detailItems`. En impresiones y objetos solo si hace falta aclarar algo que la descripción corta no cubre.

## Personalización

`customizable` es `true` por defecto. Muestra la línea fija "Producto personalizable" y todo lo demás (color, medida alternativa, nombre, fecha, temática, texto) se coordina por WhatsApp. Ver `docs/reglas-negocio.md`.

## Estructura de un producto

```ts
{
  id: string,
  slug: string,                 // igual al id
  productType: "print" | "object" | "kit",
  category: "comuniones" | "cumpleanos-tematicos" | "baby-shower" | "bautismo" | "navidad" | "otros-eventos",
  audience: "nina" | "nino" | "unisex",
  visibleName: string,          // título en el catálogo
  seoName: string,              // sin nombres de personajes con licencia
  description: string,          // 1–2 oraciones
  image: { src: string; alt: string },
  detailItems?: DetailItem[],
  specs?: SpecItem[],
  extraSpecs?: { label: string; value: string }[],
  customizable: boolean,
  quantity: { unit: string; min: number; step: number },
  featured?: boolean,
}
```

## Regla de oro

Si no se tiene el dato, no se carga. Los campos vacíos no se muestran. Nunca se inventan medidas, gramajes, cantidades mínimas, materiales ni aclaraciones: se le preguntan a Florencia.

## Cómo se carga un producto

1. Florencia manda fotos y descripción por WhatsApp (o por el formulario).
2. Se arma el objeto en `src/content/products.content.ts` y se mapean sus datos a las etiquetas del vocabulario.
3. La foto va en `public/brand/products/<id>.jpg`, con `alt` armado mirándola.
4. `bun run images` optimiza las imágenes.
5. Lo que Florencia deje vacío no se carga.

Si el producto está en Instagram se puede tomar la info de ahí, pero las medidas y cantidades se verifican con Florencia.

## Imágenes

- Ruta: `public/brand/products/<id>.jpg`.
- Sin imagen real, `MediaImage` muestra el placeholder `public/brand/decor/placeholder-product.svg`.
- No usar la foto de otro producto como reemplazo.

## Productos demo

Los de `products.content.ts` con sufijo `-demo` son ejemplos visuales, no productos reales.
