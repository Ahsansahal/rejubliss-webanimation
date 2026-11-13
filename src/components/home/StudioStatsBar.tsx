"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { STUDIO_STATS, VERIFIED_CLIENT_BRANDS } from "@/data/homepage";
import { useGsapSectionReveal } from "@/lib/use-gsap-reveal";

export function StudioStatsBar() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-label="Verified studio credentials and client commissions"
      className="bg-bg-secondary border-t border-b border-border-subtle"
    >
      <div className="w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6">
        {/* 4 Concrete Studio Figures */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-border-subtle">
          {STUDIO_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              data-gsap-reveal
              className={`py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-border-subtle ${
                idx % 2 === 0 ? "pr-4 border-r lg:border-r" : "pl-4 lg:px-6 lg:border-r last:border-r-0"
              } ${idx < 2 ? "border-b lg:border-b-0" : ""} ${idx === 2 ? "lg:pl-6" : ""}`}
            >
              <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-extrabold text-text-heading tracking-[-0.04em] leading-none shrink-0">
                {stat.value}
              </span>
              <div className="min-w-0">
                <span className="block editorial-eyebrow text-[10.5px] tracking-[0.18em]">
                  {stat.label}
                </span>
                <span className="block text-xs text-text-muted mt-0.5 leading-snug">
                  {stat.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Client Commissions Bar */}
        <div
          data-gsap-reveal
          className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
        >
          <span className="editorial-eyebrow text-[10.5px] shrink-0">
            Selected Client Commissions
          </span>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {VERIFIED_CLIENT_BRANDS.slice(0, 8).map((brand) => (
              <Link
                key={brand.projectSlug}
                href={`/work/${brand.projectSlug}`}
                className="group inline-flex items-center gap-1 font-display text-[11.5px] font-semibold tracking-[-0.01em] text-text-secondary hover:text-accent-primary transition-colors"
              >
                <span>{brand.name}</span>
                <ArrowUpRight
                  size={11}
                  className="opacity-0 -translate-x-0.5 group-hover:opacity-100 group-hover:translate-x-0 text-accent-primary transition-all"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
