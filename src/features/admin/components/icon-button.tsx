import type { ReactNode } from "react";

type Props = {
  label: string;
  onClick: () => void;
  danger?: boolean;
  children: ReactNode;
};

// Los paths son el contenido del <svg> (24×24, trazo).
export function IconButton({ label, onClick, danger, children }: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`inline-flex size-10 items-center justify-center rounded-md border border-[#d1d5db] bg-white ${
        danger ? "text-[#dc2626]" : "text-[#111]"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </button>
  );
}
