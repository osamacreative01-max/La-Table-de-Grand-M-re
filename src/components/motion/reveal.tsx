"use client";

import { useEffect, useRef } from "react";
import { useAnimate, useInView, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Fades and lifts its content in as it scrolls into view.
 *
 * Content is fully visible in the server HTML and without JavaScript. Only
 * elements that start below the fold are hidden, after hydration, so nothing
 * on screen ever flashes away.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLDivElement & HTMLLIElement>();
  const inView = useInView(scope, { once: true, margin: "0px 0px -12% 0px" });
  const armed = useRef(false);

  useEffect(() => {
    const element = scope.current;
    if (reduce || !element) return;
    if (element.getBoundingClientRect().top > window.innerHeight) {
      armed.current = true;
      animate(element, { opacity: 0, transform: `translateY(${y}px)` }, { duration: 0 });
    }
  }, [animate, reduce, scope, y]);

  useEffect(() => {
    if (!inView || !armed.current || !scope.current) return;
    armed.current = false;
    animate(
      scope.current,
      { opacity: 1, transform: "translateY(0px)" },
      { duration: 0.75, ease, delay },
    );
  }, [animate, delay, inView, scope]);

  return (
    <Tag ref={scope} className={className}>
      {children}
    </Tag>
  );
}
