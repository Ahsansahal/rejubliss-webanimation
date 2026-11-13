"use client";

import React, { useRef, useMemo, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/common/ThemeProvider";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function FloatingBrandDust({
  isDark,
  reducedMotion,
}: {
  isDark: boolean;
  reducedMotion: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 280;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color(isDark ? "#E53726" : "#D12B1B");
    const colorB = new THREE.Color(isDark ? "#8F1D12" : "#7A180F");
    const colorC = new THREE.Color(isDark ? "#F5F4EF" : "#3A3935");
    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random generation to comply with React 19 render purity
      const r1 = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      const rand1 = r1 - Math.floor(r1);
      const r2 = Math.sin(i * 39.3456 + 11.123) * 43758.5453;
      const rand2 = r2 - Math.floor(r2);
      const r3 = Math.sin(i * 73.1567 + 94.678) * 43758.5453;
      const rand3 = r3 - Math.floor(r3);
      const r4 = Math.sin(i * 91.2435 + 45.981) * 43758.5453;
      const rand4 = r4 - Math.floor(r4);

      pos[i * 3] = (rand1 - 0.5) * 16;
      pos[i * 3 + 1] = (rand2 - 0.5) * 12;
      pos[i * 3 + 2] = (rand3 - 0.5) * 8;

      if (rand4 < 0.5) {
        tempColor.copy(colorA).lerp(colorB, rand4 * 2);
      } else {
        tempColor.copy(colorB).lerp(colorC, (rand4 - 0.5) * 2);
      }
      col[i * 3] = tempColor.r;
      col[i * 3 + 1] = tempColor.g;
      col[i * 3 + 2] = tempColor.b;
    }

    return [pos, col];
  }, [isDark]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    if (typeof document !== "undefined" && document.hidden) return;
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x += delta * 0.015;

    // Interactive pointer parallax
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      state.pointer.x * 0.5,
      0.05
    );
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      state.pointer.y * 0.5,
      0.05
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.045 : 0.04}
        vertexColors
        transparent
        opacity={isDark ? 0.3 : 0.22}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function AmbientRibbonCanvas() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  if (reducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.6} />
        <FloatingBrandDust isDark={isDark} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
