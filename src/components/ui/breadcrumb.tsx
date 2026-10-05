import Link from "next/link";
import type { ReactNode } from "react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
  /** Ícono decorativo antes de la etiqueta (por ejemplo, la casita de Inicio). */
  icon?: ReactNode;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="text-sm">
      <ol className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-2"
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-foreground font-medium" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? <span aria-hidden="true">›</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
