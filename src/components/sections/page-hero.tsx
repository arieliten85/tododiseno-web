import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type PageHeroProps = {
  breadcrumb: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  description?: string;
};

/** Encabezado de página interna: ruta, etiqueta, h1 y bajada. */
export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  description,
}: PageHeroProps) {
  return (
    <section className="pt-6 pb-10 sm:pb-14">
      <Container>
        <Breadcrumb items={breadcrumb} />
        <div className="mt-8">
          <p className="bg-secondary text-accent-strong mx-auto mb-5 w-fit rounded-full px-4 py-1.5 text-center text-[0.7rem] font-bold tracking-[0.2em] uppercase">
            {eyebrow}
          </p>
          <SectionHeading as="h1" title={title} description={description} />
        </div>
      </Container>
    </section>
  );
}
