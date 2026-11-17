"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Expand,
  Images,
  Sparkles,
} from "lucide-react";
import {
  ALL_PORTFOLIO_PROJECTS,
  type EnrichedProject,
} from "@/data/portfolio";
import { triggerProjectInquiry } from "@/lib/inquiry-events";
import { useGsapSectionReveal } from "@/lib/use-gsap-reveal";

const PortfolioGalleryModal = dynamic(
  () =>
    import("@/components/common/PortfolioGalleryModal").then(
      (m) => m.PortfolioGalleryModal
    ),
  { ssr: false }
);

// Act I of Portfolio: Deep-dive interactive inspector dedicated exclusively to
// comprehensive multi-asset client launches (11–20+ deliverables per commission).
const FLAGSHIP_CAMPAIGN_SLUGS = [
  "rezilo-recovery",
  "scoopy-ice-cream",
  "desi-chai-london",
  "g-natural-botanicals",
] as const;

export function FlagshipReleasesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapSectionReveal(sectionRef);

  const flagshipProjects = useMemo(() => {
    const bySlug = new Map(ALL_PORTFOLIO_PROJECTS.map((p) => [p.slug, p]));
    return FLAGSHIP_CAMPAIGN_SLUGS.map((slug) => bySlug.get(slug)).filter(
      (p): p is EnrichedProject => Boolean(p)
    );
  }, []);

  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [selectedFrameIdx, setSelectedFrameIdx] = useState(0);
  const [lightboxState, setLightboxState] = useState<{
    project: EnrichedProject;
    index: number;
  } | null>(null);

  const activeProject =
    flagshipProjects[activeProjectIdx] || flagshipProjects[0];

  if (!activeProject) return null;

  const contactSheetFrames = activeProject.gallery.slice(0, 6);
  const currentFrameSrc =
    activeProject.gallery[selectedFrameIdx] || activeProject.image;

  const handleSelectCampaign = (idx: number) => {
    setActiveProjectIdx(idx);
    setSelectedFrameIdx(0);
  };

  return (
    <section
      id="portfolio-spotlight"
      ref={sectionRef}
      aria-labelledby="flagship-releases-heading"
      className="relative py-22 sm:py-28 bg-bg-primary border-b border-border-subtle"
    >
      <div className="w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6">
        {/* Editorial Header */}
        <div
          data-gsap-reveal
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-10 sm:mb-12 border-b border-border-subtle"
        >
          <div className="max-w-2xl">
            <span className="editorial-eyebrow block mb-3">
              03 · Flagship Releases — 360° Campaign Case Studies
            </span>
            <h2
              id="flagship-releases-heading"
              className="font-display text-3xl sm:text-4xl lg:text-[48px] font-bold text-text-heading leading-[1.05] tracking-[-0.03em]"
            >
              Multi-Asset{" "}
              <span className="text-accent-primary">Client Worlds</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-md">
            Inspect full-scale brand rollouts spanning 3D product CGI, retail
            packaging, and London Underground out-of-home billboards—click any
            frame below to preview deliverables inline.
          </p>
        </div>

        {/* 4-Client Campaign Selector Tabs */}
        <div
          data-gsap-reveal
          role="tablist"
          aria-label="Select flagship client campaign"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-7"
        >
          {flagshipProjects.map((proj, idx) => {
            const isSelected = idx === activeProjectIdx;
            const indexLabel = String(idx + 1).padStart(2, "0");
            return (
              <button
                key={proj.slug}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleSelectCampaign(idx)}
                className={`text-left p-4 rounded-[18px] border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? "bg-bg-card border-accent-primary shadow-[var(--shadow-card)]"
                    : "bg-bg-subtle hover:bg-bg-card border-border-subtle hover:border-border-strong"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-display text-[11px] font-bold tracking-[0.08em] uppercase ${
                      isSelected ? "text-accent-primary" : "text-text-muted"
                    }`}
                  >
                    {indexLabel} · {proj.client}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bg-secondary border border-border-subtle text-text-muted">
                    {proj.gallery.length} Visuals
                  </span>
                </div>

                <div>
                  <div className="font-display text-sm sm:text-[15px] font-bold tracking-[-0.02em] text-text-heading truncate">
                    {proj.title}
                  </div>
                  <div className="text-xs text-text-muted truncate mt-0.5">
                    {proj.caseStudy.industry}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Framed Interactive Campaign Inspector Deck */}
        <div
          data-gsap-reveal
          className="rounded-[26px] bg-bg-card border border-border-subtle shadow-[var(--shadow-card-hover)] overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left (7 cols): Cinema Stage + 6-Frame Interactive Contact Sheet */}
          <div className="lg:col-span-7 bg-[#050507] border-b lg:border-b-0 lg:border-r border-border-subtle flex flex-col justify-between">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeProject.slug}-${currentFrameSrc}`}
                  initial={{ opacity: 0, scale: 1.015 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentFrameSrc}
                    alt={`${activeProject.fullTitle} — deliverable ${selectedFrameIdx + 1}`}
                    fill
                    sizes="(max-width: 1024px) 96vw, 56vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />

              {/* Top Overlay Pills */}
              <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#f5f4ef]">
                  <Images size={12} className="text-[#e53726]" />
                  <span>
                    Frame {selectedFrameIdx + 1} of{" "}
                    {activeProject.gallery.length}
                  </span>
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setLightboxState({
                      project: activeProject,
                      index: selectedFrameIdx,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-accent-primary text-[#f5f4ef] hover:text-black border border-white/15 hover:border-accent-primary backdrop-blur-md text-[10.5px] font-semibold uppercase tracking-[0.12em] transition-all cursor-pointer"
                >
                  <Expand size={12} />
                  <span>
                    Lightbox ({activeProject.gallery.length} Assets)
                  </span>
                </button>
              </div>

              {/* Bottom Outcome Caption */}
              <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#e53726]/45 text-[11px] font-semibold text-[#ff6252]">
                  <Sparkles size={11} />
                  <span>
                    {activeProject.caseStudy.verifiedOutcome ||
                      activeProject.impactMetric}
                  </span>
                </span>
              </div>
            </div>

            {/* Interactive 6-Frame Contact Sheet Strip */}
            <div className="p-3.5 sm:p-4 bg-[#08080c] border-t border-white/10">
              <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
                {contactSheetFrames.map((frameUrl, idx) => {
                  const isFrameActive = idx === selectedFrameIdx;
                  const isLastSlotWithMore =
                    idx === 5 && activeProject.gallery.length > 6;

                  return (
                    <button
                      key={frameUrl}
                      type="button"
                      onClick={() => {
                        if (isLastSlotWithMore) {
                          setLightboxState({
                            project: activeProject,
                            index: 5,
                          });
                        } else {
                          setSelectedFrameIdx(idx);
                        }
                      }}
                      aria-label={
                        isLastSlotWithMore
                          ? `Open all ${activeProject.gallery.length} visuals in lightbox`
                          : `Preview deliverable frame ${idx + 1}`
                      }
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden transition-all cursor-pointer ${
                        isFrameActive
                          ? "ring-2 ring-accent-primary opacity-100"
                          : "opacity-60 hover:opacity-95 border border-white/12"
                      }`}
                    >
                      <Image
                        src={frameUrl}
                        alt={`${activeProject.title} frame ${idx + 1}`}
                        fill
                        sizes="110px"
                        className="object-cover"
                      />
                      {isLastSlotWithMore ? (
                        <span className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex items-center justify-center font-display text-[11px] font-bold text-[#f5f4ef]">
                          +{activeProject.gallery.length - 5}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right (5 cols): Structured Campaign Production Dossier */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6 bg-bg-card">
            <div className="space-y-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <span className="px-3 py-1 rounded-full text-[10.5px] font-semibold uppercase tracking-[0.14em] bg-accent-primary/12 text-accent-primary border border-accent-primary/35">
                    {activeProject.caseStudy.projectTypeLabel}
                  </span>
                  <span className="text-xs font-medium text-text-muted">
                    {activeProject.portfolioCategory}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-[28px] font-bold tracking-[-0.03em] text-text-heading leading-[1.12]">
                  {activeProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted mt-1">
                  {activeProject.subtitle}
                </p>
              </div>

              <div className="space-y-3.5 pt-1 border-t border-border-subtle">
                <div className="pt-3.5">
                  <span className="editorial-eyebrow text-[10.5px] block mb-1">
                    The Commercial Brief
                  </span>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {activeProject.caseStudy.challenge}
                  </p>
                </div>

                <div>
                  <span className="editorial-eyebrow text-[10.5px] block mb-1">
                    Production Pipeline
                  </span>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {activeProject.caseStudy.productionApproach}
                  </p>
                </div>
              </div>

              {/* Deliverables Produced */}
              <div>
                <span className="editorial-eyebrow text-[10.5px] block mb-2">
                  Deliverables Produced
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.deliverables.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-bg-subtle border border-border-subtle text-text-secondary"
                    >
                      <CheckCircle2
                        size={12}
                        className="text-accent-primary shrink-0"
                      />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Pair */}
            <div className="pt-5 border-t border-border-subtle flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href={`/work/${activeProject.slug}`}
                className="btn-primary-cta flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[11px] group"
              >
                <span>Read Case Study</span>
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>

              <button
                type="button"
                onClick={() =>
                  triggerProjectInquiry({
                    service: activeProject.portfolioCategory,
                    contextNote: `Interested in a multi-asset campaign similar to ${activeProject.title} (${activeProject.client})`,
                  })
                }
                className="btn-secondary-surface inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full text-[11px] cursor-pointer"
              >
                <span>Similar Scope</span>
              </button>
            </div>
          </div>
        </div>

        {/* SSR-crawlable links for inactive flagship campaign tabs */}
        <div className="sr-only">
          {flagshipProjects.map((proj, idx) =>
            idx === activeProjectIdx ? null : (
              <article key={proj.slug}>
                <h3>
                  <Link href={`/work/${proj.slug}`}>{proj.fullTitle}</Link>
                </h3>
                <p>{proj.synopsis}</p>
              </article>
            )
          )}
        </div>
      </div>

      {lightboxState ? (
        <PortfolioGalleryModal
          project={lightboxState.project}
          initialIndex={lightboxState.index}
          onClose={() => setLightboxState(null)}
        />
      ) : null}
    </section>
  );
}
