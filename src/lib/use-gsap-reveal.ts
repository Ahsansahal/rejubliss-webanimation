"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Subtle, GPU-friendly GSAP + ScrollTrigger reveal hook.
 * Automatically honors `prefers-reduced-motion: reduce` and clears inline
 * styles upon completion so layout and theme transitions stay clean.
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
        { y: 16 },
        {
          y: 0,
          duration: 0.68,
          stagger: 0.07,
          ease: "power3.out",
          clearProps: "transform",
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
