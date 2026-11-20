import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Brand artwork: the grandmother portrait in a wooden roundel, on a brass
 * nameplate. The PNG is generated from `assets/brand/logo-source.png` by
 * `scripts/build-brand-assets.mjs`, which also emits the favicon set.
 */
const logoArt = { src: "/brand/logo.png", width: 192, height: 176 } as const;

export function LogoMark({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={logoArt.src}
      alt=""
      width={logoArt.width}
      height={logoArt.height}
      priority={priority}
      className={cn("w-auto shrink-0", className)}
    />
  );
}

const tones = {
  default: {
    overline: "text-muted-foreground",
    name: "text-foreground",
    tagline: "text-primary",
  },
  inverse: {
    overline: "text-ink-foreground/60",
    name: "text-ink-foreground",
    tagline: "text-mustard",
  },
} as const;

export function Logo({
  className,
  showTagline = false,
  tone = "default",
  priority = false,
}: {
  className?: string;
  showTagline?: boolean;
  tone?: keyof typeof tones;
  priority?: boolean;
}) {
  const styles = tones[tone];

  return (
    <span className={cn("flex items-center gap-2.5 sm:gap-3", className)}>
      <LogoMark className="h-10 sm:h-12" priority={priority} />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span
          className={cn(
            "text-[0.58rem] font-semibold uppercase tracking-[0.22em]",
            styles.overline,
          )}
        >
          La Table de
        </span>
        <span
          className={cn(
            "mt-1 font-heading text-[1.15rem] font-semibold leading-none tracking-[-0.02em] sm:text-[1.3rem]",
            styles.name,
          )}
        >
          Grand-Mère
        </span>
        {showTagline && (
          <span className={cn("mt-1.5 text-[0.56rem] uppercase tracking-[0.22em]", styles.tagline)}>
            Québec · depuis toujours
          </span>
        )}
      </span>
    </span>
  );
}
