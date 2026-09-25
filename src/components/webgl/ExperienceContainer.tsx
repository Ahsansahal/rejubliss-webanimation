"use client";

import React from "react";
import dynamic from "next/dynamic";
import { WebGLSettings } from "./types";

interface ExperienceContainerProps {
  settings: WebGLSettings;
}

// Dynamically import SceneCanvas with SSR disabled to guarantee smooth WebGL context creation
const DynamicSceneCanvas = dynamic(
  () => import("./SceneCanvas").then((mod) => mod.SceneCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="canvas-loader-fallback">
        <div className="spinner-glow" />
        <span className="loader-text">Initializing WebGL Engine...</span>
      </div>
    ),
  }
);

export function ExperienceContainer({ settings }: ExperienceContainerProps) {
  return (
    <div className="experience-wrapper">
      <DynamicSceneCanvas settings={settings} />
    </div>
  );
}
