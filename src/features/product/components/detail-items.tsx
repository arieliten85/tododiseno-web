import { CheckCircleIcon } from "@/components/ui/icons";
import { Ornament } from "@/components/ui/ornament";
import type { DetailItem } from "@/content/content.types";

type DetailItemsProps = {
  items: DetailItem[];
  listTitle: string;
  textTitle: string;
  description: string;
  unitLabel: (quantity: number) => string;
};

/** 2+ ítems => lista "Qué incluye"; 1 ítem => párrafo "Detalle". */
export function DetailItems({
  items,
  listTitle,
  textTitle,
  description,
  unitLabel,
}: DetailItemsProps) {
  const isList = items.length > 1;

  return (
    <section
      aria-labelledby="detalle-title"
      className="bg-surface border-border rounded-card border px-6 py-10 shadow-sm sm:px-10"
    >
      <div className="text-center">
        <Ornament className="mx-auto mb-4" />
        <h2 id="detalle-title" className="font-heading text-3xl font-semibold">
          {isList ? listTitle : textTitle}
        </h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-sm">
          {description}
        </p>
      </div>

      {isList ? (
        <ul className="mt-10 grid gap-x-12 sm:grid-cols-2">
          {items.map((entry) => (
            <li
              key={entry.item}
              className="border-border border-b py-4 last:border-b-0"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="flex items-start gap-3 text-sm font-medium">
                  <CheckCircleIcon className="text-accent mt-0.5 size-5 shrink-0" />
                  <span>
                    {entry.item}
                    {entry.size ? (
                      <span className="text-muted-foreground font-normal">
                        {" "}
                        ({entry.size})
                      </span>
                    ) : null}
                  </span>
                </p>
                <span className="text-foreground/80 shrink-0 text-sm">
                  {unitLabel(entry.quantity)}
                </span>
              </div>
              {entry.note ? (
                <p className="text-muted-foreground mt-1 pl-8 text-xs italic">
                  {entry.note}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mx-auto mt-8 max-w-2xl text-center leading-7">
          {items[0]?.item}
          {items[0]?.size ? `, ${items[0].size}` : ""}
          {items[0]?.note ? `. ${items[0].note}` : ""}.
        </p>
      )}
    </section>
  );
}
