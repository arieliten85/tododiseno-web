"use client";

import { useId, useState } from "react";
import { MinusIcon, PlusIcon, WhatsAppIcon } from "@/components/ui/icons";
import { buttonVariants } from "@/components/ui/button";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { formatConsultMessage } from "../lib/format-consult-message";

type ConsultCardProps = {
  productName: string;
  productUrl?: string;
  whatsapp?: string;
  unit: string;
  min: number;
  step: number;
  content: {
    title: string;
    hint: string;
    badge: string;
    quantityLabel: string;
    action: string;
  };
  minimumLabel: string;
};

/** Único control de la página de producto: la cantidad. Lo demás se coordina por WhatsApp. */
export function ConsultCard({
  productName,
  productUrl,
  whatsapp,
  unit,
  min,
  step,
  content,
  minimumLabel,
}: ConsultCardProps) {
  const [quantity, setQuantity] = useState(min);
  const quantityId = useId();

  const decrease = () => setQuantity((value) => Math.max(min, value - step));
  const increase = () => setQuantity((value) => value + step);

  const href = createWhatsAppUrl(
    whatsapp,
    formatConsultMessage({
      name: productName,
      quantity,
      unit,
      url: productUrl,
    }),
  );

  return (
    <section
      aria-labelledby={`${quantityId}-title`}
      className="bg-surface border-border rounded-card border p-6 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            id={`${quantityId}-title`}
            className="font-heading text-xl font-semibold"
          >
            {content.title}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">{content.hint}</p>
        </div>
        <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
          {content.badge}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <div
          className="bg-background border-border inline-flex items-center rounded-lg border p-1"
          role="group"
          aria-labelledby={`${quantityId}-label`}
        >
          <span id={`${quantityId}-label`} className="sr-only">
            {content.quantityLabel}
          </span>
          <button
            type="button"
            onClick={decrease}
            disabled={quantity <= min}
            aria-label="Menos"
            className="hover:bg-secondary inline-flex size-10 items-center justify-center rounded-md disabled:opacity-40"
          >
            <MinusIcon className="size-4" />
          </button>
          <output
            aria-live="polite"
            className="min-w-12 text-center text-base font-semibold"
          >
            {quantity}
          </output>
          <button
            type="button"
            onClick={increase}
            aria-label="Más"
            className="hover:bg-secondary inline-flex size-10 items-center justify-center rounded-md"
          >
            <PlusIcon className="size-4" />
          </button>
        </div>
        <span className="text-foreground/80 text-sm">{unit}</span>
      </div>
      <p className="text-muted-foreground mt-2 text-xs">{minimumLabel}</p>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonVariants({ variant: "whatsapp", width: "full" })} mt-5`}
      >
        <WhatsAppIcon className="size-5" />
        {content.action}
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </a>
    </section>
  );
}
