import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/site/primitives";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({
  items,
  label,
}: {
  items: Crumb[];
  label: string;
}) {
  return (
    <nav aria-label={label} className="border-b border-border/60 bg-background/60">
      <Container className="flex flex-wrap items-center gap-1 py-4 text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="rounded-sm underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className="text-foreground/80">
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight className="size-3.5 opacity-50" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
