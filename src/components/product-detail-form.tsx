"use client";
import { useState } from "react";
import { calculateOrderTotal } from "@/features/order/lib/calculate-order-total";
import { formatOrderMessage } from "@/features/order/lib/format-order-message";
import type { Product } from "@/content/catalog.content";
import { whatsappHref } from "@/config/site.config";

export function ProductDetailForm({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(10); const [color, setColor] = useState(""); const [notes, setNotes] = useState("");
  const order = { items: [{ id: product.slug, name: product.name, quantity }], notes: [color && `Color: ${color}`, notes].filter(Boolean).join(". ") };
  const message = encodeURIComponent(formatOrderMessage(order, calculateOrderTotal(order, "ARS")));
  return <div className="flex flex-col gap-5 rounded-card bg-card p-6 shadow-md"><h2 className="font-heading text-2xl">Personalizá tu pedido</h2><label className="flex flex-col gap-2 text-sm font-bold">Cantidad<input type="number" min="1" value={quantity} onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))} className="min-h-12 rounded-button border border-border bg-background px-4 font-normal outline-none focus:border-primary" /></label>{product.hasColor && <label className="flex flex-col gap-2 text-sm font-bold">Color o paleta<input value={color} onChange={(event) => setColor(event.target.value)} placeholder="Ej: rosa, verde y blanco" className="min-h-12 rounded-button border border-border bg-background px-4 font-normal outline-none focus:border-primary" /></label>}<label className="flex flex-col gap-2 text-sm font-bold">Personalización<textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Nombre, fecha o idea especial" rows={3} className="rounded-card border border-border bg-background px-4 py-3 font-normal outline-none focus:border-primary" /></label><a href={`${whatsappHref}?text=${message}`} target="_blank" rel="noreferrer" className="rounded-button bg-whatsapp px-6 py-4 text-center font-bold text-white transition hover:brightness-95">Consultar por WhatsApp</a></div>;
}
