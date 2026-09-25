"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { THEME_PRESETS, ThemePreset } from "./types";

interface ParticleFieldProps {
  theme: ThemePreset;
  speed?: number;
}

export function ParticleField({ theme, speed = 1 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 1500;

  const currentTheme = THEME_PRESETS[theme];

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color(currentTheme.primaryColor);
    const colorB = new THREE.Color(currentTheme.secondaryColor);
    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random generation to comply with React 19 render purity
      const r1 = Math.sin(i * 17.1234 + 91.567) * 43758.5453;
      const rand1 = r1 - Math.floor(r1);
      const r2 = Math.sin(i * 43.8765 + 33.241) * 43758.5453;
      const rand2 = r2 - Math.floor(r2);
      const r3 = Math.sin(i * 61.9012 + 17.894) * 43758.5453;
      const rand3 = r3 - Math.floor(r3);
      const r4 = Math.sin(i * 89.3412 + 71.239) * 43758.5453;
      const rand4 = r4 - Math.floor(r4);

      // Disperse in a sphere/disc shell around the central mesh
      const radius = 6 + rand1 * 14;
      const theta = rand2 * Math.PI * 2;
      const phi = Math.acos(rand3 * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Interpolate colors between theme primary & secondary
      const mixRatio = rand4;
      tempColor.copy(colorA).lerp(colorB, mixRatio);
      col[i * 3] = tempColor.r;
      col[i * 3 + 1] = tempColor.g;
      col[i * 3 + 2] = tempColor.b;
    }

    return [pos, col];
  }, [currentTheme]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Gentle rotational drift
    pointsRef.current.rotation.y += delta * 0.05 * speed;
    pointsRef.current.rotation.x += delta * 0.02 * speed;

    // Subtle pointer parallax
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.4;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
