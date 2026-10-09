import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/ui/icons";
import { MediaImage } from "@/components/ui/media-image";
import { BuntingEdge } from "@/components/ui/ornaments";

type FooterProps = {
  name: string;
  brand: string;
  /** Bajada del logo de texto (solo sin imagen de logo). */
  tagline?: string;
  logo?: { src?: string; alt: string };
  navigation: Array<{ label: string; href: string }>;
  phone?: string;
  email?: string;
  address?: string;
  hours: Array<{ days: string; ranges: string[] }>;
  instagram?: { label: string; href: string };
  facebook?: { label: string; href: string };
  credit?: { name: string; url?: string };
  content: {
    navigationLabel: string;
    navigationTitle: string;
    contactTitle: string;
    socialTitle: string;
    hoursLabel: string;
    legal: string;
    disclaimer: string;
    credit: string;
    /** Aviso para lectores de pantalla en enlaces que abren pestaña nueva. */
    newTab: string;
    /** Une franjas horarias de un mismo día. */
    rangeSeparator: string;
    socialLabels: { whatsapp: string; instagram: string; facebook: string };
  };
};

export function Footer({
  name,
  brand,
  tagline,
  logo,
  navigation,
  phone,
  email,
  address,
  hours,
  instagram,
  facebook,
  credit,
  content,
}: FooterProps) {
  const itemClass = "flex items-start gap-3";
  const iconClass = "text-accent-strong mt-0.5 size-4 shrink-0";

  return (
    <footer className="bg-muted relative mt-24 pt-14">
      <BuntingEdge className="pointer-events-none absolute inset-x-0 top-0 opacity-40" />
      <Container>
        <div className="grid gap-10 pb-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-[1.2fr_1fr_1.5fr_1fr]">
          <div className="flex justify-center sm:justify-start">
            {logo?.src ? (
              <MediaImage
                src={logo.src}
                alt={logo.alt}
                sizes="160px"
                className="h-14 w-auto"
              />
            ) : (
              <p className="font-heading text-accent-strong text-2xl font-semibold">
                {brand.toLowerCase()}
                {tagline ? (
                  <span className="text-muted-foreground block text-[0.6rem] font-bold tracking-[0.3em] uppercase">
                    {tagline}
                  </span>
                ) : null}
              </p>
            )}
          </div>

          <nav aria-label={content.navigationLabel}>
            <p className="text-muted-foreground mb-4 text-xs font-bold tracking-[0.2em]">
              {content.navigationTitle}
            </p>
            <ul className="space-y-2 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-accent-strong underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-muted-foreground mb-4 text-xs font-bold tracking-[0.2em]">
              {content.contactTitle}
            </p>
            <ul className="mx-auto w-full max-w-[19.5rem] space-y-3 text-left text-sm sm:mx-0 sm:max-w-none">
              {phone ? (
                <li className={itemClass}>
                  <PhoneIcon className={iconClass} />
                  <span>
                    {`${content.socialLabels.whatsapp}: `}
                    {phone}
                  </span>
                </li>
              ) : null}
              {email ? (
                <li className={itemClass}>
                  <MailIcon className={iconClass} />
                  <a href={`mailto:${email}`} className="hover:underline">
                    {email}
                  </a>
                </li>
              ) : null}
              {address ? (
                <li className={itemClass}>
                  <PinIcon className={iconClass} />
                  <span>{address}</span>
                </li>
              ) : null}
              {hours.length > 0 ? (
                <li className={itemClass}>
                  <ClockIcon className={iconClass} />
                  <div>
                    <p>{content.hoursLabel}</p>
                    <ul className="text-foreground/85 mt-1 space-y-0.5">
                      {hours.map((row) => (
                        <li key={row.days}>
                          {row.days} {row.ranges.join(content.rangeSeparator)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : null}
            </ul>
          </div>

          {instagram || facebook ? (
            <div className="space-y-3">
              <p className="text-muted-foreground mb-4 text-xs font-bold tracking-[0.2em]">
                {content.socialTitle}
              </p>
              <div className="mx-auto w-full max-w-[19.5rem] space-y-3 text-left sm:mx-0 sm:max-w-none">
                {instagram ? (
                  <a
                    href={instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm hover:underline"
                  >
                    <InstagramIcon className="text-accent-strong size-4" />
                    <span className="sr-only">{`${content.socialLabels.instagram}: `}</span>
                    {instagram.label}
                    <span className="sr-only"> {content.newTab}</span>
                  </a>
                ) : null}
                {facebook ? (
                  <a
                    href={facebook.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm hover:underline"
                  >
                    <FacebookIcon className="text-accent-strong size-4" />
                    <span className="sr-only">{`${content.socialLabels.facebook}: `}</span>
                    {facebook.label}
                    <span className="sr-only"> {content.newTab}</span>
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <div className="border-border text-muted-foreground space-y-2 border-t py-6 text-center text-xs">
          <p>
            © {new Date().getFullYear()} {name}. {content.legal}
          </p>
          {credit ? (
            <p className="text-muted-foreground pt-1 text-[0.7rem] tracking-wide">
              {content.credit}{" "}
              {credit.url ? (
                <a
                  href={credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-accent-strong font-semibold underline decoration-dotted underline-offset-4 transition-colors"
                >
                  {credit.name}
                  <span className="sr-only"> {content.newTab}</span>
                </a>
              ) : (
                <span className="text-foreground/70 font-semibold">
                  {credit.name}
                </span>
              )}
            </p>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
