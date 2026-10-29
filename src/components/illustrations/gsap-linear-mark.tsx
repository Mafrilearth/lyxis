"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

/**
 * Implementation C: GSAP (GreenSock Animation Platform)
 * - Timeline sequencing & mathematical precision
 * - Blueprint Line-Drawing effect (strokeDashoffset CAD animation)
 * - Assembly choreography with Play/Pause/Restart timeline controls
 */
export function GsapLinearMark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.5,
      });
      timelineRef.current = tl;

      // Initial state: hide strokes and offset tiers
      tl.set(".gsap-path", { strokeDashoffset: 500, strokeDasharray: 500 })
        .set(".gsap-tier-1", { y: 20, opacity: 0 })
        .set(".gsap-tier-2", { y: -20, opacity: 0 })
        .set(".gsap-tier-3", { y: -50, opacity: 0 })
        .set(".gsap-reticle", { scale: 0, opacity: 0, transformOrigin: "160px 145px" })

        // 1. Draw base structure (Blueprint Construction)
        .to(".gsap-tier-1", { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
        .to(
          ".gsap-path-1",
          { strokeDashoffset: 0, duration: 1.2, ease: "power1.inOut", stagger: 0.1 },
          "-=0.6",
        )

        // 2. Dock middle tier (Structure)
        .to(".gsap-tier-2", { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.4)" }, "-=0.4")
        .to(
          ".gsap-path-2",
          { strokeDashoffset: 0, duration: 1.0, ease: "power1.inOut", stagger: 0.1 },
          "-=0.6",
        )

        // 3. Lock top tier (Reading & Calibration Disc)
        .to(".gsap-tier-3", { y: 0, opacity: 1, duration: 0.9, ease: "back.out(1.7)" }, "-=0.3")
        .to(".gsap-path-3", { strokeDashoffset: 0, duration: 1.2, ease: "power1.inOut" }, "-=0.7")

        // 4. Activate central reticle calibration pulse
        .to(".gsap-reticle", { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" })
        .to(".gsap-disc-spin", {
          rotation: 360,
          duration: 3,
          ease: "none",
          transformOrigin: "160px 145px",
        })

        // 5. Ambient hold and calm fadeout to loop
        .to([".gsap-tier-1", ".gsap-tier-2", ".gsap-tier-3"], {
          opacity: 0.3,
          duration: 0.8,
          ease: "power2.inOut",
        });
    },
    { scope: containerRef },
  );

  const togglePlayback = () => {
    if (!timelineRef.current) return;
    if (timelineRef.current.paused()) {
      timelineRef.current.play();
      setIsPlaying(true);
    } else {
      timelineRef.current.pause();
      setIsPlaying(false);
    }
  };

  const restartTimeline = () => {
    if (!timelineRef.current) return;
    timelineRef.current.restart();
    setIsPlaying(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[360px] aspect-square mx-auto flex items-center justify-center bg-[#07090E] rounded-2xl border border-border/40 p-6 overflow-hidden select-none"
    >
      {/* Technical Header Callout */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2 z-10">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>FIG 0.1 — GSAP TIMELINE ENGINE</span>
      </div>

      {/* Control Buttons */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
        <button
          type="button"
          onClick={togglePlayback}
          className="p-1 rounded bg-muted/40 hover:bg-muted text-foreground transition-colors border border-border/60"
          title={isPlaying ? "Pause Timeline" : "Play Timeline"}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
        <button
          type="button"
          onClick={restartTimeline}
          className="p-1 rounded bg-muted/40 hover:bg-muted text-foreground transition-colors border border-border/60"
          title="Restart Assembly"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* SVG Illustration */}
      <svg
        viewBox="0 0 320 320"
        className="w-full h-full drop-shadow-[0_0_24px_rgba(16,185,129,0.15)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="GSAP 3-Tier Isometric Calibration Core"
      >
        <title>GSAP 3-Tier Isometric Calibration Core</title>
        {/* ================= TIER 1: BASE ================= */}
        <g className="gsap-tier-1">
          <polygon
            className="gsap-path gsap-path-1"
            points="160,205 240,245 160,285 80,245"
            fill="#090C15"
            stroke="#334155"
            strokeWidth="1.2"
          />
          <polygon
            className="gsap-path gsap-path-1"
            points="80,245 160,285 160,297 80,257"
            fill="#07090E"
            stroke="#475569"
            strokeWidth="1.2"
          />
          <polygon
            className="gsap-path gsap-path-1"
            points="160,285 240,245 240,257 160,297"
            fill="#05070A"
            stroke="#334155"
            strokeWidth="1.2"
          />
        </g>

        {/* ================= TIER 2: MIDDLE ================= */}
        <g className="gsap-tier-2">
          <polygon
            className="gsap-path gsap-path-2"
            points="160,160 230,195 160,230 90,195"
            fill="#0B0F19"
            stroke="#64748B"
            strokeWidth="1.2"
          />
          <polygon
            className="gsap-path gsap-path-2"
            points="90,195 160,230 160,240 90,205"
            fill="#090C15"
            stroke="#475569"
            strokeWidth="1.2"
          />
          <polygon
            className="gsap-path gsap-path-2"
            points="160,230 230,195 230,205 160,240"
            fill="#07090E"
            stroke="#334155"
            strokeWidth="1.2"
          />
        </g>

        {/* ================= TIER 3: TOP ================= */}
        <g className="gsap-tier-3">
          <polygon
            className="gsap-path gsap-path-3"
            points="160,115 220,145 160,175 100,145"
            fill="#0E1322"
            stroke="#94A3B8"
            strokeWidth="1.4"
          />
          <polygon
            className="gsap-path gsap-path-3"
            points="100,145 160,175 160,185 100,155"
            fill="#0B0F19"
            stroke="#64748B"
            strokeWidth="1.2"
          />
          <polygon
            className="gsap-path gsap-path-3"
            points="160,175 220,145 220,155 160,185"
            fill="#090C15"
            stroke="#475569"
            strokeWidth="1.2"
          />

          {/* Central Circular Calibration Disc */}
          <g className="gsap-reticle">
            <ellipse
              cx="160"
              cy="145"
              rx="30"
              ry="16"
              fill="#07090E"
              stroke="#059669"
              strokeWidth="1.4"
            />
            <ellipse
              className="gsap-disc-spin"
              cx="160"
              cy="145"
              rx="20"
              ry="10.5"
              fill="none"
              stroke="#10B981"
              strokeWidth="0.8"
              strokeDasharray="3 3"
            />
            <line x1="160" y1="130" x2="160" y2="160" stroke="#34D399" strokeWidth="0.8" />
            <line x1="135" y1="145" x2="185" y2="145" stroke="#34D399" strokeWidth="0.8" />
            <circle cx="160" cy="145" r="2" fill="#FFFFFF" />
          </g>
        </g>
      </svg>

      {/* Footer Specification Badge */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-muted-foreground border-t border-border/30 pt-2 z-10">
        <span>GSAP BLUEPRINT CHOREOGRAPHY</span>
        <span className="text-emerald-400 font-bold">STROKE DRAW-IN</span>
      </div>
    </div>
  );
}
