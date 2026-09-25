"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

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

  return (
    <footer className="bg-[#071913] text-[#a1b3aa] pt-16 pb-10 border-t border-[#0d382c]">
      <div className="max-w-[97%] w-[97%] mx-auto px-2 sm:px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#12382c]">
          {/* Col 1: Brand & Bio (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-[#cba145] shadow-sm">
                <span className="font-serif font-black text-xl text-[#0a2920] tracking-tighter">
                  R
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                  Rejubliss
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#cba145] mt-1">
                  Design, Animate, Develop, Grow
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#8fa298] leading-relaxed mt-2 max-w-sm">
              A creative digital agency specializing in website design, graphic
              design, 2D/3D animation, and motion design.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-3">
              {[
                {
                  label: "Facebook",
                  icon: (
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z" />
                  ),
                },
                {
                  label: "Instagram",
                  icon: (
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  ),
                },
                {
                  label: "LinkedIn",
                  icon: (
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  ),
                },
                {
                  label: "YouTube",
                  icon: (
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  ),
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={`#${item.label.toLowerCase()}`}
                  aria-label={item.label}
                  className="w-8 h-8 rounded-full bg-[#0d2f24] text-[#a1b3aa] hover:bg-[#cba145] hover:text-[#0a2920] flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-serif text-white font-bold text-base mb-2">
              Quick Links
            </h4>
            <Link href="/" className="text-sm hover:text-[#cba145] transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-sm hover:text-[#cba145] transition-colors">
              About Us
            </Link>
            <Link href="#services" className="text-sm hover:text-[#cba145] transition-colors">
              Our Services
            </Link>
            <Link href="#portfolio" className="text-sm hover:text-[#cba145] transition-colors">
              Portfolio
            </Link>
            <Link href="#blog" className="text-sm hover:text-[#cba145] transition-colors">
              Blog
            </Link>
            <Link href="#contact" className="text-sm hover:text-[#cba145] transition-colors">
              Contact
            </Link>
          </div>

          {/* Col 3: Our Services (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-serif text-white font-bold text-base mb-2">
              Our Services
            </h4>
            <Link href="#services" className="text-sm hover:text-[#cba145] transition-colors">
              Website Design & Development
            </Link>
            <Link href="#services" className="text-sm hover:text-[#cba145] transition-colors">
              Graphic Design
            </Link>
            <Link href="#services" className="text-sm hover:text-[#cba145] transition-colors">
              2D Animation
            </Link>
            <Link href="#services" className="text-sm hover:text-[#cba145] transition-colors">
              3D Animation
            </Link>
            <Link href="#services" className="text-sm hover:text-[#cba145] transition-colors">
              Motion Design
            </Link>
            <Link href="#services" className="text-sm hover:text-[#cba145] transition-colors">
              Consultation
            </Link>
          </div>

          {/* Col 4: Contact Us (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3 text-sm">
            <h4 className="font-serif text-white font-bold text-base mb-2">
              Contact Us
            </h4>
            <div className="flex items-center gap-2.5">
              <Phone size={14} className="text-[#cba145] shrink-0" />
              <span>+44 20 8123 4567</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={14} className="text-[#cba145] shrink-0" />
              <span>info@rejubliss.co.uk</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin size={14} className="text-[#cba145] shrink-0" />
              <span>London, United Kingdom</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock size={14} className="text-[#cba145] shrink-0" />
              <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
            </div>
          </div>

          {/* Col 5: Subscribe to Our Newsletter (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-serif text-white font-bold text-base mb-2">
              Subscribe to Our Newsletter
            </h4>
            <p className="text-sm text-[#8fa298] leading-relaxed mb-1">
              Get the latest updates, insights, and creative inspiration.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white text-[#0a2920] px-4 py-3 pr-12 rounded-full text-xs font-medium placeholder-[#7d8c85] outline-none focus:ring-2 focus:ring-[#cba145]"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1.5 bottom-1.5 w-9 h-9 rounded-full bg-[#cba145] text-[#0a2920] flex items-center justify-center hover:bg-[#dfb962] transition-colors"
              >
                <ArrowRight size={15} />
              </button>
            </form>

            {subscribed && (
              <div className="flex items-center gap-1.5 text-xs text-[#cba145] mt-1">
                <CheckCircle2 size={13} />
                <span>Thank you for subscribing!</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7d8c85] gap-4">
          <div>
            <span>© 2026 Rejubliss. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="#sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
