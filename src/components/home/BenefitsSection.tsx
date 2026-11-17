"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
      className="relative py-22 sm:py-28 bg-bg-secondary border-t border-b border-border-subtle text-text-primary overflow-hidden"
    >
      {/* Subtle Ambient Crimson Wash */}
      <div
        aria-hidden="true"
        className="absolute -top-36 right-1/4 w-[520px] h-[340px] rounded-full bg-accent-primary/8 blur-[140px] pointer-events-none"
      />

      <div className="relative z-10 w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Statement + Linked Botanical CGI Frame */}
          <div data-gsap-reveal className="lg:col-span-5 space-y-7">
            <div>
              <span className="editorial-eyebrow block mb-3">
                02 · Commercial Advantage
              </span>
              <h2
                id="benefits-heading"
                className="font-display text-3xl sm:text-4xl lg:text-[46px] font-bold text-text-heading leading-[1.05] tracking-[-0.03em]"
              >
                Beyond Visuals.{" "}
                <span className="text-accent-primary">
                  Built to Make an Impact.
                </span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                Great studio craft is not decoration—it solves real commercial
                bottlenecks across product launches, buyer education, and
                digital brand perception.
              </p>
            </div>

            <Link
              href="/work/g-natural-botanicals"
              className="group block relative aspect-[16/10] rounded-[20px] overflow-hidden border border-border-subtle hover:border-accent-primary/50 bg-[#050507] shadow-[var(--shadow-card)] transition-all duration-300"
            >
              <Image
                src="/images/portfolio/g-natural-botanicals/01-essential-oil-splash.png"
                alt="G Natural Skincare photorealistic 3D botanical splash render by Rejubliss"
                fill
                sizes="(max-width: 1024px) 95vw, 40vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/15 to-transparent" />
              <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-[#f5f4ef]/85">
                  G Natural Skincare — 20-SKU Botanical CGI Suite
                </span>
                <span className="w-8 h-8 rounded-full bg-black/75 group-hover:bg-accent-primary text-[#f5f4ef] group-hover:text-black border border-white/15 group-hover:border-accent-primary flex items-center justify-center transition-colors shrink-0">
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          </div>

          {/* Right Column: 4 Architectural Hairline Value Pillars */}
          <div
            data-gsap-reveal
            className="lg:col-span-7 border-t border-border-subtle divide-y divide-border-subtle"
          >
            {BUSINESS_OUTCOMES.map((item) => (
              <div
                key={item.number}
                className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
              >
                <div className="sm:col-span-5 flex items-baseline gap-3.5">
                  <span className="editorial-index shrink-0">
                    {item.number}
                  </span>
                  <div className="font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-text-heading">
                    {item.title}
                  </div>
                </div>
                <p className="sm:col-span-7 text-sm sm:text-[15px] text-text-secondary leading-relaxed">
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
