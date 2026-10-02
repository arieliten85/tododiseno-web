import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  ClockIcon,
  InstagramIcon,
  MailIcon,
  PinIcon,
  StoreIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { siteConfig } from "@/config/site.config";
import { contactContent as content } from "@/content/contact.content";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escribinos por WhatsApp o visitá el local en Lanús Oeste. Retiro sin cargo y envíos a todo el país.",
  alternates: { canonical: "/contacto/" },
};

const infoIcons = { pickup: StoreIcon, shipping: TruckIcon } as const;

export default function ContactPage() {
  const { contact, business, socials } = siteConfig;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(business.mapQuery ?? business.address ?? "")}&output=embed`;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapQuery ?? business.address ?? "")}`;
  const rowClass =
    "bg-secondary/70 flex items-start gap-4 rounded-lg px-4 py-3";
  const labelClass =
    "text-muted-foreground text-[0.65rem] font-bold tracking-[0.15em] uppercase";
  const iconWrap =
    "bg-surface text-accent-strong inline-flex size-9 shrink-0 items-center justify-center rounded-full";

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Inicio", href: "/" },
          { label: content.breadcrumb },
        ]}
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
      />
      <Container className="pb-section-md">
        <div className="grid gap-8 lg:grid-cols-[26rem_1fr]">
          <section
            aria-labelledby="datos-title"
            className="bg-surface border-border rounded-card border p-6 shadow-md"
          >
            <p className="text-accent-strong text-[0.7rem] font-bold tracking-[0.2em]">
              {content.card.eyebrow}
            </p>
            <h2
              id="datos-title"
              className="font-heading mt-2 text-2xl font-semibold"
            >
              {content.card.title}
            </h2>
            <dl className="mt-6 space-y-3">
              <div className={rowClass}>
                <span className={iconWrap}>
                  <WhatsAppIcon className="size-4" />
                </span>
                <div>
                  <dt className={labelClass}>{content.card.labels.whatsapp}</dt>
                  <dd className="font-semibold">{contact.phoneDisplay}</dd>
                </div>
              </div>
              {socials.instagram ? (
                <div className={rowClass}>
                  <span className={iconWrap}>
                    <InstagramIcon className="size-4" />
                  </span>
                  <div>
                    <dt className={labelClass}>
                      {content.card.labels.instagram}
                    </dt>
                    <dd>
                      <a
                        href={socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline-offset-4 hover:underline"
                      >
                        {contact.instagramHandle}
                        <span className="sr-only">
                          {" "}
                          (se abre en una pestaña nueva)
                        </span>
                      </a>
                    </dd>
                  </div>
                </div>
              ) : null}
              <div className={rowClass}>
                <span className={iconWrap}>
                  <MailIcon className="size-4" />
                </span>
                <div className="min-w-0">
                  <dt className={labelClass}>{content.card.labels.email}</dt>
                  <dd className="font-semibold break-words">
                    <a
                      href={`mailto:${contact.email}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
              </div>
              <div className={rowClass}>
                <span className={iconWrap}>
                  <PinIcon className="size-4" />
                </span>
                <div>
                  <dt className={labelClass}>{content.card.labels.address}</dt>
                  <dd className="font-semibold">{business.address}</dd>
                </div>
              </div>
              <div className={rowClass}>
                <span className={iconWrap}>
                  <ClockIcon className="size-4" />
                </span>
                <div>
                  <dt className={labelClass}>{content.card.labels.hours}</dt>
                  <dd className="font-semibold">
                    <ul>
                      {business.hours.map((row) => (
                        <li key={row.days}>
                          {row.days}: {row.ranges.join(" y ")}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </div>
            </dl>
            <Button
              href={createWhatsAppUrl(
                contact.whatsapp,
                content.card.action.message,
              )}
              variant="whatsapp"
              width="full"
              className="mt-6"
            >
              <WhatsAppIcon className="size-5" />
              {content.card.action.label}
            </Button>
            <p className="text-muted-foreground mt-3 text-center text-xs">
              {content.card.reassurance}
            </p>
          </section>

          <div className="space-y-6">
            <div className="bg-surface border-border rounded-card overflow-hidden border p-3 shadow-md">
              <iframe
                title={content.map.title}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full rounded-xl border-0 sm:h-96"
              />
              <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-2 px-2 pt-3 text-xs">
                <span>{content.map.note}</span>
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-strong font-semibold underline underline-offset-4"
                >
                  {content.map.directions}
                  <span className="sr-only">
                    {" "}
                    (se abre en una pestaña nueva)
                  </span>
                </a>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {content.info.map((item) => {
                const Icon = infoIcons[item.icon];
                return (
                  <li
                    key={item.title}
                    className="bg-surface border-border rounded-card flex gap-4 border p-5 shadow-sm"
                  >
                    <span className="bg-secondary text-accent-strong inline-flex size-11 shrink-0 items-center justify-center rounded-full">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm leading-6">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
}
