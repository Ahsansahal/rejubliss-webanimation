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
        { y: 14 },
        {
          y: 0,
          duration: 0.56,
          stagger: 0.07,
          ease: "power3.out",
          clearProps: "transform",
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
      className="relative py-20 sm:py-26 bg-bg-primary transition-colors duration-300"
    >
      {/* Backwards-compatible #about hash */}
      <div id="about" className="absolute -top-24" aria-hidden="true" />

      <div className="w-[97%] max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6">
        {/* Compact Header + Active Milestone Visual Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-accent-interactive" />
              <span className="text-xs font-bold tracking-widest uppercase text-accent-primary">
                Production Workflow
              </span>
            </div>
            <h2
              id="process-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-text-heading leading-tight tracking-tight"
            >
              Six Connected Stages{" "}
              <span className="hero-gradient-text italic font-normal">
                With Clear Sign-Offs
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-xl leading-relaxed">
              Every milestone has an explicit approval checkpoint—so creative
              direction, pacing, and lighting are verified before final
              high-resolution rendering begins.
            </p>
          </div>

          {/* Sleek Contextual Milestone Preview Strip */}
          <div className="lg:col-span-5 flex items-center gap-4 p-3 rounded-2xl bg-bg-secondary border border-border-subtle">
            <div className="relative w-24 h-16 sm:w-28 sm:h-18 rounded-xl overflow-hidden shrink-0 bg-midnight-navy">
              <Image
                src={activeStep.image}
                alt={activeStep.title}
                fill
                sizes="112px"
                className="object-cover transition-all duration-300"
              />
            </div>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent-primary">
                <ShieldCheck size={13} className="text-accent-interactive" />
                <span>Stage {activeStep.number} Checkpoint</span>
              </span>
              <p className="font-serif text-base font-bold text-text-heading truncate mt-0.5">
                {activeStep.gate}
              </p>
              <p className="text-xs text-text-muted">
                Hover or tap any milestone below to inspect
              </p>
            </div>
          </div>
        </div>

        {/* Connected Horizontal Timeline (Desktop) & Vertical Spine (Mobile/Tablet) */}
        <div className="relative">
          {/* Desktop Continuous Connector Track */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[22px] left-0 right-0 h-[2px] bg-border-subtle"
          >
            <div
              ref={lineFillRef}
              className="origin-left h-full w-full bg-gradient-to-r from-accent-primary via-accent-interactive to-accent-ice"
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
                  className="relative pl-10 sm:pl-0"
                >
                  {/* Mobile vertical connector line */}
                  {idx < CONCISE_STEPS.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="sm:hidden absolute left-[17px] top-9 -bottom-8 w-[2px] bg-border-subtle"
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
                        className={`w-9 h-9 lg:w-11 lg:h-11 rounded-full flex items-center justify-center font-mono text-xs font-bold border-2 transition-all duration-300 ${
                          isCurrent
                            ? "bg-[var(--btn-primary-bg)] text-[var(--text-on-primary)] border-[var(--btn-primary-bg)] scale-105 shadow-md"
                            : "bg-bg-primary text-text-heading border-border-strong group-hover:border-accent-interactive group-hover:text-accent-primary"
                        }`}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Unboxed Milestone Typography */}
                    <h3
                      className={`font-serif text-lg sm:text-[19px] font-bold mb-2 transition-colors ${
                        isCurrent
                          ? "text-accent-primary"
                          : "text-text-heading group-hover:text-accent-primary"
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-[13.5px] text-text-secondary leading-relaxed mb-3">
                      {step.summary}
                    </p>

                    <span className="inline-block text-[11px] font-semibold text-accent-primary/90">
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
