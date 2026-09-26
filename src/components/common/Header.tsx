"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Search,
  ArrowRight,
  Sparkles,
  Layers,
  Film,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const drawerNavContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.08,
    },
  },
};

const drawerNavItemVariants: Variants = {
  hidden: { opacity: 0, x: 22 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
};

export const MEGA_SERVICES = [
  {
    title: "3D Product Animation",
    subtitle: "Photorealistic CGI, raytraced lighting & explosive assembly views.",
    image: "/images/sneaker_3d.jpg",
    badge: "3D CGI",
    href: "#services",
    icon: Sparkles,
  },
  {
    title: "Interactive Web & WebGL",
    subtitle: "High-performance websites with fluid 3D WebGL experiences.",
    image: "/images/hero_tablet.jpg",
    badge: "WebGL",
    href: "#services",
    icon: Globe,
  },
  {
    title: "2D & 3D Character Motion",
    subtitle: "Narrative character animation, explainer videos & brand stories.",
    image: "/images/character_animation.jpg",
    badge: "Animation",
    href: "#services",
    icon: Film,
  },
  {
    title: "Dynamic Motion Design",
    subtitle: "Cinematic broadcast graphics, kinetic typography & fluid VFX.",
    image: "/images/cyan_motion.jpg",
    badge: "Motion VFX",
    href: "#services",
    icon: Layers,
  },
];

export function Header({ containerMaxWidth = "max-w-[1550px]" }: { containerMaxWidth?: string } = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Home");

  // Prevent background page from scrolling while mobile drawer is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const servicesTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const toggleServices = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesMenuOpen((prev) => !prev);
  };

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesMenuOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesMenuOpen(false);
    }, 300);
  };

  // Close menus on outside click and on Escape key
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#desktop-navbar-container")) {
        setServicesMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesMenuOpen(false);
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <header className="fixed top-2.5 sm:top-4 left-0 right-0 z-50 pointer-events-none px-2.5 sm:px-5">
        {/* Constrained Center Header Container */}
        <div
          id="desktop-navbar-container"
          className={`relative ${containerMaxWidth.startsWith("w-") ? "" : "w-full "}${containerMaxWidth} mx-auto pointer-events-auto overflow-visible`}
        >
          {/* Animated Rotating Laser Border Shell (Light Luxury) */}
          <div className="absolute inset-0 rounded-2xl p-[1.8px] overflow-hidden pointer-events-none shadow-[0_8px_32px_rgba(7,21,39,0.06),0_0_24px_-4px_rgba(0,163,224,0.22)]">
            {/* 360deg Rotating Laser Shine Beam */}
            <div
              className="absolute -inset-[350%] animate-border-beam"
              style={{
                background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 315deg, rgba(0, 163, 224, 0.35) 335deg, #00A3E0 350deg, #00e5ff 357deg, transparent 360deg)`,
              }}
            />
            {/* Header Background Surface - Light Luxury */}
            <div className="w-full h-full bg-white/95 backdrop-blur-2xl rounded-2xl border border-white/80 shadow-[inset_0px_1px_1.5px_rgba(255,255,255,0.9)]" />
          </div>

          {/* Crisp ambient border accent */}
          <div className="absolute inset-0 rounded-2xl border border-[#00A3E0]/25 pointer-events-none" />

          {/* Inner Header Bar (Refined Height) */}
          <div className="relative z-20 w-full h-[58px] sm:h-[68px] xl:h-[72px] px-3.5 sm:px-6 xl:px-8 flex items-center justify-between">
            {/* 1. Left: Brand Logo */}
            <div className="flex items-center gap-2 sm:gap-3 xl:gap-5 shrink-0">
              <Link
                href="/"
                onClick={() => setActiveTab("Home")}
                className="flex items-center gap-2.5 select-none group"
                aria-label="Rejubliss 3D Animation Studios"
              >
                <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 transition-transform group-hover:scale-105 duration-300 shrink-0">
                  <Image
                    src="/images/logo-emblem.png"
                    alt="Rejubliss 3D Animation Studios Logo"
                    width={40}
                    height={40}
                    priority
                    className="object-contain drop-shadow-[0_0_10px_rgba(0,163,224,0.3)]"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#071527] leading-none">
                      Rejubliss
                    </span>
                    <span className="inline-block w-2 h-2 rounded-full bg-[#00A3E0] shadow-[0_0_8px_#00A3E0] animate-pulse" />
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-widest font-bold text-slate-500 group-hover:text-[#00A3E0] transition-colors mt-0.5">
                    3D Animation Studios
                  </span>
                </div>
              </Link>

              {/* Vertical divider */}
              <div className="h-7 w-[1px] bg-slate-200 mx-1 hidden lg:block" />
            </div>

            {/* 2. Middle: Navigation Links (Clean Dark Navy & Cyan on Light Header) */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-2 xl:mx-4 2xl:gap-x-7 xl:gap-x-5 lg:gap-x-4 text-[13.5px] xl:text-[14px] font-medium tracking-normal">
              {/* 1. Home */}
              <Link
                href="/"
                onClick={() => setActiveTab("Home")}
                className={`relative py-1.5 font-semibold transition-colors group ${
                  activeTab === "Home" ? "text-[#00A3E0]" : "text-[#071527]/85 hover:text-[#00A3E0]"
                }`}
              >
                <span>Home</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00A3E0] rounded-full transition-transform duration-300 ${
                    activeTab === "Home" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>

              {/* 2. Services (Dropdown Trigger) */}
              <div
                className="relative py-1.5"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <button
                  type="button"
                  onClick={toggleServices}
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer group py-0.5 ${
                    servicesMenuOpen || activeTab === "Services"
                      ? "text-[#00A3E0] font-semibold"
                      : "text-[#071527]/85 hover:text-[#00A3E0]"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={servicesMenuOpen}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesMenuOpen
                        ? "rotate-180 text-[#00A3E0]"
                        : "text-slate-400 group-hover:text-[#00A3E0]"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00A3E0] origin-left transition-transform duration-300 rounded-full ${
                      servicesMenuOpen || activeTab === "Services"
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>

                {/* Compact Elegant Submenu Mega Menu (Centered & Refined Size) */}
                <AnimatePresence>
                  {servicesMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      onMouseEnter={handleServicesEnter}
                      onMouseLeave={handleServicesLeave}
                      className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[760px] lg:w-[820px] max-w-[92vw] rounded-2xl bg-white/98 border border-slate-200/90 backdrop-blur-3xl p-5 shadow-[0_20px_50px_rgba(7,21,39,0.12),0_4px_16px_rgba(0,163,224,0.08)] z-50 text-left pointer-events-auto before:absolute before:-top-4 before:left-0 before:right-0 before:h-6 before:content-['']"
                    >
                      {/* Submenu Top Header Bar */}
                      <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#00A3E0] shadow-[0_0_6px_#00A3E0] animate-pulse" />
                          <span className="text-[11px] font-bold uppercase tracking-widest text-[#00A3E0]">
                            Studio Capabilities & Services
                          </span>
                        </div>
                        <Link
                          href="#services"
                          onClick={() => {
                            setServicesMenuOpen(false);
                            setActiveTab("Services");
                          }}
                          className="text-xs font-semibold text-slate-500 hover:text-[#00A3E0] transition-colors flex items-center gap-1 group"
                        >
                          <span>Explore All Services</span>
                          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>

                      {/* Main Grid: 4 Compact Service Picture Cards + 1 Spotlight Production Card */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
                        {/* Left: 4 Service Cards (8 cols) */}
                        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {MEGA_SERVICES.map((srv) => (
                            <Link
                              key={srv.title}
                              href={srv.href}
                              onClick={() => {
                                setServicesMenuOpen(false);
                                setActiveTab("Services");
                              }}
                              className="group flex flex-col p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-cyan-50/50 hover:border-[#00A3E0]/40 transition-all duration-200 shadow-xs"
                            >
                              <div className="relative aspect-[16/9] w-full h-[90px] rounded-lg overflow-hidden mb-2 bg-slate-100">
                                <Image
                                  src={srv.image}
                                  alt={srv.title}
                                  fill
                                  sizes="240px"
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-sm border border-cyan-200 text-[9.5px] font-bold text-[#00A3E0] tracking-wide uppercase shadow-xs">
                                  {srv.badge}
                                </div>
                              </div>
                              <div className="flex items-center justify-between mb-0.5">
                                <h4 className="text-[13px] font-bold text-[#071527] group-hover:text-[#00A3E0] transition-colors flex items-center gap-1">
                                  <span>{srv.title}</span>
                                  <ArrowRight
                                    size={11}
                                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#00A3E0]"
                                  />
                                </h4>
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1 leading-normal">
                                {srv.subtitle}
                              </p>
                            </Link>
                          ))}
                        </div>

                        {/* Right: Studio Spotlight Production Card (4 cols) */}
                        <div className="lg:col-span-4 rounded-xl bg-gradient-to-br from-[#071527] via-[#091f3a] to-[#040c18] border border-cyan-500/25 p-4 text-white flex flex-col justify-between relative overflow-hidden shadow-lg shadow-cyan-950/25">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A3E0]/20 rounded-full blur-2xl pointer-events-none" />
                          <div className="relative z-10">
                            <div className="flex items-center gap-1.5 mb-2">
                              <Sparkles size={13} className="text-[#00e5ff]" />
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00e5ff]">
                                Featured Production
                              </span>
                            </div>
                            <h5 className="font-serif text-[15px] font-bold text-white mb-1.5 leading-snug">
                              Hyper-Realistic 3D Cinematics
                            </h5>
                            <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                              Experience 8K raytraced particle VFX, fluid physics simulations, and bespoke brand worlds.
                            </p>
                          </div>
                          <div className="relative z-10 pt-2.5 border-t border-white/10 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">
                                Turnaround
                              </span>
                              <span className="text-[11px] font-bold text-white">
                                2-4 Weeks Agile
                              </span>
                            </div>
                            <Link
                              href="#contact"
                              onClick={() => setServicesMenuOpen(false)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#00A3E0] hover:bg-cyan-400 text-white text-[11px] font-bold transition-all shadow-sm"
                            >
                              <span>Get Quote</span>
                              <ArrowRight size={11} />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Submenu Footer */}
                      <div className="border-t border-slate-100 mt-3.5 pt-2.5 px-1 flex flex-wrap items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-4 text-[11.5px]">
                          <span className="flex items-center gap-1 text-slate-600">
                            <CheckCircle2 size={12} className="text-[#00A3E0]" />
                            Worldwide Production
                          </span>
                          <span className="flex items-center gap-1 text-slate-600">
                            <CheckCircle2 size={12} className="text-[#00A3E0]" />
                            NDA Protected
                          </span>
                        </div>

                        <Link
                          href="#contact"
                          onClick={() => setServicesMenuOpen(false)}
                          className="font-semibold text-[#00A3E0] hover:text-cyan-700 flex items-center gap-1 transition-colors text-[11.5px]"
                        >
                          <span>Talk to an animation director</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. Portfolio */}
              <Link
                href="#portfolio"
                onClick={() => setActiveTab("Portfolio")}
                className={`relative py-1.5 transition-colors group ${
                  activeTab === "Portfolio" ? "text-[#00A3E0]" : "text-[#071527]/85 hover:text-[#00A3E0]"
                }`}
              >
                <span>Portfolio</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00A3E0] origin-left transition-transform duration-300 rounded-full ${
                    activeTab === "Portfolio" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>

              {/* 4. Showcase */}
              <Link
                href="#portfolio-spotlight"
                onClick={() => setActiveTab("Showcase")}
                className={`relative py-1.5 transition-colors group ${
                  activeTab === "Showcase" ? "text-[#00A3E0]" : "text-[#071527]/85 hover:text-[#00A3E0]"
                }`}
              >
                <span>Showcase</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00A3E0] origin-left transition-transform duration-300 rounded-full ${
                    activeTab === "Showcase" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>

              {/* 5. About */}
              <Link
                href="#about"
                onClick={() => setActiveTab("About")}
                className={`relative py-1.5 transition-colors group ${
                  activeTab === "About" ? "text-[#00A3E0]" : "text-[#071527]/85 hover:text-[#00A3E0]"
                }`}
              >
                <span>About</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00A3E0] origin-left transition-transform duration-300 rounded-full ${
                    activeTab === "About" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>

              {/* 6. Contact */}
              <Link
                href="#contact"
                onClick={() => setActiveTab("Contact")}
                className={`relative py-1.5 transition-colors group ${
                  activeTab === "Contact" ? "text-[#00A3E0]" : "text-[#071527]/85 hover:text-[#00A3E0]"
                }`}
              >
                <span>Contact</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00A3E0] origin-left transition-transform duration-300 rounded-full ${
                    activeTab === "Contact" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            </nav>

            {/* 3. Right: Cyan Call Button, Search & Mobile Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Phone Call Button */}
              <a
                href="tel:+442081234567"
                className="h-[36px] sm:h-[40px] px-2.5 sm:px-4 rounded-xl border-2 border-[#00A3E0] bg-[#00A3E0] hover:bg-transparent text-white hover:text-[#00A3E0] flex items-center justify-center gap-2 font-semibold text-[12.5px] sm:text-[13.5px] shadow-[0_0_18px_rgba(0,163,224,0.25)] hover:shadow-[0_0_24px_rgba(0,163,224,0.4)] transition-all duration-300 shrink-0 active:scale-95 group"
              >
                <Phone className="w-3.5 h-3.5 text-white group-hover:text-[#00A3E0] fill-current shrink-0 transition-colors" />
                <span className="hidden sm:inline whitespace-nowrap font-semibold tracking-tight">
                  +44 20 8123 4567
                </span>
              </a>

              {/* Search Toggle Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search site"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 active:scale-95 cursor-pointer ${
                  searchOpen
                    ? "bg-[#00A3E0] text-white border border-[#00A3E0] shadow-[0_0_16px_rgba(0,163,224,0.35)]"
                    : "bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/90 text-slate-700 hover:text-[#00A3E0]"
                }`}
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Start Project CTA Button */}
              <Link
                href="#contact"
                className="hidden xl:inline-flex items-center gap-2 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#00A3E0] via-[#0284c7] to-[#071527] hover:opacity-95 text-white font-semibold text-[13px] shadow-[0_4px_16px_rgba(0,163,224,0.3)] transition-all active:scale-95"
              >
                <span>Start Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/90 text-slate-700 hover:text-[#00A3E0] flex items-center justify-center transition-colors shrink-0 active:scale-95 cursor-pointer"
                aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              >
                <motion.div
                  key={mobileMenuOpen ? "open" : "closed"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 text-[#00A3E0]" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>

          {/* Search Drawer (Light Luxury Theme) */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="px-5 sm:px-8 pb-3.5 pt-1 overflow-hidden"
              >
                <div className="relative max-w-lg mx-auto">
                  <div className="relative flex items-center p-1 rounded-xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_8px_20px_-4px_rgba(7,21,39,0.1)] focus-within:border-[#00A3E0] focus-within:shadow-[0_8px_24px_-4px_rgba(0,163,224,0.25)] transition-all">
                    <Search size={15} className="absolute left-3.5 text-[#00A3E0]" />
                    <input
                      type="text"
                      placeholder="Search 3D animations, CGI commercials, WebGL services..."
                      autoFocus
                      className="w-full bg-transparent px-3 py-1.5 pl-9 pr-16 text-xs sm:text-sm text-[#071527] outline-none placeholder:text-slate-400 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="text-[11px] font-bold text-slate-400 hover:text-[#071527] px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      ESC
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* =========================================================================
          MODERN OFF-CANVAS RIGHT-SIDE SLIDE-IN MOBILE NAVIGATION DRAWER (Light Theme)
         ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Subtle Backdrop Overlay */}
            <motion.div
              key="mobile-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[99] pointer-events-auto cursor-pointer"
              aria-hidden="true"
            />

            {/* Right-Side Off-Canvas Drawer (Light Theme) */}
            <motion.div
              key="mobile-drawer-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 h-[100dvh] w-[85%] xs:w-[82%] sm:w-[380px] max-w-[420px] bg-white/98 border-l border-slate-200 rounded-l-[28px] shadow-[-14px_0_40px_rgba(7,21,39,0.15)] z-[100] pointer-events-auto flex flex-col font-sans overflow-hidden text-[#071527]"
            >
              {/* Ambient Cyan Glow Line along curved left edge */}
              <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-[#00A3E0]/70 to-transparent pointer-events-none" />

              {/* Top Drawer Header: Brand Logo + Close (×) Button */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-4.5 border-b border-slate-100 bg-slate-50/70 shrink-0">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 select-none"
                >
                  <div className="relative flex items-center justify-center w-8 h-8">
                    <Image
                      src="/images/logo-emblem.png"
                      alt="Rejubliss 3D Animation Studios Logo"
                      width={34}
                      height={34}
                      priority
                      className="object-contain drop-shadow-[0_0_10px_rgba(0,163,224,0.3)]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-lg font-bold tracking-tight text-[#071527] leading-tight">
                      Rejubliss
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-[#00A3E0] font-bold">
                      3D Studios
                    </span>
                  </div>
                </Link>

                {/* Clear Close Button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-white hover:bg-cyan-50 border border-slate-200 text-slate-600 hover:text-[#00A3E0] flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shadow-xs"
                  aria-label="Close menu"
                >
                  <X className="w-4.5 h-4.5 text-[#00A3E0]" />
                </button>
              </div>

              {/* Navigation Items (Scrollable Body with Staggered Entrance) */}
              <motion.div
                variants={drawerNavContainerVariants}
                initial="hidden"
                animate="show"
                className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-300"
              >
                {/* 1. Home */}
                <motion.div variants={drawerNavItemVariants}>
                  <Link
                    href="/"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveTab("Home");
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-colors ${
                      activeTab === "Home"
                        ? "bg-cyan-50/80 border-cyan-200 text-[#00A3E0] font-semibold"
                        : "border-slate-100 text-slate-800 hover:text-[#00A3E0] hover:bg-slate-50"
                    }`}
                  >
                    <span>Home</span>
                    <span className="w-2 h-2 rounded-full bg-[#00A3E0] shadow-[0_0_6px_#00A3E0]" />
                  </Link>
                </motion.div>

                {/* 2. Services (Accordion with Rejubliss 4 Services) */}
                <motion.div variants={drawerNavItemVariants} className="rounded-xl overflow-hidden bg-slate-50/70 border border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 text-left text-slate-800 hover:text-[#00A3E0] transition-colors font-medium text-[14.5px] active:scale-[0.98] cursor-pointer"
                    aria-expanded={mobileServicesOpen}
                  >
                    <span className="flex items-center gap-2">
                      <span>Services</span>
                      <span className="text-[9.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#00A3E0]/15 text-[#00A3E0] border border-[#00A3E0]/25">
                        4 Studios
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        mobileServicesOpen ? "rotate-180 text-[#00A3E0]" : "text-slate-400"
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-slate-200/80 bg-white/90 px-2 py-1.5 space-y-1"
                      >
                        {MEGA_SERVICES.map((srv) => (
                          <Link
                            key={srv.title}
                            href={srv.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setActiveTab("Services");
                            }}
                            className="flex items-center gap-2.5 p-2 rounded-lg text-slate-700 hover:text-[#00A3E0] hover:bg-cyan-50/50 transition-colors group"
                          >
                            <div className="relative aspect-[16/10] w-11 h-7 rounded-md overflow-hidden shrink-0 bg-slate-100">
                              <Image
                                src={srv.image}
                                alt={srv.title}
                                fill
                                sizes="44px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[12.5px] font-semibold text-[#071527] group-hover:text-[#00A3E0] truncate">
                                {srv.title}
                              </div>
                              <div className="text-[10px] text-slate-500 truncate">
                                {srv.badge} • {srv.subtitle}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* 3. Portfolio */}
                <motion.div variants={drawerNavItemVariants}>
                  <Link
                    href="#portfolio"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveTab("Portfolio");
                    }}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-100 text-slate-800 hover:text-[#00A3E0] hover:bg-slate-50 transition-colors font-medium text-[14.5px]"
                  >
                    <span>Portfolio</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </motion.div>

                {/* 4. Showcase */}
                <motion.div variants={drawerNavItemVariants}>
                  <Link
                    href="#portfolio-spotlight"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveTab("Showcase");
                    }}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-100 text-slate-800 hover:text-[#00A3E0] hover:bg-slate-50 transition-colors font-medium text-[14.5px]"
                  >
                    <span>Showcase</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </motion.div>

                {/* 5. About */}
                <motion.div variants={drawerNavItemVariants}>
                  <Link
                    href="#about"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveTab("About");
                    }}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-100 text-slate-800 hover:text-[#00A3E0] hover:bg-slate-50 transition-colors font-medium text-[14.5px]"
                  >
                    <span>About</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </motion.div>

                {/* 6. Contact */}
                <motion.div variants={drawerNavItemVariants}>
                  <Link
                    href="#contact"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveTab("Contact");
                    }}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-100 text-slate-800 hover:text-[#00A3E0] hover:bg-slate-50 transition-colors font-medium text-[14.5px]"
                  >
                    <span>Contact</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Bottom Drawer Action Dock (Light Theme) */}
              <div className="p-4 sm:p-5 border-t border-slate-200/80 bg-slate-50/80 shrink-0 space-y-2">
                <a
                  href="tel:+442081234567"
                  className="w-full py-2.5 px-4 rounded-xl border-2 border-[#00A3E0] bg-[#00A3E0] hover:bg-transparent text-white hover:text-[#00A3E0] flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 fill-current shrink-0" />
                  <span>Call +44 20 8123 4567</span>
                </a>

                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-[#00A3E0] bg-white text-[#071527] hover:text-[#00A3E0] flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm transition-all active:scale-95 shadow-xs"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00A3E0]" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
