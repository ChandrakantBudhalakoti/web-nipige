"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: "cy" | "am";
};

const PARTICLE_COUNT = 30;

/** Soft floating particle field behind the hero copy - purely decorative, canvas-based. */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = document.documentElement;
    const readColors = () => {
      const cs = getComputedStyle(root);
      return {
        cy: cs.getPropertyValue("--cy").trim() || "#06b6d4",
        am: cs.getPropertyValue("--am").trim() || "#f59e0b",
      };
    };
    let colors = readColors();
    const colorObserver = new MutationObserver(() => {
      colors = readColors();
    });
    colorObserver.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.8 + Math.random() * 1.4,
      dx: (Math.random() - 0.5) * 0.00016,
      dy: -0.00008 - Math.random() * 0.00018,
      baseAlpha: 0.15 + Math.random() * 0.22,
      twinkleSpeed: 0.0006 + Math.random() * 0.0009,
      twinklePhase: Math.random() * Math.PI * 2,
      color: Math.random() < 0.78 ? "cy" : "am",
    }));

    resize();
    window.addEventListener("resize", resize);

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < -0.02) p.x = 1.02;
        if (p.x > 1.02) p.x = -0.02;
        if (p.y < -0.02) p.y = 1.02;
        if (p.y > 1.02) p.y = -0.02;

        const twinkle = 0.5 + 0.5 * Math.sin(time * p.twinkleSpeed + p.twinklePhase);
        const alpha = p.baseAlpha * (0.55 + 0.45 * twinkle);
        const hex = colors[p.color];
        const px = p.x * width;
        const py = p.y * height;

        ctx.beginPath();
        ctx.fillStyle = hex;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = hex;
        ctx.shadowBlur = p.r * 5;
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    if (reduceMotion) {
      draw(0);
      return () => {
        window.removeEventListener("resize", resize);
        colorObserver.disconnect();
      };
    }

    let raf = 0;
    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      colorObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />;
}
