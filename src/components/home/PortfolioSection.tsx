"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, ArrowUpRight, Expand, Play, Images } from "lucide-react";
import {
  ALL_PORTFOLIO_PROJECTS,
  type EnrichedProject,
  type PortfolioCategory,
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

const CATEGORIES: PortfolioCategory[] = [
  "All",
  "3D, CGI & Packaging",
  "Brand & Campaign Creative",
  "Web Design & WebGL",
  "Motion & Character",
];

// Curated 7-project flagship showcase for the default homepage view:
// Sums to 3 balanced asymmetrical Bento rows (7+5, 5+7, 4+4+4) with zero duplicates.
const CURATED_FLAGSHIP_SLUGS = [
  "desi-chai-london",
  "velox-automotive-commercial",
  "nexora-kinetic-web",
  "scoopy-ice-cream",
  "rezilo-recovery",
  "lumina-character-3d",
  "g-natural-botanicals",
];

const ANIMATION_SLUGS = new Set([
  "velox-automotive-commercial",
  "lumina-character-3d",
  "kinetic-identity-package",
  "vortex-fluid-motion",
  "nexora-kinetic-web",
]);

function getBentoSpanClass(index: number, isCuratedAll: boolean): {
  colSpan: string;
  aspect: string;
  sizes: string;
} {
  if (isCuratedAll) {
    switch (index) {
      case 0:
        return {
          colSpan: "lg:col-span-7",
          aspect: "aspect-[16/10]",
          sizes: "(max-width: 1024px) 96vw, 58vw",
        };
      case 1:
        return {
          colSpan: "lg:col-span-5",
          aspect: "aspect-[16/10] lg:aspect-[16/12.8]",
          sizes: "(max-width: 1024px) 96vw, 42vw",
        };
      case 2:
        return {
          colSpan: "lg:col-span-5",
          aspect: "aspect-[16/10] lg:aspect-[16/12.8]",
          sizes: "(max-width: 1024px) 96vw, 42vw",
        };
      case 3:
        return {
          colSpan: "lg:col-span-7",
          aspect: "aspect-[16/10]",
          sizes: "(max-width: 1024px) 96vw, 58vw",
        };
      default:
        return {
          colSpan: "lg:col-span-4",
          aspect: "aspect-[4/3]",
          sizes: "(max-width: 768px) 96vw, (max-width: 1024px) 48vw, 32vw",
        };
    }
  }

  // Filtered or expanded view: lead with a 7+5 pair when >=2 items, then 3-up
  if (index === 0) {
    return {
      colSpan: "lg:col-span-7",
      aspect: "aspect-[16/10]",
      sizes: "(max-width: 1024px) 96vw, 58vw",
    };
  }
  if (index === 1) {
    return {
      colSpan: "lg:col-span-5",
      aspect: "aspect-[16/10] lg:aspect-[16/12.8]",
      sizes: "(max-width: 1024px) 96vw, 42vw",
    };
  }
  return {
    colSpan: "lg:col-span-4",
    aspect: "aspect-[4/3]",
    sizes: "(max-width: 768px) 96vw, (max-width: 1024px) 48vw, 32vw",
  };
}

function PortfolioBentoCard({
  project,
  span,
  onQuickView,
}: {
  project: EnrichedProject;
  span: { colSpan: string; aspect: string; sizes: string };
  onQuickView: (project: EnrichedProject) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [frameIdx, setFrameIdx] = useState(0);

  const previewFrames = useMemo(
    () => project.gallery.slice(0, 5),
    [project.gallery]
  );
  const hasReelFrames = previewFrames.length > 1;
  const isMotionProject = ANIMATION_SLUGS.has(project.slug);

  // Smooth multi-frame reel scrub on hover (honoring reduced-motion)
  useEffect(() => {
    if (!hovered || !hasReelFrames) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const id = window.setInterval(() => {
      setFrameIdx((prev) => (prev + 1) % previewFrames.length);
    }, 1050);

    return () => window.clearInterval(id);
  }, [hovered, hasReelFrames, previewFrames.length]);

  const activeImage = hovered
    ? previewFrames[frameIdx] || project.image
    : project.image;

  return (
    <article
      data-gsap-reveal
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setFrameIdx(0);
      }}
      className={`${span.colSpan} group flex flex-col`}
    >
      {/* Dominant Visual Canvas */}
      <div
        className={`relative w-full ${span.aspect} rounded-[24px] overflow-hidden bg-midnight-navy border border-border-subtle group-hover:border-border-accent shadow-[var(--shadow-card)] group-hover:shadow-[var(--shadow-card-hover)] transition-all duration-500`}
      >
        <Link
          href={`/work/${project.slug}`}
          aria-label={`View ${project.fullTitle} case study`}
          className="block absolute inset-0 z-10"
        >
          <Image
            src={activeImage}
            alt={`${project.fullTitle} — ${project.client}`}
            fill
            sizes={span.sizes}
            className="object-cover group-hover:scale-[1.035] transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-navy/80 via-midnight-navy/10 to-transparent opacity-65 group-hover:opacity-85 transition-opacity duration-300" />
        </Link>

        {/* Subtle Top Indicators */}
        <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between gap-2 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-midnight-navy/75 backdrop-blur-md border border-pearl-white/15 text-[11px] font-semibold text-pearl-white">
            {project.portfolioCategory}
          </span>

          {isMotionProject ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-deep-teal/90 backdrop-blur-md text-[11px] font-bold text-pearl-white">
              <Play size={10} className="fill-current" />
              <span>Motion / 3D</span>
            </span>
          ) : hasReelFrames ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-midnight-navy/75 backdrop-blur-md border border-pearl-white/15 text-[11px] font-medium text-pearl-white">
              <Images size={11} className="text-ice-cyan" />
              <span>
                {hovered
                  ? `${frameIdx + 1}/${previewFrames.length}`
                  : `${project.gallery.length} Frames`}
              </span>
            </span>
          ) : null}
        </div>

        {/* Hover Lightbox Trigger + Bottom Reveal Caption */}
        <div className="absolute bottom-3.5 left-4 right-4 z-20 flex items-end justify-between gap-3 pointer-events-none">
          <p className="text-xs text-pearl-white/90 line-clamp-1 opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 max-w-md">
            {project.subtitle}
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(project);
            }}
            aria-label={`Quick gallery preview for ${project.title}`}
            className="pointer-events-auto ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-midnight-navy/85 hover:bg-deep-teal backdrop-blur-md border border-pearl-white/20 text-[11px] font-bold text-pearl-white transition-colors cursor-pointer"
          >
            <Expand size={12} />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Concise Editorial Metadata Beneath Frame */}
      <div className="pt-3.5 px-1 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-text-muted mb-0.5">
            <span className="font-semibold text-accent-primary">
              {project.client}
            </span>
            <span>•</span>
            <span className="truncate">{project.caseStudy.industry}</span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-text-heading group-hover:text-accent-primary transition-colors truncate">
            <Link href={`/work/${project.slug}`}>{project.title}</Link>
          </h3>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 pt-1 shrink-0">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-bg-secondary border border-border-subtle text-text-secondary"
            >
              {tag}
            </span>
          ))}
          <Link
            href={`/work/${project.slug}`}
            aria-label={`Open ${project.title} case study`}
            className="w-7 h-7 rounded-full border border-border-subtle flex items-center justify-center text-text-muted group-hover:text-accent-primary group-hover:border-border-accent transition-colors"
          >
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PortfolioSection({
  showAllByDefault = false,
}: {
  showAllByDefault?: boolean;
} = {}) {
  const [selectedCategory, setSelectedCategory] =
    useState<PortfolioCategory>("All");
  const [expandedAll, setExpandedAll] = useState(showAllByDefault);
  const [modalProject, setModalProject] = useState<EnrichedProject | null>(
    null
  );
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapSectionReveal(sectionRef);

  const curatedProjects = useMemo(() => {
    const bySlug = new Map(ALL_PORTFOLIO_PROJECTS.map((p) => [p.slug, p]));
    return CURATED_FLAGSHIP_SLUGS.map((slug) => bySlug.get(slug)).filter(
      (p): p is EnrichedProject => Boolean(p)
    );
  }, []);

  const visibleProjects = useMemo(() => {
    if (selectedCategory === "All") {
      return expandedAll ? ALL_PORTFOLIO_PROJECTS : curatedProjects;
    }
    return ALL_PORTFOLIO_PROJECTS.filter(
      (p) => p.portfolioCategory === selectedCategory
    );
  }, [selectedCategory, expandedAll, curatedProjects]);

  const isCuratedAll = selectedCategory === "All" && !expandedAll;

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      aria-labelledby="portfolio-heading"
      className="relative py-22 sm:py-28 bg-bg-primary transition-colors duration-300"
    >
      {/* Legacy hash compatibility */}
      <div id="portfolio-spotlight" className="absolute -top-24" aria-hidden="true" />
      <div id="featured-work" className="absolute -top-24" aria-hidden="true" />

      <div className="w-[97%] max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6">
        {/* Header + Simple Discipline Filter Bar */}
        <div
          data-gsap-reveal
          className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-10 sm:mb-12"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-accent-interactive" />
              <span className="text-xs font-bold tracking-widest uppercase text-accent-primary">
                Selected Work &amp; Case Studies
              </span>
            </div>
            <h2
              id="portfolio-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[48px] font-bold text-text-heading leading-tight tracking-tight"
            >
              Crafted to Command{" "}
              <span className="hero-gradient-text italic font-normal">
                Attention
              </span>
            </h2>
          </div>

          {/* Clean Category Navigation */}
          <div
            role="tablist"
            aria-label="Filter portfolio by category"
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const label = cat === "All" ? "Featured Work" : cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "btn-primary-solid"
                      : "bg-bg-secondary text-text-secondary hover:text-text-heading border border-border-subtle hover:border-border-accent"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetrical Bento Visual Grid (Zero Duplicate Projects) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10">
          {visibleProjects.map((project, index) => (
            <PortfolioBentoCard
              key={project.slug}
              project={project}
              span={getBentoSpanClass(index, isCuratedAll)}
              onQuickView={(proj) => setModalProject(proj)}
            />
          ))}
        </div>

        {/* Strategic Post-Portfolio Conversion Strip */}
        <div
          data-gsap-reveal
          className="mt-14 pt-8 border-t border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-5"
        >
          <div className="flex flex-wrap items-center gap-4">
            {isCuratedAll ? (
              <button
                type="button"
                onClick={() => setExpandedAll(true)}
                className="btn-secondary-surface inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold cursor-pointer"
              >
                <span>
                  Show All {ALL_PORTFOLIO_PROJECTS.length} Productions
                </span>
              </button>
            ) : !showAllByDefault && selectedCategory === "All" ? (
              <button
                type="button"
                onClick={() => setExpandedAll(false)}
                className="btn-secondary-surface inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold cursor-pointer"
              >
                <span>Show Curated Selection</span>
              </button>
            ) : null}

            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-text-secondary hover:text-accent-primary transition-colors"
            >
              <span>Browse Full Case Study Index</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          {/* Strategic CTA Placement #2: After the Portfolio */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs sm:text-sm text-text-muted hidden sm:inline">
              Planning a product reveal, CGI campaign, or interactive web build?
            </span>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                triggerProjectInquiry();
              }}
              className="btn-primary-cta inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold group"
            >
              <span>Start Your Project</span>
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>

      {modalProject ? (
        <PortfolioGalleryModal
          project={modalProject}
          initialIndex={0}
          onClose={() => setModalProject(null)}
        />
      ) : null}
    </section>
  );
}
