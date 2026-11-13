"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGsapSectionReveal } from "@/lib/use-gsap-reveal";

const BUSINESS_OUTCOMES = [
  {
    number: "01",
    title: "Product Communication",
    description:
      "Reveal internal engineering, material finishes, and multi-SKU packaging in photorealistic detail—even before physical prototypes or print runs exist.",
  },
  {
    number: "02",
    title: "Visual Storytelling",
    description:
      "Distill complex technical mechanisms and product workflows into clear, well-paced narratives that audiences grasp in seconds.",
  },
  {
    number: "03",
    title: "Brand Engagement",
    description:
      "Unify out-of-home billboards, retail displays, and social video campaigns under a distinctive visual direction that stands apart in crowded markets.",
  },
  {
    number: "04",
    title: "Interactive Experiences",
    description:
      "Invite buyers to rotate, customize, and inspect products directly inside fast, responsive 3D and WebGL browser experiences.",
  },
] as const;

export function BenefitsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapSectionReveal(sectionRef);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      aria-labelledby="benefits-heading"
      className="relative py-20 sm:py-26 bg-midnight-navy text-pearl-white overflow-hidden"
    >
      {/* Subtle Ambient Teal Glow */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-1/4 w-[520px] h-[340px] rounded-full bg-deep-teal/20 blur-[130px] pointer-events-none"
      />

      <div className="relative z-10 w-[97%] max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Statement + Full-Bleed Botanical CGI Frame */}
          <div data-gsap-reveal className="lg:col-span-5 space-y-7">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 bg-ice-cyan" />
                <span className="text-xs font-bold tracking-widest uppercase text-ice-cyan">
                  Business Value
                </span>
              </div>
              <h2
                id="benefits-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-pearl-white leading-tight tracking-tight"
              >
                Beyond Visuals.{" "}
                <span className="metallic-gradient-text italic font-normal">
                  Built to Make an Impact.
                </span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-metallic-silver/90 leading-relaxed">
                Great studio craft is not decoration—it solves real commercial
                bottlenecks across product launches, buyer education, and
                digital brand perception.
              </p>
            </div>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-pearl-white/15 bg-ocean-blue">
              <Image
                src="/images/portfolio/g-natural-botanicals/01-essential-oil-splash.png"
                alt="G Natural Skincare photorealistic 3D botanical splash render by Rejubliss"
                fill
                sizes="(max-width: 1024px) 95vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-navy/75 via-transparent to-transparent" />
              <span className="absolute bottom-3.5 left-4 text-xs font-medium text-pearl-white/90">
                G Natural Skincare — 20+ SKU Botanical CGI Suite
              </span>
            </div>
          </div>

          {/* Right Column: 4 Architectural Hairline Value Pillars (No Card Boxes) */}
          <div
            data-gsap-reveal
            className="lg:col-span-7 border-t border-pearl-white/15 divide-y divide-pearl-white/15"
          >
            {BUSINESS_OUTCOMES.map((item) => (
              <div
                key={item.number}
                className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
              >
                <div className="sm:col-span-5 flex items-baseline gap-3.5">
                  <span className="font-mono text-xs font-bold text-ice-cyan">
                    {item.number}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-pearl-white">
                    {item.title}
                  </h3>
                </div>
                <p className="sm:col-span-7 text-sm sm:text-[15px] text-metallic-silver/90 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
