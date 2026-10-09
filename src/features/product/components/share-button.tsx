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
      className="text-muted-foreground hover:text-foreground inline-flex min-h-11 items-center gap-2 text-[0.7rem] font-bold tracking-[0.15em] uppercase"
    >
      <span className="bg-surface border-border inline-flex size-9 items-center justify-center rounded-full border shadow-sm">
        <ShareIcon className="size-4" />
      </span>
      {label}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
      {copied ? (
        <span
          aria-hidden="true"
          className="text-accent-strong tracking-normal normal-case"
        >
          {copiedLabel}
        </span>
      ) : null}
    </button>
  );
}
