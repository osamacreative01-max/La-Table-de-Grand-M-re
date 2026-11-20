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
  alt = "",
}: {
  className?: string;
  priority?: boolean;
  alt?: string;
}) {
  return (
    <Image
      src={logoArt.src}
      alt={alt}
      width={logoArt.width}
      height={logoArt.height}
      priority={priority}
      className={cn("w-auto shrink-0", className)}
    />
  );
}

/** The badge on its own — the wordmark lives in the page copy, not the mark. */
export function Logo({
  className,
  priority = false,
  alt = "",
}: {
  className?: string;
  priority?: boolean;
  alt?: string;
}) {
  return <LogoMark alt={alt} priority={priority} className={cn("h-20 sm:h-24", className)} />;
}
