"use client";

import { useState } from "react";
import { ShareIcon } from "@/components/ui/icons";

type ShareButtonProps = {
  title: string;
  label: string;
  copiedLabel: string;
};

export function ShareButton({ title, label, copiedLabel }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // La clienta canceló el diálogo de compartir: no hay nada que hacer.
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="group text-muted-foreground hover:text-foreground relative inline-flex shrink-0 items-center gap-3 text-[0.7rem] font-bold tracking-[0.15em] whitespace-nowrap uppercase"
    >
      <span className="bg-surface border-border group-hover:bg-secondary inline-flex size-11 items-center justify-center rounded-full border shadow-sm transition-colors">
        <ShareIcon className="size-[1.125rem]" />
      </span>
      {/* En mobile queda solo el ícono; el texto sigue disponible para lectores de pantalla. */}
      <span className="sr-only sm:not-sr-only">{label}</span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
      {copied ? (
        <span
          aria-hidden="true"
          className="bg-foreground text-background absolute top-full right-0 mt-2 rounded-full px-3 py-1.5 text-xs font-semibold tracking-normal normal-case shadow-md"
        >
          {copiedLabel}
        </span>
      ) : null}
    </button>
  );
}
