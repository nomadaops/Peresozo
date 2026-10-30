"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Fades/slides its children in once they scroll into view. Renders visible on the
 * server and until the observer reports back, so there's no flash for content
 * that is already on screen.
 */
export function Reveal({
  children,
  className,
  style,
  duration = 900,
  distance = 40,
  slide = true,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  duration?: number;
  distance?: number;
  slide?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"init" | "hidden" | "shown">("init");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            setState("shown");
            io.disconnect();
          } else {
            setState((s) => (s === "init" ? "hidden" : s));
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const on = state !== "hidden";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: on ? 1 : 0,
        transform: slide ? (on ? "translateY(0)" : `translateY(${distance}px)`) : undefined,
        transition: `opacity ${duration}ms ease, transform ${duration}ms cubic-bezier(.2,.8,.2,1)`,
      }}
    >
      {children}
    </div>
  );
}
