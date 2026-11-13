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
  CheckCircle2,
  Sun,
  Moon,
  HelpCircle,
  Briefcase,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTheme } from "@/components/common/ThemeProvider";
import { STUDIO_SERVICES } from "@/data/services";
import { ALL_PORTFOLIO_PROJECTS } from "@/data/portfolio";
import { STUDIO_FAQS } from "@/data/homepage";

const drawerNavContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.06,
    },
  },
};

const drawerNavItemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const PRIMARY_NAV_ITEMS = [
  { label: "Work", href: "/#portfolio" },
  { label: "Industries", href: "/#industries" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;

export function Header({
  containerMaxWidth = "w-[97%] max-w-[97%]",
}: { containerMaxWidth?: string } = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("Home");
  const { theme, toggleTheme } = useTheme();

  const featuredServices = STUDIO_SERVICES.slice(0, 4);
  const secondaryServices = STUDIO_SERVICES.slice(4);

  // Live instant search across Services, Portfolio Case Studies, and FAQs
  const searchResults = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;

    const services = STUDIO_SERVICES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.badge.toLowerCase().includes(q)
    ).slice(0, 4);

    const projects = ALL_PORTFOLIO_PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.genre.toLowerCase().includes(q) ||
        p.portfolioCategory.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 4);

    const faqs = STUDIO_FAQS.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    ).slice(0, 2);

    return {
      services,
      projects,
      faqs,
      total: services.length + projects.length + faqs.length,
    };
  }, [searchQuery]);

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
    }, 260);
  };

  // Close menus on outside click and on Escape key
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#desktop-navbar-container")) {
        setServicesMenuOpen(false);
        setSearchOpen(false);
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
      <header className="fixed top-2.5 sm:top-4 left-0 right-0 z-50 pointer-events-none">
        <div
          id="desktop-navbar-container"
          className={`relative ${containerMaxWidth} mx-auto pointer-events-auto overflow-visible`}
        >
          {/* Animated Crystalline Border Shell */}
          <div className="absolute inset-0 rounded-2xl p-[1.5px] overflow-hidden pointer-events-none shadow-[var(--shadow-header)]">
            <div
              className="absolute -inset-[350%] animate-border-beam"
              style={{
                background: "var(--header-beam-gradient)",
              }}
            />
            <div className="w-full h-full bg-[var(--bg-glass-strong)] backdrop-blur-2xl rounded-2xl border border-[var(--border-glass)] transition-colors duration-300" />
          </div>

          <div className="absolute inset-0 rounded-2xl border border-border-accent/60 pointer-events-none" />

          {/* Inner Header Bar */}
          <div className="relative z-20 w-full h-[58px] sm:h-[68px] xl:h-[72px] px-3.5 sm:px-6 xl:px-8 flex items-center justify-between">
            {/* 1. Left: Brand Logo */}
            <div className="flex items-center gap-2 sm:gap-3 xl:gap-5 shrink-0">
              <Link
                href="/"
                onClick={() => setActiveTab("Home")}
                className="flex items-center gap-2.5 select-none group"
              >
                <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 transition-transform group-hover:scale-105 duration-300 shrink-0">
                  <Image
                    src="/images/logo-emblem.png"
                    alt=""
                    width={40}
                    height={40}
                    className="object-contain drop-shadow-[0_2px_8px_rgba(8,127,140,0.22)]"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-text-heading leading-none transition-colors">
                      Rejubliss
                    </span>
                    <span className="inline-block w-2 h-2 rounded-full bg-accent-interactive animate-pulse-subtle" />
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-widest font-bold text-text-muted group-hover:text-accent-primary transition-colors mt-0.5">
                    3D Animation Studios
                  </span>
                </div>
              </Link>

              <div className="h-7 w-[1px] bg-border-subtle mx-1 hidden lg:block" />
            </div>

            {/* 2. Middle: Navigation Links */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center justify-center flex-1 mx-2 xl:mx-4 2xl:gap-x-6 xl:gap-x-4.5 lg:gap-x-3.5 text-[13px] xl:text-[13.5px] font-medium tracking-normal"
            >
              {/* Home */}
              <Link
                href="/"
                onClick={() => setActiveTab("Home")}
                className={`relative py-1.5 font-semibold transition-colors group ${
                  activeTab === "Home"
                    ? "text-accent-highlight"
                    : "text-text-secondary hover:text-accent-primary"
                }`}
              >
                <span>Home</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent-interactive rounded-full transition-transform duration-300 ${
                    activeTab === "Home"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>

              {/* Services Mega Menu */}
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
                      ? "text-accent-highlight font-semibold"
                      : "text-text-secondary hover:text-accent-primary"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={servicesMenuOpen}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesMenuOpen
                        ? "rotate-180 text-accent-interactive"
                        : "text-text-muted group-hover:text-accent-primary"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent-interactive origin-left transition-transform duration-300 rounded-full ${
                      servicesMenuOpen || activeTab === "Services"
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {servicesMenuOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      onMouseEnter={handleServicesEnter}
                      onMouseLeave={handleServicesLeave}
                      className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[780px] xl:w-[880px] max-w-[92vw] rounded-2xl bg-[var(--bg-glass-strong)] border border-border-subtle backdrop-blur-3xl p-5 shadow-[var(--shadow-card-hover)] z-50 text-left pointer-events-auto before:absolute before:-top-4 before:left-0 before:right-0 before:h-6 before:content-['']"
                    >
                      <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-border-subtle">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-accent-interactive animate-pulse-subtle" />
                          <span className="text-[11px] font-bold uppercase tracking-widest text-accent-primary">
                            All 9 Creative Capabilities &amp; Specialist Studios
                          </span>
                        </div>
                        <Link
                          href="/services"
                          onClick={() => {
                            setServicesMenuOpen(false);
                            setActiveTab("Services");
                          }}
                          className="text-xs font-semibold text-accent-primary hover:text-accent-interactive transition-colors flex items-center gap-1 group"
                        >
                          <span>View Services Index</span>
                          <ArrowRight
                            size={12}
                            className="group-hover:translate-x-0.5 transition-transform"
                          />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                        {/* Left: 4 Featured Service Visual Cards (8 cols) */}
                        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {featuredServices.map((srv) => (
                            <Link
                              key={srv.slug}
                              href={`/services/${srv.slug}`}
                              onClick={() => {
                                setServicesMenuOpen(false);
                                setActiveTab("Services");
                              }}
                              className="group flex flex-col p-2.5 rounded-xl border border-border-subtle bg-bg-subtle/55 hover:bg-bg-accent-hover hover:border-border-accent transition-all duration-200"
                            >
                              <div className="relative aspect-[16/9] w-full h-[86px] rounded-lg overflow-hidden mb-2 bg-bg-secondary">
                                <Image
                                  src={srv.heroImage}
                                  alt={srv.title}
                                  fill
                                  sizes="240px"
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-bg-card/95 backdrop-blur-sm border border-border-accent text-[9.5px] font-bold text-accent-primary tracking-wide uppercase">
                                  {srv.badge}
                                </div>
                              </div>
                              <h4 className="text-[13px] font-bold text-text-heading group-hover:text-accent-primary transition-colors flex items-center gap-1 mb-0.5">
                                <span>{srv.title}</span>
                                <ArrowRight
                                  size={11}
                                  className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent-interactive"
                                />
                              </h4>
                              <p className="text-[11px] text-text-muted line-clamp-1 leading-normal">
                                {srv.whatWeCreate}
                              </p>
                            </Link>
                          ))}
                        </div>

                        {/* Right: Remaining 4 Specialist Services + Quote CTA (4 cols) */}
                        <div className="lg:col-span-4 rounded-xl bg-[image:var(--bg-spotlight)] border border-border-accent p-3.5 text-text-primary flex flex-col justify-between relative overflow-hidden shadow-[var(--shadow-card)]">
                          <div className="relative z-10">
                            <div className="flex items-center gap-1.5 mb-2.5">
                              <Sparkles
                                size={13}
                                className="text-accent-interactive"
                              />
                              <span className="text-[10px] font-bold uppercase tracking-wider text-accent-primary">
                                Specialist Disciplines
                              </span>
                            </div>

                            <div className="space-y-1.5 mb-3">
                              {secondaryServices.map((srv) => (
                                <Link
                                  key={srv.slug}
                                  href={`/services/${srv.slug}`}
                                  onClick={() => {
                                    setServicesMenuOpen(false);
                                    setActiveTab("Services");
                                  }}
                                  className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-bg-card/85 border border-border-subtle hover:border-border-accent text-xs font-bold text-text-heading hover:text-accent-primary transition-colors group"
                                >
                                  <span className="truncate">{srv.title}</span>
                                  <ArrowRight
                                    size={12}
                                    className="text-accent-interactive shrink-0 group-hover:translate-x-0.5 transition-transform"
                                  />
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div className="relative z-10 pt-2.5 border-t border-border-subtle flex items-center justify-between gap-2">
                            <Link
                              href="/services"
                              onClick={() => setServicesMenuOpen(false)}
                              className="text-[11px] font-bold text-text-secondary hover:text-accent-primary transition-colors"
                            >
                              Deliverables Guide
                            </Link>
                            <Link
                              href="/#contact"
                              onClick={() => setServicesMenuOpen(false)}
                              className="btn-primary-cta inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold"
                            >
                              <span>Start Your Project</span>
                              <ArrowRight size={11} />
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-border-subtle mt-3.5 pt-2.5 px-1 flex flex-wrap items-center justify-between text-xs text-text-muted">
                        <div className="flex items-center gap-4 text-[11.5px]">
                          <span className="flex items-center gap-1 text-text-secondary">
                            <CheckCircle2
                              size={12}
                              className="text-accent-interactive"
                            />
                            London &amp; Worldwide Production
                          </span>
                          <span className="flex items-center gap-1 text-text-secondary">
                            <CheckCircle2
                              size={12}
                              className="text-accent-interactive"
                            />
                            NDA Protected
                          </span>
                        </div>

                        <Link
                          href="/#contact"
                          onClick={() => setServicesMenuOpen(false)}
                          className="font-semibold text-accent-primary hover:text-accent-interactive flex items-center gap-1 transition-colors text-[11.5px]"
                        >
                          <span>Request a custom scope</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Remaining Primary Nav Links */}
              {PRIMARY_NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveTab(item.label)}
                  className={`relative py-1.5 transition-colors group ${
                    activeTab === item.label
                      ? "text-accent-highlight font-semibold"
                      : "text-text-secondary hover:text-accent-primary"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent-interactive origin-left transition-transform duration-300 rounded-full ${
                      activeTab === item.label
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* 3. Right: Call Button, Search, Theme Switcher, CTA & Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <a
                href="tel:+442081234567"
                aria-label="Call +44 20 8123 4567"
                className="btn-primary-solid h-[36px] sm:h-[40px] px-2.5 sm:px-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-[12px] sm:text-[13px] shrink-0 active:scale-95 group"
              >
                <Phone className="w-3.5 h-3.5 fill-current shrink-0 transition-colors" />
                <span className="hidden 2xl:inline whitespace-nowrap font-semibold tracking-tight">
                  +44 20 8123 4567
                </span>
              </a>

              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                aria-label="Search site"
                aria-expanded={searchOpen}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 active:scale-95 cursor-pointer ${
                  searchOpen
                    ? "btn-primary-solid"
                    : "bg-bg-subtle hover:bg-bg-subtle-hover border border-border-subtle text-text-secondary hover:text-accent-primary"
                }`}
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={
                  theme === "dark"
                    ? "Switch to light theme"
                    : "Switch to dark theme"
                }
                title={
                  theme === "dark"
                    ? "Switch to light theme"
                    : "Switch to dark theme"
                }
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-bg-subtle hover:bg-bg-subtle-hover border border-border-subtle text-text-secondary hover:text-accent-primary flex items-center justify-center transition-colors shrink-0 active:scale-95 cursor-pointer"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-accent-ice" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <Link
                href="/#contact"
                className="btn-primary-cta hidden xl:inline-flex items-center gap-2 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold text-[13px] active:scale-95"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-bg-subtle hover:bg-bg-subtle-hover border border-border-subtle text-text-secondary hover:text-accent-primary flex items-center justify-center transition-colors shrink-0 active:scale-95 cursor-pointer"
                aria-label={
                  mobileMenuOpen
                    ? "Close Navigation Menu"
                    : "Open Navigation Menu"
                }
              >
                <motion.div
                  key={mobileMenuOpen ? "open" : "closed"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 text-accent-primary" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>

          {/* Live Site Search Drawer */}
          <AnimatePresence>
            {searchOpen ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="px-4 sm:px-8 pb-4 pt-1.5 overflow-hidden relative z-20"
              >
                <div className="relative max-w-2xl mx-auto">
                  <div className="relative flex items-center p-1 rounded-xl bg-bg-card/95 backdrop-blur-xl border border-border-subtle shadow-[var(--shadow-card)] focus-within:border-accent-interactive transition-all">
                    <Search
                      size={15}
                      className="absolute left-3.5 text-accent-primary"
                    />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search services, client case studies (e.g. Scoopy, Desi Chai, WebGL) or FAQs..."
                      autoFocus
                      aria-label="Search Rejubliss services, portfolio, and FAQs"
                      className="w-full bg-transparent px-3 py-1.5 pl-9 pr-20 text-xs sm:text-sm text-text-primary outline-none placeholder:text-text-muted font-medium"
                    />
                    {searchQuery ? (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="text-[11px] font-semibold text-text-muted hover:text-text-heading px-2 py-1 cursor-pointer"
                      >
                        Clear
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="text-[11px] font-bold text-text-muted hover:text-text-heading px-2.5 py-1 rounded-lg hover:bg-bg-subtle transition-colors cursor-pointer"
                    >
                      ESC
                    </button>
                  </div>

                  {/* Instant Results Panel */}
                  <div className="mt-2 rounded-2xl bg-bg-card/98 border border-border-subtle shadow-[var(--shadow-card-hover)] p-3 max-h-[60dvh] overflow-y-auto">
                    {!searchResults ? (
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted mr-1">
                          Quick Jump:
                        </span>
                        {[
                          { label: "3D Animation", href: "/services/3d-animation" },
                          {
                            label: "CGI & Packaging",
                            href: "/services/cgi-rendering",
                          },
                          {
                            label: "Explainer Videos",
                            href: "/services/explainer-videos",
                          },
                          {
                            label: "Interactive WebGL",
                            href: "/services/interactive-webgl",
                          },
                          { label: "Desi Chai London", href: "/work/desi-chai-london" },
                          { label: "Scoopy Ice Cream", href: "/work/scoopy-ice-cream" },
                          { label: "Request a Quote", href: "/#contact" },
                        ].map((chip) => (
                          <Link
                            key={chip.label}
                            href={chip.href}
                            onClick={() => setSearchOpen(false)}
                            className="px-2.5 py-1 rounded-full bg-bg-subtle hover:bg-bg-accent-soft border border-border-subtle hover:border-border-accent text-text-secondary hover:text-accent-primary font-semibold transition-colors"
                          >
                            {chip.label}
                          </Link>
                        ))}
                      </div>
                    ) : searchResults.total === 0 ? (
                      <p className="text-xs text-text-muted py-2 px-1">
                        No matches found for &ldquo;{searchQuery}&rdquo;. Try{" "}
                        <Link
                          href="/services"
                          onClick={() => setSearchOpen(false)}
                          className="text-accent-primary font-semibold underline"
                        >
                          browsing all services
                        </Link>{" "}
                        or{" "}
                        <Link
                          href="/work"
                          onClick={() => setSearchOpen(false)}
                          className="text-accent-primary font-semibold underline"
                        >
                          exploring the portfolio
                        </Link>
                        .
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {searchResults.services.length > 0 ? (
                          <div>
                            <div className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-accent-primary px-1 mb-1.5">
                              <Layers size={12} />
                              <span>Services</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {searchResults.services.map((srv) => (
                                <Link
                                  key={srv.slug}
                                  href={`/services/${srv.slug}`}
                                  onClick={() => {
                                    setSearchOpen(false);
                                    setSearchQuery("");
                                  }}
                                  className="flex items-center justify-between p-2 rounded-xl bg-bg-subtle/60 hover:bg-bg-accent-soft border border-border-subtle hover:border-border-accent transition-colors"
                                >
                                  <div className="min-w-0 pr-2">
                                    <div className="text-xs font-bold text-text-heading truncate">
                                      {srv.title}
                                    </div>
                                    <div className="text-[11px] text-text-muted truncate">
                                      {srv.badge}
                                    </div>
                                  </div>
                                  <ArrowRight
                                    size={13}
                                    className="text-accent-interactive shrink-0"
                                  />
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {searchResults.projects.length > 0 ? (
                          <div>
                            <div className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-accent-primary px-1 mb-1.5">
                              <Briefcase size={12} />
                              <span>Portfolio &amp; Case Studies</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {searchResults.projects.map((proj) => (
                                <Link
                                  key={proj.slug}
                                  href={`/work/${proj.slug}`}
                                  onClick={() => {
                                    setSearchOpen(false);
                                    setSearchQuery("");
                                  }}
                                  className="flex items-center gap-2.5 p-2 rounded-xl bg-bg-subtle/60 hover:bg-bg-accent-soft border border-border-subtle hover:border-border-accent transition-colors"
                                >
                                  <div className="relative w-10 h-8 rounded-md overflow-hidden shrink-0 bg-bg-secondary">
                                    <Image
                                      src={proj.image}
                                      alt={proj.title}
                                      fill
                                      sizes="40px"
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-xs font-bold text-text-heading truncate">
                                      {proj.title}
                                    </div>
                                    <div className="text-[10.5px] text-text-muted truncate">
                                      {proj.client} • {proj.portfolioCategory}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {searchResults.faqs.length > 0 ? (
                          <div>
                            <div className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-accent-primary px-1 mb-1.5">
                              <HelpCircle size={12} />
                              <span>FAQs</span>
                            </div>
                            <div className="space-y-1">
                              {searchResults.faqs.map((faq) => (
                                <Link
                                  key={faq.id}
                                  href="/#faq"
                                  onClick={() => {
                                    setSearchOpen(false);
                                    setSearchQuery("");
                                  }}
                                  className="flex items-center justify-between p-2 rounded-xl bg-bg-subtle/60 hover:bg-bg-accent-soft border border-border-subtle text-xs font-semibold text-text-heading"
                                >
                                  <span className="truncate pr-2">
                                    {faq.question}
                                  </span>
                                  <ArrowRight
                                    size={12}
                                    className="text-accent-interactive shrink-0"
                                  />
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </header>

      {/* Off-Canvas Right-Side Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen ? (
          <>
            <motion.div
              key="mobile-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[var(--bg-backdrop)] backdrop-blur-xs z-[99] pointer-events-auto cursor-pointer"
              aria-hidden="true"
            />

            <motion.div
              key="mobile-drawer-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 h-[100dvh] w-[86%] sm:w-[390px] max-w-[420px] bg-bg-card border-l border-border-subtle rounded-l-[28px] shadow-[var(--shadow-card-hover)] z-[100] pointer-events-auto flex flex-col font-sans overflow-hidden text-text-primary"
            >
              <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-accent-interactive/70 to-transparent pointer-events-none" />

              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border-subtle bg-bg-secondary/75 shrink-0">
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
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-lg font-bold tracking-tight text-text-heading leading-tight">
                      Rejubliss
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-accent-primary font-bold">
                      3D Studios
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-bg-card hover:bg-bg-subtle border border-border-subtle text-text-secondary hover:text-accent-primary flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-4.5 h-4.5 text-accent-primary" />
                </button>
              </div>

              <motion.div
                variants={drawerNavContainerVariants}
                initial="hidden"
                animate="show"
                className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-1.5"
              >
                <motion.div variants={drawerNavItemVariants}>
                  <Link
                    href="/"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveTab("Home");
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-colors ${
                      activeTab === "Home"
                        ? "bg-bg-accent-soft border-border-accent text-accent-highlight font-semibold"
                        : "border-border-subtle text-text-primary hover:text-accent-primary hover:bg-bg-subtle/60"
                    }`}
                  >
                    <span>Home</span>
                    <span className="w-2 h-2 rounded-full bg-accent-interactive" />
                  </Link>
                </motion.div>

                {/* Mobile Services Accordion (All 8 Services) */}
                <motion.div
                  variants={drawerNavItemVariants}
                  className="rounded-xl overflow-hidden bg-bg-subtle/50 border border-border-subtle"
                >
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 text-left text-text-primary hover:text-accent-primary transition-colors font-medium text-[14.5px] cursor-pointer"
                    aria-expanded={mobileServicesOpen}
                  >
                    <span className="flex items-center gap-2">
                      <span>Services</span>
                      <span className="text-[9.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-bg-accent-soft text-accent-primary border border-border-accent">
                        9 Capabilities
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        mobileServicesOpen
                          ? "rotate-180 text-accent-interactive"
                          : "text-text-muted"
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileServicesOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-border-subtle bg-bg-card/90 px-2 py-1.5 space-y-1"
                      >
                        {STUDIO_SERVICES.map((srv) => (
                          <Link
                            key={srv.slug}
                            href={`/services/${srv.slug}`}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setActiveTab("Services");
                            }}
                            className="flex items-center gap-2.5 p-2 rounded-lg text-text-secondary hover:text-accent-primary hover:bg-bg-accent-hover transition-colors group"
                          >
                            <div className="relative aspect-[16/10] w-11 h-7 rounded-md overflow-hidden shrink-0 bg-bg-secondary">
                              <Image
                                src={srv.heroImage}
                                alt={srv.title}
                                fill
                                sizes="44px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[12.5px] font-semibold text-text-heading group-hover:text-accent-primary truncate">
                                {srv.title}
                              </div>
                              <div className="text-[10px] text-text-muted truncate">
                                {srv.badge}
                              </div>
                            </div>
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-bold text-accent-primary hover:bg-bg-accent-soft"
                        >
                          <span>View All Services Overview</span>
                          <ArrowRight size={12} />
                        </Link>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>

                {PRIMARY_NAV_ITEMS.map((item) => (
                  <motion.div key={item.label} variants={drawerNavItemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setActiveTab(item.label);
                      }}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-border-subtle text-text-primary hover:text-accent-primary hover:bg-bg-subtle/60 transition-colors font-medium text-[14.5px]"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-text-muted" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <div className="p-4 sm:p-5 border-t border-border-subtle bg-bg-secondary/75 shrink-0 space-y-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full py-2 px-3.5 rounded-xl border border-border-subtle bg-bg-card text-text-secondary hover:text-accent-primary hover:border-border-accent flex items-center justify-between text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>Appearance</span>
                  <span className="inline-flex items-center gap-1.5 text-accent-primary font-bold">
                    {theme === "dark" ? (
                      <>
                        <Sun className="w-3.5 h-3.5" />
                        <span>Dark Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5" />
                        <span>Light Mode</span>
                      </>
                    )}
                  </span>
                </button>

                <a
                  href="tel:+442081234567"
                  className="btn-primary-solid w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 fill-current shrink-0" />
                  <span>Call +44 20 8123 4567</span>
                </a>

                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary-cta w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm active:scale-95"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
