"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { triggerProjectInquiry } from "@/lib/inquiry-events";
import { useGsapSectionReveal } from "@/lib/use-gsap-reveal";

export function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="final-cta-heading"
      className="relative pt-10 pb-8 bg-bg-primary transition-colors duration-300"
    >
      <div className="w-[97%] max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6">
        <div
          data-gsap-reveal
          className="relative rounded-[36px] overflow-hidden bg-midnight-navy text-pearl-white border border-ocean-blue shadow-[0_24px_60px_-15px_rgba(6,27,53,0.45)] grid grid-cols-1 lg:grid-cols-12 items-center"
        >
          {/* Decorative Crystalline Ribbon Artwork */}
          <div className="lg:col-span-5 relative min-h-[240px] sm:min-h-[300px] lg:h-full w-full overflow-hidden">
            <Image
              src="/images/cyan_ribbon_cta.jpg"
              alt="Sculptural 3D crystalline ribbon crafted by Rejubliss"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-midnight-navy/65 to-midnight-navy" />
          </div>

          {/* Closing Conversion Message (Strategic CTA Placement #4) */}
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-14 relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-0.5 bg-ice-cyan" />
              <span className="text-xs font-bold uppercase tracking-widest text-ice-cyan">
                Ready When You Are
              </span>
            </div>

            <h2
              id="final-cta-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-pearl-white leading-tight tracking-tight"
            >
              Ready to Turn Your Brief Into an{" "}
              <span className="metallic-gradient-text italic font-serif font-normal">
                Unforgettable Visual Experience?
              </span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-metallic-silver/90 leading-relaxed max-w-2xl">
              Whether launching a physical product in 3D CGI, commissioning a
              motion campaign, or engineering an interactive WebGL website—our
              London studio is ready to collaborate.
            </p>

            {/* Consistent Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                href="/#contact"
                onClick={(e) => {
                  if (document.getElementById("contact")) {
                    e.preventDefault();
                    triggerProjectInquiry();
                  }
                }}
                className="btn-primary-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm sm:text-[15px] font-bold cursor-pointer group"
              >
                <span>Start Your Project</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                href="/#portfolio"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-pearl-white text-sm sm:text-[15px] font-semibold transition-colors"
              >
                <span>Explore Our Work</span>
              </Link>
            </div>

            {/* Direct Studio Contact Bar */}
            <div className="pt-5 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-metallic-silver">
              <span className="font-semibold text-pearl-white">
                Contact the Studio:
              </span>
              <a
                href="mailto:info@rejubliss.co.uk"
                className="inline-flex items-center gap-1.5 hover:text-ice-cyan transition-colors"
              >
                <Mail size={14} className="text-ice-cyan" />
                <span>info@rejubliss.co.uk</span>
              </a>
              <a
                href="tel:+442081234567"
                className="inline-flex items-center gap-1.5 hover:text-ice-cyan transition-colors"
              >
                <Phone size={14} className="text-ice-cyan" />
                <span>+44 20 8123 4567</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
