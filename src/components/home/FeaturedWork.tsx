"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Code,
  Box,
  Film,
  PenTool,
  Activity,
  Images,
  type LucideIcon,
} from "lucide-react";
import { ALL_SPOTLIGHT_PROJECTS, type SpotlightProject } from "./V2ExpandingBookShowcase";
import { PortfolioGalleryModal } from "@/components/common/PortfolioGalleryModal";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Graphic & Brand", value: "graphic" },
  { label: "3D & Packaging", value: "3d" },
  { label: "Web Design", value: "web" },
  { label: "Animation & Motion", value: "motion" },
] as const;

function getCategoryIcon(type: SpotlightProject["featuredFilter"]): LucideIcon {
  switch (type) {
    case "web":
      return Code;
    case "3d":
      return Box;
    case "2d":
      return Film;
    case "motion":
      return Activity;
    case "graphic":
    default:
      return PenTool;
  }
}

export function FeaturedWork() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<SpotlightProject | null>(null);

  const filteredProjects = ALL_SPOTLIGHT_PROJECTS.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "graphic") return p.featuredFilter === "graphic";
    if (activeFilter === "3d") return p.featuredFilter === "3d";
    if (activeFilter === "web") return p.featuredFilter === "web";
    if (activeFilter === "motion") {
      return p.featuredFilter === "motion" || p.featuredFilter === "2d";
    }
    return true;
  });

  const visibleProjects =
    activeFilter === "all" && !showAll ? filteredProjects.slice(0, 8) : filteredProjects;

  return (
    <section id="featured-work" className="py-20 bg-bg-primary transition-colors duration-300">
      <div className="max-w-[97%] w-[97%] mx-auto px-2 sm:px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-accent-interactive" />
              <span className="text-[12px] font-bold tracking-widest uppercase text-accent-primary">
                Featured Work
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-text-heading leading-tight">
              Projects That Make an Impact
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveFilter("all");
              setShowAll((prev) => !prev);
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-accent-primary hover:text-accent-interactive transition-colors group shrink-0 cursor-pointer"
          >
            <span>
              {activeFilter === "all" && showAll
                ? "Show Top Highlights"
                : `View All ${ALL_SPOTLIGHT_PROJECTS.length} Projects`}
            </span>
            <ArrowRight
              size={15}
              className="text-accent-interactive group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-end gap-2 mb-10">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => {
                  setActiveFilter(filter.value);
                }}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "btn-primary-solid"
                    : "bg-bg-subtle text-text-secondary border border-border-subtle hover:bg-bg-subtle-hover hover:text-text-heading"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {visibleProjects.map((project) => {
              const Icon = getCategoryIcon(project.featuredFilter);
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedProject(project)}
                  className="bg-bg-card rounded-2xl p-4 border border-border-subtle shadow-[var(--shadow-card)] hover:border-border-accent hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  {/* Project Image */}
                  <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden mb-4 bg-bg-subtle">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gallery Visual Count Pill */}
                    {project.gallery.length > 1 ? (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-midnight-navy/85 backdrop-blur-md text-pearl-white text-[10.5px] font-semibold flex items-center gap-1 border border-ice-cyan/30">
                        <Images size={11} className="text-ice-cyan" />
                        <span>{project.gallery.length} Visuals</span>
                      </div>
                    ) : null}

                    {/* Floating circular icon badge */}
                    <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-bg-card/95 text-accent-primary flex items-center justify-center shadow-sm backdrop-blur-sm border border-border-accent">
                      <Icon size={14} className="text-accent-primary" />
                    </div>
                  </div>

                  {/* Card Details & Action Button */}
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <div className="min-w-0">
                      <h3 className="font-serif text-[17px] font-bold text-text-heading leading-snug group-hover:text-accent-primary transition-colors truncate">
                        {project.title}
                      </h3>
                      <span className="text-[12px] text-text-muted font-medium block truncate">
                        {project.client} • {project.genre}
                      </span>
                    </div>

                    {/* Circular Action Arrow */}
                    <div className="w-8 h-8 rounded-full bg-bg-subtle text-text-heading border border-border-subtle flex items-center justify-center group-hover:bg-[var(--btn-primary-bg)] group-hover:text-[var(--text-on-primary)] group-hover:border-[var(--btn-primary-bg)] transition-all duration-300 shrink-0">
                      <ArrowRight
                        size={13}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Expand/Collapse Button when viewing All */}
        {activeFilter === "all" && filteredProjects.length > 8 ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="btn-secondary-surface inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold cursor-pointer"
            >
              <span>
                {showAll
                  ? "Show Top 8 Highlights"
                  : `Explore All ${filteredProjects.length} Case Studies`}
              </span>
              <ArrowRight size={14} className="text-accent-interactive" />
            </button>
          </div>
        ) : null}
      </div>

      {/* Case Study Lightbox Gallery Modal */}
      <PortfolioGalleryModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
