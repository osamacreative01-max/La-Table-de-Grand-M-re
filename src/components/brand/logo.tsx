import { cn } from "@/lib/utils";

/**
 * Brand mark: a stylized table setting — an elegant plate with a fork and
 * spoon framing it, in an artisanal round-badge composition.
 * Replace with the owner's logo file when supplied.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      role="img"
      aria-hidden="true"
      className={cn("size-10", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle cx="28" cy="28" r="26.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Inner ring */}
      <circle cx="28" cy="28" r="21" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />

      {/* Plate */}
      <circle cx="28" cy="28" r="13.5" stroke="currentColor" strokeWidth="1.1" opacity="0.75" />
      <circle cx="28" cy="28" r="10" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />

      {/* Fork — left side */}
      <line x1="13.5" y1="18" x2="13.5" y2="40" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />
      <line x1="15" y1="18" x2="15" y2="22" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />

      {/* Spoon — right side */}
      <line x1="42.5" y1="26" x2="42.5" y2="40" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      <ellipse cx="42.5" cy="22" rx="3" ry="4" stroke="currentColor" strokeWidth="1" opacity="0.65" />

      {/* Heart / warmth accent on plate */}
      <path
        d="M28 34s-5.2-3.2-5.2-6.6a2.95 2.95 0 0 1 5.2-1.95 2.95 2.95 0 0 1 5.2 1.95C33.2 30.8 28 34 28 34Z"
        fill="currentColor"
        opacity="0.85"
      />

      {/* Top decorative dots */}
      <circle cx="28" cy="8" r="1.1" fill="currentColor" opacity="0.3" />
      <circle cx="23.5" cy="9.2" r="0.75" fill="currentColor" opacity="0.2" />
      <circle cx="32.5" cy="9.2" r="0.75" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export function Logo({
  className,
  showTagline = false,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5 sm:gap-3", className)}>
      <LogoMark className="size-9 shrink-0 text-primary sm:size-11" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          La Table de
        </span>
        <span className="mt-1 font-heading text-[1.15rem] font-semibold leading-none tracking-[-0.02em] text-foreground sm:text-[1.3rem]">
          Grand-Mère
        </span>
        {showTagline && (
          <span className="mt-1.5 text-[0.56rem] uppercase tracking-[0.22em] text-primary">
            Québec · depuis toujours
          </span>
        )}
      </span>
    </span>
  );
}
