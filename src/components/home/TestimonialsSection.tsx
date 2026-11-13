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
      className="relative py-20 sm:py-26 bg-bg-secondary/65 border-t border-b border-border-subtle transition-colors duration-300"
    >
      {/* Backwards-compatible anchor for merged Why Choose Rejubliss */}
      <div id="why-rejubliss" className="absolute -top-24" aria-hidden="true" />

      <div className="w-[97%] max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          {/* Left Column: Why Choose Rejubliss (Unboxed Studio Pillars + Accolades) */}
          <div data-gsap-reveal className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 bg-accent-interactive" />
                <span className="text-xs font-bold tracking-widest uppercase text-accent-primary">
                  Why Choose Rejubliss
                </span>
              </div>
              <h2
                id="testimonials-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-text-heading leading-tight tracking-tight"
              >
                Creative Craft Backed by{" "}
                <span className="hero-gradient-text italic font-normal">
                  Production Discipline
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                Commissioning 3D, CGI, or interactive web requires both artistic
                judgment and reliable engineering. Here is why creative leaders
                partner with our London studio.
              </p>
            </div>

            {/* 4 Unboxed Hairline Studio Pillars */}
            <div className="border-t border-border-subtle divide-y divide-border-subtle">
              {STUDIO_PILLARS.map((pillar) => (
                <div key={pillar.number} className="py-4.5 flex gap-4">
                  <span className="font-mono text-xs font-bold text-accent-interactive pt-1 shrink-0">
                    {pillar.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-text-heading mb-1">
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
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-text-muted">
                <ShieldCheck size={14} className="text-accent-interactive" />
                <span>London Studio • Worldwide Delivery • Industry Honours</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {STUDIO_ACCOLADES.map((accolade) => (
                  <span
                    key={accolade}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg-card border border-border-subtle text-xs font-medium text-text-secondary"
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
            className="lg:col-span-7 flex flex-col justify-between gap-7 lg:pt-4"
          >
            {CLIENT_TESTIMONIALS.map((item) => (
              <blockquote
                key={item.id}
                className="relative bg-bg-card rounded-[28px] border border-border-subtle p-7 sm:p-10 shadow-[var(--shadow-card)] transition-colors duration-300"
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-primary">
                    <Quote size={16} className="text-accent-interactive" />
                    <span>Verified Client Voice</span>
                  </span>
                  <div
                    role="img"
                    className="flex items-center gap-1 text-accent-interactive"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-current text-accent-interactive"
                      />
                    ))}
                  </div>
                </div>

                <p className="font-serif text-xl sm:text-2xl lg:text-[26px] text-text-heading leading-snug italic mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <footer className="pt-5 border-t border-border-subtle flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {item.avatar ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border-subtle shrink-0">
                        <Image
                          src={item.avatar}
                          alt={item.author}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        aria-hidden="true"
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-ocean-blue to-deep-teal text-pearl-white font-serif font-bold text-sm flex items-center justify-center shrink-0"
                      >
                        {item.initials}
                      </div>
                    )}
                    <div>
                      <cite className="not-italic font-serif font-bold text-base text-text-heading block">
                        {item.author}
                      </cite>
                      <span className="text-xs text-text-muted block">
                        {item.role}, {item.company}
                      </span>
                    </div>
                  </div>

                  {item.projectSlug ? (
                    <Link
                      href={`/work/${item.projectSlug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-accent-primary hover:text-accent-interactive transition-colors"
                    >
                      <span>{item.projectContext}</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  ) : (
                    <span className="text-xs font-semibold text-text-muted">
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
