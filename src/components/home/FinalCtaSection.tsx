"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { triggerProjectInquiry } from "@/lib/inquiry-events";
import { useGsapSectionReveal } from "@/lib/use-gsap-reveal";

export function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="final-cta-heading"
      className="relative pt-6 pb-16 sm:pb-20 bg-bg-primary"
    >
      <div className="max-w-[1480px] w-full mx-auto px-4 sm:px-6 md:px-12">
        <div
          data-gsap-reveal
          className="relative rounded-[26px] overflow-hidden bg-[#09090c] text-text-heading border border-white/10 shadow-[var(--shadow-card-hover)] p-8 sm:p-11 lg:p-14"
        >
          {/* Subtle Crimson Corner Wash */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 88% 18%, rgba(229, 55, 38, 0.16), transparent 58%)",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Monumental Two-Tone Display Statement */}
            <div className="lg:col-span-7 space-y-4">
              <span className="editorial-eyebrow block">
                Ready When You Are · London &amp; Worldwide
              </span>

              <h2
                id="final-cta-heading"
                className="font-display text-2xl sm:text-4xl lg:text-[42px] font-extrabold uppercase leading-[1.02] tracking-[-0.035em]"
              >
                <span className="block text-text-heading">
                  Ready to Turn Your Brief
                </span>
                <span className="block text-accent-primary">
                  Into an Unforgettable
                </span>
                <span className="block text-accent-primary">
                  Visual Experience?
                </span>
              </h2>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl pt-1">
                Whether launching a physical product in 3D CGI, commissioning a
                motion campaign, or engineering an interactive WebGL
                website—our London studio is ready to collaborate.
              </p>
            </div>

            {/* Right Column: Dual Pill CTAs + Direct Studio Contact */}
            <div className="lg:col-span-5 flex flex-col lg:items-end justify-between gap-6">
              <div className="flex flex-wrap lg:justify-end items-center gap-3.5">
                <Link
                  href="/#contact"
                  onClick={(e) => {
                    if (document.getElementById("contact")) {
                      e.preventDefault();
                      triggerProjectInquiry();
                    }
                  }}
                  className="btn-primary-cta inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full text-xs cursor-pointer group"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight
                    size={15}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </Link>

                <Link
                  href="/#portfolio"
                  className="btn-secondary-surface inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs"
                >
                  <span>Explore Our Work</span>
                </Link>
              </div>

              <div className="pt-4 border-t border-white/10 w-full lg:w-auto flex flex-wrap lg:justify-end items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-text-secondary">
                <a
                  href="mailto:info@rejubliss.co.uk"
                  className="inline-flex items-center gap-1.5 hover:text-accent-primary transition-colors"
                >
                  <Mail size={14} className="text-accent-primary" />
                  <span>info@rejubliss.co.uk</span>
                </a>
                <a
                  href="tel:+442081234567"
                  className="inline-flex items-center gap-1.5 hover:text-accent-primary transition-colors"
                >
                  <Phone size={14} className="text-accent-primary" />
                  <span>+44 20 8123 4567</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
