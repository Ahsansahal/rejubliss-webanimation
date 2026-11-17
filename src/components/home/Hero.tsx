"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight, Play } from "lucide-react";
import { triggerProjectInquiry } from "@/lib/inquiry-events";
import { gsap } from "@/lib/use-gsap-reveal";

const ShowreelModal = dynamic(
  () => import("../common/ShowreelModal").then((m) => m.ShowreelModal),
  { ssr: false }
);

const HERO_ARTWORK_STAGES = [
  {
    id: "velox-3d",
    index: "01",
    tabLabel: "3D Animation",
    discipline: "4K Raytraced 3D CGI",
    title: "Velox Hypercar — Studio Lighting & NURBS Surfacing",
    pipeline: "Cinema 4D · Octane · ACES",
    projectSlug: "velox-automotive-commercial",
    image: "/images/car_3d.jpg",
  },
  {
    id: "scoopy-cgi",
    index: "02",
    tabLabel: "Packaging CGI",
    discipline: "Product & Frost VFX",
    title: "Yeah! Scoopy — 5-SKU Packaging & Condensation Physics",
    pipeline: "Octane · Substance 3D · 300 DPI",
    projectSlug: "scoopy-ice-cream",
    image: "/images/portfolio/scoopy-ice-cream/02-tubs-on-ice.png",
  },
  {
    id: "rezilo-ooh",
    index: "03",
    tabLabel: "London OOH",
    discipline: "Hardware CGI & OOH",
    title: "Rezilo Wellness — Paddington Underground & 3D Hardware",
    pipeline: "Hard-Surface CGI · Print OOH",
    projectSlug: "rezilo-recovery",
    image: "/images/portfolio/rezilo-recovery/01-paddington-billboard.png",
  },
  {
    id: "aetheria-motion",
    index: "04",
    tabLabel: "Motion VFX",
    discipline: "60fps Procedural Motion",
    title: "Aetheria Stream — Sculptural Ribbon & Broadcast Identity",
    pipeline: "Houdini · Cinema 4D · After Effects",
    projectSlug: "kinetic-identity-package",
    image: "/images/gold_motion.jpg",
  },
] as const;

