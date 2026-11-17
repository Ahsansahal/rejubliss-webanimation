"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ChevronDown,
  Menu,
  X,
  Search,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Briefcase,
  Layers,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { STUDIO_SERVICES } from "@/data/services";
import { ALL_PORTFOLIO_PROJECTS } from "@/data/portfolio";
import { STUDIO_FAQS } from "@/data/homepage";
import { useTheme } from "@/components/common/ThemeProvider";
import { triggerProjectInquiry } from "@/lib/inquiry-events";

const drawerNavContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.04,
    },
  },
};

const drawerNavItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  },
};

const PRIMARY_NAV_ITEMS = [
  { label: "Flagship", href: "/#portfolio-spotlight" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;

export function Header({
  containerMaxWidth = "w-[97%] max-w-[97%] px-2 sm:px-4 lg:px-6",
}: { containerMaxWidth?: string } = {}) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(true);
  const [servicesMenuOpen, setServicesMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [clickedNav, setClickedNav] = React.useState<{
    path: string | null;
    tab: string;
  } | null>(null);

  const routeTab = pathname?.startsWith("/services")
    ? "Services"
    : pathname?.startsWith("/work")
      ? "Work"
      : "Home";

  const activeTab =
    clickedNav && clickedNav.path === pathname ? clickedNav.tab : routeTab;

  const setActiveTab = (tab: string) => {
    setClickedNav({ path: pathname, tab });
  };

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

  // Prevent background page from scrolling while mobile fullscreen overlay is open
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
    }, 240);
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

  const normalizedContainer =
    containerMaxWidth || "w-[97%] max-w-[97%] px-2 sm:px-4 lg:px-6";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-border-subtle transition-colors duration-300">
        <div
          id="desktop-navbar-container"
          className={`relative ${normalizedContainer} mx-auto overflow-visible`}
        >
          {/* Main Full-Width Header Bar */}
          <div className="relative z-20 w-full h-[72px] sm:h-[82px] flex items-center justify-between gap-3 sm:gap-4">
            {/* 1. Left: Rejubliss Studio Brand Identity */}
            <Link
              href="/"
              onClick={() => setActiveTab("Home")}
              aria-label="Rejubliss 3D Animation Studios — Home"
              className="flex items-center select-none group shrink-0 py-1"
            >
              <Image
                src={
                  theme === "light"
                    ? "/images/logo-light.png"
                    : "/images/logo.png"
                }
                alt="Rejubliss 3D Animation Studios"
                width={933}
                height={247}
                preload
                quality={82}
                sizes="(max-width: 640px) 156px, 190px"
                className="h-10 sm:h-11 xl:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            {/* 2. Center: Minimal Display Navigation Links */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center justify-center gap-x-4 xl:gap-x-6.5 font-display text-[10.5px] xl:text-[11px] font-semibold uppercase tracking-[0.09em]"
            >
              <Link
                href="/"
                onClick={() => setActiveTab("Home")}
                className={`relative py-2 transition-colors ${
                  activeTab === "Home"
                    ? "text-text-heading"
                    : "text-text-muted hover:text-text-heading"
                }`}
              >
                <span>Home</span>
                {activeTab === "Home" ? (
                  <span className="absolute bottom-0.5 left-0 right-0 h-[1.5px] bg-accent-primary" />
                ) : null}
              </Link>

              {/* Services Mega Menu */}
              <div
                className="relative py-2 flex items-center gap-1"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <Link
                  href="/services"
                  onClick={() => {
                    setServicesMenuOpen(false);
                    setActiveTab("Services");
                  }}
                  className={`transition-colors uppercase tracking-[0.09em] ${
                    servicesMenuOpen || activeTab === "Services"
                      ? "text-text-heading"
                      : "text-text-muted hover:text-text-heading"
                  }`}
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={toggleServices}
                  aria-label="Toggle Services menu"
                  aria-haspopup="true"
                  aria-expanded={servicesMenuOpen}
                  className="p-0.5 flex items-center justify-center cursor-pointer text-text-muted hover:text-text-heading transition-colors"
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesMenuOpen
                        ? "rotate-180 text-accent-primary"
                        : "text-text-muted"
                    }`}
                  />
                </button>
                {servicesMenuOpen || activeTab === "Services" ? (
                  <span className="absolute bottom-0.5 left-0 right-0 h-[1.5px] bg-accent-primary pointer-events-none" />
                ) : null}

                <AnimatePresence>
                  {servicesMenuOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={handleServicesEnter}
                      onMouseLeave={handleServicesLeave}
                      className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-[840px] xl:w-[1040px] 2xl:w-[1160px] max-w-[95vw] rounded-[24px] bg-bg-elevated border border-border-strong backdrop-blur-2xl p-6 shadow-[var(--shadow-card-hover)] z-50 text-left font-sans normal-case tracking-normal before:absolute before:-top-5 before:left-0 before:right-0 before:h-6 before:content-['']"
                    >
                      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-border-subtle">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse-subtle" />
                          <span className="editorial-eyebrow">
                            01 · All 9 Creative Capabilities &amp; Specialist Studios
                          </span>
                        </div>
                        <Link
                          href="/services"
                          onClick={() => {
                            setServicesMenuOpen(false);
                            setActiveTab("Services");
                          }}
                          className="font-display text-[11px] font-bold uppercase tracking-[0.08em] text-text-heading hover:text-accent-primary transition-colors flex items-center gap-1.5 group"
                        >
                          <span>Services Index</span>
                          <ArrowUpRight
                            size={13}
                            className="text-accent-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
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
                              className="group flex flex-col p-3 rounded-[18px] border border-border-subtle bg-bg-subtle hover:bg-bg-subtle-hover hover:border-accent-primary/50 transition-all duration-200"
                            >
                              <div className="relative aspect-[16/9] w-full h-[90px] rounded-xl overflow-hidden mb-2.5 bg-[#050507] border border-white/10">
                                <Image
                                  src={srv.heroImage}
                                  alt={srv.title}
                                  fill
                                  sizes="240px"
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[9.5px] font-semibold text-[#f5f4ef] tracking-[0.14em] uppercase">
                                  {srv.badge}
                                </div>
                              </div>
                              <h4 className="font-display text-xs font-bold tracking-[-0.02em] text-text-heading group-hover:text-accent-primary transition-colors flex items-center justify-between gap-1 mb-1">
                                <span>{srv.title}</span>
                                <ArrowUpRight
                                  size={13}
                                  className="opacity-50 group-hover:opacity-100 text-accent-primary transition-opacity shrink-0"
                                />
                              </h4>
                              <p className="text-xs text-text-muted line-clamp-1 leading-normal">
                                {srv.whatWeCreate}
                              </p>
                            </Link>
                          ))}
                        </div>

                        {/* Right: Remaining 5 Specialist Services + Quote CTA (4 cols) */}
                        <div className="lg:col-span-4 rounded-[18px] bg-bg-secondary border border-border-subtle p-4 text-text-primary flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1.5 mb-3">
                              <Sparkles
                                size={12}
                                className="text-accent-primary"
                              />
                              <span className="editorial-eyebrow text-[10px]">
                                Specialist Disciplines
                              </span>
                            </div>

                            <div className="space-y-1.5 mb-4">
                              {secondaryServices.map((srv) => (
                                <Link
                                  key={srv.slug}
                                  href={`/services/${srv.slug}`}
                                  onClick={() => {
                                    setServicesMenuOpen(false);
                                    setActiveTab("Services");
                                  }}
                                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-bg-card border border-border-subtle hover:border-accent-primary/50 text-xs font-semibold text-text-heading hover:text-accent-primary transition-colors group"
                                >
                                  <span className="truncate">{srv.title}</span>
                                  <ArrowRight
                                    size={12}
                                    className="text-accent-primary shrink-0 group-hover:translate-x-0.5 transition-transform"
                                  />
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div className="pt-3 border-t border-border-subtle flex items-center justify-between gap-2">
                            <Link
                              href="/#industries"
                              onClick={() => setServicesMenuOpen(false)}
                              className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted hover:text-text-heading transition-colors"
                            >
                              Industries
                            </Link>
                            <Link
                              href="/#contact"
                              onClick={(e) => {
                                e.preventDefault();
                                setServicesMenuOpen(false);
                                triggerProjectInquiry();
                              }}
                              className="btn-primary-cta inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[10.5px]"
                            >
                              <span>Start Project</span>
                              <ArrowUpRight size={12} />
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-border-subtle mt-4 pt-3 px-1 flex flex-wrap items-center justify-between text-xs text-text-muted">
                        <div className="flex items-center gap-5 text-[11.5px]">
                          <span className="flex items-center gap-1.5 text-text-secondary">
                            <CheckCircle2
                              size={12}
                              className="text-accent-primary"
                            />
                            London &amp; Worldwide Production
                          </span>
                          <span className="flex items-center gap-1.5 text-text-secondary">
                            <CheckCircle2
                              size={12}
                              className="text-accent-primary"
                            />
                            NDA Protected
                          </span>
                        </div>

                        <Link
                          href="/#contact"
                          onClick={(e) => {
                            e.preventDefault();
                            setServicesMenuOpen(false);
                            triggerProjectInquiry();
                          }}
                          className="font-display text-[10.5px] uppercase tracking-[0.08em] font-bold text-accent-primary hover:text-accent-highlight flex items-center gap-1 transition-colors"
                        >
                          <span>Request Custom Scope</span>
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
                  className={`relative py-2 transition-colors ${
                    activeTab === item.label
                      ? "text-text-heading"
                      : "text-text-muted hover:text-text-heading"
                  }`}
                >
                  <span>{item.label}</span>
                  {activeTab === item.label ? (
                    <span className="absolute bottom-0.5 left-0 right-0 h-[1.5px] bg-accent-primary" />
                  ) : null}
                </Link>
              ))}
            </nav>

            {/* 3. Right: Search, Theme Switcher, Phone, Primary Pill CTA & Mobile Trigger */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                aria-label="Search site"
                aria-expanded={searchOpen}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                  searchOpen
                    ? "btn-primary-solid"
                    : "bg-bg-subtle hover:bg-bg-subtle-hover border border-border-subtle text-text-secondary hover:text-text-heading hover:border-accent-primary/60"
                }`}
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={
                  theme === "dark"
                    ? "Switch to editorial light theme"
                    : "Switch to cinema dark theme"
                }
                title={
                  theme === "dark"
                    ? "Switch to Warm Paper mode"
                    : "Switch to Cinema Ink mode"
                }
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-bg-subtle hover:bg-bg-subtle-hover border border-border-subtle text-text-secondary hover:text-text-heading hover:border-accent-primary/60 flex items-center justify-center transition-all shrink-0 cursor-pointer"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <a
                href="tel:+442081234567"
                aria-label="Call +44 20 8123 4567"
                className="hidden sm:inline-flex lg:hidden xl:inline-flex h-10 px-3.5 rounded-full border border-border-strong bg-bg-subtle hover:border-accent-primary hover:text-accent-primary items-center justify-center gap-2 text-xs font-semibold text-text-heading transition-all shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-accent-primary shrink-0" />
                <span className="hidden 2xl:inline whitespace-nowrap tracking-wide">
                  +44 20 8123 4567
                </span>
              </a>

              <button
                type="button"
                onClick={() => triggerProjectInquiry()}
                className="btn-primary-cta hidden lg:inline-flex items-center gap-1.5 px-4 xl:px-5 py-2.5 rounded-full text-[10.5px] xl:text-[11px] shrink-0 cursor-pointer"
              >
                <span>Start Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden relative w-10 h-10 rounded-full bg-bg-subtle hover:bg-bg-subtle-hover border border-border-strong text-text-heading flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label={
                  mobileMenuOpen
                    ? "Close Navigation Menu"
                    : "Open Navigation Menu"
                }
              >
                {mobileMenuOpen ? (
                  <X className="w-4.5 h-4.5 text-accent-primary" />
                ) : (
                  <Menu className="w-4.5 h-4.5" />
                )}
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
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="pb-5 pt-1 overflow-hidden relative z-20"
              >
                <div className="relative max-w-2xl mx-auto">
                  <div className="relative flex items-center p-1.5 rounded-full bg-bg-card border border-border-strong shadow-[var(--shadow-card)] focus-within:border-accent-primary transition-all">
                    <Search
                      size={15}
                      className="absolute left-4 text-accent-primary"
                    />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search services, client case studies (e.g. Scoopy, Desi Chai, WebGL) or FAQs..."
                      autoFocus
                      aria-label="Search Rejubliss services, portfolio, and FAQs"
                      className="w-full bg-transparent px-3 py-1.5 pl-10 pr-20 text-xs sm:text-sm text-text-primary outline-none placeholder:text-text-muted font-medium"
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
                      className="text-[10.5px] font-display font-bold uppercase tracking-[0.08em] text-text-muted hover:text-text-heading px-3 py-1 rounded-full hover:bg-bg-subtle-hover transition-colors cursor-pointer"
                    >
                      ESC
                    </button>
                  </div>

                  {/* Instant Results Panel */}
                  <div className="mt-2.5 rounded-[20px] bg-bg-card border border-border-subtle shadow-[var(--shadow-card-hover)] p-4 max-h-[60dvh] overflow-y-auto">
                    {!searchResults ? (
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="editorial-eyebrow text-[10.5px] mr-1">
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
                            onClick={(e) => {
                              setSearchOpen(false);
                              if (chip.href === "/#contact") {
                                e.preventDefault();
                                triggerProjectInquiry();
                              }
                            }}
                            className="px-3 py-1 rounded-full bg-bg-subtle hover:bg-accent-primary/15 border border-border-subtle hover:border-accent-primary/50 text-text-secondary hover:text-text-heading font-medium transition-colors"
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
                      <div className="space-y-3.5">
                        {searchResults.services.length > 0 ? (
                          <div>
                            <div className="flex items-center gap-1.5 editorial-eyebrow text-[10.5px] px-1 mb-2">
                              <Layers size={12} />
                              <span>Services</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {searchResults.services.map((srv) => (
                                <Link
                                  key={srv.slug}
                                  href={`/services/${srv.slug}`}
                                  onClick={() => {
                                    setSearchOpen(false);
                                    setSearchQuery("");
                                  }}
                                  className="flex items-center justify-between p-2.5 rounded-xl bg-bg-subtle hover:bg-accent-primary/12 border border-border-subtle hover:border-accent-primary/50 transition-colors"
                                >
                                  <div className="min-w-0 pr-2">
                                    <div className="font-display text-xs font-bold text-text-heading truncate">
                                      {srv.title}
                                    </div>
                                    <div className="text-[11px] text-text-muted truncate mt-0.5">
                                      {srv.badge}
                                    </div>
                                  </div>
                                  <ArrowRight
                                    size={13}
                                    className="text-accent-primary shrink-0"
                                  />
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {searchResults.projects.length > 0 ? (
                          <div>
                            <div className="flex items-center gap-1.5 editorial-eyebrow text-[10.5px] px-1 mb-2">
                              <Briefcase size={12} />
                              <span>Portfolio &amp; Case Studies</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {searchResults.projects.map((proj) => (
                                <Link
                                  key={proj.slug}
                                  href={`/work/${proj.slug}`}
                                  onClick={() => {
                                    setSearchOpen(false);
                                    setSearchQuery("");
                                  }}
                                  className="flex items-center gap-2.5 p-2 rounded-xl bg-bg-subtle hover:bg-accent-primary/12 border border-border-subtle hover:border-accent-primary/50 transition-colors"
                                >
                                  <div className="relative w-11 h-8 rounded-lg overflow-hidden shrink-0 bg-[#050507] border border-white/10">
                                    <Image
                                      src={proj.image}
                                      alt={proj.title}
                                      fill
                                      sizes="44px"
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="font-display text-xs font-bold text-text-heading truncate">
                                      {proj.title}
                                    </div>
                                    <div className="text-[11px] text-text-muted truncate">
                                      {proj.client} · {proj.portfolioCategory}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {searchResults.faqs.length > 0 ? (
                          <div>
                            <div className="flex items-center gap-1.5 editorial-eyebrow text-[10.5px] px-1 mb-2">
                              <HelpCircle size={12} />
                              <span>FAQs</span>
                            </div>
                            <div className="space-y-1.5">
                              {searchResults.faqs.map((faq) => (
                                <Link
                                  key={faq.id}
                                  href="/#faq"
                                  onClick={() => {
                                    setSearchOpen(false);
                                    setSearchQuery("");
                                  }}
                                  className="flex items-center justify-between p-2.5 rounded-xl bg-bg-subtle hover:bg-accent-primary/12 border border-border-subtle text-xs font-semibold text-text-heading"
                                >
                                  <span className="truncate pr-2">
                                    {faq.question}
                                  </span>
                                  <ArrowRight
                                    size={12}
                                    className="text-accent-primary shrink-0"
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

      {/* Fullscreen Editorial Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            key="mobile-fullscreen-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-bg-primary/98 backdrop-blur-2xl flex flex-col justify-between text-text-primary overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 h-[72px] sm:h-[82px] border-b border-border-subtle shrink-0">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Rejubliss 3D Animation Studios — Home"
                className="flex items-center select-none shrink-0"
              >
                <Image
                  src={
                    theme === "light"
                      ? "/images/logo-light.png"
                      : "/images/logo.png"
                  }
                  alt="Rejubliss 3D Animation Studios"
                  width={933}
                  height={247}
                  quality={82}
                  sizes="160px"
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={
                    theme === "dark"
                      ? "Switch to editorial light theme"
                      : "Switch to cinema dark theme"
                  }
                  className="w-10 h-10 rounded-full bg-bg-subtle hover:bg-bg-subtle-hover border border-border-subtle text-text-heading flex items-center justify-center transition-colors cursor-pointer"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-bg-subtle hover:bg-bg-subtle-hover border border-border-strong text-text-heading flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Center Editorial Hairline Rows + Sub-Capability Pills */}
            <motion.div
              variants={drawerNavContainerVariants}
              initial="hidden"
              animate="show"
              className="flex-1 overflow-y-auto px-4 sm:px-6 py-4"
            >
              <motion.div variants={drawerNavItemVariants}>
                <Link
                  href="/"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveTab("Home");
                  }}
                  className="flex items-center justify-between py-4 border-b border-border-subtle font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-text-heading hover:text-accent-primary transition-colors"
                >
                  <span>Home</span>
                  <ArrowRight className="w-4.5 h-4.5 text-text-muted" />
                </Link>
              </motion.div>

              {/* Expandable Services Row with Pill Sub-Chips */}
              <motion.div
                variants={drawerNavItemVariants}
                className="border-b border-border-subtle py-4"
              >
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between text-left font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-text-heading hover:text-accent-primary transition-colors cursor-pointer"
                  aria-expanded={mobileServicesOpen}
                >
                  <span className="flex items-center gap-2.5">
                    <span>Services</span>
                    <span className="font-sans text-[10px] uppercase font-bold tracking-[0.18em] px-2.5 py-0.5 rounded-full bg-accent-primary/15 text-accent-primary border border-accent-primary/35">
                      9 Studios
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-4.5 h-4.5 transition-transform duration-300 ${
                      mobileServicesOpen
                        ? "rotate-180 text-accent-primary"
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
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden pt-3.5"
                    >
                      <div className="flex flex-wrap gap-2">
                        {STUDIO_SERVICES.map((srv) => (
                          <Link
                            key={srv.slug}
                            href={`/services/${srv.slug}`}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setActiveTab("Services");
                            }}
                            className="px-3.5 py-1.5 rounded-full border border-border-subtle bg-bg-subtle hover:border-accent-primary hover:text-accent-primary text-xs font-medium text-text-secondary transition-colors"
                          >
                            {srv.title}
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setActiveTab("Services");
                          }}
                          className="px-3.5 py-1.5 rounded-full border border-accent-primary/45 bg-accent-primary/12 text-xs font-semibold text-accent-primary inline-flex items-center gap-1"
                        >
                          <span>All Services</span>
                          <ArrowUpRight size={12} />
                        </Link>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>

              {[
                ...PRIMARY_NAV_ITEMS,
                { label: "Industries", href: "/#industries" },
              ].map((item) => (
                <motion.div key={item.label} variants={drawerNavItemVariants}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveTab(item.label);
                    }}
                    className="flex items-center justify-between py-4 border-b border-border-subtle font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-text-heading hover:text-accent-primary transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4.5 h-4.5 text-text-muted" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom Pinned Studio Actions */}
            <div className="px-4 sm:px-6 py-5 border-t border-border-subtle bg-bg-secondary shrink-0 space-y-2.5">
              <Link
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  triggerProjectInquiry();
                }}
                className="btn-primary-cta w-full py-3.5 px-5 rounded-full flex items-center justify-center gap-2 text-xs"
              >
                <span>Start Your Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href="tel:+442081234567"
                className="btn-secondary-surface w-full py-3 px-5 rounded-full flex items-center justify-center gap-2 text-xs"
              >
                <Phone className="w-3.5 h-3.5 text-accent-primary shrink-0" />
                <span>+44 20 8123 4567</span>
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
