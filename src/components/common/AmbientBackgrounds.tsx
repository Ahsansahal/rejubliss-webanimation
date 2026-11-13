"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";

const DynamicAmbientCanvas = dynamic(
  () =>
    import("@/components/webgl/AmbientRibbonCanvas").then(
      (mod) => mod.AmbientRibbonCanvas
    ),
  { ssr: false }
);

const DynamicFlowingCursor = dynamic(
  () =>
    import("@/components/common/FlowingCursor").then(
      (mod) => mod.FlowingCursor
    ),
  { ssr: false }
);

/**
 * Performance-gated ambient WebGL layer:
 * - Defers Three.js & WebGL fluid shader loading until after initial paint/idle
 *   so Largest Contentful Paint (LCP) and Total Blocking Time (TBT) stay green.
 * - Skips heavy pointer-driven WebGL bundles on touch/mobile viewports where
 *   coarse pointers cannot trigger cursor trails, serving a zero-JS ambient glow instead.
 */
export function AmbientBackgrounds() {
  const [enableDesktopWebGL, setEnableDesktopWebGL] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isFinePointerDesktop =
      window.matchMedia("(pointer: fine)").matches && window.innerWidth >= 1024;

    if (prefersReducedMotion || !isFinePointerDesktop) {
      return;
    }

    let cancelled = false;
    const activate = () => {
      if (!cancelled) setEnableDesktopWebGL(true);
    };

    type IdleWindow = Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number }
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const win = window as IdleWindow;
    let idleId: number | null = null;
    const timerId = window.setTimeout(() => {
      if (typeof win.requestIdleCallback === "function") {
        idleId = win.requestIdleCallback(activate, { timeout: 2000 });
      } else {
        activate();
      }
    }, 1400);

    return () => {
      cancelled = true;
      window.clearTimeout(timerId);
      if (idleId !== null && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
      }
    };
  }, []);

  if (!enableDesktopWebGL) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 55% 48% at 84% 16%, var(--ambient-orb-1), transparent 68%), radial-gradient(circle at 14% 82%, var(--ambient-orb-2), transparent 52%)",
        }}
      />
    );
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
      >
        <DynamicFlowingCursor />
      </div>
      <div aria-hidden="true">
        <DynamicAmbientCanvas />
      </div>
    </>
  );
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
