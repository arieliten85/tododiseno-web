import type { NotFoundContent } from "./content.types";

export const notFoundContent = {
  eyebrow: "Error 404",
  title: "No encontramos esta página",
  description:
    "Puede que el enlace haya cambiado. Podés volver al inicio o recorrer el catálogo.",
  primaryAction: { label: "Ir al inicio", href: "/" },
  secondaryAction: { label: "Ver catálogo", href: "/catalogo/" },
} satisfies NotFoundContent;
