import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  ClockIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/ui/icons";
import { MediaImage } from "@/components/ui/media-image";

type FooterProps = {
  name: string;
  brand: string;
  logo?: { src?: string; alt: string };
  navigation: Array<{ label: string; href: string }>;
  phone?: string;
  email?: string;
  address?: string;
  hours: Array<{ days: string; ranges: string[] }>;
  instagram?: { label: string; href: string };
  content: {
    navigationTitle: string;
    contactTitle: string;
    socialTitle: string;
    hoursLabel: string;
    legal: string;
    disclaimer: string;
  };
};

export function Footer({
  name,
  brand,
  logo,
  navigation,
  phone,
  email,
  address,
  hours,
  instagram,
  content,
}: FooterProps) {
  const itemClass = "flex items-start gap-3";
  const iconClass = "text-accent-strong mt-0.5 size-4 shrink-0";

  return (
    <footer className="bg-muted scallop-top relative mt-24 pt-14">
      <Container>
        <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.5fr_1fr]">
          <div>
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
                <span className="text-muted-foreground block text-[0.6rem] font-bold tracking-[0.3em] uppercase">
                  Souvenirs
                </span>
              </p>
            )}
          </div>

          <nav aria-label="Navegación del pie">
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
            <ul className="space-y-3 text-sm">
              {phone ? (
                <li className={itemClass}>
                  <PhoneIcon className={iconClass} />
                  <span>WhatsApp: {phone}</span>
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
                          {row.days} {row.ranges.join(" y ")}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : null}
            </ul>
          </div>

          {instagram ? (
            <div>
              <p className="text-muted-foreground mb-4 text-xs font-bold tracking-[0.2em]">
                {content.socialTitle}
              </p>
              <a
                href={instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:underline"
              >
                <InstagramIcon className="text-accent-strong size-4" />
                Instagram: {instagram.label}
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </div>
          ) : null}
        </div>

        <div className="border-border text-muted-foreground space-y-2 border-t py-6 text-center text-xs">
          <p>
            © {new Date().getFullYear()} {name}. {content.legal}
          </p>
          <p className="max-w-content-medium mx-auto text-pretty">
            {content.disclaimer}
          </p>
        </div>
      </Container>
    </footer>
  );
}
