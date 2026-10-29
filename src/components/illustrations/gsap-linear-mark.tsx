"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

/**
 * Implementation C: GSAP (GreenSock) Choreographed CAD Timeline (MK-IV Monolith)
 * - Bundle size: ~23 KB
 * - Unconventional Animation:
 *   1. Architectural CAD Laser Vector Plotting via strokeDashoffset
 *   2. Dual-Axis Gyroscopic Counter-Rotation with Harmonic Easing
 *   3. Interactive Timeline Scrubber (Seek to exact frame)
 *   4. Multi-Speed Warping (0.5x, 1x, 2x) & Bidirectional Scrubbing
 */
export function GsapLinearMark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState<number>(1);

  useGSAP(
    () => {
      // Create master timeline
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.8,
        onUpdate: () => {
          if (tl) {
            setProgress(Number((tl.progress() * 100).toFixed(1)));
          }
        },
      });

      timelineRef.current = tl;

      // 1. Initial CAD Blueprint Line Draw
      tl.fromTo(
        ".gsap-cad-line",
        { strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.6,
          stagger: 0.04,
          ease: "power2.out",
        },
      );

      // 2. Explode & Elevate Master Tiers
      tl.to(
        ".gsap-deck-top",
        {
          y: -24,
          duration: 1.2,
          ease: "power3.inOut",
        },
        "-=0.6",
      );

      tl.to(
        ".gsap-fin-blade",
        {
          scaleY: 1.25,
          transformOrigin: "bottom center",
          duration: 1.0,
          stagger: 0.05,
          ease: "elastic.out(1, 0.4)",
        },
        "-=0.8",
      );

      // 3. Gyroscopic Dual-Axis Protractor Rotation
      tl.to(
        ".gsap-dial-ring",
        {
          rotation: 180,
          transformOrigin: "220px 158px",
          duration: 2.0,
          ease: "sine.inOut",
        },
        "-=1.2",
      );

      // 4. Photonic Iris Dilation
      tl.to(
        ".gsap-laser-core",
        {
          scale: 1.8,
          transformOrigin: "220px 145px",
          fill: "#60A5FA",
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=1.0",
      );
    },
    { scope: containerRef },
  );

  const togglePlay = () => {
    if (!timelineRef.current) return;
    if (isPlaying) {
      timelineRef.current.pause();
    } else {
      timelineRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    if (!timelineRef.current) return;
    timelineRef.current.restart();
    setIsPlaying(true);
  };

  const handleSpeedChange = (newSpeed: number) => {
    if (!timelineRef.current) return;
    timelineRef.current.timeScale(newSpeed);
    setSpeed(newSpeed);
  };

  const handleScrub = (val: number) => {
    if (!timelineRef.current) return;
    timelineRef.current.pause();
    timelineRef.current.progress(val / 100);
    setProgress(val);
    setIsPlaying(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[420px] aspect-square mx-auto flex flex-col items-center justify-center bg-[#05070B] rounded-2xl border border-white/10 p-5 overflow-hidden select-none shadow-2xl shadow-black/80"
    >
      {/* Precision CAD Matrix Grid Background */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Technical CAD Isometric Grid</title>
        <defs>
          <pattern id="cad-grid-gsap-mk4" width="40" height="23.094" patternUnits="userSpaceOnUse">
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
        <rect width="100%" height="100%" fill="url(#cad-grid-gsap-mk4)" />
      </svg>

      {/* Header Controls */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-auto">
        <div className="font-mono text-[9px] text-muted-foreground/80 tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>FIG 0.3 — CAD PLOTTER</span>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-1 bg-black/60 border border-white/10 rounded-lg p-0.5 backdrop-blur-md">
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSpeedChange(s)}
              className={`px-1.5 py-0.5 text-[8px] font-mono rounded transition-colors ${
                speed === s
                  ? "bg-emerald-500 text-black font-semibold"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              {s}x
            </button>
          ))}
          <button
            type="button"
            onClick={togglePlay}
            className="px-1.5 py-0.5 text-[8px] font-mono rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            {isPlaying ? "PAUSE" : "PLAY"}
          </button>
          <button
            type="button"
            onClick={handleRestart}
            className="px-1.5 py-0.5 text-[8px] font-mono rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            RESET
          </button>
        </div>
      </div>

      {/* Bottom Interactive Scrubber */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-black/70 border border-white/10 rounded-lg px-2.5 py-1 z-20 backdrop-blur-md">
        <span className="font-mono text-[8px] text-muted-foreground shrink-0">TIMELINE</span>
        <input
          type="range"
          min="0"
          max="100"
          step="0.5"
          value={progress}
          onChange={(e) => handleScrub(Number(e.target.value))}
          className="w-full accent-emerald-400 h-1 bg-white/10 rounded cursor-pointer"
        />
        <span className="font-mono text-[8px] text-emerald-400 shrink-0 w-8 text-right tabular-nums">
          {progress}%
        </span>
      </div>

      {/* GSAP SVG Artwork */}
      <svg
        viewBox="0 0 440 440"
        className="w-full h-full drop-shadow-[0_0_35px_rgba(52,211,153,0.15)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="GSAP CAD Blueprint Isometric Monolith"
      >
        <title>GSAP CAD Blueprint Isometric Monolith</title>

        {/* ================= TIER 1: BASE CHASSIS ================= */}
        <g className="gsap-tier-base">
          <polygon
            className="gsap-cad-line"
            points="206,285 234,285 330,336 330,348 234,398 206,398 110,348 110,336"
            fill="#080C14"
            stroke="#1E293B"
            strokeWidth="1.2"
          />
          <polygon
            className="gsap-cad-line"
            points="208,287 232,287 326,337 326,346 232,395 208,395 114,346 114,337"
            fill="none"
            stroke="#334155"
            strokeWidth="0.6"
          />

          <polygon
            className="gsap-cad-line"
            points="234,398 330,348 330,364 234,414"
            fill="#05070B"
            stroke="#1E293B"
            strokeWidth="1.2"
          />
          <polygon
            className="gsap-cad-line"
            points="206,398 234,398 234,414 206,414"
            fill="#070A10"
            stroke="#334155"
            strokeWidth="1.2"
          />
          <polygon
            className="gsap-cad-line"
            points="110,348 206,398 206,414 110,364"
            fill="#0A0E18"
            stroke="#1E293B"
            strokeWidth="1.2"
          />

          {/* Acoustic Lines */}
          <line
            className="gsap-cad-line"
            x1="124"
            y1="358"
            x2="124"
            y2="370"
            stroke="#334155"
            strokeWidth="1"
          />
          <line
            className="gsap-cad-line"
            x1="152"
            y1="372"
            x2="152"
            y2="384"
            stroke="#334155"
            strokeWidth="1"
          />
          <line
            className="gsap-cad-line"
            x1="180"
            y1="387"
            x2="180"
            y2="399"
            stroke="#334155"
            strokeWidth="1"
          />
        </g>

        {/* ================= TIER 2: STEPPED FINS ================= */}
        <g className="gsap-tier-mid">
          {[
            { x: 154, y: 220, h: 28 },
            { x: 176, y: 232, h: 36 },
            { x: 198, y: 244, h: 44 },
            { x: 220, y: 256, h: 48 },
            { x: 242, y: 244, h: 44 },
            { x: 264, y: 232, h: 36 },
            { x: 286, y: 220, h: 28 },
          ].map((fin, idx) => (
            <g key={`gsap-fin-${fin.x}-${fin.y}`} className="gsap-fin-blade">
              <polygon
                className="gsap-cad-line"
                points={`${fin.x - 7},${fin.y - 4} ${fin.x + 7},${fin.y + 4} ${fin.x + 7},${fin.y + 7} ${fin.x - 7},${fin.y - 1}`}
                fill="#0F172A"
                stroke={idx === 3 ? "#34D399" : "#38BDF8"}
                strokeWidth="0.8"
              />
              <polygon
                className="gsap-cad-line"
                points={`${fin.x - 7},${fin.y - 1} ${fin.x + 7},${fin.y + 7} ${fin.x + 7},${fin.y + 7 + fin.h} ${fin.x - 7},${fin.y - 1 + fin.h}`}
                fill="#070B14"
                stroke="#1E293B"
                strokeWidth="0.8"
              />
            </g>
          ))}
        </g>

        {/* ================= TIER 3: APERTURE MONOLITH DECK ================= */}
        <g className="gsap-deck-top">
          <polygon
            className="gsap-cad-line"
            points="206,100 234,100 334,154 334,166 234,220 206,220 106,166 106,154"
            fill="#090E1A"
            stroke="#34D399"
            strokeWidth="1.2"
          />
          <polygon
            className="gsap-cad-line"
            points="208,103 232,103 328,155 328,164 232,217 208,217 112,164 112,155"
            fill="none"
            stroke="#475569"
            strokeWidth="0.6"
          />

          <polygon
            className="gsap-cad-line"
            points="234,220 334,166 334,180 234,234"
            fill="#05070D"
            stroke="#1E293B"
            strokeWidth="1.2"
          />
          <polygon
            className="gsap-cad-line"
            points="206,220 234,220 234,234 206,234"
            fill="#0B132B"
            stroke="#34D399"
            strokeWidth="1.2"
          />
          <polygon
            className="gsap-cad-line"
            points="106,166 206,220 206,234 106,180"
            fill="#080C16"
            stroke="#1E293B"
            strokeWidth="1.2"
          />

          {/* Aperture Inset */}
          <ellipse
            className="gsap-cad-line"
            cx="220"
            cy="158"
            rx="56"
            ry="31"
            fill="#04060A"
            stroke="#334155"
            strokeWidth="1.2"
          />

          {/* Gyroscopic Counter-Rotating Dial */}
          <g className="gsap-dial-ring">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const r1x = 44 * Math.cos(rad);
              const r1y = 24 * Math.sin(rad);
              const r2x = 52 * Math.cos(rad);
              const r2y = 28.5 * Math.sin(rad);
              return (
                <line
                  key={`gsap-dial-${deg}`}
                  x1={220 + r1x}
                  y1={158 + r1y}
                  x2={220 + r2x}
                  y2={158 + r2y}
                  stroke="#34D399"
                  strokeWidth="0.8"
                />
              );
            })}
          </g>

          {/* Venetian Slits */}
          <ellipse cx="220" cy="145" rx="44" ry="24" fill="#010204" />
          <line
            className="gsap-cad-line"
            x1="184"
            y1="135"
            x2="256"
            y2="135"
            stroke="#1E293B"
            strokeWidth="0.75"
          />
          <line
            className="gsap-cad-line"
            x1="180"
            y1="139"
            x2="260"
            y2="139"
            stroke="#334155"
            strokeWidth="0.75"
          />
          <line
            className="gsap-cad-line"
            x1="178"
            y1="143"
            x2="262"
            y2="143"
            stroke="#475569"
            strokeWidth="0.75"
          />
          <line
            className="gsap-cad-line"
            x1="178"
            y1="147"
            x2="262"
            y2="147"
            stroke="#34D399"
            strokeWidth="1"
          />
          <line
            className="gsap-cad-line"
            x1="180"
            y1="151"
            x2="260"
            y2="151"
            stroke="#475569"
            strokeWidth="0.75"
          />
          <line
            className="gsap-cad-line"
            x1="184"
            y1="155"
            x2="256"
            y2="155"
            stroke="#334155"
            strokeWidth="0.75"
          />

          {/* Laser Core */}
          <circle className="gsap-laser-core" cx="220" cy="145" r="4" fill="#34D399" />

          <text x="122" y="152" fill="#64748B" fontSize="6.5" fontFamily="monospace">
            {"LYXIS // CAD-PLOTTER"}
          </text>
        </g>
      </svg>
    </div>
  );
}
