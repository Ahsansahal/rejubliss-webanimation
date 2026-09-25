"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";
import portfolioData from "@/data/portfolio.json";

export interface SpotlightProject {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  client: string;
  genreCategory: "All" | "3D Animation" | "Web Design" | "Motion Graphics" | "Brand & CGI";
  genre: string;
  badge: string;
  badgeColor: string;
  image: string;
  rating: number;
  reviewsCount: number;
  impactMetric: string;
  tags: string[];
  synopsis: string;
  link: string;
  deliverables: string[];
}

function getGenreCategory(genre: string): "3D Animation" | "Web Design" | "Motion Graphics" | "Brand & CGI" {
  if (genre.includes("3D") || genre.includes("Character") || genre.includes("Automotive")) return "3D Animation";
  if (genre.includes("Web") || genre.includes("Experience")) return "Web Design";
  if (genre.includes("Motion") || genre.includes("VFX")) return "Motion Graphics";
  return "Brand & CGI";
}

function getBadgeColor(cat: string): string {
  switch (cat) {
    case "3D Animation":
      return "bg-cyan-50 text-[#00A3E0] border-cyan-200";
    case "Web Design":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Motion Graphics":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    case "Brand & CGI":
    default:
      return "bg-sky-50 text-sky-800 border-sky-200";
  }
}

interface RawProjectItem {
  slug: string;
  title: string;
  client: string;
  genre: string;
  badge?: string;
  rating?: number;
  reviewsCount?: number;
  image: string;
  metaDescription?: string;
  scope?: string[];
}

export const ALL_SPOTLIGHT_PROJECTS: SpotlightProject[] = (portfolioData as RawProjectItem[]).map((p, idx) => {
  const genreCategory = getGenreCategory(p.genre);

  // Extract clean title and subtitle
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

  const metrics = [
    "+340% Engagement",
    "2.4M Video Views",
    "99/100 Performance",
    "+185% Conversion",
    "4K HDR Raytraced",
    "WebGL Interactive",
  ];

  return {
    id: p.slug,
    num: String(idx + 1).padStart(2, "0"),
    title,
    subtitle,
    client: p.client,
    genreCategory,
    genre: p.genre,
    badge: p.badge || (p.rating && p.rating >= 4.9 ? "Featured Case Study" : "Production Release"),
    badgeColor: getBadgeColor(genreCategory),
    image: p.image,
    rating: p.rating || 4.9,
    reviewsCount: p.reviewsCount || 150,
    impactMetric: metrics[idx % metrics.length],
    tags: ["4K Render", "Octane / Three.js", "Production Ready"],
    synopsis: p.metaDescription || p.title,
    link: `#portfolio`,
    deliverables: p.scope || [
      "3D Asset Pipeline",
      "Lighting & Shading",
      "Interactive Delivery",
      "Worldwide Release",
    ],
  };
});

