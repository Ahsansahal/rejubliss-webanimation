"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Play } from "lucide-react";
import { triggerProjectInquiry } from "@/lib/inquiry-events";
import { gsap } from "@/lib/use-gsap-reveal";

const ShowreelModal = dynamic(
  () => import("../common/ShowreelModal").then((m) => m.ShowreelModal),
  { ssr: false }
);

const HERO_REEL_SLIDES = [
  {
    id: "rezilo",
    label: "3D CGI & OOH Campaign",
    title: "Rezilo Wellness — Paddington Underground & 3D Hardware",
    image: "/images/portfolio/rezilo-recovery/01-paddington-billboard.png",
  },
  {
    id: "scoopy",
    label: "Product Visualization",
    title: "Yeah! Scoopy — 5-SKU Packaging & Frost Simulation",
    image: "/images/portfolio/scoopy-ice-cream/02-tubs-on-ice.png",
  },
  {
    id: "velox",
    label: "3D Animation",
    title: "Velox Hypercar — 4K Raytraced Studio Commercial",
    image: "/images/car_3d.jpg",
  },
  {
    id: "nexora",
    label: "Interactive WebGL",
    title: "Nexora — Real-Time 3D Web & Shader Experience",
    image: "/images/hero_laptop.jpg",
  },
] as const;

