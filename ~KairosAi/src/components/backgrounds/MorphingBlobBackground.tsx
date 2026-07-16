"use client";

/**
 * CSS-Only Morphing Blobs
 * 
 * Uses CSS border-radius animation to morph shapes
 * Simpler than SVG gooey but less "liquid"
 * Inspired by: Locomotive.ca, Dogstudio.co
 * 
 * Good for: Subtle, low-CPU backgrounds
 * Light theme: Pastel blobs at low opacity on cream
 */

const cssBlobStyles = `
  @keyframes morph1 {
    0%, 100% {
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    }
    25% {
      border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    }
    50% {
      border-radius: 50% 60% 30% 60% / 30% 50% 70% 50%;
    }
    75% {
      border-radius: 60% 30% 60% 40% / 70% 50% 40% 60%;
    }
  }

  @keyframes morph2 {
    0%, 100% {
      border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    }
    25% {
      border-radius: 50% 40% 30% 70% / 60% 40% 70% 30%;
    }
    50% {
      border-radius: 70% 30% 50% 50% / 30% 70% 40% 60%;
    }
    75% {
      border-radius: 30% 70% 40% 60% / 50% 30% 60% 40%;
    }
  }

  @keyframes drift1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(5vw, -3vh) rotate(2deg); }
    50% { transform: translate(-3vw, 5vh) rotate(-1deg); }
    75% { transform: translate(2vw, -2vh) rotate(1deg); }
  }

  @keyframes drift2 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-4vw, 4vh) rotate(-2deg); }
    50% { transform: translate(3vw, -3vh) rotate(1deg); }
    75% { transform: translate(-2vw, 2vh) rotate(-1deg); }
  }
`;

export default function MorphingBlobBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      style={{ background: "#FAFAF8" }}
    >
      <style>{cssBlobStyles}</style>

      {/* Blob 1 — Lavender */}
      <div
        className="absolute"
        style={{
          width: "50vw",
          height: "50vw",
          maxWidth: "700px",
          maxHeight: "700px",
          top: "10%",
          left: "15%",
          background: "linear-gradient(135deg, rgba(139, 126, 200, 0.10), rgba(139, 126, 200, 0.04))",
          filter: "blur(60px)",
          animation: "morph1 20s ease-in-out infinite, drift1 30s ease-in-out infinite",
          willChange: "transform, border-radius",
        }}
      />

      {/* Blob 2 — Sky Blue */}
      <div
        className="absolute"
        style={{
          width: "45vw",
          height: "45vw",
          maxWidth: "600px",
          maxHeight: "600px",
          top: "45%",
          right: "10%",
          background: "linear-gradient(135deg, rgba(107, 184, 224, 0.08), rgba(107, 184, 224, 0.03))",
          filter: "blur(50px)",
          animation: "morph2 24s ease-in-out infinite, drift2 28s ease-in-out infinite",
          willChange: "transform, border-radius",
        }}
      />

      {/* Blob 3 — Warm Gold */}
      <div
        className="absolute"
        style={{
          width: "35vw",
          height: "35vw",
          maxWidth: "500px",
          maxHeight: "500px",
          bottom: "10%",
          left: "30%",
          background: "linear-gradient(135deg, rgba(196, 168, 130, 0.08), rgba(196, 168, 130, 0.02))",
          filter: "blur(50px)",
          animation: "morph1 22s ease-in-out infinite reverse, drift1 26s ease-in-out infinite reverse",
          willChange: "transform, border-radius",
        }}
      />
    </div>
  );
}
