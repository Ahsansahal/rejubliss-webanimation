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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  return (
    <header className="fixed top-2 sm:top-3.5 left-0 right-0 z-50 w-[97%] max-w-[97%] mx-auto transition-all duration-300">
      {/* Glassmorphic Container with Glowing Beam */}
      <div className="relative rounded-2xl bg-white/80 sm:bg-[#f8fafc]/85 backdrop-blur-xl border border-slate-200/80 shadow-xl shadow-cyan-950/[0.06] overflow-hidden">
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
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900 border border-cyan-500/40 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 group-hover:scale-105 transition-all duration-300 p-1.5 overflow-hidden">
              <Image
                src="/images/logo-emblem.png"
                alt="Rejubliss 3D Animation Studios Logo"
                width={36}
                height={36}
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

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 hover:text-[#00A3E0] transition-colors py-1 group"
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
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full pt-2 w-64 z-50"
                  >
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/90 p-2 py-3">
                      <Link
                        href="#services"
                        className="block px-3 py-2 text-sm rounded-xl hover:bg-cyan-50/70 text-slate-700 hover:text-[#00A3E0] font-medium transition-colors"
                      >
                        Website Design & Development
                      </Link>
                      <Link
                        href="#services"
                        className="block px-3 py-2 text-sm rounded-xl hover:bg-cyan-50/70 text-slate-700 hover:text-[#00A3E0] font-medium transition-colors"
                      >
                        Graphic Design & Branding
                      </Link>
                      <Link
                        href="#services"
                        className="block px-3 py-2 text-sm rounded-xl hover:bg-cyan-50/70 text-slate-700 hover:text-[#00A3E0] font-medium transition-colors"
                      >
                        2D Animated Explainers
                      </Link>
                      <Link
                        href="#services"
                        className="block px-3 py-2 text-sm rounded-xl hover:bg-cyan-50/70 text-slate-700 hover:text-[#00A3E0] font-medium transition-colors"
                      >
                        3D Product Animation
                      </Link>
                      <Link
                        href="#services"
                        className="block px-3 py-2 text-sm rounded-xl hover:bg-cyan-50/70 text-slate-700 hover:text-[#00A3E0] font-medium transition-colors"
                      >
                        Dynamic Motion Design
                      </Link>
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
              <Link
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-[#00A3E0] transition-colors"
              >
                Services
              </Link>
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
