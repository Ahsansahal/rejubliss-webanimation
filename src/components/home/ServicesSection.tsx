"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HOMEPAGE_CREATIVE_SERVICES } from "@/data/services";
import { useGsapSectionReveal } from "@/lib/use-gsap-reveal";

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapSectionReveal(sectionRef);

  const activeService =
    HOMEPAGE_CREATIVE_SERVICES[activeIndex] || HOMEPAGE_CREATIVE_SERVICES[0];

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="relative py-22 sm:py-28 bg-bg-primary"
    >
      {/* Backwards-compatible anchor for merged Creative Solutions */}
      <div id="solutions" className="absolute -top-24" aria-hidden="true" />

      <div className="w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6">
        {/* Editorial Section Header */}
        <div
          data-gsap-reveal
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-12 sm:mb-14 border-b border-border-subtle"
        >
          <div className="max-w-2xl">
            <span className="editorial-eyebrow block mb-3">
              01 · Creative Capabilities
            </span>
            <h2
              id="services-heading"
              className="font-display text-3xl sm:text-4xl lg:text-[48px] font-bold text-text-heading leading-[1.05] tracking-[-0.03em]"
            >
              Six Disciplines Built Around{" "}
              <span className="text-accent-primary">Your Vision</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:max-w-md">
            <p className="text-sm text-text-secondary leading-relaxed">
              From photorealistic CGI and explainer storytelling to interactive
              WebGL websites—explore what you can commission under one London
              studio roof.
            </p>
            <Link
              href="/services"
              className="btn-secondary-surface inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[11px] shrink-0 group"
            >
              <span>All 9 Services</span>
              <ArrowUpRight
                size={13}
                className="text-accent-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* Split Editorial List (Left) + Sticky Visual Stage (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Left: 6 Clean Hairline Service Chapters (SSR crawlable across all 6 disciplines) */}
          <div
            data-gsap-reveal
            className="lg:col-span-6 border-t border-border-subtle"
          >
            {HOMEPAGE_CREATIVE_SERVICES.map((service, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`border-b border-border-subtle transition-colors duration-200 ${
                    isActive ? "bg-bg-subtle" : "hover:bg-bg-subtle/60"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-expanded={isActive}
                    className="w-full py-5 sm:py-6 px-3 sm:px-4 text-left flex items-baseline justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-5 min-w-0">
                      <span
                        className={`editorial-index transition-opacity ${
                          isActive ? "opacity-100" : "opacity-55"
                        }`}
                      >
                        {service.number}
                      </span>
                      <div>
                        <h3
                          className={`font-display text-lg sm:text-xl font-bold tracking-[-0.02em] transition-colors ${
                            isActive
                              ? "text-accent-primary"
                              : "text-text-heading"
                          }`}
                        >
                          {service.title}
                        </h3>
                        <span className="block text-xs uppercase tracking-[0.14em] text-text-muted mt-1">
                          {service.eyebrow}
                        </span>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className={`shrink-0 transition-transform duration-300 ${
                        isActive
                          ? "text-accent-primary rotate-45"
                          : "text-text-muted"
                      }`}
                    />
                  </button>

                  {/* Expanded Concise Details (kept in SSR HTML via sr-only when collapsed so all 9 service links & descriptions are indexed) */}
                  <div
                    className={
                      isActive
                        ? "px-3 sm:px-4 pb-6 sm:pl-12 space-y-4"
                        : "sr-only"
                    }
                  >
                    {/* Mobile/Tablet inline visual preview — mounted only for active item to avoid extra image requests */}
                    {isActive ? (
                      <div className="lg:hidden relative aspect-[16/10] w-full rounded-[18px] overflow-hidden bg-[#050507] border border-border-subtle">
                        <Image
                          src={service.image}
                          alt={`${service.title} — ${service.imageCaption}`}
                          fill
                          loading="lazy"
                          sizes="95vw"
                          className="object-cover"
                        />
                      </div>
                    ) : null}

                    <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
                      {service.description}
                    </p>

                    {/* Commissionable Deliverables Strip */}
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-bg-card border border-border-subtle text-text-secondary"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Deep Service Page Links */}
                    <div className="flex flex-wrap items-center gap-5 pt-1 font-display text-[11px] uppercase tracking-[0.08em] font-bold">
                      <Link
                        href={`/services/${service.primarySlug}`}
                        className="inline-flex items-center gap-1.5 text-accent-primary hover:text-accent-highlight transition-colors"
                      >
                        <span>Explore {service.title}</span>
                        <ArrowUpRight size={13} />
                      </Link>
                      {service.secondaryLink ? (
                        <Link
                          href={`/services/${service.secondaryLink.slug}`}
                          className="inline-flex items-center gap-1.5 text-text-secondary hover:text-accent-primary transition-colors"
                        >
                          <span>{service.secondaryLink.label}</span>
                          <ArrowUpRight size={13} />
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Desktop Sticky Visual Showcase (Unobstructed 16:10 Stage + Structured Metadata Bar) */}
          <div
            data-gsap-reveal
            className="hidden lg:block lg:col-span-6 lg:sticky lg:top-28"
          >
            <div className="rounded-[22px] overflow-hidden bg-bg-card border border-border-subtle shadow-[var(--shadow-card-hover)]">
              {/* Unobstructed Primary 3D Render Canvas */}
              <Link
                href={`/services/${activeService.primarySlug}`}
                aria-label={`Explore ${activeService.title}`}
                className="group block relative aspect-[16/10] w-full bg-[#050507] overflow-hidden"
              >
                <Image
                  src={activeService.image}
                  alt={`${activeService.title} — ${activeService.imageCaption}`}
                  fill
                  loading="lazy"
                  sizes="48vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#f5f4ef]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e53726]" />
                    <span>
                      {activeService.number} · {activeService.eyebrow}
                    </span>
                  </span>

                  <span className="w-9 h-9 rounded-full bg-black/80 group-hover:bg-accent-primary text-[#f5f4ef] group-hover:text-black border border-white/15 group-hover:border-accent-primary flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>

              {/* Architectural Caption & Secondary Detail Deck */}
              <div className="p-5 sm:p-6 bg-bg-card border-t border-border-subtle flex items-center justify-between gap-5">
                <div className="min-w-0 flex-1">
                  <span className="editorial-eyebrow text-[10.5px] block mb-1">
                    {activeService.number} · {activeService.title}
                  </span>
                  <p className="text-sm text-text-secondary leading-snug">
                    {activeService.imageCaption}
                  </p>
                </div>

                {/* Clean Framed Look-Dev Inset Detail */}
                <div className="relative w-28 aspect-[4/3] rounded-xl overflow-hidden border border-border-strong bg-[#050507] shrink-0">
                  <Image
                    src={activeService.secondaryImage}
                    alt={`${activeService.title} production detail`}
                    fill
                    loading="lazy"
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
