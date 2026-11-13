"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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

interface HeroBackgroundVideo {
  id: string;
  title: string;
  webm: string;
  mp4: string;
  poster: string;
  /**
   * Calibrated overlay intensity [0..1] tuned to the video's luminance
   * so brighter CGI reels receive stronger contrast protection while darker
   * studio lighting scenes retain rich background visibility.
   */
  overlayIntensity: number;
}

const HERO_BACKGROUND_VIDEOS: readonly HeroBackgroundVideo[] = [
  {
    id: "velox-3d",
    title: "Velox Hypercar — 4K Raytraced 3D Studio Reel",
    webm: "/videos/hero-velox-3d.webm",
    mp4: "/videos/hero-velox-3d.mp4",
    poster: "/images/car_3d.jpg",
    overlayIntensity: 0.74,
  },
  {
    id: "scoopy-cgi",
    title: "Yeah! Scoopy — Product & Frost CGI Reel",
    webm: "/videos/hero-scoopy-cgi.webm",
    mp4: "/videos/hero-scoopy-cgi.mp4",
    poster: "/images/portfolio/scoopy-ice-cream/02-tubs-on-ice.png",
    overlayIntensity: 0.84,
  },
  {
    id: "rezilo-ooh",
    title: "Rezilo Wellness — 3D Hardware & London OOH Reel",
    webm: "/videos/hero-rezilo-ooh.webm",
    mp4: "/videos/hero-rezilo-ooh.mp4",
    poster: "/images/portfolio/rezilo-recovery/01-paddington-billboard.png",
    overlayIntensity: 0.82,
  },
  {
    id: "motion-vfx",
    title: "Aetheria Stream — Sculptural 3D Motion VFX Reel",
    webm: "/videos/hero-motion-vfx.webm",
    mp4: "/videos/hero-motion-vfx.mp4",
    poster: "/images/gold_motion.jpg",
    overlayIntensity: 0.76,
  },
] as const;

interface PlaybackState {
  mounted: boolean;
  frontSlot: 0 | 1;
  slots: [number | null, number | null];
  ready: [boolean, boolean];
  failed: [boolean, boolean];
}

function pickRandomIndex(excludeIndex?: number | null): number {
  const total = HERO_BACKGROUND_VIDEOS.length;
  if (total <= 1) return 0;
  if (excludeIndex === undefined || excludeIndex === null) {
    return Math.floor(Math.random() * total);
  }
  const offset = 1 + Math.floor(Math.random() * (total - 1));
  return (excludeIndex + offset) % total;
}

