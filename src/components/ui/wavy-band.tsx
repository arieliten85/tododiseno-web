import type { ReactNode } from "react";
import { BandWaveBottom, BandWaveTop } from "@/components/ui/ornaments";

/**
 * Franja de color con bordes ondulados arriba y abajo (el fondo "ondulado"
 * del diseño). El relleno central es opaco para que no se vea ninguna
 * costura entre las ondas y el cuerpo.
 */
export function WavyBand({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <BandWaveTop className="text-band -mb-px block h-[clamp(1.25rem,3.75vw,3rem)] w-full" />
      <div className="bg-band">{children}</div>
      <BandWaveBottom className="text-band -mt-px block h-[clamp(1.25rem,4vw,3.2rem)] w-full" />
    </div>
  );
}
