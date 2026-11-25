import Image from "next/image";
import { cn } from "@/lib/utils";
import { categories } from "@/content/catalog";
import type { Lang } from "@/content/types";

/** Whitewashed brick, matching the packaging mockups from the client. */
const brickPattern =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='40'%3E%3Crect width='72' height='40' fill='%23fbf6ec'/%3E%3Cpath d='M0 39.5H72M0 0.5H72M36 0.5V19.5M0 20.5V39.5M72 20.5V39.5' stroke='%23e7dac5' stroke-width='1'/%3E%3C/svg%3E\")";

/**
 * Hero product composition: three cans in the client's pack style standing in
 * a whitewashed brick arch, with a gold bevel and real CSS shadows.
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
  const alt = (fr: string, en: string) => (lang === "fr" ? fr : en);

  return (
    <div className={cn("relative mx-auto w-full max-w-[560px]", className)}>
      <div className="relative aspect-square w-full">
        {/* Brick arch with a wooden table edge, as on the packaging */}
        <div className="absolute inset-[2%] overflow-hidden rounded-t-full rounded-b-[2rem] border border-gold/45 bg-cream shadow-[inset_0_2px_40px_rgb(72_48_28/0.10)]">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-90"
            style={{ backgroundImage: brickPattern, backgroundSize: "72px 40px" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgb(255_255_255/0.5),transparent_62%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[21%] border-t border-gold/50 bg-[linear-gradient(to_bottom,#c99b6c,#9c6a40)]"
          >
            <div className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(94deg,rgb(74_44_24/0.55)_0_1px,transparent_1px_7px)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(255_255_255/0.16),transparent_45%,rgb(44_26_14/0.22))]" />
          </div>
        </div>

        {/* Gold inner bevel */}
        <div
          aria-hidden="true"
          className="absolute inset-[5.5%] rounded-t-full rounded-b-[1.6rem] border border-gold/55"
        />

        {/* Ground shadow */}
        <div
          aria-hidden="true"
          className="absolute bottom-[8%] left-1/2 h-[6%] w-[64%] -translate-x-1/2 rounded-[50%] bg-[rgb(43_33_24/0.22)] blur-2xl"
        />

        {/* Back left can */}
        <Image
          src="/products/pineapple-chunks.webp"
          alt={alt("Ananas en morceaux en conserve", "Canned pineapple chunks")}
          width={690}
          height={1000}
          sizes="(min-width: 1024px) 14vw, 30vw"
          className="absolute left-[5%] top-[34%] h-auto w-[33%] -rotate-[7deg] drop-shadow-[0_20px_22px_rgb(43_33_24/0.22)]"
        />

        {/* Back right can */}
        <Image
          src="/products/fruit-cocktail.webp"
          alt={alt("Salade de fruits en conserve", "Canned fruit cocktail")}
          width={685}
          height={1000}
          sizes="(min-width: 1024px) 14vw, 30vw"
          className="absolute right-[5%] top-[36%] h-auto w-[32%] rotate-[7deg] drop-shadow-[0_20px_22px_rgb(43_33_24/0.22)]"
        />

        {/* Front hero can */}
        <Image
          src="/products/peach-halves.webp"
          alt={alt("Pêches en moitiés en conserve", "Canned peach halves")}
          width={687}
          height={1000}
          sizes="(min-width: 1024px) 22vw, 42vw"
          priority={priority}
          className="absolute left-1/2 top-[13%] h-auto w-[46%] -translate-x-1/2 drop-shadow-[0_22px_30px_rgb(43_33_24/0.24)]"
        />

        {/* Round range badge */}
        <div className="absolute right-[1%] top-[3%] flex size-[86px] flex-col items-center justify-center rounded-full border border-gold/60 bg-card text-center shadow-soft sm:size-[104px]">
          <span className="font-heading text-[1.6rem] font-semibold leading-none text-primary sm:text-[1.9rem]">
            {categories.length}
          </span>
          <span className="mt-0.5 text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[0.58rem]">
            {lang === "fr" ? "gammes" : "ranges"}
          </span>
        </div>

        {/* Small origin seal */}
        <div className="absolute bottom-[5%] left-[2%] flex items-center gap-2 rounded-full border border-gold/50 bg-card/95 py-1.5 pl-1.5 pr-3 shadow-soft">
          <span
            aria-hidden="true"
            className="flex size-6 items-center justify-center rounded-full bg-primary text-[0.6rem] font-bold text-primary-foreground"
          >
            Qc
          </span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-foreground/70">
            {lang === "fr" ? "Grand-Mère, Québec" : "Grand-Mère, Québec"}
          </span>
        </div>
      </div>
    </div>
  );
}
