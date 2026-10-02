import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-section-lg text-center">
      <p className="text-accent-strong text-xs font-bold tracking-[0.24em] uppercase">
        Error 404
      </p>
      <h1 className="font-heading mt-4 text-4xl font-semibold">
        No encontramos esta página
      </h1>
      <p className="text-muted-foreground mx-auto mt-4 max-w-md">
        Puede que el enlace haya cambiado. Podés volver al inicio o recorrer el
        catálogo.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/">Ir al inicio</Button>
        <Button href="/catalogo/" variant="outline">
          Ver catálogo
        </Button>
      </div>
    </Container>
  );
}
