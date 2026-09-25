export type GeometryType = "torusKnot" | "icosahedron" | "sphere" | "cylinder" | "wave";

export type ThemePreset = "cyberpunk" | "aurora" | "matrix" | "solar";

export interface WebGLSettings {
  geometry: GeometryType;
  theme: ThemePreset;
  wireframe: boolean;
  rotationSpeed: number;
  distortion: number;
  particleDensity: number;
  bloomIntensity: number;
  autoRotate: boolean;
}

export interface ThemeConfig {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  emissiveColor: string;
  glowHex: string;
}

export const THEME_PRESETS: Record<ThemePreset, ThemeConfig> = {
  cyberpunk: {
    name: "Cyber Neon",
    primaryColor: "#00f0ff",
    secondaryColor: "#ff007f",
    accentColor: "#7928ca",
    emissiveColor: "#003b5c",
    glowHex: "rgba(0, 240, 255, 0.4)",
  },
  aurora: {
    name: "Cosmic Aurora",
    primaryColor: "#a855f7",
    secondaryColor: "#3b82f6",
    accentColor: "#ec4899",
    emissiveColor: "#2e0854",
    glowHex: "rgba(168, 85, 247, 0.4)",
  },
  matrix: {
    name: "Emerald Prism",
    primaryColor: "#10b981",
    secondaryColor: "#06b6d4",
    accentColor: "#84cc16",
    emissiveColor: "#033b26",
    glowHex: "rgba(16, 185, 129, 0.4)",
  },
  solar: {
    name: "Solar Flare",
    primaryColor: "#f59e0b",
    secondaryColor: "#ef4444",
    accentColor: "#fbbf24",
    emissiveColor: "#4d1d00",
    glowHex: "rgba(245, 158, 11, 0.4)",
  },
};
