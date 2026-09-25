"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code, Box, Film, PenTool, type LucideIcon } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  categoryType: "web" | "3d" | "2d" | "graphic" | "motion";
  image: string;
  icon: LucideIcon;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "ecom-website",
    title: "E-Commerce Website",
    category: "Web Design & Development",
    categoryType: "web",
    image: "/images/ecommerce_web.jpg",
    icon: Code,
  },
  {
    id: "3d-sneaker",
    title: "3D Product Animation",
    category: "3D Animation",
    categoryType: "3d",
    image: "/images/sneaker_3d.jpg",
    icon: Box,
  },
  {
    id: "explainer-video",
    title: "Explainer Video",
    category: "2D Animation",
    categoryType: "2d",
    image: "/images/character_animation.jpg",
    icon: Film,
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    category: "Graphic Design",
    categoryType: "graphic",
    image: "/images/nexora_brand.jpg",
    icon: PenTool,
  },
];

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Web Design", value: "web" },
  { label: "Animation", value: "anim" },
  { label: "Graphic Design", value: "graphic" },
  { label: "Motion Design", value: "motion" },
];

export function FeaturedWork() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "web") return p.categoryType === "web";
    if (activeFilter === "anim") return p.categoryType === "3d" || p.categoryType === "2d";
    if (activeFilter === "graphic") return p.categoryType === "graphic";
    if (activeFilter === "motion") return p.categoryType === "3d" || p.categoryType === "web";
    return true;
  });

  return (
    <section id="featured-work" className="py-20 bg-[#f8fafc]">
      <div className="max-w-[97%] w-[97%] mx-auto px-2 sm:px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-[#00A3E0]" />
              <span className="text-[12px] font-bold tracking-widest uppercase text-[#00A3E0]">
                Featured Work
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#071527] leading-tight">
              Projects That Make an Impact
            </h2>
          </div>

          <Link
            href="#portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#071527] hover:text-[#00A3E0] transition-colors group shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight
              size={15}
              className="text-[#00A3E0] group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-end gap-2 mb-10">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#00A3E0] text-white shadow-md shadow-cyan-500/25"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#071527]"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* 4 Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => {
              const Icon = project.icon;
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  {/* Project Image */}
                  <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden mb-4 bg-slate-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Floating circular icon badge */}
                    <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-white/95 text-[#00A3E0] flex items-center justify-center shadow-md backdrop-blur-sm border border-cyan-200">
                      <Icon size={14} className="text-[#00A3E0]" />
                    </div>
                  </div>

                  {/* Card Details & Action Button */}
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <h3 className="font-serif text-[17px] font-bold text-[#071527] leading-snug group-hover:text-[#00A3E0] transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-[12px] text-slate-500 font-medium">
                        {project.category}
                      </span>
                    </div>

                    {/* Circular Action Arrow */}
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-[#071527] flex items-center justify-center group-hover:bg-[#00A3E0] group-hover:text-white transition-all duration-300 shrink-0">
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
