import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Tone } from "@/content/types";

const tones: Record<Tone, { from: string; to: string; accent: string }> = {
  cream: {
    from: "oklch(0.985 0.014 88)",
    to: "oklch(0.938 0.026 82)",
    accent: "oklch(0.72 0.065 78)",
  },
  wheat: {
    from: "oklch(0.962 0.036 90)",
    to: "oklch(0.878 0.06 80)",
    accent: "oklch(0.68 0.085 76)",
  },
  clay: {
    from: "oklch(0.918 0.038 68)",
    to: "oklch(0.808 0.062 52)",
    accent: "oklch(0.60 0.075 44)",
  },
  sage: {
    from: "oklch(0.945 0.026 125)",
    to: "oklch(0.858 0.038 135)",
    accent: "oklch(0.60 0.065 128)",
  },
  honey: {
    from: "oklch(0.955 0.052 88)",
    to: "oklch(0.858 0.082 74)",
    accent: "oklch(0.65 0.095 68)",
  },
  cocoa: {
    from: "oklch(0.822 0.045 56)",
    to: "oklch(0.678 0.05 46)",
    accent: "oklch(0.42 0.045 40)",
  },
  linen: {
    from: "oklch(0.975 0.01 90)",
    to: "oklch(0.925 0.018 86)",
    accent: "oklch(0.72 0.042 82)",
  },
};

