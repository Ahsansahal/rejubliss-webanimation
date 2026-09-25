"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, Zap } from "lucide-react";
import confetti from "canvas-confetti";
import { THEME_PRESETS, WebGLSettings } from "../webgl/types";

interface HeroSectionProps {
  settings: WebGLSettings;
  onExploreClick: () => void;
  onToggleWireframe: () => void;
}

export function HeroSection({
  settings,
  onExploreClick,
  onToggleWireframe,
}: HeroSectionProps) {
  const currentTheme = THEME_PRESETS[settings.theme];

  const handleCelebrate = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.75 },
      colors: [
        currentTheme.primaryColor,
        currentTheme.secondaryColor,
        currentTheme.accentColor,
      ],
    });
    onExploreClick();
  };

  return (
    <section className="hero-section">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Release Pill Badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            borderColor: "rgba(255, 255, 255, 0.12)",
            background: "rgba(255, 255, 255, 0.04)",
          }}
        >
          <Zap size={14} color={currentTheme.primaryColor} />
          <span>Next.js 16 • Three.js • WebGL • Framer Motion</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Immersive{" "}
          <span
            className="gradient-text"
            style={{
              backgroundImage: `linear-gradient(135deg, #ffffff 10%, ${currentTheme.primaryColor} 60%, ${currentTheme.secondaryColor} 100%)`,
            }}
          >
            3D WebGL
          </span>{" "}
          <br />& Fluid Motion
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Engineered with React Three Fiber, procedural particle physics,
          responsive camera parallax, and GPU-accelerated Framer Motion
          micro-interactions.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          className="hero-cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            type="button"
            className="hero-btn primary"
            onClick={handleCelebrate}
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
              boxShadow: `0 0 25px ${currentTheme.glowHex}`,
            }}
          >
            <Sparkles size={16} />
            <span>Launch Particle Burst</span>
          </button>

          <button
            type="button"
            className="hero-btn secondary"
            onClick={onToggleWireframe}
          >
            <Terminal size={16} />
            <span>Toggle Wireframe Matrix</span>
          </button>
        </motion.div>

        {/* Live telemetry row */}
        <motion.div
          className="hero-metrics-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="metric-item">
            <span className="metric-val" style={{ color: currentTheme.primaryColor }}>
              1.5k+
            </span>
            <span className="metric-lbl">Active Particles</span>
          </div>
          <div className="metric-divider" />
          <div className="metric-item">
            <span className="metric-val" style={{ color: currentTheme.secondaryColor }}>
              60 FPS
            </span>
            <span className="metric-lbl">Target Framerate</span>
          </div>
          <div className="metric-divider" />
          <div className="metric-item">
            <span className="metric-val" style={{ color: currentTheme.accentColor }}>
              100%
            </span>
            <span className="metric-lbl">GPU Accelerated</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
