"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  const socialLinks = [
    {
      label: "X (Twitter)",
      href: "https://x.com",
      icon: (
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      ),
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: (
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      ),
    },
    {
      label: "YouTube",
      href: "https://youtube.com",
      icon: (
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      ),
    },
  ];

  return (
    <footer className="relative w-full pt-10 pb-16 sm:pb-20 overflow-hidden">
      {/* Background Ambient Liquid Glow Highlights */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-200/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[300px] bg-sky-200/25 rounded-full blur-[110px] pointer-events-none" />

      {/* Floating Liquid Glass Shell (Framer Component Architecture) */}
      <div className="relative w-[97%] max-w-[97%] mx-auto p-[3px] rounded-[36px] sm:rounded-[42px] bg-gradient-to-b from-white/90 via-slate-200/60 to-white/90 shadow-[0.29px_4.36px_2.18px_rgba(0,0,0,0.01),0.78px_11.7px_5.86px_rgba(0,0,0,0.02),2.2px_32.97px_16.52px_rgba(0,0,0,0.03),4px_60px_30px_rgba(0,163,224,0.09)]">
        {/* Inner Liquid Glass Card Body */}
        <div className="relative rounded-[33px] sm:rounded-[39px] bg-gradient-to-br from-white/95 via-slate-50/85 to-white/95 backdrop-blur-2xl px-6 sm:px-10 lg:px-14 py-10 sm:py-12 shadow-[inset_0px_1px_1.5px_rgba(255,255,255,0.9),inset_0px_-1px_1.5px_rgba(0,163,224,0.06)]">
          {/* Main Top Row: Brand & Newsletter on Left, 3 Link Columns on Right */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-14 pb-10">
            {/* Left: Brand Showcase & Liquid Glass Newsletter Form */}
            <div className="flex flex-col items-start gap-5 max-w-md w-full">
              {/* Brand Logo Header */}
              <Link href="/" className="flex items-center gap-3.5 group">
                <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-200/90 shadow-sm transition-transform group-hover:scale-105 duration-300">
                  <Image
                    src="/images/logo-emblem.png"
                    alt="Rejubliss 3D Animation Studios"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold tracking-tight text-[#071527] leading-none">
                    Rejubliss
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#00A3E0] mt-1">
                    3D Animation Studios
                  </span>
                </div>
              </Link>

              {/* Tagline / Subtitle */}
              <p className="text-sm text-slate-500 leading-relaxed">
                Liquid glass interfaces, photorealistic 3D CGI, and next-generation WebGL digital experiences, crafted with care for visionary brands.
              </p>

              {/* Framer Liquid Glass Newsletter Pill Input & CTA */}
              <div className="w-full pt-1">
                <form
                  onSubmit={handleSubscribe}
                  className="flex items-center gap-2 p-1.5 rounded-full bg-white/75 backdrop-blur-xl border border-white/95 shadow-[inset_0px_1px_1.5px_rgba(255,255,255,0.95),inset_0px_-1px_1.5px_rgba(0,0,0,0.05),0px_8px_20px_-6px_rgba(148,160,181,0.25)] focus-within:border-[#00A3E0]/70 focus-within:shadow-[inset_0px_1px_1.5px_rgba(255,255,255,0.95),0px_10px_24px_-6px_rgba(0,163,224,0.3)] transition-all"
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-transparent px-4 py-2 text-xs sm:text-sm text-[#071527] placeholder:text-slate-400 outline-none flex-1 font-medium"
                  />
                  {/* Framer Glass Submit Button */}
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="relative overflow-hidden group shrink-0 bg-gradient-to-b from-[#00A3E0] to-[#0284c7] text-white px-5 sm:px-6 py-2.5 rounded-full text-xs font-bold tracking-wide shadow-[inset_0px_1px_0px_rgba(255,255,255,0.35),0px_7px_16px_-6px_rgba(0,163,224,0.4)] hover:shadow-[inset_0px_1px_0px_rgba(255,255,255,0.6),0px_12px_24px_-6px_rgba(0,163,224,0.55)] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="relative z-10">Subscribe</span>
                    <ArrowRight
                      size={13}
                      className="relative z-10 group-hover:translate-x-0.5 transition-transform"
                    />
                    {/* Liquid glass light sheen sweep */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none" />
                  </button>
                </form>

                {subscribed && (
                  <div className="flex items-center gap-1.5 text-xs text-[#00A3E0] font-semibold mt-2.5 pl-2">
                    <CheckCircle2 size={13} />
                    <span>Thank you for subscribing to our insights!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: 3 Link Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 w-full lg:w-auto">
              {/* Column 1: Services */}
              <div className="flex flex-col gap-3">
                <span className="text-[12px] font-semibold tracking-[0.08em] uppercase text-slate-400 select-none">
                  Services
                </span>
                <div className="flex flex-col gap-2.5 text-sm font-medium">
                  <Link href="#services" className="text-slate-600 hover:text-[#00A3E0] transition-colors">
                    3D Animation
                  </Link>
                  <Link href="#services" className="text-slate-600 hover:text-[#00A3E0] transition-colors">
                    Photorealistic CGI
                  </Link>
                  <Link href="#services" className="text-slate-600 hover:text-[#00A3E0] transition-colors">
                    Interactive WebGL
                  </Link>
                  <Link href="#services" className="text-slate-600 hover:text-[#00A3E0] transition-colors">
                    Character Design
                  </Link>
                  <Link href="#services" className="text-slate-600 hover:text-[#00A3E0] transition-colors">
                    Motion Graphics
                  </Link>
                </div>
              </div>

              {/* Column 2: Studio */}
              <div className="flex flex-col gap-3">
                <span className="text-[12px] font-semibold tracking-[0.08em] uppercase text-slate-400 select-none">
                  Studio
                </span>
                <div className="flex flex-col gap-2.5 text-sm font-medium">
                  <Link href="#portfolio" className="text-slate-600 hover:text-[#00A3E0] transition-colors">
                    Portfolio Spotlight
                  </Link>
                  <Link href="#featured-work" className="text-slate-600 hover:text-[#00A3E0] transition-colors">
                    Featured Masterpieces
                  </Link>
                  <Link href="#about" className="text-slate-600 hover:text-[#00A3E0] transition-colors">
                    Our 5-Step Process
                  </Link>
                  <Link href="#contact" className="text-slate-600 hover:text-[#00A3E0] transition-colors">
                    Contact Studio
                  </Link>
                  <Link href="#contact" className="text-slate-600 hover:text-[#00A3E0] transition-colors">
                    Start a Project
                  </Link>
                </div>
              </div>

              {/* Column 3: Connect & Resources */}
              <div className="col-span-2 sm:col-span-1 flex flex-col gap-3">
                <span className="text-[12px] font-semibold tracking-[0.08em] uppercase text-slate-400 select-none">
                  Connect
                </span>
                <div className="flex flex-col gap-2.5 text-sm font-medium">
                  <span className="text-slate-600">London, United Kingdom</span>
                  <a
                    href="mailto:info@rejubliss.co.uk"
                    className="text-slate-600 hover:text-[#00A3E0] transition-colors"
                  >
                    info@rejubliss.co.uk
                  </a>
                  <a
                    href="tel:+442081234567"
                    className="text-slate-600 hover:text-[#00A3E0] transition-colors"
                  >
                    +44 20 8123 4567
                  </a>
                  <Link href="#privacy" className="text-slate-600 hover:text-[#00A3E0] transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="#terms" className="text-slate-600 hover:text-[#00A3E0] transition-colors">
                    Terms & Conditions
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Liquid Glass Hairline Divider */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent my-6" />

          {/* Bottom Row: Copyright & Liquid Glass Social Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-xs text-slate-500 font-medium text-center sm:text-left">
              © 2026 Rejubliss 3D Animation Studios. Crafted with liquid glass precision.
            </span>

            {/* Liquid Glass Social Buttons (matching Framer component) */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-[inset_0px_1px_0px_rgba(255,255,255,0.9),0px_4px_12px_-2px_rgba(0,0,0,0.05)] hover:bg-[#00A3E0] hover:text-white hover:border-[#00A3E0] hover:shadow-[0_8px_20px_-4px_rgba(0,163,224,0.4)] text-slate-600 flex items-center justify-center transition-all duration-300 group cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
