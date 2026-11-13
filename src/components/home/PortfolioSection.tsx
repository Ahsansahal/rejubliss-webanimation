"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight, Expand, Play, Images } from "lucide-react";
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

// Act II of Portfolio: Cross-discipline Bento showcase featuring 7 distinct
// works that do NOT duplicate the 4 Flagship Release campaigns above, while
// expanding to all 18 productions on filter or "Show All 18 Productions".
const CURATED_FEATURED_SLUGS = [
  "velox-automotive-commercial",
  "nexora-kinetic-web",
  "lure-luxury-jewellery",
  "strata-ecommerce-3d",
  "lumina-character-3d",
  "gul-ahmed-campaigns",
  "vortex-fluid-motion",
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
  frameHeight: string;
  sizes: string;
} {
  if (isCuratedAll) {
    switch (index) {
      case 0:
        return {
          colSpan: "lg:col-span-7",
          frameHeight: "aspect-[16/10] lg:aspect-auto lg:h-[420px] xl:h-[480px] 2xl:h-[540px]",
          sizes: "(max-width: 1024px) 96vw, 58vw",
        };
      case 1:
        return {
          colSpan: "lg:col-span-5",
          frameHeight: "aspect-[16/10] lg:aspect-auto lg:h-[420px] xl:h-[480px] 2xl:h-[540px]",
          sizes: "(max-width: 1024px) 96vw, 42vw",
        };
      case 2:
        return {
          colSpan: "lg:col-span-5",
          frameHeight: "aspect-[16/10] lg:aspect-auto lg:h-[420px] xl:h-[480px] 2xl:h-[540px]",
          sizes: "(max-width: 1024px) 96vw, 42vw",
        };
      case 3:
        return {
          colSpan: "lg:col-span-7",
          frameHeight: "aspect-[16/10] lg:aspect-auto lg:h-[420px] xl:h-[480px] 2xl:h-[540px]",
          sizes: "(max-width: 1024px) 96vw, 58vw",
        };
      default:
        return {
          colSpan: "lg:col-span-4",
          frameHeight: "aspect-[4/3]",
          sizes: "(max-width: 768px) 96vw, (max-width: 1024px) 48vw, 32vw",
        };
    }
  }

  // Filtered or expanded view: lead with an aligned 7+5 pair, then clean 3-up rows
  if (index === 0) {
    return {
      colSpan: "lg:col-span-7",
      frameHeight: "aspect-[16/10] lg:aspect-auto lg:h-[420px] xl:h-[480px] 2xl:h-[540px]",
      sizes: "(max-width: 1024px) 96vw, 58vw",
    };
  }
  if (index === 1) {
    return {
      colSpan: "lg:col-span-5",
      frameHeight: "aspect-[16/10] lg:aspect-auto lg:h-[420px] xl:h-[480px] 2xl:h-[540px]",
      sizes: "(max-width: 1024px) 96vw, 42vw",
    };
  }
  return {
    colSpan: "lg:col-span-4",
    frameHeight: "aspect-[4/3]",
    sizes: "(max-width: 768px) 96vw, (max-width: 1024px) 48vw, 32vw",
  };
}

