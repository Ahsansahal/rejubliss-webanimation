"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box, Sparkles, Activity, Layers, ExternalLink } from "lucide-react";
import { THEME_PRESETS, ThemePreset } from "../webgl/types";

interface NavbarProps {
  theme: ThemePreset;
}

export function Navbar({ theme }: NavbarProps) {
  const [fps, setFps] = useState<number>(60);
  const currentTheme = THEME_PRESETS[theme];

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <motion.header
      className="nav-header"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-container">
        {/* Brand / Logo */}
        <div className="nav-brand">
          <div
            className="brand-icon-wrapper"
            style={{
              boxShadow: `0 0 20px ${currentTheme.glowHex}`,
              borderColor: currentTheme.primaryColor,
            }}
          >
            <Box size={20} color={currentTheme.primaryColor} />
          </div>
          <div className="brand-text-col">
            <span className="brand-title">Rejubliss</span>
            <span className="brand-subtitle">WebGL Experience</span>
          </div>
        </div>

        {/* Status Badges */}
        <div className="nav-status-group">
          <div className="status-pill">
            <span className="status-dot pulsing" style={{ backgroundColor: currentTheme.primaryColor }} />
            <span>WebGL 2.0</span>
          </div>

          <div className="status-pill hide-mobile">
            <Activity size={13} color="#10b981" />
            <span className="fps-counter">{fps} FPS</span>
          </div>

          <div className="status-pill hide-mobile">
            <Layers size={13} color={currentTheme.accentColor} />
            <span>R3F v9</span>
          </div>
        </div>

        {/* Action button */}
        <div className="nav-actions">
          <a
            href="https://threejs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-btn"
          >
            <Sparkles size={14} />
            <span>Docs</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
