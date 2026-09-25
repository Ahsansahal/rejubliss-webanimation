# Rejubliss WebGL & Fluid Motion

An immersive, high-performance 3D WebGL and web animation showcase built with **Next.js 16**, **React 19**, **Three.js**, **React Three Fiber (v9)**, **Framer Motion**, and **Tailwind CSS v4**.

## ✨ Features

- **Dynamic 3D Geometry**: Real-time switchable geometries (Torus Knot, Geodesic Icosahedron, Morphing Sphere, Cybernetic Cylinder, and Quantum Wave Grid).
- **Reactive Particle Nebula**: Over 1,500 instanced WebGL particles orbiting in 3D space responsive to pointer depth and parallax.
- **Dynamic Shader Materials & Lighting Rig**: Multi-point directional and pointer-following accent lighting with metallic clearcoat reflections.
- **Framer Motion Micro-Interactions**: Spring-dampened motion, fluid layout transitions, interactive telemetry HUD, and celebration particle bursts.
- **Tailwind CSS v4 & Glassmorphic Design System**: Modern dark aesthetics with frosted glass panels, ambient glows, and responsive typography.
- **SSR-Safe Architecture**: Client-safe dynamic canvas mounting (`next/dynamic` with `ssr: false`), preventing hydration mismatches and optimizing initial load times.
- **Strict TypeScript (`.tsx`)**: Built entirely with `.tsx` component architecture.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (Node 24 recommended)
- npm 10+

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the 3D scene and interactive HUD.

### Build for Production

```bash
npm run build
npm run start
```

## 🎮 Interactive Controls

The application includes a floating **WebGL Matrix HUD** (bottom right):
- **Active Geometry**: Switch between Torus Knot, Icosahedron, Morph Sphere, Cylinder, and Wave Grid.
- **Color Spectrum**: Choose from *Cyber Neon*, *Cosmic Aurora*, *Emerald Prism*, and *Solar Flare*.
- **Wireframe Mode**: Toggle between physical shaded material and wireframe matrix.
- **Speed & Distortion**: Adjust real-time rotational speed and geometry pulse distortion.
- **Particle Burst**: Click the "Launch Particle Burst" button to trigger celebratory canvas confetti with active theme colors.
