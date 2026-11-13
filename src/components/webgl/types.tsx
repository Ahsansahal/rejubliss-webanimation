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
    name: "Electric Turquoise",
    primaryColor: "#16A6B0",
    secondaryColor: "#087F8C",
    accentColor: "#73C9D0",
    emissiveColor: "#063B50",
    glowHex: "rgba(22, 166, 176, 0.28)",
  },
  aurora: {
    name: "Deep Ocean",
    primaryColor: "#087F8C",
    secondaryColor: "#063B50",
    accentColor: "#16A6B0",
    emissiveColor: "#061B35",
    glowHex: "rgba(8, 127, 140, 0.28)",
  },
  matrix: {
    name: "Ice Cyan",
    primaryColor: "#73C9D0",
    secondaryColor: "#16A6B0",
    accentColor: "#D8E8E8",
    emissiveColor: "#063B50",
    glowHex: "rgba(115, 201, 208, 0.28)",
  },
  solar: {
    name: "Metallic Silver",
    primaryColor: "#D8E8E8",
    secondaryColor: "#73C9D0",
    accentColor: "#087F8C",
    emissiveColor: "#061B35",
    glowHex: "rgba(216, 232, 232, 0.25)",
  },
};
