"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Images,
  FileText,
  ExternalLink,
} from "lucide-react";
import type { CaseStudyDetail } from "@/data/portfolio";
import { triggerProjectInquiry } from "@/lib/inquiry-events";

export interface PortfolioModalProject {
  id: string;
  slug?: string;
  title: string;
  subtitle?: string;
  client: string;
  genre: string;
  portfolioCategory?: string;
  badge: string;
  rating: number;
  reviewsCount: number;
  impactMetric: string;
  image: string;
  gallery: string[];
  synopsis: string;
  deliverables: string[];
  tags?: string[];
  caseStudy?: CaseStudyDetail;
}

interface PortfolioGalleryModalProps {
  project: PortfolioModalProject | null;
  initialIndex?: number;
  onClose: () => void;
}

function ModalGalleryContent({
  project,
  initialIndex = 0,
  onClose,
}: {
  project: PortfolioModalProject;
  initialIndex: number;
  onClose: () => void;
}) {
  const gallery =
    project.gallery.length > 0 ? project.gallery : [project.image];
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.min(Math.max(0, initialIndex), gallery.length - 1)
  );
  const [detailTab, setDetailTab] = useState<"overview" | "breakdown">(
    "overview"
  );

  const total = gallery.length;
  const currentSrc = gallery[currentIndex] || project.image;
  const slug = project.slug || project.id;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && total > 1) {
        setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
      } else if (e.key === "ArrowRight" && total > 1) {
        setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, total]);

  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0, y: 14 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.96, opacity: 0, y: 14 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study gallery`}
      className="relative w-[96vw] max-w-[96vw] max-h-[92dvh] bg-bg-card rounded-[24px] overflow-hidden shadow-[var(--shadow-card-hover)] border border-border-strong grid grid-cols-1 lg:grid-cols-12 text-text-primary"
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute top-3.5 right-3.5 z-30 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md text-[#f5f4ef] flex items-center justify-center hover:bg-accent-primary hover:text-black hover:border-accent-primary transition-all border border-white/15 cursor-pointer"
      >
        <X size={18} />
      </button>

      {/* Left Column: True Cinema Lightbox Stage + Thumbnail Filmstrip */}
      <div className="lg:col-span-7 xl:col-span-8 bg-[#050507] relative flex flex-col justify-between min-h-[320px] sm:min-h-[440px] lg:min-h-[600px] max-h-[52dvh] lg:max-h-[92dvh] border-b lg:border-b-0 lg:border-r border-border-subtle">
        {/* Top Counter Pill */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/14 text-[#f5f4ef] text-[11px] font-semibold uppercase tracking-[0.12em]">
            <Images size={12} className="text-[#e53726]" />
            <span>
              {currentIndex + 1} / {total} {total === 1 ? "Visual" : "Visuals"}
            </span>
          </div>
          {project.caseStudy ? (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#e53726]/45 text-[#ff5a49] text-[11px] font-semibold uppercase tracking-[0.12em]">
              {project.caseStudy.projectTypeLabel}
            </span>
          ) : null}
        </div>

        {/* Main Stage */}
        <div className="relative flex-1 w-full min-h-[250px] sm:min-h-[360px] flex items-center justify-center p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSrc}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full min-h-[230px] sm:min-h-[340px] lg:min-h-[450px]"
            >
              <Image
                src={currentSrc}
                alt={`${project.title} — visual ${currentIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 95vw, 65vw"
                className="object-contain select-none"
                preload
              />
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next Controls */}
          {total > 1 ? (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-accent-primary hover:text-black hover:border-accent-primary backdrop-blur-md border border-white/15 text-[#f5f4ef] flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-accent-primary hover:text-black hover:border-accent-primary backdrop-blur-md border border-white/15 text-[#f5f4ef] flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </>
          ) : null}
        </div>

        {/* Bottom Thumbnail Filmstrip */}
        {total > 1 ? (
          <div className="relative z-20 px-4 py-3 bg-[#08080b] border-t border-white/10 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              {gallery.map((thumbUrl, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={thumbUrl}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`View image ${idx + 1}`}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 transition-all cursor-pointer ${
                      isSelected
                        ? "ring-2 ring-accent-primary scale-105 opacity-100"
                        : "opacity-55 hover:opacity-95 border border-white/12"
                    }`}
                  >
                    <Image
                      src={thumbUrl}
                      alt={`${project.title} thumbnail ${idx + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      {/* Right Column: Case Study Details & CTA */}
      <div className="lg:col-span-5 xl:col-span-4 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto max-h-[40dvh] lg:max-h-[92dvh] bg-bg-card">
        <div className="space-y-4 pr-2">
          {/* Verified Discipline Badge & Asset Count */}
          <div className="flex flex-wrap items-center gap-2 pr-9">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] bg-accent-primary/14 text-accent-primary border border-accent-primary/35">
              <Layers size={12} />
              <span>{project.badge}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-bg-subtle text-text-secondary border border-border-subtle">
              <span>
                {total} {total === 1 ? "Master Frame" : "Master Visuals"}
              </span>
            </span>
          </div>

          {/* Client & Title */}
          <div>
            <p className="editorial-eyebrow text-[10.5px] mb-1.5">
              {project.caseStudy?.industry || project.genre} · {project.client}
            </p>
            <h3 className="font-display text-lg sm:text-xl font-bold tracking-[-0.03em] text-text-heading leading-tight">
              {project.title}
            </h3>
            {project.subtitle ? (
              <p className="text-xs sm:text-sm text-text-muted mt-1">
                {project.subtitle}
              </p>
            ) : null}
          </div>

          {/* Tab Switcher when structured case study exists */}
          {project.caseStudy ? (
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-full bg-bg-subtle border border-border-subtle">
              <button
                type="button"
                onClick={() => setDetailTab("overview")}
                className={`py-1.5 px-3 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  detailTab === "overview"
                    ? "btn-primary-solid"
                    : "text-text-secondary hover:text-text-heading"
                }`}
              >
                Scope &amp; Overview
              </button>
              <button
                type="button"
                onClick={() => setDetailTab("breakdown")}
                className={`inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  detailTab === "breakdown"
                    ? "btn-primary-solid"
                    : "text-text-secondary hover:text-text-heading"
                }`}
              >
                <FileText size={11} />
                <span>Case Study</span>
              </button>
            </div>
          ) : null}

          {detailTab === "overview" || !project.caseStudy ? (
            <>
              {/* Verified Production Scope Summary */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-primary/12 border border-accent-primary/35 text-xs font-semibold text-accent-primary">
                <Sparkles size={13} className="shrink-0" />
                <span>
                  {project.caseStudy?.verifiedOutcome || project.impactMetric}
                </span>
              </div>

              {/* Synopsis */}
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {project.caseStudy?.overview || project.synopsis}
              </p>

              {/* Scope & Deliverables */}
              <div>
                <h4 className="editorial-eyebrow text-[10.5px] mb-2">
                  Deliverables Produced
                </h4>
                <div className="grid grid-cols-1 gap-1.5">
                  {project.deliverables.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs font-medium text-text-secondary bg-bg-subtle border border-border-subtle rounded-xl px-3 py-2"
                    >
                      <CheckCircle2
                        size={13}
                        className="text-accent-primary shrink-0"
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2.5 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-bg-subtle border border-border-subtle">
                <span className="block editorial-eyebrow text-[10px] mb-1">
                  The Challenge
                </span>
                <p className="text-text-secondary">
                  {project.caseStudy.challenge}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-bg-subtle border border-border-subtle">
                <span className="block editorial-eyebrow text-[10px] mb-1">
                  Creative Direction
                </span>
                <p className="text-text-secondary">
                  {project.caseStudy.creativeDirection}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-bg-subtle border border-border-subtle">
                <span className="block editorial-eyebrow text-[10px] mb-1">
                  Production Approach
                </span>
                <p className="text-text-secondary">
                  {project.caseStudy.productionApproach}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-accent-primary/12 border border-accent-primary/35">
                <span className="block editorial-eyebrow text-[10px] mb-1">
                  Final Output
                </span>
                <p className="text-text-heading font-medium">
                  {project.caseStudy.finalOutput}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 mt-4 border-t border-border-subtle space-y-2">
          <Link
            href={`/work/${slug}`}
            onClick={onClose}
            className="btn-secondary-surface w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-[11px]"
          >
            <span>Open Full Case Study</span>
            <ExternalLink size={12} />
          </Link>
          <button
            type="button"
            onClick={() => {
              onClose();
              triggerProjectInquiry({
                service: project.portfolioCategory || "3D Animation",
                contextNote: `Interested in a project similar to ${project.title} (${project.client})`,
              });
            }}
            className="btn-primary-cta w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[11px] group cursor-pointer"
          >
            <span>Start a Similar Project</span>
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function PortfolioGalleryModal({
  project,
  initialIndex = 0,
  onClose,
}: PortfolioGalleryModalProps) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key="portfolio-gallery-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[110] bg-black/88 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-8"
        >
          <ModalGalleryContent
            key={`${project.id}-${initialIndex}`}
            project={project}
            initialIndex={initialIndex}
            onClose={onClose}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
