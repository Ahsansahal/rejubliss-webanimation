"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { PRODUCTION_PROCESS_STEPS } from "@/data/homepage";
import { gsap } from "@/lib/use-gsap-reveal";

const CONCISE_STEPS = [
  {
    number: "01",
    title: "Discovery & Brief",
    summary:
      "Align on objectives, target channels, CAD/brand assets, and a clear milestone schedule.",
    gate: "Brief & Scope Sign-Off",
    image: PRODUCTION_PROCESS_STEPS[0].image,
  },
  {
    number: "02",
    title: "Concept & Direction",
    summary:
      "Establish visual tone through lighting moodboards, material studies, and hero styleframes.",
    gate: "Styleframe Approval",
    image: PRODUCTION_PROCESS_STEPS[1].image,
  },
  {
    number: "03",
    title: "Storyboard & Design",
    summary:
      "Lock camera pacing, scene framing, 3D clay geometry, or interactive UI wireframes early.",
    gate: "Animatic / Layout Lock",
    image: PRODUCTION_PROCESS_STEPS[2].image,
  },
  {
    number: "04",
    title: "Production & Motion",
    summary:
      "Execute PBR texturing, rigging, fluid VFX, raytraced lighting, or Three.js WebGL builds.",
    gate: "WIP Motion Review",
    image: PRODUCTION_PROCESS_STEPS[3].image,
  },
  {
    number: "05",
    title: "Review & Refinement",
    summary:
      "Implement consolidated team feedback across timing, surface detail, and color grading.",
    gate: "Master Picture Lock",
    image: PRODUCTION_PROCESS_STEPS[4].image,
  },
  {
    number: "06",
    title: "Final Delivery",
    summary:
      "Deliver organized 4K films, 300 DPI print masters, social cutdowns, or production web code.",
    gate: "Multi-Format Handover",
    image: PRODUCTION_PROCESS_STEPS[5].image,
  },
] as const;

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineFillRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // GSAP ScrollTrigger draws the connected timeline spine smoothly on scroll
  useEffect(() => {
    const section = sectionRef.current;
    const fill = lineFillRef.current;
    if (!section || !fill) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        fill,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.4,
          },
        }
      );

      gsap.fromTo(
        section.querySelectorAll("[data-timeline-node]"),
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "expo.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  const activeStep = CONCISE_STEPS[activeIdx];

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="relative py-22 sm:py-28 bg-bg-secondary border-b border-border-subtle"
    >
      {/* Backwards-compatible #about hash */}
      <div id="about" className="absolute -top-24" aria-hidden="true" />

      <div className="w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6">
        {/* Header + Active Milestone Visual Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 mb-14 border-b border-border-subtle">
          <div className="lg:col-span-7">
            <span className="editorial-eyebrow block mb-3">
              06 · Production Workflow
            </span>
            <h2
              id="process-heading"
              className="font-display text-3xl sm:text-4xl lg:text-[48px] font-bold text-text-heading leading-[1.05] tracking-[-0.03em]"
            >
              Six Connected Stages{" "}
              <span className="text-accent-primary">With Clear Sign-Offs</span>
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-text-secondary max-w-xl leading-relaxed">
              Every milestone has an explicit approval checkpoint—so creative
              direction, pacing, and lighting are verified before final
              high-resolution rendering begins.
            </p>
          </div>

          {/* Contextual Milestone Preview Card */}
          <div className="lg:col-span-5 flex items-center gap-4 p-4 rounded-[22px] bg-bg-card border border-border-subtle shadow-[var(--shadow-card)]">
            <div className="relative w-32 sm:w-36 aspect-[16/10] rounded-xl overflow-hidden shrink-0 bg-[#050507] border border-border-subtle">
              <Image
                src={activeStep.image}
                alt={activeStep.title}
                fill
                sizes="150px"
                className="object-cover transition-all duration-300"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-1.5 editorial-eyebrow text-[10.5px]">
                <ShieldCheck size={13} className="text-accent-primary" />
                <span>Stage {activeStep.number} Gate</span>
              </span>
              <p className="font-display text-sm sm:text-base font-bold tracking-[-0.02em] text-text-heading truncate mt-1">
                {activeStep.gate}
              </p>
              <p className="text-xs text-text-muted mt-0.5 leading-snug">
                {activeStep.title} · Tap any step below
              </p>
            </div>
          </div>
        </div>

        {/* Connected Horizontal Timeline (Desktop) & Vertical Spine (Mobile/Tablet) */}
        <div className="relative">
          {/* Desktop Continuous Connector Track */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[22px] left-0 right-0 h-[1.5px] bg-border-subtle"
          >
            <div
              ref={lineFillRef}
              className="origin-left h-full w-full bg-accent-primary"
            />
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-y-8 sm:gap-x-8 lg:gap-x-6 relative">
            {CONCISE_STEPS.map((step, idx) => {
              const isCurrent = idx === activeIdx;
              return (
                <li
                  key={step.number}
                  data-timeline-node
                  onMouseEnter={() => setActiveIdx(idx)}
                  className="relative pl-12 sm:pl-0"
                >
                  {/* Mobile vertical connector line */}
                  {idx < CONCISE_STEPS.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="sm:hidden absolute left-[18px] top-10 -bottom-8 w-[1.5px] bg-border-strong"
                    />
                  ) : null}

                  <button
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className="w-full text-left group cursor-pointer focus-visible:outline-none"
                  >
                    {/* Connected Step Circle Node */}
                    <div className="absolute left-0 top-0 sm:static sm:mb-5 flex items-center">
                      <span
                        className={`relative z-10 w-9 h-9 lg:w-11 lg:h-11 rounded-full flex items-center justify-center font-display text-xs font-bold border transition-all duration-300 ${
                          isCurrent
                            ? "bg-accent-primary text-black border-accent-primary scale-105 shadow-[0_0_24px_rgba(229,55,38,0.38)]"
                            : "bg-bg-card text-text-heading border-border-strong group-hover:border-accent-primary group-hover:text-accent-primary"
                        }`}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Unboxed Milestone Typography */}
                    <span
                      className={`block font-display text-base sm:text-lg font-bold tracking-[-0.02em] mb-2 transition-colors ${
                        isCurrent
                          ? "text-accent-primary"
                          : "text-text-heading group-hover:text-accent-primary"
                      }`}
                    >
                      {step.title}
                    </span>

                    <p className="text-xs sm:text-[13.5px] text-text-secondary leading-relaxed mb-3">
                      {step.summary}
                    </p>

                    <span className="inline-block text-[11px] uppercase tracking-[0.12em] font-semibold text-accent-primary">
                      {step.gate}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
