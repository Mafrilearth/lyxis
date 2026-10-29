"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState } from "react";

/**
 * Implementation B: Motion (Framer Motion Engine)
 * - Spring physics: realistic mass, stiffness & damping
 * - Interactive 3D Cursor Parallax (tracks pointer movement)
 * - Click / Hover to "Explode & Disassemble" the 3 tiers into inspection mode
 */
export function MotionLinearMark() {
  const [isExploded, setIsExploded] = useState(false);

  // Mouse tilt physics tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExploded(!isExploded)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsExploded(!isExploded);
        }
      }}
      style={{ perspective: 800 }}
      className="relative w-full max-w-[360px] aspect-square mx-auto flex items-center justify-center bg-[#07090E] rounded-2xl border border-border/40 p-6 overflow-hidden select-none cursor-pointer group focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary"
    >
      {/* Interactive instruction banner */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2 z-10">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        <span>FIG 0.1 — MOTION SPRING ENGINE</span>
      </div>

      <div className="absolute top-4 right-4 font-mono text-[9px] text-blue-400 uppercase tracking-wider z-10 bg-blue-950/40 border border-blue-900/60 px-2 py-0.5 rounded">
        {isExploded ? "DISASSEMBLED" : "CLICK TO EXPAND"}
      </div>

      {/* Tiltable Container */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="w-full h-full flex items-center justify-center relative"
      >
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full drop-shadow-[0_0_24px_rgba(59,130,246,0.18)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Motion 3-Tier Isometric Calibration Core"
        >
          <title>Motion 3-Tier Isometric Calibration Core</title>
          {/* ================= TIER 1: BASE (LISTENING COMPREHENSION) ================= */}
          <motion.g
            animate={{
              y: isExploded ? 24 : 0,
            }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
          >
            <polygon
              points="160,205 240,245 160,285 80,245"
              fill="#090C15"
              stroke="#334155"
              strokeWidth="1.2"
            />
            <polygon
              points="80,245 160,285 160,297 80,257"
              fill="#07090E"
              stroke="#475569"
              strokeWidth="1.2"
            />
            <polygon
              points="160,285 240,245 240,257 160,297"
              fill="#05070A"
              stroke="#334155"
              strokeWidth="1.2"
            />
            {/* Wave lines */}
            <line
              x1="120"
              y1="235"
              x2="150"
              y2="250"
              stroke="#1D4ED8"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            <line
              x1="170"
              y1="260"
              x2="200"
              y2="245"
              stroke="#1D4ED8"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
          </motion.g>

          {/* ================= TIER 2: MIDDLE (STRUCTURE & SYNTAX) ================= */}
          <motion.g
            animate={{
              y: isExploded ? 0 : 0,
            }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
          >
            <polygon
              points="160,160 230,195 160,230 90,195"
              fill="#0B0F19"
              stroke="#64748B"
              strokeWidth="1.2"
            />
            <polygon
              points="90,195 160,230 160,240 90,205"
              fill="#090C15"
              stroke="#475569"
              strokeWidth="1.2"
            />
            <polygon
              points="160,230 230,195 230,205 160,240"
              fill="#07090E"
              stroke="#334155"
              strokeWidth="1.2"
            />
            <circle cx="160" cy="195" r="1.5" fill="#3B82F6" />
            <circle cx="130" cy="180" r="1" fill="#64748B" />
            <circle cx="190" cy="180" r="1" fill="#64748B" />
          </motion.g>

          {/* ================= TIER 3: TOP (READING & CALIBRATION APERTURE) ================= */}
          <motion.g
            animate={{
              y: isExploded ? -32 : 0,
            }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
          >
            <polygon
              points="160,115 220,145 160,175 100,145"
              fill="#0E1322"
              stroke="#94A3B8"
              strokeWidth="1.4"
            />
            <polygon
              points="100,145 160,175 160,185 100,155"
              fill="#0B0F19"
              stroke="#64748B"
              strokeWidth="1.2"
            />
            <polygon
              points="160,175 220,145 220,155 160,185"
              fill="#090C15"
              stroke="#475569"
              strokeWidth="1.2"
            />

            {/* Recessed Calibration Disc */}
            <ellipse
              cx="160"
              cy="145"
              rx="30"
              ry="16"
              fill="#07090E"
              stroke="#3B82F6"
              strokeWidth="1.4"
            />
            <motion.ellipse
              cx="160"
              cy="145"
              rx="20"
              ry="10.5"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="0.8"
              strokeDasharray="3 3"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ originX: "160px", originY: "145px" }}
            />

            {/* Crosshairs & Core Indicator */}
            <line x1="160" y1="130" x2="160" y2="160" stroke="#93C5FD" strokeWidth="0.8" />
            <line x1="135" y1="145" x2="185" y2="145" stroke="#93C5FD" strokeWidth="0.8" />
            <circle cx="160" cy="145" r="2" fill="#FFFFFF" />
          </motion.g>

          {/* Technical Annotations */}
          <line
            x1="220"
            y1="145"
            x2="260"
            y2="125"
            stroke="#475569"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
          <text
            x="265"
            y="127"
            fill="#94A3B8"
            fontSize="8"
            fontFamily="monospace"
            fontWeight="bold"
          >
            SEC 0.3 — READING
          </text>

          <line
            x1="80"
            y1="245"
            x2="45"
            y2="260"
            stroke="#475569"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
          <text x="15" y="272" fill="#64748B" fontSize="8" fontFamily="monospace">
            SEC 0.1 — LISTENING
          </text>
        </svg>
      </motion.div>

      {/* Footer Specification Badge */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-muted-foreground border-t border-border/30 pt-2 z-10">
        <span>INTERACTIVE SPRING</span>
        <span className="text-blue-400 font-bold">HOVER PARALLAX</span>
      </div>
    </div>
  );
}