export function Hero() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [playback, setPlayback] = useState<PlaybackState>({
    mounted: false,
    frontSlot: 0,
    slots: [0, null],
    ready: [false, false],
    failed: [false, false],
  });

  const heroRef = useRef<HTMLElement | null>(null);
  const videoSlotRefs = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([
    null,
    null,
  ]);
  const isInViewportRef = useRef(true);
  const hasLeftViewportRef = useRef(false);
  const leftViewportAtRef = useRef(0);
  const pauseOldSlotTimerRef = useRef<number | null>(null);

  const safePlaySlot = useCallback(
    (slotIdx: 0 | 1) => {
      if (prefersReducedMotion || showreelOpen || !isInViewportRef.current) {
        return;
      }
      const videoEl = videoSlotRefs.current[slotIdx];
      if (!videoEl) return;
      videoEl.muted = true;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked by browser power-saving mode; poster fallback remains visible.
        });
      }
    },
    [prefersReducedMotion, showreelOpen]
  );

  const pauseAllSlots = useCallback(() => {
    videoSlotRefs.current[0]?.pause();
    videoSlotRefs.current[1]?.pause();
  }, []);

  // Subtle GPU entrance polish on foreground accents without hiding H1 or LCP backdrop
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

  // Select a random hero background video on page load & listen to prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
      if (event.matches) {
        pauseAllSlots();
      }
    };

    const rafId = window.requestAnimationFrame(() => {
      const reduced = mql.matches;
      setPrefersReducedMotion(reduced);
      const initialRandomIdx = pickRandomIndex();
      setPlayback({
        mounted: true,
        frontSlot: 0,
        slots: [initialRandomIdx, null],
        ready: [false, false],
        failed: [false, false],
      });
    });

    mql.addEventListener("change", handleMotionPreferenceChange);
    return () => {
      window.cancelAnimationFrame(rafId);
      mql.removeEventListener("change", handleMotionPreferenceChange);
      if (pauseOldSlotTimerRef.current !== null) {
        window.clearTimeout(pauseOldSlotTimerRef.current);
      }
    };
  }, [pauseAllSlots]);

  // Keep active slot playing when mounted, in viewport, motion allowed, and modal closed
  useEffect(() => {
    if (!playback.mounted) return;
    if (prefersReducedMotion || showreelOpen || !isInViewportRef.current) {
      pauseAllSlots();
      return;
    }
    safePlaySlot(playback.frontSlot);
  }, [
    playback.mounted,
    playback.frontSlot,
     playback.slots,
    prefersReducedMotion,
    showreelOpen,
    pauseAllSlots,
    safePlaySlot,
  ]);

  // Scroll-aware playback via IntersectionObserver:
  // - Autoplay/resume when Hero enters or stays in viewport
  // - Pause when scrolled away to conserve CPU/GPU resources
  // - Smoothly crossfade to another random video when scrolling back after browsing below
  useEffect(() => {
    const sectionEl = heroRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          isInViewportRef.current = true;

          if (prefersReducedMotion || showreelOpen) {
            return;
          }

          if (hasLeftViewportRef.current) {
            hasLeftViewportRef.current = false;
            const awayMs = performance.now() - leftViewportAtRef.current;

            // Resume current front video immediately so there is zero freeze on re-entry
            setPlayback((prev) => {
              if (!prev.mounted) return prev;
              const currentFront = prev.frontSlot;
              window.requestAnimationFrame(() => safePlaySlot(currentFront));

              // If user scrolled away for >= 2.5s, preload a random next video in the back slot
              // and smoothly crossfade once ready without interrupting playback
              if (awayMs < 2500 || HERO_BACKGROUND_VIDEOS.length <= 1) {
                return prev;
              }

              const backSlot: 0 | 1 = currentFront === 0 ? 1 : 0;
              const currentVideoIdx = prev.slots[currentFront] ?? 0;
              const nextVideoIdx = pickRandomIndex(currentVideoIdx);

              const nextSlots: [number | null, number | null] = [...prev.slots];
              const nextReady: [boolean, boolean] = [...prev.ready];
              const nextFailed: [boolean, boolean] = [...prev.failed];

              // If the back slot already holds this exact video and is ready, crossfade directly
              if (prev.slots[backSlot] === nextVideoIdx && prev.ready[backSlot] && !prev.failed[backSlot]) {
                window.requestAnimationFrame(() => safePlaySlot(backSlot));
                if (pauseOldSlotTimerRef.current !== null) {
                  window.clearTimeout(pauseOldSlotTimerRef.current);
                }
                pauseOldSlotTimerRef.current = window.setTimeout(() => {
                  videoSlotRefs.current[currentFront]?.pause();
                }, 1050);
                return {
                  ...prev,
                  frontSlot: backSlot,
                };
              }

              nextSlots[backSlot] = nextVideoIdx;
              nextReady[backSlot] = false;
              nextFailed[backSlot] = false;

              return {
                ...prev,
                slots: nextSlots,
                ready: nextReady,
                failed: nextFailed,
              };
            });
          } else {
            safePlaySlot(playback.frontSlot);
          }
        } else {
          isInViewportRef.current = false;
          hasLeftViewportRef.current = true;
          leftViewportAtRef.current = performance.now();
          pauseAllSlots();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, [prefersReducedMotion, showreelOpen, playback.frontSlot, pauseAllSlots, safePlaySlot]);

  const handleSlotReady = (slotIdx: 0 | 1) => {
    setPlayback((prev) => {
      const nextReady: [boolean, boolean] = [...prev.ready];
      nextReady[slotIdx] = true;

      // If this is the back slot finishing its preload while Hero is visible, crossfade to it now
      if (slotIdx !== prev.frontSlot && isInViewportRef.current && !prefersReducedMotion) {
        const previousFront = prev.frontSlot;
        window.requestAnimationFrame(() => safePlaySlot(slotIdx));
        if (pauseOldSlotTimerRef.current !== null) {
          window.clearTimeout(pauseOldSlotTimerRef.current);
        }
        pauseOldSlotTimerRef.current = window.setTimeout(() => {
          videoSlotRefs.current[previousFront]?.pause();
        }, 1050);

        return {
          ...prev,
          frontSlot: slotIdx,
          ready: nextReady,
        };
      }

      return {
        ...prev,
        ready: nextReady,
      };
    });
  };

  const handleSlotError = (slotIdx: 0 | 1) => {
    setPlayback((prev) => {
      const nextFailed: [boolean, boolean] = [...prev.failed];
      nextFailed[slotIdx] = true;
      return {
        ...prev,
        failed: nextFailed,
      };
    });
  };

  // Start play on back-slot video as soon as it mounts so it can trigger onCanPlay -> crossfade
  useEffect(() => {
    if (!playback.mounted || prefersReducedMotion || showreelOpen || !isInViewportRef.current) {
      return;
    }
    const backSlot: 0 | 1 = playback.frontSlot === 0 ? 1 : 0;
    if (playback.slots[backSlot] !== null && !playback.ready[backSlot] && !playback.failed[backSlot]) {
      safePlaySlot(backSlot);
    }
  }, [playback.mounted, playback.frontSlot, playback.slots, playback.ready, playback.failed, prefersReducedMotion, showreelOpen, safePlaySlot]);

  const activeVideoIndex = playback.slots[playback.frontSlot] ?? 0;
  const activeVideo = HERO_BACKGROUND_VIDEOS[activeVideoIndex] ?? HERO_BACKGROUND_VIDEOS[0];
  const overlayAlpha = activeVideo.overlayIntensity;

  return (
    <section
      ref={heroRef}
      aria-label="Rejubliss 3D Animation, CGI & WebGL Studio"
      className="relative overflow-hidden bg-[#050507] pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 min-h-[560px] sm:min-h-[620px] lg:min-h-[82vh] flex items-center"
    >
      {/* =====================================================================
          LAYER 1 (BOTTOM, z-0): Full-Section Background Video & Poster Fallback
          ===================================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#050507]"
      >
        {/* Crisp Poster Fallback Image (LCP-preloaded & shown when reduced-motion or playback fails) */}
        <Image
          src={activeVideo.poster}
          alt=""
          fill
          sizes="100vw"
          preload
          fetchPriority="high"
          quality={82}
          className="object-cover object-center transition-opacity duration-700"
        />

        {/* Dual-Slot Smooth Crossfading Background Videos */}
        {playback.mounted && !prefersReducedMotion
          ? ([0, 1] as const).map((slotIdx) => {
              const videoIdx = playback.slots[slotIdx];
              if (videoIdx === null || playback.failed[slotIdx]) {
                return null;
              }
              const videoConfig = HERO_BACKGROUND_VIDEOS[videoIdx];
              const isFrontAndReady =
                playback.frontSlot === slotIdx && playback.ready[slotIdx];

              return (
                <video
                  key={`hero-slot-${slotIdx}-${videoConfig.id}`}
                  ref={(node) => {
                    videoSlotRefs.current[slotIdx] = node;
                  }}
                  poster={videoConfig.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  disableRemotePlayback
                  tabIndex={-1}
                  onLoadedData={() => handleSlotReady(slotIdx)}
                  onPlaying={() => handleSlotReady(slotIdx)}
                  onError={() => handleSlotError(slotIdx)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    objectFit: "cover",
                  }}
                  className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-1000 ease-out ${
                    isFrontAndReady ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <source src={videoConfig.webm} type="video/webm" />
                  <source src={videoConfig.mp4} type="video/mp4" />
                </video>
              );
            })
          : null}
      </div>

      {/* =====================================================================
          LAYER 2 (MIDDLE, z-10): Calibrated Dark Readability Gradient Overlay
          ===================================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(4, 4, 7, ${(overlayAlpha * 1.08).toFixed(2)}) 0%,
              rgba(4, 4, 7, ${(overlayAlpha * 0.96).toFixed(2)}) 34%,
              rgba(4, 4, 7, ${(overlayAlpha * 0.54).toFixed(2)}) 68%,
              rgba(4, 4, 7, ${(overlayAlpha * 0.64).toFixed(2)}) 100%
            ),
            linear-gradient(
              180deg,
              rgba(4, 4, 7, 0.68) 0%,
              rgba(4, 4, 7, 0.2) 26%,
              rgba(4, 4, 7, 0.24) 72%,
              rgba(4, 4, 7, 0.88) 100%
            ),
            radial-gradient(
              ellipse 52% 54% at 74% 44%,
              rgba(229, 55, 38, 0.14),
              transparent 72%
            )
          `,
        }}
      />

      {/* =====================================================================
          LAYER 3 (TOP, z-20): Existing Hero Editorial Content & CTAs
          ===================================================================== */}
      <div className="relative z-20 w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-10 xl:gap-12 items-center">
          {/* Art-Directed Editorial Hook & Distinct CTAs */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start">
            <div
              data-hero-accent
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/45 backdrop-blur-md mb-5 sm:mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#e53726] animate-pulse-subtle shrink-0" />
              <span className="text-[10.5px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#f5f4ef]">
                London · 3D, CGI &amp; WebGL Studio
              </span>
            </div>

            <h1 className="font-display text-[clamp(1.85rem,3.3vw,3.85rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.035em] text-[#f5f4ef] drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
              <span className="block">Ideas Crafted</span>
              <span className="block text-[#e53726]">Into Extraordinary</span>
              <span className="block">3D, CGI &amp; WebGL.</span>
            </h1>

            <p
              data-hero-accent
              className="mt-5 sm:mt-6 text-[#f5f4ef]/82 text-[15px] sm:text-base lg:text-[16.5px] leading-[1.68] max-w-[45ch]"
            >
              We partner with ambitious brands in London and worldwide to direct
              cinematic{" "}
              <Link
                href="/services/3d-animation"
                className="font-semibold text-[#f5f4ef] border-b border-white/30 hover:border-[#e53726] hover:text-[#ff4d3b] transition-colors"
              >
                3D animation
              </Link>
              ,{" "}
              <Link
                href="/services/cgi-rendering"
                className="font-semibold text-[#f5f4ef] border-b border-white/30 hover:border-[#e53726] hover:text-[#ff4d3b] transition-colors"
              >
                photorealistic CGI
              </Link>
              ,{" "}
              <Link
                href="/services/explainer-videos"
                className="font-semibold text-[#f5f4ef] border-b border-white/30 hover:border-[#e53726] hover:text-[#ff4d3b] transition-colors"
              >
                explainer films
              </Link>
              , and{" "}
              <Link
                href="/services/interactive-webgl"
                className="font-semibold text-[#f5f4ef] border-b border-white/30 hover:border-[#e53726] hover:text-[#ff4d3b] transition-colors"
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
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  triggerProjectInquiry();
                }}
                className="btn-primary-cta inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full text-xs group flex-1 sm:flex-initial"
              >
                <span>Start Your Project</span>
                <ArrowUpRight
                  size={15}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>

              <button
                type="button"
                onClick={() => setShowreelOpen(true)}
                className="btn-secondary-surface !text-[#f5f4ef] !border-white/25 bg-black/35 backdrop-blur-sm hover:!bg-white/10 hover:!border-[#e53726] inline-flex items-center justify-center gap-2.5 pl-2 pr-5 py-2 rounded-full text-xs cursor-pointer group flex-1 sm:flex-initial"
              >
                <span className="w-7 h-7 rounded-full bg-[#e53726]/20 border border-[#e53726]/55 text-[#ff4d3b] group-hover:bg-[#e53726] group-hover:text-black flex items-center justify-center transition-colors shrink-0">
                  <Play size={12} className="ml-0.5 fill-current" />
                </span>
                <span>Watch 4K Reel</span>
              </button>
            </div>

            {/* Quiet Operational Trust Micro-Line */}
            <div
              data-hero-accent
              className="mt-6 pt-5 border-t border-white/15 w-full flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#f5f4ef]/65"
            >
              <span>1-Business-Day Director Review</span>
              <span aria-hidden="true" className="text-white/25">
                ·
              </span>
              <span>NDA-Protected Production</span>
              <span aria-hidden="true" className="text-white/25 hidden sm:inline">
                ·
              </span>
              <Link
                href="#portfolio-spotlight"
                className="font-semibold text-[#f5f4ef] hover:text-[#ff4d3b] transition-colors inline-flex items-center gap-1"
              >
                <span>Explore Case Studies</span>
                <ArrowUpRight size={12} className="text-[#e53726]" />
              </Link>
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
