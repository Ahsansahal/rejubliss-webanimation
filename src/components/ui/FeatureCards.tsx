"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box, Sparkles, Cpu, Layers, ShieldCheck, Flame } from "lucide-react";
import { THEME_PRESETS, ThemePreset } from "../webgl/types";

interface FeatureCardsProps {
  theme: ThemePreset;
}

const FEATURES = [
  {
    icon: Box,
    title: "Dynamic Three.js Mesh",
    description:
      "Morphing geometries with physical materials, iridescent clearcoat, and real-time vertex distortion pulse.",
  },
  {
    icon: Sparkles,
    title: "Reactive Particle Nebula",
    description:
      "Over 1,500 instanced WebGL particles orbiting in 3D space with pointer parallax and dynamic blending.",
  },
  {
    icon: Cpu,
    title: "Framer Motion Physics",
    description:
      "State-driven spring animations, collapsible telemetry HUD, and layoutId shared element transitions.",
  },
  {
    icon: Layers,
    title: "SSR-Safe Next.js 16",
    description:
      "Dynamic client-only WebGL canvas mounting ensuring zero hydration mismatches or server rendering bottlenecks.",
  },
  {
    icon: Flame,
    title: "Dynamic Lighting Rig",
    description:
      "Multi-directional key and rim lights combined with pointer-tracking point lights for atmospheric depth.",
  },
  {
    icon: ShieldCheck,
    title: "Vanilla CSS Luxury System",
    description:
      "Tailored glassmorphism, responsive CSS variables, backdrop blurs, and dark-mode color harmony.",
  },
];

export function FeatureCards({ theme }: FeatureCardsProps) {
  const currentTheme = THEME_PRESETS[theme];

  return (
    <section className="features-section">
      <div className="features-header">
        <span
          className="section-eyebrow"
          style={{ color: currentTheme.primaryColor }}
        >
          Tech Stack Architecture
        </span>
        <h2 className="section-title">Engineered for Performance & Aesthetics</h2>
        <p className="section-subtitle">
          Every layer has been constructed with modern WebGL pipelines and
          hardware acceleration in mind.
        </p>
      </div>

      <div className="features-grid">
        {FEATURES.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={feat.title}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div
                className="feature-icon-wrapper"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                }}
              >
                <Icon size={22} color={currentTheme.primaryColor} />
              </div>
              <h3 className="feature-card-title">{feat.title}</h3>
              <p className="feature-card-desc">{feat.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
