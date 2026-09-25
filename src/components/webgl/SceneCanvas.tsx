"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { WebGLSettings, THEME_PRESETS } from "./types";
import { InteractiveMesh } from "./InteractiveMesh";
import { ParticleField } from "./ParticleField";

interface SceneCanvasProps {
  settings: WebGLSettings;
}

function DynamicLighting({ theme }: { theme: WebGLSettings["theme"] }) {
  const currentTheme = THEME_PRESETS[theme];
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame((state) => {
    if (!lightRef.current) return;
    // Interactive mouse-following accent light
    lightRef.current.position.x = state.pointer.x * 4;
    lightRef.current.position.y = state.pointer.y * 4;
    lightRef.current.position.z = 3;
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.5}
        color={currentTheme.primaryColor}
      />
      <directionalLight
        position={[-6, -6, -4]}
        intensity={1.2}
        color={currentTheme.secondaryColor}
      />
      <pointLight
        ref={lightRef}
        intensity={2.5}
        distance={12}
        color={currentTheme.accentColor}
      />
    </>
  );
}

export function SceneCanvas({ settings }: SceneCanvasProps) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ pointerEvents: "auto" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={45} />
        <DynamicLighting theme={settings.theme} />

        <ParticleField theme={settings.theme} speed={settings.rotationSpeed} />

        <InteractiveMesh
          geometry={settings.geometry}
          theme={settings.theme}
          wireframe={settings.wireframe}
          rotationSpeed={settings.rotationSpeed}
          distortion={settings.distortion}
          autoRotate={settings.autoRotate}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3}
          dampingFactor={0.06}
        />
      </Canvas>
    </div>
  );
}
