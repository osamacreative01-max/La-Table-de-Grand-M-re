import { Container } from "@/components/site/primitives";

/**
 * Fallback shown while a dynamic route resolves its params. Keeps the page
 * height stable so navigation does not jump.
 */
export function PageSkeleton() {
  return (
    <main id="main" className="min-h-[70vh]">
      <Container size="wide" className="py-16 md:py-24">
        <div className="h-3 w-24 rounded-full bg-muted" />
        <div className="mt-6 h-10 w-3/4 max-w-xl rounded-lg bg-muted" />
        <div className="mt-4 h-3 w-1/2 max-w-md rounded-full bg-muted" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="aspect-[4/5] rounded-2xl bg-muted" />
          <div className="hidden aspect-[4/5] rounded-2xl bg-muted sm:block" />
          <div className="hidden aspect-[4/5] rounded-2xl bg-muted lg:block" />
        </div>
      </Container>
    </main>
  );
}
