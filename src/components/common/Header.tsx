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
      {/* Unified Luxury Frosted Glass Header Container                             */}
      {/* Single cohesive shell - NO nested double-headers or mini-capsules         */}
      {/* ========================================================================= */}
      <div
        className={`relative w-full transition-all duration-300 bg-white/90 sm:bg-white/85 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(7,21,39,0.06),0_1.5px_4px_rgba(0,163,224,0.06)] ${
          mobileMenuOpen ? "rounded-[30px]" : "rounded-full"
        }`}
      >
        {/* ========================================================================= */}
        {/* OUTSIDE ANIMATED BEAMS (Exact radiant system from original header)        */}
        {/* ========================================================================= */}

        {/* 1. Radiant Perimeter Border Travelling Light Beam */}
        <svg
          className="pointer-events-none absolute -inset-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] overflow-visible z-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="header-border-beam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
              <stop offset="25%" stopColor="#00e5ff" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="75%" stopColor="#00A3E0" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.rect
            x="1.5"
            y="1.5"
            width="calc(100% - 3px)"
            height="calc(100% - 3px)"
            rx={mobileMenuOpen ? 29 : 9999}
            fill="none"
            stroke="url(#header-border-beam)"
            strokeWidth="2.5"
            pathLength="100"
            strokeDasharray="20 80"
            animate={{
              strokeDashoffset: [0, -100],
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "linear",
            }}
            style={{
              filter: "drop-shadow(0 0 6px #00e5ff) drop-shadow(0 0 14px #00A3E0)",
            }}
          />
        </svg>

        {/* 2. Moving Luminous Bottom Laser Beam Streak */}
        <div className="absolute -bottom-[1px] left-0 right-0 h-[3px] overflow-hidden pointer-events-none z-20 rounded-b-full">
          <motion.div
            className="absolute top-0 bottom-0 w-64 sm:w-80 bg-gradient-to-r from-transparent via-[#00e5ff] via-white to-transparent"
            style={{
              boxShadow: "0 0 16px #00e5ff, 0 0 28px #00e5ff, 0 0 45px rgba(0, 163, 224, 0.9)",
            }}
            animate={{
              left: ["-350px", "100%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.6,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </div>

        {/* 3. Ambient Top Glare & Specular Accent Line */}
        <div className="absolute -top-[1px] left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] via-white/90 to-transparent pointer-events-none z-20 shadow-[0_0_14px_#00e5ff,0_0_24px_#00A3E0]" />

        {/* ========================================================================= */}
        {/* Main Navbar Row (Unified and Spacious)                                    */}
        {/* ========================================================================= */}
        <div className="px-5 sm:px-7 py-2.5 sm:py-3 flex items-center justify-between relative z-10">
          {/* 1. Left: Brand Logo */}
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
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-[#071527]/75 mt-1 group-hover:text-[#00A3E0] transition-colors">
                3D Animation Studios
              </span>
            </div>
          </Link>

          {/* 2. Center: Integrated Navigation Links (Clean, No Nested Border Capsule) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {/* Home */}
            <Link
              href="/"
              onClick={() => setActiveTab("Home")}
              className={`text-[14px] font-semibold transition-colors relative py-1 ${
                activeTab === "Home"
                  ? "text-[#00A3E0]"
                  : "text-[#071527]/80 hover:text-[#00A3E0]"
              }`}
            >
              <span>Home</span>
              {activeTab === "Home" && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#00A3E0] rounded-full shadow-[0_0_8px_#00A3E0]"
                />
              )}
            </Link>

            {/* Services Mega Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdown((prev) => !prev)}
                className={`flex items-center gap-1.5 text-[14px] font-semibold transition-colors py-1 cursor-pointer ${
                  servicesDropdown || activeTab === "Services"
                    ? "text-[#00A3E0]"
                    : "text-[#071527]/80 hover:text-[#00A3E0]"
                }`}
                aria-expanded={servicesDropdown}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown
                  size={14}
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
                    <div className="p-[2.5px] rounded-[32px] bg-gradient-to-b from-white/95 via-slate-200/60 to-white/95 shadow-[0_30px_70px_-15px_rgba(7,21,39,0.18),0.29px_4.36px_2.18px_rgba(0,0,0,0.01),4px_60px_30px_rgba(0,163,224,0.09)]">
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

                        {/* Main Grid: 4 Service Cards (8 cols) + 1 Spotlight Project (4 cols) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
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
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="text-sm font-bold text-[#071527] group-hover:text-[#00A3E0] transition-colors flex items-center gap-1.5">
                                    <span>{srv.title}</span>
                                    <ArrowRight
                                      size={13}
                                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#00A3E0]"
                                    />
                                  </h4>
                                </div>
                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                  {srv.subtitle}
                                </p>
                              </Link>
                            ))}
                          </div>

                          {/* Right: Studio Spotlight Card (4 cols) */}
                          <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#071527] p-5 text-white flex flex-col justify-between relative overflow-hidden shadow-xl shadow-cyan-950/20">
                            <div className="absolute top-0 right-0 w-44 h-44 bg-[#00A3E0]/20 rounded-full blur-2xl pointer-events-none" />
                            <div className="relative z-10">
                              <div className="flex items-center gap-2 mb-3">
                                <Sparkles size={14} className="text-[#00e5ff]" />
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00e5ff]">
                                  Featured Production
                                </span>
                              </div>
                              <h5 className="font-serif text-lg font-bold text-white mb-2 leading-tight">
                                Hyper-Realistic 3D Product Cinematics
                              </h5>
                              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                Experience 8K raytraced particle VFX, fluid physics simulations, and bespoke brand worlds.
                              </p>
                            </div>
                            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                                  Turnaround
                                </span>
                                <span className="text-xs font-bold text-white">
                                  2-4 Weeks Agile
                                </span>
                              </div>
                              <Link
                                href="#contact"
                                onClick={() => setServicesDropdown(false)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00A3E0] hover:bg-cyan-400 text-white text-xs font-bold transition-all shadow-md shadow-cyan-500/30"
                              >
                                <span>Get Quote</span>
                                <ArrowRight size={12} />
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Mega Menu Footer */}
                        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center gap-4">
                            <span>Ready to elevate your vision?</span>
                            <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
                            <span className="text-[#00A3E0] font-medium">
                              Worldwide Production & Delivery
                            </span>
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
              className={`text-[14px] font-semibold transition-colors relative py-1 ${
                activeTab === "Portfolio"
                  ? "text-[#00A3E0]"
                  : "text-[#071527]/80 hover:text-[#00A3E0]"
              }`}
            >
              <span>Portfolio</span>
              {activeTab === "Portfolio" && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#00A3E0] rounded-full shadow-[0_0_8px_#00A3E0]"
                />
              )}
            </Link>

            {/* Showcase */}
            <Link
              href="#portfolio-spotlight"
              onClick={() => setActiveTab("Showcase")}
              className={`text-[14px] font-semibold transition-colors relative py-1 ${
                activeTab === "Showcase"
                  ? "text-[#00A3E0]"
                  : "text-[#071527]/80 hover:text-[#00A3E0]"
              }`}
            >
              <span>Showcase</span>
              {activeTab === "Showcase" && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#00A3E0] rounded-full shadow-[0_0_8px_#00A3E0]"
                />
              )}
            </Link>

            {/* About */}
            <Link
              href="#about"
              onClick={() => setActiveTab("About")}
              className={`text-[14px] font-semibold transition-colors relative py-1 ${
                activeTab === "About"
                  ? "text-[#00A3E0]"
                  : "text-[#071527]/80 hover:text-[#00A3E0]"
              }`}
            >
              <span>About</span>
              {activeTab === "About" && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#00A3E0] rounded-full shadow-[0_0_8px_#00A3E0]"
                />
              )}
            </Link>

            {/* Contact */}
            <Link
              href="#contact"
              onClick={() => setActiveTab("Contact")}
              className={`text-[14px] font-semibold transition-colors relative py-1 ${
                activeTab === "Contact"
                  ? "text-[#00A3E0]"
                  : "text-[#071527]/80 hover:text-[#00A3E0]"
              }`}
            >
              <span>Contact</span>
              {activeTab === "Contact" && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#00A3E0] rounded-full shadow-[0_0_8px_#00A3E0]"
                />
              )}
            </Link>
          </nav>

          {/* 3. Right: Quick Actions & Liquid Glass CTA Button */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Quick Contact badge (desktop) */}
            <a
              href="tel:+442081234567"
              className="hidden xl:flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#00A3E0] bg-white/70 hover:bg-white px-3.5 py-2 rounded-full border border-slate-200/80 shadow-sm transition-all"
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
                  : "text-slate-700 bg-white/70 hover:bg-white border border-slate-200/80 shadow-sm hover:shadow-[0_4px_12px_rgba(0,163,224,0.15)]"
              }`}
            >
              <Search size={16} />
            </button>

            {/* Framer Liquid Glass CTA Button */}
            <Link
              href="#contact"
              className="hidden sm:inline-flex relative group overflow-hidden rounded-full p-[1px] transition-all duration-300 active:scale-95"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/80 via-cyan-300/60 to-white/80 pointer-events-none" />
              <div className="relative flex items-center gap-2.5 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#00A3E0] via-[#0284c7] to-[#071527] text-white text-[13.5px] font-semibold tracking-wide shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.38),inset_0px_-1px_1px_0px_rgba(0,0,0,0.3),0px_7px_16px_-6px_rgba(0,163,224,0.45)] group-hover:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.6),inset_0px_-1px_1px_0px_rgba(0,0,0,0.3),0px_12px_24px_-6px_rgba(0,163,224,0.65)] transition-all duration-300">
                <div className="absolute -top-6 -left-16 w-14 h-24 bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-20 pointer-events-none group-hover:translate-x-60 transition-transform duration-700 ease-out" />
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight
                  size={14}
                  className="relative z-10 text-white group-hover:translate-x-1 transition-transform duration-200"
                />
              </div>
            </Link>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5 bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-sm hover:bg-white transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <motion.span
                className="w-[18px] h-[2px] bg-[#071527] rounded-full origin-center"
                animate={
                  mobileMenuOpen
                    ? { rotate: 45, y: 4 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
              />
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
        {/* Mobile Navigation Drawer                                                  */}
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
    </header>
  );
}
