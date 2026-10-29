"use client";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";
import {
  Award,
  BookOpen,
  BrainCircuit,
  Compass,
  FileCode2,
  Headphones,
  Sliders,
  Sparkles,
} from "lucide-react";
import { forwardRef, useRef, useState } from "react";

/**
 * Circle Node Component for Pipeline
 */
const NodeCircle = forwardRef<
  HTMLDivElement,
  {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    isActive?: boolean;
    onClick?: () => void;
    className?: string;
  }
>(({ icon, title, subtitle, isActive, onClick, className }, ref) => {
  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        "group relative z-10 flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-300 focus:outline-none",
        className,
      )}
    >
      <div
        className={cn(
          "flex size-12 sm:size-14 items-center justify-center rounded-2xl border bg-[#0A0E17] p-2.5 transition-all duration-300 shadow-xl",
          isActive
            ? "border-cyan-400 bg-cyan-950/30 text-cyan-300 shadow-cyan-500/20 shadow-lg scale-105"
            : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white hover:scale-105",
        )}
      >
        {icon}
      </div>
      <div className="text-center font-mono select-none">
        <p className="text-[10px] sm:text-xs font-semibold text-zinc-200 tracking-tight">{title}</p>
        {subtitle && (
          <p className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-wider">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
});

NodeCircle.displayName = "NodeCircle";

/**
 * Psychometric Beam Pipeline
 * Custom Special Effect built with AnimatedBeam (Motion + SVG Bézier)
 */
