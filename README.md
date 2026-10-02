# Todo Diseño Souvenirs

Sitio web de Todo Diseño Souvenirs (Lanús Oeste, Buenos Aires): diseño e impresión de souvenirs, deco e impresos personalizados para eventos. Todo es a pedido, sin precios ni carrito: el cierre es una consulta por WhatsApp.

## Stack

Next.js (App Router, exportación estática), React, TypeScript estricto, Tailwind CSS v4, Bun, CVA, clsx y tailwind-merge. Solo front-end, sin backend.

## Comandos

```bash
bun install
bun dev          # optimiza imágenes y levanta el sitio
bun run build    # optimiza imágenes y exporta a ./out (hosting estático)
bun check        # format:check + lint + typecheck
```

## Dónde se edita cada cosa

- **Productos**: `src/content/products.content.ts` (un objeto por producto) y su foto en `public/brand/products/<id>.jpg`. El `slug` es la URL pública: genérico y sin nombres de personajes con licencia.
- **Textos de cada página**: `src/content/*.content.ts`.
- **Datos del negocio** (WhatsApp, dirección, horarios, Instagram): `src/config/site.config.ts`.
- **Colores y tipografías**: `src/theme/tokens.css` y `src/theme/fonts.ts`.
- **Logo**: dejarlo en `public/brand/logo/` y cargar `logo.src` en `site.config.ts`.

## Imágenes

Dejá las fotos originales en `public/brand/**` (JPG, PNG o WebP). `scripts/optimize-images.mjs` genera variantes WebP responsive y un placeholder borroso en `public/_img/` (no se versiona) y las medidas en `src/lib/images/image-meta.generated.json` (sí se versiona). Corre solo antes de `dev` y `build`; se puede forzar con `bun run images`. Los componentes usan `MediaImage`, que envuelve `next/image` con un loader propio para exportación estática.

Las imágenes actuales de `public/brand/**` son provisorias (fondos pastel): reemplazalas conservando el nombre del archivo.

## Arquitectura

Lee `AGENTS.md` y `ARCHITECTURE.md` antes de cambiar estructura o reglas. Resumen: `src/app` compone rutas, `src/config` guarda identidad, `src/content` guarda textos tipados, `src/theme` define tokens y fuentes, `src/components` contiene UI y secciones, `src/features` guarda lógica de dominio (catálogo con filtros y flujo de consulta del producto).

## URL pública

Definí `NEXT_PUBLIC_SITE_URL` en producción para habilitar canonical, sitemap y enlaces absolutos en el mensaje de WhatsApp.
