"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function isSearchCrawler(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /bot|crawl|spider|slurp|googleother|inspectiontool|storebot|lighthouse|headlesschrome|prerender/i.test(
    ua
  );
}

/**
 * Reference-aligned GSAP + ScrollTrigger reveal hook (`expo.out` / cubic-bezier(0.16, 1, 0.3, 1)).
 * Automatically honors `prefers-reduced-motion: reduce`, skips opacity-hiding for
 * search/AI crawlers (which do not scroll pages), and clears inline styles upon completion.
 */
export function useGsapSectionReveal(
  containerRef: RefObject<HTMLElement | null>,
  selector = "[data-gsap-reveal]"
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isSearchCrawler()) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = container.querySelectorAll<HTMLElement>(selector);
      if (!targets.length) return;

      const rect = container.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        gsap.fromTo(
          targets,
          { y: 14 },
          {
            y: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "expo.out",
            clearProps: "transform",
          }
        );
        return;
      }

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
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, [containerRef, selector]);
}

export { gsap, ScrollTrigger };
