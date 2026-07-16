"use client";

import { motion } from "framer-motion";
import AnimatedMeshGradient from "./AnimatedMeshGradient";
import MorphingBlobBackground from "./MorphingBlobBackground";
import AuroraBackground from "./AuroraBackground";
import FlowingGradientMesh from "./FlowingGradientMesh";
import CSSAnimatedGradient from "./CSSAnimatedGradient";
import FiberNetworkBackground from "./FiberNetworkBackground";
import FlowingFibersBackground from "./FlowingFibersBackground";

export {
  AnimatedMeshGradient,
  MorphingBlobBackground,
  AuroraBackground,
  FlowingGradientMesh,
  CSSAnimatedGradient,
  FiberNetworkBackground,
  FlowingFibersBackground,
};

/**
 * BackgroundProvider
 * 
 * Wraps the chosen background with a fade-in entrance animation.
 * Usage: <BackgroundProvider variant="mesh" />
 * 
 * Available variants:
 * - "mesh"        → Animated Mesh Gradient (Stripe/Linear style) — RECOMMENDED for premium feel
 * - "mesh-flow"   → Flowing Gradient Mesh (Apple style) — Pure CSS, zero JS
 * - "aurora"      → Aurora/Northern Lights ribbons — Ethereal flowing glow
 * - "blobs"       → Morphing Blob Background — Organic liquid shapes
 * - "gradient"    → CSS Animated Gradient — Simplest, most performant
 * - "fibers"      → Fiber Network — Neural network / AI aesthetic
 * - "silk"        → Flowing Fibers — Elegant silk thread visual
 */

type BackgroundVariant = "mesh" | "mesh-flow" | "aurora" | "blobs" | "gradient" | "fibers" | "silk";

interface BackgroundProviderProps {
  variant?: BackgroundVariant;
  fadeIn?: boolean;
  fadeInDuration?: number;
}

export default function BackgroundProvider({
  variant = "mesh",
  fadeIn = true,
  fadeInDuration = 1.5,
}: BackgroundProviderProps) {
  const renderBackground = () => {
    switch (variant) {
      case "mesh":
        return <AnimatedMeshGradient />;
      case "mesh-flow":
        return <FlowingGradientMesh />;
      case "aurora":
        return <AuroraBackground />;
      case "blobs":
        return <MorphingBlobBackground />;
      case "gradient":
        return <CSSAnimatedGradient />;
      case "fibers":
        return <FiberNetworkBackground />;
      case "silk":
        return <FlowingFibersBackground />;
      default:
        return <AnimatedMeshGradient />;
    }
  };

  if (fadeIn) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: fadeInDuration, ease: "easeOut" }}
      >
        {renderBackground()}
      </motion.div>
    );
  }

  return renderBackground();
}
