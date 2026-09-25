"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { GeometryType, THEME_PRESETS, ThemePreset } from "./types";

interface InteractiveMeshProps {
  geometry: GeometryType;
  theme: ThemePreset;
  wireframe: boolean;
  rotationSpeed: number;
  distortion: number;
  autoRotate: boolean;
}

export function InteractiveMesh({
  geometry,
  theme,
  wireframe,
  rotationSpeed,
  distortion,
  autoRotate,
}: InteractiveMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerMeshRef = useRef<THREE.Mesh>(null!);
  const currentTheme = THEME_PRESETS[theme];

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Auto-rotation around multiple axes
    if (autoRotate) {
      meshRef.current.rotation.x += delta * 0.4 * rotationSpeed;
      meshRef.current.rotation.y += delta * 0.6 * rotationSpeed;
      meshRef.current.rotation.z += delta * 0.2 * rotationSpeed;
    }

    // Pointer-based reactive inertia (spring smoothing)
    const targetRotX = state.pointer.y * 0.6;
    const targetRotY = state.pointer.x * 0.8;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      meshRef.current.rotation.x + targetRotX * 0.05,
      0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      meshRef.current.rotation.y + targetRotY * 0.05,
      0.1
    );

    // Dynamic distortion wave pulse
    if (distortion > 0 && meshRef.current.geometry) {
      const time = performance.now() * 0.001;
      const pulse = Math.sin(time * 2.5) * 0.08 * distortion;
      meshRef.current.scale.set(1 + pulse, 1 - pulse * 0.5, 1 + pulse * 0.8);
    } else {
      meshRef.current.scale.set(1, 1, 1);
    }

    // Counter-rotate inner holographic core
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x -= delta * 0.5 * rotationSpeed;
      innerMeshRef.current.rotation.y += delta * 0.7 * rotationSpeed;
    }
  });

  const renderGeometry = () => {
    switch (geometry) {
      case "torusKnot":
        return <torusKnotGeometry args={[1.15, 0.38, 140, 36]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1.65, 2]} />;
      case "sphere":
        return <sphereGeometry args={[1.5, 64, 64]} />;
      case "cylinder":
        return <cylinderGeometry args={[1.1, 1.1, 2.4, 36]} />;
      case "wave":
        return <planeGeometry args={[3.8, 3.8, 48, 48]} />;
      default:
        return <torusKnotGeometry args={[1.15, 0.38, 140, 36]} />;
    }
  };

  return (
    <Float
      speed={2 * rotationSpeed}
      rotationIntensity={0.8}
      floatIntensity={1.2}
      floatingRange={[-0.15, 0.15]}
    >
      <group>
        {/* Main Hero Mesh */}
        <mesh ref={meshRef} castShadow receiveShadow>
          {renderGeometry()}
          <meshPhysicalMaterial
            color={currentTheme.primaryColor}
            emissive={currentTheme.emissiveColor}
            emissiveIntensity={wireframe ? 0.8 : 0.4}
            metalness={wireframe ? 0.2 : 0.85}
            roughness={wireframe ? 0.3 : 0.15}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            wireframe={wireframe}
            wireframeLinewidth={2}
          />
        </mesh>

        {/* Inner Holographic Lattice for dimensional depth */}
        {!wireframe && geometry !== "wave" && (
          <mesh ref={innerMeshRef} scale={[0.65, 0.65, 0.65]}>
            <icosahedronGeometry args={[1.2, 1]} />
            <meshStandardMaterial
              color={currentTheme.secondaryColor}
              emissive={currentTheme.secondaryColor}
              emissiveIntensity={0.6}
              wireframe
              transparent
              opacity={0.5}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}
