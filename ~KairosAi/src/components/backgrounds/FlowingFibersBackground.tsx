"use client";

import { useEffect, useRef } from "react";

/**
 * Flowing Fibers Background
 * 
 * Continuous bezier curves that slowly drift and morph,
 * creating a "silk thread" / "fiber optic" visual.
 * More elegant than particle networks for premium brands.
 * Inspired by: Stripe (2023-2024), Vercel (Next.jsConf), Figma
 * 
 * Performance: ~18 fibers = ~0.2ms/frame
 * Light theme: Ultra-thin pastel lines, like silk threads on cream paper
 */

interface Fiber {
  points: { x: number; y: number }[];
  color: string;
  opacity: number;
  width: number;
  speedX: number;
  speedY: number;
  phase: number;
}

export default function FlowingFibersBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const FIBER_COUNT = 18;
    const POINTS_PER_FIBER = 6;

    const fiberColors = [
      "rgba(139, 126, 200, ", // Lavender
      "rgba(107, 184, 224, ", // Sky blue
      "rgba(196, 168, 130, ", // Warm gold
      "rgba(163, 196, 163, ", // Soft green
      "rgba(184, 184, 200, ", // Cool gray
    ];

    let fibers: Fiber[] = [];

    const createFibers = (w: number, h: number) => {
      fibers = Array.from({ length: FIBER_COUNT }, (_, i) => {
        const points = Array.from({ length: POINTS_PER_FIBER }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
        }));
        return {
          points,
          color: fiberColors[i % fiberColors.length],
          opacity: 0.03 + Math.random() * 0.05,
          width: 0.5 + Math.random() * 1,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.15,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      createFibers(window.innerWidth, window.innerHeight);
    };
    resize();
    window.addEventListener("resize", resize);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let time = 0;

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      for (const fiber of fibers) {
        if (!reducedMotion) {
          for (let i = 0; i < fiber.points.length; i++) {
            const p = fiber.points[i];
            p.x += Math.sin(time * 0.5 + fiber.phase + i * 0.5) * fiber.speedX;
            p.y += Math.cos(time * 0.3 + fiber.phase + i * 0.7) * fiber.speedY;

            if (p.x < -50) p.x = w + 50;
            if (p.x > w + 50) p.x = -50;
            if (p.y < -50) p.y = h + 50;
            if (p.y > h + 50) p.y = -50;
          }
        }

        ctx.beginPath();
        ctx.moveTo(fiber.points[0].x, fiber.points[0].y);

        for (let i = 1; i < fiber.points.length - 1; i++) {
          const xc = (fiber.points[i].x + fiber.points[i + 1].x) / 2;
          const yc = (fiber.points[i].y + fiber.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(fiber.points[i].x, fiber.points[i].y, xc, yc);
        }

        const last = fiber.points[fiber.points.length - 1];
        ctx.lineTo(last.x, last.y);

        ctx.strokeStyle = `${fiber.color}${fiber.opacity})`;
        ctx.lineWidth = fiber.width;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      if (!reducedMotion) {
        time += 0.008;
      }
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      aria-hidden="true"
      style={{ background: "transparent", zIndex: 1 }}
    />
  );
}
