"use client";

/**
 * CSS Animated Gradient Background
 * 
 * Enormous background-size gradient with animated background-position
 * The gradient is 400% of the viewport, slowly panning across
 * 
 * Performance: Compositor-optimized. Cheapest animated background technique.
 * Light theme: Warm peach-to-lavender gradient at low saturation
 */

const gradientStyles = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    25% { background-position: 100% 50%; }
    50% { background-position: 100% 100%; }
    75% { background-position: 0% 100%; }
    100% { background-position: 0% 50%; }
  }

  .animated-gradient {
    background: linear-gradient(
      -45deg,
      #FAFAF8,
      rgba(139, 126, 200, 0.06),
      #FAFAF8,
      rgba(196, 168, 130, 0.06),
      rgba(107, 184, 224, 0.05),
      #FAFAF8,
      rgba(139, 126, 200, 0.04),
      #FAFAF8
    );
    background-size: 400% 400%;
    animation: gradientShift 30s ease infinite;
  }
`;

export default function CSSAnimatedGradient() {
  return (
    <>
      <style>{gradientStyles}</style>
      <div
        className="animated-gradient pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      />
    </>
  );
}
