"use client";

import { useEffect, useRef } from "react";

/**
 * Flowing Gradient Mesh — Apple Style
 * 
 * Multiple conic + radial gradients with @property-registered
 * angle values, enabling smooth gradient rotation animation.
 * Inspired by: Apple MacBook Air M2, Apple Vision Pro, iPhone 15 Pro pages
 * 
 * Key: EXTREMELY slow animation (30-60s cycles), barely perceptible changes
 * Performance: CSS-only, GPU-composited. Zero JS after initial render.
 * Light theme: Muted pastels that feel like light playing on a surface
 */

const meshStyles = `
  @property --gradient-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  @property --gradient-angle-2 {
    syntax: '<angle>';
    initial-value: 90deg;
    inherits: false;
  }

  @property --gradient-angle-3 {
    syntax: '<angle>';
    initial-value: 180deg;
    inherits: false;
  }

  @property --gradient-position-x {
    syntax: '<percentage>';
    initial-value: 50%;
    inherits: false;
  }

  @property --gradient-position-y {
    syntax: '<percentage>';
    initial-value: 50%;
    inherits: false;
  }

  @keyframes meshRotate {
    0% { --gradient-angle: 0deg; }
    100% { --gradient-angle: 360deg; }
  }

  @keyframes meshRotate2 {
    0% { --gradient-angle-2: 90deg; }
    100% { --gradient-angle-2: 450deg; }
  }

  @keyframes meshRotate3 {
    0% { --gradient-angle-3: 180deg; }
    100% { --gradient-angle-3: 540deg; }
  }

  @keyframes meshPosition {
    0%, 100% { --gradient-position-x: 50%; --gradient-position-y: 50%; }
    25% { --gradient-position-x: 60%; --gradient-position-y: 40%; }
    50% { --gradient-position-x: 45%; --gradient-position-y: 55%; }
    75% { --gradient-position-x: 55%; --gradient-position-y: 45%; }
  }

  .flowing-mesh {
    background:
      conic-gradient(
        from var(--gradient-angle) at var(--gradient-position-x) var(--gradient-position-y),
        rgba(139, 126, 200, 0.08) 0%,
        transparent 15%,
        rgba(139, 126, 200, 0.05) 30%,
        transparent 45%,
        rgba(139, 126, 200, 0.07) 60%,
        transparent 75%,
        rgba(139, 126, 200, 0.04) 90%,
        transparent 100%
      ),
      conic-gradient(
        from var(--gradient-angle-2) at 40% 60%,
        rgba(107, 184, 224, 0.06) 0%,
        transparent 20%,
        rgba(107, 184, 224, 0.04) 40%,
        transparent 60%,
        rgba(107, 184, 224, 0.05) 80%,
        transparent 100%
      ),
      conic-gradient(
        from var(--gradient-angle-3) at 60% 40%,
        rgba(196, 168, 130, 0.05) 0%,
        transparent 25%,
        rgba(196, 168, 130, 0.04) 50%,
        transparent 75%,
        rgba(196, 168, 130, 0.03) 100%
      ),
      radial-gradient(
        ellipse at 50% 50%,
        rgba(139, 126, 200, 0.03) 0%,
        transparent 70%
      ),
      #FAFAF8;

    animation:
      meshRotate 40s linear infinite,
      meshRotate2 55s linear infinite,
      meshRotate3 45s linear infinite,
      meshPosition 35s ease-in-out infinite;
  }
`;

export default function FlowingGradientMesh() {
  const injected = useRef(false);

  useEffect(() => {
    if (!injected.current) {
      const style = document.createElement("style");
      style.textContent = meshStyles;
      document.head.appendChild(style);
      injected.current = true;
    }
  }, []);

  return (
    <div
      className="flowing-mesh pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
