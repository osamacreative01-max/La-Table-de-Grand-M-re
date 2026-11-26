"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

export type HeroSlide = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  /** dark: cream text over the image's dark side. light: ink text over its pale side. */
  theme: "dark" | "light";
  /** Which side of the image is empty enough to hold the text. */
  align: "left" | "right";
  /** CSS object-position, so the subject stays in frame on narrow screens. */
  focus: string;
};

const AUTOPLAY_MS = 7000;
const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSlider({
  slides,
  labels,
}: {
  slides: HeroSlide[];
  labels: { region: string; previous: string; next: string; pause: string; play: string; goTo: string };
}) {
  const reduce = useReducedMotion();
  // `previous` stays fully opaque underneath while `active` fades in on top,
  // so a crossfade never dips through to the section background.
  const [{ active, previous }, setSlides] = useState({ active: 0, previous: 0 });
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback(
    (next: number) =>
      setSlides((state) => {
        const target = (next + count) % count;
        return target === state.active ? state : { active: target, previous: state.active };
      }),
    [count],
  );

  const running = !paused && !hovered && !reduce;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => go(active + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [running, active, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={labels.region}
      className="relative isolate -mt-[97px] h-svh min-h-[640px] overflow-hidden bg-ink lg:-mt-[113px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovered(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(active - 1);
        if (event.key === "ArrowRight") go(active + 1);
      }}
      onPointerDown={(event) => {
        pointerStart.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const delta = event.clientX - pointerStart.current;
        pointerStart.current = null;
        if (Math.abs(delta) > 60) go(delta < 0 ? active + 1 : active - 1);
      }}
    >
      <div aria-live={running ? "off" : "polite"} className="absolute inset-0">
        {slides.map((slide, index) => {
          const isActive = index === active;
          const Heading = index === 0 ? "h1" : "h2";
          const dark = slide.theme === "dark";

          return (
            <motion.div
              key={slide.image}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${count}`}
              aria-hidden={!isActive}
              inert={!isActive}
              initial={false}
              animate={{ opacity: isActive || index === previous ? 1 : 0 }}
              transition={{ duration: reduce || !isActive ? 0 : 1.1, ease }}
              className={cn(
                "absolute inset-0",
                dark ? "theme-forest bg-ink" : "bg-background",
                isActive ? "z-10" : index === previous ? "z-[5]" : "invisible z-0",
              )}
            >
              {/* Phones: the photo fills the top half and the text sits on the slide's own colour
                  below it. Desktop: the photo fills the slide. The frame stays still and clips;
                  only the photo inside it zooms, so nothing runs past the hero. The legibility
                  scrim lives inside the frame too. */}
              <div
                className={cn(
                  "absolute inset-x-0 top-[97px] h-[46%] overflow-hidden lg:inset-y-0 lg:top-0 lg:h-full",
                  // Desktop: the text sits on the slide's solid colour and the photo fills the other side.
                  slide.align === "left" ? "lg:left-[42%]" : "lg:right-[42%]",
                )}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={{ scale: isActive && !reduce ? 1 : 1.08 }}
                  transition={{ duration: isActive ? AUTOPLAY_MS / 1000 + 1.5 : 0, ease: "linear" }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectPosition: slide.focus }}
                  />
                </motion.div>
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0",
                    dark
                      ? "bg-[linear-gradient(0deg,var(--ink)_6%,color-mix(in_oklab,var(--ink)_80%,transparent)_26%,transparent_64%)]"
                      : "bg-[linear-gradient(0deg,var(--background)_6%,color-mix(in_oklab,var(--background)_80%,transparent)_26%,transparent_64%)]",
                    dark && slide.align === "left" &&
                      "lg:bg-[linear-gradient(90deg,var(--ink)_0%,transparent_32%)]",
                    !dark && slide.align === "right" &&
                      "lg:bg-[linear-gradient(270deg,var(--background)_0%,transparent_32%)]",
                  )}
                />
              </div>

              <Container
                size="wide"
                className={cn(
                  "relative flex h-full items-end pb-28 pt-[137px] sm:pb-36 lg:items-center lg:pb-24 lg:pt-[153px]",
                  slide.align === "right" && "lg:justify-end",
                )}
              >
                <motion.div
                  className={cn("max-w-[34rem]", dark ? "text-ink-foreground" : "text-foreground")}
                  initial={false}
                  animate={isActive ? "in" : "out"}
                  variants={{
                    in: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.35 } },
                    out: {},
                  }}
                >
                  <motion.p
                    variants={textVariants(reduce)}
                    className={cn(
                      "flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.14em]",
                      dark ? "text-ink-foreground/80" : "text-primary",
                    )}
                  >
                    <span aria-hidden="true" className="h-px w-8 bg-current opacity-70" />
                    {slide.eyebrow}
                  </motion.p>
                  <motion.div variants={textVariants(reduce)}>
                    <Heading
                      className={cn(
                        "mt-4 text-[2rem] font-semibold leading-[1.05] tracking-[-0.02em] sm:mt-5 sm:text-[3rem] lg:text-[3.6rem]",
                        dark ? "text-ink-foreground" : "text-foreground",
                      )}
                    >
                      {slide.title}
                    </Heading>
                  </motion.div>
                  <motion.p
                    variants={textVariants(reduce)}
                    className={cn(
                      "mt-4 line-clamp-3 max-w-[30rem] text-[0.95rem] leading-relaxed sm:mt-5 sm:line-clamp-none sm:text-[1.1rem]",
                      dark ? "text-ink-foreground" : "text-foreground",
                    )}
                  >
                    {slide.body}
                  </motion.p>
                  <motion.div
                    variants={textVariants(reduce)}
                    className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3"
                  >
                    <Link
                      href={slide.primary.href}
                      className="group inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 sm:h-12 sm:px-7 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {slide.primary.label}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                    {slide.secondary && (
                      <Link
                        href={slide.secondary.href}
                        className={cn(
                          "inline-flex h-11 items-center rounded-full border px-5 sm:h-12 sm:px-7 text-sm font-semibold transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                          dark
                            ? "border-gold-light/50 text-gold-light hover:border-gold-light hover:bg-gold-light hover:text-forest-deep"
                            : "border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
                        )}
                      >
                        {slide.secondary.label}
                      </Link>
                    )}
                  </motion.div>
                </motion.div>
              </Container>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <Container size="wide" className="pointer-events-none absolute inset-x-0 bottom-6 z-20 sm:bottom-8">
        <div className="pointer-events-auto flex items-center justify-between gap-4">
          <div className="flex items-center rounded-full border border-border/50 bg-background/85 px-2 shadow-lg backdrop-blur-md">
            {slides.map((slide, index) => (
              // The button is a full 44px tap target; the dot inside it is the visual.
              <button
                key={slide.image}
                type="button"
                onClick={() => go(index)}
                aria-label={`${labels.goTo} ${index + 1}`}
                aria-current={index === active}
                className="group/dot flex h-11 min-w-11 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span
                  className={cn(
                    "relative block h-2 overflow-hidden rounded-full bg-foreground/20 transition-[width] duration-500",
                    index === active ? "w-12" : "w-2 group-hover/dot:bg-foreground/40",
                  )}
                >
                  {index === active && (
                    <motion.span
                      key={`${active}-${running}`}
                      aria-hidden="true"
                      className="absolute inset-0 origin-left rounded-full bg-primary"
                      initial={{ scaleX: running ? 0 : 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: running ? AUTOPLAY_MS / 1000 : 0, ease: "linear" }}
                    />
                  )}
                </span>
              </button>
            ))}
            {!reduce && (
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-label={paused ? labels.play : labels.pause}
                className="ml-1 flex size-11 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {paused ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="mr-2 hidden font-heading text-sm text-foreground/70 tabular-nums sm:block">
              <span className="rounded-full bg-background/85 px-3 py-1.5 backdrop-blur-md">
                {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
            </span>
            <ControlButton onClick={() => go(active - 1)} label={labels.previous}>
              <ChevronLeft className="size-5" aria-hidden="true" />
            </ControlButton>
            <ControlButton onClick={() => go(active + 1)} label={labels.next}>
              <ChevronRight className="size-5" aria-hidden="true" />
            </ControlButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

function textVariants(reduce: boolean | null) {
  return {
    in: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.7, ease } },
    out: { opacity: 0, y: reduce ? 0 : 18, transition: { duration: reduce ? 0 : 0.3 } },
  };
}

function ControlButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-full border border-border/50 bg-background/85 text-foreground shadow-lg backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {children}
    </button>
  );
}
