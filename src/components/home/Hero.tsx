"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { ShowreelModal } from "../common/ShowreelModal";

export function Hero() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#f8fafc] pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
      <div className="max-w-[97%] w-[97%] mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Description, CTAs, Stats */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="text-[12px] font-bold tracking-widest uppercase text-[#00A3E0]">
                3D Animation & Creative Studio
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-5xl sm:text-6xl lg:text-[68px] leading-[1.08] font-bold text-[#071527] mb-6 tracking-tight"
            >
              Ideas Into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#00A3E0] to-[#0284c7] font-normal italic font-serif">
                Extraordinary
              </span>{" "}
              3D & Digital Experiences
            </motion.h1>

            {/* Subheading text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
            >
              We craft cinematic 3D animations, photorealistic CGI, dynamic motion design,
              and interactive WebGL experiences that captivate audiences and elevate brands.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#00A3E0] to-[#0284c7] text-white px-7 py-3.5 rounded-full text-[15px] font-semibold hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 group"
              >
                <span>Start Your Project</span>
                <ArrowRight
                  size={16}
                  className="text-white group-hover:translate-x-1.5 transition-transform"
                />
              </Link>

              <button
                type="button"
                onClick={() => setShowreelOpen(true)}
                className="inline-flex items-center gap-3 bg-white text-[#071527] border border-slate-200 px-6 py-3.5 rounded-full text-[15px] font-semibold hover:bg-slate-50 transition-colors shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-[#071527] text-white flex items-center justify-center">
                  <Play size={11} className="ml-0.5 fill-[#00e5ff] text-[#00e5ff]" />
                </div>
                <span>Watch 3D Showreel</span>
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 max-w-md"
            >
              <div>
                <span className="block font-serif text-3xl sm:text-4xl font-bold text-[#071527]">
                  100+
                </span>
                <span className="text-[13px] text-slate-500 font-medium">
                  3D & CGI Projects
                </span>
              </div>

              <div>
                <span className="block font-serif text-3xl sm:text-4xl font-bold text-[#071527]">
                  50+
                </span>
                <span className="text-[13px] text-slate-500 font-medium">
                  Global Brands
                </span>
              </div>

              <div>
                <span className="block font-serif text-3xl sm:text-4xl font-bold text-[#071527]">
                  15+
                </span>
                <span className="text-[13px] text-slate-500 font-medium">
                  Studio Awards
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Collage */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full max-w-[680px] mx-auto min-h-[460px] sm:min-h-[540px] flex items-center justify-center">
              {/* Central Main Laptop Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="relative z-10 w-[82%] sm:w-[78%] rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/10 border border-slate-200/90"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/hero_laptop.jpg"
                    alt="Digital Experiences Beyond Limits - Rejubliss Laptop Display"
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              {/* Floating Card 1: Top-Left Tablet (Web Design) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="absolute -top-4 sm:-top-8 left-2 sm:left-6 z-20 w-36 sm:w-44 bg-white p-2 sm:p-2.5 rounded-xl shadow-xl shadow-cyan-950/5 border border-slate-200/90 hover:border-cyan-400/50 transition-colors"
              >
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden mb-1.5">
                  <Image
                    src="/images/hero_tablet.jpg"
                    alt="Web Design Tablet Mockup"
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-slate-600">
                    Web Design
                  </span>
                </div>
              </motion.div>

              {/* Floating Card 2: Bottom-Left 3D Character (Graphic Design / 2D Animation) */}
              <motion.div
                initial={{ opacity: 0, x: -25, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ y: -6, scale: 1.04 }}
                className="absolute -bottom-6 sm:-bottom-8 left-6 sm:left-14 z-20 w-32 sm:w-38 bg-white p-2 rounded-xl shadow-xl shadow-cyan-950/5 border border-slate-200/90 hover:border-cyan-400/50 transition-colors"
              >
                <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-1.5">
                  <Image
                    src="/images/character_animation.jpg"
                    alt="Animated 3D Character"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-slate-600">
                    Graphic Design
                  </span>
                </div>
              </motion.div>

              {/* Floating Card 3: Top-Right 3D Sports Car (3D Animation) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                whileHover={{ y: -6, scale: 1.04 }}
                className="absolute -top-6 sm:-top-10 right-2 sm:right-6 z-20 w-36 sm:w-44 bg-white p-2 sm:p-2.5 rounded-xl shadow-xl shadow-cyan-950/5 border border-slate-200/90 hover:border-cyan-400/50 transition-colors"
              >
                <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden mb-1.5">
                  <Image
                    src="/images/car_3d.jpg"
                    alt="3D Car Animation Render"
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-slate-600">
                    3D Animation
                  </span>
                </div>
              </motion.div>

              {/* Floating Card 4: Mid-Right Golden Motion Ribbon (Motion Design) */}
              <motion.div
                initial={{ opacity: 0, x: 35, y: 15 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                whileHover={{ y: -6, scale: 1.04 }}
                className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-8 z-20 w-32 sm:w-40 bg-white p-2 sm:p-2.5 rounded-xl shadow-xl shadow-cyan-950/5 border border-slate-200/90 hover:border-cyan-400/50 transition-colors"
              >
                <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-1.5">
                  <Image
                    src="/images/gold_motion.jpg"
                    alt="Fluid Motion Design"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-slate-600">
                    Motion Design
                  </span>
                </div>
              </motion.div>

              {/* Floating Card 5: Bottom-Right Smartphone Mockup */}
              <motion.div
                initial={{ opacity: 0, x: 25, y: 35 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ y: -6, scale: 1.04 }}
                className="absolute -bottom-8 sm:-bottom-12 right-6 sm:right-16 z-20 w-28 sm:w-34 bg-white p-2 rounded-xl shadow-xl shadow-cyan-950/5 border border-slate-200/90 hover:border-cyan-400/50 transition-colors"
              >
                <div className="relative aspect-[9/16] w-full rounded-lg overflow-hidden mb-1.5">
                  <Image
                    src="/images/hero_mobile.jpg"
                    alt="Mobile Branding Mockup"
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-[#5e6d66]">
                    Graphic Design
                  </span>
                </div>
              </motion.div>

              {/* Handwritten "Let's Create Together" Badge */}
              <motion.div
                initial={{ opacity: 0, rotate: 6, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 8, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="absolute -right-4 sm:-right-12 bottom-6 z-30 flex flex-col items-center pointer-events-none"
              >
                <span className="font-script-title text-3xl sm:text-4xl text-[#071527] font-bold leading-tight drop-shadow-sm">
                  Let&apos;s
                  <br />
                  Create
                  <br />
                  Together
                </span>
                {/* Cyan hand-drawn curved swoosh */}
                <svg
                  className="w-20 h-6 text-[#00A3E0] -mt-1 stroke-current fill-none"
                  viewBox="0 0 100 30"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <path d="M 5,20 Q 50,5 95,15 Q 60,25 30,22" />
                </svg>
              </motion.div>
            </div>

            {/* Mouse "Scroll Down" Indicator */}
            <div className="flex flex-col items-center justify-center mt-12 sm:mt-16 text-slate-400">
              <div className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center p-1">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="w-1 h-2 rounded-full bg-[#00A3E0]"
                />
              </div>
              <span className="text-[11px] font-medium tracking-wider uppercase mt-1.5">
                Scroll Down
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Showreel Modal */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
      />
    </section>
  );
}
