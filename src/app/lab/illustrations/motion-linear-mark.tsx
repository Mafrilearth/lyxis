"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { type KeyboardEvent, type MouseEvent, useState } from "react";

/**
 * Implementation B: Motion (Framer Motion 12) (MK-IV Monolith)
 * - Bundle size: ~28 KB
 * - Unconventional Animation:
 *   1. 3D Gyroscopic Cursor Parallax with Magnetic Spring Damping
 *   2. 3-State Mechanical Kinematics (Assemble | Exploded | IRT Overdrive)
 *   3. Interactive Sub-Tier Focus & Real-time TOEFL Telemetry HUD
 *   4. Kinetic Aperture Blade Expansion & Waveform Synapses
 */
export function MotionLinearMark() {
  const [mode, setMode] = useState<"assemble" | "exploded" | "overdrive">("assemble");
  const [activeTier, setActiveTier] = useState<1 | 2 | 3 | null>(null);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-180, 180], [12, -12]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-180, 180], [-12, 12]), {
    stiffness: 160,
    damping: 18,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
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

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setMode((prev) =>
        prev === "assemble" ? "exploded" : prev === "exploded" ? "overdrive" : "assemble",
      );
    }
  };

  // Tier offsets based on mode
  const tierTopY = mode === "exploded" ? -55 : mode === "overdrive" ? -12 : 0;
  const tierMidY = mode === "exploded" ? 0 : mode === "overdrive" ? -4 : 0;
  const tierBaseY = mode === "exploded" ? 55 : mode === "overdrive" ? 4 : 0;

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[420px] aspect-square mx-auto flex flex-col items-center justify-center bg-[#05070B] rounded-2xl border border-white/10 p-5 overflow-hidden select-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-primary shadow-2xl shadow-black/80"
    >
      {/* Precision CAD Matrix Grid Background */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Technical CAD Isometric Grid</title>
        <defs>
          <pattern
            id="cad-grid-motion-mk4"
            width="40"
            height="23.094"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 11.547 L20 0 L40 11.547 L20 23.094 Z"
              fill="none"
              stroke="#334155"
              strokeWidth="0.4"
              strokeDasharray="1 3"
            />
            <circle cx="20" cy="11.547" r="0.75" fill="#475569" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cad-grid-motion-mk4)" />
      </svg>

      {/* Mode Controls Header */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-auto">
        <div className="font-mono text-[9px] text-muted-foreground/80 tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>FIG 0.2 — KINETIC GYROSCOPE</span>
        </div>

        {/* Mode Switcher Pills */}
        <div className="flex items-center gap-1 bg-black/60 border border-white/10 rounded-lg p-0.5 backdrop-blur-md">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMode("assemble");
            }}
            className={`px-1.5 py-0.5 text-[8px] font-mono rounded transition-colors ${
              mode === "assemble"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-white"
            }`}
          >
            LOCK
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMode("exploded");
            }}
            className={`px-1.5 py-0.5 text-[8px] font-mono rounded transition-colors ${
              mode === "exploded"
                ? "bg-cyan-500 text-black font-semibold"
                : "text-muted-foreground hover:text-white"
            }`}
          >
            EXPLODE
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMode("overdrive");
            }}
            className={`px-1.5 py-0.5 text-[8px] font-mono rounded transition-colors ${
              mode === "overdrive"
                ? "bg-amber-400 text-black font-semibold"
                : "text-muted-foreground hover:text-white"
            }`}
          >
            OVERDRIVE
          </button>
        </div>
      </div>

      {/* Active Telemetry Chip */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[8px] font-mono text-slate-400 z-20 pointer-events-none">
        <div>
          {activeTier === 1 && "FOCUS: S1 LISTENING // FREQ 1.42kHz"}
          {activeTier === 2 && "FOCUS: S2 SYNTAX BUS // 40 RULES"}
          {activeTier === 3 && "FOCUS: S3 READING APERTURE // IRT 677"}
          {!activeTier && "INTERACTION: CLICK MODES OR HOVER TIERS"}
        </div>
        <div className="text-cyan-400">SPRING: 160 STIFFNESS</div>
      </div>

      {/* 3D Gyroscopic Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <svg
          viewBox="0 0 440 440"
          className="w-full h-full drop-shadow-[0_0_35px_rgba(59,130,246,0.15)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Motion Kinetic Isometric Monolith"
        >
          <title>Motion Kinetic Isometric Monolith</title>

          {/* ================= TIER 1: BASE CHASSIS ================= */}
          <motion.g
            animate={{
              y: tierBaseY,
              opacity: activeTier && activeTier !== 1 ? 0.4 : 1,
            }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            onMouseEnter={() => setActiveTier(1)}
            onMouseLeave={() => setActiveTier(null)}
            className="cursor-pointer"
          >
            <polygon
              points="206,285 234,285 330,336 330,348 234,398 206,398 110,348 110,336"
              fill={activeTier === 1 ? "#0C1322" : "#080C14"}
              stroke={activeTier === 1 ? "#38BDF8" : "#1E293B"}
              strokeWidth="1.2"
            />
            <polygon
              points="208,287 232,287 326,337 326,346 232,395 208,395 114,346 114,337"
              fill="none"
              stroke="#334155"
              strokeWidth="0.6"
            />
            {/* Thickness drops */}
            <polygon
              points="234,398 330,348 330,364 234,414"
              fill="#05070B"
              stroke="#1E293B"
              strokeWidth="1.2"
            />
            <polygon
              points="206,398 234,398 234,414 206,414"
              fill="#070A10"
              stroke="#334155"
              strokeWidth="1.2"
            />
            <polygon
              points="110,348 206,398 206,414 110,364"
              fill="#0A0E18"
              stroke="#1E293B"
              strokeWidth="1.2"
            />

            {/* Acoustic Fins */}
            <line x1="124" y1="358" x2="124" y2="370" stroke="#334155" strokeWidth="1" />
            <line x1="152" y1="372" x2="152" y2="384" stroke="#334155" strokeWidth="1" />
            <line x1="180" y1="387" x2="180" y2="399" stroke="#334155" strokeWidth="1" />

            {/* Micro Datum Marks */}
            <ellipse
              cx="132"
              cy="342"
              rx="4"
              ry="2.3"
              fill="#020306"
              stroke="#64748B"
              strokeWidth="0.75"
            />
            <ellipse
              cx="308"
              cy="342"
              rx="4"
              ry="2.3"
              fill="#020306"
              stroke="#64748B"
              strokeWidth="0.75"
            />

            <text x="144" y="356" fill="#64748B" fontSize="6" fontFamily="monospace">
              {"SEC-01 // TRANSDUCER [310-450]"}
            </text>
          </motion.g>

          {/* ================= TIER 2: STEPPED FIN ARRAY ================= */}
          <motion.g
            animate={{
              y: tierMidY,
              opacity: activeTier && activeTier !== 2 ? 0.4 : 1,
            }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            onMouseEnter={() => setActiveTier(2)}
            onMouseLeave={() => setActiveTier(null)}
            className="cursor-pointer"
          >
            {[
              { x: 154, y: 220, h: 28 },
              { x: 176, y: 232, h: 36 },
              { x: 198, y: 244, h: 44 },
              { x: 220, y: 256, h: 48 },
              { x: 242, y: 244, h: 44 },
              { x: 264, y: 232, h: 36 },
              { x: 286, y: 220, h: 28 },
            ].map((fin, idx) => (
              <g key={`motion-fin-${fin.x}-${fin.y}`}>
                <polygon
                  points={`${fin.x - 7},${fin.y - 4} ${fin.x + 7},${fin.y + 4} ${fin.x + 7},${fin.y + 7} ${fin.x - 7},${fin.y - 1}`}
                  fill={activeTier === 2 ? "#1E293B" : "#0F172A"}
                  stroke={activeTier === 2 || idx === 3 ? "#38BDF8" : "#475569"}
                  strokeWidth="0.8"
                />
                <polygon
                  points={`${fin.x - 7},${fin.y - 1} ${fin.x + 7},${fin.y + 7} ${fin.x + 7},${fin.y + 7 + fin.h} ${fin.x - 7},${fin.y - 1 + fin.h}`}
                  fill="#070B14"
                  stroke="#1E293B"
                  strokeWidth="0.8"
                />
                <circle cx={fin.x} cy={fin.y + 3} r="1.2" fill="#38BDF8" />
              </g>
            ))}
          </motion.g>

          {/* ================= TIER 3: APERTURE MONOLITH DECK ================= */}
          <motion.g
            animate={{
              y: tierTopY,
              opacity: activeTier && activeTier !== 3 ? 0.4 : 1,
            }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            onMouseEnter={() => setActiveTier(3)}
            onMouseLeave={() => setActiveTier(null)}
            className="cursor-pointer"
          >
            {/* Master Chamfered Deck */}
            <polygon
              points="206,100 234,100 334,154 334,166 234,220 206,220 106,166 106,154"
              fill={activeTier === 3 ? "#0E1726" : "#090E1A"}
              stroke={mode === "overdrive" ? "#F59E0B" : "#38BDF8"}
              strokeWidth="1.2"
            />
            <polygon
              points="208,103 232,103 328,155 328,164 232,217 208,217 112,164 112,155"
              fill="none"
              stroke="#475569"
              strokeWidth="0.6"
            />

            {/* Thickness drops */}
            <polygon
              points="234,220 334,166 334,180 234,234"
              fill="#05070D"
              stroke="#1E293B"
              strokeWidth="1.2"
            />
            <polygon
              points="206,220 234,220 234,234 206,234"
              fill="#0B132B"
              stroke="#38BDF8"
              strokeWidth="1.2"
            />
            <polygon
              points="106,166 206,220 206,234 106,180"
              fill="#080C16"
              stroke="#1E293B"
              strokeWidth="1.2"
            />

            {/* Optical Well Insets */}
            <ellipse
              cx="220"
              cy="158"
              rx="56"
              ry="31"
              fill="#04060A"
              stroke="#334155"
              strokeWidth="1.2"
            />
            <ellipse
              cx="220"
              cy="160"
              rx="50"
              ry="27.5"
              fill="#020306"
              stroke="#1E293B"
              strokeWidth="1"
            />

            {/* Rotating Venetian Blind Disks */}
            <ellipse cx="220" cy="145" rx="44" ry="24" fill="#010204" />
            <line x1="184" y1="135" x2="256" y2="135" stroke="#1E293B" strokeWidth="0.75" />
            <line x1="180" y1="139" x2="260" y2="139" stroke="#334155" strokeWidth="0.75" />
            <line x1="178" y1="143" x2="262" y2="143" stroke="#475569" strokeWidth="0.75" />
            <line
              x1="178"
              y1="147"
              x2="262"
              y2="147"
              stroke={mode === "overdrive" ? "#F59E0B" : "#38BDF8"}
              strokeWidth="1"
            />
            <line x1="180" y1="151" x2="260" y2="151" stroke="#475569" strokeWidth="0.75" />
            <line x1="184" y1="155" x2="256" y2="155" stroke="#334155" strokeWidth="0.75" />

            {/* Motion Kinetic Iris Core */}
            <motion.circle
              cx="220"
              cy="145"
              animate={{
                r: mode === "overdrive" ? [4, 9, 4] : mode === "exploded" ? 6 : 4,
                scale: mode === "overdrive" ? [1, 1.25, 1] : 1,
              }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              fill={mode === "overdrive" ? "#F59E0B" : "#38BDF8"}
            />

            {/* Calibrated Telemetry Readout */}
            <text x="122" y="152" fill="#64748B" fontSize="6.5" fontFamily="monospace">
              {"LYXIS // IRT-CALIBRATION"}
            </text>
            <text
              x="246"
              y="214"
              fill={mode === "overdrive" ? "#F59E0B" : "#38BDF8"}
              fontSize="7"
              fontFamily="monospace"
              fontWeight="bold"
            >
              677 MAX
            </text>
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
