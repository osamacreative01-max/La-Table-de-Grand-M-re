import Image from "next/image";
import { MediaFrame } from "@/components/site/media-frame";
import { Container, Eyebrow } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import type { Tone } from "@/content/types";

export type PageHeroImage =
  /** A photograph, cropped to fill its frame. */
  | { kind: "photo"; src: string; alt: string; position?: string }
  /** A product cut-out, shown whole on its tinted stage. */
  | { kind: "product"; src?: string; alt: string; tone: Tone };

/**
 * The page header every inner page shares: the logo's nameplate colours
 * (forest green, gold lettering) with the page's picture beside the text.
 */
export function PageHero({
  eyebrow,
  title,
  kicker,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  kicker?: string;
  image?: PageHeroImage;
  /** Extra content under the title: a paragraph, a button, a count. */
  children?: React.ReactNode;
}) {
  return (
    <section className="theme-forest bg-background">
      <Container size="wide" className="py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
          <div className={cn(image ? "lg:col-span-6 lg:pr-10" : "lg:col-span-9")}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-5 text-[2.6rem] leading-[1.04] tracking-[-0.02em] text-gold-light sm:text-6xl lg:text-[4.25rem]">
              {title}
            </h1>
            {kicker && (
              <p className="mt-5 font-heading text-[1.35rem] leading-snug text-foreground sm:text-[1.65rem]">
                {kicker}
              </p>
            )}
            {children && (
              <div className="mt-6 text-[1.05rem] leading-relaxed text-muted-foreground sm:text-lg">
                {children}
              </div>
            )}
          </div>

          {image && (
            <div className="lg:col-span-6">
              <div className="rounded-[2rem] border border-gold/45 p-2.5">
                {image.kind === "photo" ? (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 46vw, 92vw"
                      className="object-cover"
                      style={image.position ? { objectPosition: image.position } : undefined}
                    />
                  </div>
                ) : (
                  <MediaFrame
                    src={image.src}
                    alt={image.alt}
                    tone={image.tone}
                    ratio="4/3"
                    rounded="rounded-[1.6rem]"
                    priority
                    sizes="(min-width: 1024px) 46vw, 92vw"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