/** Food-themed line illustrations for products without photography yet. */
export function FoodIllustration({ tone, accent }: { tone: Tone; accent: string }) {
  const style = { color: accent };

  if (tone === "wheat" || tone === "honey") {
    return (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="absolute left-1/2 top-1/2 w-[58%] max-w-[180px] -translate-x-1/2 -translate-y-1/2 opacity-[0.4]"
        aria-hidden="true" style={style}>
        <ellipse cx="60" cy="72" rx="38" ry="12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M22 62 Q22 32 60 32 Q98 32 98 62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <ellipse cx="60" cy="62" rx="22" ry="7" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
        <path d="M45 28 Q42 22 45 16 Q48 10 45 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <path d="M60 26 Q57 20 60 14 Q63 8 60 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <path d="M75 28 Q72 22 75 16 Q78 10 75 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <circle cx="52" cy="56" r="3.5" fill="currentColor" opacity="0.5"/>
        <circle cx="64" cy="52" r="4" fill="currentColor" opacity="0.45"/>
        <circle cx="70" cy="60" r="3" fill="currentColor" opacity="0.4"/>
        <circle cx="48" cy="62" r="2.5" fill="currentColor" opacity="0.4"/>
      </svg>
    );
  }

  if (tone === "clay" || tone === "cocoa") {
    return (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="absolute left-1/2 top-1/2 w-[52%] max-w-[160px] -translate-x-1/2 -translate-y-1/2 opacity-[0.4]"
        aria-hidden="true" style={style}>
        <rect x="34" y="36" width="52" height="62" rx="6" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="30" y="28" width="60" height="14" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="34" y1="52" x2="86" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <line x1="34" y1="62" x2="86" y2="62" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
        <rect x="40" y="66" width="40" height="22" rx="3" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
        <line x1="45" y1="73" x2="75" y2="73" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <line x1="47" y1="79" x2="73" y2="79" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <line x1="50" y1="85" x2="70" y2="85" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
        <path d="M60 24s-4-2.4-4-4.8a2.2 2.2 0 0 1 4-1.4 2.2 2.2 0 0 1 4 1.4c0 2.4-4 4.8-4 4.8Z"
          fill="currentColor" opacity="0.7"/>
      </svg>
    );
  }

  if (tone === "sage") {
    return (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="absolute left-1/2 top-1/2 w-[58%] max-w-[180px] -translate-x-1/2 -translate-y-1/2 opacity-[0.4]"
        aria-hidden="true" style={style}>
        <path d="M28 44 Q26 60 30 76 Q34 90 60 92 Q86 90 90 76 Q94 60 92 44 Q80 36 60 36 Q40 36 28 44Z"
          stroke="currentColor" strokeWidth="1.5"/>
        <path d="M42 36 Q40 28 46 24 Q52 20 60 22 Q68 20 74 24 Q80 28 78 36"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <ellipse cx="50" cy="62" rx="6" ry="4" transform="rotate(-20 50 62)" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
        <line x1="50" y1="58.5" x2="50" y2="65.5" stroke="currentColor" strokeWidth="0.8" transform="rotate(-20 50 62)" opacity="0.4"/>
        <ellipse cx="66" cy="58" rx="6" ry="4" transform="rotate(15 66 58)" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
        <line x1="66" y1="54.5" x2="66" y2="61.5" stroke="currentColor" strokeWidth="0.8" transform="rotate(15 66 58)" opacity="0.4"/>
        <ellipse cx="58" cy="74" rx="6" ry="4" transform="rotate(-5 58 74)" stroke="currentColor" strokeWidth="1.2" opacity="0.55"/>
        <line x1="58" y1="70.5" x2="58" y2="77.5" stroke="currentColor" strokeWidth="0.8" transform="rotate(-5 58 74)" opacity="0.4"/>
        <ellipse cx="44" cy="76" rx="5" ry="3.5" transform="rotate(25 44 76)" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <ellipse cx="72" cy="72" rx="5" ry="3.5" transform="rotate(-15 72 72)" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      </svg>
    );
  }

  if (tone === "linen" || tone === "cream") {
    return (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="absolute left-1/2 top-1/2 w-[58%] max-w-[180px] -translate-x-1/2 -translate-y-1/2 opacity-[0.4]"
        aria-hidden="true" style={style}>
        <circle cx="60" cy="64" r="34" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="60" cy="64" r="26" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
        <line x1="82" y1="30" x2="78" y2="62" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="80" y1="30" x2="80" y2="38" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
        <line x1="84" y1="30" x2="84" y2="38" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
        <line x1="76" y1="30" x2="76" y2="38" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
        <path d="M60 56 Q66 54 68 60 Q66 68 60 68 Q54 66 54 60 Q56 52 64 50 Q72 48 74 56 Q72 68 62 72 Q52 72 48 64"
          stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.65"/>
        <circle cx="52" cy="72" r="2" fill="currentColor" opacity="0.4"/>
        <circle cx="70" cy="70" r="2" fill="currentColor" opacity="0.35"/>
        <circle cx="64" cy="78" r="1.5" fill="currentColor" opacity="0.35"/>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 top-1/2 w-[58%] max-w-[180px] -translate-x-1/2 -translate-y-1/2 opacity-[0.4]"
      aria-hidden="true" style={style}>
      <circle cx="60" cy="64" r="32" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="60" cy="64" r="24" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
      <path d="M60 56s-7.2-4.4-7.2-9.2a4.1 4.1 0 0 1 7.2-2.7 4.1 4.1 0 0 1 7.2 2.7c0 4.8-7.2 9.2-7.2 9.2Z"
        fill="currentColor" opacity="0.75"/>
      <line x1="84" y1="30" x2="80" y2="62" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="82" y1="30" x2="82" y2="38" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <line x1="86" y1="30" x2="86" y2="38" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <line x1="40" y1="30" x2="40" y2="62" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <ellipse cx="40" cy="26" rx="3.5" ry="4.5" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
    </svg>
  );
}

export const toneStyles = tones;

const ratioClasses = {
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-[16/9]",
} as const;

/**
 * A warm "product stage": real product cut-outs sit on a tinted surface, and
 * products without a photo fall back to a designed pantry label instead of an
 * empty placeholder.
 */
export function MediaFrame({
  src,
  alt,
  tone = "cream",
  caption,
  className,
  imageClassName,
  ratio = "4/5",
  rounded = "rounded-2xl",
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  src?: string;
  alt?: string;
  tone?: Tone;
  /** Used as alt text when `alt` is not provided. */
  caption?: string;
  className?: string;
  imageClassName?: string;
  ratio?: keyof typeof ratioClasses;
  rounded?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const { from, to, accent } = tones[tone];

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        rounded,
        ratioClasses[ratio],
        "ring-1 ring-inset ring-black/[0.06]",
        className,
      )}
      style={{ backgroundImage: `linear-gradient(145deg, ${from}, ${to})` }}
    >
      {/* Soft light from the top-left, matching a studio product shot */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 18% 6%, oklch(1 0 0 / 0.55), transparent 58%), radial-gradient(80% 70% at 90% 96%, oklch(0.35 0.04 45 / 0.10), transparent 60%)",
        }}
      />

      {/* Fine paper grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(118deg, oklch(0.28 0.03 45) 0 1px, transparent 1px 8px)",
        }}
      />

      {src ? (
        <Image
          src={src}
          alt={alt ?? caption ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-contain p-[4%] drop-shadow-[0_16px_22px_rgb(43_33_24/0.16)] transition-transform duration-700 ease-out",
            imageClassName,
          )}
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[8%] h-[76%] w-[62%] -translate-x-1/2 rounded-t-[999px] border"
            style={{ borderColor: accent, opacity: 0.28 }}
          />

          <FoodIllustration tone={tone} accent={accent} />

          <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3 sm:inset-x-6 sm:bottom-5">
            <p className="font-heading text-[0.78rem] leading-tight text-foreground/60 sm:text-[0.9rem]">
              La Table de Grand-Mère
            </p>
            <p className="whitespace-nowrap text-[0.46rem] font-medium uppercase tracking-[0.2em] text-foreground/40 sm:text-[0.52rem]">
              Québec
            </p>
          </div>
        </>
      )}
    </div>
  );
}