function PortfolioBentoCard({
  project,
  span,
  onQuickView,
}: {
  project: EnrichedProject;
  span: { colSpan: string; frameHeight: string; sizes: string };
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
        className={`relative w-full ${span.frameHeight} rounded-[20px] overflow-hidden bg-[#050507] border border-border-subtle group-hover:border-accent-primary/55 shadow-[var(--shadow-card)] group-hover:shadow-[var(--shadow-card-hover)] transition-all duration-500`}
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
            className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
        </Link>

        {/* Top-Left & Top-Right Editorial Indicators (Always dark glass over imagery) */}
        <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between gap-2 pointer-events-none">
          {isMotionProject ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#f5f4ef]">
              <Play size={10} className="fill-[#e53726] text-[#e53726]" />
              <span>Motion / 3D</span>
            </span>
          ) : hasReelFrames ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#f5f4ef]">
              <Images size={11} className="text-[#e53726]" />
              <span>
                {hovered
                  ? `${frameIdx + 1} / ${previewFrames.length}`
                  : `${project.gallery.length} Visuals`}
              </span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#f5f4ef]">
              {project.portfolioCategory}
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(project);
            }}
            aria-label={`Quick gallery preview for ${project.title}`}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 hover:bg-accent-primary hover:text-black hover:border-accent-primary backdrop-blur-md border border-white/15 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#f5f4ef] transition-all cursor-pointer"
          >
            <Expand size={11} />
            <span>Preview</span>
          </button>
        </div>

        {/* Bottom-Right Circular Case Study Arrow */}
        <Link
          href={`/work/${project.slug}`}
          aria-label={`Open ${project.title} case study`}
          className="absolute bottom-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-black/80 group-hover:bg-accent-primary text-[#f5f4ef] group-hover:text-black border border-white/15 group-hover:border-accent-primary flex items-center justify-center transition-all duration-300"
        >
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* Unboxed Editorial Metadata Beneath Frame */}
      <div className="pt-4 px-0.5 space-y-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg sm:text-xl font-bold tracking-[-0.025em] text-text-heading group-hover:text-accent-primary transition-colors leading-snug">
            <Link href={`/work/${project.slug}`}>{project.title}</Link>
          </h3>
        </div>

        {project.subtitle ? (
          <p className="text-xs sm:text-sm text-text-secondary line-clamp-1">
            {project.subtitle}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-0.5 text-xs text-text-muted">
          <span className="font-semibold text-accent-primary">
            {project.client}
          </span>
          <span>·</span>
          <span>{project.caseStudy.industry}</span>
          {project.tags.slice(0, 2).map((tag) => (
            <React.Fragment key={tag}>
              <span>·</span>
              <span>{tag}</span>
            </React.Fragment>
          ))}
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
    return CURATED_FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter(
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
      className={`relative py-22 sm:py-28 ${
        showAllByDefault
          ? "bg-bg-primary"
          : "bg-bg-secondary border-b border-border-subtle"
      }`}
    >
      {/* Legacy hash compatibility */}
      <div id="featured-work" className="absolute -top-24" aria-hidden="true" />
      {showAllByDefault ? (
        <div
          id="portfolio-spotlight"
          className="absolute -top-24"
          aria-hidden="true"
        />
      ) : null}

      <div className="w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6">
        {/* Header + Discipline Filter Bar */}
        <div
          data-gsap-reveal
          className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-8 mb-10 sm:mb-12 border-b border-border-subtle"
        >
          <div className="max-w-2xl">
            <span className="editorial-eyebrow block mb-3">
              {showAllByDefault
                ? "Complete Archive · All 18 Studio Productions"
                : "04 · Featured Work — Cross-Discipline Showcase"}
            </span>
            <h2
              id="portfolio-heading"
              className="font-display text-3xl sm:text-4xl lg:text-[48px] font-bold text-text-heading leading-[1.05] tracking-[-0.03em]"
            >
              Crafted to Command{" "}
              <span className="text-accent-primary">Attention</span>
            </h2>
          </div>

          {/* Pill Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter portfolio by category"
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const label =
                cat === "All"
                  ? expandedAll
                    ? `All ${ALL_PORTFOLIO_PROJECTS.length} Works`
                    : "Selected Showcase"
                  : cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[11.5px] font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "btn-primary-solid"
                      : "bg-bg-card text-text-secondary hover:text-text-heading border border-border-subtle hover:border-accent-primary/50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetrical Bento Visual Grid (Aligned Row Heights & Zero Overlap) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-11">
          {visibleProjects.map((project, index) => (
            <PortfolioBentoCard
              key={project.slug}
              project={project}
              span={getBentoSpanClass(index, isCuratedAll)}
              onQuickView={(proj) => setModalProject(proj)}
            />
          ))}
        </div>

        {/* Post-Portfolio Conversion Strip */}
        <div
          data-gsap-reveal
          className="mt-14 pt-8 border-t border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-5"
        >
          <div className="flex flex-wrap items-center gap-4">
            {isCuratedAll ? (
              <button
                type="button"
                onClick={() => setExpandedAll(true)}
                className="btn-secondary-surface inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs cursor-pointer"
              >
                <span>
                  Explore All {ALL_PORTFOLIO_PROJECTS.length} Productions
                </span>
              </button>
            ) : !showAllByDefault && selectedCategory === "All" ? (
              <button
                type="button"
                onClick={() => setExpandedAll(false)}
                className="btn-secondary-surface inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs cursor-pointer"
              >
                <span>Show Curated Selection</span>
              </button>
            ) : null}

            {!showAllByDefault ? (
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-[0.08em] font-bold text-text-secondary hover:text-accent-primary transition-colors"
              >
                <span>Full Case Study Index</span>
                <ArrowUpRight size={14} className="text-accent-primary" />
              </Link>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs sm:text-sm text-text-muted hidden sm:inline">
              Planning a product reveal, CGI campaign, or interactive web build?
            </span>
            <Link
              href="/#contact"
              onClick={(e) => {
                if (
                  typeof window !== "undefined" &&
                  window.location.pathname === "/"
                ) {
                  e.preventDefault();
                  triggerProjectInquiry();
                }
              }}
              className="btn-primary-cta inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs group"
            >
              <span>Start Your Project</span>
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
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
