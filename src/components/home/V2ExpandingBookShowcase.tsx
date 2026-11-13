"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Star,
  ExternalLink,
  ArrowRight,
  Award,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  TrendingUp,
  Images,
} from "lucide-react";
import portfolioData from "@/data/portfolio.json";
import {
  PortfolioGalleryModal,
  type PortfolioModalProject,
} from "@/components/common/PortfolioGalleryModal";

export type ShowcaseGenreCategory =
  | "All"
  | "Brand & Graphic"
  | "3D & Packaging CGI"
  | "Web Design"
  | "Motion Graphics";

export interface SpotlightProject extends PortfolioModalProject {
  num: string;
  subtitle: string;
  genreCategory: Exclude<ShowcaseGenreCategory, "All">;
  badgeColor: string;
  tags: string[];
  featuredFilter: "web" | "3d" | "2d" | "graphic" | "motion";
}

function resolveGenreCategory(
  category: string | undefined,
  genre: string
): Exclude<ShowcaseGenreCategory, "All"> {
  if (
    category === "Brand & Graphic" ||
    category === "3D & Packaging CGI" ||
    category === "Web Design" ||
    category === "Motion Graphics"
  ) {
    return category;
  }
  if (genre.includes("3D") || genre.includes("Character") || genre.includes("Automotive")) {
    return "3D & Packaging CGI";
  }
  if (genre.includes("Web") || genre.includes("Experience")) return "Web Design";
  if (genre.includes("Motion") || genre.includes("VFX")) return "Motion Graphics";
  return "Brand & Graphic";
}

function getBadgeColor(cat: Exclude<ShowcaseGenreCategory, "All">): string {
  switch (cat) {
    case "3D & Packaging CGI":
      return "bg-bg-accent-soft text-accent-primary border-border-accent";
    case "Web Design":
      return "bg-bg-subtle text-accent-primary border-border-strong";
    case "Motion Graphics":
      return "bg-bg-accent-soft text-accent-highlight border-border-accent";
    case "Brand & Graphic":
    default:
      return "bg-bg-subtle text-text-heading border-border-subtle";
  }
}

interface RawProjectItem {
  slug: string;
  title: string;
  client: string;
  genre: string;
  category?: string;
  featuredFilter?: "web" | "3d" | "2d" | "graphic" | "motion";
  badge?: string;
  rating?: number;
  reviewsCount?: number;
  impactMetric?: string;
  tags?: string[];
  image: string;
  gallery?: string[];
  metaDescription?: string;
  scope?: string[];
}

export const ALL_SPOTLIGHT_PROJECTS: SpotlightProject[] = (portfolioData as RawProjectItem[]).map(
  (p, idx) => {
    const genreCategory = resolveGenreCategory(p.category, p.genre);

    let title = p.title;
    let subtitle = p.genre;
    if (p.title.includes(":")) {
      const parts = p.title.split(":");
      title = parts[0].trim();
      subtitle = parts.slice(1).join(":").trim();
    } else if (p.title.includes(" - ")) {
      const parts = p.title.split(" - ");
      title = parts[0].trim();
      subtitle = parts.slice(1).join(" - ").trim();
    }

    const fallbackMetrics = [
      "+340% Engagement",
      "2.4M Video Views",
      "99/100 Performance",
      "+185% Conversion",
      "4K HDR Raytraced",
      "WebGL Interactive",
    ];

    const gallery = p.gallery && p.gallery.length > 0 ? p.gallery : [p.image];

    return {
      id: p.slug,
      num: String(idx + 1).padStart(2, "0"),
      title,
      subtitle,
      client: p.client,
      genreCategory,
      featuredFilter: p.featuredFilter || "graphic",
      genre: p.genre,
      badge:
        p.badge ||
        (p.rating && p.rating >= 4.9 ? "Featured Case Study" : "Production Release"),
      badgeColor: getBadgeColor(genreCategory),
      image: p.image,
      gallery,
      rating: p.rating || 4.9,
      reviewsCount: p.reviewsCount || 150,
      impactMetric: p.impactMetric || fallbackMetrics[idx % fallbackMetrics.length],
      tags: p.tags || ["4K Render", "Octane / Three.js", "Production Ready"],
      synopsis: p.metaDescription || p.title,
      deliverables: p.scope || [
        "Brand & Asset Pipeline",
        "Lighting & Art Direction",
        "Multi-Channel Delivery",
        "Worldwide Release",
      ],
    };
  }
);

