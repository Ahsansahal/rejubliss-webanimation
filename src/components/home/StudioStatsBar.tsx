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
      className="bg-bg-secondary/80 border-t border-b border-border-subtle transition-colors duration-300"
    >
      <div className="w-[97%] max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6">
        {/* 4 Architectural Studio Metrics (Unboxed Hairline Columns) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-border-subtle py-8 sm:py-10">
          {STUDIO_STATS.map((stat) => (
            <div
              key={stat.label}
              data-gsap-reveal
              className="px-3 sm:px-6 py-3 lg:py-1 first:pl-0 last:pr-0 flex items-baseline sm:items-center justify-between lg:justify-start gap-4"
            >
              <span className="font-serif text-3xl sm:text-4xl xl:text-[46px] font-bold text-text-heading tracking-tight leading-none">
                {stat.value}
              </span>
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-accent-primary">
                  {stat.label}
                </span>
                <span className="block text-xs text-text-muted mt-0.5">
                  {stat.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Selected Client Commissions Strip */}
        <div
          data-gsap-reveal
          className="border-t border-border-subtle/80 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
        >
          <span className="font-bold uppercase tracking-widest text-text-muted shrink-0">
            Selected Client Commissions
          </span>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {VERIFIED_CLIENT_BRANDS.slice(0, 8).map((brand) => (
              <Link
                key={brand.projectSlug}
                href={`/work/${brand.projectSlug}`}
                className="font-serif text-sm sm:text-[15px] font-semibold text-text-secondary hover:text-accent-primary transition-colors"
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
