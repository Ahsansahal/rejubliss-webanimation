"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Award,
  Star,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
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
      initial={{ scale: 0.95, opacity: 0, y: 12 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 12 }}
      transition={{ type: "spring", damping: 26, stiffness: 300 }}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study gallery`}
      className="relative w-full max-w-6xl max-h-[92dvh] bg-bg-card rounded-3xl overflow-hidden shadow-[var(--shadow-card-hover)] border border-border-accent grid grid-cols-1 lg:grid-cols-12 text-text-primary"
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute top-3.5 right-3.5 z-30 w-10 h-10 rounded-full bg-bg-card/95 backdrop-blur-md text-text-secondary flex items-center justify-center hover:bg-[var(--btn-primary-bg)] hover:text-[var(--text-on-primary)] transition-all border border-border-subtle shadow-[var(--shadow-card)] cursor-pointer"
      >
        <X size={19} />
      </button>

      {/* Left Column: Main High-Res Lightbox Viewer + Thumbnail Filmstrip */}
      <div className="lg:col-span-7 xl:col-span-8 bg-[var(--bg-modal-stage)] relative flex flex-col justify-between min-h-[320px] sm:min-h-[440px] lg:min-h-[600px] max-h-[52dvh] lg:max-h-[92dvh] border-b lg:border-b-0 lg:border-r border-border-subtle">
        {/* Top Counter Pill */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-card/90 backdrop-blur-md border border-border-subtle text-text-heading text-xs font-semibold shadow-[var(--shadow-card)]">
            <Images size={13} className="text-accent-interactive" />
            <span>
              {currentIndex + 1} / {total} {total === 1 ? "Visual" : "Visuals"}
            </span>
          </div>
          {project.caseStudy ? (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-bg-card/90 backdrop-blur-md border border-border-accent text-accent-primary text-[11px] font-bold">
              {project.caseStudy.projectTypeLabel}
            </span>
          ) : null}
        </div>

        {/* Main Stage */}
        <div className="relative flex-1 w-full min-h-[250px] sm:min-h-[360px] flex items-center justify-center p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSrc}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full min-h-[230px] sm:min-h-[340px] lg:min-h-[450px]"
            >
              <Image
                src={currentSrc}
                alt={`${project.title} — visual ${currentIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 95vw, 65vw"
                className="object-contain select-none"
                priority
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
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-bg-card/90 hover:bg-[var(--btn-primary-bg)] hover:text-[var(--text-on-primary)] backdrop-blur-md border border-border-subtle text-text-heading flex items-center justify-center transition-all shadow-[var(--shadow-card)] cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-bg-card/90 hover:bg-[var(--btn-primary-bg)] hover:text-[var(--text-on-primary)] backdrop-blur-md border border-border-subtle text-text-heading flex items-center justify-center transition-all shadow-[var(--shadow-card)] cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </>
          ) : null}
        </div>

        {/* Bottom Thumbnail Filmstrip */}
        {total > 1 ? (
          <div className="relative z-20 px-4 py-3 bg-bg-secondary/90 border-t border-border-subtle overflow-x-auto">
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
                        ? "ring-2 ring-accent-interactive scale-105 opacity-100"
                        : "opacity-60 hover:opacity-95 border border-border-subtle"
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
      <div className="lg:col-span-5 xl:col-span-4 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto max-h-[40dvh] lg:max-h-[92dvh] bg-[image:var(--bg-spotlight)]">
        <div className="space-y-4 pr-2">
          {/* Badge & Rating */}
          <div className="flex flex-wrap items-center gap-2 pr-9">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-bg-accent-soft text-accent-primary border border-border-accent">
              <Award size={13} className="text-accent-interactive" />
              <span>{project.badge}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-bg-subtle text-text-heading border border-border-subtle">
              <Star
                size={12}
                className="fill-accent-interactive text-accent-interactive"
              />
              <span>{project.rating.toFixed(1)}</span>
            </span>
          </div>

          {/* Client & Title */}
          <div>
            <p className="text-[11px] uppercase font-bold tracking-wider text-accent-primary mb-1">
              {project.caseStudy?.industry || project.genre} • Client:{" "}
              {project.client}
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-text-heading leading-tight">
              {project.title}
            </h3>
            {project.subtitle ? (
              <p className="text-xs sm:text-sm text-text-muted italic mt-0.5">
                {project.subtitle}
              </p>
            ) : null}
          </div>

          {/* Tab Switcher when structured case study exists */}
          {project.caseStudy ? (
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-bg-subtle border border-border-subtle">
              <button
                type="button"
                onClick={() => setDetailTab("overview")}
                className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  detailTab === "overview"
                    ? "btn-primary-solid"
                    : "text-text-secondary hover:text-accent-primary"
                }`}
              >
                Scope &amp; Overview
              </button>
              <button
                type="button"
                onClick={() => setDetailTab("breakdown")}
                className={`inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  detailTab === "breakdown"
                    ? "btn-primary-solid"
                    : "text-text-secondary hover:text-accent-primary"
                }`}
              >
                <FileText size={12} />
                <span>Case Study</span>
              </button>
            </div>
          ) : null}

          {detailTab === "overview" || !project.caseStudy ? (
            <>
              {/* Impact / Scope Summary */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-accent-soft border border-border-accent text-xs font-bold text-accent-primary">
                <TrendingUp size={14} className="text-accent-interactive" />
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
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">
                  Deliverables Produced
                </h4>
                <div className="grid grid-cols-1 gap-1.5">
                  {project.deliverables.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs font-medium text-text-secondary bg-bg-card/85 border border-border-subtle rounded-lg px-3 py-2"
                    >
                      <CheckCircle2
                        size={13}
                        className="text-accent-interactive shrink-0"
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-bg-card/85 border border-border-subtle">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-accent-primary mb-1">
                  The Challenge
                </span>
                <p className="text-text-secondary">
                  {project.caseStudy.challenge}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-bg-card/85 border border-border-subtle">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-accent-primary mb-1">
                  Creative Direction
                </span>
                <p className="text-text-secondary">
                  {project.caseStudy.creativeDirection}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-bg-card/85 border border-border-subtle">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-accent-primary mb-1">
                  Production Approach
                </span>
                <p className="text-text-secondary">
                  {project.caseStudy.productionApproach}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-bg-accent-soft/70 border border-border-accent">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-accent-primary mb-1">
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
            className="btn-secondary-surface w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold"
          >
            <span>Open Full Case Study Page</span>
            <ExternalLink size={13} className="text-accent-interactive" />
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
            className="btn-primary-cta w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold group cursor-pointer"
          >
            <span>Start a Similar Project</span>
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
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
          className="fixed inset-0 z-[110] bg-[var(--bg-backdrop)] backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8"
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
