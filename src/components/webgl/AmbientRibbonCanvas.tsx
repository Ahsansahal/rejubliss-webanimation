"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingGoldDust() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 300;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyanA = new THREE.Color("#00e5ff");
    const cyanB = new THREE.Color("#0284c7");
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

      tempColor.copy(cyanA).lerp(cyanB, rand4);
      col[i * 3] = tempColor.r;
      col[i * 3 + 1] = tempColor.g;
      col[i * 3 + 2] = tempColor.b;
    }

    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
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
        size={0.06}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function AmbientRibbonCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-70">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <FloatingGoldDust />
      </Canvas>
    </div>
  );
}
