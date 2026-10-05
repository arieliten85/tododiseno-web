import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { notFoundContent as content } from "@/content/not-found.content";

export default function NotFound() {
  return (
    <Container className="py-section-lg text-center">
      <p className="text-accent-strong text-xs font-bold tracking-[0.24em] uppercase">
        {content.eyebrow}
      </p>
      <h1 className="font-heading mt-4 text-4xl font-semibold">
        {content.title}
      </h1>
      <p className="text-muted-foreground mx-auto mt-4 max-w-md">
        {content.description}
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href={content.primaryAction.href}>
          {content.primaryAction.label}
        </Button>
        <Button href={content.secondaryAction.href} variant="outline">
          {content.secondaryAction.label}
        </Button>
      </div>
    </Container>
  );
}
