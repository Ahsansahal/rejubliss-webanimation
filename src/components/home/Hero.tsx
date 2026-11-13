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

const HERO_DISCIPLINE_ANCHORS = [
  {
    index: "01",
    title: "3D Animation & Motion Films",
    detail: "4K raytraced product launches, broadcast commercials & explainers",
    href: "/services/3d-animation",
  },
  {
    index: "02",
    title: "Photorealistic CGI & Packaging",
    detail: "300 DPI multi-SKU renders, liquid/frost VFX & London OOH masters",
    href: "/services/cgi-rendering",
  },
  {
    index: "03",
    title: "Interactive WebGL & Next.js",
    detail: "60fps Three.js configurators, GLSL shaders & flagship websites",
    href: "/services/interactive-webgl",
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
        { y: 14, opacity: 0.85 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.06,
          ease: "expo.out",
          clearProps: "transform,opacity",
        }
      );
    });

    return () => mm.revert();
  }, []);

  // Defer secondary carousel frames until well after initial load (or immediate on hover/tab click) so slide 0 owns LCP cleanly
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
      className="relative overflow-hidden bg-bg-primary pt-28 pb-16 sm:pt-34 lg:pt-38 lg:pb-22"
    >
      {/* Signature Upper-Right Crimson Radial Wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 48% at 82% 18%, rgba(229, 55, 38, 0.16), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1480px] w-full mx-auto px-4 sm:px-6 md:px-12">
        {/* Top Status Pill & Studio Discipline Ticker */}
        <div
          data-hero-accent
          className="flex flex-wrap items-center justify-between gap-4 mb-7 sm:mb-9"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/12 bg-white/[0.03]">
            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse-subtle shrink-0" />
            <span className="text-[10.5px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-text-heading">
              London, United Kingdom · 3D, CGI &amp; WebGL Studio
            </span>
          </div>

          <span className="hidden xl:inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
            3D Animation · Photorealistic CGI · Motion Design · Interactive WebGL
          </span>
        </div>

        {/* Monumental Stacked Display Headline */}
        <h1 className="font-display text-[clamp(1.62rem,6vw,5.35rem)] font-extrabold uppercase leading-[0.96] tracking-[-0.04em] text-text-heading max-w-[1380px]">
          <span className="block">Ideas Crafted Into</span>
          <span className="block text-accent-primary">Extraordinary 3D,</span>
          <span className="block">CGI &amp; Digital Worlds</span>
        </h1>

        {/* Architectural Hairline Divider + Split Manifesto & Pill CTAs */}
        <div
          data-hero-accent
          className="mt-8 sm:mt-10 pt-7 sm:pt-8 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start lg:items-center"
        >
          <p className="lg:col-span-7 text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl">
            We partner with ambitious brands in London and worldwide to create
            cinematic{" "}
            <Link
              href="/services/3d-animation"
              className="font-semibold text-text-heading hover:text-accent-primary underline decoration-white/25 hover:decoration-accent-primary underline-offset-4 transition-colors"
            >
              3D animation
            </Link>
            ,{" "}
            <Link
              href="/services/cgi-rendering"
              className="font-semibold text-text-heading hover:text-accent-primary underline decoration-white/25 hover:decoration-accent-primary underline-offset-4 transition-colors"
            >
              photorealistic product CGI
            </Link>
            ,{" "}
            <Link
              href="/services/explainer-videos"
              className="font-semibold text-text-heading hover:text-accent-primary underline decoration-white/25 hover:decoration-accent-primary underline-offset-4 transition-colors"
            >
              explainer videos
            </Link>
            , and{" "}
            <Link
              href="/services/interactive-webgl"
              className="font-semibold text-text-heading hover:text-accent-primary underline decoration-white/25 hover:decoration-accent-primary underline-offset-4 transition-colors"
            >
              interactive WebGL experiences
            </Link>{" "}
            built to command attention across every screen.
          </p>

          <div className="lg:col-span-5 flex flex-wrap lg:justify-end items-center gap-3.5">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                triggerProjectInquiry();
              }}
              className="btn-primary-cta inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full text-xs group"
            >
              <span>Start Your Project</span>
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>

            <Link
              href="#portfolio"
              className="btn-secondary-surface inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full text-xs"
            >
              <span>Explore Our Work</span>
            </Link>
          </div>
        </div>

        {/* Widescreen Studio Showreel Stage (LCP Anchor) */}
        <div
          className="mt-10 sm:mt-12 relative"
          onMouseEnter={() => {
            setIsPaused(true);
            setSecondarySlidesReady(true);
          }}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative rounded-[22px] overflow-hidden bg-[#08080b] border border-white/10 shadow-[var(--shadow-card-hover)]">
            <button
              type="button"
              onClick={() => setShowreelOpen(true)}
              className="relative block aspect-[16/10] sm:aspect-[16/8.6] w-full text-left cursor-pointer group focus-visible:outline-none"
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
                      sizes="(max-width: 1024px) 96vw, 90vw"
                      preload={isFirst}
                      fetchPriority={isFirst ? "high" : "auto"}
                      loading={isFirst ? "eager" : "lazy"}
                      className="object-cover group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                    />
                  </div>
                );
              })}

              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/85 via-black/20 to-black/25" />

              {/* Top-Left Studio Reel Pill */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-30 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-text-heading text-[11px] font-semibold uppercase tracking-[0.14em]">
                <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse-subtle" />
                <span>{currentSlide.label}</span>
              </div>

              {/* Center Play Showreel Trigger */}
              <div className="absolute inset-0 z-30 flex items-center justify-center p-4">
                <div className="flex items-center gap-3.5 pl-3.5 pr-6 py-3 rounded-full bg-black/80 backdrop-blur-xl border border-white/20 group-hover:border-accent-primary text-text-heading shadow-2xl group-hover:scale-[1.03] transition-all duration-300">
                  <span className="w-11 h-11 rounded-full bg-accent-primary text-black flex items-center justify-center shrink-0">
                    <Play size={17} className="ml-0.5 fill-current" />
                  </span>
                  <div className="text-left">
                    <span className="block font-display text-xs uppercase tracking-[0.06em] font-bold leading-tight">
                      Play Studio Showreel
                    </span>
                    <span className="block text-[11px] text-text-muted font-medium mt-0.5">
                      4K Reel · 01:45 · 5 Breakdowns
                    </span>
                  </div>
                </div>
              </div>
            </button>

            {/* Bottom Caption & Accessible Slide Switcher Bar */}
            <div className="relative z-30 px-5 sm:px-6 py-3 bg-[#09090d] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-xs sm:text-sm font-medium text-text-secondary truncate">
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
                            ? "w-7 bg-accent-primary"
                            : "w-2.5 bg-white/25 group-hover/dot:bg-white/60"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 01 / 02 / 03 Indexed Capability Anchor Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {HERO_DISCIPLINE_ANCHORS.map((item) => (
              <Link
                key={item.index}
                href={item.href}
                className="group p-5 rounded-[20px] bg-[#0b0b0f] border border-white/10 hover:border-accent-primary/50 transition-all duration-300 flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="editorial-index">{item.index}</span>
                  <ArrowUpRight
                    size={15}
                    className="text-text-muted group-hover:text-accent-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <div>
                  <h2 className="font-display text-sm sm:text-[15px] font-bold tracking-[-0.02em] text-text-heading group-hover:text-accent-primary transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </Link>
            ))}
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
