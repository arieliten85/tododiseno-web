import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/class-names";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-button px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent-strong",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground hover:bg-primary/40",
        outline:
          "border border-border bg-surface text-surface-foreground hover:bg-secondary",
        whatsapp:
          "bg-whatsapp text-whatsapp-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-md",
      },
      width: {
        auto: "",
        full: "w-full",
      },
    },
    defaultVariants: { variant: "primary", width: "auto" },
  },
);

type ButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  VariantProps<typeof buttonVariants> & {
    href: string;
    children: ReactNode;
  };

/** Enlace con aspecto de botón. Usa next/link para rutas internas. */
export function Button({
  className,
  variant,
  width,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, width }), className);
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}

export { buttonVariants };
