"use client";

import React from "react";
import { Box, Heart } from "lucide-react";
import { THEME_PRESETS, ThemePreset } from "../webgl/types";

interface FooterProps {
  theme: ThemePreset;
}

export function Footer({ theme }: FooterProps) {
  const currentTheme = THEME_PRESETS[theme];

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <Box size={18} color={currentTheme.primaryColor} />
            <span>Rejubliss WebGL Engine</span>
          </div>
          <p className="footer-desc">
            Next.js App Router • Three.js • React Three Fiber • Framer Motion
          </p>
        </div>

        <div className="footer-right">
          <span className="footer-note">
            Crafted with <Heart size={14} color={currentTheme.secondaryColor} />{" "}
            for high-performance creative web experiences.
          </span>
        </div>
      </div>
    </footer>
  );
}