export function Hero() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [secondarySlidesReady, setSecondarySlidesReady] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  // Subtle GPU transform polish on secondary hero elements without hiding H1 or LCP image
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = el.querySelectorAll("[data-hero-accent]");
      if (!targets.length) return;
      gsap.fromTo(
        targets,
        { y: 12, opacity: 0.85 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );
    });

    return () => mm.revert();
  }, []);

  // Defer secondary carousel frames until well after initial mobile load (or immediate on hover/tab click) so slide 0 owns LCP cleanly
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSecondarySlidesReady(true);
    }, 9000);
    return () => window.clearTimeout(timer);
  }, []);

  // Gentle auto-advance on the featured visual reel when motion is permitted
  useEffect(() => {
    if (isPaused || showreelOpen || !secondarySlidesReady) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const id = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_REEL_SLIDES.length);
    }, 6500);

    return () => window.clearInterval(id);
  }, [isPaused, showreelOpen, secondarySlidesReady]);

  const currentSlide = HERO_REEL_SLIDES[activeSlide];

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-bg-primary pt-28 pb-16 sm:pt-34 lg:pt-38 lg:pb-22 transition-colors duration-300"
    >
      <div className="w-[97%] max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Focused Studio Positioning & Dual CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10">
            <div
              data-hero-accent
              className="inline-flex items-center gap-2.5 mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-accent-interactive" />
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-accent-primary">
                London Creative 3D, CGI &amp; WebGL Studio
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl xl:text-[62px] leading-[1.06] font-bold text-text-heading mb-6 tracking-tight">
              Ideas Crafted Into{" "}
              <span className="hero-gradient-text font-normal italic font-serif">
                Extraordinary
              </span>{" "}
              3D, CGI &amp; Digital Worlds
            </h1>

            <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-9 max-w-xl">
              We partner with ambitious brands in London and worldwide to create
              cinematic{" "}
              <Link
                href="/services/3d-animation"
                className="font-semibold text-text-heading hover:text-accent-primary underline decoration-border-strong underline-offset-4 transition-colors"
              >
                3D animation
              </Link>
              ,{" "}
              <Link
                href="/services/cgi-rendering"
                className="font-semibold text-text-heading hover:text-accent-primary underline decoration-border-strong underline-offset-4 transition-colors"
              >
                photorealistic product CGI
              </Link>
              ,{" "}
              <Link
                href="/services/explainer-videos"
                className="font-semibold text-text-heading hover:text-accent-primary underline decoration-border-strong underline-offset-4 transition-colors"
              >
                explainer videos
              </Link>
              , and{" "}
              <Link
                href="/services/interactive-webgl"
                className="font-semibold text-text-heading hover:text-accent-primary underline decoration-border-strong underline-offset-4 transition-colors"
              >
                interactive WebGL experiences
              </Link>{" "}
              built to command attention across every screen.
            </p>

            {/* Focused Primary & Secondary CTAs */}
            <div
              data-hero-accent
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  triggerProjectInquiry();
                }}
                className="btn-primary-cta inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[15px] font-semibold group"
              >
                <span>Start Your Project</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>

              <Link
                href="#portfolio"
                className="btn-secondary-surface inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[15px] font-semibold"
              >
                <span>Explore Our Work</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Prominent Cinematic Showreel & LCP Visual Stage */}
          <div
            className="lg:col-span-7 relative z-10"
            onMouseEnter={() => {
              setIsPaused(true);
              setSecondarySlidesReady(true);
            }}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative rounded-[28px] overflow-hidden bg-midnight-navy border border-border-subtle shadow-[var(--shadow-card-hover)]">
              {/* Clickable Widescreen Showreel Stage */}
              <button
                type="button"
                onClick={() => setShowreelOpen(true)}
                className="relative block aspect-[16/10] w-full text-left cursor-pointer group focus-visible:outline-none"
              >
                {HERO_REEL_SLIDES.map((slide, idx) => {
                  if (idx > 0 && !secondarySlidesReady && idx !== activeSlide) {
                    return null;
                  }
                  const isFirst = idx === 0;
                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                        idx === activeSlide
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0"
                      }`}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        sizes="(max-width: 1024px) 96vw, 56vw"
                        preload={isFirst}
                        fetchPriority={isFirst ? "high" : "auto"}
                        loading={isFirst ? "eager" : "lazy"}
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                  );
                })}

                <div className="absolute inset-0 z-20 bg-gradient-to-t from-midnight-navy/85 via-midnight-navy/15 to-midnight-navy/20" />

                {/* Top-Left Studio Reel Pill */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-30 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-midnight-navy/75 backdrop-blur-md border border-pearl-white/15 text-pearl-white text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-ice-cyan animate-pulse-subtle" />
                  <span>{currentSlide.label}</span>
                </div>

                {/* Center Prominent Play Showreel Button */}
                <div className="absolute inset-0 z-30 flex items-center justify-center">
                  <div className="flex items-center gap-3.5 pl-4 pr-6 py-3 rounded-full bg-midnight-navy/80 backdrop-blur-xl border border-ice-cyan/50 text-pearl-white shadow-2xl group-hover:scale-105 group-hover:bg-deep-teal/95 transition-all duration-300">
                    <span className="w-11 h-11 rounded-full bg-ice-cyan/20 border border-ice-cyan/60 flex items-center justify-center text-ice-cyan">
                      <Play size={18} className="ml-0.5 fill-current" />
                    </span>
                    <div className="text-left">
                      <span className="block text-sm font-bold leading-tight">
                        Play Studio Showreel
                      </span>
                      <span className="block text-[11px] text-metallic-silver/90 font-medium">
                        4K Reel • 01:45
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Bottom Caption & Accessible Slide Switcher Bar (>= 28x28px touch targets) */}
              <div className="relative z-30 px-5 sm:px-6 py-2.5 bg-midnight-navy border-t border-pearl-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-xs sm:text-sm font-medium text-pearl-white/90 truncate">
                  {currentSlide.title}
                </p>

                <div
                  className="flex items-center gap-1 shrink-0"
                  role="tablist"
                  aria-label="Featured studio highlights"
                >
                  {HERO_REEL_SLIDES.map((slide, idx) => {
                    const isSelected = idx === activeSlide;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        aria-label={`Preview ${slide.label}`}
                        onClick={() => {
                          setSecondarySlidesReady(true);
                          setActiveSlide(idx);
                        }}
                        className="min-w-[28px] min-h-[28px] px-1 inline-flex items-center justify-center cursor-pointer group/dot"
                      >
                        <span
                          className={`block h-1.5 rounded-full transition-all duration-300 ${
                            isSelected
                              ? "w-7 bg-ice-cyan"
                              : "w-2.5 bg-pearl-white/35 group-hover/dot:bg-pearl-white/70"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showreelOpen ? (
        <ShowreelModal
          isOpen={showreelOpen}
          onClose={() => setShowreelOpen(false)}
        />
      ) : null}
    </section>
  );
}