export function PsychometricBeamPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Input Nodes (Left)
  const listeningRef = useRef<HTMLDivElement>(null);
  const structureRef = useRef<HTMLDivElement>(null);
  const readingRef = useRef<HTMLDivElement>(null);

  // Center Engine
  const coreRef = useRef<HTMLDivElement>(null);

  // Output Nodes (Right)
  const scoreRef = useRef<HTMLDivElement>(null);
  const cefrRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<"listening" | "structure" | "reading" | null>(
    null,
  );
  const [duration, setDuration] = useState<number>(3.5);

  const handleSelect = (sec: "listening" | "structure" | "reading") => {
    setActiveSection((prev) => (prev === sec ? null : sec));
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
      {/* Telemetry Header */}
      <div className="flex items-center justify-between w-full px-2 font-mono text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-foreground font-bold tracking-wider">
            SPECIAL EFFECT: ANIMATED BEAM INTEGRATION
          </span>
        </div>

        {/* Speed Multiplier Pill */}
        <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 rounded-lg p-1 text-[9px]">
          <span className="text-zinc-500 px-1">BEAM SPEED:</span>
          {[
            { label: "NORMAL", val: 3.5 },
            { label: "FAST", val: 2 },
            { label: "HYPER", val: 1 },
          ].map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setDuration(s.val)}
              className={cn(
                "px-2 py-0.5 rounded transition-colors",
                duration === s.val
                  ? "bg-cyan-500 text-black font-bold"
                  : "text-zinc-400 hover:text-white",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[420px] sm:h-[460px] flex items-center justify-between p-6 sm:p-12 bg-[#05070B] rounded-3xl border border-white/10 shadow-2xl overflow-hidden select-none"
      >
        {/* Subtle Background Grid Pattern */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Grid Pattern</title>
          <defs>
            <pattern id="pipeline-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="16" cy="16" r="1" fill="#FFFFFF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pipeline-grid)" />
        </svg>

        {/* ================= LEFT COLUMN: 3 ASSESSMENT INPUT SECTIONS ================= */}
        <div className="flex flex-col justify-between h-full z-10 py-2">
          <NodeCircle
            ref={listeningRef}
            icon={<Headphones className="w-6 h-6" />}
            title="S1 Listening"
            subtitle="50 Items"
            isActive={activeSection === "listening"}
            onClick={() => handleSelect("listening")}
          />
          <NodeCircle
            ref={structureRef}
            icon={<FileCode2 className="w-6 h-6" />}
            title="S2 Structure"
            subtitle="40 Items"
            isActive={activeSection === "structure"}
            onClick={() => handleSelect("structure")}
          />
          <NodeCircle
            ref={readingRef}
            icon={<BookOpen className="w-6 h-6" />}
            title="S3 Reading"
            subtitle="50 Items"
            isActive={activeSection === "reading"}
            onClick={() => handleSelect("reading")}
          />
        </div>

        {/* ================= CENTER: LYXIS PSYCHOMETRIC CALIBRATION CORE ================= */}
        <div className="z-10 flex flex-col items-center gap-3">
          <div
            ref={coreRef}
            className="relative flex size-20 sm:size-24 items-center justify-center rounded-3xl border-2 border-cyan-400/80 bg-gradient-to-b from-[#0E1726] to-[#060911] p-3 shadow-[0_0_40px_rgba(56,189,248,0.25)] transition-all hover:scale-110 cursor-pointer"
          >
            {/* Spinning decorative ring */}
            <div className="absolute inset-0 rounded-3xl border border-cyan-400/30 animate-pulse pointer-events-none" />
            <BrainCircuit className="w-10 h-10 text-cyan-400 animate-pulse" />
          </div>

          <div className="text-center font-mono">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-[9px] text-cyan-300 font-bold tracking-wider">
              <Sparkles className="w-2.5 h-2.5" />
              <span>LYXIS IRT CORE</span>
            </div>
            <p className="text-[8px] text-zinc-500 mt-1 uppercase tracking-widest">
              3PL Psychometrics
            </p>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: 3 CALIBRATED DIAGNOSTIC OUTPUTS ================= */}
        <div className="flex flex-col justify-between h-full z-10 py-2">
          <NodeCircle
            ref={scoreRef}
            icon={<Award className="w-6 h-6 text-amber-400" />}
            title="ETS Scaled"
            subtitle="310–677 Pts"
            isActive={activeSection === "listening" || !activeSection}
          />
          <NodeCircle
            ref={cefrRef}
            icon={<Sliders className="w-6 h-6 text-emerald-400" />}
            title="CEFR Matrix"
            subtitle="A2 to C1"
            isActive={activeSection === "structure" || !activeSection}
          />
          <NodeCircle
            ref={planRef}
            icon={<Compass className="w-6 h-6 text-sky-400" />}
            title="Trajectory"
            subtitle="Adaptive Map"
            isActive={activeSection === "reading" || !activeSection}
          />
        </div>

        {/* ================= ANIMATED BEAMS: INPUTS TO CENTER CORE ================= */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={listeningRef}
          toRef={coreRef}
          duration={duration}
          curvature={-50}
          pathColor="#1E293B"
          gradientStartColor="#38BDF8"
          gradientStopColor="#3B82F6"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={structureRef}
          toRef={coreRef}
          duration={duration}
          curvature={0}
          pathColor="#1E293B"
          gradientStartColor="#38BDF8"
          gradientStopColor="#60A5FA"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={readingRef}
          toRef={coreRef}
          duration={duration}
          curvature={50}
          pathColor="#1E293B"
          gradientStartColor="#38BDF8"
          gradientStopColor="#818CF8"
        />

        {/* ================= ANIMATED BEAMS: CENTER CORE TO OUTPUTS ================= */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={coreRef}
          toRef={scoreRef}
          duration={duration}
          curvature={-50}
          pathColor="#1E293B"
          gradientStartColor="#3B82F6"
          gradientStopColor="#F59E0B"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={coreRef}
          toRef={cefrRef}
          duration={duration}
          curvature={0}
          pathColor="#1E293B"
          gradientStartColor="#60A5FA"
          gradientStopColor="#10B981"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={coreRef}
          toRef={planRef}
          duration={duration}
          curvature={50}
          pathColor="#1E293B"
          gradientStartColor="#818CF8"
          gradientStopColor="#38BDF8"
        />
      </div>

      {/* Instructional Caption */}
      <div className="text-center font-mono text-xs text-muted-foreground space-y-1">
        <p className="text-zinc-300 font-medium">
          Mekanisme Special Effect: SVG Bézier Path + Framer Motion Linear Gradient
        </p>
        <p className="text-[11px] text-zinc-500">
          Setiap sinar cahaya dikalkulasi secara dinamis antara koordinat DOM ref
          (BoundingClientRect) dan bergerak di sepanjang kurva Bézier kuadratik. Klik node seksi di
          sebelah kiri untuk mengisolasi fokus kalibrasi.
        </p>
      </div>
    </div>
  );
}
