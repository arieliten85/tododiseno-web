// Genera variantes responsive (WebP) y un placeholder borroso para cada imagen
// de public/brand/**. Mantener WIDTHS sincronizado con src/lib/images/loader.ts. Los originales no se tocan: se pueden reemplazar o sumar
// fotos nuevas y volver a correr este script (se ejecuta solo en dev y build).
//
//   bun run images
//
// Salida:
//   public/_img/<ruta>/<nombre>-<ancho>.webp  (ignorado por git)
//   src/lib/images/image-meta.generated.json  (dimensiones + blur, versionado)
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = path.join(root, "public", "brand");
const outputDir = path.join(root, "public", "_img");
const metaFile = path.join(
  root,
  "src",
  "lib",
  "images",
  "image-meta.generated.json",
);

const WIDTHS = [320, 480, 640, 960, 1280, 1600, 2000];
const QUALITY = 78;
const SOURCE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    }),
  );
  return files.flat();
}

async function readPreviousMeta() {
  try {
    return JSON.parse(await readFile(metaFile, "utf8"));
  } catch {
    return {};
  }
}

async function main() {
  const previous = await readPreviousMeta();
  const meta = {};
  const files = (await walk(sourceDir)).filter((file) =>
    SOURCE_EXT.has(path.extname(file).toLowerCase()),
  );

  for (const file of files.sort()) {
    const relative = path
      .relative(path.join(root, "public"), file)
      .split(path.sep)
      .join("/");
    const key = `/${relative}`;
    const stem = relative.replace(/^brand\//, "").replace(/\.[^.]+$/, "");
    const { mtimeMs } = await stat(file);
    const cached = previous[key];
    const outBase = path.join(outputDir, stem);

    const image = sharp(file, { failOn: "none" }).rotate();
    const info = await image.metadata();
    const width = info.width ?? 0;
    const height = info.height ?? 0;
    // Siempre se generan todas las variantes de WIDTHS (sin agrandar): así el
    // loader del navegador no necesita conocer las dimensiones de cada foto.
    const variants = WIDTHS;

    const upToDate =
      cached &&
      cached.mtime === Math.round(mtimeMs) &&
      (
        await Promise.all(
          variants.map((w) =>
            stat(`${outBase}-${w}.webp`).then(
              () => true,
              () => false,
            ),
          ),
        )
      ).every(Boolean);

    if (upToDate) {
      meta[key] = cached;
      continue;
    }

    await mkdir(path.dirname(outBase), { recursive: true });
    for (const w of variants) {
      await sharp(file, { failOn: "none" })
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(`${outBase}-${w}.webp`);
    }
    const blurBuffer = await sharp(file, { failOn: "none" })
      .rotate()
      .resize({ width: 16 })
      .webp({ quality: 40 })
      .toBuffer();

    meta[key] = {
      width,
      height,
      variants,
      stem,
      blur: `data:image/webp;base64,${blurBuffer.toString("base64")}`,
      mtime: Math.round(mtimeMs),
    };
    console.log(`optimizada ${key} -> ${variants.length} variantes`);
  }

  await mkdir(path.dirname(metaFile), { recursive: true });
  await writeFile(metaFile, `${JSON.stringify(meta, null, 2)}\n`);
  console.log(`Imágenes listas: ${Object.keys(meta).length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