export function Hero() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [secondarySlidesReady, setSecondarySlidesReady] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const stageParallaxRef = useRef<HTMLDivElement | null>(null);

  // Subtle GPU entrance polish without hiding H1 or LCP artwork
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = el.querySelectorAll("[data-hero-accent]");
      if (!targets.length) return;
      gsap.fromTo(
        targets,
        { y: 14, opacity: 0.86 },
        {
          y: 0,
          opacity: 1,
          duration: 0.68,
          stagger: 0.06,
          ease: "expo.out",
          clearProps: "transform,opacity",
        }
      );
    });

    return () => mm.revert();
  }, []);

  // Defer secondary slides until idle so slide 0 owns LCP cleanly
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSecondarySlidesReady(true);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, []);

  // Gentle auto-advance on the 3D focal stage when motion is permitted
  useEffect(() => {
    if (isPaused || showreelOpen || !secondarySlidesReady) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const id = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_ARTWORK_STAGES.length);
    }, 6500);

    return () => window.clearInterval(id);
  }, [isPaused, showreelOpen, secondarySlidesReady]);

  // Subtle GPU pointer parallax on the 3D focal artwork (desktop fine pointers only)
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = stageParallaxRef.current;
    if (!target) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    target.style.transform = `translate3d(${(-nx * 10).toFixed(1)}px, ${(-ny * 8).toFixed(1)}px, 0) scale(1.035)`;
  };

  const handleStageMouseLeave = () => {
    setIsPaused(false);
    const target = stageParallaxRef.current;
    if (target) {
      target.style.transform = "translate3d(0px, 0px, 0) scale(1.01)";
    }
  };

  const currentSlide = HERO_ARTWORK_STAGES[activeSlide];

  return (
    <section
      ref={heroRef}
      aria-label="Rejubliss 3D Animation, CGI & WebGL Studio"
      className="relative overflow-hidden bg-bg-primary pt-24 pb-12 sm:pt-30 sm:pb-14 lg:pt-32 lg:pb-16"
    >
      {/* Focused Crimson Studio Backlight Behind the 3D Stage */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 52% 54% at 74% 42%, rgba(229, 55, 38, 0.16), transparent 72%)",
        }}
      />

      <div className="relative z-10 w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column (5 Cols): Art-Directed Editorial Hook & Distinct CTAs */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div
              data-hero-accent
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border-subtle bg-bg-subtle mb-5 sm:mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse-subtle shrink-0" />
              <span className="text-[10.5px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-text-heading">
                Rejubliss · Creative Production House
              </span>
            </div>

            <h1 className="font-display text-[clamp(1.85rem,3.3vw,3.85rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.035em] text-text-heading">
              <span className="block">London 3D Animation,</span>
              <span className="block text-accent-primary">
                CGI &amp; Interactive
              </span>
              <span className="block">WebGL Studio.</span>
            </h1>

            <p
              data-hero-accent
              className="mt-5 sm:mt-6 text-text-secondary text-[15px] sm:text-base lg:text-[16.5px] leading-[1.68] max-w-[45ch]"
            >
              We partner with ambitious brands in London and worldwide to direct
              cinematic{" "}
              <Link
                href="/services/3d-animation"
                className="font-semibold text-text-heading border-b border-border-strong hover:border-accent-primary hover:text-accent-primary transition-colors"
              >
                3D animation
              </Link>
              ,{" "}
              <Link
                href="/services/cgi-rendering"
                className="font-semibold text-text-heading border-b border-border-strong hover:border-accent-primary hover:text-accent-primary transition-colors"
              >
                photorealistic CGI
              </Link>
              ,{" "}
              <Link
                href="/services/explainer-videos"
                className="font-semibold text-text-heading border-b border-border-strong hover:border-accent-primary hover:text-accent-primary transition-colors"
              >
                explainer films
              </Link>
              , and{" "}
              <Link
                href="/services/interactive-webgl"
                className="font-semibold text-text-heading border-b border-border-strong hover:border-accent-primary hover:text-accent-primary transition-colors"
              >
                interactive WebGL
              </Link>{" "}
              experiences built to command attention.
            </p>

            {/* Primary vs Secondary CTA Hierarchy */}
            <div
              data-hero-accent
              className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto"
            >
              <button
                type="button"
                onClick={() => triggerProjectInquiry()}
                className="btn-primary-cta inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full text-xs cursor-pointer group flex-1 sm:flex-initial"
              >
                <span>Start Your Project</span>
                <ArrowUpRight
                  size={15}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </button>

              <button
                type="button"
                onClick={() => setShowreelOpen(true)}
                className="btn-secondary-surface inline-flex items-center justify-center gap-2.5 pl-2 pr-5 py-2 rounded-full text-xs cursor-pointer group flex-1 sm:flex-initial"
              >
                <span className="w-7 h-7 rounded-full bg-accent-primary/15 border border-accent-primary/45 text-accent-primary group-hover:bg-accent-primary group-hover:text-black flex items-center justify-center transition-colors shrink-0">
                  <Play size={12} className="ml-0.5 fill-current" />
                </span>
                <span>Watch 4K Reel</span>
              </button>
            </div>

            {/* Quiet Operational Trust Micro-Line */}
            <div
              data-hero-accent
              className="mt-6 pt-5 border-t border-border-subtle w-full flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-text-muted"
            >
              <span>1-Business-Day Director Review</span>
              <span aria-hidden="true" className="text-border-strong">
                ·
              </span>
              <span>NDA-Protected Production</span>
              <span aria-hidden="true" className="text-border-strong hidden sm:inline">
                ·
              </span>
              <Link
                href="#portfolio-spotlight"
                className="font-semibold text-text-heading hover:text-accent-primary transition-colors inline-flex items-center gap-1"
              >
                <span>Explore Case Studies</span>
                <ArrowUpRight size={12} className="text-accent-primary" />
              </Link>
            </div>
          </div>

          {/* Right Column (7 Cols): Primary 3D Artwork Focal Stage */}
          <div
            className="lg:col-span-7 relative"
            onMouseEnter={() => {
              setIsPaused(true);
              setSecondarySlidesReady(true);
            }}
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
          >
            <div className="relative rounded-[24px] overflow-hidden bg-[#060609] border border-border-subtle shadow-[var(--shadow-card-hover)]">
              {/* Unobstructed 3D Render Viewport */}
              <div className="relative aspect-[16/10.5] sm:aspect-[16/10] w-full overflow-hidden">
                <div
                  ref={stageParallaxRef}
                  style={{ transform: "translate3d(0px, 0px, 0) scale(1.01)" }}
                  className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
                >
                  {HERO_ARTWORK_STAGES.map((slide, idx) => {
                    if (
                      idx > 0 &&
                      !secondarySlidesReady &&
                      idx !== activeSlide
                    ) {
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
                          className="object-cover"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Subtle Edge Vignette Preserving Center Artwork Clarity */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/25"
                />

                {/* Minimal Corner Badges (Never Blocking Center 3D Subject) */}
                <div className="absolute top-3.5 left-3.5 right-3.5 sm:top-4 sm:left-4 sm:right-4 z-30 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[#f5f4ef] text-[10.5px] font-semibold uppercase tracking-[0.15em]">
                    <span className="text-accent-primary font-display font-bold">
                      {currentSlide.index}
                    </span>
                    <span>{currentSlide.discipline}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowreelOpen(true)}
                    aria-label="Play Rejubliss 4K Studio Showreel"
                    className="inline-flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full bg-black/78 hover:bg-accent-primary text-[#f5f4ef] hover:text-black backdrop-blur-md border border-white/18 hover:border-accent-primary text-[10.5px] font-display font-bold uppercase tracking-[0.06em] transition-all cursor-pointer group"
                  >
                    <span className="w-5 h-5 rounded-full bg-accent-primary group-hover:bg-black text-black group-hover:text-[#f5f4ef] flex items-center justify-center transition-colors">
                      <Play size={9} className="ml-0.5 fill-current" />
                    </span>
                    <span>01:45 Showreel</span>
                  </button>
                </div>

                {/* Bottom Overlay Attribution Inside Cinema Frame */}
                <div className="absolute bottom-3.5 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 z-30 flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/65 font-semibold">
                      {currentSlide.pipeline}
                    </p>
                    <p className="font-display text-xs sm:text-sm font-bold text-[#f5f4ef] tracking-[-0.015em] truncate mt-0.5">
                      {currentSlide.title}
                    </p>
                  </div>

                  <Link
                    href={`/work/${currentSlide.projectSlug}`}
                    aria-label={`Inspect ${currentSlide.title} case study`}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-accent-primary text-[#f5f4ef] hover:text-black backdrop-blur-md border border-white/18 hover:border-accent-primary text-[10.5px] font-display font-bold uppercase tracking-[0.06em] transition-all"
                  >
                    <span className="hidden sm:inline">Case Study</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Docked Interactive Discipline Switcher Strip */}
              <div
                role="tablist"
                aria-label="Featured 3D & CGI studio disciplines"
                className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/10 bg-[#09090d]"
              >
                {HERO_ARTWORK_STAGES.map((slide, idx) => {
                  const isSelected = idx === activeSlide;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSecondarySlidesReady(true);
                        setActiveSlide(idx);
                      }}
                      className={`relative px-3.5 py-3 text-left transition-colors cursor-pointer border-b sm:border-b-0 sm:border-r last:border-r-0 border-white/8 ${
                        isSelected
                          ? "bg-white/[0.05] text-[#f5f4ef]"
                          : "text-white/55 hover:text-[#f5f4ef] hover:bg-white/[0.025]"
                      }`}
                    >
                      {isSelected ? (
                        <span className="absolute top-0 left-0 right-0 h-[2px] bg-accent-primary" />
                      ) : null}
                      <span className="flex items-center gap-1.5 text-[10.5px] font-display font-bold uppercase tracking-[0.05em]">
                        <span
                          className={
                            isSelected ? "text-accent-primary" : "opacity-60"
                          }
                        >
                          {slide.index}
                        </span>
                        <span className="truncate">{slide.tabLabel}</span>
                      </span>
                    </button>
                  );
                })}
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
