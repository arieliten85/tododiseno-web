import { CheckCircleIcon, HeartIcon, NoteIcon } from "@/components/ui/icons";

type ProductNotesProps = {
  title: string;
  closing: string;
  items: string[];
};

// En desktop la página la ubica a la altura de la tabla de Características
// (arriba y abajo); el cierre se apoya al pie cuando se estira.
export function ProductNotes({ title, closing, items }: ProductNotesProps) {
  return (
    <section
      aria-labelledby="notas-title"
      className="bg-paper rounded-card flex w-full flex-col p-5"
    >
      <h2
        id="notas-title"
        className="font-heading flex items-center gap-2 text-lg font-semibold sm:text-xl"
      >
        <NoteIcon className="text-accent-strong size-5 shrink-0" />
        {title}
      </h2>
      <ul className="mt-3 mb-4 flex flex-col gap-2">
        {items.map((note) => (
          <li
            key={note}
            className="text-foreground/75 flex gap-2.5 text-sm leading-relaxed"
          >
            <CheckCircleIcon className="text-accent-strong mt-[0.1rem] size-[1.1rem] shrink-0" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
      <div className="border-primary/60 mt-auto border-t pt-3 text-center">
        <p className="font-heading text-accent-strong inline-flex items-center gap-1.5 text-base italic">
          {closing}
          <HeartIcon
            fill="currentColor"
            className="text-accent-strong size-3.5 shrink-0"
          />
        </p>
        {/* trazo decorativo bajo la frase */}
        <svg
          aria-hidden="true"
          viewBox="0 0 160 10"
          className="text-primary mx-auto mt-1 h-2.5 w-36"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M2 7c40-6 100-7 156-2" />
        </svg>
      </div>
    </section>
  );
}
