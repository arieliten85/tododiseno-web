/**
 * Colores de la imagen Open Graph. ImageResponse (next/og) no lee variables
 * CSS, así que los valores se repiten acá a mano en lugar de salir de
 * tokens.css. Hoy solo foreground coincide con su token (--foreground);
 * background y accent son tonos propios de la imagen y no siguen a
 * --background ni a --accent. Si cambia la marca, revisarlos acá también.
 */
export const ogTheme = {
  colors: {
    background: "#fdf8f3",
    foreground: "#2e241e",
    accent: "#c98a83",
  },
} as const;
