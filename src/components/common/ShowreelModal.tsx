"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Film,
  Layers,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { triggerProjectInquiry } from "@/lib/inquiry-events";
import { trackStudioEvent } from "@/lib/analytics";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const REEL_CHAPTERS = [
  {
    id: "3d-animation",
    timecode: "00:00",
    title: "3D Product & Automotive Animation",
    discipline: "3D Animation",
    image: "/images/car_3d.jpg",
    projectSlug: "velox-automotive-commercial",
    summary:
      "Physically accurate raytraced lighting, mechanical cutaways, and dynamic camera choreography for product reveals.",
    pipeline: "Cinema 4D • Redshift • Houdini VFX",
  },
  {
    id: "cgi-packaging",
    timecode: "00:24",
    title: "Photorealistic CGI & Retail OOH",
    discipline: "CGI & Product Visualization",
    image: "/images/portfolio/scoopy-ice-cream/01-escalator-ooh.png",
    projectSlug: "scoopy-ice-cream",
    summary:
      "Multi-SKU packaging worlds, frost and liquid physics, and large-format mall & Underground out-of-home campaigns.",
    pipeline: "Octane Render • Substance 3D • ACES Color",
  },
  {
    id: "motion-design",
    timecode: "00:52",
    title: "Fluid Motion Design & Brand Systems",
    discipline: "Motion Design",
    image: "/images/cyan_motion.jpg",
    projectSlug: "vortex-fluid-motion",
    summary:
      "Kinetic typography, procedural ribbon simulations, and multi-ratio campaign toolkits built for global paid social.",
    pipeline: "After Effects • X-Particles • Cinema 4D",
  },
  {
    id: "character-story",
    timecode: "01:14",
    title: "Expressive 3D & 2D Character Storytelling",
    discipline: "Character Animation",
    image: "/images/character_animation.jpg",
    projectSlug: "lumina-character-3d",
    summary:
      "Bespoke character sculpting, facial blendshape rigging, and narrative storytelling that humanizes complex products.",
    pipeline: "ZBrush • Maya • Blender Cycles",
  },
  {
    id: "webgl-digital",
    timecode: "01:31",
    title: "Interactive WebGL & Flagship Websites",
    discipline: "Website Design & WebGL",
    image: "/images/hero_laptop.jpg",
    projectSlug: "nexora-kinetic-web",
    summary:
      "Real-time 60fps Three.js product configurators, custom GLSL shaders, and conversion-focused Next.js web platforms.",
    pipeline: "Next.js • Three.js / R3F • WebGL2",
  },
] as const;

