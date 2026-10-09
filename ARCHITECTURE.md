# Arquitectura

Sitio estático de Todo Diseño Souvenirs (Next.js App Router, `output: export`). Catálogo sin precios; la consulta se cierra por WhatsApp. No hay backend, CMS ni base de datos.

Regla de fondo: la estructura y los componentes son código, la identidad del negocio es configuración.

## Carpetas

- `src/app`: rutas (`/`, `/catalogo`, `/catalogo/[slug]`, `/contacto`, `/sobre-mi`), layout, metadata, sitemap, robots e imagen Open Graph. Solo compone.
- `src/components/ui`: piezas genéricas (botón, slider, select, adornos SVG). No importan `features`, `content` ni `config`.
- `src/components/sections`: header, footer, hero y demás bloques de página. Reciben textos por props.
- `src/features`: lógica de dominio. `catalog` (filtros, búsqueda, paginado), `product` (galería, consulta por WhatsApp), `search` (buscador del header).
- `src/config`: datos del negocio (contacto, horarios, redes, SEO, URL).
- `src/content`: textos y catálogo (`products.content.ts`), tipados con `content.types.ts`.
- `src/theme`: tokens CSS, fuentes y colores de la imagen OG.
- `src/lib`: utilidades chicas (WhatsApp, SEO, loader de imágenes).
- `public/brand`: imágenes de marca originales. `public/_img` lo genera `scripts/optimize-images.mjs` (variantes WebP) en `predev` y `prebuild`; no se edita a mano.

## Cómo fluyen los datos

`app` lee `config` y `content`, y los pasa por props a `sections` y `features`. Las tarjetas de producto se renderizan en el servidor (HTML estático para SEO) y `catalog-browser` solo decide cuáles mostrar según la URL (`?q=`, `categoria`, `destinatario`).

## Tareas comunes

- Nuevo producto: agregar el objeto en `src/content/products.content.ts` y la foto en `public/brand/products/<id>.jpg`.
- Cambiar colores o tipografías: `src/theme/tokens.css` y `src/theme/fonts.ts`. Los componentes usan tokens semánticos (`primary`, `surface`, `foreground`), nunca colores de marca.
- Cambiar teléfono, horarios o redes: `src/config/site.config.ts`.

## Comandos

`bun dev`, `bun run build` (exporta a `out/`), `bun run check` (formato, lint y tipos).
