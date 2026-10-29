"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { type KeyboardEvent, type MouseEvent, useState } from "react";

/**
 * Minimalist Interactive Linear Mark for Lyxis
 * - Pure, quiet aesthetic: Dark mode (#07090E), razor-thin hairlines, zero clutter
 * - Tactile user interaction:
 *   1. Smooth 3D tilt tracking user cursor with spring damping
 *   2. Hover gently expands the 3 assessment tiers (Listening, Structure, Reading)
 *   3. Horizontal cursor scrub dynamically calibrates the score from 310 to 677
 *   4. Slit lines progressively illuminate as the score increases
 *   5. Click triggers a quiet calibration pulse
 */
export function MinimalInteractiveMark() {
  const [isHovered, setIsHovered] = useState(false);
  const [isCalibrated, setIsCalibrated] = useState(false);

  // Mouse coordinate motion values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for 3D tilt
  const springConfig = { stiffness: 180, damping: 22 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [0, 1], [-8, 8]);

  // Calibration score mapping (310 to 677)
  const score = useTransform(smoothX, [0, 1], [310, 677]);
  const [displayScore, setDisplayScore] = useState(550);

  // Update display score on change
  score.on("change", (latest) => {
    setDisplayScore(Math.round(latest));
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleClick = () => {
    setIsCalibrated((prev) => !prev);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  // Illumination calculation for the 7 aperture slit lines based on score
  const activeSlits = Math.round(((displayScore - 310) / (677 - 310)) * 7);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div
        role="button"
        tabIndex={0}
        aria-label="Interactive Minimalist Calibration Core"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[380px] aspect-square flex flex-col items-center justify-center bg-[#07090E] rounded-2xl border border-white/5 p-6 overflow-hidden select-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-primary shadow-2xl transition-colors hover:border-white/10"
      >
        {/* Subtle Fig Label — Minimal & Quiet */}
        <div className="absolute top-5 left-5 font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <span>FIG 0.1</span>
        </div>

        {/* Dynamic Score Indicator — Only 1 quiet number */}
        <div className="absolute top-5 right-5 font-mono text-[10px] text-zinc-400 tabular-nums">
          <span className="text-zinc-600 mr-1.5">CALIB</span>
          <span className="text-zinc-200 font-semibold">{displayScore}</span>
        </div>

        {/* 3D Container */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1000,
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <svg
            viewBox="0 0 320 320"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Minimalist Isometric Calibration Monolith"
          >
            <title>Minimalist Isometric Calibration Monolith</title>

            {/* ================= TIER 1: BASE (LISTENING) ================= */}
            <motion.g
              animate={{
                y: isHovered ? 14 : 0,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              {/* Top Face */}
              <polygon
                points="160,205 240,248 160,290 80,248"
                fill="#090C15"
                stroke="#27272A"
                strokeWidth="1"
              />
              {/* Right Drop Face */}
              <polygon
                points="160,290 240,248 240,260 160,302"
                fill="#05070A"
                stroke="#18181B"
                strokeWidth="1"
              />
              {/* Left Drop Face */}
              <polygon
                points="80,248 160,290 160,302 80,260"
                fill="#060910"
                stroke="#27272A"
                strokeWidth="1"
              />
            </motion.g>

            {/* ================= TIER 2: MID (STRUCTURE) ================= */}
            <motion.g
              animate={{
                y: isHovered ? 0 : 0,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              {/* Top Face */}
              <polygon
                points="160,165 240,208 160,250 80,208"
                fill="#0A0E18"
                stroke="#27272A"
                strokeWidth="1"
              />
              {/* Right Drop Face */}
              <polygon
                points="160,250 240,208 240,220 160,262"
                fill="#06080D"
                stroke="#18181B"
                strokeWidth="1"
              />
              {/* Left Drop Face */}
              <polygon
                points="80,208 160,250 160,262 80,220"
                fill="#070A12"
                stroke="#27272A"
                strokeWidth="1"
              />
            </motion.g>

            {/* ================= TIER 3: TOP WITH CIRCULAR APERTURE (READING) ================= */}
            <motion.g
              animate={{
                y: isHovered ? -14 : 0,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              {/* Top Face */}
              <polygon
                points="160,125 240,168 160,210 80,168"
                fill="#0C101D"
                stroke={isCalibrated ? "#FFFFFF" : "#3F3F46"}
                strokeWidth={isCalibrated ? "1.2" : "1"}
              />
              {/* Right Drop Face */}
              <polygon
                points="160,210 240,168 240,180 160,222"
                fill="#07090F"
                stroke="#18181B"
                strokeWidth="1"
              />
              {/* Left Drop Face */}
              <polygon
                points="80,168 160,210 160,222 80,180"
                fill="#090D17"
                stroke="#27272A"
                strokeWidth="1"
              />

              {/* Quiet Circular Aperture Rim */}
              <ellipse
                cx="160"
                cy="168"
                rx="36"
                ry="19"
                fill="#04060A"
                stroke="#27272A"
                strokeWidth="1"
              />

              {/* Venetian Acoustic Slits — Illuminating based on cursor X position */}
              {[
                { y: 158, w: 22 },
                { y: 161, w: 28 },
                { y: 164, w: 32 },
                { y: 168, w: 34 },
                { y: 172, w: 32 },
                { y: 175, w: 28 },
                { y: 178, w: 22 },
              ].map((slit, idx) => {
                const isActive = idx < activeSlits;
                return (
                  <line
                    key={`slit-${slit.y}`}
                    x1={160 - slit.w}
                    y1={slit.y}
                    x2={160 + slit.w}
                    y2={slit.y}
                    stroke={isActive ? (isCalibrated ? "#38BDF8" : "#FFFFFF") : "#27272A"}
                    strokeWidth={isActive ? "1" : "0.75"}
                    strokeOpacity={isActive ? 1 : 0.4}
                    className="transition-colors duration-150"
                  />
                );
              })}

              {/* Minimal Center Laser Reticle */}
              <circle
                cx="160"
                cy="168"
                r={isCalibrated ? 3.5 : 2}
                fill={isCalibrated ? "#38BDF8" : "#A1A1AA"}
                className="transition-all duration-300"
              />
            </motion.g>
          </svg>
        </motion.div>

        {/* Minimal Footer Instruction */}
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[9px] text-zinc-600">
          <span>MOVE CURSOR TO CALIBRATE</span>
          <span>CLICK TO LOCK</span>
        </div>
      </div>

      {/* Clean Technical Description */}
      <div className="text-center space-y-1 max-w-[340px]">
        <p className="text-xs font-medium text-foreground">The Minimalist Calibration Monolith</p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Satu objek isometrik 3-tier presisi tanpa polusi visual. Gerakkan mouse secara horizontal
          untuk mengalibrasi skor TOEFL (310–677) dan mengiluminasi celah optik. Klik untuk
          mengunci.
        </p>
      </div>
    </div>
  );
}