export function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  const [activeMode, setActiveMode] = useState<"video" | "chapters">("video");
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    trackStudioEvent("showreel_opened", { source: "showreel_modal" });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const activeChapter = REEL_CHAPTERS[selectedChapterIdx];

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[110] bg-[var(--bg-backdrop)] backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Rejubliss Studio Showreel"
            className="relative w-full max-w-5xl max-h-[92dvh] bg-bg-card rounded-3xl overflow-hidden shadow-[var(--shadow-card-hover)] border border-border-accent flex flex-col text-text-primary"
          >
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-3.5 border-b border-border-subtle bg-bg-secondary/90">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-interactive animate-pulse-subtle" />
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-text-heading leading-tight">
                    Rejubliss Studio Showreel
                  </h3>
                  <p className="text-[11px] text-text-muted">
                    3D Animation • CGI Visualization • Motion Design • WebGL
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-xl p-1 bg-bg-subtle border border-border-subtle">
                  <button
                    type="button"
                    onClick={() => setActiveMode("video")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeMode === "video"
                        ? "btn-primary-solid"
                        : "text-text-secondary hover:text-accent-primary"
                    }`}
                  >
                    <Film size={13} />
                    <span>Showreel Film</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMode("chapters")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeMode === "chapters"
                        ? "btn-primary-solid"
                        : "text-text-secondary hover:text-accent-primary"
                    }`}
                  >
                    <Layers size={13} />
                    <span>5 Reel Breakdowns</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close showreel"
                  className="w-9 h-9 rounded-full bg-bg-subtle text-text-secondary flex items-center justify-center hover:bg-[var(--btn-primary-bg)] hover:text-[var(--text-on-primary)] transition-colors border border-border-subtle cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="overflow-y-auto">
              {activeMode === "video" ? (
                <div className="relative aspect-video w-full bg-midnight-navy">
                  <iframe
                    src="https://player.vimeo.com/video/824804225?autoplay=1&title=0&byline=0&portrait=0&dnt=1"
                    title="Rejubliss 3D Animation & CGI Studio Showreel"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left: Visual Chapter Preview */}
                  <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[360px] bg-midnight-navy overflow-hidden">
                    <Image
                      src={activeChapter.image}
                      alt={activeChapter.title}
                      fill
                      sizes="(max-width: 1024px) 95vw, 55vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-navy/90 via-midnight-navy/25 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-pearl-white">
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-deep-teal/85 border border-ice-cyan/40 text-ice-cyan mb-2">
                          <Sparkles size={11} />
                          <span>
                            {activeChapter.timecode} • {activeChapter.discipline}
                          </span>
                        </span>
                        <h4 className="font-serif text-xl sm:text-2xl font-bold leading-snug">
                          {activeChapter.title}
                        </h4>
                        <p className="text-xs text-pearl-white/80 mt-1 max-w-md">
                          {activeChapter.summary}
                        </p>
                      </div>
                      <Link
                        href={`/work/${activeChapter.projectSlug}`}
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pearl-white/15 hover:bg-pearl-white/25 backdrop-blur-md border border-pearl-white/25 text-xs font-bold text-pearl-white shrink-0 transition-colors"
                      >
                        <span>Case Study</span>
                        <ExternalLink size={12} />
                      </Link>
                    </div>
                  </div>

                  {/* Right: Chapter Selector */}
                  <div className="lg:col-span-5 p-4 sm:p-5 bg-bg-card flex flex-col justify-between gap-2">
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-text-muted px-1">
                        Select Discipline Highlight
                      </p>
                      {REEL_CHAPTERS.map((ch, idx) => {
                        const isSelected = idx === selectedChapterIdx;
                        return (
                          <button
                            key={ch.id}
                            type="button"
                            onClick={() => setSelectedChapterIdx(idx)}
                            className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                              isSelected
                                ? "bg-bg-accent-soft border-border-accent shadow-[var(--shadow-card)]"
                                : "bg-bg-subtle/50 border-border-subtle hover:border-border-accent"
                            }`}
                          >
                            <span className="text-[11px] font-mono font-bold text-accent-primary pt-0.5">
                              {ch.timecode}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs sm:text-sm font-bold text-text-heading truncate">
                                {ch.title}
                              </div>
                              <div className="text-[11px] text-text-muted mt-0.5">
                                {ch.pipeline}
                              </div>
                            </div>
                            <Play
                              size={13}
                              className={`shrink-0 mt-1 ${
                                isSelected
                                  ? "text-accent-interactive fill-current"
                                  : "text-text-muted"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer CTA Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 sm:px-6 py-3.5 border-t border-border-subtle bg-bg-secondary/90">
              <p className="text-xs text-text-secondary text-center sm:text-left">
                Planning a 3D product film, CGI campaign, or interactive WebGL build?
              </p>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() =>
                    setActiveMode(activeMode === "video" ? "chapters" : "video")
                  }
                  className="btn-secondary-surface px-4 py-2 rounded-full text-xs font-bold cursor-pointer"
                >
                  {activeMode === "video"
                    ? "Explore Discipline Chapters"
                    : "Back to Video Reel"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    triggerProjectInquiry({
                      service: activeChapter.discipline,
                      contextNote: `Inspired by Rejubliss Showreel (${activeChapter.title})`,
                    });
                  }}
                  className="btn-primary-cta inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold cursor-pointer"
                >
                  <span>Start Your Project</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
