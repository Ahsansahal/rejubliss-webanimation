"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { STUDIO_STATS, VERIFIED_CLIENT_BRANDS } from "@/data/homepage";
import { useGsapSectionReveal } from "@/lib/use-gsap-reveal";

export function StudioStatsBar() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-label="Studio credentials and client commissions"
      className="bg-[#050507] border-t border-b border-white/10"
    >
      <div className="max-w-[1480px] w-full mx-auto px-4 sm:px-6 md:px-12">
        {/* 4 Architectural Studio Metrics (Unboxed Hairline Columns) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-white/10 py-8 sm:py-11">
          {STUDIO_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              data-gsap-reveal
              className="px-3 sm:px-6 py-3 lg:py-1 first:pl-0 last:pr-0 flex flex-col sm:flex-row sm:items-center justify-between lg:justify-start gap-2 sm:gap-4"
            >
              <span className="font-display text-3xl sm:text-4xl xl:text-[44px] font-extrabold text-text-heading tracking-[-0.04em] leading-none">
                {stat.value}
              </span>
              <div>
                <span className="block editorial-eyebrow text-[11px]">
                  0{idx + 1} · {stat.label}
                </span>
                <span className="block text-xs text-text-muted mt-0.5">
                  {stat.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Client Commissions Strip */}
        <div
          data-gsap-reveal
          className="border-t border-white/10 py-4.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
        >
          <span className="editorial-eyebrow text-[11px] shrink-0">
            Selected Client Commissions
          </span>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {VERIFIED_CLIENT_BRANDS.slice(0, 8).map((brand) => (
              <Link
                key={brand.projectSlug}
                href={`/work/${brand.projectSlug}`}
                className="font-display text-xs font-semibold tracking-[-0.01em] text-text-secondary hover:text-accent-primary transition-colors"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
