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

type Social = {
  id: string;
  href: string;
  label: string;
  Icon: typeof FacebookIcon;
};

/** Iconos de redes del header de escritorio. */
function SocialIconLinks({
  socials,
  newTab,
}: {
  socials: Social[];
  newTab: string;
}) {
  return socials.map((social) => (
    <a
      key={social.id}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${social.label} ${newTab}`}
      className="text-accent-strong hover:bg-secondary hidden size-11 items-center justify-center rounded-full md:inline-flex"
    >
      <social.Icon className="size-5" />
    </a>
  ));
}

/** Redes dentro del menú móvil. */
function SocialPills({
  socials,
  newTab,
}: {
  socials: Social[];
  newTab: string;
}) {
  if (socials.length === 0) return null;
  return (
    <ul className="border-border flex gap-3 border-t px-5 py-4">
      {socials.map((social) => (
        <li key={social.id}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.label} ${newTab}`}
            className="text-accent-strong border-border hover:bg-secondary inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium"
          >
            <social.Icon className="size-5" />
            {social.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

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
  // Las redes viven en el menú móvil (más aire en el header) y como iconos en escritorio.
  const socials: Social[] = [
    {
      id: "facebook",
      href: facebookHref,
      label: content.socialLabels.facebook,
      Icon: FacebookIcon,
    },
    {
      id: "instagram",
      href: instagramHref,
      label: content.socialLabels.instagram,
      Icon: InstagramIcon,
    },
  ].flatMap((social) =>
    social.href ? [{ ...social, href: social.href }] : [],
  );

  return (
    <header className="bg-background/95 border-border sticky top-0 z-40 border-b shadow-sm backdrop-blur">
      <Container className="relative grid min-h-20 grid-cols-[1fr_auto_1fr] items-center gap-4 md:flex md:justify-between md:gap-6">
        <Link
          href="/"
          className="col-start-2 row-start-1 flex items-center justify-self-center md:justify-self-auto"
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
          actions={
            <div className="col-start-1 row-start-1 -ml-3 flex items-center gap-1 justify-self-start md:ml-0 md:justify-self-auto">
              <SearchDialog {...search} />
              <SocialIconLinks socials={socials} newTab={content.newTab} />
            </div>
          }
          mobileFooter={
            <SocialPills socials={socials} newTab={content.newTab} />
          }
        />
      </Container>
    </header>
  );
}
