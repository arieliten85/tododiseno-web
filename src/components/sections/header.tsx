import Link from "next/link";
import { InstagramIcon, SearchIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { MediaImage } from "@/components/ui/media-image";
import { HeaderNav } from "./header-nav";

type HeaderProps = {
  name: string;
  brand: string;
  logo?: { src?: string; alt: string };
  navigation: Array<{ label: string; href: string }>;
  searchHref: string;
  instagramHref?: string;
};

export function Header({
  name,
  brand,
  logo,
  navigation,
  searchHref,
  instagramHref,
}: HeaderProps) {
  return (
    <header className="bg-background/95 border-border sticky top-0 z-40 border-b shadow-sm backdrop-blur">
      <Container className="relative flex min-h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center"
          aria-label={`${name} — ir al inicio`}
        >
          {logo?.src ? (
            <MediaImage
              src={logo.src}
              alt={logo.alt}
              priority
              sizes="160px"
              className="h-14 w-auto"
            />
          ) : (
            <span className="flex flex-col leading-none">
              <span className="font-heading text-accent-strong text-2xl font-semibold">
                {brand.toLowerCase()}
              </span>
              <span className="text-muted-foreground mt-1 text-[0.6rem] font-bold tracking-[0.3em] uppercase">
                Souvenirs
              </span>
            </span>
          )}
        </Link>

        <HeaderNav
          navigation={navigation}
          menuLabel="Abrir menú"
          closeLabel="Cerrar menú"
        />

        <div className="flex items-center gap-1">
          <Link
            href={searchHref}
            aria-label="Buscar en el catálogo"
            className="text-accent-strong hover:bg-secondary inline-flex size-11 items-center justify-center rounded-full"
          >
            <SearchIcon className="size-5" />
          </Link>
          {instagramHref ? (
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram (se abre en una pestaña nueva)"
              className="text-accent-strong hover:bg-secondary inline-flex size-11 items-center justify-center rounded-full"
            >
              <InstagramIcon className="size-5" />
            </a>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
