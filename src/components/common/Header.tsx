"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Search,
  ArrowRight,
  ChevronDown,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MEGA_SERVICES = [
  {
    title: "3D Product Animation",
    subtitle: "Photorealistic CGI, raytraced lighting & explosive assembly views.",
    image: "/images/sneaker_3d.jpg",
    badge: "3D CGI",
    href: "#services",
  },
  {
    title: "Interactive Web & WebGL",
    subtitle: "High-performance websites with fluid 3D WebGL experiences.",
    image: "/images/hero_tablet.jpg",
    badge: "WebGL",
    href: "#services",
  },
  {
    title: "2D & 3D Character Motion",
    subtitle: "Narrative character animation, explainer videos & brand stories.",
    image: "/images/character_animation.jpg",
    badge: "Animation",
    href: "#services",
  },
  {
    title: "Dynamic Motion Design",
    subtitle: "Cinematic broadcast graphics, kinetic typography & fluid VFX.",
    image: "/images/cyan_motion.jpg",
    badge: "Motion VFX",
    href: "#services",
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 w-[97%] max-w-[97%] mx-auto transition-all duration-300">
      {/* ========================================================================= */}
      {/* Framer Liquid Glass Navbar Outer Shell (`framer-j65pq1`)                   */}
      {/* Specular multi-stop border gradient + layered glass shadow               */}
      {/* ========================================================================= */}
      <div
        className={`relative w-full p-[2.5px] sm:p-[3px] transition-all duration-400 ease-out bg-gradient-to-b from-white/95 via-slate-200/65 to-white/95 shadow-[0.29px_4.36px_2.18px_0px_rgba(0,0,0,0.01),0.48px_7.24px_3.63px_0px_rgba(0,0,0,0.01),0.78px_11.7px_5.86px_0px_rgba(0,0,0,0.02),1.28px_19.15px_9.6px_0px_rgba(0,0,0,0.03),2.2px_32.97px_16.52px_0px_rgba(0,0,0,0.03),4px_60px_30.07px_0px_rgba(0,163,224,0.08)] ${
          mobileMenuOpen ? "rounded-[32px]" : "rounded-full"
        }`}
      >
        {/* ========================================================================= */}
        {/* Framer Liquid Glass Content Card (`framer-nvjl2d`)                         */}
        {/* Inset rim specular light + ultra-fine frosted backdrop blur               */}
        {/* ========================================================================= */}
        <div
          className={`relative w-full bg-gradient-to-br from-white/95 via-slate-50/85 to-white/95 backdrop-blur-2xl transition-all duration-400 ease-out shadow-[inset_0px_1.5px_1.5px_0px_rgba(255,255,255,0.95),inset_0px_-1px_1.5px_0px_rgba(0,163,224,0.08)] ${
            mobileMenuOpen ? "rounded-[30px]" : "rounded-full"
          }`}
        >
          {/* Subtle animated laser beam streak across bottom curve */}
          <div className="absolute -bottom-[1px] left-12 right-12 h-[2px] overflow-hidden pointer-events-none z-20 opacity-60">
            <motion.div
              className="w-56 h-full bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent"
              style={{
                boxShadow: "0 0 14px #00e5ff, 0 0 24px #00A3E0",
              }}
              animate={{
                x: ["-100%", "800%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* ========================================================================= */}
          {/* Main Navbar Row (`framer-1r02jhj`)                                       */}
          {/* ========================================================================= */}
          <div className="px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between relative z-10">
            {/* 1. Left: Brand Logo (Pure crystal emblem with NO border-radius / box) */}
            <Link
              href="/"
              onClick={() => setActiveTab("Home")}
              className="flex items-center gap-3 group shrink-0"
              aria-label="Rejubliss 3D Animation Studios"
            >
              <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 transition-transform group-hover:scale-105 duration-300">
                <Image
                  src="/images/logo-emblem.png"
                  alt="Rejubliss 3D Animation Studios Logo"
                  width={42}
                  height={42}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#071527] leading-none">
                    Rejubliss
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-[#00A3E0] mt-1">
                  3D Animation Studios
                </span>
              </div>
            </Link>

            {/* 2. Center: Nav Links Pill Track (`framer-1y4p3qv`) */}
            <nav className="hidden md:flex items-center gap-1 bg-white/60 backdrop-blur-md rounded-full p-1 border border-white/80 shadow-[inset_0px_1px_1px_rgba(255,255,255,0.85),0_2px_8px_rgba(0,0,0,0.02)]">
              {/* Home */}
              <Link
                href="/"
                onClick={() => setActiveTab("Home")}
                className={`px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-all duration-200 ${
                  activeTab === "Home"
                    ? "text-[#00A3E0] font-semibold bg-white/95 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.9),0px_4px_10px_-2px_rgba(0,163,224,0.18)]"
                    : "text-slate-600 hover:text-[#071527] hover:bg-white/80 hover:shadow-[inset_0px_1px_0px_rgba(255,255,255,0.85),0px_3px_8px_-2px_rgba(0,163,224,0.12)]"
                }`}
              >
                Home
              </Link>

              {/* Services Mega Menu with Picture Cards */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdown(true)}
                onMouseLeave={() => setServicesDropdown(false)}
              >
                <button
                  type="button"
                  onClick={() => setServicesDropdown((prev) => !prev)}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-all duration-200 cursor-pointer ${
                    servicesDropdown || activeTab === "Services"
                      ? "text-[#00A3E0] font-semibold bg-white/95 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.9),0px_4px_10px_-2px_rgba(0,163,224,0.18)]"
                      : "text-slate-600 hover:text-[#071527] hover:bg-white/80 hover:shadow-[inset_0px_1px_0px_rgba(255,255,255,0.85),0px_3px_8px_-2px_rgba(0,163,224,0.12)]"
                  }`}
                  aria-expanded={servicesDropdown}
                  aria-haspopup="true"
                >
                  <span>Services</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${
                      servicesDropdown ? "rotate-180 text-[#00A3E0]" : "text-slate-400"
                    }`}
                  />
                </button>

                {/* Services Liquid Glass Mega Menu Dropdown */}
                <AnimatePresence>
                  {servicesDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute -left-[140px] sm:-left-[200px] md:-left-[260px] lg:-left-[300px] xl:-left-[320px] top-full pt-3 w-[880px] lg:w-[960px] xl:w-[1020px] max-w-[95vw] z-50 pointer-events-auto"
                    >
                      {/* Outer Liquid Glass Border Enclosure for Mega Menu */}
                      <div className="p-[2.5px] rounded-[32px] bg-gradient-to-b from-white/95 via-slate-200/60 to-white/95 shadow-[0_30px_70px_-15px_rgba(7,21,39,0.18),0.29px_4.36px_2.18px_rgba(0,0,0,0.01),4px_60px_30px_rgba(0,163,224,0.09)]">
                        {/* Inner Liquid Glass Card Body */}
                        <div className="bg-gradient-to-br from-white/98 via-slate-50/90 to-white/98 backdrop-blur-2xl rounded-[30px] p-5 sm:p-6 relative overflow-hidden shadow-[inset_0px_1px_1.5px_rgba(255,255,255,0.95),inset_0px_-1px_1.5px_rgba(0,163,224,0.06)]">
                          {/* Ambient top cyan specular accent line */}
                          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent" />

                          {/* Category Header Bar */}
                          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
                              <span className="text-xs font-bold uppercase tracking-widest text-[#00A3E0]">
                                Studio Capabilities & Services
                              </span>
                            </div>
                            <Link
                              href="#services"
                              onClick={() => {
                                setServicesDropdown(false);
                                setActiveTab("Services");
                              }}
                              className="text-xs font-semibold text-slate-500 hover:text-[#00A3E0] transition-colors flex items-center gap-1 group"
                            >
                              <span>View All Services</span>
                              <ArrowRight
                                size={12}
                                className="group-hover:translate-x-0.5 transition-transform"
                              />
                            </Link>
                          </div>

                          {/* Main Grid: 4 Service Cards with Pictures (8 cols) + 1 Spotlight Project (4 cols) */}
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                            {/* Left: 4 Service Cards in 2x2 grid */}
                            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              {MEGA_SERVICES.map((srv) => (
                                <Link
                                  key={srv.title}
                                  href={srv.href}
                                  onClick={() => {
                                    setServicesDropdown(false);
                                    setActiveTab("Services");
                                  }}
                                  className="group flex flex-col p-3 rounded-2xl border border-slate-200/90 bg-white/75 hover:bg-cyan-50/40 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
                                >
                                  {/* Picture Thumbnail with floating badge */}
                                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-2.5 bg-slate-100">
                                    <Image
                                      src={srv.image}
                                      alt={srv.title}
                                      fill
                                      sizes="280px"
                                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-sm border border-cyan-200 text-[10px] font-bold text-[#00A3E0] tracking-wide uppercase shadow-sm">
                                      {srv.badge}
                                    </div>
                                  </div>

                                  {/* Title & Description */}
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-serif font-bold text-[14px] text-[#071527] group-hover:text-[#00A3E0] transition-colors leading-snug">
                                      {srv.title}
                                    </h4>
                                    <ArrowRight
                                      size={13}
                                      className="text-slate-400 group-hover:text-[#00A3E0] group-hover:translate-x-1 transition-all shrink-0 ml-1"
                                    />
                                  </div>
                                  <p className="text-[11.5px] text-slate-500 leading-relaxed line-clamp-2">
                                    {srv.subtitle}
                                  </p>
                                </Link>
                              ))}
                            </div>

                            {/* Right: Featured Spotlight Showcase Card with Picture (Light Theme) */}
                            <div className="lg:col-span-4 flex flex-col">
                              <Link
                                href="#portfolio-spotlight"
                                onClick={() => {
                                  setServicesDropdown(false);
                                  setActiveTab("Showcase");
                                }}
                                className="group flex-1 flex flex-col justify-between p-4 rounded-2xl bg-gradient-to-br from-cyan-50/90 via-white to-sky-50/60 text-[#071527] border border-cyan-200/90 shadow-md shadow-cyan-500/5 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/15 transition-all duration-300 relative overflow-hidden"
                              >
                                {/* Spotlight Image */}
                                <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden mb-3 bg-slate-100 border border-slate-200/60">
                                  <Image
                                    src="/images/car_3d.jpg"
                                    alt="Featured 3D Showcase - McLaren Cyber GT"
                                    fill
                                    sizes="300px"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#00A3E0] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                                    ⭐ Spotlight Project
                                  </div>
                                </div>

                                {/* Details */}
                                <div>
                                  <div className="text-[10px] font-bold text-[#00A3E0] uppercase tracking-wider mb-1">
                                    Automotive CGI & WebGL
                                  </div>
                                  <h4 className="font-serif font-bold text-[16px] text-[#071527] group-hover:text-[#00A3E0] transition-colors leading-tight mb-1.5">
                                    McLaren Cyber GT Raytraced CGI
                                  </h4>
                                  <p className="text-[11.5px] text-slate-600 leading-relaxed mb-3">
                                    Explore our photorealistic CGI commercial breakdown and interactive 3D WebGL experience.
                                  </p>
                                </div>

                                <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-[#00A3E0]">
                                  <span>Explore Case Study</span>
                                  <ArrowRight
                                    size={13}
                                    className="group-hover:translate-x-1.5 transition-transform"
                                  />
                                </div>
                              </Link>
                            </div>
                          </div>

                          {/* Bottom Bar: Action Links */}
                          <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
                            <div className="flex items-center gap-2 text-slate-500">
                              <Sparkles size={13} className="text-[#00A3E0]" />
                              <span>Ready to elevate your product with cinematic 3D CGI or WebGL?</span>
                            </div>
                            <Link
                              href="#contact"
                              onClick={() => setServicesDropdown(false)}
                              className="font-bold text-[#00A3E0] hover:text-cyan-600 transition-colors flex items-center gap-1"
                            >
                              <span>Request Free Estimate</span>
                              <ArrowRight size={12} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Portfolio */}
              <Link
                href="#portfolio"
                onClick={() => setActiveTab("Portfolio")}
                className={`px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-all duration-200 ${
                  activeTab === "Portfolio"
                    ? "text-[#00A3E0] font-semibold bg-white/95 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.9),0px_4px_10px_-2px_rgba(0,163,224,0.18)]"
                    : "text-slate-600 hover:text-[#071527] hover:bg-white/80 hover:shadow-[inset_0px_1px_0px_rgba(255,255,255,0.85),0px_3px_8px_-2px_rgba(0,163,224,0.12)]"
                }`}
              >
                Portfolio
              </Link>

              {/* Showcase */}
              <Link
                href="#portfolio-spotlight"
                onClick={() => setActiveTab("Showcase")}
                className={`px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-all duration-200 ${
                  activeTab === "Showcase"
                    ? "text-[#00A3E0] font-semibold bg-white/95 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.9),0px_4px_10px_-2px_rgba(0,163,224,0.18)]"
                    : "text-slate-600 hover:text-[#071527] hover:bg-white/80 hover:shadow-[inset_0px_1px_0px_rgba(255,255,255,0.85),0px_3px_8px_-2px_rgba(0,163,224,0.12)]"
                }`}
              >
                Showcase
              </Link>

              {/* About */}
              <Link
                href="#about"
                onClick={() => setActiveTab("About")}
                className={`px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-all duration-200 ${
                  activeTab === "About"
                    ? "text-[#00A3E0] font-semibold bg-white/95 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.9),0px_4px_10px_-2px_rgba(0,163,224,0.18)]"
                    : "text-slate-600 hover:text-[#071527] hover:bg-white/80 hover:shadow-[inset_0px_1px_0px_rgba(255,255,255,0.85),0px_3px_8px_-2px_rgba(0,163,224,0.12)]"
                }`}
              >
                About
              </Link>

              {/* Contact */}
              <Link
                href="#contact"
                onClick={() => setActiveTab("Contact")}
                className={`px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-all duration-200 ${
                  activeTab === "Contact"
                    ? "text-[#00A3E0] font-semibold bg-white/95 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.9),0px_4px_10px_-2px_rgba(0,163,224,0.18)]"
                    : "text-slate-600 hover:text-[#071527] hover:bg-white/80 hover:shadow-[inset_0px_1px_0px_rgba(255,255,255,0.85),0px_3px_8px_-2px_rgba(0,163,224,0.12)]"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* 3. Right: Quick Actions & Liquid Glass CTA Button (`framer-12z6-container`) */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              {/* Quick Contact badge (desktop) */}
              <a
                href="tel:+442081234567"
                className="hidden xl:flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#00A3E0] bg-white/60 hover:bg-white/95 px-3.5 py-2 rounded-full border border-white/80 shadow-[inset_0px_1px_1px_rgba(255,255,255,0.85),0_2px_6px_rgba(0,0,0,0.02)] transition-all"
              >
                <Phone size={13} className="text-[#00A3E0]" />
                <span>+44 20 8123 4567</span>
              </a>

              {/* Liquid Glass Search Toggle Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search site"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  searchOpen
                    ? "bg-[#00A3E0] text-white shadow-[0_4px_12px_rgba(0,163,224,0.4)]"
                    : "text-slate-700 bg-white/60 hover:bg-white/95 border border-white/80 shadow-[inset_0px_1px_1px_rgba(255,255,255,0.85),0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,163,224,0.15)]"
                }`}
              >
                <Search size={16} />
              </button>

              {/* Framer Liquid Glass CTA Button (`GlassCTA` architecture) */}
              <Link
                href="#contact"
                className="hidden sm:inline-flex relative group overflow-hidden rounded-full p-[1px] transition-all duration-300 active:scale-95"
              >
                {/* Outer Glass Rim Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/80 via-cyan-300/60 to-white/80 pointer-events-none" />

                {/* Inner Button Body */}
                <div className="relative flex items-center gap-2.5 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#00A3E0] via-[#0284c7] to-[#071527] text-white text-[13.5px] font-semibold tracking-wide shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.38),inset_0px_-1px_1px_0px_rgba(0,0,0,0.3),0px_7px_16px_-6px_rgba(0,163,224,0.45)] group-hover:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.6),inset_0px_-1px_1px_0px_rgba(0,0,0,0.3),0px_12px_24px_-6px_rgba(0,163,224,0.65)] transition-all duration-300">
                  {/* Framer Dynamic Shine Sweep Effect (`framer-1uqhoez`) */}
                  <div className="absolute -top-6 -left-16 w-14 h-24 bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-20 pointer-events-none group-hover:translate-x-60 transition-transform duration-700 ease-out" />

                  <span className="relative z-10">Start Your Project</span>
                  <ArrowRight
                    size={14}
                    className="relative z-10 text-white group-hover:translate-x-1 transition-transform duration-200"
                  />
                </div>
              </Link>

              {/* Framer Mobile Toggle Button (`framer-1wmqfcy`) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden relative w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5 bg-white/70 backdrop-blur-md border border-white/90 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.85),0px_6px_16px_-4px_rgba(148,160,181,0.3)] hover:bg-white transition-all cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {/* Bar Top (`framer-129tuda`) */}
                <motion.span
                  className="w-[18px] h-[2px] bg-[#071527] rounded-full origin-center"
                  animate={
                    mobileMenuOpen
                      ? { rotate: 45, y: 4 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
                />
                {/* Bar Bottom (`framer-1trgcbq`) */}
                <motion.span
                  className="w-[18px] h-[2px] bg-[#071527] rounded-full origin-center"
                  animate={
                    mobileMenuOpen
                      ? { rotate: -45, y: -4 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
                />
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Liquid Glass Search Drawer                                                */}
          {/* ========================================================================= */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="px-5 sm:px-8 pb-4 pt-1 overflow-hidden"
              >
                <div className="relative max-w-lg mx-auto">
                  <div className="relative flex items-center p-1 rounded-full bg-white/85 backdrop-blur-xl border border-white/95 shadow-[inset_0px_1px_1.5px_rgba(255,255,255,0.95),0px_8px_20px_-6px_rgba(148,160,181,0.25)] focus-within:border-[#00A3E0]/70 focus-within:shadow-[inset_0px_1px_1.5px_rgba(255,255,255,0.95),0px_10px_24px_-6px_rgba(0,163,224,0.3)] transition-all">
                    <Search
                      size={16}
                      className="absolute left-4 text-[#00A3E0]"
                    />
                    <input
                      type="text"
                      placeholder="Search 3D animations, CGI commercials, WebGL services..."
                      autoFocus
                      className="w-full bg-transparent px-4 py-2 pl-10 pr-24 rounded-full text-xs sm:text-sm text-[#071527] outline-none placeholder:text-slate-400 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="text-[11px] font-bold text-slate-500 hover:text-[#071527] px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
                    >
                      ESC
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ========================================================================= */}
          {/* Framer Mobile Drawer (`framer-v-frcwka`)                                  */}
          {/* ========================================================================= */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden border-t border-slate-200/70 px-5 sm:px-7 py-5 flex flex-col gap-3.5 overflow-hidden"
              >
                {/* Mobile Home */}
                <Link
                  href="/"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveTab("Home");
                  }}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    activeTab === "Home"
                      ? "text-[#00A3E0] bg-cyan-50/70"
                      : "text-[#071527] hover:bg-slate-100/60"
                  }`}
                >
                  <span>Home</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                </Link>

                {/* Mobile Services Accordion */}
                <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-3">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between text-[#071527] font-semibold text-sm py-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#00A3E0]">●</span>
                      <span>Services & Capabilities</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        mobileServicesOpen ? "rotate-180 text-[#00A3E0]" : "text-slate-400"
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pt-3 flex flex-col gap-2.5 overflow-hidden"
                      >
                        {MEGA_SERVICES.map((srv) => (
                          <Link
                            key={srv.title}
                            href={srv.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileServicesOpen(false);
                            }}
                            className="flex items-center gap-3 p-2 rounded-xl bg-slate-50/80 hover:bg-cyan-50/60 border border-slate-200/80 transition-colors group"
                          >
                            <div className="relative aspect-[16/10] w-14 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                              <Image
                                src={srv.image}
                                alt={srv.title}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-[#071527] group-hover:text-[#00A3E0] truncate">
                                  {srv.title}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-500 block truncate">
                                {srv.badge} • {srv.subtitle}
                              </span>
                            </div>
                            <ArrowRight
                              size={12}
                              className="text-slate-400 group-hover:text-[#00A3E0] shrink-0"
                            />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Links */}
                <Link
                  href="#portfolio"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveTab("Portfolio");
                  }}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-[#00A3E0] hover:bg-slate-100/60 transition-colors"
                >
                  Portfolio
                </Link>

                <Link
                  href="#portfolio-spotlight"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveTab("Showcase");
                  }}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-[#00A3E0] hover:bg-slate-100/60 transition-colors"
                >
                  Showcase
                </Link>

                <Link
                  href="#about"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveTab("About");
                  }}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-[#00A3E0] hover:bg-slate-100/60 transition-colors"
                >
                  About
                </Link>

                <Link
                  href="#contact"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveTab("Contact");
                  }}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-[#00A3E0] hover:bg-slate-100/60 transition-colors"
                >
                  Contact
                </Link>

                {/* Mobile Liquid Glass CTA Button */}
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 relative group overflow-hidden rounded-full p-[1px]"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/80 via-cyan-300/60 to-white/80 pointer-events-none" />
                  <div className="relative flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#00A3E0] via-[#0284c7] to-[#071527] text-white text-sm font-semibold shadow-md shadow-cyan-500/25">
                    <span>Start Your Project</span>
                    <ArrowRight size={15} className="text-white" />
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
