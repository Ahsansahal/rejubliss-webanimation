"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reference-aligned GSAP + ScrollTrigger reveal hook (`expo.out` / cubic-bezier(0.16, 1, 0.3, 1)).
 * Automatically honors `prefers-reduced-motion: reduce` and clears inline
 * styles upon completion so layout and responsive reflows stay pristine.
 */
export function useGsapSectionReveal(
  containerRef: RefObject<HTMLElement | null>,
  selector = "[data-gsap-reveal]"
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = container.querySelectorAll<HTMLElement>(selector);
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.075,
          ease: "expo.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: container,
            start: "top 86%",
            once: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, [containerRef, selector]);
}

export { gsap, ScrollTrigger };
