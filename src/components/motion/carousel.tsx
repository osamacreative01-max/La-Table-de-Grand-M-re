"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Horizontal, swipeable slider built on native scroll snapping, so it works
 * with touch, trackpads and keyboards. Items are server-rendered children.
 */
export function Carousel({
  children,
  label,
  previousLabel,
  nextLabel,
  itemClassName = "w-[82%] sm:w-[46%] lg:w-[31.5%]",
  className,
}: {
  children: React.ReactNode;
  label: string;
  previousLabel: string;
  nextLabel: string;
  itemClassName?: string;
  className?: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  const scrollBy = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)} role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={track}
        onScroll={measure}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-4 sm:-mx-8 sm:scroll-px-8 sm:px-8"
      >
        {Children.map(children, (child) => (
          <li className={cn("shrink-0 snap-start", itemClassName)}>{child}</li>
        ))}
      </ul>

      <div className="mt-6 flex justify-end gap-2">
        <ArrowButton label={previousLabel} disabled={edges.start} onClick={() => scrollBy(-1)}>
          <ChevronLeft className="size-5" aria-hidden="true" />
        </ArrowButton>
        <ArrowButton label={nextLabel} disabled={edges.end} onClick={() => scrollBy(1)}>
          <ChevronRight className="size-5" aria-hidden="true" />
        </ArrowButton>
      </div>
    </div>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}
