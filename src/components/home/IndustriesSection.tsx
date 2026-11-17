"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Sparkles } from "lucide-react";
import { INDUSTRY_SECTORS } from "@/data/homepage";
import { getProjectsBySlugs } from "@/data/portfolio";
import { useGsapSectionReveal } from "@/lib/use-gsap-reveal";

export function IndustriesSection() {
  const [activeId, setActiveId] = useState(INDUSTRY_SECTORS[0].id);
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapSectionReveal(sectionRef);

  const activeSector =
    INDUSTRY_SECTORS.find((s) => s.id === activeId) || INDUSTRY_SECTORS[0];

  return (
    <section
      id="industries"
      ref={sectionRef}
      aria-labelledby="industries-heading"
      className="relative py-22 sm:py-26 bg-bg-primary border-t border-b border-border-subtle"
    >
      <div className="w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6">
        {/* Header */}
        <div
          data-gsap-reveal
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-9"
        >
          <div className="max-w-2xl">
            <span className="editorial-eyebrow block mb-3">
              05 · Sector Applications
            </span>
            <h2
              id="industries-heading"
              className="font-display text-3xl sm:text-4xl lg:text-[46px] font-bold text-text-heading leading-[1.05] tracking-[-0.03em]"
            >
              Creative Experiences{" "}
              <span className="text-accent-primary">Across Industries</span>
            </h2>
          </div>

          <p className="text-sm text-text-secondary max-w-md leading-relaxed">
            How our 3D, CGI, and WebGL workflows solve sector-specific
            production challenges—clearly distinguishing client commissions from
            applied studio capabilities.
          </p>
        </div>

        {/* Horizontal Pill Sector Selector */}
        <div
          data-gsap-reveal
          role="tablist"
          aria-label="Industries served"
          className="flex items-center gap-2 overflow-x-auto pb-5 mb-9 border-b border-border-subtle"
        >
          {INDUSTRY_SECTORS.map((sector) => {
            const isSelected = sector.id === activeSector.id;
            return (
              <button
                key={sector.id}
                type="button"
                role="tab"
                id={`industry-tab-${sector.id}`}
                aria-selected={isSelected}
                aria-controls={`industry-panel-${sector.id}`}
                onClick={() => setActiveId(sector.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "btn-primary-solid"
                    : "bg-bg-card text-text-secondary hover:text-text-heading border border-border-subtle hover:border-accent-primary/50"
                }`}
              >
                {sector.title}
              </button>
            );
          })}
        </div>

        {/* Full-Width Split Visual & Sector Stories (SSR crawlable across all sectors) */}
        {INDUSTRY_SECTORS.map((sector) => {
          const isSelected = sector.id === activeSector.id;
          const relatedProjects = getProjectsBySlugs(sector.projectSlugs).slice(
            0,
            2
          );

          return (
            <div
              key={sector.id}
              id={`industry-panel-${sector.id}`}
              role="tabpanel"
              aria-labelledby={`industry-tab-${sector.id}`}
              className={
                isSelected
                  ? "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                  : "sr-only"
              }
            >
              {/* Visual Frame — image mounted only on active tab to preserve bandwidth */}
              {isSelected ? (
                <div className="lg:col-span-6 relative aspect-[16/10] rounded-[20px] overflow-hidden bg-[#050507] border border-border-subtle shadow-[var(--shadow-card)]">
                  <Image
                    src={sector.image}
                    alt={sector.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 96vw, 48vw"
                    className="object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    {sector.experienceType === "verified-client" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-primary text-black text-[11px] font-bold uppercase tracking-[0.08em]">
                        <BadgeCheck size={13} />
                        <span>{sector.experienceLabel}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#ff6252] text-[11px] font-semibold uppercase tracking-[0.12em] border border-white/15">
                        <Sparkles size={12} />
                        <span>{sector.experienceLabel}</span>
                      </span>
                    )}
                  </div>
                </div>
              ) : null}

              {/* Concise Editorial Industry Context */}
              <div className="lg:col-span-6 space-y-5">
                <div className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-text-heading">
                  {sector.title}
                </div>

                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  {sector.description}
                </p>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed pl-4 border-l-2 border-accent-primary">
                  {sector.applicationNote}
                </p>

                {isSelected && relatedProjects.length > 0 ? (
                  <div className="pt-3">
                    <span className="block editorial-eyebrow text-[10.5px] mb-3">
                      Relevant Portfolio Proof
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {relatedProjects.map((proj) => (
                        <Link
                          key={proj.slug}
                          href={`/work/${proj.slug}`}
                          className="inline-flex items-center gap-3 pr-4 p-1.5 rounded-full bg-bg-card border border-border-subtle hover:border-accent-primary/50 transition-colors group"
                        >
                          <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#050507] border border-border-subtle">
                            <Image
                              src={proj.image}
                              alt={`${proj.title} thumbnail`}
                              fill
                              loading="lazy"
                              sizes="36px"
                              className="object-cover"
                            />
                          </div>
                          <div className="text-xs">
                            <span className="font-display font-bold text-text-heading group-hover:text-accent-primary transition-colors">
                              {proj.title}
                            </span>
                            <span className="text-text-muted ml-1.5">
                              ({proj.client})
                            </span>
                          </div>
                          <ArrowUpRight
                            size={13}
                            className="text-text-muted group-hover:text-accent-primary"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
