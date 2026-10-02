"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { cn } from "@/lib/class-names";

type HeaderNavProps = {
  navigation: Array<{ label: string; href: string }>;
  menuLabel: string;
  closeLabel: string;
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Único bloque interactivo del header: marca la página activa y el menú móvil. */
export function HeaderNav({
  navigation,
  menuLabel,
  closeLabel,
}: HeaderNavProps) {
  const pathname = usePathname();
  // El menú queda abierto solo para la ruta en la que se abrió: al navegar se cierra solo.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
        {navigation.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "hover:text-accent-strong border-b-2 py-1 text-sm font-medium transition-colors",
                active
                  ? "border-accent text-foreground"
                  : "text-foreground/80 border-transparent",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        className="text-foreground hover:bg-secondary inline-flex size-11 items-center justify-center rounded-full md:hidden"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : menuLabel}
        onClick={() => setOpenPath(open ? null : pathname)}
      >
        {open ? (
          <CloseIcon className="size-6" />
        ) : (
          <MenuIcon className="size-6" />
        )}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="border-border bg-background absolute inset-x-0 top-full border-b shadow-md md:hidden"
      >
        <nav aria-label="Principal móvil" className="flex flex-col px-5 py-3">
          {navigation.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "min-h-11 rounded-md px-3 py-3 text-base font-medium",
                  active
                    ? "bg-secondary text-foreground"
                    : "text-foreground/80",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
