"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
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
      className="relative py-20 sm:py-26 bg-bg-primary transition-colors duration-300"
    >
      {/* Backwards-compatible anchor for merged Creative Solutions */}
      <div id="solutions" className="absolute -top-24" aria-hidden="true" />

      <div className="w-[97%] max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6">
        {/* Editorial Section Header */}
        <div
          data-gsap-reveal
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-accent-interactive" />
              <span className="text-xs font-bold tracking-widest uppercase text-accent-primary">
                Creative Capabilities
              </span>
            </div>
            <h2
              id="services-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-text-heading leading-tight tracking-tight"
            >
              Six Disciplines Built Around{" "}
              <span className="hero-gradient-text italic font-normal">
                Your Vision
              </span>
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
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-primary hover:text-accent-interactive shrink-0 group"
            >
              <span>All 9 Services</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
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
                    isActive ? "bg-bg-secondary/60" : "hover:bg-bg-secondary/30"
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
                        className={`font-mono text-xs font-bold transition-colors ${
                          isActive
                            ? "text-accent-interactive"
                            : "text-text-muted"
                        }`}
                      >
                        {service.number}
                      </span>
                      <div>
                        <h3
                          className={`font-serif text-xl sm:text-2xl font-bold transition-colors ${
                            isActive
                              ? "text-accent-primary"
                              : "text-text-heading"
                          }`}
                        >
                          {service.title}
                        </h3>
                        <span className="block text-xs text-text-muted mt-0.5">
                          {service.eyebrow}
                        </span>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className={`shrink-0 transition-transform duration-300 ${
                        isActive
                          ? "text-accent-interactive rotate-45"
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
                      <div className="lg:hidden relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-bg-subtle">
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
                          className="px-2.5 py-1 rounded-full text-[11.5px] font-medium bg-bg-card border border-border-subtle text-text-heading"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Deep Service Page Links */}
                    <div className="flex flex-wrap items-center gap-5 pt-1 text-xs font-bold">
                      <Link
                        href={`/services/${service.primarySlug}`}
                        className="inline-flex items-center gap-1 text-accent-primary hover:text-accent-interactive transition-colors"
                      >
                        <span>Explore {service.title}</span>
                        <ArrowUpRight size={13} />
                      </Link>
                      {service.secondaryLink ? (
                        <Link
                          href={`/services/${service.secondaryLink.slug}`}
                          className="inline-flex items-center gap-1 text-text-secondary hover:text-accent-primary transition-colors"
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

          {/* Right: Desktop Sticky Visual Showcase */}
          <div
            data-gsap-reveal
            className="hidden lg:block lg:col-span-6 lg:sticky lg:top-28"
          >
            <div className="relative rounded-[28px] overflow-hidden bg-midnight-navy border border-border-subtle shadow-[var(--shadow-card-hover)]">
              <div className="relative aspect-[16/11] w-full">
                <Image
                  src={activeService.image}
                  alt={`${activeService.title} — ${activeService.imageCaption}`}
                  fill
                  loading="lazy"
                  sizes="48vw"
                  className="object-cover transition-opacity duration-300"
                />
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-midnight-navy/85 via-transparent to-transparent" />

                {/* Floating Inset Detail Thumbnail */}
                <div className="absolute bottom-5 right-5 z-30 w-36 aspect-[4/3] rounded-xl overflow-hidden border-2 border-pearl-white/25 shadow-xl bg-midnight-navy">
                  <Image
                    src={activeService.secondaryImage}
                    alt={`${activeService.title} detail`}
                    fill
                    loading="lazy"
                    sizes="150px"
                    className="object-cover"
                  />
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-5 left-6 right-44 z-30 text-pearl-white">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-ice-cyan block mb-1">
                    {activeService.number} • {activeService.title}
                  </span>
                  <p className="text-sm font-medium text-pearl-white/95 truncate">
                    {activeService.imageCaption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
