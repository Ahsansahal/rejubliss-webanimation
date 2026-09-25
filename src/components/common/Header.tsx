"use client";

import React, { useState } from "react";
import Link from "next/link";
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
      <div className="relative rounded-2xl bg-white/70 sm:bg-[#faf8f5]/75 backdrop-blur-xl border border-white/60 shadow-xl shadow-[#0a2920]/[0.04] overflow-hidden">
        {/* ========================================================================= */}
        {/* Animated Light Beam 1: Moving Luminous Bottom Laser Beam Streak */}
        {/* ========================================================================= */}
        <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] overflow-hidden pointer-events-none z-20">
          <motion.div
            className="w-56 h-full bg-gradient-to-r from-transparent via-[#cba145] to-transparent"
            style={{
              boxShadow: "0 0 16px #cba145, 0 0 28px #dfb962",
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
              "--size": "300px",
              "--duration": "8s",
              "--color-from": "#cba145",
              "--color-to": "#0a2920",
            } as React.CSSProperties
          }
          className="pointer-events-none absolute inset-0 rounded-2xl [border:1.5px_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-[calc(var(--size))] after:animate-border-beam after:[background:linear-gradient(to_left,var(--color-from),#dfb962,#0a2920,transparent)] after:[offset-anchor:90%_50%] after:[offset-path:rect(0_100%_100%_0_round_16px)]"
        />

        {/* Ambient Top Glow Accent */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#cba145]/40 to-transparent pointer-events-none" />

        {/* Main Navigation Row */}
        <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between relative z-10">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#0a2920] shadow-md group-hover:shadow-[#0a2920]/20 transition-all duration-300">
              <span className="font-serif font-black text-xl text-[#cba145] tracking-tighter">
                R
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#cba145] border-2 border-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#0a2920] leading-none">
                  Rejubliss
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#cba145] animate-pulse" />
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7d8c85] mt-1">
                Design, Animate, Develop, Grow
              </span>
            </div>
          </Link>

          {/* Desktop Center Nav Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[15px] font-medium text-[#2d3b34]">
            <Link
              href="/"
              className="text-[#0a2920] font-semibold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#0a2920]"
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
                className="flex items-center gap-1 hover:text-[#0a2920] transition-colors py-1 group"
              >
                <span>Services</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    servicesDropdown ? "rotate-180 text-[#0a2920]" : "text-[#7d8c85]"
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
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#ede8df] p-2 py-3">
                      <Link
                        href="#services"
                        className="block px-3 py-2 text-sm rounded-xl hover:bg-[#faf8f5] text-[#2d3b34] hover:text-[#0a2920] font-medium transition-colors"
                      >
                        Website Design & Development
                      </Link>
                      <Link
                        href="#services"
                        className="block px-3 py-2 text-sm rounded-xl hover:bg-[#faf8f5] text-[#2d3b34] hover:text-[#0a2920] font-medium transition-colors"
                      >
                        Graphic Design & Branding
                      </Link>
                      <Link
                        href="#services"
                        className="block px-3 py-2 text-sm rounded-xl hover:bg-[#faf8f5] text-[#2d3b34] hover:text-[#0a2920] font-medium transition-colors"
                      >
                        2D Animated Explainers
                      </Link>
                      <Link
                        href="#services"
                        className="block px-3 py-2 text-sm rounded-xl hover:bg-[#faf8f5] text-[#2d3b34] hover:text-[#0a2920] font-medium transition-colors"
                      >
                        3D Product Animation
                      </Link>
                      <Link
                        href="#services"
                        className="block px-3 py-2 text-sm rounded-xl hover:bg-[#faf8f5] text-[#2d3b34] hover:text-[#0a2920] font-medium transition-colors"
                      >
                        Dynamic Motion Design
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="#portfolio" className="hover:text-[#0a2920] transition-colors">
              Portfolio
            </Link>
            <Link href="#about" className="hover:text-[#0a2920] transition-colors">
              About
            </Link>
            <Link href="#blog" className="hover:text-[#0a2920] transition-colors">
              Blog
            </Link>
            <Link href="#contact" className="hover:text-[#0a2920] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Contact badge (desktop) */}
            <a
              href="tel:+442081234567"
              className="hidden xl:flex items-center gap-2 text-xs font-semibold text-[#5e6d66] hover:text-[#0a2920] bg-white/60 px-3.5 py-2 rounded-full border border-[#ede8df]/80 transition-colors"
            >
              <Phone size={13} className="text-[#cba145]" />
              <span>+44 20 8123 4567</span>
            </a>

            {/* Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#2d3b34] hover:bg-black/5 transition-colors"
            >
              <Search size={17} />
            </button>

            {/* Project CTA Button */}
            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2.5 bg-[#0a2920] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#071d17] hover:shadow-lg hover:shadow-[#0a2920]/15 transition-all duration-200 group"
            >
              <span>Start Your Project</span>
              <ArrowRight
                size={14}
                className="text-[#cba145] group-hover:translate-x-1 transition-transform"
              />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#0a2920] rounded-lg hover:bg-black/5 transition-colors"
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
              className="px-6 pb-4 border-t border-[#ede8df]/80 pt-3"
            >
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search agency services, work, animations..."
                  autoFocus
                  className="w-full bg-white/90 border border-[#ede8df] px-4 py-2.5 pl-10 rounded-full text-xs text-[#0a2920] outline-none focus:ring-2 focus:ring-[#cba145]"
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
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#ede8df] px-6 py-5 flex flex-col gap-3.5 overflow-hidden"
            >
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-semibold text-[#0a2920]"
              >
                Home
              </Link>
              <Link
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#2d3b34]"
              >
                Services
              </Link>
              <Link
                href="#portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#2d3b34]"
              >
                Portfolio
              </Link>
              <Link
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#2d3b34]"
              >
                About
              </Link>
              <Link
                href="#blog"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#2d3b34]"
              >
                Blog
              </Link>
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#2d3b34]"
              >
                Contact
              </Link>
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 bg-[#0a2920] text-white py-3 rounded-full text-sm font-semibold"
              >
                <span>Start Your Project</span>
                <ArrowRight size={15} className="text-[#cba145]" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
