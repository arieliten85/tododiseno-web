import type { Metadata } from "next";
import type { ReactNode } from "react";
import { bodyFont, headingFont } from "@/theme/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Todo Diseño Souvenirs | Detalles para celebrar", template: "%s | Todo Diseño Souvenirs" },
  description: "Souvenirs, diseño gráfico y detalles personalizados para tus momentos más importantes. Cotizá por WhatsApp en Lanús.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="es" className={`${headingFont.variable} ${bodyFont.variable} h-full scroll-smooth antialiased`}><body className="flex min-h-full flex-col">{children}</body></html>;
}
