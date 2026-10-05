import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { MediaImage } from "@/components/ui/media-image";
import type { HeaderContent, SearchContent } from "@/content/content.types";
import {
  SearchDialog,
  type SearchItem,
} from "@/features/search/components/search-dialog";
import { HeaderNav } from "./header-nav";

type HeaderProps = {
  name: string;
  brand: string;
  /** Bajada del logo de texto (solo sin imagen de logo). */
  tagline?: string;
  logo?: { src?: string; alt: string };
  navigation: Array<{ label: string; href: string }>;
  search: {
    items: SearchItem[];
    categories: Array<{ id: string; label: string }>;
    content: SearchContent;
    catalogPath: string;
  };
  instagramHref?: string;
  facebookHref?: string;
  content: HeaderContent;
};

export function Header({
  name,
  brand,
  tagline,
  logo,
  navigation,
  search,
  instagramHref,
  facebookHref,
  content,
}: HeaderProps) {
  return (
    <header className="bg-background/95 border-border sticky top-0 z-40 border-b shadow-sm backdrop-blur">
      <Container className="relative flex min-h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center"
          aria-label={`${name} — ${content.homeLink}`}
        >
          {logo?.src ? (
            <MediaImage
              src={logo.src}
              alt={logo.alt}
              loading="eager"
              sizes="160px"
              className="h-14 w-auto"
            />
          ) : (
            <span className="flex flex-col leading-none">
              <span className="font-heading text-accent-strong text-2xl font-semibold">
                {brand.toLowerCase()}
              </span>
              {tagline ? (
                <span className="text-muted-foreground mt-1 text-[0.6rem] font-bold tracking-[0.3em] uppercase">
                  {tagline}
                </span>
              ) : null}
            </span>
          )}
        </Link>

        <HeaderNav
          navigation={navigation}
          navLabel={content.mainNav}
          mobileNavLabel={content.mobileNav}
          menuLabel={content.openMenu}
          closeLabel={content.closeMenu}
        />

        <div className="flex items-center gap-1">
          <SearchDialog {...search} />
          {facebookHref ? (
            <a
              href={facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${content.socialLabels.facebook} ${content.newTab}`}
              className="text-accent-strong hover:bg-secondary inline-flex size-11 items-center justify-center rounded-full"
            >
              <FacebookIcon className="size-5" />
            </a>
          ) : null}
          {instagramHref ? (
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${content.socialLabels.instagram} ${content.newTab}`}
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
