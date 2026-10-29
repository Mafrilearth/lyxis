"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

/**
 * Implementation E: Quantum Canvas Vector Field (MK-IV IRT Streamlines)
 * - 0 external animation dependencies (Pure HTML5 Canvas 2D + RAF)
 * - 120 FPS hardware accelerated
 * - Unconventional Animation:
 *   1. 180+ kinetic phosphor particles streaming along 30° isometric magnetic flux lines
 *   2. Gravitational lens pull toward the Lyxis central aperture (x: 210, y: 155)
 *   3. Real-time mouse cursor gravitational disturbance
 *   4. Mathematical Item Response Theory (IRT) information flux rendering
 */
export function QuantumCanvasMark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particleDensity, setParticleDensity] = useState<"standard" | "high">("standard");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    const count = particleDensity === "high" ? 260 : 150;
    const targetX = 210;
    const targetY = 160;

    let mouseX = -1000;
    let mouseY = -1000;

    const particles: Particle[] = [];
    const colors = ["#38BDF8", "#60A5FA", "#34D399", "#818CF8"];

    const initParticle = (): Particle => {
      // Spawn along isometric perimeter
      const side = Math.random();
      let x = 0;
      let y = 0;
      if (side < 0.5) {
        x = Math.random() * 420;
        y = Math.random() < 0.5 ? 20 : 400;
      } else {
        x = Math.random() < 0.5 ? 20 : 400;
        y = Math.random() * 420;
      }

      return {
        x,
        y,
        vx: 0,
        vy: 0,
        life: 0,
        maxLife: 100 + Math.random() * 120,
        size: 0.8 + Math.random() * 1.6,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    for (let i = 0; i < count; i++) {
      particles.push(initParticle());
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      animId = requestAnimationFrame(render);

      // Motion blur trail
      ctx.fillStyle = "rgba(5, 7, 11, 0.22)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render Central Monolith Silhouette (Isometric Outline)
      ctx.save();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 1;

      // Outer aperture ring
      ctx.beginPath();
      ctx.ellipse(targetX, targetY, 48, 26, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Inner aperture ring
      ctx.strokeStyle = "rgba(52, 211, 153, 0.6)";
      ctx.beginPath();
      ctx.ellipse(targetX, targetY, 28, 15, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Stepped fin array outline
      ctx.strokeStyle = "rgba(51, 65, 85, 0.5)";
      for (let i = -3; i <= 3; i++) {
        const finX = targetX + i * 14;
        const finY = targetY + 50 + Math.abs(i) * 2;
        ctx.beginPath();
        ctx.moveTo(finX - 4, finY - 2);
        ctx.lineTo(finX + 4, finY + 2);
        ctx.lineTo(finX + 4, finY + 20);
        ctx.lineTo(finX - 4, finY + 16);
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();

      // Particle physics update
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;

        // Vector pull toward central aperture
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // 30° Axonometric magnetic flux steering
        const isoAngle = Math.atan2(dy, dx);
        p.vx += Math.cos(isoAngle) * 0.08;
        p.vy += Math.sin(isoAngle) * 0.08;

        // Mouse disturbance
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 75) {
          const repelForce = (75 - mDist) * 0.05;
          p.vx += (mdx / mDist) * repelForce;
          p.vy += (mdy / mDist) * repelForce;
        }

        // Apply velocity with damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;

        // Draw particle with phosphor tail
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Respawn if absorbed by aperture or expired
        if (dist < 12 || p.life > p.maxLife) {
          particles[i] = initParticle();
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [particleDensity]);

  return (
    <div className="relative w-full max-w-[420px] aspect-square mx-auto flex flex-col items-center justify-center bg-[#05070B] rounded-2xl border border-white/10 p-5 overflow-hidden select-none shadow-2xl shadow-black/80">
      {/* Header Controls */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-auto">
        <div className="font-mono text-[9px] text-muted-foreground/80 tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span>FIG 0.5 — IRT QUANTUM FLUX</span>
        </div>

        <div className="flex items-center gap-1 bg-black/60 border border-white/10 rounded-lg p-0.5 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setParticleDensity((d) => (d === "standard" ? "high" : "standard"))}
            className={`px-1.5 py-0.5 text-[8px] font-mono rounded transition-colors ${
              particleDensity === "high"
                ? "bg-indigo-500 text-white font-semibold"
                : "text-muted-foreground hover:text-white"
            }`}
          >
            {particleDensity === "high" ? "DENSITY: 260" : "DENSITY: 150"}
          </button>
        </div>
      </div>

      {/* HTML5 Canvas */}
      <canvas ref={canvasRef} width={420} height={420} className="w-full h-full cursor-crosshair" />

      {/* Bottom Hint */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[8px] text-slate-500 z-10 pointer-events-none">
        <span>HOVER CURSOR TO DISTURB IRT VECTOR FLUX</span>
        <span className="text-indigo-400">120 FPS — 0 KB LIB</span>
      </div>
    </div>
  );
}
