import React, { useEffect, useRef } from "react";

// --- Ultra High-Quality 3D Astronomical Spiral Galaxy System ---

interface GalaxyParticle {
  x: number;
  y: number;
  z: number;
  radius: number;
  angle: number;
  size: number;
  color: string;
  opacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
  isBrightStar?: boolean;
  type: "core" | "arm" | "dust" | "star";
}

interface NebulaCloud {
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
  opacity: number;
}

export const GlobalBackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let isMobile = false;
    let isPageVisible = true;

    // Accessibility check
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = mediaQuery.matches;

    const handleMotionPreference = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionPreference);

    // Camera & Perspective State
    let cameraAngleY = 0.2;
    let cameraAngleX = 0.55; // Tilted 3D view like astronomical reference
    let targetCameraAngleY = 0.2;
    let targetCameraAngleX = 0.55;
    let cameraDistance = 850;

    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartAngleY = 0;
    let dragStartAngleX = 0;

    // Scroll parallax tracking
    let currentScrollY = window.scrollY;
    let targetScrollY = window.scrollY;

    let particles: GalaxyParticle[] = [];
    let nebulaClouds: NebulaCloud[] = [];

    // --- Initialize High-Density 3D Spiral Galaxy ---
    const initGalaxy = (w: number, h: number, mobile: boolean) => {
      particles = [];
      nebulaClouds = [];

      const galaxyRadius = Math.min(w, h) * (mobile ? 0.95 : 0.85);

      // On mobile devices, disable floating particle clusters for ultra-fast, zero-lag rendering
      const countCore = mobile ? 0 : 220;
      const countArm = mobile ? 0 : 500;
      const countDust = mobile ? 0 : 160;
      const countStars = mobile ? 0 : 160;
      const countNebula = mobile ? 0 : 6;

      const numArms = 2; // Two main sweeping logarithmic spiral arms

      // Rich Deep Space Color Palette matching astrophotography reference
      // Cyan/Electric Blue (#00D3F3, #38BDF8), Deep Royal Blue (#1D4ED8, #3B82F6), Cosmic Purple (#8B5CF6, #A855F7), Bright White (#FFFFFF)
      const armColors = [
        "rgba(56, 189, 248, ",   // Sky Cyan
        "rgba(34, 211, 238, ",   // Bright Cyan
        "rgba(59, 130, 246, ",   // Royal Blue
        "rgba(139, 92, 246, ",   // Purple
        "rgba(168, 85, 247, ",   // Lavender
        "rgba(255, 255, 255, "    // Pure Starlight White
      ];

      // 1. Central Luminous Bar & Nucleus (High star concentration)
      for (let i = 0; i < countCore; i++) {
        const r = Math.pow(Math.random(), 2.0) * (galaxyRadius * 0.22);
        // Elliptical central bar angle
        const barAngle = (Math.random() - 0.5) * Math.PI * 0.45;
        const theta = Math.random() > 0.5 ? barAngle : barAngle + Math.PI;
        const phi = (Math.random() - 0.5) * Math.PI * 0.35;

        particles.push({
          x: r * Math.cos(theta) * Math.cos(phi),
          y: r * Math.sin(phi) * 0.55,
          z: r * Math.sin(theta) * Math.cos(phi),
          radius: r,
          angle: theta,
          size: 1.0 + Math.random() * 2.4,
          color: Math.random() > 0.35 ? "rgba(255, 255, 255, " : "rgba(56, 189, 248, ",
          opacity: 0.4 + Math.random() * 0.6,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.02 + Math.random() * 0.04,
          isBrightStar: Math.random() < 0.12,
          type: "core",
        });
      }

      // 2. Swirling Logarithmic Spiral Arms
      for (let i = 0; i < countArm; i++) {
        const armIndex = i % numArms;
        const progress = Math.random();
        const r = 20 + progress * galaxyRadius;

        const armAngleOffset = (armIndex * (Math.PI * 2)) / numArms;
        const spiralSpin = 2.6 * Math.log(r / 18);
        const scatter = (Math.random() - 0.5) * (0.38 * (1 + progress * 0.75));

        const theta = armAngleOffset + spiralSpin + scatter;
        const y = (Math.random() - 0.5) * (32 * (1 - progress * 0.6));
        const colorBase = armColors[Math.floor(Math.random() * armColors.length)];

        particles.push({
          x: r * Math.cos(theta),
          y,
          z: r * Math.sin(theta),
          radius: r,
          angle: theta,
          size: 0.8 + Math.random() * (1.8 + progress * 0.9),
          color: colorBase,
          opacity: 0.3 + (1 - progress * 0.5) * 0.55,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.015 + Math.random() * 0.035,
          isBrightStar: Math.random() < 0.06,
          type: "arm",
        });
      }

      // 3. Fine Interstellar Dust Particles
      for (let i = 0; i < countDust; i++) {
        const r = Math.random() * galaxyRadius * 1.05;
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 40;

        particles.push({
          x: r * Math.cos(theta),
          y,
          z: r * Math.sin(theta),
          radius: r,
          angle: theta,
          size: 0.5 + Math.random() * 1.2,
          color: Math.random() > 0.5 ? "rgba(139, 92, 246, " : "rgba(56, 189, 248, ",
          opacity: 0.15 + Math.random() * 0.35,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.01 + Math.random() * 0.02,
          type: "dust",
        });
      }

      // 4. Background & Foreground Starfield
      for (let i = 0; i < countStars; i++) {
        const dist = 500 + Math.random() * 1600;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI;

        particles.push({
          x: dist * Math.cos(theta) * Math.cos(phi),
          y: dist * Math.sin(phi),
          z: dist * Math.sin(theta) * Math.cos(phi),
          radius: dist,
          angle: theta,
          size: 0.5 + Math.random() * 1.8,
          color: "rgba(255, 255, 255, ",
          opacity: 0.25 + Math.random() * 0.6,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.01 + Math.random() * 0.04,
          isBrightStar: Math.random() < 0.08,
          type: "star",
        });
      }

      // 5. Volumetric Cosmic Nebula Haze Clouds
      for (let i = 0; i < countNebula; i++) {
        const r = (0.15 + Math.random() * 0.8) * galaxyRadius;
        const theta = Math.random() * Math.PI * 2;

        nebulaClouds.push({
          x: r * Math.cos(theta),
          y: (Math.random() - 0.5) * 25,
          z: r * Math.sin(theta),
          radius: 80 + Math.random() * 150,
          color: i % 3 === 0 ? "rgba(56, 189, 248, " : i % 3 === 1 ? "rgba(139, 92, 246, " : "rgba(29, 78, 216, ",
          opacity: 0.04 + Math.random() * 0.07,
        });
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = width < 768;

      canvas.width = width;
      canvas.height = height;

      initGalaxy(width, height, isMobile);
    };

    handleResize();

    // Mouse & Touch Orbit Controls
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      dragStartAngleY = targetCameraAngleY;
      dragStartAngleX = targetCameraAngleX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / width - 0.5) * 2;
      mouseY = (e.clientY / height - 0.5) * 2;

      if (isDragging) {
        const deltaX = e.clientX - dragStartX;
        const deltaY = e.clientY - dragStartY;
        targetCameraAngleY = dragStartAngleY + deltaX * 0.0035;
        targetCameraAngleX = Math.max(-0.1, Math.min(1.1, dragStartAngleX + deltaY * 0.003));
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        dragStartX = e.touches[0].clientX;
        dragStartY = e.touches[0].clientY;
        dragStartAngleY = targetCameraAngleY;
        dragStartAngleX = targetCameraAngleX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const deltaX = e.touches[0].clientX - dragStartX;
        const deltaY = e.touches[0].clientY - dragStartY;
        targetCameraAngleY = dragStartAngleY + deltaX * 0.003;
        targetCameraAngleX = Math.max(0.0, Math.min(0.9, dragStartAngleX + deltaY * 0.0025));
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleVisibilityChange = () => {
      isPageVisible = document.visibilityState === "visible";
      if (isPageVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // --- Main Render Pipeline ---
    let time = 0;

    const render = () => {
      if (!isPageVisible) return;

      time += 0.016;

      // Scroll position smooth lerp
      currentScrollY += (targetScrollY - currentScrollY) * 0.06;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - height);
      const scrollRatio = Math.min(1, Math.max(0, currentScrollY / maxScroll));

      // Slow continuous 3D galaxy orbit rotation (paused if prefers-reduced-motion)
      if (!reducedMotion && !isDragging) {
        targetCameraAngleY += 0.0007;
      }

      // Interpolate camera angle
      cameraAngleY += (targetCameraAngleY - cameraAngleY) * 0.05;
      cameraAngleX += (targetCameraAngleX - cameraAngleX) * 0.05;

      const parallaxX = mouseX * 0.06;
      const parallaxY = mouseY * 0.04;

      const effectiveAngleY = cameraAngleY + parallaxX;
      const effectiveAngleX = cameraAngleX + parallaxY + scrollRatio * 0.14;

      // Deep Space Base Gradient (#00020A -> #020617)
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.46 + scrollRatio * height * 0.08;
      const fov = 750;

      const cosY = Math.cos(effectiveAngleY);
      const sinY = Math.sin(effectiveAngleY);
      const cosX = Math.cos(effectiveAngleX);
      const sinX = Math.sin(effectiveAngleX);

      // --- 1. Volumetric Nebula Clouds (Additive Screen Blending) ---
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < nebulaClouds.length; i++) {
        const cloud = nebulaClouds[i];

        const x1 = cloud.x * cosY - cloud.z * sinY;
        const z1 = cloud.x * sinY + cloud.z * cosY;
        const y1 = cloud.y * cosX - z1 * sinX;
        const z2 = cloud.y * sinX + z1 * cosX + cameraDistance;

        if (z2 > 100) {
          const scale = fov / z2;
          const px = centerX + x1 * scale;
          const py = centerY + y1 * scale;
          const pr = cloud.radius * scale;

          if (px + pr > 0 && px - pr < width && py + pr > 0 && py - pr < height) {
            const grad = ctx.createRadialGradient(px, py, 0, px, py, pr);
            grad.addColorStop(0, `${cloud.color}${cloud.opacity})`);
            grad.addColorStop(0.5, `${cloud.color}${cloud.opacity * 0.35})`);
            grad.addColorStop(1, `${cloud.color}0)`);

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(px, py, pr, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.restore();

      // --- 2. Central Bar Nucleus Luminous Glow ---
      const corePX = centerX;
      const corePY = centerY;
      const coreGlowRadius = (isMobile ? 180 : 300);

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const coreGrad = ctx.createRadialGradient(corePX, corePY, 0, corePX, corePY, coreGlowRadius);
      coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
      coreGrad.addColorStop(0.2, "rgba(56, 189, 248, 0.28)");
      coreGrad.addColorStop(0.55, "rgba(139, 92, 246, 0.12)");
      coreGrad.addColorStop(1, "rgba(2, 6, 23, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(corePX, corePY, coreGlowRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // --- 3. 3D Galaxy Particle Projection & Astrophotography Star Cross Flares ---
      interface ProjectedParticle {
        px: number;
        py: number;
        pz: number;
        size: number;
        color: string;
        opacity: number;
        isBrightStar?: boolean;
        type: string;
      }

      const projected: ProjectedParticle[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 3D rotation transform
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX + cameraDistance;

        if (z2 > 40) {
          const scale = fov / z2;
          const px = centerX + x1 * scale;
          const py = centerY + y1 * scale;

          if (px >= -30 && px <= width + 30 && py >= -30 && py <= height + 30) {
            let currentOpacity = p.opacity;
            if (!reducedMotion) {
              const twinkle = Math.sin(time * p.twinkleSpeed * 10 + p.twinklePhase);
              currentOpacity = Math.max(0.1, Math.min(1, p.opacity + twinkle * 0.2));
            }

            const depthFade = Math.min(1, Math.max(0.2, (1700 - z2) / 1400));

            projected.push({
              px,
              py,
              pz: z2,
              size: Math.max(0.5, p.size * scale),
              color: p.color,
              opacity: currentOpacity * depthFade,
              isBrightStar: p.isBrightStar,
              type: p.type,
            });
          }
        }
      }

      // Render projected 3D galaxy particles directly (additive screen composition)

      // Render projected 3D galaxy particles
      const projCount = projected.length;
      for (let i = 0; i < projCount; i++) {
        const p = projected[i];

        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra bloom halo & 4-point astrophotography starburst rays for major stars
        if (p.isBrightStar && p.size > 1.4) {
          const flareLen = p.size * 5;

          ctx.save();
          ctx.globalCompositeOperation = "screen";
          ctx.strokeStyle = `${p.color}${p.opacity * 0.45})`;
          ctx.lineWidth = 0.7;

          // Horizontal flare line
          ctx.beginPath();
          ctx.moveTo(p.px - flareLen, p.py);
          ctx.lineTo(p.px + flareLen, p.py);
          ctx.stroke();

          // Vertical flare line
          ctx.beginPath();
          ctx.moveTo(p.px, p.py - flareLen);
          ctx.lineTo(p.px, p.py + flareLen);
          ctx.stroke();

          ctx.restore();
        }
      }

      // --- 4. Readability Protection Overlay & Vignette ---
      // Ensures Hero title, Journey, Projects, and Contact text are 100% crisp and readable
      const textOverlay = ctx.createRadialGradient(
        centerX,
        height * 0.45,
        Math.min(width, height) * 0.28,
        centerX,
        height * 0.45,
        Math.max(width, height) * 0.85
      );
      textOverlay.addColorStop(0, "rgba(2, 6, 23, 0.32)");
      textOverlay.addColorStop(0.6, "rgba(2, 6, 23, 0.52)");
      textOverlay.addColorStop(1, "rgba(0, 2, 10, 0.82)");

      ctx.fillStyle = textOverlay;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      mediaQuery.removeEventListener("change", handleMotionPreference);

      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
};

export default GlobalBackgroundAnimation;
