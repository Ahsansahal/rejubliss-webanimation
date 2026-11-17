"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";

interface CaseStudyGalleryClientProps {
  title: string;
  images: string[];
}

export function CaseStudyGalleryClient({
  title,
  images,
}: CaseStudyGalleryClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = images.length;
  const activeSrc = images[activeIndex] || images[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Cinema Stage */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[22px] overflow-hidden bg-[#050507] border border-border-subtle shadow-[var(--shadow-card-hover)] flex items-center justify-center">
        <Image
          src={activeSrc}
          alt={`${title} — production visual ${activeIndex + 1} of ${total}`}
          fill
          preload={activeIndex === 0}
          fetchPriority={activeIndex === 0 ? "high" : "auto"}
          sizes="(max-width: 1024px) 96vw, 72vw"
          className="object-contain p-2 sm:p-4"
        />

        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[#f5f4ef] text-[11px] font-semibold uppercase tracking-[0.14em] inline-flex items-center gap-1.5">
          <Images size={12} className="text-[#e53726]" />
          <span>
            {activeIndex + 1} / {total} {total === 1 ? "Visual" : "Visuals"}
          </span>
        </div>

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project visual"
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 hover:bg-accent-primary hover:text-black hover:border-accent-primary text-[#f5f4ef] border border-white/15 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project visual"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 hover:bg-accent-primary hover:text-black hover:border-accent-primary text-[#f5f4ef] border border-white/15 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </>
        ) : null}
      </div>

      {/* Filmstrip Thumbnails — lazy loaded so they never compete with the main LCP frame */}
      {total > 1 ? (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
          {images.map((img, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={img}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Select visual ${idx + 1} of ${total}`}
                aria-current={isSelected ? "true" : undefined}
                className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-accent-primary scale-[1.03] opacity-100"
                    : "border-border-subtle opacity-55 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  loading="lazy"
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
