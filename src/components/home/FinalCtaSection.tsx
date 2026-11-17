"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, ShieldCheck } from "lucide-react";
import { triggerProjectInquiry } from "@/lib/inquiry-events";
import { useGsapSectionReveal } from "@/lib/use-gsap-reveal";

export function FinalCtaSection({
  aboveBriefForm = false,
}: {
  aboveBriefForm?: boolean;
} = {}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="final-cta-heading"
      className={`relative bg-bg-primary ${
        aboveBriefForm ? "pt-20 sm:pt-24 pb-8 sm:pb-10" : "pt-6 pb-16 sm:pb-20"
      }`}
    >
      <div className="w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6">
        <div
          data-gsap-reveal
          className="relative rounded-[28px] overflow-hidden bg-[#08080c] text-[#f5f4ef] border border-border-strong shadow-[var(--shadow-card-hover)] p-7 sm:p-10 lg:p-12"
        >
          {/* Controlled Vermilion Studio Rim Wash */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 86% 24%, rgba(229, 55, 38, 0.2), transparent 56%)",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column (7 cols): Monumental Statement + Prominent Dual Actions */}
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#ff5947]">
                <span className="w-2 h-2 rounded-full bg-[#e53726] animate-pulse-subtle" />
                <span>Ready When You Are · London &amp; Worldwide</span>
              </span>

              <h2
                id="final-cta-heading"
                className="font-display text-2xl sm:text-4xl lg:text-[42px] font-extrabold uppercase leading-[1.03] tracking-[-0.035em]"
              >
                <span className="block text-[#f5f4ef]">
                  Turn Your Brief Into
                </span>
                <span className="block text-[#e53726]">
                  Unforgettable 3D, CGI
                </span>
                <span className="block text-[#e53726]">&amp; WebGL Work</span>
              </h2>

              <p className="text-sm sm:text-base text-[#f5f4ef]/76 leading-relaxed max-w-2xl">
                Whether launching a physical product in 3D CGI, commissioning a
                4K motion campaign, or engineering an interactive WebGL
                website—our London directors review every brief within one
                business day.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => triggerProjectInquiry()}
                  className="btn-primary-cta inline-flex items-center gap-2 px-7 py-4 rounded-full text-xs cursor-pointer group"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </button>

                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-display text-xs font-semibold uppercase tracking-[0.08em] text-[#f5f4ef] hover:text-[#ff5947] border border-white/22 hover:border-[#e53726] bg-white/[0.03] hover:bg-[#e53726]/10 transition-all"
                >
                  <span>Explore All 18 Works</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#f5f4ef]/75">
                <a
                  href="mailto:info@rejubliss.co.uk"
                  className="inline-flex items-center gap-1.5 hover:text-[#ff5947] transition-colors"
                >
                  <Mail size={14} className="text-[#e53726]" />
                  <span>info@rejubliss.co.uk</span>
                </a>
                <a
                  href="tel:+442081234567"
                  className="inline-flex items-center gap-1.5 hover:text-[#ff5947] transition-colors"
                >
                  <Phone size={14} className="text-[#e53726]" />
                  <span>+44 20 8123 4567</span>
                </a>
              </div>
            </div>

            {/* Right Column (5 cols): Art-Directed 3D Visual Proof Frame */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-black border border-white/15 shadow-2xl">
                <Image
                  src="/images/car_3d.jpg"
                  alt="Rejubliss 4K raytraced 3D studio production showcase"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 92vw, 38vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#f5f4ef]">
                    <ShieldCheck size={12} className="text-[#e53726]" />
                    <span>Mutual NDA Ready · 1-Day Scope Reply</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
