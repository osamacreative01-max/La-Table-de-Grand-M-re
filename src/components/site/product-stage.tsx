import Image from "next/image";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lang } from "@/content/types";

/**
 * Editorial product composition used in hero areas. The cans are studio shots
 * on white, so `mix-blend-multiply` lets them sit on the warm panel and overlap
 * each other without white boxes.
 */
export function ProductStage({
  lang,
  className,
  priority = false,
}: {
  lang: Lang;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="relative aspect-[5/6] w-full overflow-hidden rounded-[2.25rem] bg-grain-rich shadow-[0_48px_96px_-56px_rgba(72,48,28,0.65)] ring-1 ring-brand/15">
        {/* Warm arch */}
        <div
          aria-hidden="true"
          className="absolute left-[13%] top-[9%] h-[74%] w-[74%] rounded-t-[999px] border border-b-0 border-brand/25 bg-brand-soft/35"
        />

        {/* Dotted texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-dots opacity-40"
        />

        {/* Ground shadow */}
        <div
          aria-hidden="true"
          className="absolute bottom-[16%] left-1/2 h-[5%] w-[66%] -translate-x-1/2 rounded-[50%] bg-[oklch(0.35_0.04_45/0.16)] blur-xl"
        />

        <Image
          src="/products/mixed-vegetables.webp"
          alt={lang === "fr" ? "Légumes mélangés en conserve" : "Canned mixed vegetables"}
          width={1029}
          height={1277}
          sizes="(min-width: 1024px) 22vw, 40vw"
          className="absolute left-[-3%] top-[27%] h-auto w-[46%] -rotate-6 mix-blend-multiply"
        />

        <Image
          src="/products/red-kidney-beans.webp"
          alt={lang === "fr" ? "Haricots rouges en conserve" : "Canned red kidney beans"}
          width={1029}
          height={1277}
          sizes="(min-width: 1024px) 21vw, 38vw"
          className="absolute right-[-3%] top-[29%] h-auto w-[44%] rotate-6 mix-blend-multiply"
        />

        <Image
          src="/products/san-marzano.webp"
          alt={lang === "fr" ? "Tomates San Marzano en conserve" : "Canned San Marzano tomatoes"}
          width={1029}
          height={1277}
          sizes="(min-width: 1024px) 28vw, 55vw"
          priority={priority}
          className="absolute left-[21%] top-[5%] h-auto w-[58%] mix-blend-multiply drop-shadow-[0_24px_30px_rgba(72,48,28,0.18)]"
        />
      </div>

      {/* Floating chips */}
      <div className="absolute -left-3 top-[8%] hidden items-center gap-2 rounded-2xl border border-border/70 bg-card/90 px-3.5 py-2.5 shadow-xl shadow-black/10 backdrop-blur-sm sm:flex">
        <span className="flex size-8 items-center justify-center rounded-xl bg-brand-soft text-brand-foreground">
          <Sparkles className="size-4" aria-hidden="true" />
        </span>
        <span className="leading-tight">
          <span className="block font-heading text-base leading-none">7</span>
          <span className="text-[0.55rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {lang === "fr" ? "Gammes" : "Ranges"}
          </span>
        </span>
      </div>

      <div className="absolute -right-3 bottom-[9%] hidden max-w-[12.5rem] rounded-2xl border border-brand/30 bg-card/95 px-4 py-3 shadow-xl shadow-black/10 backdrop-blur-sm sm:block">
        <div className="mb-1.5 flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
          <span className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {lang === "fr" ? "Depuis toujours" : "Always been here"}
          </span>
        </div>
        <p className="font-heading text-[0.95rem] leading-snug">
          {lang === "fr" ? "Le goût de se retrouver." : "The Taste of Coming Together."}
        </p>
      </div>
    </div>
  );
}
