import { WhatsAppIcon } from "@/components/ui/icons";

export function WhatsAppFloat({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="bg-whatsapp text-whatsapp-foreground fixed right-4 bottom-4 z-50 inline-flex size-14 items-center justify-center rounded-full shadow-lg transition-transform hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
