import React, { useEffect, useRef } from "react";

// --- Pure Cyan #00FFFF Particle Network Canvas Background ---
// Background #05070A, particles #00FFFF, network lines rgba(0,255,255,0.10), high-performance canvas

interface Particle {
  x: number;
  baseY: number;
  radius: number;
  isCyanHighlight?: boolean;
}

export const GlobalBackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let scrollTimeout: any = null;
    let rafId = 0;
    let currentScrollY = window.scrollY;

    const initParticles = (w: number, h: number) => {
      particles = [];
      // Desktop ~30 particles, Mobile ~12 particles
      const count = w < 768 ? 12 : 30;

      // Grid distribution for clean spacing
      const cols = Math.ceil(Math.sqrt(count * (w / h)));
      const rows = Math.ceil(count / cols);
      const cellW = w / cols;
      const cellH = h / rows;

      let added = 0;
      for (let r = 0; r < rows && added < count; r++) {
        for (let c = 0; c < cols && added < count; c++) {
          const isCyanHighlight = added % 6 === 0;
          particles.push({
            x: (c + 0.2 + Math.random() * 0.6) * cellW,
            baseY: (r + 0.2 + Math.random() * 0.6) * cellH,
            radius: isCyanHighlight ? 1.6 : 1.1,
            isCyanHighlight,
          });
          added++;
        }
      }
    };

    const draw = (scrollYOffset: number, isScrolling: boolean) => {
      if (!ctx || width === 0 || height === 0) return;

      // Dark Background #05070A
      ctx.fillStyle = "#05070A";
      ctx.fillRect(0, 0, width, height);

      const pCount = particles.length;
      const maxConnectDist = width < 768 ? 140 : 210;
      const maxConnectDistSq = maxConnectDist * maxConnectDist;

      const opacityMult = isScrolling ? 1.2 : 0.85;

      // 1. Draw cyan connecting lines
      ctx.lineWidth = 0.6;
      for (let i = 0; i < pCount; i++) {
        const p1 = particles[i];
        const p1Y = (p1.baseY - scrollYOffset * 0.08) % height;
        const actualP1Y = p1Y < 0 ? p1Y + height : p1Y;

        for (let j = i + 1; j < pCount; j++) {
          const p2 = particles[j];
          const p2Y = (p2.baseY - scrollYOffset * 0.08) % height;
          const actualP2Y = p2Y < 0 ? p2Y + height : p2Y;

          const dx = p1.x - p2.x;
          const dy = actualP1Y - actualP2Y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDistSq) {
            const dist = Math.sqrt(distSq);
            const lineOpacity = (1 - dist / maxConnectDist) * 0.10 * opacityMult;

            ctx.strokeStyle = `rgba(0, 255, 255, ${lineOpacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, actualP1Y);
            ctx.lineTo(p2.x, actualP2Y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw cyan node particles
      for (let i = 0; i < pCount; i++) {
        const p = particles[i];
        const pY = (p.baseY - scrollYOffset * 0.08) % height;
        const actualY = pY < 0 ? pY + height : pY;

        if (p.isCyanHighlight) {
          ctx.fillStyle = `#00FFFF`;
        } else {
          ctx.fillStyle = `rgba(0, 255, 255, ${0.5 * opacityMult})`;
        }

        ctx.beginPath();
        ctx.arc(p.x, actualY, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles(width, height);
      draw(window.scrollY, false);
    };

    handleResize();

    const handleScroll = () => {
      currentScrollY = window.scrollY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          draw(currentScrollY, true);
          rafId = 0;
        });
      }

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        draw(currentScrollY, false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    draw(window.scrollY, false);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "#05070A" }}
    />
  );
};

export default GlobalBackgroundAnimation;

