import type { SiteConfig } from "@/config/config.types";

export function createLocalBusinessJsonLd(site: SiteConfig) {
  const sameAs = Object.values(site.socials).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    ...(site.url ? { url: site.url } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(site.contact.phoneDisplay
      ? { telephone: site.contact.phoneDisplay }
      : {}),
    ...(site.business.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: site.business.address,
            addressCountry: "AR",
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
