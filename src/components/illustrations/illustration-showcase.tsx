"use client";

import { GsapLinearMark } from "@/components/illustrations/gsap-linear-mark";
import { MotionLinearMark } from "@/components/illustrations/motion-linear-mark";
import { PureCssLinearMark } from "@/components/illustrations/pure-css-linear-mark";
import { QuantumCanvasMark } from "@/components/illustrations/quantum-canvas-mark";
import { ThreeLinearMark } from "@/components/illustrations/three-linear-mark";
import { Activity } from "lucide-react";
import { useState } from "react";

type LibraryKey = "all" | "css" | "motion" | "gsap" | "three" | "canvas";

export function IllustrationShowcase() {
  const [activeTab, setActiveTab] = useState<LibraryKey>("all");

  return (
    <div className="space-y-10">
      {/* Tab Switcher Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
            activeTab === "all"
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-muted/40 text-muted-foreground hover:bg-muted"
          }`}
        >
          VIEW ALL 5 ENGINES
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("css")}
          className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
            activeTab === "css"
              ? "bg-cyan-500 text-black shadow-md font-semibold"
              : "bg-muted/40 text-muted-foreground hover:bg-muted"
          }`}
        >
          1. PURE CSS (0 KB — 120 FPS)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("motion")}
          className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
            activeTab === "motion"
              ? "bg-blue-600 text-white shadow-md font-semibold"
              : "bg-muted/40 text-muted-foreground hover:bg-muted"
          }`}
        >
          2. MOTION (GYRO & EXPLODE)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("gsap")}
          className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
            activeTab === "gsap"
              ? "bg-emerald-600 text-white shadow-md font-semibold"
              : "bg-muted/40 text-muted-foreground hover:bg-muted"
          }`}
        >
          3. GSAP (CAD PLOTTER & SCRUBBER)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("three")}
          className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
            activeTab === "three"
              ? "bg-sky-600 text-white shadow-md font-semibold"
              : "bg-muted/40 text-muted-foreground hover:bg-muted"
          }`}
        >
          4. THREE.JS (360° ORBIT)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("canvas")}
          className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
            activeTab === "canvas"
              ? "bg-indigo-600 text-white shadow-md font-semibold"
              : "bg-muted/40 text-muted-foreground hover:bg-muted"
          }`}
        >
          5. QUANTUM CANVAS (IRT FLUX)
        </button>
      </div>

      {/* Grid of Illustrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeTab === "all" || activeTab === "css") && (
          <div className="space-y-3">
            <PureCssLinearMark />
            <div className="p-4 rounded-xl bg-muted/20 border border-border/40 font-mono text-xs space-y-1.5">
              <div className="flex justify-between items-center text-foreground font-semibold">
                <span>1. PURE SVG + CSS KEYFRAMES</span>
                <span className="text-cyan-400">0 KB JS</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Hardware-accelerated WAAPI transform compositor. Fitur laser slice plane dengan
                dynamic clipping, harmonic levitation phase shift, dan 6-blade aperture iris
                dilation.
              </p>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-border/30 flex justify-between">
                <span>WORKLOAD: GPU COMPOSITED</span>
                <span>FPS: 120 FPS</span>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "all" || activeTab === "motion") && (
          <div className="space-y-3">
            <MotionLinearMark />
            <div className="p-4 rounded-xl bg-muted/20 border border-border/40 font-mono text-xs space-y-1.5">
              <div className="flex justify-between items-center text-foreground font-semibold">
                <span>2. MOTION (FRAMER MOTION)</span>
                <span className="text-blue-400">~28 KB</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Interaksi 3D gyroscopic tilt dengan spring physics. 3 state mekanis: LOCK, EXPLODE
                (disassembly bertingkat), dan OVERDRIVE dengan isolasi fokus per tier TOEFL.
              </p>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-border/30 flex justify-between">
                <span>WORKLOAD: SPRING TICK</span>
                <span>FPS: 60-120 FPS</span>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "all" || activeTab === "gsap") && (
          <div className="space-y-3">
            <GsapLinearMark />
            <div className="p-4 rounded-xl bg-muted/20 border border-border/40 font-mono text-xs space-y-1.5">
              <div className="flex justify-between items-center text-foreground font-semibold">
                <span>3. GSAP + @gsap/react</span>
                <span className="text-emerald-400">~23 KB</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Animasi CAD laser drawing bertahap via strokeDashoffset. Dilengkapi live interactive
                timeline scrubber, multi-speed controls (0.5x, 1x, 2x), dan counter-rotating dial
                rings.
              </p>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-border/30 flex justify-between">
                <span>WORKLOAD: RAF TIMELINE</span>
                <span>FPS: 60-120 FPS</span>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "all" || activeTab === "three") && (
          <div className="space-y-3">
            <ThreeLinearMark />
            <div className="p-4 rounded-xl bg-muted/20 border border-border/40 font-mono text-xs space-y-1.5">
              <div className="flex justify-between items-center text-foreground font-semibold">
                <span>4. THREE.JS (WEBGL)</span>
                <span className="text-sky-400">~150 KB</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Ruang 3D sejati dengan kamera ortografik aksonometrik 30°. Memiliki 7 heatsink blade
                3D nyata, dual-axis gyroscopic toruses, konstelasi 100 partikel, dan mouse drag
                orbit bebas.
              </p>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-border/30 flex justify-between">
                <span>WORKLOAD: GL SHADERS</span>
                <span>FPS: 60 FPS</span>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "all" || activeTab === "canvas") && (
          <div className="space-y-3">
            <QuantumCanvasMark />
            <div className="p-4 rounded-xl bg-muted/20 border border-border/40 font-mono text-xs space-y-1.5">
              <div className="flex justify-between items-center text-foreground font-semibold">
                <span>5. HTML5 CANVAS IRT FLUX</span>
                <span className="text-indigo-400">0 KB LIB</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Simulasi matematis Item Response Theory (IRT) Vector Field. 150-260 partikel
                phosphor bergerak di sepanjang garis gaya magnetik isometrik dengan tarikan
                gravitasi kursor pengguna.
              </p>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-border/30 flex justify-between">
                <span>WORKLOAD: 2D CONTEXT</span>
                <span>FPS: 120 FPS</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comprehensive Architectural Benchmark Matrix */}
      <div className="rounded-2xl border border-border/40 bg-card p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold tracking-tight">
            Architectural Benchmark & Implementation Matrix (MK-IV)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground">
                <th className="py-3 px-3">ANIMATION ENGINE</th>
                <th className="py-3 px-3">BUNDLE COST</th>
                <th className="py-3 px-3">RENDER PIPELINE</th>
                <th className="py-3 px-3">UNCONVENTIONAL MECHANICS</th>
                <th className="py-3 px-3">RECOMMENDED PLACEMENT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20 text-muted-foreground">
              <tr className="hover:bg-muted/10">
                <td className="py-3 px-3 font-semibold text-foreground">1. Pure SVG + CSS</td>
                <td className="py-3 px-3 text-cyan-400 font-bold">0 KB</td>
                <td className="py-3 px-3">GPU Composited (WAAPI)</td>
                <td className="py-3 px-3">
                  Photonic Laser Slice + Harmonic Levitation + 6-Blade Iris
                </td>
                <td className="py-3 px-3 text-foreground">Hero Section & Landing Header</td>
              </tr>
              <tr className="hover:bg-muted/10">
                <td className="py-3 px-3 font-semibold text-foreground">2. Motion (Framer)</td>
                <td className="py-3 px-3 text-blue-400 font-bold">~28 KB</td>
                <td className="py-3 px-3">Spring Physics Tick</td>
                <td className="py-3 px-3">
                  Gyroscopic 3D Parallax + Exploded Disassembly + Overdrive Mode
                </td>
                <td className="py-3 px-3 text-foreground">
                  Interactive Feature Cards & Diagnostic Explainer
                </td>
              </tr>
              <tr className="hover:bg-muted/10">
                <td className="py-3 px-3 font-semibold text-foreground">3. GSAP (@gsap/react)</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">~23 KB</td>
                <td className="py-3 px-3">RAF Timeline Chaining</td>
                <td className="py-3 px-3">
                  CAD Blueprint Line-Drawing + Live Timeline Scrubber + Speed Multiplier
                </td>
                <td className="py-3 px-3 text-foreground">
                  Interactive Calibration Demo & Walkthrough Story
                </td>
              </tr>
              <tr className="hover:bg-muted/10">
                <td className="py-3 px-3 font-semibold text-foreground">4. Three.js WebGL</td>
                <td className="py-3 px-3 text-sky-400 font-bold">~150 KB</td>
                <td className="py-3 px-3">Orthographic WebGL Context</td>
                <td className="py-3 px-3">
                  True 3D Architectural Fin Array + Gyro Torus + 360° Drag Orbit
                </td>
                <td className="py-3 px-3 text-foreground">
                  Dedicated 3D Calibration Sandbox / Lab Viewport
                </td>
              </tr>
              <tr className="hover:bg-muted/10">
                <td className="py-3 px-3 font-semibold text-foreground">5. Quantum Canvas</td>
                <td className="py-3 px-3 text-indigo-400 font-bold">0 KB (Native)</td>
                <td className="py-3 px-3">Canvas 2D Path Renderer</td>
                <td className="py-3 px-3">
                  IRT 30° Magnetic Vector Field + Dynamic Mouse Gravitational Lens
                </td>
                <td className="py-3 px-3 text-foreground">
                  Real-Time Scoring Telemetry & Live Test Screen
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
