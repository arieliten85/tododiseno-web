import localFont from "next/font/local";

// self-hosted, no google requests
export const headingFont = localFont({
  src: "./fonts/playfair-display-latin-wght-normal.woff2",
  variable: "--font-heading-family",
  weight: "400 900",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const bodyFont = localFont({
  src: "./fonts/quicksand-latin-wght-normal.woff2",
  variable: "--font-body-family",
  weight: "300 700",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
