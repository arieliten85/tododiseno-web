import { Container } from "@/components/ui/container";
import { ChatIcon, PaletteIcon, PinIcon } from "@/components/ui/icons";

const icons = { design: PaletteIcon, chat: ChatIcon, pin: PinIcon } as const;

type ValuesStripProps = {
  items: Array<{
    icon: keyof typeof icons;
    title: string;
    description: string;
  }>;
};

export function ValuesStrip({ items }: ValuesStripProps) {
  return (
    <section className="bg-surface border-border border-y py-12">
      <Container>
        <ul className="grid gap-8 sm:grid-cols-3">
          {items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={item.title}
                className="flex flex-col items-center text-center"
              >
                <span className="bg-secondary text-accent-strong mb-4 inline-flex size-12 items-center justify-center rounded-full">
                  <Icon className="size-6" />
                </span>
                <h3 className="font-heading text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-2 max-w-xs text-sm leading-6">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