export function V2ExpandingBookShowcase() {
  const [selectedGenre, setSelectedGenre] = React.useState<
    "All" | "3D Animation" | "Web Design" | "Motion Graphics" | "Brand & CGI"
  >("All");
  const [page, setPage] = React.useState<number>(0);
  const PAGE_SIZE = 6;

  // Category counts
  const genreCounts = React.useMemo(() => {
    return {
      All: ALL_SPOTLIGHT_PROJECTS.length,
      "3D Animation": ALL_SPOTLIGHT_PROJECTS.filter((p) => p.genreCategory === "3D Animation").length,
      "Web Design": ALL_SPOTLIGHT_PROJECTS.filter((p) => p.genreCategory === "Web Design").length,
      "Motion Graphics": ALL_SPOTLIGHT_PROJECTS.filter((p) => p.genreCategory === "Motion Graphics").length,
      "Brand & CGI": ALL_SPOTLIGHT_PROJECTS.filter((p) => p.genreCategory === "Brand & CGI").length,
    };
  }, []);

  const genreCategories = [
    { id: "All" as const, label: `All Projects (${genreCounts.All})` },
    { id: "3D Animation" as const, label: `3D Animation (${genreCounts["3D Animation"]})` },
    { id: "Web Design" as const, label: `Web Design (${genreCounts["Web Design"]})` },
    { id: "Motion Graphics" as const, label: `Motion Graphics (${genreCounts["Motion Graphics"]})` },
    { id: "Brand & CGI" as const, label: `Brand & CGI (${genreCounts["Brand & CGI"]})` },
  ];

  // Filtered projects based on genre
  const filteredProjects = React.useMemo(() => {
    if (selectedGenre === "All") return ALL_SPOTLIGHT_PROJECTS;
    return ALL_SPOTLIGHT_PROJECTS.filter((p) => p.genreCategory === selectedGenre);
  }, [selectedGenre]);

  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE);

  // Paginated projects for current view
  const displayedProjects = React.useMemo(() => {
    const start = page * PAGE_SIZE;
    return filteredProjects.slice(start, start + PAGE_SIZE);
  }, [filteredProjects, page]);

  // Active expanded project ID (derived during render to comply with React 19 rules)
  const [userSelectedId, setUserSelectedId] = React.useState<string | null>(null);

  const activeId =
    userSelectedId && displayedProjects.some((p) => p.id === userSelectedId)
      ? userSelectedId
      : displayedProjects[0]?.id || "";

  const setActiveId = (id: string) => {
    setUserSelectedId(id);
  };

  return (
    <section id="portfolio-spotlight" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#F7FAFD] via-[#FFFFFF] to-[#EFF7FD] border-t border-b border-slate-200/80 overflow-hidden w-full font-sans transition-colors duration-300">
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-cyan-200/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[450px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Panoramic Max-Width Container */}
      <div className="relative w-[97%] max-w-[1850px] mx-auto z-10 px-2 sm:px-4 lg:px-6">
        
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 lg:mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/80 text-[#00A3E0] text-xs font-bold tracking-wider uppercase mb-3.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#00A3E0]" />
              <span>Interactive Showcase • All {ALL_SPOTLIGHT_PROJECTS.length} Featured Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B1B36] tracking-tight leading-tight">
              Flagship Releases.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3E0] via-[#0284C7] to-cyan-600 font-serif">
                Proven Impact.
              </span>
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
              Explore our studio&apos;s published projects spanning 3D product CGI, character animations, WebGL experiences, and motion graphics. Hover or tap any title to reveal its full journey, reviews, and client deliverables.
            </p>
          </div>

          {/* Stepper / Pagination & Indicator */}
          <div className="flex flex-wrap items-center gap-4">
            {totalPages > 1 && (
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-full px-3.5 py-1.5 shadow-sm text-xs font-semibold text-slate-700">
                <span>
                  Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filteredProjects.length)} of {filteredProjects.length} Projects
                </span>
                <div className="w-[1px] h-3.5 bg-slate-200 mx-1" />
                <button
                  type="button"
                  onClick={() => {
                    setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
                  }}
                  className="p-1 rounded-full text-[#00A3E0] hover:bg-cyan-50 transition-colors cursor-pointer"
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
                  className="p-1 rounded-full text-[#00A3E0] hover:bg-cyan-50 transition-colors cursor-pointer"
                  title="Next Set"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00A3E0] animate-ping" />
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
                    ? "bg-[#00A3E0] text-white shadow-md shadow-cyan-500/25"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/90 shadow-sm"
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
        <div className="hidden md:flex flex-row items-stretch gap-3 lg:gap-4 h-[550px] lg:h-[570px] w-full select-none">
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
                        ? "flex-[4.2] bg-white border-2 border-[#00A3E0] shadow-[0_20px_50px_rgba(0,163,224,0.18)] ring-4 ring-cyan-500/10"
                        : "flex-1 bg-white border border-slate-200/90 hover:border-cyan-400/50 shadow-md hover:shadow-lg"
                    }`}
                  >
                    {/* Background Cover Artwork for Collapsed Preview */}
                    {!isActive && (
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1440px) 25vw, 15vw"
                          className="object-cover object-center filter grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                        />
                        {/* Frosted dark-tinted scrim to guarantee legible typography on vertical title */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-slate-900/25" />
                      </div>
                    )}

                    {/* Active Card Interior Gradient */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-br from-white via-cyan-50/25 to-sky-50/35 pointer-events-none z-0" />
                    )}

                    {/* ========================================== */}
                    {/* COLLAPSED STATE (Inactive Card)           */}
                    {/* Sleek architectural vertical strip        */}
                    {/* ========================================== */}
                    {!isActive && (
                      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-6 px-3">
                        {/* Top Index Badge */}
                        <span className="font-mono text-white font-extrabold text-sm px-2.5 py-1 rounded-full bg-[#00A3E0] shadow-md">
                          {project.num}
                        </span>

                        {/* Rotated Vertical Title */}
                        <div className="my-auto flex items-center justify-center">
                          <p
                            className="text-white text-sm lg:text-base font-bold tracking-widest uppercase whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                            style={{
                              writingMode: "vertical-rl",
                              transform: "rotate(180deg)",
                            }}
                          >
                            {project.title}
                          </p>
                        </div>

                        {/* Bottom Indicator */}
                        <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center border border-white/40 text-[#00A3E0] shadow-md group-hover:bg-[#00A3E0] group-hover:text-white transition-all">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    )}

                    {/* ========================================== */}
                    {/* EXPANDED STATE (Active Card)              */}
                    {/* ========================================== */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="relative z-10 w-full h-full p-6 lg:p-8 flex flex-col justify-between overflow-hidden"
                      >
                        {/* Top Bar: Index + Category Pill + Rating */}
                        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[#00A3E0] font-black text-2xl">
                              {project.num}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold border ${project.badgeColor} shadow-sm flex items-center gap-1.5`}
                            >
                              <Award className="w-3.5 h-3.5 text-[#00A3E0]" />
                              <span>{project.badge}</span>
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/90 px-3 py-1 rounded-full text-xs font-bold text-amber-900 shadow-sm">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>{project.rating.toFixed(1)}</span>
                            <span className="text-slate-500 font-normal">
                              ({project.reviewsCount}+ client ratings)
                            </span>
                          </div>
                        </div>

                        {/* Center Area: High-Res 3D Cover Mockup + Details */}
                        <div className="grid grid-cols-12 gap-6 lg:gap-8 my-auto items-center py-2">
                          {/* Left: 3D Floating Project Artwork */}
                          <div className="col-span-5 lg:col-span-5 flex items-center justify-center">
                            <Link href={project.link} className="block group/coverLink w-full">
                              <div className="relative group/cover w-full aspect-[16/11] max-w-[280px] lg:max-w-[320px] rounded-2xl overflow-hidden shadow-[0_20px_45px_rgba(11,27,54,0.3)] transition-transform duration-500 group-hover/cover:scale-105 border border-slate-200">
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  fill
                                  sizes="(max-width: 768px) 250px, 320px"
                                  className="object-cover z-10"
                                  priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20 pointer-events-none" />
                              </div>
                            </Link>
                          </div>

                          {/* Right: Project Story, Accolades & Impact */}
                          <div className="col-span-7 lg:col-span-7 flex flex-col justify-center space-y-3">
                            <div>
                              <p className="text-xs uppercase font-bold tracking-wider text-[#00A3E0] mb-1 flex items-center gap-1.5">
                                <span>{project.genre}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-600 font-semibold">
                                  Client: {project.client}
                                </span>
                              </p>
                              <Link href={project.link} className="hover:text-[#00A3E0] transition-colors">
                                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-[#0B1B36] leading-tight tracking-tight">
                                  {project.title}
                                </h3>
                              </Link>
                              <p className="text-sm font-medium text-slate-500 italic">
                                {project.subtitle}
                              </p>
                            </div>

                            <p className="text-slate-600 text-xs lg:text-sm leading-relaxed line-clamp-3 font-normal">
                              {project.synopsis}
                            </p>

                            {/* Deliverables tags */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {project.deliverables.map((item, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100/90 border border-slate-200/80 text-slate-700"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-[#00A3E0]" />
                                  <span>{item}</span>
                                </span>
                              ))}
                            </div>

                            {/* Impact metric and format highlight */}
                            <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 pt-1">
                              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>{project.impactMetric}</span>
                              </span>
                              <span className="text-slate-300">•</span>
                              <span className="text-slate-500">
                                {project.tags.join(" · ")}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Action Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Delivered with Production Excellence</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <Link
                              href={project.link}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00A3E0] hover:bg-[#008cc2] text-white text-xs lg:text-sm font-bold shadow-[0_4px_14px_rgba(0,163,224,0.35)] hover:shadow-[0_6px_20px_rgba(0,163,224,0.5)] transition-all"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Explore Case Study</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================================= */}
        {/* MOBILE / TOUCH ACCORDION (LIGHT THEME) (< 768px)          */}
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
                    ? "border-[#00A3E0] bg-white shadow-lg ring-2 ring-cyan-500/10"
                    : "border-slate-200/90 bg-white shadow-sm"
                }`}
              >
                {/* Collapsed Header Bar */}
                <div className="p-4 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-white font-bold text-xs px-2 py-0.5 rounded-full bg-[#00A3E0]">
                      {project.num}
                    </span>
                    <div className="text-left">
                      <p className="text-[#0B1B36] font-bold text-sm leading-tight">
                        {project.title}
                      </p>
                      <p className="text-xs text-slate-500">{project.genre}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${project.badgeColor}`}
                    >
                      {project.badge}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 text-[#00A3E0] transition-transform duration-300 ${
                        isActive ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Content Drawer */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50"
                    >
                      <div className="flex gap-4 items-center mb-4">
                        <Link href={project.link} className="shrink-0">
                          <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-md">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="96px"
                              className="object-cover"
                            />
                          </div>
                        </Link>
                        <div className="space-y-1 text-left">
                          <p className="text-xs font-bold text-[#00A3E0]">
                            Client: {project.client}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-amber-600 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>{project.rating.toFixed(1)}</span>
                            <span className="text-slate-500 font-normal">
                              ({project.reviewsCount}+)
                            </span>
                          </div>
                          <p className="text-xs text-emerald-600 font-semibold">
                            {project.impactMetric}
                          </p>
                          <p className="text-xs text-slate-600 line-clamp-2">
                            {project.synopsis}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={project.link}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#00A3E0] hover:bg-[#008cc2] text-white text-xs font-bold shadow-md transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Explore Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Mobile Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                disabled={page === 0}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-xs font-semibold text-slate-600">
                Page {page + 1} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
                disabled={page === totalPages - 1}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
