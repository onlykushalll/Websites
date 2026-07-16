"use client";

/**
 * Aurora / Northern Lights Background
 * 
 * Multiple layered gradients with enormous background-size
 * animated via background-position. Each "ribbon" is a narrow gradient
 * band that slowly shifts position and opacity.
 * Inspired by: Apple MacBook Air M2, Raycast.com, Vercel
 * 
 * Performance: Uses background-position animation — compositor-optimized
 * Light theme: Aurora ribbons at 5-12% opacity create ethereal glow on cream
 */

const auroraStyles = `
  @keyframes aurora1 {
    0% { background-position: 0% 50%; opacity: 0.5; }
    25% { background-position: 50% 30%; opacity: 0.8; }
    50% { background-position: 100% 60%; opacity: 0.6; }
    75% { background-position: 50% 40%; opacity: 0.9; }
    100% { background-position: 0% 50%; opacity: 0.5; }
  }

  @keyframes aurora2 {
    0% { background-position: 100% 50%; opacity: 0.6; }
    25% { background-position: 50% 70%; opacity: 0.4; }
    50% { background-position: 0% 30%; opacity: 0.8; }
    75% { background-position: 50% 60%; opacity: 0.5; }
    100% { background-position: 100% 50%; opacity: 0.6; }
  }

  @keyframes aurora3 {
    0% { background-position: 50% 0%; opacity: 0.7; }
    33% { background-position: 30% 100%; opacity: 0.5; }
    66% { background-position: 70% 50%; opacity: 0.9; }
    100% { background-position: 50% 0%; opacity: 0.7; }
  }

  @keyframes auroraShimmer {
    0%, 100% { opacity: 0.6; transform: scaleY(1); }
    50% { opacity: 1; transform: scaleY(1.05); }
  }

  @keyframes auroraDrift {
    0%, 100% { transform: translateX(0) skewX(0deg); }
    33% { transform: translateX(3%) skewX(1deg); }
    66% { transform: translateX(-2%) skewX(-0.5deg); }
  }
`;

export default function AuroraBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      style={{ background: "#FAFAF8" }}
    >
      <style>{auroraStyles}</style>

      {/* Aurora Ribbon 1 — Lavender/Sky Blue */}
      <div
        className="absolute"
        style={{
          top: "-20%",
          left: "-10%",
          width: "120%",
          height: "80%",
          background: `linear-gradient(
            135deg,
            transparent 20%,
            rgba(139, 126, 200, 0.08) 30%,
            rgba(107, 184, 224, 0.10) 40%,
            rgba(139, 126, 200, 0.06) 50%,
            transparent 60%
          )`,
          backgroundSize: "200% 200%",
          filter: "blur(60px)",
          animation: "aurora1 25s ease-in-out infinite, auroraDrift 30s ease-in-out infinite",
          willChange: "background-position, transform",
        }}
      />

      {/* Aurora Ribbon 2 — Warm Gold/Peach */}
      <div
        className="absolute"
        style={{
          top: "20%",
          left: "-5%",
          width: "110%",
          height: "60%",
          background: `linear-gradient(
            120deg,
            transparent 25%,
            rgba(196, 168, 130, 0.06) 35%,
            rgba(220, 180, 160, 0.08) 45%,
            rgba(196, 168, 130, 0.04) 55%,
            transparent 65%
          )`,
          backgroundSize: "200% 200%",
          filter: "blur(70px)",
          animation: "aurora2 30s ease-in-out infinite, auroraDrift 35s ease-in-out infinite reverse",
          willChange: "background-position, transform",
        }}
      />

      {/* Aurora Ribbon 3 — Cool Teal/Mint */}
      <div
        className="absolute"
        style={{
          top: "40%",
          left: "0%",
          width: "100%",
          height: "50%",
          background: `linear-gradient(
            110deg,
            transparent 30%,
            rgba(107, 184, 224, 0.06) 40%,
            rgba(163, 196, 163, 0.08) 50%,
            rgba(107, 184, 224, 0.04) 60%,
            transparent 70%
          )`,
          backgroundSize: "200% 200%",
          filter: "blur(50px)",
          animation: "aurora3 22s ease-in-out infinite, auroraDrift 28s ease-in-out infinite",
          willChange: "background-position, transform",
        }}
      />

      {/* Center glow hotspot */}
      <div
        className="absolute"
        style={{
          top: "25%",
          left: "30%",
          width: "40%",
          height: "40%",
          background: "radial-gradient(ellipse, rgba(139, 126, 200, 0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "auroraShimmer 8s ease-in-out infinite",
        }}
      />

      {/* Top fade to cream */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background: "linear-gradient(to bottom, #FAFAF8, transparent)",
        }}
      />

      {/* Bottom fade to cream */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to top, #FAFAF8, transparent)",
        }}
      />
    </div>
  );
}
