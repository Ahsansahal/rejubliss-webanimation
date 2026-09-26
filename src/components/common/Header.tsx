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

export function Header({ containerMaxWidth = "max-w-[1850px]" }: { containerMaxWidth?: string } = {}) {
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
    }, 350);
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
      <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 pointer-events-none px-2 sm:px-4">
        {/* Full width container with max constraint */}
        <div
          id="desktop-navbar-container"
          className={`relative ${containerMaxWidth.startsWith("w-") ? "" : "w-full "}${containerMaxWidth} mx-auto pointer-events-auto overflow-visible`}
        >
          {/* Animated Rotating Laser Border Shell */}
          <div className="absolute inset-0 rounded-2xl p-[1.8px] overflow-hidden pointer-events-none shadow-[0_0_35px_-4px_rgba(64,190,226,0.35)]">
            {/* 360deg Rotating Laser Shine Beam */}
            <div
              className="absolute -inset-[350%] animate-border-beam"
              style={{
                background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 315deg, rgba(64, 190, 226, 0.35) 335deg, #40bee2 350deg, #ffffff 357deg, transparent 360deg)`,
              }}
            />
            {/* Header background surface inside the border - Always Dark Luxury per user instruction */}
            <div className="w-full h-full bg-[#02050e]/95 backdrop-blur-2xl rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.8)]" />
          </div>

          {/* Crisp ambient border accent */}
          <div className="absolute inset-0 rounded-2xl border border-[#40bee2]/30 pointer-events-none" />

          {/* Inner Header Bar: relative z-20 & overflow-visible */}
          <div className="relative z-20 w-full h-[64px] sm:h-[82px] xl:h-[88px] px-3 sm:px-7 xl:px-9 flex items-center justify-between">
            {/* 1. Left: Brand Logo */}
            <div className="flex items-center gap-2 sm:gap-3 xl:gap-6 shrink-0">
              <Link
                href="/"
                onClick={() => setActiveTab("Home")}
                className="flex items-center gap-2.5 sm:gap-3.5 select-none group"
                aria-label="Rejubliss 3D Animation Studios"
              >
                <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 transition-transform group-hover:scale-105 duration-300 shrink-0">
                  <Image
                    src="/images/logo-emblem.png"
                    alt="Rejubliss 3D Animation Studios Logo"
                    width={46}
                    height={46}
                    priority
                    className="object-contain drop-shadow-[0_0_15px_rgba(64,190,226,0.35)]"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
                      Rejubliss
                    </span>
                    <span className="inline-block w-2 h-2 rounded-full bg-[#40bee2] shadow-[0_0_8px_#40bee2] animate-pulse" />
                  </div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-slate-400 group-hover:text-[#40bee2] transition-colors mt-1">
                    3D Animation Studios
                  </span>
                </div>
              </Link>

              {/* Vertical divider */}
              <div className="h-8 w-[1px] bg-slate-700/80 mx-1 hidden lg:block" />
            </div>

            {/* 2. Middle: Navigation Links (Always White & Cyan on Dark Luxury Header) */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-2 xl:mx-5 2xl:gap-x-6 xl:gap-x-5 lg:gap-x-3.5 text-[14px] xl:text-[14.5px] 2xl:text-[15px] font-medium tracking-normal">
              {/* 1. Home */}
              <Link
                href="/"
                onClick={() => setActiveTab("Home")}
                className={`relative py-2 font-semibold transition-colors group ${
                  activeTab === "Home" ? "text-[#40bee2]" : "text-white hover:text-[#40bee2]"
                }`}
              >
                <span>Home</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-[#40bee2] rounded-full transition-transform duration-300 ${
                    activeTab === "Home" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>

              {/* 2. Services (Full-Width Mega Menu) */}
              <div
                className="relative py-2"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <button
                  type="button"
                  onClick={toggleServices}
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer group py-1 ${
                    servicesMenuOpen || activeTab === "Services"
                      ? "text-[#40bee2]"
                      : "text-white hover:text-[#40bee2]"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={servicesMenuOpen}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesMenuOpen
                        ? "rotate-180 text-[#40bee2]"
                        : "text-slate-300 group-hover:text-[#40bee2]"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-[#40bee2] origin-left transition-transform duration-300 rounded-full ${
                      servicesMenuOpen || activeTab === "Services"
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              </div>

              {/* 3. Portfolio */}
              <Link
                href="#portfolio"
                onClick={() => setActiveTab("Portfolio")}
                className={`relative py-2 transition-colors group ${
                  activeTab === "Portfolio" ? "text-[#40bee2]" : "text-white hover:text-[#40bee2]"
                }`}
              >
                <span>Portfolio</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-[#40bee2] origin-left transition-transform duration-300 rounded-full ${
                    activeTab === "Portfolio" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>

              {/* 4. Showcase */}
              <Link
                href="#portfolio-spotlight"
                onClick={() => setActiveTab("Showcase")}
                className={`relative py-2 transition-colors group ${
                  activeTab === "Showcase" ? "text-[#40bee2]" : "text-white hover:text-[#40bee2]"
                }`}
              >
                <span>Showcase</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-[#40bee2] origin-left transition-transform duration-300 rounded-full ${
                    activeTab === "Showcase" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>

              {/* 5. About */}
              <Link
                href="#about"
                onClick={() => setActiveTab("About")}
                className={`relative py-2 transition-colors group ${
                  activeTab === "About" ? "text-[#40bee2]" : "text-white hover:text-[#40bee2]"
                }`}
              >
                <span>About</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-[#40bee2] origin-left transition-transform duration-300 rounded-full ${
                    activeTab === "About" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>

              {/* 6. Contact */}
              <Link
                href="#contact"
                onClick={() => setActiveTab("Contact")}
                className={`relative py-2 transition-colors group ${
                  activeTab === "Contact" ? "text-[#40bee2]" : "text-white hover:text-[#40bee2]"
                }`}
              >
                <span>Contact</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-[#40bee2] origin-left transition-transform duration-300 rounded-full ${
                    activeTab === "Contact" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            </nav>

            {/* 3. Right: Cyan Call Button, Search & Mobile Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Quick Contact Button */}
              <a
                href="tel:+442081234567"
                className="h-[36px] sm:h-[46px] px-2.5 sm:px-6 rounded-xl border-2 border-[#00A3E0] bg-[#00A3E0] hover:bg-transparent text-white hover:text-[#00A3E0] flex items-center justify-center gap-2 font-semibold text-[13px] sm:text-[15px] shadow-[0_0_25px_rgba(0,163,224,0.35)] hover:shadow-[0_0_35px_rgba(0,163,224,0.55)] transition-all duration-300 shrink-0 active:scale-95 group"
              >
                <Phone className="w-4 h-4 text-white group-hover:text-[#00A3E0] fill-current shrink-0 transition-colors" />
                <span className="hidden sm:inline whitespace-nowrap font-semibold tracking-tight">
                  +44 20 8123 4567
                </span>
              </a>

              {/* Search Toggle Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search site"
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-colors shrink-0 active:scale-95 cursor-pointer ${
                  searchOpen
                    ? "bg-[#00A3E0] text-white border border-[#00A3E0] shadow-[0_0_20px_rgba(0,163,224,0.4)]"
                    : "bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-[#40bee2] hover:border-[#40bee2]"
                }`}
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Start Project CTA Button */}
              <Link
                href="#contact"
                className="hidden xl:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00A3E0] to-[#0284c7] hover:from-cyan-400 hover:to-[#00A3E0] text-white font-semibold text-[13.5px] shadow-[0_0_20px_rgba(0,163,224,0.35)] hover:shadow-[0_0_30px_rgba(0,163,224,0.6)] transition-all active:scale-95"
              >
                <span>Start Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Mobile Menu Toggle Button with smooth rotation */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden relative w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-[#40bee2] hover:border-[#40bee2] flex items-center justify-center transition-colors shrink-0 active:scale-95 cursor-pointer"
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
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#40bee2]" />
                  ) : (
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>

          {/* Search Drawer */}
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
                  <div className="relative flex items-center p-1 rounded-xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-[0_10px_24px_-6px_rgba(0,163,224,0.3)] focus-within:border-[#40bee2] transition-all">
                    <Search size={16} className="absolute left-4 text-[#40bee2]" />
                    <input
                      type="text"
                      placeholder="Search 3D animations, CGI commercials, WebGL services..."
                      autoFocus
                      className="w-full bg-transparent px-4 py-2 pl-10 pr-20 text-xs sm:text-sm text-white outline-none placeholder:text-slate-400 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="text-[11px] font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      ESC
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4. Full-Width Rejubliss Services Mega Menu (Original Submenu Styling Preserved) */}
          <AnimatePresence>
            {servicesMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.99 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
                className="absolute top-[calc(100%+8px)] left-0 right-0 w-full rounded-3xl bg-white/98 dark:bg-[#06070a]/98 border border-slate-200/90 dark:border-white/10 backdrop-blur-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_35px_80px_rgba(0,0,0,0.95)] z-50 text-left pointer-events-auto before:absolute before:-top-4 before:left-0 before:right-0 before:h-6 before:content-['']"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-slate-200/80 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#40bee2] shadow-[0_0_8px_#40bee2] animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#00A3E0] dark:text-[#40bee2]">
                      Studio Capabilities & 3D Animation Services
                    </span>
                  </div>
                  <Link
                    href="#services"
                    onClick={() => {
                      setServicesMenuOpen(false);
                      setActiveTab("Services");
                    }}
                    className="text-xs font-semibold text-slate-500 hover:text-[#00A3E0] dark:hover:text-[#40bee2] transition-colors flex items-center gap-1 group"
                  >
                    <span>Explore All Services</span>
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* Main Grid: 4 Service Picture Cards (8 cols) + 1 Studio Spotlight (4 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                  {/* Left: 4 Service Cards */}
                  <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {MEGA_SERVICES.map((srv) => (
                      <Link
                        key={srv.title}
                        href={srv.href}
                        onClick={() => {
                          setServicesMenuOpen(false);
                          setActiveTab("Services");
                        }}
                        className="group flex flex-col p-3 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/80 dark:bg-white/[0.03] hover:bg-cyan-50/70 dark:hover:bg-white/[0.07] hover:border-[#00A3E0]/40 dark:hover:border-[#40bee2]/40 transition-all duration-300 shadow-sm"
                      >
                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-2.5 bg-slate-100 dark:bg-slate-900">
                          <Image
                            src={srv.image}
                            alt={srv.title}
                            fill
                            sizes="280px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/95 dark:bg-slate-950/90 backdrop-blur-sm border border-cyan-200 dark:border-cyan-500/40 text-[10px] font-bold text-[#00A3E0] dark:text-[#40bee2] tracking-wide uppercase shadow-sm">
                            {srv.badge}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#00A3E0] dark:group-hover:text-[#40bee2] transition-colors flex items-center gap-1.5">
                            <span>{srv.title}</span>
                            <ArrowRight
                              size={13}
                              className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#00A3E0] dark:text-[#40bee2]"
                            />
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {srv.subtitle}
                        </p>
                      </Link>
                    ))}
                  </div>

                  {/* Right: Studio Spotlight Production Card */}
                  <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-slate-900 via-[#071527] to-[#02050e] border border-cyan-500/30 p-5 text-white flex flex-col justify-between relative overflow-hidden shadow-xl shadow-cyan-950/40">
                    <div className="absolute top-0 right-0 w-44 h-44 bg-[#00A3E0]/20 rounded-full blur-2xl pointer-events-none" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles size={14} className="text-[#40bee2]" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#40bee2]">
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
                        onClick={() => setServicesMenuOpen(false)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00A3E0] hover:bg-cyan-400 text-white text-xs font-bold transition-all shadow-md shadow-cyan-500/30"
                      >
                        <span>Get Quote</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Submenu Footer */}
                <div className="border-t border-slate-200 dark:border-white/[0.08] mt-6 pt-4 px-1 flex flex-wrap items-center justify-between text-[13px]">
                  <div className="flex items-center gap-6 text-slate-600 dark:text-slate-400 text-xs">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-[#00A3E0] dark:text-[#40bee2]" />
                      Worldwide Production
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-[#00A3E0] dark:text-[#40bee2]" />
                      Direct Studio Access
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-[#00A3E0] dark:text-[#40bee2]" />
                      Enterprise NDA Protected
                    </span>
                  </div>

                  <Link
                    href="#contact"
                    onClick={() => setServicesMenuOpen(false)}
                    className="font-semibold text-slate-900 dark:text-white hover:text-[#00A3E0] dark:hover:text-[#40bee2] flex items-center gap-1.5 transition-colors group/sales text-xs sm:text-[13px]"
                  >
                    <span>Talk to an animation director</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/sales:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* =========================================================================
          MODERN OFF-CANVAS RIGHT-SIDE SLIDE-IN MOBILE NAVIGATION DRAWER
         ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Subtle Dark / Blurred Backdrop Overlay */}
            <motion.div
              key="mobile-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99] pointer-events-auto cursor-pointer"
              aria-hidden="true"
            />

            {/* Right-Side Off-Canvas Drawer */}
            <motion.div
              key="mobile-drawer-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 h-[100dvh] w-[85%] xs:w-[82%] sm:w-[380px] max-w-[420px] bg-[#02050e]/98 border-l border-[#40bee2]/30 rounded-l-[28px] shadow-[-14px_0_50px_rgba(0,0,0,0.9)] z-[100] pointer-events-auto flex flex-col font-sans overflow-hidden text-white"
            >
              {/* Ambient Cyan Glow Line along curved left edge */}
              <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-[#40bee2]/60 to-transparent pointer-events-none" />

              {/* Top Drawer Header: Brand Logo + Close (×) Button */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-white/[0.08] bg-white/[0.02] shrink-0">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 select-none"
                >
                  <div className="relative flex items-center justify-center w-9 h-9">
                    <Image
                      src="/images/logo-emblem.png"
                      alt="Rejubliss 3D Animation Studios Logo"
                      width={36}
                      height={36}
                      priority
                      className="object-contain drop-shadow-[0_0_12px_rgba(64,190,226,0.35)]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-lg font-bold tracking-tight text-white leading-tight">
                      Rejubliss
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-[#40bee2] font-semibold">
                      3D Studios
                    </span>
                  </div>
                </Link>

                {/* Clear Close Button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-[#40bee2]/20 border border-white/10 text-slate-300 flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shadow-sm"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-[#40bee2]" />
                </button>
              </div>

              {/* Navigation Items (Scrollable Body with Staggered Entrance) */}
              <motion.div
                variants={drawerNavContainerVariants}
                initial="hidden"
                animate="show"
                className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-800"
              >
                {/* 1. Home */}
                <motion.div variants={drawerNavItemVariants}>
                  <Link
                    href="/"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveTab("Home");
                    }}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl border transition-colors ${
                      activeTab === "Home"
                        ? "bg-[#40bee2]/15 border-[#40bee2]/40 text-[#40bee2] font-semibold"
                        : "border-white/[0.04] text-slate-200 hover:text-[#40bee2] hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>Home</span>
                    <span className="w-2 h-2 rounded-full bg-[#40bee2] shadow-[0_0_8px_#40bee2]" />
                  </Link>
                </motion.div>

                {/* 2. Services (Accordion with Rejubliss 4 Services) */}
                <motion.div variants={drawerNavItemVariants} className="rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between px-3.5 py-3 text-left text-slate-200 hover:text-[#40bee2] hover:bg-white/[0.04] transition-colors font-medium text-[15px] active:scale-[0.98] cursor-pointer"
                    aria-expanded={mobileServicesOpen}
                  >
                    <span className="flex items-center gap-2">
                      <span>Services</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#40bee2]/15 text-[#40bee2] border border-[#40bee2]/30">
                        4 Studios
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        mobileServicesOpen ? "rotate-180 text-[#40bee2]" : "text-slate-400"
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
                        className="overflow-hidden border-t border-white/[0.06] bg-black/40 px-2.5 py-2 space-y-1.5"
                      >
                        {MEGA_SERVICES.map((srv) => (
                          <Link
                            key={srv.title}
                            href={srv.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setActiveTab("Services");
                            }}
                            className="flex items-center gap-3 p-2 rounded-lg text-slate-300 hover:text-[#40bee2] hover:bg-white/[0.05] transition-colors group"
                          >
                            <div className="relative aspect-[16/10] w-12 h-8 rounded-md overflow-hidden shrink-0 bg-slate-800">
                              <Image
                                src={srv.image}
                                alt={srv.title}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[13px] font-semibold text-white group-hover:text-[#40bee2] truncate">
                                {srv.title}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate">
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
                    className="flex items-center justify-between px-3.5 py-3 rounded-xl border border-white/[0.04] text-slate-200 hover:text-[#40bee2] hover:bg-white/[0.04] transition-colors font-medium text-[15px]"
                  >
                    <span>Portfolio</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
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
                    className="flex items-center justify-between px-3.5 py-3 rounded-xl border border-white/[0.04] text-slate-200 hover:text-[#40bee2] hover:bg-white/[0.04] transition-colors font-medium text-[15px]"
                  >
                    <span>Showcase</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
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
                    className="flex items-center justify-between px-3.5 py-3 rounded-xl border border-white/[0.04] text-slate-200 hover:text-[#40bee2] hover:bg-white/[0.04] transition-colors font-medium text-[15px]"
                  >
                    <span>About</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
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
                    className="flex items-center justify-between px-3.5 py-3 rounded-xl border border-white/[0.04] text-slate-200 hover:text-[#40bee2] hover:bg-white/[0.04] transition-colors font-medium text-[15px]"
                  >
                    <span>Contact</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Bottom Drawer Action Dock */}
              <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#02050e] shrink-0 space-y-2.5">
                <a
                  href="tel:+442081234567"
                  className="w-full py-3 px-4 rounded-xl border-2 border-[#00A3E0] bg-[#00A3E0] hover:bg-transparent text-white hover:text-[#00A3E0] flex items-center justify-center gap-2 font-semibold text-sm shadow-[0_0_20px_rgba(0,163,224,0.35)] transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4 fill-current shrink-0" />
                  <span>Call +44 20 8123 4567</span>
                </a>

                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 px-4 rounded-xl border border-slate-700 hover:border-[#40bee2] bg-white/[0.03] text-white hover:text-[#40bee2] flex items-center justify-center gap-2 font-semibold text-sm transition-all active:scale-95"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 text-[#40bee2]" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
