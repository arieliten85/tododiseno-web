import type { SpecItem } from "@/content/content.types";

type AnySpec = SpecItem | { label: string; value: string };

type ProductSpecsProps = {
  title: string;
  /** Specs del vocabulario predefinido (specs) más los libres (extraSpecs), ya mezclados. */
  items: AnySpec[];
  className?: string;
};

/** Grilla de características (papel, terminación, material...): etiqueta + valor. */
export function ProductSpecs({ title, items, className }: ProductSpecsProps) {
  return (
    <section aria-labelledby="specs-title" className={className}>
      <h2
        id="specs-title"
        className="font-heading text-xl font-semibold sm:text-2xl"
      >
        {title}
      </h2>
      <dl className="bg-surface border-border rounded-card mt-4 self-start overflow-hidden border shadow-sm">
        {items.map((spec) => (
          <div
            key={spec.label}
            className="border-border grid grid-cols-[minmax(6.5rem,0.9fr)_1.6fr] border-b last:border-b-0 sm:grid-cols-[14rem_1fr]"
          >
            <dt className="bg-secondary/60 px-4 py-2.5 text-sm font-semibold sm:px-6">
              {spec.label}
            </dt>
            <dd className="text-foreground/90 px-4 py-2.5 text-sm sm:px-6">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
