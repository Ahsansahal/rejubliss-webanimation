"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, Quote, ShieldCheck, Star } from "lucide-react";
import { CLIENT_TESTIMONIALS, STUDIO_ACCOLADES } from "@/data/homepage";
import { useGsapSectionReveal } from "@/lib/use-gsap-reveal";

const STUDIO_PILLARS = [
  {
    number: "01",
    title: "Unified 3D, CGI, Motion & WebGL Roof",
    description:
      "Brand direction, photorealistic renders, motion films, and interactive Next.js builds live under one studio team—keeping every channel visually cohesive.",
  },
  {
    number: "02",
    title: "Obsessive Material & VFX Fidelity",
    description:
      "Every droplet of frost, botanical splash, carbon weave, and 24K gold reflection is art-directed to hold up at 300 DPI print and 4K HDR broadcast magnification.",
  },
  {
    number: "03",
    title: "Real-Time Browser Engineering",
    description:
      "Unlike render-only houses, we engineer production Three.js scenes, Draco GLTF assets, and custom GLSL shaders tuned for fast 60fps web experiences.",
  },
  {
    number: "04",
    title: "Milestone-Gated Predictability",
    description:
      "Structured sign-offs at brief, styleframe, storyboard, and lighting preview eliminate guesswork—with mutual NDA protection ready from day one.",
  },
] as const;

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapSectionReveal(sectionRef);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      className="relative py-22 sm:py-28 bg-[#050507] border-t border-b border-white/10"
    >
      {/* Backwards-compatible anchor for merged Why Choose Rejubliss */}
      <div id="why-rejubliss" className="absolute -top-24" aria-hidden="true" />

      <div className="max-w-[1480px] w-full mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          {/* Left Column: Why Choose Rejubliss (Unboxed Studio Pillars + Accolades) */}
          <div data-gsap-reveal className="lg:col-span-5 space-y-8">
            <div>
              <span className="editorial-eyebrow block mb-3">
                06 · Why Choose Rejubliss
              </span>
              <h2
                id="testimonials-heading"
                className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-text-heading leading-[1.05] tracking-[-0.03em]"
              >
                Creative Craft Backed by{" "}
                <span className="text-accent-primary">
                  Production Discipline
                </span>
              </h2>
              <p className="mt-3.5 text-sm sm:text-base text-text-secondary leading-relaxed">
                Commissioning 3D, CGI, or interactive web requires both artistic
                judgment and reliable engineering. Here is why creative leaders
                partner with our London studio.
              </p>
            </div>

            {/* 4 Unboxed Hairline Studio Pillars */}
            <div className="border-t border-white/10 divide-y divide-white/10">
              {STUDIO_PILLARS.map((pillar) => (
                <div key={pillar.number} className="py-5 flex gap-4">
                  <span className="editorial-index pt-0.5 shrink-0">
                    {pillar.number}
                  </span>
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold tracking-[-0.02em] text-text-heading mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Compact Studio Recognition Badges */}
            <div className="pt-1 space-y-3">
              <div className="flex items-center gap-2 editorial-eyebrow text-[10.5px]">
                <ShieldCheck size={14} className="text-accent-primary" />
                <span>London Studio · Worldwide Delivery · Industry Honours</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {STUDIO_ACCOLADES.map((accolade) => (
                  <span
                    key={accolade}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b0b0f] border border-white/10 text-xs font-medium text-text-secondary"
                  >
                    <Award size={12} className="text-accent-primary" />
                    <span>{accolade}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Client Pull-Quotes */}
          <div
            data-gsap-reveal
            className="lg:col-span-7 flex flex-col justify-between gap-6 lg:pt-2"
          >
            {CLIENT_TESTIMONIALS.map((item) => (
              <blockquote
                key={item.id}
                className="relative bg-[#0b0b0f] rounded-[22px] border border-white/10 p-7 sm:p-10 shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="inline-flex items-center gap-2 editorial-eyebrow text-[11px]">
                    <Quote size={15} className="text-accent-primary" />
                    <span>Verified Client Voice</span>
                  </span>
                  <div
                    role="img"
                    className="flex items-center gap-1 text-accent-primary"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className="fill-current text-accent-primary"
                      />
                    ))}
                  </div>
                </div>

                <p className="font-sans text-lg sm:text-2xl text-text-heading leading-relaxed font-medium mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <footer className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {item.avatar ? (
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/15 shrink-0">
                        <Image
                          src={item.avatar}
                          alt={item.author}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        aria-hidden="true"
                        className="w-11 h-11 rounded-full bg-accent-primary/15 border border-accent-primary/40 text-accent-primary font-display font-bold text-xs flex items-center justify-center shrink-0"
                      >
                        {item.initials}
                      </div>
                    )}
                    <div>
                      <cite className="not-italic font-display font-bold text-sm text-text-heading block tracking-[-0.01em]">
                        {item.author}
                      </cite>
                      <span className="text-xs text-text-muted block mt-0.5">
                        {item.role}, {item.company}
                      </span>
                    </div>
                  </div>

                  {item.projectSlug ? (
                    <Link
                      href={`/work/${item.projectSlug}`}
                      className="inline-flex items-center gap-1 font-display text-[11px] uppercase tracking-[0.06em] font-bold text-accent-primary hover:text-accent-highlight transition-colors"
                    >
                      <span>{item.projectContext}</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  ) : (
                    <span className="text-xs font-medium text-text-muted">
                      {item.projectContext}
                    </span>
                  )}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
