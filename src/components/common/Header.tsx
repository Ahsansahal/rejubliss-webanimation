"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Search,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Sparkles,
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

  return (
    <header className="fixed top-2 sm:top-3.5 left-0 right-0 z-50 w-[97%] max-w-[97%] mx-auto transition-all duration-300">
      {/* Glassmorphic Container with Glowing Beam */}
      <div className="relative rounded-2xl bg-white/80 sm:bg-[#f8fafc]/85 backdrop-blur-xl border border-slate-200/80 shadow-xl shadow-cyan-950/[0.06]">
        {/* ========================================================================= */}
        {/* Animated Light Beam 1: Moving Luminous Bottom Laser Beam Streak */}
        {/* ========================================================================= */}
        <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] overflow-hidden pointer-events-none z-20">
          <motion.div
            className="w-64 h-full bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent"
            style={{
              boxShadow: "0 0 16px #00e5ff, 0 0 28px #00A3E0",
            }}
            animate={{
              x: ["-100%", "900%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* ========================================================================= */}
        {/* Animated Light Beam 2: Glowing Perimeter Border Beam */}
        {/* ========================================================================= */}
        <div
          style={
            {
              "--size": "320px",
              "--duration": "8s",
              "--color-from": "#00e5ff",
              "--color-to": "#071527",
            } as React.CSSProperties
          }
          className="pointer-events-none absolute inset-0 rounded-2xl [border:1.5px_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-[calc(var(--size))] after:animate-border-beam after:[background:linear-gradient(to_left,var(--color-from),#00A3E0,#071527,transparent)] after:[offset-anchor:90%_50%] after:[offset-path:rect(0_100%_100%_0_round_16px)]"
        />

        {/* Ambient Top Glow Accent */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00e5ff]/40 to-transparent pointer-events-none" />

        {/* Main Navigation Row */}
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between relative z-10">
          {/* Brand Logo with Emblem */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative flex items-center justify-center w-11 h-11 transition-transform group-hover:scale-105 duration-300">
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
                <span className="font-serif text-2xl font-bold tracking-tight text-[#071527] leading-none">
                  Rejubliss
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#00A3E0] mt-1">
                3D Animation Studios
              </span>
            </div>
          </Link>

          {/* Desktop Center Nav Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-[15px] font-medium text-[#1e293b]">
            <Link
              href="/"
              className="text-[#071527] font-semibold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#00A3E0]"
            >
              Home
            </Link>

            {/* Services Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdown((prev) => !prev)}
                className="flex items-center gap-1 hover:text-[#00A3E0] transition-colors py-1 group cursor-pointer"
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

              <AnimatePresence>
                {servicesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -left-[140px] sm:-left-[200px] md:-left-[260px] lg:-left-[300px] xl:-left-[320px] top-full pt-3 w-[880px] lg:w-[960px] xl:w-[1000px] max-w-[95vw] z-50 pointer-events-auto"
                  >
                    <div className="bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-cyan-950/10 border border-slate-200 p-5 sm:p-6 overflow-hidden relative">
                      {/* Subtle top cyan glow line */}
                      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent" />

                      {/* Header / Category label */}
                      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
                          <span className="text-xs font-bold uppercase tracking-widest text-[#00A3E0]">
                            Studio Capabilities & Services
                          </span>
                        </div>
                        <Link
                          href="#services"
                          onClick={() => setServicesDropdown(false)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#00A3E0] transition-colors flex items-center gap-1 group"
                        >
                          <span>View All Services</span>
                          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>

                      {/* Main Grid: 4 Service Cards with Pictures (8 cols) + 1 Featured Spotlight (4 cols) */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                        {/* Left: 4 Service Cards in 2x2 grid */}
                        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {MEGA_SERVICES.map((srv) => (
                            <Link
                              key={srv.title}
                              href={srv.href}
                              onClick={() => setServicesDropdown(false)}
                              className="group flex flex-col p-3 rounded-2xl border border-slate-200/90 bg-slate-50/70 hover:bg-cyan-50/40 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
                            >
                              {/* Image Thumbnail with floating badge */}
                              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-2.5 bg-slate-100">
                                <Image
                                  src={srv.image}
                                  alt={srv.title}
                                  fill
                                  sizes="280px"
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm border border-cyan-200 text-[10px] font-bold text-[#00A3E0] tracking-wide uppercase shadow-sm">
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
                            onClick={() => setServicesDropdown(false)}
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
                              <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="#portfolio" className="hover:text-[#00A3E0] transition-colors">
              Portfolio
            </Link>
            <Link href="#portfolio-spotlight" className="hover:text-[#00A3E0] transition-colors">
              Showcase
            </Link>
            <Link href="#about" className="hover:text-[#00A3E0] transition-colors">
              About
            </Link>
            <Link href="#contact" className="hover:text-[#00A3E0] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Contact badge (desktop) */}
            <a
              href="tel:+442081234567"
              className="hidden xl:flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#00A3E0] bg-white/70 px-3.5 py-2 rounded-full border border-slate-200/80 transition-colors"
            >
              <Phone size={13} className="text-[#00A3E0]" />
              <span>+44 20 8123 4567</span>
            </a>

            {/* Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-black/5 transition-colors"
            >
              <Search size={17} />
            </button>

            {/* Project CTA Button */}
            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2.5 bg-gradient-to-r from-[#00A3E0] to-[#0284c7] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 group"
            >
              <span>Start Your Project</span>
              <ArrowRight
                size={14}
                className="text-white group-hover:translate-x-1 transition-transform"
              />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#071527] rounded-lg hover:bg-black/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Quick Search Bar Drawer */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-6 pb-4 border-t border-slate-200/80 pt-3"
            >
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search 3D animation, CGI, VFX services, portfolio..."
                  autoFocus
                  className="w-full bg-white/95 border border-slate-200 px-4 py-2.5 pl-10 rounded-full text-xs text-[#071527] outline-none focus:ring-2 focus:ring-[#00e5ff]"
                />
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7d8c85]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Slide-down Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-6 py-5 flex flex-col gap-3.5 overflow-hidden"
            >
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-semibold text-[#00A3E0]"
              >
                Home
              </Link>
              {/* Mobile Services Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between text-slate-700 hover:text-[#00A3E0] transition-colors py-1 cursor-pointer font-medium"
                >
                  <span>Services</span>
                  <ChevronDown
                    size={14}
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
                      className="pt-2 pb-1 flex flex-col gap-2.5 overflow-hidden"
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
                          <ArrowRight size={12} className="text-slate-400 group-hover:text-[#00A3E0] shrink-0" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link
                href="#portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-[#00A3E0] transition-colors"
              >
                Portfolio
              </Link>
              <Link
                href="#portfolio-spotlight"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-[#00A3E0] transition-colors"
              >
                Showcase
              </Link>
              <Link
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-[#00A3E0] transition-colors"
              >
                About
              </Link>
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-[#00A3E0] transition-colors"
              >
                Contact
              </Link>
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00A3E0] to-[#0284c7] text-white py-3 rounded-full text-sm font-semibold shadow-md shadow-cyan-500/20"
              >
                <span>Start Your Project</span>
                <ArrowRight size={15} className="text-white" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