export function V2ExpandingBookShowcase() {
  const [selectedGenre, setSelectedGenre] = React.useState<ShowcaseGenreCategory>("All");
  const [page, setPage] = React.useState<number>(0);
  const [modalState, setModalState] = React.useState<{
    project: SpotlightProject;
    initialIndex: number;
  } | null>(null);
  const PAGE_SIZE = 6;

  const genreCounts = React.useMemo(() => {
    return {
      All: ALL_SPOTLIGHT_PROJECTS.length,
      "Brand & Graphic": ALL_SPOTLIGHT_PROJECTS.filter(
        (p) => p.genreCategory === "Brand & Graphic"
      ).length,
      "3D & Packaging CGI": ALL_SPOTLIGHT_PROJECTS.filter(
        (p) => p.genreCategory === "3D & Packaging CGI"
      ).length,
      "Web Design": ALL_SPOTLIGHT_PROJECTS.filter((p) => p.genreCategory === "Web Design")
        .length,
      "Motion Graphics": ALL_SPOTLIGHT_PROJECTS.filter(
        (p) => p.genreCategory === "Motion Graphics"
      ).length,
    };
  }, []);

  const genreCategories: { id: ShowcaseGenreCategory; label: string }[] = [
    { id: "All", label: `All Projects (${genreCounts.All})` },
    { id: "Brand & Graphic", label: `Brand & Graphic (${genreCounts["Brand & Graphic"]})` },
    {
      id: "3D & Packaging CGI",
      label: `3D & Packaging CGI (${genreCounts["3D & Packaging CGI"]})`,
    },
    { id: "Web Design", label: `Web Design (${genreCounts["Web Design"]})` },
    { id: "Motion Graphics", label: `Motion Graphics (${genreCounts["Motion Graphics"]})` },
  ];

  const filteredProjects = React.useMemo(() => {
    if (selectedGenre === "All") return ALL_SPOTLIGHT_PROJECTS;
    return ALL_SPOTLIGHT_PROJECTS.filter((p) => p.genreCategory === selectedGenre);
  }, [selectedGenre]);

  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE);

  const displayedProjects = React.useMemo(() => {
    const start = page * PAGE_SIZE;
    return filteredProjects.slice(start, start + PAGE_SIZE);
  }, [filteredProjects, page]);

  const [userSelectedId, setUserSelectedId] = React.useState<string | null>(null);

  const activeId =
    userSelectedId && displayedProjects.some((p) => p.id === userSelectedId)
      ? userSelectedId
      : displayedProjects[0]?.id || "";

  const setActiveId = (id: string) => {
    setUserSelectedId(id);
  };

  const openGallery = (project: SpotlightProject, initialIndex = 0) => {
    setModalState({ project, initialIndex });
  };

  return (
    <section
      id="portfolio"
      className="relative py-16 sm:py-24 bg-[image:var(--bg-showcase-section)] border-b border-border-subtle overflow-hidden w-full font-sans transition-colors duration-300"
    >
      <div id="portfolio-spotlight" className="absolute -top-20" />
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[var(--ambient-orb-1)] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[450px] bg-[var(--ambient-orb-2)] rounded-full blur-[120px] pointer-events-none" />

      {/* Panoramic Max-Width Container */}
      <div className="relative w-[97%] max-w-[1850px] mx-auto z-10 px-2 sm:px-4 lg:px-6">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 lg:mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-accent-soft border border-border-accent text-accent-primary text-xs font-bold tracking-wider uppercase mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-accent-interactive" />
              <span>
                Interactive Showcase • All {ALL_SPOTLIGHT_PROJECTS.length} Featured Case Studies
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-heading tracking-tight leading-tight">
              Flagship Releases.{" "}
              <span className="hero-gradient-text font-serif">
                Proven Impact.
              </span>
            </h2>
            <p className="mt-3 text-text-secondary text-base sm:text-lg leading-relaxed">
              Explore our studio&apos;s published work spanning brand identity, 3D packaging &amp;
              product CGI, retail social campaigns, WebGL experiences, and motion graphics. Hover
              any card or open its full visual gallery.
            </p>
          </div>

          {/* Stepper / Pagination & Indicator */}
          <div className="flex flex-wrap items-center gap-4">
            {totalPages > 1 ? (
              <div className="flex items-center gap-2 bg-bg-card/90 backdrop-blur-md border border-border-subtle rounded-full px-3.5 py-1.5 shadow-[var(--shadow-card)] text-xs font-semibold text-text-secondary">
                <span>
                  Showing {page * PAGE_SIZE + 1}–
                  {Math.min((page + 1) * PAGE_SIZE, filteredProjects.length)} of{" "}
                  {filteredProjects.length} Projects
                </span>
                <div className="w-[1px] h-3.5 bg-border-subtle mx-1" />
                <button
                  type="button"
                  onClick={() => {
                    setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
                  }}
                  className="p-1 rounded-full text-accent-primary hover:bg-bg-accent-soft transition-colors cursor-pointer"
                  title="Previous Set"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
                  }}
                  className="p-1 rounded-full text-accent-primary hover:bg-bg-accent-soft transition-colors cursor-pointer"
                  title="Next Set"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : null}

            <div className="hidden md:flex items-center gap-2 text-xs text-text-muted font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-accent-interactive animate-ping" />
              <span>Interactive Accordion</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* GENRE CATEGORY FILTER TABS                                */}
        {/* ========================================================= */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
          {genreCategories.map((cat) => {
            const isSelected = selectedGenre === cat.id;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => {
                  setSelectedGenre(cat.id);
                  setPage(0);
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "btn-primary-solid"
                    : "bg-bg-card text-text-secondary hover:bg-bg-subtle hover:text-accent-primary border border-border-subtle shadow-[var(--shadow-card)]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* HORIZONTAL EXPANDING ACCORDION (DESKTOP / TABLET)         */}
        {/* ========================================================= */}
        <div className="hidden md:flex flex-row items-stretch gap-3 lg:gap-4 h-[560px] lg:h-[580px] w-full select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedGenre}-${page}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-row items-stretch gap-3 lg:gap-4 w-full h-full"
            >
              {displayedProjects.map((project) => {
                const isActive = activeId === project.id;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    onClick={() => setActiveId(project.id)}
                    onMouseEnter={() => setActiveId(project.id)}
                    transition={{
                      layout: { type: "spring", stiffness: 220, damping: 28 },
                    }}
                    className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${
                      isActive
                        ? "flex-[4.2] bg-bg-card border-2 border-border-accent-strong shadow-[var(--shadow-card-hover)]"
                        : "flex-1 bg-bg-card border border-border-subtle hover:border-border-accent shadow-[var(--shadow-card)]"
                    }`}
                  >
                    {/* Background Cover Artwork for Collapsed Preview */}
                    {!isActive ? (
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1440px) 25vw, 15vw"
                          className="object-cover object-center filter grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-[image:var(--photo-scrim-gradient)]" />
                      </div>
                    ) : null}

                    {/* Active Card Interior Gradient */}
                    {isActive ? (
                      <div className="absolute inset-0 bg-[image:var(--bg-active-card)] pointer-events-none z-0" />
                    ) : null}

                    {/* ========================================== */}
                    {/* COLLAPSED STATE (Inactive Card)           */}
                    {/* ========================================== */}
                    {!isActive ? (
                      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-6 px-3">
                        <span className="btn-primary-solid font-mono font-extrabold text-sm px-2.5 py-1 rounded-full">
                          {project.num}
                        </span>

                        <div className="my-auto flex items-center justify-center">
                          <p
                            className="text-pearl-white text-sm lg:text-base font-bold tracking-widest uppercase whitespace-nowrap drop-shadow-[0_2px_4px_rgba(6,27,53,0.85)]"
                            style={{
                              writingMode: "vertical-rl",
                              transform: "rotate(180deg)",
                            }}
                          >
                            {project.title}
                          </p>
                        </div>

                        <div className="w-8 h-8 rounded-full bg-bg-card/90 backdrop-blur-md flex items-center justify-center border border-border-subtle text-accent-primary shadow-sm transition-all">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    ) : null}

                    {/* ========================================== */}
                    {/* EXPANDED STATE (Active Card)              */}
                    {/* ========================================== */}
                    {isActive ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="relative z-10 w-full h-full p-6 lg:p-8 flex flex-col justify-between overflow-hidden"
                      >
                        {/* Top Bar: Index + Category Pill + Rating */}
                        <div className="flex items-center justify-between gap-3 border-b border-border-subtle pb-4">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-accent-primary font-black text-2xl">
                              {project.num}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold border ${project.badgeColor} flex items-center gap-1.5`}
                            >
                              <Award className="w-3.5 h-3.5 text-accent-interactive" />
                              <span>{project.badge}</span>
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 bg-bg-accent-soft border border-border-accent px-3 py-1 rounded-full text-xs font-bold text-text-heading">
                            <Star className="w-3.5 h-3.5 fill-accent-interactive text-accent-interactive" />
                            <span>{project.rating.toFixed(1)}</span>
                            <span className="text-text-muted font-normal">
                              ({project.reviewsCount}+ client ratings)
                            </span>
                          </div>
                        </div>

                        {/* Center Area: High-Res Cover Mockup + Thumbnails + Details */}
                        <div className="grid grid-cols-12 gap-6 lg:gap-8 my-auto items-center py-2">
                          {/* Left: Floating Project Artwork + Gallery Mini Strip */}
                          <div className="col-span-5 lg:col-span-5 flex flex-col items-center justify-center gap-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openGallery(project, 0);
                              }}
                              className="block group/coverLink w-full max-w-[280px] lg:max-w-[320px] text-left cursor-pointer"
                            >
                              <div className="relative group/cover w-full aspect-[16/11] rounded-2xl overflow-hidden shadow-[var(--shadow-card-hover)] transition-transform duration-500 group-hover/cover:scale-[1.03] border border-border-subtle bg-bg-subtle">
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  fill
                                  sizes="(max-width: 768px) 250px, 320px"
                                  className="object-cover z-10"
                                  priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-midnight-navy/55 via-transparent to-transparent z-20 pointer-events-none" />
                                {project.gallery.length > 1 ? (
                                  <div className="absolute bottom-2.5 right-2.5 z-30 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-midnight-navy/85 backdrop-blur-md text-pearl-white text-[11px] font-semibold border border-ice-cyan/30">
                                    <Images className="w-3 h-3 text-ice-cyan" />
                                    <span>{project.gallery.length} Visuals</span>
                                  </div>
                                ) : null}
                              </div>
                            </button>

                            {/* Quick Preview Thumbnail Strip */}
                            {project.gallery.length > 1 ? (
                              <div className="flex items-center justify-center gap-1.5 w-full max-w-[320px]">
                                {project.gallery.slice(0, 4).map((thumb, tIdx) => {
                                  const remaining = project.gallery.length - 4;
                                  const showMoreOverlay = tIdx === 3 && remaining > 0;
                                  return (
                                    <button
                                      key={thumb}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openGallery(project, tIdx);
                                      }}
                                      aria-label={`Open ${project.title} image ${tIdx + 1}`}
                                      className="relative w-12 h-10 lg:w-14 lg:h-11 rounded-lg overflow-hidden border border-border-subtle hover:border-accent-interactive transition-all cursor-pointer group/thumb"
                                    >
                                      <Image
                                        src={thumb}
                                        alt=""
                                        fill
                                        sizes="56px"
                                        className="object-cover group-hover/thumb:scale-110 transition-transform"
                                      />
                                      {showMoreOverlay ? (
                                        <div className="absolute inset-0 bg-midnight-navy/80 flex items-center justify-center text-[10px] font-bold text-pearl-white">
                                          +{remaining}
                                        </div>
                                      ) : null}
                                    </button>
                                  );
                                })}
                              </div>
                            ) : null}
                          </div>

                          {/* Right: Project Story, Accolades & Impact */}
                          <div className="col-span-7 lg:col-span-7 flex flex-col justify-center space-y-3">
                            <div>
                              <p className="text-xs uppercase font-bold tracking-wider text-accent-primary mb-1 flex items-center gap-1.5">
                                <span>{project.genre}</span>
                                <span className="text-border-strong">•</span>
                                <span className="text-text-secondary font-semibold">
                                  Client: {project.client}
                                </span>
                              </p>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openGallery(project, 0);
                                }}
                                className="hover:text-accent-primary transition-colors text-left cursor-pointer"
                              >
                                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-text-heading hover:text-accent-primary leading-tight tracking-tight transition-colors">
                                  {project.title}
                                </h3>
                              </button>
                              <p className="text-sm font-medium text-text-muted italic">
                                {project.subtitle}
                              </p>
                            </div>

                            <p className="text-text-secondary text-xs lg:text-sm leading-relaxed line-clamp-3 font-normal">
                              {project.synopsis}
                            </p>

                            {/* Deliverables tags */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {project.deliverables.map((item) => (
                                <span
                                  key={item}
                                  className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-md bg-bg-subtle border border-border-subtle text-text-secondary"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-accent-interactive" />
                                  <span>{item}</span>
                                </span>
                              ))}
                            </div>

                            {/* Impact metric and format highlight */}
                            <div className="flex items-center gap-4 text-xs font-semibold text-text-secondary pt-1">
                              <span className="flex items-center gap-1 text-accent-primary font-bold">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>{project.impactMetric}</span>
                              </span>
                              <span className="text-border-strong">•</span>
                              <span className="text-text-muted">
                                {project.tags.join(" · ")}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Action Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                          <div className="flex items-center gap-2 text-xs text-text-muted font-medium">
                            <span className="w-2 h-2 rounded-full bg-accent-interactive animate-pulse-subtle" />
                            <span>Delivered with Production Excellence</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openGallery(project, 0);
                              }}
                              className="btn-primary-cta inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs lg:text-sm font-bold cursor-pointer"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>
                                {project.gallery.length > 1
                                  ? `View All ${project.gallery.length} Visuals`
                                  : "Explore Case Study"}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================================= */}
        {/* MOBILE / TOUCH ACCORDION (< 768px)                        */}
        {/* ========================================================= */}
        <div className="md:hidden flex flex-col gap-3">
          {displayedProjects.map((project) => {
            const isActive = activeId === project.id;

            return (
              <div
                key={project.id}
                onClick={() => setActiveId(isActive ? "" : project.id)}
                className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isActive
                    ? "border-border-accent-strong bg-bg-card shadow-[var(--shadow-card-hover)]"
                    : "border-border-subtle bg-bg-card shadow-[var(--shadow-card)]"
                }`}
              >
                {/* Collapsed Header Bar */}
                <div className="p-4 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="btn-primary-solid font-mono font-bold text-xs px-2 py-0.5 rounded-full">
                      {project.num}
                    </span>
                    <div className="text-left">
                      <p className="text-text-heading font-bold text-sm leading-tight">
                        {project.title}
                      </p>
                      <p className="text-xs text-text-muted">{project.genre}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${project.badgeColor}`}
                    >
                      {project.badge}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 text-accent-primary transition-transform duration-300 ${
                        isActive ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Content Drawer */}
                <AnimatePresence>
                  {isActive ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-5 pt-2 border-t border-border-subtle bg-bg-subtle/45"
                    >
                      <div className="flex gap-4 items-center mb-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openGallery(project, 0);
                          }}
                          className="shrink-0 relative w-24 h-24 rounded-xl overflow-hidden shadow-[var(--shadow-card)] border border-border-subtle"
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </button>
                        <div className="space-y-1 text-left">
                          <p className="text-xs font-bold text-accent-primary">
                            Client: {project.client}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-accent-primary font-bold">
                            <Star className="w-3.5 h-3.5 fill-accent-interactive text-accent-interactive" />
                            <span>{project.rating.toFixed(1)}</span>
                            <span className="text-text-muted font-normal">
                              ({project.reviewsCount}+)
                            </span>
                          </div>
                          <p className="text-xs text-accent-primary font-semibold">
                            {project.impactMetric}
                          </p>
                          <p className="text-xs text-text-secondary line-clamp-2">
                            {project.synopsis}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openGallery(project, 0);
                        }}
                        className="btn-primary-cta w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>
                          {project.gallery.length > 1
                            ? `View All ${project.gallery.length} Visuals`
                            : "Explore Case Study"}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Mobile Pagination Controls */}
          {totalPages > 1 ? (
            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                disabled={page === 0}
                className="btn-secondary-surface px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>
              <span className="text-xs font-semibold text-text-secondary">
                Page {page + 1} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
                disabled={page === totalPages - 1}
                className="btn-secondary-surface px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-40 cursor-pointer"
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Case Study Lightbox Gallery Modal */}
      <PortfolioGalleryModal
        project={modalState?.project || null}
        initialIndex={modalState?.initialIndex || 0}
        onClose={() => setModalState(null)}
      />
    </section>
  );
}
