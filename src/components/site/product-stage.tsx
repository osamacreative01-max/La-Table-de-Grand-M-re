import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Lang } from "@/content/types";

/**
 * Hero product composition: three studio cans overlapping on a large organic
 * sand blob. The product images ship with a transparent background, so they
 * overlap cleanly and cast real CSS shadows.
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
    <div className={cn("relative mx-auto w-full max-w-[560px]", className)}>
      <div className="relative aspect-square w-full">
        {/* Organic sand blob */}
        <div
          aria-hidden="true"
          className="absolute inset-[4%] bg-sand"
          style={{ borderRadius: "58% 42% 47% 53% / 50% 44% 56% 50%" }}
        />

        {/* Warm inner glow */}
        <div
          aria-hidden="true"
          className="absolute inset-[4%] bg-[radial-gradient(circle_at_50%_38%,rgb(255_255_255/0.55),transparent_62%)]"
          style={{ borderRadius: "58% 42% 47% 53% / 50% 44% 56% 50%" }}
        />

        {/* Ground shadow */}
        <div
          aria-hidden="true"
          className="absolute bottom-[13%] left-1/2 h-[7%] w-[60%] -translate-x-1/2 rounded-[50%] bg-[rgb(43_33_24/0.16)] blur-2xl"
        />

        {/* Back left can */}
        <Image
          src="/products/mixed-vegetables.webp"
          alt={lang === "fr" ? "Légumes mélangés en conserve" : "Canned mixed vegetables"}
          width={1029}
          height={1277}
          sizes="(min-width: 1024px) 18vw, 34vw"
          className="absolute left-[4%] top-[26%] h-auto w-[39%] -rotate-[8deg] drop-shadow-[0_20px_24px_rgb(43_33_24/0.18)]"
        />

        {/* Back right can */}
        <Image
          src="/products/red-kidney-beans.webp"
          alt={lang === "fr" ? "Haricots rouges en conserve" : "Canned red kidney beans"}
          width={1029}
          height={1277}
          sizes="(min-width: 1024px) 18vw, 34vw"
          className="absolute right-[4%] top-[28%] h-auto w-[38%] rotate-[8deg] drop-shadow-[0_20px_24px_rgb(43_33_24/0.18)]"
        />

        {/* Front hero can */}
        <Image
          src="/products/san-marzano.webp"
          alt={
            lang === "fr"
              ? "Tomates San Marzano en conserve"
              : "Canned San Marzano tomatoes"
          }
          width={1029}
          height={1277}
          sizes="(min-width: 1024px) 26vw, 48vw"
          priority={priority}
          className="absolute left-1/2 top-[9%] h-auto w-[50%] -translate-x-1/2 drop-shadow-[0_18px_28px_rgb(43_33_24/0.18)]"
        />

        {/* Round range badge */}
        <div className="absolute right-[2%] top-[4%] flex size-[86px] flex-col items-center justify-center rounded-full border border-primary/15 bg-card text-center shadow-soft sm:size-[104px]">
          <span className="font-heading text-[1.6rem] font-semibold leading-none text-primary sm:text-[1.9rem]">
            7
          </span>
          <span className="mt-0.5 text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[0.58rem]">
            {lang === "fr" ? "gammes" : "ranges"}
          </span>
        </div>

        {/* Small quality seal */}
        <div className="absolute bottom-[7%] left-[3%] flex items-center gap-2 rounded-full border border-border bg-card/95 py-1.5 pl-1.5 pr-3 shadow-soft">
          <span
            aria-hidden="true"
            className="flex size-6 items-center justify-center rounded-full bg-olive text-[0.6rem] font-bold text-cream"
          >
            Qc
          </span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-foreground/70">
            {lang === "fr" ? "Québec, Canada" : "Québec, Canada"}
          </span>
        </div>
      </div>
    </div>
  );
}
