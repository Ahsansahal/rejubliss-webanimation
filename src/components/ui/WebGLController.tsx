"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sliders,
  ChevronDown,
  RotateCcw,
  Shuffle,
  Grid,
  Palette,
  Play,
  Pause,
  Gauge,
  Waves,
} from "lucide-react";
import {
  GeometryType,
  ThemePreset,
  WebGLSettings,
  THEME_PRESETS,
} from "../webgl/types";

interface WebGLControllerProps {
  settings: WebGLSettings;
  onUpdate: (updates: Partial<WebGLSettings>) => void;
  onRandomize: () => void;
  onReset: () => void;
}

const GEOMETRIES: { type: GeometryType; label: string }[] = [
  { type: "torusKnot", label: "Torus Knot" },
  { type: "icosahedron", label: "Icosahedron" },
  { type: "sphere", label: "Morph Sphere" },
  { type: "cylinder", label: "Cylinder" },
  { type: "wave", label: "Wave Grid" },
];

const THEMES: ThemePreset[] = ["cyberpunk", "aurora", "matrix", "solar"];

export function WebGLController({
  settings,
  onUpdate,
  onRandomize,
  onReset,
}: WebGLControllerProps) {
  const [isOpen, setIsOpen] = useState(true);
  const currentTheme = THEME_PRESETS[settings.theme];

  return (
    <motion.aside
      className="webgl-controller-panel"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Header / Toggle button */}
      <div
        className="controller-header"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        <div className="controller-header-left">
          <div
            className="controller-badge-dot"
            style={{ backgroundColor: currentTheme.primaryColor }}
          />
          <Sliders size={16} />
          <span className="controller-title">WebGL Matrix HUD</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="controller-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {/* Geometry Selector */}
            <div className="control-section">
              <label className="control-label">
                <Grid size={13} />
                <span>Active Geometry</span>
              </label>
              <div className="geometry-grid">
                {GEOMETRIES.map((geom) => {
                  const isActive = settings.geometry === geom.type;
                  return (
                    <button
                      key={geom.type}
                      type="button"
                      className={`geom-btn ${isActive ? "active" : ""}`}
                      onClick={() => onUpdate({ geometry: geom.type })}
                      style={{
                        borderColor: isActive
                          ? currentTheme.primaryColor
                          : "rgba(255, 255, 255, 0.1)",
                        boxShadow: isActive
                          ? `0 0 12px ${currentTheme.glowHex}`
                          : "none",
                      }}
                    >
                      {geom.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Theme Presets */}
            <div className="control-section">
              <label className="control-label">
                <Palette size={13} />
                <span>Color Spectrum</span>
              </label>
              <div className="theme-pill-group">
                {THEMES.map((themeKey) => {
                  const t = THEME_PRESETS[themeKey];
                  const isActive = settings.theme === themeKey;
                  return (
                    <button
                      key={themeKey}
                      type="button"
                      className={`theme-pill ${isActive ? "active" : ""}`}
                      onClick={() => onUpdate({ theme: themeKey })}
                      style={{
                        borderColor: isActive
                          ? t.primaryColor
                          : "rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <span
                        className="theme-swatch"
                        style={{
                          background: `linear-gradient(135deg, ${t.primaryColor}, ${t.secondaryColor})`,
                        }}
                      />
                      <span>{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggles: Wireframe & Auto Rotate */}
            <div className="control-row">
              <button
                type="button"
                className={`toggle-action-btn ${settings.wireframe ? "active" : ""}`}
                onClick={() => onUpdate({ wireframe: !settings.wireframe })}
                style={{
                  borderColor: settings.wireframe
                    ? currentTheme.primaryColor
                    : "rgba(255, 255, 255, 0.1)",
                }}
              >
                <Grid size={14} />
                <span>Wireframe: {settings.wireframe ? "ON" : "OFF"}</span>
              </button>

              <button
                type="button"
                className={`toggle-action-btn ${settings.autoRotate ? "active" : ""}`}
                onClick={() => onUpdate({ autoRotate: !settings.autoRotate })}
                style={{
                  borderColor: settings.autoRotate
                    ? currentTheme.accentColor
                    : "rgba(255, 255, 255, 0.1)",
                }}
              >
                {settings.autoRotate ? <Pause size={14} /> : <Play size={14} />}
                <span>Spin: {settings.autoRotate ? "Active" : "Paused"}</span>
              </button>
            </div>

            {/* Sliders: Speed & Distortion */}
            <div className="control-section">
              <div className="slider-header">
                <label className="control-label">
                  <Gauge size={13} />
                  <span>Rotation Speed</span>
                </label>
                <span className="slider-val">{settings.rotationSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.1"
                value={settings.rotationSpeed}
                onChange={(e) =>
                  onUpdate({ rotationSpeed: parseFloat(e.target.value) })
                }
                className="custom-range-slider"
                style={{ accentColor: currentTheme.primaryColor }}
              />
            </div>

            <div className="control-section">
              <div className="slider-header">
                <label className="control-label">
                  <Waves size={13} />
                  <span>Distortion Pulse</span>
                </label>
                <span className="slider-val">{settings.distortion.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={settings.distortion}
                onChange={(e) =>
                  onUpdate({ distortion: parseFloat(e.target.value) })
                }
                className="custom-range-slider"
                style={{ accentColor: currentTheme.secondaryColor }}
              />
            </div>

            {/* Quick Actions */}
            <div className="controller-footer-actions">
              <button
                type="button"
                className="action-btn secondary"
                onClick={onRandomize}
                title="Randomize parameters"
              >
                <Shuffle size={14} />
                <span>Randomize</span>
              </button>

              <button
                type="button"
                className="action-btn secondary"
                onClick={onReset}
                title="Reset to default settings"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
